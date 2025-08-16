import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const googleApiKey = Deno.env.get('GOOGLE_API_KEY');
    if (!googleApiKey) {
      console.error('GOOGLE_API_KEY not found in environment');
      return new Response(JSON.stringify({ error: 'API key not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { prompt, language, currentCode } = await req.json();

    if (!prompt) {
      return new Response(JSON.stringify({ error: 'Prompt is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Generating code for language:', language, 'with prompt:', prompt);

    // Create context-aware system prompt based on language
    let systemPrompt = '';
    if (language === 'html') {
      systemPrompt = `You are an expert HTML developer. Generate clean, semantic HTML5 code based on the user's prompt. 
      Include proper structure, accessibility attributes, and modern HTML practices. 
      Return only the HTML code without explanations or markdown formatting.`;
    } else if (language === 'css') {
      systemPrompt = `You are an expert CSS developer. Generate modern CSS code with proper selectors, flexbox/grid layouts, 
      responsive design, and clean styling. Use CSS custom properties when appropriate. 
      Return only the CSS code without explanations or markdown formatting.`;
    } else if (language === 'js') {
      systemPrompt = `You are an expert JavaScript developer. Generate clean, modern ES6+ JavaScript code. 
      Use proper error handling, modern syntax, and best practices. 
      Return only the JavaScript code without explanations or markdown formatting.`;
    }

    // Add current code context if available
    let contextPrompt = prompt;
    if (currentCode && currentCode.trim()) {
      contextPrompt = `Current ${language.toUpperCase()} code:
\`\`\`${language}
${currentCode}
\`\`\`

User request: ${prompt}

Please modify or extend the existing code based on the user's request, or create new code if needed.`;
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${googleApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `${systemPrompt}\n\n${contextPrompt}`
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', errorText);
      return new Response(JSON.stringify({ error: 'Failed to generate code' }), {
        status: response.status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    console.log('Gemini API response:', data);

    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      console.error('Unexpected response format from Gemini API');
      return new Response(JSON.stringify({ error: 'Invalid response from AI service' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    let generatedCode = data.candidates[0].content.parts[0].text;
    
    // Clean up the response - remove markdown formatting if present
    generatedCode = generatedCode.replace(/```[a-z]*\n?/gi, '').trim();

    return new Response(JSON.stringify({ 
      generatedCode,
      language,
      prompt 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-code function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
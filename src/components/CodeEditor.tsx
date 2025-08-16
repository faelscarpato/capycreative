import React, { useState, useEffect, useRef } from 'react';
import Editor, { type Monaco } from '@monaco-editor/react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play, Download, Settings, Wand2, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { saveAs } from 'file-saver';
import { cn } from '@/lib/utils';
import { ApiKeyModal } from './ApiKeyModal';
import { PromptModal } from './PromptModal';
import { supabase } from '@/integrations/supabase/client';

interface CodeEditorProps {
  className?: string;
  onPreviewChange?: (content: string) => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ className, onPreviewChange }) => {
  const [activeTab, setActiveTab] = useState('html');
  const [htmlCode, setHtmlCode] = useState(`<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meu Projeto</title>
    <style>
        /* CSS será inserido aqui */
    </style>
</head>
<body>
    <div class="container">
        <h1>Olá Mundo!</h1>
        <p>Este é um exemplo de página HTML.</p>
        <button onclick="alertar()">Clique em mim</button>
    </div>
    
    <script>
        /* JavaScript será inserido aqui */
    </script>
</body>
</html>`);
  
  const [cssCode, setCssCode] = useState(`/* CSS Styles */
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
}

h1 {
    color: #333;
    text-align: center;
}

p {
    color: #666;
    line-height: 1.6;
}

button {
    background: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s;
}

button:hover {
    background: #0056b3;
}`);

  const [jsCode, setJsCode] = useState(`// JavaScript Code
function alertar() {
    alert('Botão clicado!');
}

// Exemplo de código mais avançado
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página carregada!');
    
    // Adicionar evento de click em todos os botões
    const botoes = document.querySelectorAll('button');
    botoes.forEach(botao => {
        botao.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        botao.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1)';
        });
    });
});`);

  const [previewContent, setPreviewContent] = useState('');
  const [apiKeyModalOpen, setApiKeyModalOpen] = useState(false);
  const [promptModalOpen, setPromptModalOpen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const editorOptions = {
    theme: 'vs-dark',
    fontSize: 14,
    fontFamily: 'Fira Code, Monaco, "Courier New", monospace',
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    automaticLayout: true,
    formatOnPaste: true,
    formatOnType: true,
    wordWrap: 'on' as const,
    lineNumbers: 'on' as const,
    renderLineHighlight: 'line' as const,
    scrollbar: {
      vertical: 'auto',
      horizontal: 'auto',
    },
  };

  const generatePreview = () => {
    let html = htmlCode;
    
    // Inject CSS
    const cssInjection = `<style>${cssCode}</style>`;
    if (html.includes('/* CSS será inserido aqui */')) {
      html = html.replace('/* CSS será inserido aqui */', cssCode);
    } else if (html.includes('</head>')) {
      html = html.replace('</head>', `${cssInjection}</head>`);
    } else {
      html = `${cssInjection}${html}`;
    }
    
    // Inject JavaScript
    const jsInjection = `<script>${jsCode}</script>`;
    if (html.includes('/* JavaScript será inserido aqui */')) {
      html = html.replace('/* JavaScript será inserido aqui */', jsCode);
    } else if (html.includes('</body>')) {
      html = html.replace('</body>', `${jsInjection}</body>`);
    } else {
      html = `${html}${jsInjection}`;
    }
    
    setPreviewContent(html);
    onPreviewChange?.(html);
  };

  const downloadHTML = () => {
    const finalHtml = previewContent || generateCombinedHTML();
    const blob = new Blob([finalHtml], { type: 'text/html;charset=utf-8' });
    saveAs(blob, 'capyai_output.html');
    toast.success('HTML baixado com sucesso!');
  };

  const generateCombinedHTML = () => {
    let html = htmlCode;
    
    const cssInjection = `<style>${cssCode}</style>`;
    if (html.includes('/* CSS será inserido aqui */')) {
      html = html.replace('/* CSS será inserido aqui */', cssCode);
    } else if (html.includes('</head>')) {
      html = html.replace('</head>', `${cssInjection}</head>`);
    } else {
      html = `${cssInjection}${html}`;
    }
    
    const jsInjection = `<script>${jsCode}</script>`;
    if (html.includes('/* JavaScript será inserido aqui */')) {
      html = html.replace('/* JavaScript será inserido aqui */', jsCode);
    } else if (html.includes('</body>')) {
      html = html.replace('</body>', `${jsInjection}</body>`);
    } else {
      html = `${html}${jsInjection}`;
    }
    
    return html;
  };

  const handleCodeGeneration = async (prompt: string, type: 'code' | 'image') => {
    if (type === 'code') {
      try {
        toast.info('Gerando código...');
        
        const { data, error } = await supabase.functions.invoke('generate-code', {
          body: {
            prompt,
            language: activeTab,
            currentCode: getCurrentCode()
          }
        });

        if (error) {
          console.error('Error generating code:', error);
          toast.error('Erro ao gerar código. Verifique se a API key está configurada.');
          return;
        }

        if (data?.generatedCode) {
          setCurrentCode(data.generatedCode);
          toast.success('Código gerado com sucesso!');
        } else {
          toast.error('Não foi possível gerar o código.');
        }
      } catch (error) {
        console.error('Error in code generation:', error);
        toast.error('Erro ao gerar código.');
      }
    } else {
      try {
        toast.info('Gerando imagem...');
        
        const { data, error } = await supabase.functions.invoke('generate-image', {
          body: {
            prompt,
            projectId: null // Could be linked to a project in the future
          }
        });

        if (error) {
          console.error('Error generating image:', error);
          toast.error('Erro ao gerar imagem. Verifique se a API key está configurada.');
          return;
        }

        if (data?.imageUrl) {
          toast.success('Imagem gerada com sucesso!');
          // You could open the image in a new tab or display it somewhere
          window.open(data.imageUrl, '_blank');
        } else {
          toast.error('Não foi possível gerar a imagem.');
        }
      } catch (error) {
        console.error('Error in image generation:', error);
        toast.error('Erro ao gerar imagem.');
      }
    }
  };

  useEffect(() => {
    generatePreview();
  }, [htmlCode, cssCode, jsCode]);

  const getCurrentCode = () => {
    switch (activeTab) {
      case 'html': return htmlCode;
      case 'css': return cssCode;
      case 'js': return jsCode;
      default: return '';
    }
  };

  const setCurrentCode = (value: string) => {
    switch (activeTab) {
      case 'html': setHtmlCode(value); break;
      case 'css': setCssCode(value); break;
      case 'js': setJsCode(value); break;
    }
  };

  return (
    <div className={cn("flex flex-col h-full bg-editor-background", className)}>
      {/* Toolbar */}
      <div className="flex items-center justify-between p-2 bg-panel-background border-b border-panel-border">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={generatePreview}
            className="text-tab-foreground hover:text-tab-active-foreground hover:bg-sidebar-hover"
          >
            <Play className="w-4 h-4 mr-1" />
            Executar
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setPromptModalOpen(true)}
            className="text-tab-foreground hover:text-tab-active-foreground hover:bg-sidebar-hover"
          >
            <Wand2 className="w-4 h-4 mr-1" />
            Prompt IA
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setPromptModalOpen(true);
              // Set to image mode when this button is clicked
              setTimeout(() => {
                const imageButton = document.querySelector('[data-image-mode]');
                if (imageButton) (imageButton as HTMLButtonElement).click();
              }, 100);
            }}
            className="text-tab-foreground hover:text-tab-active-foreground hover:bg-sidebar-hover"
          >
            <ImageIcon className="w-4 h-4 mr-1" />
            Gerar Imagem
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setApiKeyModalOpen(true)}
            className="text-tab-foreground hover:text-tab-active-foreground hover:bg-sidebar-hover"
          >
            <Settings className="w-4 h-4 mr-1" />
            API Key
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={downloadHTML}
            className="text-tab-foreground hover:text-tab-active-foreground hover:bg-sidebar-hover"
          >
            <Download className="w-4 h-4 mr-1" />
            Baixar HTML
          </Button>
        </div>
      </div>

      {/* Editor Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="bg-tab-background border-b border-tab-border rounded-none h-auto p-0">
          <TabsTrigger 
            value="html" 
            className="data-[state=active]:bg-tab-active-background data-[state=active]:text-tab-active-foreground text-tab-foreground rounded-none border-r border-tab-border px-4 py-2"
          >
            HTML
          </TabsTrigger>
          <TabsTrigger 
            value="css"
            className="data-[state=active]:bg-tab-active-background data-[state=active]:text-tab-active-foreground text-tab-foreground rounded-none border-r border-tab-border px-4 py-2"
          >
            CSS
          </TabsTrigger>
          <TabsTrigger 
            value="js"
            className="data-[state=active]:bg-tab-active-background data-[state=active]:text-tab-active-foreground text-tab-foreground rounded-none px-4 py-2"
          >
            JavaScript
          </TabsTrigger>
        </TabsList>

        <TabsContent value="html" className="flex-1 m-0">
          <Editor
            height="100%"
            defaultLanguage="html"
            value={htmlCode}
            onChange={(value) => setHtmlCode(value || '')}
            options={editorOptions}
          />
        </TabsContent>

        <TabsContent value="css" className="flex-1 m-0">
          <Editor
            height="100%"
            defaultLanguage="css"
            value={cssCode}
            onChange={(value) => setCssCode(value || '')}
            options={editorOptions}
          />
        </TabsContent>

        <TabsContent value="js" className="flex-1 m-0">
          <Editor
            height="100%"
            defaultLanguage="javascript"
            value={jsCode}
            onChange={(value) => setJsCode(value || '')}
            options={editorOptions}
          />
        </TabsContent>
      </Tabs>

      <ApiKeyModal 
        open={apiKeyModalOpen} 
        onOpenChange={setApiKeyModalOpen} 
      />
      
      <PromptModal
        open={promptModalOpen}
        onOpenChange={setPromptModalOpen}
        onSubmit={handleCodeGeneration}
        currentCode={getCurrentCode()}
        language={activeTab}
      />
    </div>
  );
};
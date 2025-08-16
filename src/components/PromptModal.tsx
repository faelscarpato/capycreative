import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Wand2, Code, Image as ImageIcon, Lightbulb } from 'lucide-react';

interface PromptModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (prompt: string, type: 'code' | 'image') => void;
  currentCode: string;
  language: string;
}

export const PromptModal: React.FC<PromptModalProps> = ({ 
  open, 
  onOpenChange, 
  onSubmit, 
  currentCode,
  language 
}) => {
  const [prompt, setPrompt] = useState('');
  const [type, setType] = useState<'code' | 'image'>('code');

  const quickPrompts = [
    'Criar um botão animado com hover effect',
    'Adicionar um formulário de contato responsivo',
    'Criar um menu hamburger para mobile',
    'Adicionar um carousel de imagens',
    'Criar um modal de confirmação',
    'Adicionar efeitos de fade in/out',
  ];

  const imagePrompts = [
    'Gerar um logo moderno para empresa de tecnologia',
    'Criar um ícone minimalista',
    'Gerar uma ilustração de hero section',
    'Criar um padrão de background',
    'Gerar um avatar placeholder',
    'Criar um ícone de loading animado',
  ];

  const handleSubmit = () => {
    if (!prompt.trim()) {
      toast.error('Por favor, insira um prompt');
      return;
    }

    const apiKey = localStorage.getItem('gemini_api_key');
    if (!apiKey) {
      toast.error('Configure sua API Key do Gemini primeiro');
      return;
    }

    onSubmit(prompt, type);
    setPrompt('');
    onOpenChange(false);
  };

  const handleCancel = () => {
    setPrompt('');
    onOpenChange(false);
  };

  const handleQuickPrompt = (quickPrompt: string) => {
    setPrompt(quickPrompt);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl bg-panel-background border-panel-border max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-tab-active-foreground">
            <Wand2 className="w-5 h-5" />
            Geração por IA
          </DialogTitle>
          <DialogDescription className="text-sidebar-foreground">
            Use IA para gerar código ou imagens para seu projeto. Linguagem atual: <Badge variant="outline" className="ml-1">{language.toUpperCase()}</Badge>
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {/* Type Selector */}
          <div className="flex gap-2">
            <Button
              variant={type === 'code' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setType('code')}
              className={type === 'code' ? 'bg-primary text-primary-foreground' : 'border-border text-sidebar-foreground hover:text-tab-active-foreground'}
            >
              <Code className="w-4 h-4 mr-1" />
              Código
            </Button>
            <Button
              variant={type === 'image' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setType('image')}
              data-image-mode
              className={type === 'image' ? 'bg-primary text-primary-foreground' : 'border-border text-sidebar-foreground hover:text-tab-active-foreground'}
            >
              <ImageIcon className="w-4 h-4 mr-1" />
              Imagem
            </Button>
          </div>

          {/* Prompt Input */}
          <div className="space-y-2">
            <Label htmlFor="prompt" className="text-tab-active-foreground">
              Descreva o que você quer {type === 'code' ? 'programar' : 'gerar'}
            </Label>
            <Textarea
              id="prompt"
              placeholder={type === 'code' 
                ? `Ex: Criar um ${language === 'html' ? 'header responsivo com navegação' : language === 'css' ? 'layout flexbox com cards' : 'função para validar formulário'}`
                : 'Ex: Gerar um logo moderno para empresa de tecnologia'
              }
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="bg-editor-background border-border text-editor-foreground resize-none"
              rows={3}
            />
          </div>

          {/* Quick Prompts */}
          <div className="space-y-2">
            <Label className="flex items-center gap-1 text-tab-active-foreground">
              <Lightbulb className="w-4 h-4" />
              Sugestões rápidas
            </Label>
            <div className="flex flex-wrap gap-2">
              {(type === 'code' ? quickPrompts : imagePrompts).map((quickPrompt, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuickPrompt(quickPrompt)}
                  className="text-xs h-7 px-2 border border-border text-sidebar-foreground hover:text-tab-active-foreground hover:bg-sidebar-hover"
                >
                  {quickPrompt}
                </Button>
              ))}
            </div>
          </div>

          {/* Context Info */}
          {type === 'code' && currentCode && (
            <div className="space-y-2">
              <Label className="text-tab-active-foreground">Código atual ({language})</Label>
              <div className="bg-editor-background border border-border rounded p-3 text-xs text-editor-foreground max-h-32 overflow-y-auto">
                <pre className="whitespace-pre-wrap">{currentCode.slice(0, 500)}...</pre>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button 
            variant="outline" 
            onClick={handleCancel}
            className="border-border text-sidebar-foreground hover:text-tab-active-foreground hover:bg-sidebar-hover"
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleSubmit}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Wand2 className="w-4 h-4 mr-1" />
            Gerar {type === 'code' ? 'Código' : 'Imagem'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
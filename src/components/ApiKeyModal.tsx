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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Key, Eye, EyeOff } from 'lucide-react';

interface ApiKeyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ open, onOpenChange }) => {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);

  const handleSave = () => {
    if (!apiKey.trim()) {
      toast.error('Por favor, insira uma API Key válida');
      return;
    }

    // Salvar no localStorage (em produção, use uma solução mais segura)
    localStorage.setItem('gemini_api_key', apiKey);
    toast.success('API Key salva com sucesso!');
    onOpenChange(false);
    setApiKey('');
  };

  const handleCancel = () => {
    setApiKey('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-panel-background border-panel-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-tab-active-foreground">
            <Key className="w-5 h-5" />
            Configurar API Key
          </DialogTitle>
          <DialogDescription className="text-sidebar-foreground">
            Insira sua API Key do Google Gemini para habilitar a geração de código e imagens por IA.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="apikey" className="text-tab-active-foreground">
              API Key do Gemini
            </Label>
            <div className="relative">
              <Input
                id="apikey"
                type={showKey ? 'text' : 'password'}
                placeholder="AIzaSy..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="bg-editor-background border-border text-editor-foreground pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 text-sidebar-foreground hover:text-tab-active-foreground"
                onClick={() => setShowKey(!showKey)}
              >
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
          </div>
          
          <div className="text-xs text-sidebar-foreground space-y-1">
            <p>• Obtenha sua API Key em: <span className="text-primary">https://makersuite.google.com/app/apikey</span></p>
            <p>• A chave será armazenada localmente no seu navegador</p>
            <p>• Necessária para geração de código e imagens por IA</p>
          </div>
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
            onClick={handleSave}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
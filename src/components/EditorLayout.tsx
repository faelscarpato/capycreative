import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { CodeEditor } from './CodeEditor';
import { PreviewPanel } from './PreviewPanel';
import { cn } from '@/lib/utils';

export const EditorLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [previewContent, setPreviewContent] = useState('');

  // Auto-close sidebar on larger screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  return (
    <div className="h-screen flex flex-col bg-background text-foreground">
      {/* Top Bar - Mobile only */}
      <div className="lg:hidden flex items-center justify-between p-2 bg-panel-background border-b border-panel-border">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(true)}
          className="text-sidebar-foreground hover:text-tab-active-foreground"
        >
          <Menu className="w-5 h-5" />
        </Button>
        <h1 className="text-sm font-medium text-tab-active-foreground">CapyAI Editor</h1>
        <div className="w-8" /> {/* Spacer */}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar 
          isOpen={sidebarOpen} 
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          className="lg:flex"
        />

        {/* Editor and Preview */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Code Editor */}
          <div className="flex-1 min-h-0">
            <CodeEditor onPreviewChange={setPreviewContent} />
          </div>

          {/* Preview Panel - Hidden on mobile by default */}
          <div className="hidden lg:flex lg:flex-1 lg:min-h-0 border-l border-panel-border">
            <PreviewPanel content={previewContent} />
          </div>
        </div>
      </div>
    </div>
  );
};
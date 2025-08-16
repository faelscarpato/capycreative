import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface PreviewPanelProps {
  content: string;
  className?: string;
}

export const PreviewPanel: React.FC<PreviewPanelProps> = ({ content, className }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current && content) {
      const iframe = iframeRef.current;
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      
      if (doc) {
        doc.open();
        doc.write(content);
        doc.close();
      }
    }
  }, [content]);

  return (
    <div className={cn("flex flex-col h-full bg-background", className)}>
      {/* Preview Header */}
      <div className="flex items-center justify-between p-2 bg-panel-background border-b border-panel-border">
        <h3 className="text-sm font-medium text-tab-active-foreground">Preview</h3>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-error rounded-full"></div>
            <div className="w-3 h-3 bg-warning rounded-full"></div>
            <div className="w-3 h-3 bg-success rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 relative">
        <iframe
          ref={iframeRef}
          className="w-full h-full border-0"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
          title="Preview"
        />
      </div>
    </div>
  );
};
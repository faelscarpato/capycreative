import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { 
  FileText, 
  Folder, 
  Settings, 
  Search, 
  GitBranch, 
  Terminal,
  ChevronRight,
  ChevronDown,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  className?: string;
  isOpen: boolean;
  onToggle: () => void;
}

interface FileItem {
  name: string;
  type: 'file' | 'folder';
  icon?: React.ComponentType<{ className?: string }>;
  children?: FileItem[];
  isOpen?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ className, isOpen, onToggle }) => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['src']));

  const fileStructure: FileItem[] = [
    {
      name: 'src',
      type: 'folder',
      icon: Folder,
      children: [
        { name: 'index.html', type: 'file', icon: FileText },
        { name: 'styles.css', type: 'file', icon: FileText },
        { name: 'script.js', type: 'file', icon: FileText },
        {
          name: 'components',
          type: 'folder',
          icon: Folder,
          children: [
            { name: 'header.html', type: 'file', icon: FileText },
            { name: 'footer.html', type: 'file', icon: FileText },
          ]
        },
        {
          name: 'assets',
          type: 'folder',
          icon: Folder,
          children: [
            { name: 'images', type: 'folder', icon: Folder },
            { name: 'fonts', type: 'folder', icon: Folder },
          ]
        }
      ]
    },
    { name: 'package.json', type: 'file', icon: FileText },
    { name: 'README.md', type: 'file', icon: FileText },
  ];

  const toggleFolder = (folderName: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderName)) {
      newExpanded.delete(folderName);
    } else {
      newExpanded.add(folderName);
    }
    setExpandedFolders(newExpanded);
  };

  const renderFileItem = (item: FileItem, level: number = 0) => {
    const isExpanded = expandedFolders.has(item.name);
    const Icon = item.icon || FileText;

    return (
      <div key={item.name}>
        <div
          className={cn(
            "flex items-center py-1 px-2 cursor-pointer hover:bg-sidebar-hover text-sm",
            "text-sidebar-foreground hover:text-tab-active-foreground transition-colors"
          )}
          style={{ paddingLeft: `${8 + level * 16}px` }}
          onClick={() => item.type === 'folder' ? toggleFolder(item.name) : undefined}
        >
          {item.type === 'folder' && (
            <span className="mr-1">
              {isExpanded ? (
                <ChevronDown className="w-3 h-3" />
              ) : (
                <ChevronRight className="w-3 h-3" />
              )}
            </span>
          )}
          <Icon className="w-4 h-4 mr-2 flex-shrink-0" />
          <span className="truncate">{item.name}</span>
        </div>
        
        {item.type === 'folder' && isExpanded && item.children && (
          <div>
            {item.children.map(child => renderFileItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  const sidebarItems = [
    { icon: FileText, label: 'Explorer', active: true },
    { icon: Search, label: 'Buscar' },
    { icon: GitBranch, label: 'Git' },
    { icon: Terminal, label: 'Terminal' },
    { icon: Settings, label: 'Configurações' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "flex h-full bg-sidebar text-sidebar-foreground transition-all duration-300 z-50",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          "fixed lg:relative",
          className
        )}
      >
        {/* Activity Bar */}
        <div className="w-12 bg-panel-background border-r border-panel-border flex flex-col">
          <div className="flex-1 py-2">
            {sidebarItems.map((item, index) => (
              <div
                key={item.label}
                className={cn(
                  "relative flex items-center justify-center w-12 h-12 cursor-pointer",
                  "hover:text-sidebar-active transition-colors",
                  item.active && "text-sidebar-active"
                )}
                title={item.label}
              >
                {item.active && (
                  <div className="absolute left-0 top-0 w-0.5 h-full bg-sidebar-active" />
                )}
                <item.icon className="w-5 h-5" />
              </div>
            ))}
          </div>
        </div>

        {/* File Explorer */}
        <div className="w-64 flex flex-col bg-sidebar border-r border-panel-border">
          {/* Header */}
          <div className="flex items-center justify-between p-2 border-b border-panel-border">
            <span className="text-xs font-medium text-sidebar-foreground uppercase tracking-wide">
              Explorer
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden w-6 h-6 text-sidebar-foreground hover:text-tab-active-foreground"
              onClick={onToggle}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* File Tree */}
          <div className="flex-1 overflow-auto py-1">
            {fileStructure.map(item => renderFileItem(item))}
          </div>
        </div>
      </div>
    </>
  );
};
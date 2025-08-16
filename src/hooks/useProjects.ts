import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Project {
  id: string;
  title: string;
  html_code: string;
  css_code: string;
  js_code: string;
  created_at: string;
  updated_at: string;
  user_id?: string;
  is_public: boolean;
  description?: string;
}

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load projects for authenticated user
  const loadProjects = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) {
        console.error('Error loading projects:', error);
        toast.error('Erro ao carregar projetos');
        return;
      }

      setProjects(data || []);
    } catch (error) {
      console.error('Error in loadProjects:', error);
      toast.error('Erro ao carregar projetos');
    } finally {
      setIsLoading(false);
    }
  };

  // Save project (create or update)
  const saveProject = async (project: Partial<Project>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error('Você precisa estar logado para salvar projetos');
        return null;
      }

      if (project.id) {
        // Update existing project
        const { data, error } = await supabase
          .from('projects')
          .update({
            title: project.title,
            html_code: project.html_code,
            css_code: project.css_code,
            js_code: project.js_code,
            description: project.description,
            is_public: project.is_public || false
          })
          .eq('id', project.id)
          .select()
          .single();

        if (error) {
          console.error('Error updating project:', error);
          toast.error('Erro ao atualizar projeto');
          return null;
        }

        toast.success('Projeto atualizado com sucesso!');
        return data;
      } else {
        // Create new project
        const { data, error } = await supabase
          .from('projects')
          .insert({
            title: project.title || 'Projeto Sem Nome',
            html_code: project.html_code || '',
            css_code: project.css_code || '',
            js_code: project.js_code || '',
            description: project.description,
            user_id: user.id,
            is_public: project.is_public || false
          })
          .select()
          .single();

        if (error) {
          console.error('Error creating project:', error);
          toast.error('Erro ao criar projeto');
          return null;
        }

        toast.success('Projeto criado com sucesso!');
        return data;
      }
    } catch (error) {
      console.error('Error in saveProject:', error);
      toast.error('Erro ao salvar projeto');
      return null;
    }
  };

  // Delete project
  const deleteProject = async (projectId: string) => {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId);

      if (error) {
        console.error('Error deleting project:', error);
        toast.error('Erro ao deletar projeto');
        return false;
      }

      toast.success('Projeto deletado com sucesso!');
      setProjects(prev => prev.filter(p => p.id !== projectId));
      
      if (currentProject?.id === projectId) {
        setCurrentProject(null);
      }
      
      return true;
    } catch (error) {
      console.error('Error in deleteProject:', error);
      toast.error('Erro ao deletar projeto');
      return false;
    }
  };

  // Auto-save functionality
  const autoSave = async (htmlCode: string, cssCode: string, jsCode: string) => {
    if (!currentProject) return;

    try {
      await supabase
        .from('projects')
        .update({
          html_code: htmlCode,
          css_code: cssCode,
          js_code: jsCode
        })
        .eq('id', currentProject.id);
    } catch (error) {
      console.error('Auto-save error:', error);
    }
  };

  useEffect(() => {
    // Load projects when component mounts
    loadProjects();

    // Set up real-time subscription for projects
    const subscription = supabase
      .channel('projects_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'projects' },
        () => {
          loadProjects();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    projects,
    currentProject,
    setCurrentProject,
    isLoading,
    loadProjects,
    saveProject,
    deleteProject,
    autoSave
  };
};
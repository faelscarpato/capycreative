export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      agents: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          id: number
          image: string | null
          name: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: number
          image?: string | null
          name: string
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: number
          image?: string | null
          name?: string
        }
        Relationships: []
      }
      app_settings: {
        Row: {
          current_reporter_department: string | null
          current_reporter_name: string | null
          current_reporter_role: string | null
          id: string
          report_code_prefix: string | null
          updated_at: string
        }
        Insert: {
          current_reporter_department?: string | null
          current_reporter_name?: string | null
          current_reporter_role?: string | null
          id?: string
          report_code_prefix?: string | null
          updated_at?: string
        }
        Update: {
          current_reporter_department?: string | null
          current_reporter_name?: string | null
          current_reporter_role?: string | null
          id?: string
          report_code_prefix?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      avaliacao_visibilidade_relatorio: {
        Row: {
          avaliador: string
          criterios_avaliados: Json | null
          data_avaliacao: string | null
          id: string
          nota_total: number | null
          observacoes_gerais: string | null
          periodo_referencia_fim: string
          periodo_referencia_inicio: string
        }
        Insert: {
          avaliador: string
          criterios_avaliados?: Json | null
          data_avaliacao?: string | null
          id?: string
          nota_total?: number | null
          observacoes_gerais?: string | null
          periodo_referencia_fim: string
          periodo_referencia_inicio: string
        }
        Update: {
          avaliador?: string
          criterios_avaliados?: Json | null
          data_avaliacao?: string | null
          id?: string
          nota_total?: number | null
          observacoes_gerais?: string | null
          periodo_referencia_fim?: string
          periodo_referencia_inicio?: string
        }
        Relationships: []
      }
      clientes: {
        Row: {
          criado_em: string | null
          email: string | null
          empresa: string | null
          id: string
          nome: string
          telefone: string | null
        }
        Insert: {
          criado_em?: string | null
          email?: string | null
          empresa?: string | null
          id?: string
          nome: string
          telefone?: string | null
        }
        Update: {
          criado_em?: string | null
          email?: string | null
          empresa?: string | null
          id?: string
          nome?: string
          telefone?: string | null
        }
        Relationships: []
      }
      componentes: {
        Row: {
          ativo: boolean | null
          codigo_componente: string
          created_at: string | null
          descricao: string
          id: string
        }
        Insert: {
          ativo?: boolean | null
          codigo_componente: string
          created_at?: string | null
          descricao: string
          id?: string
        }
        Update: {
          ativo?: boolean | null
          codigo_componente?: string
          created_at?: string | null
          descricao?: string
          id?: string
        }
        Relationships: []
      }
      criterios_aceitacao_qualidade: {
        Row: {
          created_at: string | null
          especificacao_nominal: string | null
          id: string
          id_plano_inspecao: string
          limite_inferior_tolerancia: string | null
          limite_superior_tolerancia: string | null
          metodo_inspecao: string | null
          parametro_inspecao: string
          unidade_medida_parametro: string | null
        }
        Insert: {
          created_at?: string | null
          especificacao_nominal?: string | null
          id?: string
          id_plano_inspecao: string
          limite_inferior_tolerancia?: string | null
          limite_superior_tolerancia?: string | null
          metodo_inspecao?: string | null
          parametro_inspecao: string
          unidade_medida_parametro?: string | null
        }
        Update: {
          created_at?: string | null
          especificacao_nominal?: string | null
          id?: string
          id_plano_inspecao?: string
          limite_inferior_tolerancia?: string | null
          limite_superior_tolerancia?: string | null
          metodo_inspecao?: string | null
          parametro_inspecao?: string
          unidade_medida_parametro?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "criterios_aceitacao_qualidade_id_plano_inspecao_fkey"
            columns: ["id_plano_inspecao"]
            isOneToOne: false
            referencedRelation: "planos_inspecao"
            referencedColumns: ["id"]
          },
        ]
      }
      departments: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      documents: {
        Row: {
          approval_date: string | null
          approved_by: string | null
          content: Json | null
          created_at: string
          created_by: string | null
          id: string
          status: Database["public"]["Enums"]["document_status"]
          title: string
          type: string
          updated_at: string
        }
        Insert: {
          approval_date?: string | null
          approved_by?: string | null
          content?: Json | null
          created_at?: string
          created_by?: string | null
          id?: string
          status?: Database["public"]["Enums"]["document_status"]
          title: string
          type: string
          updated_at?: string
        }
        Update: {
          approval_date?: string | null
          approved_by?: string | null
          content?: Json | null
          created_at?: string
          created_by?: string | null
          id?: string
          status?: Database["public"]["Enums"]["document_status"]
          title?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      employees: {
        Row: {
          admission_date: string | null
          function: string | null
          id: string
          name: string
          role: string | null
          shift: number | null
        }
        Insert: {
          admission_date?: string | null
          function?: string | null
          id: string
          name: string
          role?: string | null
          shift?: number | null
        }
        Update: {
          admission_date?: string | null
          function?: string | null
          id?: string
          name?: string
          role?: string | null
          shift?: number | null
        }
        Relationships: []
      }
      forum_posts: {
        Row: {
          content: string
          created_at: string | null
          id: string
          posted_by_employee_id: string
          replies_count: number | null
          title: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          posted_by_employee_id: string
          replies_count?: number | null
          title: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          posted_by_employee_id?: string
          replies_count?: number | null
          title?: string
        }
        Relationships: []
      }
      funcionarios: {
        Row: {
          cargo: string
          created_at: string | null
          data_admissao: string | null
          data_nascimento: string | null
          departamento: string
          email: string | null
          id: string
          matricula: string
          nome: string
          status: string | null
          telefone: string | null
          updated_at: string | null
        }
        Insert: {
          cargo: string
          created_at?: string | null
          data_admissao?: string | null
          data_nascimento?: string | null
          departamento: string
          email?: string | null
          id?: string
          matricula: string
          nome: string
          status?: string | null
          telefone?: string | null
          updated_at?: string | null
        }
        Update: {
          cargo?: string
          created_at?: string | null
          data_admissao?: string | null
          data_nascimento?: string | null
          departamento?: string
          email?: string | null
          id?: string
          matricula?: string
          nome?: string
          status?: string | null
          telefone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      generated_images: {
        Row: {
          created_at: string | null
          id: string
          image_url: string
          project_id: string | null
          prompt: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          image_url: string
          project_id?: string | null
          prompt: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          image_url?: string
          project_id?: string | null
          prompt?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "generated_images_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      instrumentos_qualidade: {
        Row: {
          codigo_instrumento: string
          created_at: string | null
          data_proxima_calibracao: string | null
          data_ultima_calibracao: string | null
          descricao_instrumento: string
          frequencia_calibracao_meses: number
          id: string
          localizacao: string | null
          numero_serie: string
          status_instrumento: string
        }
        Insert: {
          codigo_instrumento: string
          created_at?: string | null
          data_proxima_calibracao?: string | null
          data_ultima_calibracao?: string | null
          descricao_instrumento: string
          frequencia_calibracao_meses: number
          id?: string
          localizacao?: string | null
          numero_serie: string
          status_instrumento: string
        }
        Update: {
          codigo_instrumento?: string
          created_at?: string | null
          data_proxima_calibracao?: string | null
          data_ultima_calibracao?: string | null
          descricao_instrumento?: string
          frequencia_calibracao_meses?: number
          id?: string
          localizacao?: string | null
          numero_serie?: string
          status_instrumento?: string
        }
        Relationships: []
      }
      itens_pedido: {
        Row: {
          atualizado_em: string | null
          criado_em: string | null
          data_entrega: string
          id: string
          observacoes: string | null
          pedido_id: string | null
          preco_unitario: number
          produto_codigo: string
          produto_nome: string
          quantidade: number
          status: string | null
        }
        Insert: {
          atualizado_em?: string | null
          criado_em?: string | null
          data_entrega: string
          id?: string
          observacoes?: string | null
          pedido_id?: string | null
          preco_unitario: number
          produto_codigo: string
          produto_nome: string
          quantidade: number
          status?: string | null
        }
        Update: {
          atualizado_em?: string | null
          criado_em?: string | null
          data_entrega?: string
          id?: string
          observacoes?: string | null
          pedido_id?: string | null
          preco_unitario?: number
          produto_codigo?: string
          produto_nome?: string
          quantidade?: number
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "itens_pedido_pedido_id_fkey"
            columns: ["pedido_id"]
            isOneToOne: false
            referencedRelation: "pedidos_venda"
            referencedColumns: ["id"]
          },
        ]
      }
      kpis: {
        Row: {
          created_at: string | null
          cycle_time_avg: number
          employee_id: string
          id: string
          oee: number
          quality_points: number
          scrap_rate: number
          shift_date: string
          shift_number: number
        }
        Insert: {
          created_at?: string | null
          cycle_time_avg: number
          employee_id: string
          id?: string
          oee: number
          quality_points: number
          scrap_rate: number
          shift_date: string
          shift_number: number
        }
        Update: {
          created_at?: string | null
          cycle_time_avg?: number
          employee_id?: string
          id?: string
          oee?: number
          quality_points?: number
          scrap_rate?: number
          shift_date?: string
          shift_number?: number
        }
        Relationships: []
      }
      logs: {
        Row: {
          acao: string | null
          criado_em: string | null
          detalhe: string | null
          id: string
          usuario_id: string | null
        }
        Insert: {
          acao?: string | null
          criado_em?: string | null
          detalhe?: string | null
          id?: string
          usuario_id?: string | null
        }
        Update: {
          acao?: string | null
          criado_em?: string | null
          detalhe?: string | null
          id?: string
          usuario_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "logs_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      machine_sensor_data: {
        Row: {
          created_at: string | null
          id: string
          machine_id: string
          reading: number
          sensor_type: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          machine_id: string
          reading: number
          sensor_type: string
        }
        Update: {
          created_at?: string | null
          id?: string
          machine_id?: string
          reading?: number
          sensor_type?: string
        }
        Relationships: []
      }
      machines: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      maintenance_logs: {
        Row: {
          completed_at: string | null
          created_at: string | null
          description: string
          id: string
          machine_id: string
          performed_by_employee_id: string | null
          scheduled_for: string | null
          status: string
          type: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          description: string
          id?: string
          machine_id: string
          performed_by_employee_id?: string | null
          scheduled_for?: string | null
          status?: string
          type: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          description?: string
          id?: string
          machine_id?: string
          performed_by_employee_id?: string | null
          scheduled_for?: string | null
          status?: string
          type?: string
        }
        Relationships: []
      }
      materiais_necessarios_op: {
        Row: {
          atualizado_em: string | null
          criado_em: string | null
          id: string
          material_codigo: string
          material_nome: string
          ordem_producao_id: string | null
          quantidade_alocada: number | null
          quantidade_necessaria: number
          status: string | null
          unidade: string
        }
        Insert: {
          atualizado_em?: string | null
          criado_em?: string | null
          id?: string
          material_codigo: string
          material_nome: string
          ordem_producao_id?: string | null
          quantidade_alocada?: number | null
          quantidade_necessaria: number
          status?: string | null
          unidade: string
        }
        Update: {
          atualizado_em?: string | null
          criado_em?: string | null
          id?: string
          material_codigo?: string
          material_nome?: string
          ordem_producao_id?: string | null
          quantidade_alocada?: number | null
          quantidade_necessaria?: number
          status?: string | null
          unidade?: string
        }
        Relationships: [
          {
            foreignKeyName: "materiais_necessarios_op_ordem_producao_id_fkey"
            columns: ["ordem_producao_id"]
            isOneToOne: false
            referencedRelation: "ordens_producao"
            referencedColumns: ["id"]
          },
        ]
      }
      materials_batches: {
        Row: {
          batch_id: string
          created_at: string
          id: string
          material_type: string
          notes: string | null
          quality_status: string
          supplier: string | null
          user_id: string | null
        }
        Insert: {
          batch_id: string
          created_at?: string
          id?: string
          material_type: string
          notes?: string | null
          quality_status: string
          supplier?: string | null
          user_id?: string | null
        }
        Update: {
          batch_id?: string
          created_at?: string
          id?: string
          material_type?: string
          notes?: string | null
          quality_status?: string
          supplier?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      materias_primas: {
        Row: {
          ativo: boolean | null
          codigo_materia_prima: string
          created_at: string | null
          descricao: string
          id: string
        }
        Insert: {
          ativo?: boolean | null
          codigo_materia_prima: string
          created_at?: string | null
          descricao: string
          id?: string
        }
        Update: {
          ativo?: boolean | null
          codigo_materia_prima?: string
          created_at?: string | null
          descricao?: string
          id?: string
        }
        Relationships: []
      }
      mold_maintenance_history: {
        Row: {
          created_at: string
          description: string | null
          id: string
          maintenance_date: string
          mold_id: string
          next_maintenance_date: string | null
          type: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          maintenance_date: string
          mold_id: string
          next_maintenance_date?: string | null
          type: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          maintenance_date?: string
          mold_id?: string
          next_maintenance_date?: string | null
          type?: string
          user_id?: string | null
        }
        Relationships: []
      }
      molds: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      nao_conformidades_qualidade: {
        Row: {
          acao_imediata: string | null
          created_at: string | null
          data_abertura: string
          data_fechamento: string | null
          descricao_nao_conformidade: string
          id: string
          numero_rnc: string
          observacoes_fechamento: string | null
          origem_rnc: string
          produto_lote_afetado: string | null
          responsavel_acao_imediata: string | null
          status_rnc: string
        }
        Insert: {
          acao_imediata?: string | null
          created_at?: string | null
          data_abertura: string
          data_fechamento?: string | null
          descricao_nao_conformidade: string
          id?: string
          numero_rnc: string
          observacoes_fechamento?: string | null
          origem_rnc: string
          produto_lote_afetado?: string | null
          responsavel_acao_imediata?: string | null
          status_rnc: string
        }
        Update: {
          acao_imediata?: string | null
          created_at?: string | null
          data_abertura?: string
          data_fechamento?: string | null
          descricao_nao_conformidade?: string
          id?: string
          numero_rnc?: string
          observacoes_fechamento?: string | null
          origem_rnc?: string
          produto_lote_afetado?: string | null
          responsavel_acao_imediata?: string | null
          status_rnc?: string
        }
        Relationships: []
      }
      necessidades_material: {
        Row: {
          atualizado_em: string | null
          criado_em: string | null
          data_necessidade: string
          id: string
          material_codigo: string
          material_nome: string
          ordem_producao_id: string | null
          produto_codigo: string
          quantidade_comprar: number | null
          quantidade_disponivel: number | null
          quantidade_necessaria: number
          status: string | null
        }
        Insert: {
          atualizado_em?: string | null
          criado_em?: string | null
          data_necessidade: string
          id?: string
          material_codigo: string
          material_nome: string
          ordem_producao_id?: string | null
          produto_codigo: string
          quantidade_comprar?: number | null
          quantidade_disponivel?: number | null
          quantidade_necessaria: number
          status?: string | null
        }
        Update: {
          atualizado_em?: string | null
          criado_em?: string | null
          data_necessidade?: string
          id?: string
          material_codigo?: string
          material_nome?: string
          ordem_producao_id?: string | null
          produto_codigo?: string
          quantidade_comprar?: number | null
          quantidade_disponivel?: number | null
          quantidade_necessaria?: number
          status?: string | null
        }
        Relationships: []
      }
      non_conformities: {
        Row: {
          created_at: string
          criticality: string
          defect_type: string
          description: string
          id: string
          image_url: string | null
          machine_id: string
          part_name: string
          status: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          criticality: string
          defect_type: string
          description: string
          id?: string
          image_url?: string | null
          machine_id: string
          part_name: string
          status?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          criticality?: string
          defect_type?: string
          description?: string
          id?: string
          image_url?: string | null
          machine_id?: string
          part_name?: string
          status?: string
          user_id?: string | null
        }
        Relationships: []
      }
      operacoes_roteiro: {
        Row: {
          atualizado_em: string | null
          criado_em: string | null
          data_fim_planejada: string
          data_fim_real: string | null
          data_inicio_planejada: string
          data_inicio_real: string | null
          id: string
          maquina_codigo: string
          maquina_nome: string
          observacoes: string | null
          operacao: string
          ordem_producao_id: string | null
          sequencia: number
          status: string | null
          tempo_setup: number | null
          tempo_total_planejado: number | null
          tempo_total_real: number | null
          tempo_unitario: number | null
        }
        Insert: {
          atualizado_em?: string | null
          criado_em?: string | null
          data_fim_planejada: string
          data_fim_real?: string | null
          data_inicio_planejada: string
          data_inicio_real?: string | null
          id?: string
          maquina_codigo: string
          maquina_nome: string
          observacoes?: string | null
          operacao: string
          ordem_producao_id?: string | null
          sequencia: number
          status?: string | null
          tempo_setup?: number | null
          tempo_total_planejado?: number | null
          tempo_total_real?: number | null
          tempo_unitario?: number | null
        }
        Update: {
          atualizado_em?: string | null
          criado_em?: string | null
          data_fim_planejada?: string
          data_fim_real?: string | null
          data_inicio_planejada?: string
          data_inicio_real?: string | null
          id?: string
          maquina_codigo?: string
          maquina_nome?: string
          observacoes?: string | null
          operacao?: string
          ordem_producao_id?: string | null
          sequencia?: number
          status?: string | null
          tempo_setup?: number | null
          tempo_total_planejado?: number | null
          tempo_total_real?: number | null
          tempo_unitario?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "operacoes_roteiro_ordem_producao_id_fkey"
            columns: ["ordem_producao_id"]
            isOneToOne: false
            referencedRelation: "ordens_producao"
            referencedColumns: ["id"]
          },
        ]
      }
      ordens_producao: {
        Row: {
          atualizado_em: string | null
          criado_em: string | null
          data_fim_planejada: string
          data_fim_real: string | null
          data_inicio_planejada: string
          data_inicio_real: string | null
          id: string
          item_pedido_id: string | null
          numero: string
          observacoes: string | null
          pedido_venda_id: string | null
          prioridade: number | null
          produto_codigo: string
          produto_nome: string
          quantidade_planejada: number
          quantidade_produzida: number | null
          status: string | null
        }
        Insert: {
          atualizado_em?: string | null
          criado_em?: string | null
          data_fim_planejada: string
          data_fim_real?: string | null
          data_inicio_planejada: string
          data_inicio_real?: string | null
          id?: string
          item_pedido_id?: string | null
          numero: string
          observacoes?: string | null
          pedido_venda_id?: string | null
          prioridade?: number | null
          produto_codigo: string
          produto_nome: string
          quantidade_planejada: number
          quantidade_produzida?: number | null
          status?: string | null
        }
        Update: {
          atualizado_em?: string | null
          criado_em?: string | null
          data_fim_planejada?: string
          data_fim_real?: string | null
          data_inicio_planejada?: string
          data_inicio_real?: string | null
          id?: string
          item_pedido_id?: string | null
          numero?: string
          observacoes?: string | null
          pedido_venda_id?: string | null
          prioridade?: number | null
          produto_codigo?: string
          produto_nome?: string
          quantidade_planejada?: number
          quantidade_produzida?: number | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ordens_producao_item_pedido_id_fkey"
            columns: ["item_pedido_id"]
            isOneToOne: false
            referencedRelation: "itens_pedido"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ordens_producao_pedido_venda_id_fkey"
            columns: ["pedido_venda_id"]
            isOneToOne: false
            referencedRelation: "pedidos_venda"
            referencedColumns: ["id"]
          },
        ]
      }
      ordens_servico: {
        Row: {
          created_at: string | null
          data_abertura: string
          data_conclusao: string | null
          id: string
          maquina: string
          molde: string
          setor: string
          status: string
          tipo_servico: string
        }
        Insert: {
          created_at?: string | null
          data_abertura: string
          data_conclusao?: string | null
          id?: string
          maquina: string
          molde: string
          setor: string
          status?: string
          tipo_servico: string
        }
        Update: {
          created_at?: string | null
          data_abertura?: string
          data_conclusao?: string | null
          id?: string
          maquina?: string
          molde?: string
          setor?: string
          status?: string
          tipo_servico?: string
        }
        Relationships: []
      }
      parts: {
        Row: {
          code: string | null
          created_at: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          code?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          code?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      pedidos_venda: {
        Row: {
          atualizado_em: string | null
          cliente: string
          criado_em: string | null
          data_entrega: string
          data_pedido: string
          id: string
          numero: string
          observacoes: string | null
          status: string | null
          valor_total: number | null
        }
        Insert: {
          atualizado_em?: string | null
          cliente: string
          criado_em?: string | null
          data_entrega: string
          data_pedido: string
          id?: string
          numero: string
          observacoes?: string | null
          status?: string | null
          valor_total?: number | null
        }
        Update: {
          atualizado_em?: string | null
          cliente?: string
          criado_em?: string | null
          data_entrega?: string
          data_pedido?: string
          id?: string
          numero?: string
          observacoes?: string | null
          status?: string | null
          valor_total?: number | null
        }
        Relationships: []
      }
      planos_inspecao: {
        Row: {
          amostragem: string | null
          ativo: boolean | null
          codigo_plano: string
          created_at: string | null
          descricao_plano: string
          frequencia_inspecao: string | null
          id: string
          id_componente: string | null
          id_materia_prima: string | null
          id_produto_engenharia: string | null
          tipo_inspecao: string
          versao_plano: string
        }
        Insert: {
          amostragem?: string | null
          ativo?: boolean | null
          codigo_plano: string
          created_at?: string | null
          descricao_plano: string
          frequencia_inspecao?: string | null
          id?: string
          id_componente?: string | null
          id_materia_prima?: string | null
          id_produto_engenharia?: string | null
          tipo_inspecao: string
          versao_plano: string
        }
        Update: {
          amostragem?: string | null
          ativo?: boolean | null
          codigo_plano?: string
          created_at?: string | null
          descricao_plano?: string
          frequencia_inspecao?: string | null
          id?: string
          id_componente?: string | null
          id_materia_prima?: string | null
          id_produto_engenharia?: string | null
          tipo_inspecao?: string
          versao_plano?: string
        }
        Relationships: [
          {
            foreignKeyName: "planos_inspecao_qualidade_id_componente_fkey"
            columns: ["id_componente"]
            isOneToOne: false
            referencedRelation: "componentes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "planos_inspecao_qualidade_id_materia_prima_fkey"
            columns: ["id_materia_prima"]
            isOneToOne: false
            referencedRelation: "materias_primas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "planos_inspecao_qualidade_id_produto_engenharia_fkey"
            columns: ["id_produto_engenharia"]
            isOneToOne: false
            referencedRelation: "produtos_engenharia"
            referencedColumns: ["id"]
          },
        ]
      }
      planos_producao: {
        Row: {
          atualizado_em: string | null
          criado_em: string | null
          criado_por: string
          id: string
          nome: string
          observacoes: string | null
          ordens_producao: Json | null
          periodo_fim: string
          periodo_inicio: string
          status: string | null
        }
        Insert: {
          atualizado_em?: string | null
          criado_em?: string | null
          criado_por: string
          id?: string
          nome: string
          observacoes?: string | null
          ordens_producao?: Json | null
          periodo_fim: string
          periodo_inicio: string
          status?: string | null
        }
        Update: {
          atualizado_em?: string | null
          criado_em?: string | null
          criado_por?: string
          id?: string
          nome?: string
          observacoes?: string | null
          ordens_producao?: Json | null
          periodo_fim?: string
          periodo_inicio?: string
          status?: string | null
        }
        Relationships: []
      }
      pop_registros: {
        Row: {
          checklist: Json | null
          created_at: string
          descricao: string | null
          foto_url: string | null
          id: number
          maquina: string | null
          operador: string | null
          processo: string | null
          produto: string | null
          relatorio_gerado: string | null
          turno: string | null
        }
        Insert: {
          checklist?: Json | null
          created_at?: string
          descricao?: string | null
          foto_url?: string | null
          id?: number
          maquina?: string | null
          operador?: string | null
          processo?: string | null
          produto?: string | null
          relatorio_gerado?: string | null
          turno?: string | null
        }
        Update: {
          checklist?: Json | null
          created_at?: string
          descricao?: string | null
          foto_url?: string | null
          id?: number
          maquina?: string | null
          operador?: string | null
          processo?: string | null
          produto?: string | null
          relatorio_gerado?: string | null
          turno?: string | null
        }
        Relationships: []
      }
      previsao_demanda: {
        Row: {
          atualizado_em: string | null
          criado_em: string | null
          demanda_confirmada: number | null
          demanda_prevista: number
          demanda_real: number | null
          id: string
          metodo_previsao: string | null
          periodo: string
          produto_codigo: string
          produto_nome: string
        }
        Insert: {
          atualizado_em?: string | null
          criado_em?: string | null
          demanda_confirmada?: number | null
          demanda_prevista: number
          demanda_real?: number | null
          id?: string
          metodo_previsao?: string | null
          periodo: string
          produto_codigo: string
          produto_nome: string
        }
        Update: {
          atualizado_em?: string | null
          criado_em?: string | null
          demanda_confirmada?: number | null
          demanda_prevista?: number
          demanda_real?: number | null
          id?: string
          metodo_previsao?: string | null
          periodo?: string
          produto_codigo?: string
          produto_nome?: string
        }
        Relationships: []
      }
      produtos: {
        Row: {
          criado_em: string | null
          descricao: string | null
          id: string
          nome: string
          versao: string | null
        }
        Insert: {
          criado_em?: string | null
          descricao?: string | null
          id?: string
          nome: string
          versao?: string | null
        }
        Update: {
          criado_em?: string | null
          descricao?: string | null
          id?: string
          nome?: string
          versao?: string | null
        }
        Relationships: []
      }
      produtos_engenharia: {
        Row: {
          ativo: boolean | null
          codigo_interno_engenharia: string
          created_at: string | null
          descricao_produto: string
          id: string
        }
        Insert: {
          ativo?: boolean | null
          codigo_interno_engenharia: string
          created_at?: string | null
          descricao_produto: string
          id?: string
        }
        Update: {
          ativo?: boolean | null
          codigo_interno_engenharia?: string
          created_at?: string | null
          descricao_produto?: string
          id?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          created_at: string | null
          css_code: string | null
          description: string | null
          html_code: string | null
          id: string
          is_public: boolean | null
          js_code: string | null
          title: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          css_code?: string | null
          description?: string | null
          html_code?: string | null
          id?: string
          is_public?: boolean | null
          js_code?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          css_code?: string | null
          description?: string | null
          html_code?: string | null
          id?: string
          is_public?: boolean | null
          js_code?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      registros_inspecao_qualidade: {
        Row: {
          created_at: string | null
          data_hora_inspecao: string
          id: string
          id_plano_inspecao: string
          inspetor: string
          lote_inspecionado: string | null
          observacoes_gerais: string | null
          resultado_geral: string
          resultados_criterios: Json | null
        }
        Insert: {
          created_at?: string | null
          data_hora_inspecao: string
          id?: string
          id_plano_inspecao: string
          inspetor: string
          lote_inspecionado?: string | null
          observacoes_gerais?: string | null
          resultado_geral: string
          resultados_criterios?: Json | null
        }
        Update: {
          created_at?: string | null
          data_hora_inspecao?: string
          id?: string
          id_plano_inspecao?: string
          inspetor?: string
          lote_inspecionado?: string | null
          observacoes_gerais?: string | null
          resultado_geral?: string
          resultados_criterios?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "registros_inspecao_qualidade_id_plano_inspecao_fkey"
            columns: ["id_plano_inspecao"]
            isOneToOne: false
            referencedRelation: "planos_inspecao"
            referencedColumns: ["id"]
          },
        ]
      }
      reportes: {
        Row: {
          created_at: string | null
          descricao: string | null
          id: string
          imagem_url: string | null
          nome_operador: string | null
          prioridade: string | null
          titulo: string | null
        }
        Insert: {
          created_at?: string | null
          descricao?: string | null
          id?: string
          imagem_url?: string | null
          nome_operador?: string | null
          prioridade?: string | null
          titulo?: string | null
        }
        Update: {
          created_at?: string | null
          descricao?: string | null
          id?: string
          imagem_url?: string | null
          nome_operador?: string | null
          prioridade?: string | null
          titulo?: string | null
        }
        Relationships: []
      }
      reports: {
        Row: {
          content: string
          created_at: string
          date: string
          form_data: Json | null
          id: string
          image_urls: string[] | null
          inspector: string | null
          machine_id: string | null
          mold_id: string | null
          part_id: string | null
          report_type_detail: string | null
          severity: string | null
          title: string
        }
        Insert: {
          content: string
          created_at?: string
          date: string
          form_data?: Json | null
          id: string
          image_urls?: string[] | null
          inspector?: string | null
          machine_id?: string | null
          mold_id?: string | null
          part_id?: string | null
          report_type_detail?: string | null
          severity?: string | null
          title: string
        }
        Update: {
          content?: string
          created_at?: string
          date?: string
          form_data?: Json | null
          id?: string
          image_urls?: string[] | null
          inspector?: string | null
          machine_id?: string | null
          mold_id?: string | null
          part_id?: string | null
          report_type_detail?: string | null
          severity?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_machine"
            columns: ["machine_id"]
            isOneToOne: false
            referencedRelation: "machines"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_mold"
            columns: ["mold_id"]
            isOneToOne: false
            referencedRelation: "molds"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_part"
            columns: ["part_id"]
            isOneToOne: false
            referencedRelation: "parts"
            referencedColumns: ["id"]
          },
        ]
      }
      reports1: {
        Row: {
          assunto: string | null
          created_at: string
          display_duration: number | null
          id: number
          is_paused: boolean | null
          maquina: string | null
          message: string | null
          photo_url: string | null
          priority: string | null
          responsavel_destino: string | null
          status: string | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          assunto?: string | null
          created_at?: string
          display_duration?: number | null
          id?: number
          is_paused?: boolean | null
          maquina?: string | null
          message?: string | null
          photo_url?: string | null
          priority?: string | null
          responsavel_destino?: string | null
          status?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          assunto?: string | null
          created_at?: string
          display_duration?: number | null
          id?: number
          is_paused?: boolean | null
          maquina?: string | null
          message?: string | null
          photo_url?: string | null
          priority?: string | null
          responsavel_destino?: string | null
          status?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      roles: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      simulacoes_sequenciamento: {
        Row: {
          criado_em: string | null
          criterio: string
          id: string
          metricas_resultado: Json
          nome: string
          ordens_sequenciadas: Json
        }
        Insert: {
          criado_em?: string | null
          criterio: string
          id?: string
          metricas_resultado?: Json
          nome: string
          ordens_sequenciadas?: Json
        }
        Update: {
          criado_em?: string | null
          criterio?: string
          id?: string
          metricas_resultado?: Json
          nome?: string
          ordens_sequenciadas?: Json
        }
        Relationships: []
      }
      system_users: {
        Row: {
          created_at: string | null
          employee_id: string | null
          id: string
          password: string
          role: string
          username: string
        }
        Insert: {
          created_at?: string | null
          employee_id?: string | null
          id?: string
          password: string
          role?: string
          username: string
        }
        Update: {
          created_at?: string | null
          employee_id?: string | null
          id?: string
          password?: string
          role?: string
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "system_users_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: true
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      tickets: {
        Row: {
          atualizado_em: string | null
          categoria: string | null
          cliente_id: string | null
          criado_em: string | null
          descricao: string | null
          id: string
          produto_id: string | null
          status: string | null
          titulo: string
        }
        Insert: {
          atualizado_em?: string | null
          categoria?: string | null
          cliente_id?: string | null
          criado_em?: string | null
          descricao?: string | null
          id?: string
          produto_id?: string | null
          status?: string | null
          titulo: string
        }
        Update: {
          atualizado_em?: string | null
          categoria?: string | null
          cliente_id?: string | null
          criado_em?: string | null
          descricao?: string | null
          id?: string
          produto_id?: string | null
          status?: string | null
          titulo?: string
        }
        Relationships: [
          {
            foreignKeyName: "tickets_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tickets_produto_id_fkey"
            columns: ["produto_id"]
            isOneToOne: false
            referencedRelation: "produtos"
            referencedColumns: ["id"]
          },
        ]
      }
      trainings: {
        Row: {
          category: string | null
          certificate_url: string | null
          created_at: string | null
          description: string | null
          id: string
          progress: number | null
          status: string
          title: string
        }
        Insert: {
          category?: string | null
          certificate_url?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          progress?: number | null
          status: string
          title: string
        }
        Update: {
          category?: string | null
          certificate_url?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          progress?: number | null
          status?: string
          title?: string
        }
        Relationships: []
      }
      user_settings: {
        Row: {
          auto_save: boolean | null
          created_at: string | null
          gemini_api_key: string | null
          id: string
          theme: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          auto_save?: boolean | null
          created_at?: string | null
          gemini_api_key?: string | null
          id?: string
          theme?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          auto_save?: boolean | null
          created_at?: string | null
          gemini_api_key?: string | null
          id?: string
          theme?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      usuarios: {
        Row: {
          ativo: boolean | null
          criado_em: string | null
          email: string | null
          id: string
          login: string
          nome: string
          perfil: string | null
          senha: string | null
        }
        Insert: {
          ativo?: boolean | null
          criado_em?: string | null
          email?: string | null
          id?: string
          login: string
          nome: string
          perfil?: string | null
          senha?: string | null
        }
        Update: {
          ativo?: boolean | null
          criado_em?: string | null
          email?: string | null
          id?: string
          login?: string
          nome?: string
          perfil?: string | null
          senha?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      view_carga_maquinas: {
        Row: {
          data: string | null
          maquina_codigo: string | null
          maquina_nome: string | null
          percentual_ocupacao: number | null
          total_minutos_programados: number | null
          total_operacoes: number | null
        }
        Relationships: []
      }
      view_kpis_pcp: {
        Row: {
          ordens_concluidas: number | null
          ordens_em_producao: number | null
          ordens_planejadas: number | null
          pedidos_pendentes: number | null
          periodo: string | null
          taxa_cumprimento_prazo: number | null
          utilizacao_media_maquinas: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      calcular_mrp: {
        Args: {
          data_necessidade: string
          produto_codigo_param: string
          quantidade: number
        }
        Returns: {
          material_codigo: string
          material_nome: string
          quantidade_comprar: number
          quantidade_disponivel: number
          quantidade_necessaria: number
        }[]
      }
    }
    Enums: {
      document_status: "draft" | "submitted" | "approved" | "rejected"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      document_status: ["draft", "submitted", "approved", "rejected"],
    },
  },
} as const

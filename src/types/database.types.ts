export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      blogs: {
        Row: {
          id: string
          slug: string
          title: string
          description: string
          content: string
          read_time: string
          image_url: string
          category: string
          difficulty: string
          type: string
          order_index: number | null
          published: boolean
          footer_enabled: boolean | null
          footer_type: string | null
          footer_target_slug: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          description: string
          content?: string
          read_time?: string
          image_url?: string
          category?: string
          difficulty?: string
          type?: string
          order_index?: number | null
          published?: boolean
          footer_enabled?: boolean | null
          footer_type?: string | null
          footer_target_slug?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          description?: string
          content?: string
          read_time?: string
          image_url?: string
          category?: string
          difficulty?: string
          type?: string
          order_index?: number | null
          published?: boolean
          footer_enabled?: boolean | null
          footer_type?: string | null
          footer_target_slug?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      admin_config: {
        Row: {
          id: string
          password_hash: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          password_hash: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          password_hash?: string
          created_at?: string
          updated_at?: string
        }
      }
      quizzes: {
        Row: {
          id: string
          lesson_id: string | null
          title: string
          description: string
          questions: Json
          passing_score: number
          published: boolean
          quiz_type: string
          icon: string
          color_scheme: string
          result_categories: Json
          slug: string | null
          order_index: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          lesson_id?: string | null
          title: string
          description: string
          questions?: Json
          passing_score?: number
          published?: boolean
          quiz_type?: string
          icon?: string
          color_scheme?: string
          result_categories?: Json
          slug?: string | null
          order_index?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          lesson_id?: string | null
          title?: string
          description?: string
          questions?: Json
          passing_score?: number
          published?: boolean
          quiz_type?: string
          icon?: string
          color_scheme?: string
          result_categories?: Json
          slug?: string | null
          order_index?: number
          created_at?: string
          updated_at?: string
        }
      }
      simulations: {
        Row: {
          id: string
          slug: string
          title: string
          description: string
          category: string
          difficulty: string
          duration: string
          component_type: string
          icon: string
          color_scheme: string
          order_index: number
          published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          description: string
          category?: string
          difficulty?: string
          duration?: string
          component_type?: string
          icon?: string
          color_scheme?: string
          order_index?: number
          published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          description?: string
          category?: string
          difficulty?: string
          duration?: string
          component_type?: string
          icon?: string
          color_scheme?: string
          order_index?: number
          published?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      simulation_steps: {
        Row: {
          id: string
          simulation_id: string
          step_order: number
          title: string
          description: string
          hints: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          simulation_id: string
          step_order?: number
          title: string
          description?: string
          hints?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          simulation_id?: string
          step_order?: number
          title?: string
          description?: string
          hints?: Json
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

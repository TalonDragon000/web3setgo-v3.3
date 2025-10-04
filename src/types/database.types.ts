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
          published: boolean
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
          published?: boolean
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
          published?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      lessons: {
        Row: {
          id: string
          slug: string
          title: string
          description: string
          content: string
          duration: string
          difficulty: string
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
          content?: string
          duration?: string
          difficulty?: string
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
          content?: string
          duration?: string
          difficulty?: string
          order_index?: number
          published?: boolean
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
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

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
    PostgrestVersion: "14.18"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      exam_call_events: {
        Row: {
          date: string
          exam_call_id: string | null
          id: string
          is_estimate: boolean
          kind: Database["public"]["Enums"]["exam_event_kind"]
          source_id: string
          verified: boolean
        }
        Insert: {
          date: string
          exam_call_id?: string | null
          id?: string
          is_estimate?: boolean
          kind: Database["public"]["Enums"]["exam_event_kind"]
          source_id: string
          verified?: boolean
        }
        Update: {
          date?: string
          exam_call_id?: string | null
          id?: string
          is_estimate?: boolean
          kind?: Database["public"]["Enums"]["exam_event_kind"]
          source_id?: string
          verified?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "exam_call_events_exam_call_id_fkey"
            columns: ["exam_call_id"]
            isOneToOne: false
            referencedRelation: "exam_calls"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exam_call_events_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "sources"
            referencedColumns: ["id"]
          },
        ]
      }
      exam_calls: {
        Row: {
          id: string
          seats: number | null
          source_id: string
          status: Database["public"]["Enums"]["exam_call_status"]
          title: string
          verified: boolean
          year: number
        }
        Insert: {
          id?: string
          seats?: number | null
          source_id: string
          status: Database["public"]["Enums"]["exam_call_status"]
          title: string
          verified?: boolean
          year: number
        }
        Update: {
          id?: string
          seats?: number | null
          source_id?: string
          status?: Database["public"]["Enums"]["exam_call_status"]
          title?: string
          verified?: boolean
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "exam_calls_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "sources"
            referencedColumns: ["id"]
          },
        ]
      }
      facts: {
        Row: {
          id: string
          key: string
          label: string
          sort: number
          source_id: string
          value: string | null
          verified: boolean
        }
        Insert: {
          id: string
          key: string
          label: string
          sort?: number
          source_id: string
          value?: string | null
          verified?: boolean
        }
        Update: {
          id?: string
          key?: string
          label?: string
          sort?: number
          source_id?: string
          value?: string | null
          verified?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "facts_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "sources"
            referencedColumns: ["id"]
          },
        ]
      }
      phases: {
        Row: {
          est_weeks_max: number | null
          est_weeks_min: number | null
          id: string
          number: number
          summary: string
          title: string
          track: string
          unlock_after: number[]
        }
        Insert: {
          est_weeks_max?: number | null
          est_weeks_min?: number | null
          id: string
          number: number
          summary: string
          title: string
          track: string
          unlock_after?: number[]
        }
        Update: {
          est_weeks_max?: number | null
          est_weeks_min?: number | null
          id?: string
          number?: number
          summary?: string
          title?: string
          track?: string
          unlock_after?: number[]
        }
        Relationships: []
      }
      profiles: {
        Row: {
          birth_date: string | null
          created_at: string | null
          degree: Database["public"]["Enums"]["degree"] | null
          display_name: string | null
          english_level: Database["public"]["Enums"]["english_level"] | null
          id: string
          medical_status: Database["public"]["Enums"]["medical_status"] | null
          medical_valid_until: string | null
          nationality_status:
            | Database["public"]["Enums"]["nationality_status"]
            | null
          onboarded_at: string | null
          start_date: string | null
          target_date: string | null
          target_exam_call_id: string | null
          target_is_expected: boolean | null
          timezone: string
          updated_at: string | null
          weekly_hours: number | null
        }
        Insert: {
          birth_date?: string | null
          created_at?: string | null
          degree?: Database["public"]["Enums"]["degree"] | null
          display_name?: string | null
          english_level?: Database["public"]["Enums"]["english_level"] | null
          id: string
          medical_status?: Database["public"]["Enums"]["medical_status"] | null
          medical_valid_until?: string | null
          nationality_status?:
            | Database["public"]["Enums"]["nationality_status"]
            | null
          onboarded_at?: string | null
          start_date?: string | null
          target_date?: string | null
          target_exam_call_id?: string | null
          target_is_expected?: boolean | null
          timezone?: string
          updated_at?: string | null
          weekly_hours?: number | null
        }
        Update: {
          birth_date?: string | null
          created_at?: string | null
          degree?: Database["public"]["Enums"]["degree"] | null
          display_name?: string | null
          english_level?: Database["public"]["Enums"]["english_level"] | null
          id?: string
          medical_status?: Database["public"]["Enums"]["medical_status"] | null
          medical_valid_until?: string | null
          nationality_status?:
            | Database["public"]["Enums"]["nationality_status"]
            | null
          onboarded_at?: string | null
          start_date?: string | null
          target_date?: string | null
          target_exam_call_id?: string | null
          target_is_expected?: boolean | null
          timezone?: string
          updated_at?: string | null
          weekly_hours?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_target_exam_call_id_fkey"
            columns: ["target_exam_call_id"]
            isOneToOne: false
            referencedRelation: "exam_calls"
            referencedColumns: ["id"]
          },
        ]
      }
      questions: {
        Row: {
          correct_index: number
          difficulty: number
          explanation: string
          id: string
          options: Json
          reviewed: boolean
          source_pages: string
          stem: string
          topic_id: string
        }
        Insert: {
          correct_index: number
          difficulty?: number
          explanation: string
          id: string
          options: Json
          reviewed?: boolean
          source_pages: string
          stem: string
          topic_id: string
        }
        Update: {
          correct_index?: number
          difficulty?: number
          explanation?: string
          id?: string
          options?: Json
          reviewed?: boolean
          source_pages?: string
          stem?: string
          topic_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "questions_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_attempts: {
        Row: {
          answers: Json
          blank: number
          correct: number
          finished_at: string | null
          id: string
          mode: string
          started_at: string
          topic_id: string | null
          total: number
          user_id: string
          wrong: number
        }
        Insert: {
          answers?: Json
          blank?: number
          correct?: number
          finished_at?: string | null
          id?: string
          mode: string
          started_at?: string
          topic_id?: string | null
          total: number
          user_id?: string
          wrong?: number
        }
        Update: {
          answers?: Json
          blank?: number
          correct?: number
          finished_at?: string | null
          id?: string
          mode?: string
          started_at?: string
          topic_id?: string | null
          total?: number
          user_id?: string
          wrong?: number
        }
        Relationships: [
          {
            foreignKeyName: "quiz_attempts_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["id"]
          },
        ]
      }
      sources: {
        Row: {
          consulted_on: string
          id: string
          level: Database["public"]["Enums"]["source_level"]
          notes: string | null
          publisher: string
          title: string
          url: string
        }
        Insert: {
          consulted_on: string
          id?: string
          level: Database["public"]["Enums"]["source_level"]
          notes?: string | null
          publisher: string
          title: string
          url: string
        }
        Update: {
          consulted_on?: string
          id?: string
          level?: Database["public"]["Enums"]["source_level"]
          notes?: string | null
          publisher?: string
          title?: string
          url?: string
        }
        Relationships: []
      }
      subjects: {
        Row: {
          code: string
          id: string
          title: string
          track: string
        }
        Insert: {
          code: string
          id: string
          title: string
          track: string
        }
        Update: {
          code?: string
          id?: string
          title?: string
          track?: string
        }
        Relationships: []
      }
      task_dependencies: {
        Row: {
          depends_on_id: string
          task_id: string
        }
        Insert: {
          depends_on_id: string
          task_id: string
        }
        Update: {
          depends_on_id?: string
          task_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "task_dependencies_depends_on_id_fkey"
            columns: ["depends_on_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "task_dependencies_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      task_links: {
        Row: {
          role: string
          source_id: string
          task_id: string
        }
        Insert: {
          role: string
          source_id: string
          task_id: string
        }
        Update: {
          role?: string
          source_id?: string
          task_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "task_links_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "sources"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "task_links_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          est_minutes: number | null
          explanation: string
          id: string
          kind: string
          onboarding_key: string | null
          parent_id: string | null
          phase_id: string
          recommended: boolean
          sort: number
          source_id: string | null
          title: string
          topic_id: string | null
          verified: boolean
        }
        Insert: {
          est_minutes?: number | null
          explanation: string
          id: string
          kind: string
          onboarding_key?: string | null
          parent_id?: string | null
          phase_id: string
          recommended?: boolean
          sort?: number
          source_id?: string | null
          title: string
          topic_id?: string | null
          verified?: boolean
        }
        Update: {
          est_minutes?: number | null
          explanation?: string
          id?: string
          kind?: string
          onboarding_key?: string | null
          parent_id?: string | null
          phase_id?: string
          recommended?: boolean
          sort?: number
          source_id?: string | null
          title?: string
          topic_id?: string | null
          verified?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "tasks_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_phase_id_fkey"
            columns: ["phase_id"]
            isOneToOne: false
            referencedRelation: "phases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "sources"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["id"]
          },
        ]
      }
      topic_sections: {
        Row: {
          body_md: string
          id: string
          reviewed: boolean
          sort: number
          source_pages: string
          title: string
          topic_id: string
        }
        Insert: {
          body_md: string
          id: string
          reviewed?: boolean
          sort: number
          source_pages: string
          title: string
          topic_id: string
        }
        Update: {
          body_md?: string
          id?: string
          reviewed?: boolean
          sort?: number
          source_pages?: string
          title?: string
          topic_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "topic_sections_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["id"]
          },
        ]
      }
      topics: {
        Row: {
          id: string
          number: number
          source_id: string
          subject_id: string
          title: string
          verified: boolean
        }
        Insert: {
          id: string
          number: number
          source_id: string
          subject_id: string
          title: string
          verified?: boolean
        }
        Update: {
          id?: string
          number?: number
          source_id?: string
          subject_id?: string
          title?: string
          verified?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "topics_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "sources"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "topics_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      user_task_progress: {
        Row: {
          completed_at: string | null
          notes: string | null
          started_at: string | null
          status: string
          task_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          notes?: string | null
          started_at?: string | null
          status?: string
          task_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          notes?: string | null
          started_at?: string | null
          status?: string
          task_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_task_progress_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      degree:
        | "bachiller"
        | "tecnico_superior"
        | "grado"
        | "extranjero"
        | "ninguna"
      english_level: "b1_o_menos" | "b2" | "c1" | "c2"
      exam_call_status: "esperada" | "publicada" | "cerrada"
      exam_event_kind:
        | "publicacion"
        | "inscripcion_inicio"
        | "inscripcion_fin"
        | "fase1"
        | "fase2"
        | "fase3"
        | "resultado"
      medical_status: "sin_cita" | "cita" | "vigente" | "otra_clase"
      nationality_status: "espanola" | "ue" | "residente" | "ninguna"
      source_level: "A" | "B" | "C"
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      degree: [
        "bachiller",
        "tecnico_superior",
        "grado",
        "extranjero",
        "ninguna",
      ],
      english_level: ["b1_o_menos", "b2", "c1", "c2"],
      exam_call_status: ["esperada", "publicada", "cerrada"],
      exam_event_kind: [
        "publicacion",
        "inscripcion_inicio",
        "inscripcion_fin",
        "fase1",
        "fase2",
        "fase3",
        "resultado",
      ],
      medical_status: ["sin_cita", "cita", "vigente", "otra_clase"],
      nationality_status: ["espanola", "ue", "residente", "ninguna"],
      source_level: ["A", "B", "C"],
    },
  },
} as const

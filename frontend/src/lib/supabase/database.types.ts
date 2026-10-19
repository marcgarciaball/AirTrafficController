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

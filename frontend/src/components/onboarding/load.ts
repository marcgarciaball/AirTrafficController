import { createClient } from "@/lib/supabase/server"
import type { Database } from "@/lib/supabase/database.types"
import type { Draft, ExamCallOption } from "./types"

type Profile = Database["public"]["Tables"]["profiles"]["Row"]

export async function loadCalls(): Promise<ExamCallOption[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from("exam_calls")
    .select(
      "id, year, title, status, verified, source:sources(url, title, consulted_on), events:exam_call_events(kind, date, is_estimate, verified, source:sources(url, title, consulted_on))"
    )
    .order("year", { ascending: true })
  return (data ?? []) as unknown as ExamCallOption[]
}

export function draftFromProfile(p: Profile | null, calls: ExamCallOption[]): Draft {
  const known = !!p?.target_exam_call_id && calls.some((c) => c.id === p.target_exam_call_id && c.status !== "cerrada")
  return {
    nationality_status: p?.nationality_status ?? "",
    birth_date: p?.birth_date ?? "",
    degree: p?.degree ?? "",
    english_level: p?.english_level ?? "",
    medical_status: p?.medical_status ?? "",
    medical_valid_until: p?.medical_valid_until ?? "",
    target_choice: known ? p!.target_exam_call_id! : p?.target_date ? "custom" : "",
    target_date: p?.target_date ?? "",
    weekly_hours: p?.weekly_hours != null ? String(p.weekly_hours) : "",
    timezone: p?.timezone ?? "",
  }
}

"use server"

import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import type { SupabaseClient } from "@supabase/supabase-js"
import { evaluateEligibility } from "@/lib/onboarding/eligibility"
import { onboardingTaskUpdates } from "@/lib/roadmap/onboarding"
import { onboardingActionSchema, todayISO, type OnboardingAnswers } from "@/lib/onboarding/schema"

export async function saveOnboarding(
  answers: OnboardingAnswers
): Promise<{ error?: string }> {
  const parsed = onboardingActionSchema.safeParse(answers)
  if (!parsed.success) {
    return { error: "Hay respuestas no válidas. Revisa el cuestionario." }
  }
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()
  if (!data.user) return { error: "Tu sesión ha caducado. Vuelve a iniciar sesión." }

  const a = parsed.data
  const { error } = await supabase
    .from("profiles")
    .update({
      nationality_status: a.nationality_status,
      birth_date: a.birth_date,
      degree: a.degree,
      english_level: a.english_level,
      medical_status: a.medical_status,
      medical_valid_until: a.medical_status === "vigente" ? (a.medical_valid_until ?? null) : null,
      target_exam_call_id: a.target_exam_call_id,
      target_date: a.target_date,
      target_is_expected: a.target_is_expected,
      weekly_hours: a.weekly_hours,
      timezone: a.timezone,
      onboarded_at: new Date().toISOString(),
    })
    .eq("id", data.user.id)
  if (error) return { error: "No se han podido guardar las respuestas. Inténtalo de nuevo." }

  // Marca como hechas las tareas de la fase 0 que el cuestionario ya acredita (no borra nada).
  const updates = onboardingTaskUpdates(a, evaluateEligibility(a, todayISO()).eligible)
  if (updates.length > 0) {
    const db = supabase as unknown as SupabaseClient
    const { data: tasks } = await db
      .from("tasks")
      .select("id, onboarding_key")
      .in("onboarding_key", updates.map((u) => u.onboarding_key))
    const now = new Date().toISOString()
    const rows = (tasks ?? []).flatMap((t: { id: string; onboarding_key: string }) => {
      const u = updates.find((x) => x.onboarding_key === t.onboarding_key)
      return u
        ? [{
            user_id: data.user!.id,
            task_id: t.id,
            status: u.status,
            started_at: u.status === "pendiente" ? null : now,
            completed_at: u.status === "hecha" ? now : null,
            updated_at: now,
          }]
        : []
    })
    if (rows.length > 0) await db.from("user_task_progress").upsert(rows, { onConflict: "user_id,task_id" })
  }
  redirect("/hoy")
}

"use server"

import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { onboardingActionSchema, type OnboardingAnswers } from "@/lib/onboarding/schema"

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
  redirect("/hoy")
}

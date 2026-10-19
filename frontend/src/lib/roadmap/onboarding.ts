import type { TaskStatus } from "./types"

export function onboardingTaskUpdates(
  answers: { medical_status: string },
  eligible: boolean
): { onboarding_key: string; status: TaskStatus }[] {
  if (!eligible) return []
  return [
    { onboarding_key: "nacionalidad", status: "hecha" },
    { onboarding_key: "edad", status: "hecha" },
    { onboarding_key: "titulacion", status: "hecha" },
    { onboarding_key: "medico", status: answers.medical_status === "vigente" ? "hecha" : "pendiente" },
  ]
}

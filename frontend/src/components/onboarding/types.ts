import type { OnboardingAnswers } from "@/lib/onboarding/schema"

export type SourceInfo = { url: string; title: string; consulted_on: string }

export type CallEvent = {
  kind: string
  date: string
  is_estimate: boolean
  verified: boolean
  source: SourceInfo | null
}

export type ExamCallOption = {
  id: string
  year: number
  title: string
  status: "esperada" | "publicada" | "cerrada"
  verified: boolean
  source: SourceInfo | null
  events: CallEvent[]
}

/** Borrador del cuestionario: todo como texto hasta validar. */
export type Draft = {
  nationality_status: string
  birth_date: string
  degree: string
  english_level: string
  medical_status: string
  medical_valid_until: string
  target_choice: string // id de convocatoria, "custom" o ""
  target_date: string
  weekly_hours: string
  timezone: string
}

export type Patch = (p: Partial<Draft>) => void
export type StepProps = { draft: Draft; set: Patch }

export const CUSTOM = "custom"

export function eventDate(c: ExamCallOption, kind: string): string | undefined {
  return c.events.find((e) => e.kind === kind)?.date
}

export function callTargetDate(c: ExamCallOption): string | undefined {
  return eventDate(c, "fase1") ?? eventDate(c, "inscripcion_fin")
}

export function referenceDateOf(d: Draft, calls: ExamCallOption[]): string {
  const c = calls.find((x) => x.id === d.target_choice)
  return (c && eventDate(c, "inscripcion_fin")) || targetDateOf(d, calls)
}

export function targetDateOf(d: Draft, calls: ExamCallOption[]): string {
  const c = calls.find((x) => x.id === d.target_choice)
  return c ? (callTargetDate(c) ?? "") : d.target_date
}

export function toAnswers(d: Draft, calls: ExamCallOption[]): unknown {
  const c = calls.find((x) => x.id === d.target_choice)
  return {
    nationality_status: d.nationality_status,
    birth_date: d.birth_date,
    degree: d.degree,
    english_level: d.english_level,
    medical_status: d.medical_status,
    medical_valid_until: d.medical_status === "vigente" ? d.medical_valid_until || undefined : undefined,
    target_exam_call_id: c ? c.id : null,
    target_date: targetDateOf(d, calls),
    target_is_expected: c ? c.status === "esperada" || (c.events.find((e) => e.kind === "fase1")?.is_estimate ?? true) : false,
    weekly_hours: Number(d.weekly_hours.replace(",", ".")),
    timezone: d.timezone,
  } satisfies Partial<Record<keyof OnboardingAnswers, unknown>>
}

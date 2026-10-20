export type EnglishSkill = "reading_use" | "writing" | "listening" | "speaking"

/** Reparto de docs/GUIA_INGLES.md (media de sus fases: Speaking y Reading/UoE mandan, Writing poco). Debe sumar 1. */
export const SKILL_SHARE: Record<EnglishSkill, number> = {
  reading_use: 0.35,
  writing: 0.1,
  listening: 0.2,
  speaking: 0.35,
}

/** Sesión diaria de inglés (minutos). */
export const DAILY_ENGLISH_MINUTES = 30

const DAY_ROTATION: EnglishSkill[] = ["speaking", "reading_use", "listening", "speaking", "reading_use", "writing", "listening"]

/** Destreza del día (lunes = 0), rotando según el reparto semanal. */
export function skillOfDay(day: string): EnglishSkill {
  const dow = (new Date(`${day}T00:00:00Z`).getUTCDay() + 6) % 7
  return DAY_ROTATION[dow]
}

export const SKILL_ORDER: EnglishSkill[] = ["reading_use", "writing", "listening", "speaking"]

/** Reparte los minutos semanales entre las 4 destrezas (método del resto mayor: la suma es exacta). */
export function weeklyPlan(weeklyEnglishMinutes: number): Record<EnglishSkill, number> {
  const total = Number.isFinite(weeklyEnglishMinutes) && weeklyEnglishMinutes > 0 ? Math.floor(weeklyEnglishMinutes) : 0
  const out = { reading_use: 0, writing: 0, listening: 0, speaking: 0 }
  const rem: { s: EnglishSkill; r: number }[] = []
  let used = 0
  for (const s of SKILL_ORDER) {
    const exact = total * SKILL_SHARE[s]
    out[s] = Math.floor(exact + 1e-9)
    used += out[s]
    rem.push({ s, r: exact - out[s] })
  }
  rem.sort((a, b) => b.r - a.r)
  for (let i = 0; used < total; i++, used++) out[rem[i % 4].s]++
  return out
}

export type EnglishSkill = "reading_use" | "writing" | "listening" | "speaking"

/** Reparto propio (Consejo propio · no oficial). Debe sumar 1. */
export const SKILL_SHARE: Record<EnglishSkill, number> = {
  reading_use: 0.3,
  writing: 0.25,
  listening: 0.25,
  speaking: 0.2,
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

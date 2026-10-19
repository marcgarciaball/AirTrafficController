import { addDays } from "./date"

export type CardSchedule = { ease: number; interval_days: number; reps: number }
export type CardUpdate = CardSchedule & { due_on: string }

export const MIN_EASE = 1.3

export function newCard(): CardSchedule {
  return { ease: 2.5, interval_days: 0, reps: 0 }
}

/**
 * SM-2 simplificado. `grade` 0..5; menos de 3 es fallo: se reinicia y vuelve mañana,
 * sin cambiar la facilidad. Si acierta: 1 día, 6 días y luego intervalo × facilidad.
 */
export function sm2(card: CardSchedule, grade: number, today: string): CardUpdate {
  if (!Number.isInteger(grade) || grade < 0 || grade > 5) throw new Error("Nota fuera de 0..5")
  if (grade < 3) return { ease: card.ease, interval_days: 1, reps: 0, due_on: addDays(today, 1) }
  const reps = card.reps + 1
  const interval_days = reps === 1 ? 1 : reps === 2 ? 6 : Math.round(card.interval_days * card.ease)
  const q = 5 - grade
  const ease = Math.max(MIN_EASE, card.ease + 0.1 - q * (0.08 + q * 0.02))
  return { ease, interval_days, reps, due_on: addDays(today, interval_days) }
}

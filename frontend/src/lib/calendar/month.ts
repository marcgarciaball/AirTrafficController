import { addDays, weekdayIndex } from "@/lib/plan/time"

export const MONTH_RE = /^\d{4}-(0[1-9]|1[0-2])$/

/** Valida "YYYY-MM"; si no es válido, usa el mes de `fallbackDay`. */
export function parseMonth(raw: string | undefined, fallbackDay: string): string {
  return raw && MONTH_RE.test(raw) ? raw : fallbackDay.slice(0, 7)
}

export function shiftMonth(ym: string, delta: number): string {
  const [y, m] = ym.split("-").map(Number)
  const idx = y * 12 + (m - 1) + delta
  return `${Math.floor(idx / 12)}-${String((idx % 12) + 1).padStart(2, "0")}`
}

export type MonthCell = { day: string; inMonth: boolean }

/** Semanas (lunes a domingo) que cubren el mes. */
export function monthGrid(ym: string): MonthCell[][] {
  const first = `${ym}-01`
  const next = `${shiftMonth(ym, 1)}-01`
  const last = addDays(next, -1)
  let d = addDays(first, -weekdayIndex(first))
  const weeks: MonthCell[][] = []
  while (d <= last) {
    weeks.push(Array.from({ length: 7 }, (_, i) => {
      const day = addDays(d, i)
      return { day, inMonth: day.startsWith(ym) }
    }))
    d = addDays(d, 7)
  }
  return weeks
}

const MONTHS = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]
export function monthLabel(ym: string): string {
  const [y, m] = ym.split("-").map(Number)
  return `${MONTHS[m - 1]} ${y}`
}

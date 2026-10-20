import { localDay } from "@/lib/plan/time"

export function dailyQueue<T extends { due: string; suspended?: boolean }>(
  cards: T[],
  now: Date,
  tz: string,
  maxMinutes: number,
  secondsPerCard = 8,
): T[] {
  const today = localDay(now.toISOString(), tz)
  const cap = Math.floor((maxMinutes * 60) / secondsPerCard)
  return cards
    .filter((c) => !c.suspended && localDay(c.due, tz) <= today)
    .sort((a, b) => new Date(a.due).getTime() - new Date(b.due).getTime())
    .slice(0, cap)
}

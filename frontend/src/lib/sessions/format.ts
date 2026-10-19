const p2 = (n: number) => String(n).padStart(2, "0")

/** Segundos -> "HH:MM:SS". */
export function formatClock(sec: number): string {
  const s = Math.max(0, Math.floor(sec))
  return `${p2(Math.floor(s / 3600))}:${p2(Math.floor((s % 3600) / 60))}:${p2(s % 60)}`
}

/** Segundos -> "1 h 05 min" / "25 min". */
export function formatHM(sec: number): string {
  const m = Math.max(0, Math.round(sec / 60))
  return m >= 60 ? `${Math.floor(m / 60)} h ${p2(m % 60)} min` : `${m} min`
}

/** Minutos -> "1 h 05 min" / "25 min". */
export function formatMinutes(min: number): string {
  return formatHM(min * 60)
}

const ISO = /^(\d{4})-(\d{2})-(\d{2})$/

/** Normaliza a "YYYY-MM-DD" (los Date se leen en UTC). Lanza si no es válida. */
export function toIsoDay(d: string | Date): string {
  if (d instanceof Date) {
    if (Number.isNaN(d.getTime())) throw new Error("Fecha no válida")
    return d.toISOString().slice(0, 10)
  }
  const m = ISO.exec(d)
  if (!m) throw new Error("Fecha no válida")
  const dt = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]))
  if (dt.toISOString().slice(0, 10) !== d) throw new Error("Fecha no válida")
  return d
}

export function addDays(day: string, n: number): string {
  const [y, m, d] = toIsoDay(day).split("-").map(Number)
  return new Date(Date.UTC(y, m - 1, d + n)).toISOString().slice(0, 10)
}

export function diffDays(from: string, to: string): number {
  const f = (s: string) => {
    const [y, m, d] = toIsoDay(s).split("-").map(Number)
    return Date.UTC(y, m - 1, d)
  }
  return Math.round((f(to) - f(from)) / 86_400_000)
}

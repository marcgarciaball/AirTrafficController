export const KINDS = ["atencion", "espacial", "abstracto", "memoria", "calculo", "multitarea"] as const
export type Kind = (typeof KINDS)[number]
export const isKind = (s: string): s is Kind => (KINDS as readonly string[]).includes(s)

export const KIND_META: Record<Kind, { title: string; code: string; description: string; origin: string }> = {
  atencion: { title: "Atención", code: "ATN", description: "Cuenta cuántas veces aparece el objetivo en la cuadrícula, con el tiempo limitado.", origin: "Prueba C de la Fase 1" },
  espacial: { title: "Razonamiento espacial", code: "ESP", description: "Elige cuál de las cuatro figuras es la misma, solo girada. Cuidado con el reflejo.", origin: "Prueba C de la Fase 1" },
  abstracto: { title: "Razonamiento abstracto", code: "ABS", description: "Descubre la regla oculta de la serie y elige el siguiente elemento.", origin: "Prueba C de la Fase 1" },
  memoria: { title: "Memoria", code: "MEM", description: "Memoriza una secuencia de dígitos o de posiciones y reprodúcela.", origin: "FEAST" },
  calculo: { title: "Cálculo mental", code: "CAL", description: "Velocidad por tiempo, rumbos módulo 360 y conversiones sencillas, contra reloj.", origin: "Consejo propio · no oficial" },
  multitarea: { title: "Multitarea", code: "MUL", description: "Sigue con el cursor un objetivo en movimiento mientras respondes cálculos.", origin: "FEAST" },
}

export const MAX_LEVEL = 5

/** Elementos del conjunto y segundos por elemento (cronómetro total = count x seconds). */
export function kindConfig(kind: Kind, level: number): { count: number; seconds: number } {
  const l = Math.min(MAX_LEVEL, Math.max(1, level))
  switch (kind) {
    case "atencion":
      return { count: 8, seconds: 22 - l * 2 }
    case "espacial":
      return { count: 8, seconds: 30 - l * 3 }
    case "abstracto":
      return { count: 8, seconds: 35 - l * 3 }
    case "memoria":
      return { count: 6, seconds: 25 }
    case "calculo":
      return { count: 10, seconds: 22 - l * 2 }
    case "multitarea":
      return { count: 1, seconds: (6 + l) * 10 }
  }
}

/** Sube con ≥ 80 %, baja con < 50 %, y se queda entre 1 y 5. */
export function nextLevel(level: number, score: number, total: number): number {
  if (total <= 0) return level
  const pct = score / total
  const next = pct >= 0.8 ? level + 1 : pct < 0.5 ? level - 1 : level
  return Math.min(MAX_LEVEL, Math.max(1, next))
}

export type ResultRow = { kind: string; level: number; score: number; total: number; taken_at: string | null }
export type KindSummary = { level: number; bestPct: number | null; attempts: number; lastPct: number | null }

const pct = (r: ResultRow) => (r.total > 0 ? Math.round((r.score / r.total) * 100) : 0)

export function summarize(rows: ResultRow[]): Record<Kind, KindSummary> {
  const out = {} as Record<Kind, KindSummary>
  for (const k of KINDS) {
    const mine = rows.filter((r) => r.kind === k).sort((a, b) => (a.taken_at ?? "").localeCompare(b.taken_at ?? ""))
    const last = mine[mine.length - 1]
    out[k] = {
      level: last ? nextLevel(last.level, last.score, last.total) : 1,
      bestPct: mine.length ? Math.max(...mine.map(pct)) : null,
      attempts: mine.length,
      lastPct: last ? pct(last) : null,
    }
  }
  return out
}

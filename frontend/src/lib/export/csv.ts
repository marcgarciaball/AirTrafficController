import { effectiveSeconds, localDay, type SessionTime } from "@/lib/plan/time"

/** Escapa un campo CSV (RFC 4180) y neutraliza fórmulas de hoja de cálculo (= + - @ al inicio de texto). */
export function csvField(v: unknown): string {
  if (v === null || v === undefined) return ""
  let s = typeof v === "string" ? v : typeof v === "object" ? JSON.stringify(v) : String(v)
  if (typeof v === "string" && /^[=+\-@\t\r]/.test(s)) s = `'${s}`
  return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}

export function toCsv(header: string[], rows: unknown[][]): string {
  return [header, ...rows].map((r) => r.map(csvField).join(",")).join("\r\n") + "\r\n"
}

export type SessionExportRow = SessionTime & {
  id: string
  task_id: string | null
  topic_id: string | null
  origin: string
  notes: string | null
}

export function sessionsCsv(sessions: SessionExportRow[], tz: string, now: Date): string {
  return toCsv(
    ["id", "dia", "inicio", "fin", "segundos_efectivos", "origen", "task_id", "topic_id", "notas"],
    sessions.map((s) => [s.id, localDay(s.started_at, tz), s.started_at, s.ended_at, effectiveSeconds(s, now), s.origin, s.task_id, s.topic_id, s.notes])
  )
}

export type AttemptExportRow = {
  id: string
  mode: string
  topic_id: string | null
  started_at: string
  finished_at: string | null
  total: number
  correct: number
  wrong: number
  blank: number
}

export function attemptsCsv(attempts: AttemptExportRow[]): string {
  return toCsv(
    ["id", "modo", "topic_id", "inicio", "fin", "total", "aciertos", "fallos", "blancos", "nota_pct"],
    attempts.map((a) => [a.id, a.mode, a.topic_id, a.started_at, a.finished_at, a.total, a.correct, a.wrong, a.blank, a.total > 0 ? Math.round((a.correct / a.total) * 100) : ""])
  )
}

/** Estructura del JSON de exportación: una clave por tabla. Las tablas que fallan quedan fuera y se listan en `omitted`. */
export function buildExport(
  userId: string,
  exportedAt: Date,
  tables: Record<string, { data: unknown[] | null; error: unknown | null }>
) {
  const data: Record<string, unknown[]> = {}
  const omitted: string[] = []
  for (const [name, r] of Object.entries(tables)) {
    if (r.error || !r.data) omitted.push(name)
    else data[name] = r.data
  }
  return { app: "Torre", version: 1, exported_at: exportedAt.toISOString(), user_id: userId, omitted, data }
}

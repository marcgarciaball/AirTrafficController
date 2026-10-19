import { addDays, effectiveSeconds, localDay, weekStart, type SessionLike } from "@/lib/plan/time"

export type WeekBar = { week: string; hours: number }

/** Últimas `n` semanas (lunes) hasta la actual, de la más antigua a la más reciente. Las vacías valen 0. */
export function weeklySeries(byWeek: Record<string, number>, today: string, n = 12): WeekBar[] {
  const current = weekStart(today)
  return Array.from({ length: n }, (_, i) => {
    const week = addDays(current, -7 * (n - 1 - i))
    return { week, hours: (byWeek[week] ?? 0) / 3600 }
  })
}

export type WeeklyGoal = { doneHours: number; goalHours: number; pct: number }

/** Semana actual frente al objetivo semanal. `pct` no se limita a 100 (para mostrar el exceso), pero nunca es negativo. */
export function weeklyGoal(byWeek: Record<string, number>, today: string, weeklyHours: number | null): WeeklyGoal {
  const doneHours = (byWeek[weekStart(today)] ?? 0) / 3600
  const goalHours = weeklyHours && weeklyHours > 0 ? weeklyHours : 0
  return { doneHours, goalHours, pct: goalHours > 0 ? Math.round((doneHours / goalHours) * 100) : 0 }
}

export type Subject = "temario" | "aptitudes" | "ingles" | "otras"
export const SUBJECT_BY_PHASE: Record<number, Subject> = { 2: "temario", 3: "aptitudes", 4: "ingles" }

export type SubjectSplit = Record<Subject, number>

/**
 * Reparto del tiempo (segundos) por materia según la fase de la tarea.
 * Sin tarea: si hay tema de estudio cuenta como temario; si no, "otras".
 */
export function subjectDistribution(
  sessions: SessionLike[],
  phaseOfTask: Record<string, number>,
  now: Date
): SubjectSplit {
  const out: SubjectSplit = { temario: 0, aptitudes: 0, ingles: 0, otras: 0 }
  for (const s of sessions) {
    const sec = effectiveSeconds(s, now)
    const phase = s.task_id ? phaseOfTask[s.task_id] : undefined
    const subject: Subject = phase !== undefined ? (SUBJECT_BY_PHASE[phase] ?? "otras") : s.topic_id ? "temario" : "otras"
    out[subject] += sec
  }
  return out
}

export type Attempt = { mode: string; started_at: string; finished_at: string | null; total: number; correct: number }
export type QuizPoint = { at: string; mode: string; pct: number }

/** Notas (% de aciertos) de los intentos terminados, en orden cronológico. */
export function quizSeries(attempts: Attempt[]): QuizPoint[] {
  return attempts
    .filter((a) => a.finished_at && a.total > 0)
    .map((a) => ({ at: a.started_at, mode: a.mode, pct: Math.round((a.correct / a.total) * 100) }))
    .sort((a, b) => a.at.localeCompare(b.at))
}

/** Minutos hechos por día local (para el calendario). */
export function minutesByDay(byDay: Record<string, number>): Record<string, number> {
  return Object.fromEntries(Object.entries(byDay).map(([d, s]) => [d, Math.round(s / 60)]))
}

export { localDay }

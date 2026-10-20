import type { Roadmap, TaskView } from "@/lib/roadmap/types"
import { addDays, weekdayIndex, weekStart } from "./time"

export type Weights = { temario: number; aptitudes: number; ingles: number }
export type DailyPlan = {
  todayMinutes: number
  doneTodayMinutes: number
  now: TaskView | null
  next: TaskView[]
  behindMinutes: number
  week: { day: string; plannedMinutes: number; doneMinutes: number }[]
  forecast: {
    status: "llegas" | "justo" | "no_llegas" | "sin_objetivo"
    remainingMinutes: number
    weeksLeft: number | null
    neededWeeklyHours: number | null
    /** Semanas mínimas de la cadena de fases pendientes (est_weeks_min con dependencias). */
    minWeeks: number
  }
}
export type PlanInput = {
  today: string
  tz: string
  weeklyHours: number
  targetDate: string | null
  roadmap: Roadmap
  secondsByDay: Record<string, number>
  weights?: Weights
}

const DEFAULT_WEIGHTS: Weights = { temario: 50, aptitudes: 20, ingles: 30 }
const LINE_BY_PHASE: Record<number, keyof Weights> = { 2: "temario", 3: "aptitudes", 4: "ingles" }
const DEFAULT_EST = 30

function leaves(tasks: TaskView[]): TaskView[] {
  return tasks.flatMap((t) => (t.children.length ? leaves(t.children) : [t]))
}
const est = (t: TaskView) => t.est_minutes ?? DEFAULT_EST
const round5 = (n: number) => Math.round(n / 5) * 5
const dayDiff = (a: string, b: string) => Math.round((Date.parse(`${b}T00:00:00Z`) - Date.parse(`${a}T00:00:00Z`)) / 86400000)

/** Ordena las pendientes de las líneas paralelas repartiendo minutos según pesos (mayor déficit primero). */
function interleave(lines: { w: number; tasks: TaskView[] }[]): TaskView[] {
  const active = lines.filter((l) => l.tasks.length > 0 && l.w > 0)
  const wsum = active.reduce((a, l) => a + l.w, 0)
  const st = active.map((l) => ({ share: l.w / wsum, q: [...l.tasks], assigned: 0 }))
  const out: TaskView[] = []
  let total = 0
  for (;;) {
    let best: (typeof st)[number] | null = null
    let bestDef = -Infinity
    for (const s of st) {
      if (!s.q.length) continue
      const def = s.share * total - s.assigned
      if (def > bestDef + 1e-9 || (Math.abs(def - bestDef) <= 1e-9 && best && s.share > best.share)) { best = s; bestDef = def }
    }
    if (!best) return out
    const t = best.q.shift()!
    best.assigned += est(t)
    total += est(t)
    out.push(t)
  }
}

/** Camino más largo de est_weeks_min entre fases no terminadas, respetando unlock_after. */
function minPhaseWeeks(phases: Roadmap["phases"]): number {
  const byNum = new Map(phases.map((p) => [p.number, p]))
  const memo = new Map<number, number>()
  const chain = (n: number, seen: number[]): number => {
    const p = byNum.get(n)
    if (!p || p.pct >= 100 || seen.includes(n)) return 0
    if (memo.has(n)) return memo.get(n)!
    const v = (p.est_weeks_min ?? 0) + Math.max(0, ...p.unlock_after.map((u) => chain(u, [...seen, n])))
    memo.set(n, v)
    return v
  }
  return Math.max(0, ...phases.map((p) => chain(p.number, [])))
}

export function buildPlan(input: PlanInput): DailyPlan {
  const { today, weeklyHours, targetDate, roadmap, secondsByDay } = input
  const weights = input.weights ?? DEFAULT_WEIGHTS

  // Semana (lunes a domingo)
  const start = weekStart(today)
  const idx = weekdayIndex(today)
  const budget = weeklyHours * 60
  const minutesOf = (d: string) => (secondsByDay[d] ?? 0) / 60
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(start, i))
  const before = weekDays.slice(0, idx)
  const doneBefore = before.reduce((a, d) => a + minutesOf(d), 0)
  const daysLeft = 7 - idx
  const todayMinutes = round5(Math.max(0, budget - doneBefore) / daysLeft)
  const behindMinutes = Math.round(before.reduce((a, d) => a + Math.max(0, budget / 7 - minutesOf(d)), 0))
  const week = weekDays.map((day) => ({ day, plannedMinutes: Math.round(budget / 7), doneMinutes: Math.round(minutesOf(day)) }))

  // Tareas
  const phaseLeaves = roadmap.phases.map((p) => ({ number: p.number, leaves: leaves(p.tasks) }))
  const pending = (t: TaskView) => t.status !== "hecha" && !t.blocked
  const priority = phaseLeaves.filter((p) => p.number <= 1).flatMap((p) => p.leaves.filter(pending))
  const english = phaseLeaves.filter((p) => p.number === 4).flatMap((p) => p.leaves.filter(pending))
  // El inglés corre en paralelo desde el primer día: las fases 0 y 1 forman una línea más junto al inglés.
  const lines = priority.length
    ? [
        { w: weights.temario + weights.aptitudes, tasks: priority },
        { w: weights.ingles, tasks: english },
      ]
    : (Object.entries(LINE_BY_PHASE) as [string, keyof Weights][]).map(([num, key]) => ({
        w: weights[key],
        tasks: phaseLeaves.filter((p) => p.number === Number(num)).flatMap((p) => p.leaves.filter(pending)),
      }))
  const ordered = interleave(lines)
  const inProgress = ordered.filter((t) => t.status === "en_curso")
  const now = inProgress[0] ?? ordered[0] ?? null
  const next = ordered.filter((t) => t !== now).slice(0, 3)

  // Previsión
  const remainingMinutes = phaseLeaves.flatMap((p) => p.leaves).filter((t) => t.status !== "hecha").reduce((a, t) => a + est(t), 0)
  const minWeeks = minPhaseWeeks(roadmap.phases)
  let forecast: DailyPlan["forecast"]
  if (!targetDate) {
    forecast = { status: "sin_objetivo", remainingMinutes, weeksLeft: null, neededWeeklyHours: null, minWeeks }
  } else {
    const weeksLeft = dayDiff(today, targetDate) / 7
    if (weeksLeft <= 0) {
      forecast = { status: remainingMinutes > 0 ? "no_llegas" : "llegas", remainingMinutes, weeksLeft: Math.max(0, weeksLeft), neededWeeklyHours: null, minWeeks }
    } else {
      const needed = remainingMinutes / weeksLeft / 60
      const byHours = needed <= weeklyHours * 0.9 ? "llegas" : needed <= weeklyHours * 1.1 ? "justo" : "no_llegas"
      const status = minWeeks > weeksLeft ? "no_llegas" : byHours
      forecast = { status, remainingMinutes, weeksLeft, neededWeeklyHours: needed, minWeeks }
    }
  }

  return { todayMinutes, doneTodayMinutes: Math.round(minutesOf(today)), now, next, behindMinutes, week, forecast }
}

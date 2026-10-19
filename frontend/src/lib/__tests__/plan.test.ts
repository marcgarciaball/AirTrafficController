import { describe, it, expect } from "vitest"
import { buildPlan } from "@/lib/plan/planner"
import type { Roadmap, TaskView, PhaseView, TaskStatus } from "@/lib/roadmap/types"

let n = 0
const leaf = (phase: number, o: Partial<TaskView> = {}): TaskView => ({
  id: `t${++n}`, phase_id: `ph${phase}`, parent_id: null, title: `T${n}`, explanation: "", est_minutes: 60, kind: "estudio",
  topic_id: null, source_id: null, verified: true, recommended: false, onboarding_key: null, sort: n,
  status: "pendiente" as TaskStatus, blocked: false, blockedBy: [], children: [], ...o,
})
const phase = (number: number, tasks: TaskView[]): PhaseView => ({
  id: `ph${number}`, number, title: `F${number}`, summary: "", est_weeks_min: null, est_weeks_max: null, track: "x",
  unlock_after: [], status: "disponible", pct: 0, tasks,
})
const rm = (phases: PhaseView[]): Roadmap => ({ phases, globalPct: 0, currentPhase: null, next: [] })
const base = { tz: "Europe/Madrid", weeklyHours: 14, targetDate: null as string | null, secondsByDay: {} as Record<string, number> }
// 2026-10-21 = miércoles (2 días atrás: lunes y martes)
const today = "2026-10-21"

describe("minutos de hoy y atrasos", () => {
  const r = rm([phase(2, [leaf(2)])])
  it("semana en blanco: presupuesto / días restantes, múltiplo de 5", () => {
    // 840 min, quedan 5 días (mié..dom) => 168 -> 170
    const p = buildPlan({ ...base, today, roadmap: r })
    expect(p.todayMinutes).toBe(170)
    expect(p.behindMinutes).toBe(120 * 2) // 840/7=120 por día, lun y mar sin hacer
    expect(p.week).toHaveLength(7)
    expect(p.week[0]).toEqual({ day: "2026-10-19", plannedMinutes: 120, doneMinutes: 0 })
  })
  it("reajusta con lo hecho antes de hoy", () => {
    // lunes 3 h (180), martes 0 => quedan 660/5 = 132 -> 130; atraso = 0 + 120
    const p = buildPlan({ ...base, today, roadmap: r, secondsByDay: { "2026-10-19": 180 * 60 } })
    expect(p.todayMinutes).toBe(130)
    expect(p.behindMinutes).toBe(120)
  })
  it("doneTodayMinutes sale de secondsByDay de hoy y no reduce todayMinutes", () => {
    const p = buildPlan({ ...base, today, roadmap: r, secondsByDay: { [today]: 45 * 60 } })
    expect(p.doneTodayMinutes).toBe(45)
    expect(p.todayMinutes).toBe(170)
  })
  it("nunca negativo si ya se cumplió el presupuesto", () => {
    const p = buildPlan({ ...base, today, roadmap: r, secondsByDay: { "2026-10-19": 900 * 60 } })
    expect(p.todayMinutes).toBe(0)
  })
  it("domingo: 1 día restante", () => {
    expect(buildPlan({ ...base, today: "2026-10-25", roadmap: r }).todayMinutes).toBe(840)
  })
})

describe("tarea ahora / reparto por pesos", () => {
  it("prioriza la fase 0 y 1 si no están hechas", () => {
    const a = leaf(0), b = leaf(1), c = leaf(2)
    const p = buildPlan({ ...base, today, roadmap: rm([phase(0, [a]), phase(1, [b]), phase(2, [c])]) })
    expect(p.now?.id).toBe(a.id)
    expect(p.next.map((t) => t.id)).toEqual([b.id])
  })
  it("fase 0 hecha: pasa a las líneas paralelas", () => {
    const a = leaf(0, { status: "hecha" }), c = leaf(2)
    expect(buildPlan({ ...base, today, roadmap: rm([phase(0, [a]), phase(2, [c])]) }).now?.id).toBe(c.id)
  })
  it("una tarea en curso es la ahora", () => {
    const t2 = leaf(2), t3 = leaf(3, { status: "en_curso" })
    expect(buildPlan({ ...base, today, roadmap: rm([phase(2, [t2]), phase(3, [t3])]) }).now?.id).toBe(t3.id)
  })
  it("reparte 50/20/30 por déficit (tareas iguales)", () => {
    const f2 = [leaf(2), leaf(2), leaf(2), leaf(2), leaf(2)]
    const f3 = [leaf(3), leaf(3), leaf(3), leaf(3), leaf(3)]
    const f4 = [leaf(4), leaf(4), leaf(4), leaf(4), leaf(4)]
    const p = buildPlan({ ...base, today, roadmap: rm([phase(2, f2), phase(3, f3), phase(4, f4)]) })
    expect(p.now?.id).toBe(f2[0].id)
    expect(p.next.map((t) => t.id)).toEqual([f4[0].id, f3[0].id, f2[1].id])
  })
  it("redistribuye si una línea no tiene pendientes", () => {
    const f2 = [leaf(2), leaf(2)], f4 = [leaf(4), leaf(4)]
    const p = buildPlan({ ...base, today, roadmap: rm([phase(2, f2), phase(3, [leaf(3, { status: "hecha" })]), phase(4, f4)]) })
    expect(p.now?.id).toBe(f2[0].id)
    expect(p.next.map((t) => t.id)).toEqual([f4[0].id, f2[1].id, f4[1].id])
  })
  it("ignora bloqueadas y cuenta solo hojas", () => {
    const child = leaf(2), parent = leaf(2, { children: [child] }), blocked = leaf(2, { blocked: true })
    const p = buildPlan({ ...base, today, roadmap: rm([phase(2, [blocked, parent])]) })
    expect(p.now?.id).toBe(child.id)
    expect(p.next).toEqual([])
  })
  it("sin tareas: now null", () => {
    expect(buildPlan({ ...base, today, roadmap: rm([phase(2, [])]) }).now).toBeNull()
  })
  it("respeta pesos personalizados", () => {
    const f2 = [leaf(2)], f3 = [leaf(3)]
    const p = buildPlan({ ...base, today, roadmap: rm([phase(2, f2), phase(3, f3)]), weights: { temario: 1, aptitudes: 9, ingles: 0 } })
    expect(p.now?.id).toBe(f3[0].id)
  })
})

describe("previsión", () => {
  // 10 hojas de 60 min = 600 min restantes; 4 semanas (28 días) => 2.5 h/sem necesarias
  const r = rm([phase(2, Array.from({ length: 10 }, () => leaf(2)))])
  const target = "2026-11-18" // today + 28 días
  it("sin objetivo", () => {
    const f = buildPlan({ ...base, today, roadmap: r }).forecast
    expect(f).toEqual({ status: "sin_objetivo", remainingMinutes: 600, weeksLeft: null, neededWeeklyHours: null })
  })
  it("llegas", () => {
    const f = buildPlan({ ...base, today, roadmap: r, targetDate: target, weeklyHours: 5 }).forecast
    expect(f.status).toBe("llegas"); expect(f.weeksLeft).toBe(4); expect(f.neededWeeklyHours).toBeCloseTo(2.5)
  })
  it("justo", () => {
    expect(buildPlan({ ...base, today, roadmap: r, targetDate: target, weeklyHours: 2.4 }).forecast.status).toBe("justo")
  })
  it("no llegas", () => {
    expect(buildPlan({ ...base, today, roadmap: r, targetDate: target, weeklyHours: 1 }).forecast.status).toBe("no_llegas")
  })
  it("sin est_minutes cuenta 30 y hechas no cuentan", () => {
    const r2 = rm([phase(2, [leaf(2, { est_minutes: null }), leaf(2, { status: "hecha" }), leaf(2, { blocked: true, est_minutes: 10 })])])
    expect(buildPlan({ ...base, today, roadmap: r2 }).forecast.remainingMinutes).toBe(40)
  })
  it("objetivo pasado con trabajo pendiente: no llegas", () => {
    const f = buildPlan({ ...base, today, roadmap: r, targetDate: "2026-10-01" }).forecast
    expect(f.status).toBe("no_llegas"); expect(f.neededWeeklyHours).toBeNull()
  })
})

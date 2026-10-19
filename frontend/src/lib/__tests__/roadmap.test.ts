import { describe, it, expect } from 'vitest'
import { computeRoadmap } from '../roadmap/progress'
import type { PhaseRow, TaskRow, DependencyRow, ProgressRow, TaskStatus } from '../roadmap/types'

const UNLOCK: Record<number, number[]> = { 0: [], 1: [0], 2: [0], 3: [0], 4: [0], 5: [0], 6: [2], 7: [6], 8: [7] }
const phases: PhaseRow[] = Array.from({ length: 9 }, (_, n) => ({
  id: `p${n}`, number: n, title: `Fase ${n} t`, summary: '', est_weeks_min: null, est_weeks_max: null, track: 'base', unlock_after: UNLOCK[n],
}))
const t = (id: string, phase: number, o: Partial<TaskRow> = {}): TaskRow => ({
  id, phase_id: `p${phase}`, parent_id: null, title: `T-${id}`, explanation: '', est_minutes: null, kind: 'estudio',
  topic_id: null, source_id: null, verified: true, recommended: false, onboarding_key: null, sort: 0, ...o,
})
const prog = (m: Record<string, TaskStatus>): ProgressRow[] => Object.entries(m).map(([task_id, status]) => ({ task_id, status }))
const find = (r: ReturnType<typeof computeRoadmap>, id: string) => {
  const walk = (ts: any[]): any => { for (const x of ts) { if (x.id === id) return x; const c = walk(x.children); if (c) return c } }
  for (const p of r.phases) { const f = walk(p.tasks); if (f) return f }
}
const ph = (r: ReturnType<typeof computeRoadmap>, n: number) => r.phases.find((p) => p.number === n)!

// una hoja por fase 0..8
const base = phases.map((p) => t(`a${p.number}`, p.number))
const allDone = (ts: TaskRow[]) => prog(Object.fromEntries(ts.map((x) => [x.id, 'hecha' as TaskStatus])))

describe('computeRoadmap', () => {
  it('fase 0 sin hacer bloquea 1, 2 y 5', () => {
    const r = computeRoadmap(phases, base, [], [])
    for (const n of [1, 2, 5]) expect(ph(r, n).status).toBe('bloqueada')
    expect(ph(r, 0).status).toBe('disponible')
    expect(find(r, 'a1').blocked).toBe(true)
    expect(find(r, 'a1').blockedBy).toEqual(['Fase 0'])
  })

  it('tarea recomendada pendiente no impide fase 0 hecha', () => {
    const ts = [t('r', 0, { recommended: true }), t('x', 0), ...base.slice(1)]
    const r = computeRoadmap(phases, ts, [], prog({ x: 'hecha' }))
    expect(ph(r, 0).status).toBe('hecha')
    expect(ph(r, 1).status).not.toBe('bloqueada')
    expect(ph(r, 0).pct).toBe(50)
  })

  it('porcentaje sobre hojas y padre derivado de hijos', () => {
    const ts = [t('par', 2), t('c1', 2, { parent_id: 'par' }), t('c2', 2, { parent_id: 'par' }), t('c3', 2, { parent_id: 'par' }), t('c4', 2), t('z', 0)]
    let r = computeRoadmap(phases, ts, [], prog({ z: 'hecha', c1: 'hecha' }))
    expect(ph(r, 2).pct).toBe(25)
    expect(find(r, 'par').status).toBe('en_curso')
    expect(ph(r, 2).tasks.map((x) => x.id)).toEqual(['par', 'c4'])
    expect(ph(r, 2).tasks[0].children).toHaveLength(3)
    r = computeRoadmap(phases, ts, [], prog({ z: 'hecha', c1: 'hecha', c2: 'hecha', c3: 'hecha' }))
    expect(find(r, 'par').status).toBe('hecha')
    expect(ph(r, 2).pct).toBe(75)
    r = computeRoadmap(phases, ts, [], prog({ z: 'hecha' }))
    expect(find(r, 'par').status).toBe('pendiente')
    expect(r.globalPct).toBe(20) // 1 de 5 hojas
  })

  it('fase sin tareas cuenta 0', () => {
    expect(ph(computeRoadmap(phases, [], [], []), 3).pct).toBe(0)
  })

  it('dependencia sin hacer bloquea y aparece su título', () => {
    const ts = [t('z', 0, { title: 'Req' }), t('d1', 2, { title: 'Leer PDF' }), t('d2', 2, { title: 'Resumen' })]
    const deps: DependencyRow[] = [{ task_id: 'd2', depends_on_id: 'd1' }]
    let r = computeRoadmap(phases, ts, deps, prog({ z: 'hecha' }))
    expect(find(r, 'd2').blocked).toBe(true)
    expect(find(r, 'd2').blockedBy).toEqual(['Leer PDF'])
    expect(find(r, 'd1').blocked).toBe(false)
    r = computeRoadmap(phases, ts, deps, prog({ z: 'hecha', d1: 'hecha' }))
    expect(find(r, 'd2').blocked).toBe(false)
    expect(find(r, 'd2').blockedBy).toEqual([])
  })

  it('currentPhase correcto', () => {
    let r = computeRoadmap(phases, base, [], [])
    expect(r.currentPhase).toBe(0)
    r = computeRoadmap(phases, base, [], prog({ a0: 'hecha' }))
    expect(r.currentPhase).toBe(1)
    r = computeRoadmap(phases, base, [], prog({ a0: 'hecha', a1: 'hecha' }))
    expect(r.currentPhase).toBe(2)
  })

  it('fase 6 bloqueada hasta terminar la 2', () => {
    let r = computeRoadmap(phases, base, [], prog({ a0: 'hecha', a1: 'hecha' }))
    expect(ph(r, 6).status).toBe('bloqueada')
    expect(find(r, 'a6').blockedBy).toEqual(['Fase 2'])
    r = computeRoadmap(phases, base, [], prog({ a0: 'hecha', a2: 'hecha' }))
    expect(ph(r, 6).status).not.toBe('bloqueada')
  })

  it('next: en curso primero, intercala 2/3/4 y respeta límite', () => {
    const ts = [
      t('z', 0),
      t('b1', 2, { sort: 1 }), t('b2', 2, { sort: 2 }),
      t('c1', 3, { sort: 1 }), t('c2', 3, { sort: 2 }),
      t('d1', 4, { sort: 1 }),
    ]
    let r = computeRoadmap(phases, ts, [], prog({ z: 'hecha' }), 10)
    expect(r.next.map((x) => x.id)).toEqual(['b1', 'c1', 'd1', 'b2', 'c2'])
    r = computeRoadmap(phases, ts, [], prog({ z: 'hecha' }))
    expect(r.next).toHaveLength(3)
    r = computeRoadmap(phases, ts, [], prog({ z: 'hecha', c2: 'en_curso' }), 2)
    expect(r.next.map((x) => x.id)).toEqual(['c2', 'b1'])
    // no incluye bloqueadas ni hechas
    r = computeRoadmap(phases, ts, [], prog({ z: 'hecha', b1: 'hecha' }), 10)
    expect(r.next.map((x) => x.id)).not.toContain('b1')
    r = computeRoadmap(phases, ts, [], [], 10)
    expect(r.next.map((x) => x.id)).toEqual(['z'])
  })

  it('todo hecho: 100% y currentPhase null', () => {
    const r = computeRoadmap(phases, base, [], allDone(base))
    expect(r.globalPct).toBe(100)
    expect(r.currentPhase).toBeNull()
    expect(r.next).toEqual([])
    expect(r.phases.every((p) => p.status === 'hecha' && p.pct === 100)).toBe(true)
  })
})

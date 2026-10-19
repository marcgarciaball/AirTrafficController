import type {
  DependencyRow, PhaseRow, PhaseStatus, PhaseView, ProgressRow, Roadmap, TaskRow, TaskStatus, TaskView,
} from "./types"

const PARALLEL = [2, 3, 4]
const pct = (done: number, total: number) => (total === 0 ? 0 : Math.round((done / total) * 100))

export function computeRoadmap(
  phases: PhaseRow[],
  tasks: TaskRow[],
  deps: DependencyRow[],
  progress: ProgressRow[],
  nextLimit = 3
): Roadmap {
  const byId = new Map(tasks.map((x) => [x.id, x]))
  const childrenOf = new Map<string, TaskRow[]>()
  for (const x of tasks) {
    if (x.parent_id) childrenOf.set(x.parent_id, [...(childrenOf.get(x.parent_id) ?? []), x])
  }
  const own = new Map(progress.map((p) => [p.task_id, p.status]))

  const statusCache = new Map<string, TaskStatus>()
  const statusOf = (id: string): TaskStatus => {
    const c = statusCache.get(id)
    if (c) return c
    const kids = childrenOf.get(id)
    let s: TaskStatus
    if (!kids || kids.length === 0) s = own.get(id) ?? "pendiente"
    else {
      const ks = kids.map((k) => statusOf(k.id))
      s = ks.every((k) => k === "hecha") ? "hecha" : ks.some((k) => k !== "pendiente") ? "en_curso" : "pendiente"
    }
    statusCache.set(id, s)
    return s
  }
  const isLeaf = (x: TaskRow) => !childrenOf.has(x.id)
  const bySort = (a: TaskRow, b: TaskRow) => a.sort - b.sort

  const sorted = [...phases].sort((a, b) => a.number - b.number)
  const leavesOf = (p: PhaseRow) => tasks.filter((x) => x.phase_id === p.id && isLeaf(x))

  // Fase hecha: todas sus hojas no recomendadas hechas (y tiene alguna hoja)
  const done = new Map<number, boolean>()
  for (const p of sorted) {
    const leaves = leavesOf(p)
    done.set(p.number, leaves.length > 0 && leaves.filter((l) => !l.recommended).every((l) => statusOf(l.id) === "hecha"))
  }
  const phaseBlockers = (p: PhaseRow) => p.unlock_after.filter((n) => !done.get(n))

  const phaseById = new Map(phases.map((p) => [p.id, p]))
  const depsOf = new Map<string, string[]>()
  for (const d of deps) depsOf.set(d.task_id, [...(depsOf.get(d.task_id) ?? []), d.depends_on_id])

  const build = (x: TaskRow): TaskView => {
    const phase = phaseById.get(x.phase_id)
    const blockedBy: string[] = phase ? phaseBlockers(phase).map((n) => `Fase ${n}`) : []
    for (const id of depsOf.get(x.id) ?? []) {
      const d = byId.get(id)
      if (d && !d.recommended && statusOf(id) !== "hecha") blockedBy.push(d.title)
    }
    return {
      ...x,
      status: statusOf(x.id),
      blocked: blockedBy.length > 0,
      blockedBy,
      children: [...(childrenOf.get(x.id) ?? [])].sort(bySort).map(build),
    }
  }

  const phaseViews: PhaseView[] = sorted.map((p) => {
    const leaves = leavesOf(p)
    const doneLeaves = leaves.filter((l) => statusOf(l.id) === "hecha").length
    let status: PhaseStatus
    if (phaseBlockers(p).length > 0) status = "bloqueada"
    else if (done.get(p.number)) status = "hecha"
    else if (leaves.some((l) => statusOf(l.id) !== "pendiente")) status = "en_curso"
    else status = "disponible"
    return {
      ...p,
      status,
      pct: pct(doneLeaves, leaves.length),
      tasks: tasks.filter((x) => x.phase_id === p.id && !x.parent_id).sort(bySort).map(build),
    }
  })

  const allLeaves = tasks.filter(isLeaf)
  const globalPct = pct(allLeaves.filter((l) => statusOf(l.id) === "hecha").length, allLeaves.length)
  const current = phaseViews.find((p) => p.status !== "bloqueada" && p.status !== "hecha")

  // next: hojas desbloqueadas y no hechas; en curso primero; fases 2/3/4 intercaladas
  const leafViews = (p: PhaseView): TaskView[] => {
    const out: TaskView[] = []
    const walk = (ts: TaskView[]) => ts.forEach((t) => (t.children.length ? walk(t.children) : out.push(t)))
    walk(p.tasks)
    return out
  }
  const candidates = (p: PhaseView, st: TaskStatus) => leafViews(p).filter((t) => !t.blocked && t.status === st)
  const ordered = (st: TaskStatus): TaskView[] => {
    const out: TaskView[] = []
    let parallelDone = false
    for (const p of phaseViews) {
      if (PARALLEL.includes(p.number)) {
        if (parallelDone) continue
        parallelDone = true
        const queues = phaseViews.filter((q) => PARALLEL.includes(q.number)).map((q) => candidates(q, st))
        for (let i = 0; queues.some((q) => i < q.length); i++) for (const q of queues) if (i < q.length) out.push(q[i])
      } else out.push(...candidates(p, st))
    }
    return out
  }
  const next = [...ordered("en_curso"), ...ordered("pendiente")].slice(0, nextLimit)

  return { phases: phaseViews, globalPct, currentPhase: current ? current.number : null, next }
}

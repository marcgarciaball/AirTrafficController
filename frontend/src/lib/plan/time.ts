export type SessionTime = { started_at: string; ended_at: string | null; paused_seconds: number; paused_at: string | null }
export type SessionLike = SessionTime & { task_id?: string | null; topic_id?: string | null }

export function effectiveSeconds(s: SessionTime, now: Date): number {
  const end = s.ended_at ? new Date(s.ended_at).getTime() : now.getTime()
  const pausedNow = s.paused_at ? end - new Date(s.paused_at).getTime() : 0
  const ms = end - new Date(s.started_at).getTime() - s.paused_seconds * 1000 - pausedNow
  return Math.max(0, Math.floor(ms / 1000))
}

export function localDay(iso: string, tz: string): string {
  // en-CA formatea como YYYY-MM-DD
  return new Intl.DateTimeFormat("en-CA", { timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(iso))
}

export function addDays(day: string, n: number): string {
  const d = new Date(`${day}T00:00:00Z`)
  d.setUTCDate(d.getUTCDate() + n)
  return d.toISOString().slice(0, 10)
}

/** 0 = lunes ... 6 = domingo */
export function weekdayIndex(day: string): number {
  return (new Date(`${day}T00:00:00Z`).getUTCDay() + 6) % 7
}

export function weekStart(day: string): string {
  return addDays(day, -weekdayIndex(day))
}

export type Totals = {
  byDay: Record<string, number>
  byWeek: Record<string, number>
  byTask: Record<string, number>
  byTopic: Record<string, number>
  total: number
}

export function totals(sessions: SessionLike[], tz: string, now: Date): Totals {
  const t: Totals = { byDay: {}, byWeek: {}, byTask: {}, byTopic: {}, total: 0 }
  const add = (m: Record<string, number>, k: string, v: number) => { m[k] = (m[k] ?? 0) + v }
  for (const s of sessions) {
    const sec = effectiveSeconds(s, now)
    const day = localDay(s.started_at, tz)
    add(t.byDay, day, sec)
    add(t.byWeek, weekStart(day), sec)
    if (s.task_id) add(t.byTask, s.task_id, sec)
    if (s.topic_id) add(t.byTopic, s.topic_id, sec)
    t.total += sec
  }
  return t
}

export function streak(byDay: Record<string, number>, today: string): number {
  const ok = (d: string) => (byDay[d] ?? 0) >= 60
  let d = ok(today) ? today : addDays(today, -1)
  let n = 0
  while (ok(d)) { n++; d = addDays(d, -1) }
  return n
}

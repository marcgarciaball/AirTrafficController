import { buildPlan } from "@/lib/plan/planner"
import { localDay, totals } from "@/lib/plan/time"
import { loadRoadmap } from "@/lib/roadmap/load"
import type { LooseClient } from "./db"

/** Zona horaria y minutos de estudio previstos hoy (para dimensionar la cola de tarjetas). */
export async function loadToday(db: LooseClient, userId: string | undefined) {
  const { roadmap } = await loadRoadmap()
  const { data: profile } = userId
    ? await db.from("profiles").select("target_date, weekly_hours, timezone").eq("id", userId).maybeSingle()
    : { data: null }
  const tz: string = profile?.timezone ?? "Europe/Madrid"
  const now = new Date()
  const { data: rows } = await db
    .from("study_sessions")
    .select("id, task_id, topic_id, started_at, ended_at, paused_seconds, paused_at")
    .gte("started_at", new Date(now.getTime() - 14 * 86400000).toISOString())
  const byDay = totals(rows ?? [], tz, now).byDay
  const plan = buildPlan({ today: localDay(now.toISOString(), tz), tz, weeklyHours: profile?.weekly_hours ?? 10, targetDate: profile?.target_date ?? null, roadmap, secondsByDay: byDay })
  return { tz, now, todayMinutes: plan.todayMinutes }
}

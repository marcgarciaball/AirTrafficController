"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"
import type { SupabaseClient } from "@supabase/supabase-js"
import { createClient } from "@/lib/supabase/server"
import { UUID_RE } from "@/lib/study/types"
import { localToIso } from "@/lib/sessions/tz"

type Result = { error?: string }

const uuid = z.string().regex(UUID_RE)
const day = z.string().regex(/^\d{4}-\d{2}-\d{2}$/)
const hhmm = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/)
const notesSchema = z.string().trim().max(2000).nullish()

const manualSchema = z
  .object({
    day,
    start: hhmm,
    end: hhmm.nullish(),
    durationMinutes: z.number().int().min(1).max(1440).nullish(),
    taskId: uuid.nullish(),
    notes: notesSchema,
  })
  .refine((v) => (v.end ? 1 : 0) + (v.durationMinutes ? 1 : 0) === 1, { message: "Indica la hora de fin o la duración." })

export type ManualInput = z.input<typeof manualSchema>

const NO_AUTH = "Tu sesión ha caducado. Vuelve a iniciar sesión."

async function ctx() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()
  if (!data.user) return null
  // Cliente sin tipar para no depender de la regeneración de database.types.ts.
  return { db: supabase as unknown as SupabaseClient, userId: data.user.id }
}

function refresh() {
  for (const p of ["/hoy", "/sesion", "/mas/sesiones"]) revalidatePath(p)
  revalidatePath("/", "layout")
}

type Row = { id: string; task_id: string | null; started_at: string; paused_seconds: number; paused_at: string | null; ended_at: string | null }

async function openRow(c: NonNullable<Awaited<ReturnType<typeof ctx>>>, id: string): Promise<Row | null> {
  const { data } = await c.db
    .from("study_sessions")
    .select("id, task_id, started_at, paused_seconds, paused_at, ended_at")
    .eq("id", id)
    .eq("user_id", c.userId)
    .is("ended_at", null)
    .maybeSingle()
  return (data as Row | null) ?? null
}

const secondsBetween = (from: string, to: Date) => Math.max(0, Math.floor((to.getTime() - new Date(from).getTime()) / 1000))

export async function startSession(taskId: string | null, topicId: string | null): Promise<{ id: string } | { error: string }> {
  const parsed = z.object({ taskId: uuid.nullable(), topicId: uuid.nullable() }).safeParse({ taskId, topicId })
  if (!parsed.success) return { error: "Datos no válidos." }
  const c = await ctx()
  if (!c) return { error: NO_AUTH }

  const { data: open } = await c.db.from("study_sessions").select("id").eq("user_id", c.userId).is("ended_at", null).maybeSingle()
  if (open) return { error: "Ya tienes una sesión en marcha." }

  let topic = parsed.data.topicId
  if (parsed.data.taskId && !topic) {
    const { data: t } = await c.db.from("tasks").select("topic_id").eq("id", parsed.data.taskId).maybeSingle()
    topic = (t as { topic_id: string | null } | null)?.topic_id ?? null
  }
  const { data, error } = await c.db
    .from("study_sessions")
    .insert({ task_id: parsed.data.taskId, topic_id: topic, started_at: new Date().toISOString(), origin: "cronometro" })
    .select("id")
    .single()
  if (error || !data) {
    return { error: error?.code === "23505" ? "Ya tienes una sesión en marcha." : "No se pudo iniciar la sesión." }
  }
  refresh()
  return { id: (data as { id: string }).id }
}

export async function pauseSession(id: string): Promise<Result> {
  if (!uuid.safeParse(id).success) return { error: "Datos no válidos." }
  const c = await ctx()
  if (!c) return { error: NO_AUTH }
  const { data, error } = await c.db
    .from("study_sessions")
    .update({ paused_at: new Date().toISOString() })
    .eq("id", id)
    .eq("user_id", c.userId)
    .is("ended_at", null)
    .is("paused_at", null)
    .select("id")
  if (error || !data || data.length === 0) return { error: "No se pudo pausar la sesión." }
  refresh()
  return {}
}

export async function resumeSession(id: string): Promise<Result> {
  if (!uuid.safeParse(id).success) return { error: "Datos no válidos." }
  const c = await ctx()
  if (!c) return { error: NO_AUTH }
  const row = await openRow(c, id)
  if (!row || !row.paused_at) return { error: "La sesión no está en pausa." }
  const { data, error } = await c.db
    .from("study_sessions")
    .update({ paused_seconds: row.paused_seconds + secondsBetween(row.paused_at, new Date()), paused_at: null })
    .eq("id", id)
    .eq("user_id", c.userId)
    .is("ended_at", null)
    .not("paused_at", "is", null)
    .select("id")
  if (error || !data || data.length === 0) return { error: "No se pudo reanudar la sesión." }
  refresh()
  return {}
}

export async function finishSession(id: string, notes?: string | null, markTaskDone?: boolean): Promise<Result> {
  const parsed = z.object({ id: uuid, notes: notesSchema, markTaskDone: z.boolean().optional() }).safeParse({ id, notes, markTaskDone })
  if (!parsed.success) return { error: "Datos no válidos." }
  const c = await ctx()
  if (!c) return { error: NO_AUTH }
  const row = await openRow(c, parsed.data.id)
  if (!row) return { error: "Sesión no encontrada o ya finalizada." }

  const now = new Date()
  const paused = row.paused_seconds + (row.paused_at ? secondsBetween(row.paused_at, now) : 0)
  const { data, error } = await c.db
    .from("study_sessions")
    .update({ ended_at: now.toISOString(), paused_at: null, paused_seconds: paused, notes: parsed.data.notes || null })
    .eq("id", row.id)
    .eq("user_id", c.userId)
    .is("ended_at", null)
    .select("id")
  if (error || !data || data.length === 0) return { error: "No se pudo finalizar la sesión." }

  if (parsed.data.markTaskDone && row.task_id) {
    const iso = now.toISOString()
    const { error: pErr } = await c.db.from("user_task_progress").upsert(
      { user_id: c.userId, task_id: row.task_id, status: "hecha", started_at: iso, completed_at: iso, updated_at: iso },
      { onConflict: "user_id,task_id" },
    )
    if (pErr) {
      refresh()
      return { error: "Sesión guardada, pero no se pudo marcar la tarea como hecha." }
    }
    revalidatePath("/ruta")
  }
  refresh()
  return {}
}

function manualTimes(v: z.output<typeof manualSchema>, tz: string): { started_at: string; ended_at: string } | null {
  const started = localToIso(v.day, v.start, tz)
  const ended = v.end ? localToIso(v.day, v.end, tz) : new Date(new Date(started).getTime() + (v.durationMinutes ?? 0) * 60000).toISOString()
  return ended > started ? { started_at: started, ended_at: ended } : null
}

async function userTz(c: NonNullable<Awaited<ReturnType<typeof ctx>>>): Promise<string> {
  const { data } = await c.db.from("profiles").select("timezone").eq("id", c.userId).maybeSingle()
  return (data as { timezone: string } | null)?.timezone ?? "Europe/Madrid"
}

export async function addManualSession(input: ManualInput): Promise<Result> {
  const parsed = manualSchema.safeParse(input)
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Datos no válidos." }
  const c = await ctx()
  if (!c) return { error: NO_AUTH }
  const times = manualTimes(parsed.data, await userTz(c))
  if (!times) return { error: "La hora de fin debe ser posterior al inicio." }
  if (new Date(times.started_at) > new Date()) return { error: "El inicio no puede estar en el futuro." }
  const topic = await topicOf(c, parsed.data.taskId ?? null)
  const { error } = await c.db
    .from("study_sessions")
    .insert({ ...times, task_id: parsed.data.taskId ?? null, topic_id: topic, origin: "manual", notes: parsed.data.notes || null })
  if (error) return { error: "No se pudo guardar la sesión." }
  refresh()
  return {}
}

async function topicOf(c: NonNullable<Awaited<ReturnType<typeof ctx>>>, taskId: string | null): Promise<string | null> {
  if (!taskId) return null
  const { data } = await c.db.from("tasks").select("topic_id").eq("id", taskId).maybeSingle()
  return (data as { topic_id: string | null } | null)?.topic_id ?? null
}

export async function updateSession(id: string, input: ManualInput): Promise<Result> {
  if (!uuid.safeParse(id).success) return { error: "Datos no válidos." }
  const parsed = manualSchema.safeParse(input)
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Datos no válidos." }
  const c = await ctx()
  if (!c) return { error: NO_AUTH }
  const times = manualTimes(parsed.data, await userTz(c))
  if (!times) return { error: "La hora de fin debe ser posterior al inicio." }
  const topic = await topicOf(c, parsed.data.taskId ?? null)
  const { data, error } = await c.db
    .from("study_sessions")
    .update({ ...times, paused_at: null, paused_seconds: 0, task_id: parsed.data.taskId ?? null, topic_id: topic, notes: parsed.data.notes || null })
    .eq("id", id)
    .eq("user_id", c.userId)
    .not("ended_at", "is", null)
    .select("id")
  if (error || !data || data.length === 0) return { error: "No se pudo actualizar la sesión." }
  refresh()
  return {}
}

export async function deleteSession(id: string): Promise<Result> {
  if (!uuid.safeParse(id).success) return { error: "Datos no válidos." }
  const c = await ctx()
  if (!c) return { error: NO_AUTH }
  const { error } = await c.db.from("study_sessions").delete().eq("id", id).eq("user_id", c.userId)
  if (error) return { error: "No se pudo borrar la sesión." }
  refresh()
  return {}
}

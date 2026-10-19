"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"
import type { SupabaseClient } from "@supabase/supabase-js"
import { createClient } from "@/lib/supabase/server"
import { localToIso } from "@/lib/sessions/tz"
import { UUID_RE } from "@/lib/study/types"

type Result = { error?: string }

const uuid = z.string().regex(UUID_RE)
const createSchema = z.object({
  title: z.string().trim().min(1, "Escribe un título.").max(200),
  day: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/),
  eventId: uuid.nullish(),
})

const NO_AUTH = "Tu sesión ha caducado. Vuelve a iniciar sesión."

async function ctx() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()
  if (!data.user) return null
  return { db: supabase as unknown as SupabaseClient, userId: data.user.id }
}

export async function createReminder(input: z.input<typeof createSchema>): Promise<Result> {
  const p = createSchema.safeParse(input)
  if (!p.success) return { error: p.error.issues[0]?.message ?? "Datos no válidos." }
  const c = await ctx()
  if (!c) return { error: NO_AUTH }
  const { data: prof } = await c.db.from("profiles").select("timezone").eq("id", c.userId).maybeSingle()
  const due_at = localToIso(p.data.day, p.data.time, prof?.timezone ?? "Europe/Madrid")
  const { error } = await c.db.from("reminders").insert({ title: p.data.title, due_at, exam_call_event_id: p.data.eventId ?? null, user_id: c.userId })
  if (error) return { error: "No se pudo crear el recordatorio." }
  revalidatePath("/mas/calendario")
  return {}
}

export async function setReminderDone(id: string, done: boolean): Promise<Result> {
  const p = z.object({ id: uuid, done: z.boolean() }).safeParse({ id, done })
  if (!p.success) return { error: "Datos no válidos." }
  const c = await ctx()
  if (!c) return { error: NO_AUTH }
  const { error } = await c.db.from("reminders").update({ done: p.data.done }).eq("id", p.data.id).eq("user_id", c.userId)
  if (error) return { error: "No se pudo actualizar." }
  revalidatePath("/mas/calendario")
  return {}
}

export async function deleteReminder(id: string): Promise<Result> {
  const p = uuid.safeParse(id)
  if (!p.success) return { error: "Datos no válidos." }
  const c = await ctx()
  if (!c) return { error: NO_AUTH }
  const { error } = await c.db.from("reminders").delete().eq("id", p.data).eq("user_id", c.userId)
  if (error) return { error: "No se pudo borrar." }
  revalidatePath("/mas/calendario")
  return {}
}

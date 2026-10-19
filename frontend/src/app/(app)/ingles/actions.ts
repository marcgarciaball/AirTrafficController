"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"
import { createClient } from "@/lib/supabase/server"
import { sm2 } from "@/lib/english/sm2"
import { toIsoDay } from "@/lib/english/date"

type Result = { error?: string }

const uuid = z.uuid()
const day = z.string().refine((s) => {
  try {
    toIsoDay(s)
    return true
  } catch {
    return false
  }
}, "Fecha no válida")

const logSchema = z
  .object({
    goal: z.enum(["c1", "oaci_en", "oaci_es"]),
    skill: z.enum(["reading", "use", "writing", "listening", "speaking"]),
    part: z.string().trim().max(80).nullable(),
    taken_on: day,
    score: z.number().min(0).max(100000).nullable(),
    max_score: z.number().positive().max(100000).nullable(),
    notes: z.string().trim().max(1000).nullable(),
  })
  .refine((v) => v.score === null || v.max_score === null || v.score <= v.max_score, "La nota no puede superar el máximo")

const endorsementSchema = z.object({
  language: z.enum(["en", "es"]),
  level: z.number().int().min(4).max(6),
  assessed_on: day,
  center: z.string().trim().max(120).nullable(),
})

const cardSchema = z.object({
  deck: z.enum(["vocabulario", "fraseologia"]),
  front: z.string().trim().min(1).max(500),
  back: z.string().trim().min(1).max(1000),
})

async function auth() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()
  return data.user ? supabase : null
}

function done(error: { message: string } | null, path = "/ingles"): Result {
  if (error) return { error: "No se pudo guardar." }
  revalidatePath(path)
  return {}
}

export async function addLog(input: z.input<typeof logSchema>): Promise<Result> {
  const p = logSchema.safeParse(input)
  if (!p.success) return { error: p.error.issues[0]?.message ?? "Datos no válidos." }
  const supabase = await auth()
  if (!supabase) return { error: "Sesión no válida." }
  const { error } = await supabase.from("english_logs").insert(p.data)
  return done(error)
}

export async function deleteLog(id: string): Promise<Result> {
  if (!uuid.safeParse(id).success) return { error: "Datos no válidos." }
  const supabase = await auth()
  if (!supabase) return { error: "Sesión no válida." }
  const { error } = await supabase.from("english_logs").delete().eq("id", id)
  return done(error)
}

export async function addEndorsement(input: z.input<typeof endorsementSchema>): Promise<Result> {
  const p = endorsementSchema.safeParse(input)
  if (!p.success) return { error: p.error.issues[0]?.message ?? "Datos no válidos." }
  const supabase = await auth()
  if (!supabase) return { error: "Sesión no válida." }
  const { error } = await supabase.from("language_endorsements").insert(p.data)
  return done(error)
}

export async function deleteEndorsement(id: string): Promise<Result> {
  if (!uuid.safeParse(id).success) return { error: "Datos no válidos." }
  const supabase = await auth()
  if (!supabase) return { error: "Sesión no válida." }
  const { error } = await supabase.from("language_endorsements").delete().eq("id", id)
  return done(error)
}

export async function addCard(input: z.input<typeof cardSchema>): Promise<Result> {
  const p = cardSchema.safeParse(input)
  if (!p.success) return { error: "Escribe anverso y reverso." }
  const supabase = await auth()
  if (!supabase) return { error: "Sesión no válida." }
  const { error } = await supabase.from("flashcards").insert(p.data)
  return done(error, "/ingles/tarjetas")
}

export async function deleteCard(id: string): Promise<Result> {
  if (!uuid.safeParse(id).success) return { error: "Datos no válidos." }
  const supabase = await auth()
  if (!supabase) return { error: "Sesión no válida." }
  const { error } = await supabase.from("flashcards").delete().eq("id", id)
  return done(error, "/ingles/tarjetas")
}

/** Aplica SM-2 en el servidor a partir del estado guardado (no se fía del cliente). */
export async function reviewCard(id: string, grade: number, today: string): Promise<Result> {
  const p = z.object({ id: uuid, grade: z.number().int().min(0).max(5), today: day }).safeParse({ id, grade, today })
  if (!p.success) return { error: "Datos no válidos." }
  const supabase = await auth()
  if (!supabase) return { error: "Sesión no válida." }
  const { data: card, error: e1 } = await supabase.from("flashcards").select("ease, interval_days, reps").eq("id", p.data.id).maybeSingle()
  if (e1 || !card) return { error: "Tarjeta no encontrada." }
  const next = sm2(card, p.data.grade, p.data.today)
  const { error } = await supabase.from("flashcards").update(next).eq("id", p.data.id)
  return done(error, "/ingles/tarjetas")
}

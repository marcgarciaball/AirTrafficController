"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"
import { KINDS, nextLevel } from "@/lib/aptitudes/kinds"
import { createClient } from "@/lib/supabase/server"

const schema = z
  .object({
    kind: z.enum(KINDS),
    level: z.number().int().min(1).max(5),
    score: z.number().int().min(0).max(200),
    total: z.number().int().min(1).max(200),
    durationS: z.number().int().min(0).max(7200),
  })
  .refine((v) => v.score <= v.total)

export async function saveAptitudeResult(input: unknown): Promise<{ nextLevel: number } | { error: string }> {
  const parsed = schema.safeParse(input)
  if (!parsed.success) return { error: "Datos no válidos." }
  const supabase = await createClient()
  const { data: userData } = await supabase.auth.getUser()
  if (!userData.user) return { error: "Sesión no válida." }
  const v = parsed.data
  const { error } = await supabase
    .from("aptitude_results")
    .insert({ user_id: userData.user.id, kind: v.kind, level: v.level, score: v.score, total: v.total, duration_s: v.durationS })
  if (error) return { error: "No se pudo guardar el resultado." }
  revalidatePath("/aptitudes")
  return { nextLevel: nextLevel(v.level, v.score, v.total) }
}

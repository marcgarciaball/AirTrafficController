"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"
import type { SupabaseClient } from "@supabase/supabase-js"
import { createClient } from "@/lib/supabase/server"
import type { TaskStatus } from "@/lib/roadmap/types"

const schema = z.object({
  taskId: z.string().uuid(),
  status: z.enum(["pendiente", "en_curso", "hecha"]),
})

export async function setTaskStatus(taskId: string, status: TaskStatus): Promise<{ error?: string }> {
  const parsed = schema.safeParse({ taskId, status })
  if (!parsed.success) return { error: "Datos no válidos." }
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()
  if (!data.user) return { error: "Tu sesión ha caducado. Vuelve a iniciar sesión." }

  const now = new Date().toISOString()
  const s = parsed.data.status
  const db = supabase as unknown as SupabaseClient
  const { error } = await db.from("user_task_progress").upsert(
    {
      user_id: data.user.id,
      task_id: parsed.data.taskId,
      status: s,
      started_at: s === "pendiente" ? null : now,
      completed_at: s === "hecha" ? now : null,
      updated_at: now,
    },
    { onConflict: "user_id,task_id" }
  )
  if (error) return { error: "No se ha podido guardar el estado. Inténtalo de nuevo." }
  revalidatePath("/ruta")
  revalidatePath("/hoy")
  return {}
}

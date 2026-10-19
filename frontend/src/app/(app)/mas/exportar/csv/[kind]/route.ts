import type { SupabaseClient } from "@supabase/supabase-js"
import { attemptsCsv, sessionsCsv, type AttemptExportRow, type SessionExportRow } from "@/lib/export/csv"
import { createClient } from "@/lib/supabase/server"

export const dynamic = "force-dynamic"

export async function GET(_req: Request, { params }: { params: Promise<{ kind: string }> }) {
  const { kind } = await params
  if (kind !== "sesiones" && kind !== "intentos") return new Response("No encontrado", { status: 404 })
  const db = (await createClient()) as unknown as SupabaseClient
  const { data: auth } = await db.auth.getUser()
  if (!auth.user) return new Response("No autenticado", { status: 401 })
  const now = new Date()

  let csv: string
  if (kind === "sesiones") {
    const [{ data: prof }, { data, error }] = await Promise.all([
      db.from("profiles").select("timezone").eq("id", auth.user.id).maybeSingle(),
      db.from("study_sessions").select("id, task_id, topic_id, started_at, ended_at, paused_seconds, paused_at, origin, notes").order("started_at"),
    ])
    if (error) return new Response("Error al leer los datos", { status: 500 })
    csv = sessionsCsv((data ?? []) as SessionExportRow[], prof?.timezone ?? "Europe/Madrid", now)
  } else {
    const { data, error } = await db.from("quiz_attempts").select("id, mode, topic_id, started_at, finished_at, total, correct, wrong, blank").order("started_at")
    if (error) return new Response("Error al leer los datos", { status: 500 })
    csv = attemptsCsv((data ?? []) as AttemptExportRow[])
  }
  return new Response("﻿" + csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="torre-${kind}-${now.toISOString().slice(0, 10)}.csv"`,
      "Cache-Control": "private, no-store",
    },
  })
}

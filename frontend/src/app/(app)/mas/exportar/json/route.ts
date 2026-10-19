import type { SupabaseClient } from "@supabase/supabase-js"
import { buildExport } from "@/lib/export/csv"
import { createClient } from "@/lib/supabase/server"

export const dynamic = "force-dynamic"

// Tablas del usuario (RLS filtra por sesión). Las de otras áreas pueden no existir: se omiten sin fallar.
const TABLES: [string, string][] = [
  ["user_task_progress", "*"],
  ["study_sessions", "*"],
  ["quiz_attempts", "*"],
  ["reminders", "*"],
  ["aptitude_results", "*"],
  ["english_logs", "*"],
  ["language_endorsements", "*"],
  ["flashcards", "*"],
]

export async function GET() {
  const db = (await createClient()) as unknown as SupabaseClient
  const { data } = await db.auth.getUser()
  if (!data.user) return new Response("No autenticado", { status: 401 })
  const now = new Date()
  const [profile, ...rest] = await Promise.all([
    db.from("profiles").select("*").eq("id", data.user.id),
    ...TABLES.map(([t, cols]) => db.from(t).select(cols)),
  ])
  const tables: Record<string, { data: unknown[] | null; error: unknown | null }> = { profiles: profile }
  TABLES.forEach(([t], i) => { tables[t] = rest[i] })
  const body = JSON.stringify(buildExport(data.user.id, now, tables), null, 2)
  return new Response(body, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Disposition": `attachment; filename="torre-datos-${now.toISOString().slice(0, 10)}.json"`,
      "Cache-Control": "private, no-store",
    },
  })
}

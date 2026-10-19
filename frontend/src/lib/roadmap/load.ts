import type { SupabaseClient } from "@supabase/supabase-js"
import { createClient } from "@/lib/supabase/server"
import { computeRoadmap } from "./progress"
import type { DependencyRow, PhaseRow, ProgressRow, Roadmap, TaskRow } from "./types"

export type RoadmapData = {
  roadmap: Roadmap
  sources: Record<string, { url: string; title: string; consulted_on: string }>
  links: Record<string, { source_id: string; role: string }[]>
}

export async function loadRoadmap(): Promise<RoadmapData> {
  // Cliente sin tipar: las tablas nuevas pueden no estar aún en database.types.ts.
  const db = (await createClient()) as unknown as SupabaseClient
  const [phases, tasks, deps, progress, links, sources] = await Promise.all([
    db.from("phases").select("*").order("number"),
    db.from("tasks").select("*").order("sort"),
    db.from("task_dependencies").select("task_id, depends_on_id"),
    db.from("user_task_progress").select("task_id, status"),
    db.from("task_links").select("task_id, source_id, role"),
    db.from("sources").select("id, url, title, consulted_on"),
  ])
  const roadmap = computeRoadmap(
    (phases.data ?? []) as PhaseRow[],
    (tasks.data ?? []) as TaskRow[],
    (deps.data ?? []) as DependencyRow[],
    (progress.data ?? []) as ProgressRow[]
  )
  const sourceMap: RoadmapData["sources"] = {}
  for (const s of sources.data ?? []) sourceMap[s.id] = { url: s.url, title: s.title, consulted_on: s.consulted_on }
  const linkMap: RoadmapData["links"] = {}
  for (const l of links.data ?? []) (linkMap[l.task_id] ??= []).push({ source_id: l.source_id, role: l.role })
  return { roadmap, sources: sourceMap, links: linkMap }
}

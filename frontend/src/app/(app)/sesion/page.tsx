import { PageTitle } from "@/components/cockpit/page-title"
import { Panel } from "@/components/cockpit/panel"
import { loadRoadmap } from "@/lib/roadmap/load"
import { createClient } from "@/lib/supabase/server"
import { SessionTimer, type OpenSession } from "./session-timer"
import { StartPanel, type TaskOption } from "./start-panel"

export default async function Page({ searchParams }: { searchParams: Promise<{ task?: string }> }) {
  const { task } = await searchParams
  const supabase = await createClient()
  const { data } = await supabase
    .from("study_sessions")
    .select("id, task_id, started_at, ended_at, paused_seconds, paused_at")
    .is("ended_at", null)
    .maybeSingle()
  const open = (data as OpenSession | null) ?? null

  if (open) {
    let title: string | null = null
    if (open.task_id) {
      const { data: t } = await supabase.from("tasks").select("title").eq("id", open.task_id).maybeSingle()
      title = t?.title ?? null
    }
    return (
      <section className="space-y-6">
        <PageTitle code="SESIÓN" title="Sesión en marcha" />
        <Panel title="Cronómetro">
          <SessionTimer session={open} taskTitle={title} />
        </Panel>
      </section>
    )
  }

  const { roadmap } = await loadRoadmap()
  const options: TaskOption[] = roadmap.next.map((t) => ({ id: t.id, title: t.title, topic_id: t.topic_id }))
  const initial = task && options.some((o) => o.id === task) ? task : (options[0]?.id ?? null)
  return (
    <section className="space-y-6">
      <PageTitle code="SESIÓN" title="Nueva sesión" />
      <Panel title="Empezar">
        <StartPanel options={options} initialTaskId={initial} />
      </Panel>
    </section>
  )
}

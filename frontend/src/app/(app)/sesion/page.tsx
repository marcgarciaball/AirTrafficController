import { PageHeader } from "@/components/ui-torre/page-header"
import { Card } from "@/components/ui-torre/section"
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
      <section className="space-y-8">
        <PageHeader title="Sesión de estudio" back={{ href: "/hoy", label: "Hoy" }} />
        <Card className="sm:p-8">
          <SessionTimer session={open} taskTitle={title} />
        </Card>
      </section>
    )
  }

  const { roadmap } = await loadRoadmap()
  const options: TaskOption[] = roadmap.next.map((t) => ({ id: t.id, title: t.title, topic_id: t.topic_id }))
  const initial = task && options.some((o) => o.id === task) ? task : (options[0]?.id ?? null)
  return (
    <section className="space-y-8">
      <PageHeader title="Nueva sesión" description="Elige en qué vas a trabajar. El cronómetro descuenta las pausas." back={{ href: "/hoy", label: "Hoy" }} />
      <Card>
        <StartPanel options={options} initialTaskId={initial} />
      </Card>
    </section>
  )
}

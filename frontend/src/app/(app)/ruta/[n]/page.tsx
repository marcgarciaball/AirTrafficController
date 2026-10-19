import { notFound } from "next/navigation"
import { Annunciator } from "@/components/cockpit/annunciator"
import { Gauge } from "@/components/cockpit/gauge"
import { Memo } from "@/components/cockpit/memo"
import { PageTitle, Prose } from "@/components/cockpit/page-title"
import { Panel } from "@/components/cockpit/panel"
import { TaskItem } from "@/components/roadmap/task-item"
import { loadRoadmap } from "@/lib/roadmap/load"

export default async function Page({ params }: { params: Promise<{ n: string }> }) {
  const { n } = await params
  const num = Number(n)
  if (!Number.isInteger(num)) notFound()
  const { roadmap, sources, links } = await loadRoadmap()
  const phase = roadmap.phases.find((p) => p.number === num)
  if (!phase) notFound()
  const roots = phase.tasks.filter((t) => !t.parent_id)
  const nextId = roadmap.next[0]?.id ?? null
  const locked = phase.status === "bloqueada"
  const done = phase.tasks.filter((t) => t.status === "hecha").length
  return (
    <section className="space-y-6">
      <PageTitle code={`Fase F${phase.number}`} title={phase.title} back={{ href: "/ruta", label: "Ruta" }}>
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {phase.number === roadmap.currentPhase ? <Annunciator tone="magenta">Actual</Annunciator> : null}
          {phase.status === "hecha" ? <Annunciator tone="green">Hecha</Annunciator> : null}
          {locked ? <Annunciator tone="red">Bloqueada</Annunciator> : null}
          {phase.est_weeks_min != null && phase.est_weeks_max != null ? (
            <>
              <Annunciator tone="amber">Estimación</Annunciator>
              <span className="font-mono text-sm text-muted-foreground tabular-nums">
                {phase.est_weeks_min}–{phase.est_weeks_max} SEM
              </span>
            </>
          ) : null}
        </div>
      </PageTitle>

      <div className="flex flex-col gap-4 border-y border-line py-4 sm:flex-row sm:items-start sm:gap-6">
        <Gauge value={phase.pct} label={`F${phase.number}`} tone="green" className="shrink-0" />
        <div className="space-y-3">
          <Prose>{phase.summary}</Prose>
          {locked ? (
            <p className="text-sm text-amber">
              Hasta completar: {phase.unlock_after.map((u) => `F${u}`).join(", ")}.
            </p>
          ) : null}
        </div>
      </div>

      <Panel title="Tareas" aside={`${done}/${phase.tasks.length}`} flush>
        {roots.length === 0 ? (
          <p className="px-3 py-2.5 text-sm text-muted-foreground sm:px-4">Esta fase aún no tiene tareas.</p>
        ) : (
          <Memo>
            {roots.map((t) => (
              <TaskItem key={t.id} task={t} sources={sources} links={links} nextId={nextId} />
            ))}
          </Memo>
        )}
      </Panel>
    </section>
  )
}

import { notFound } from "next/navigation"
import { StatusChip } from "@/components/ui-torre/status-chip"
import { ProgressBar } from "@/components/ui-torre/progress-bar"
import { Checklist } from "@/components/ui-torre/checklist"
import { PageHeader, Prose } from "@/components/ui-torre/page-header"
import { Section } from "@/components/ui-torre/section"
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
    <div className="space-y-10">
      <PageHeader title={phase.title} back={{ href: "/ruta", label: "Ruta" }}>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-muted-foreground">Fase {phase.number}</span>
          {phase.number === roadmap.currentPhase ? <StatusChip tone="guide">fase actual</StatusChip> : null}
          {phase.status === "hecha" ? <StatusChip tone="success">hecha</StatusChip> : null}
          {locked ? <StatusChip tone="danger">bloqueada</StatusChip> : null}
          {phase.est_weeks_min != null && phase.est_weeks_max != null ? (
            <StatusChip tone="warning">
              estimación: {phase.est_weeks_min}–{phase.est_weeks_max} semanas
            </StatusChip>
          ) : null}
        </div>
      </PageHeader>

      <div className="space-y-6">
        <Prose>{phase.summary}</Prose>
        <div className="flex max-w-prose items-center gap-4">
          <ProgressBar value={phase.pct} label={`Progreso de la fase ${phase.number}`} tone={phase.number === roadmap.currentPhase ? "guide" : "success"} className="flex-1" />
          <span className="shrink-0 text-muted-foreground">{phase.pct} % hecho</span>
        </div>
        {locked ? (
          <p className="text-warning">
            Se desbloquea al completar {phase.unlock_after.length === 1 ? "la fase" : "las fases"} {phase.unlock_after.join(", ")}.
          </p>
        ) : null}
      </div>

      <Section title="Tareas" aside={`${done} de ${phase.tasks.length} hechas`} flush>
        {roots.length === 0 ? (
          <p className="px-5 py-4 text-muted-foreground sm:px-6">Esta fase aún no tiene tareas.</p>
        ) : (
          <Checklist>
            {roots.map((t) => (
              <TaskItem key={t.id} task={t} sources={sources} links={links} nextId={nextId} />
            ))}
          </Checklist>
        )}
      </Section>
    </div>
  )
}

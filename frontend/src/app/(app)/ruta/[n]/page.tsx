import Link from "next/link"
import { notFound } from "next/navigation"
import { PageHeader } from "@/components/atc/page-header"
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
  const weeks =
    phase.est_weeks_min != null && phase.est_weeks_max != null
      ? `estimación: ${phase.est_weeks_min}–${phase.est_weeks_max} semanas`
      : null
  return (
    <section className="space-y-6">
      <Link
        href="/ruta"
        className="inline-block rounded-sm font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground underline underline-offset-2 outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        ← Ruta
      </Link>
      <PageHeader label={`Fase ${phase.number} · ${phase.pct}%`} title={phase.title} />
      <p className="text-[15px] leading-relaxed text-muted-foreground">{phase.summary}</p>
      {weeks ? <p className="font-mono text-xs text-muted-foreground">{weeks}</p> : null}
      {phase.status === "bloqueada" ? (
        <p className="text-sm text-muted-foreground">
          Fase bloqueada hasta completar: {phase.unlock_after.map((u) => `Fase ${u}`).join(", ")}.
        </p>
      ) : null}
      {roots.length === 0 ? (
        <p className="text-sm text-muted-foreground">Esta fase aún no tiene tareas.</p>
      ) : (
        <ul className="space-y-2">
          {roots.map((t) => (
            <TaskItem key={t.id} task={t} sources={sources} links={links} />
          ))}
        </ul>
      )}
    </section>
  )
}

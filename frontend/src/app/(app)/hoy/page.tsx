import Link from "next/link"
import { FlightStrip } from "@/components/atc/flight-strip"
import { PageHeader } from "@/components/atc/page-header"
import { SectionLabel } from "@/components/atc/section-label"
import { loadRoadmap } from "@/lib/roadmap/load"

export default async function Page() {
  const { roadmap } = await loadRoadmap()
  const phaseOf = new Map(roadmap.phases.map((p) => [p.id, p]))
  return (
    <section className="space-y-6">
      <PageHeader label="01 · Hoy" title="Hoy" />
      <div className="space-y-3">
        <SectionLabel as="h2">Siguiente</SectionLabel>
        {roadmap.next.length === 0 ? (
          <p className="text-sm text-muted-foreground">No hay tareas pendientes disponibles.</p>
        ) : (
          <ul className="space-y-3">
            {roadmap.next.map((t) => {
              const ph = phaseOf.get(t.phase_id)
              return (
                <li key={t.id}>
                  <FlightStrip
                    kind="neutral"
                    title={t.title}
                    meta={t.status === "en_curso" ? "En curso" : undefined}
                  >
                    {ph ? (
                      <Link
                        href={`/ruta/${ph.number}`}
                        className="rounded-sm font-mono text-xs underline underline-offset-2 outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                      >
                        Fase {ph.number} · {ph.title}
                      </Link>
                    ) : null}
                  </FlightStrip>
                </li>
              )
            })}
          </ul>
        )}
      </div>
      <p className="text-sm text-muted-foreground">El plan diario con tiempos llega en el incremento 3.</p>
    </section>
  )
}

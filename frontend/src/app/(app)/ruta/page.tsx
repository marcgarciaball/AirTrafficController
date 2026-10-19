import { Gauge } from "@/components/cockpit/gauge"
import { PageTitle } from "@/components/cockpit/page-title"
import { Panel } from "@/components/cockpit/panel"
import { FlightPlan } from "@/components/roadmap/flight-plan"
import { loadRoadmap } from "@/lib/roadmap/load"

export default async function Page() {
  const { roadmap } = await loadRoadmap()
  const done = roadmap.phases.filter((p) => p.status === "hecha").length
  return (
    <section className="space-y-6">
      <PageTitle code="RUTA · F0–F8" title="Ruta" />
      <div className="flex items-end gap-6 border-y border-line py-4">
        <Gauge value={roadmap.globalPct} label="Global" tone="green" />
        <dl className="grid flex-1 grid-cols-[1fr_auto] gap-x-4 gap-y-1 text-sm">
          <dt className="uppercase tracking-wide text-muted-foreground">Fases hechas</dt>
          <dd className="text-right font-mono text-green tabular-nums">{done}/{roadmap.phases.length}</dd>
          <dt className="uppercase tracking-wide text-muted-foreground">Fase actual</dt>
          <dd className="text-right font-mono text-magenta tabular-nums">{roadmap.currentPhase != null ? `F${roadmap.currentPhase}` : "—"}</dd>
        </dl>
      </div>
      <Panel title="Plan de vuelo" flush>
        <FlightPlan phases={roadmap.phases} currentPhase={roadmap.currentPhase} />
      </Panel>
    </section>
  )
}

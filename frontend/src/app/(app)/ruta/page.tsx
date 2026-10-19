import { FlightPlan } from "@/components/roadmap/flight-plan"
import { PageHeader } from "@/components/ui-torre/page-header"
import { ProgressBar } from "@/components/ui-torre/progress-bar"
import { Card } from "@/components/ui-torre/section"
import { loadRoadmap } from "@/lib/roadmap/load"

export default async function Page() {
  const { roadmap } = await loadRoadmap()
  const done = roadmap.phases.filter((p) => p.status === "hecha").length
  const current = roadmap.phases.find((p) => p.number === roadmap.currentPhase)
  return (
    <div className="space-y-10">
      <PageHeader title="Ruta" description="Todas las fases, de los requisitos al curso de formación. Pulsa una fase para ver sus tareas." />
      <Card className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
          <p className="text-3xl font-bold">
            {roadmap.globalPct}
            <span className="ml-1 text-base font-normal text-muted-foreground">% de la ruta completada</span>
          </p>
          <p className="text-muted-foreground">
            {done} de {roadmap.phases.length} fases hechas
          </p>
        </div>
        <ProgressBar value={roadmap.globalPct} label="Avance global" tone="success" />
        {current ? (
          <p className="text-muted-foreground">
            Ahora estás en la <span className="font-bold text-guide">fase {current.number}: {current.title}</span>.
          </p>
        ) : null}
      </Card>
      <section aria-labelledby="fases" className="space-y-3">
        <h2 id="fases" className="text-xl font-bold">Fases</h2>
        <Card flush>
          <FlightPlan phases={roadmap.phases} currentPhase={roadmap.currentPhase} />
        </Card>
      </section>
    </div>
  )
}

import { PageHeader } from "@/components/atc/page-header"
import { SectionLabel } from "@/components/atc/section-label"
import { PhaseStrip } from "@/components/roadmap/phase-strip"
import { loadRoadmap } from "@/lib/roadmap/load"

export default async function Page() {
  const { roadmap } = await loadRoadmap()
  const solo = roadmap.phases.filter((p) => ![2, 3, 4].includes(p.number))
  const parallel = roadmap.phases.filter((p) => [2, 3, 4].includes(p.number))
  const before = solo.filter((p) => p.number < 2)
  const after = solo.filter((p) => p.number > 4)
  const strip = (p: (typeof roadmap.phases)[number]) => (
    <li key={p.id}>
      <PhaseStrip phase={p} current={p.number === roadmap.currentPhase} />
    </li>
  )
  return (
    <section className="space-y-6">
      <PageHeader label="02 · Ruta" title="Ruta" />
      <div className="space-y-2">
        <div className="flex items-baseline justify-between">
          <SectionLabel>Progreso global</SectionLabel>
          <span className="font-mono text-lg tabular-nums">{roadmap.globalPct}%</span>
        </div>
        <div
          role="progressbar"
          aria-label="Progreso global"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={roadmap.globalPct}
          className="h-2 w-full overflow-hidden rounded-sm bg-border"
        >
          <div className="h-full bg-primary" style={{ width: `${roadmap.globalPct}%` }} />
        </div>
      </div>
      <ol className="space-y-3">
        {before.map(strip)}
        {parallel.length > 0 ? (
          <li>
            <div className="space-y-2 border-l-2 border-dashed border-primary/50 pl-3">
              <SectionLabel>En paralelo</SectionLabel>
              <ol className="space-y-3">{parallel.map(strip)}</ol>
            </div>
          </li>
        ) : null}
        {after.map(strip)}
      </ol>
    </section>
  )
}

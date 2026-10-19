import { FmaBar } from "@/components/cockpit/fma-bar"
import { Memo, MemoItem } from "@/components/cockpit/memo"
import { Panel } from "@/components/cockpit/panel"
import { Annunciator } from "@/components/cockpit/annunciator"
import { loadRoadmap } from "@/lib/roadmap/load"
import { createClient } from "@/lib/supabase/server"

export default async function Page() {
  const supabase = await createClient()
  const [{ roadmap }, { data: auth }] = await Promise.all([loadRoadmap(), supabase.auth.getUser()])
  const { data: profile } = auth.user
    ? await supabase.from("profiles").select("target_date").eq("id", auth.user.id).maybeSingle()
    : { data: null }
  const phaseOf = new Map(roadmap.phases.map((p) => [p.id, p]))
  const current = roadmap.phases.find((p) => p.number === roadmap.currentPhase) ?? null
  return (
    <section className="space-y-6">
      <h1 className="sr-only">Hoy</h1>
      <div className="-mx-4 md:mx-0 md:border-x md:border-line">
        <FmaBar
          todayMinutes={null}
          phase={current}
          next={roadmap.next[0]?.title ?? null}
          target={profile?.target_date ?? null}
        />
      </div>

      <Panel title="Siguiente" aside={roadmap.next.length > 0 ? `${roadmap.next.length}` : undefined} flush>
        {roadmap.next.length === 0 ? (
          <p className="px-3 py-2.5 text-sm text-muted-foreground sm:px-4">No hay tareas pendientes disponibles.</p>
        ) : (
          <Memo>
            {roadmap.next.map((t, i) => {
              const ph = phaseOf.get(t.phase_id)
              return (
                <MemoItem
                  key={t.id}
                  state={i === 0 ? "siguiente" : "disponible"}
                  href={ph ? `/ruta/${ph.number}` : undefined}
                  detail={ph ? `F${ph.number} · ${ph.title}` : undefined}
                  meta={t.status === "en_curso" ? <Annunciator tone="green">En curso</Annunciator> : undefined}
                >
                  {t.title}
                </MemoItem>
              )
            })}
          </Memo>
        )}
      </Panel>

      <Panel title="Referencia" flush>
        <Memo>
          <MemoItem state="disponible" href="/guia" detail="Requisitos, proceso, calendario y todo lo necesario para empezar desde cero.">
            Guía del proceso
          </MemoItem>
        </Memo>
      </Panel>

      <p className="text-sm text-muted-foreground">El plan diario con tiempos llega en el incremento 3.</p>
    </section>
  )
}

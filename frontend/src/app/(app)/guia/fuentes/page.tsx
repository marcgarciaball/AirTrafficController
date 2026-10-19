import { Annunciator } from "@/components/cockpit/annunciator"
import { Panel } from "@/components/cockpit/panel"
import { GuiaPage } from "@/components/guia/guia-ui"
import { SourceLink } from "@/components/source-link"
import { loadGuia } from "@/lib/guia"

export default async function Page() {
  const g = await loadGuia()
  const lista = Object.values(g.sources)
    .filter((s) => s.level === "A")
    .sort((a, b) => a.title.localeCompare(b.title, "es"))
  return (
    <GuiaPage label="Guía · 08" title="Fuentes" intro="Fuentes oficiales (nivel A) en las que se apoya la app. Abre siempre la fuente si vas a tomar una decisión.">
      {lista.length === 0 ? (
        <p className="text-sm text-muted-foreground">No hay fuentes disponibles.</p>
      ) : (
        <Panel title="Nivel A" aside={`${lista.length}`} flush>
          <ul className="divide-y divide-line">
            {lista.map((s) => (
              <li key={s.url} className="space-y-1 px-3 py-2.5 sm:px-4">
                <p className="flex items-start justify-between gap-3">
                  <span className="text-foreground">{s.title}</span>
                  <Annunciator tone="green">Nivel A</Annunciator>
                </p>
                <p className="text-sm text-muted-foreground">{s.publisher}</p>
                <SourceLink source={s} />
              </li>
            ))}
          </ul>
        </Panel>
      )}
    </GuiaPage>
  )
}

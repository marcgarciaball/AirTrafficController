import { StatusChip } from "@/components/ui-torre/status-chip"
import { Section } from "@/components/ui-torre/section"
import { GuiaPage } from "@/components/guia/guia-ui"
import { SourceLink } from "@/components/source-link"
import { loadGuia } from "@/lib/guia"

export default async function Page() {
  const g = await loadGuia()
  const lista = Object.values(g.sources)
    .filter((s) => s.level === "A")
    .sort((a, b) => a.title.localeCompare(b.title, "es"))
  return (
    <GuiaPage label="Capítulo 8" title="Fuentes" intro="Fuentes oficiales (nivel A) en las que se apoya la app. Abre siempre la fuente si vas a tomar una decisión.">
      {lista.length === 0 ? (
        <p className="text-muted-foreground">No hay fuentes disponibles.</p>
      ) : (
        <Section title="Nivel A" aside={`${lista.length} fuentes`} flush>
          <ul className="divide-y divide-line">
            {lista.map((s) => (
              <li key={s.url} className="space-y-1.5 px-5 py-4 sm:px-6">
                <p className="flex items-start justify-between gap-3">
                  <span className="font-bold text-foreground">{s.title}</span>
                  <StatusChip tone="success">nivel A</StatusChip>
                </p>
                <p className="text-sm text-muted-foreground">{s.publisher}</p>
                <SourceLink source={s} />
              </li>
            ))}
          </ul>
        </Section>
      )}
    </GuiaPage>
  )
}

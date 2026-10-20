import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { CHECKLIST_ROW, ROW_HOVER } from "@/components/ui-torre/checklist"
import { StatusChip } from "@/components/ui-torre/status-chip"
import { cn } from "@/lib/utils"
import { Prose } from "@/components/ui-torre/page-header"
import { Section } from "@/components/ui-torre/section"
import { Bloque, Cita, Consejo, GuiaPage, NoConsta, Tabla } from "@/components/guia/guia-ui"
import { loadGuia } from "@/lib/guia"
import { PRUEBAS, anexo4, bases, res } from "@/lib/guia-examen"

/** Máximos de la base 8 para las pruebas puntuables de la base 9. Conocimientos: hipótesis de 50 (no consta). */
const PESOS: [string, number][] = [
  ["F1 A · Conocimientos generales", 50],
  ["F1 B · Inglés escrito", 20],
  ["F1 C · Aptitudes", 50],
  ["F2 · FEAST y PDEA", 100],
  ["F3 A · Inglés oral", 50],
  ["F3 B · Evaluación conductual", 120],
]
const TOTAL = PESOS.reduce((a, [, m]) => a + m, 0)
const CORTE = PESOS.slice(0, 4).reduce((a, [, m]) => a + m, 0)
const pct = (m: number, t: number) => ((m / t) * 100).toFixed(1).replace(".", ",")

export default async function Page() {
  const g = await loadGuia()
  const { P9, P11, P12, P14 } = bases
  return (
    <GuiaPage
      label="Capítulo 0"
      title="El examen por dentro"
      intro="Cuánto pesa cada prueba, qué nota mínima pide y qué te deja fuera. Al final, qué significa todo esto para tu estudio."
    >
      <Bloque title="Cuánto pesa cada prueba">
        <Prose>
          El ranking final suma seis pruebas. Las otras dos (personalidad y clínica) son solo apto o no apto: no suman, pero te pueden dejar fuera.
        </Prose>
        <StatusChip tone="muted">cálculo propio a partir de las bases</StatusChip>
        <Tabla
          caption="Peso de cada prueba sobre el total"
          head={["Prueba", "Máximo", "% ranking final", "% corte F1+F2"]}
          rows={[
            ...PESOS.map(([n, m], i) => [n + (i === 0 ? " (*)" : ""), String(m), pct(m, TOTAL), i < 4 ? pct(m, CORTE) : "—"]),
            ["Total", String(TOTAL), "100", "100"],
          ]}
          source={res(g, P14)}
        />
        <div className="space-y-2">
          <Prose>
            (*) Las bases no dicen cuántos puntos vale como máximo la prueba de conocimientos. Solo dicen que tiene 50 preguntas y que hay que sacar 25. Para el cálculo suponemos 50 puntos, uno por pregunta.
          </Prose>
          <NoConsta label="Máximo de conocimientos: no consta en las bases" source={res(g, P9)} />
        </div>
        <Prose className="text-muted-foreground">
          Cómo se calcula: máximo de cada prueba dividido entre la suma de máximos ({TOTAL} puntos para el ranking final, {CORTE} para el corte de la Fase 3). Redondeado a un decimal.
        </Prose>
      </Bloque>

      <Bloque title="Qué nota mínima pide cada prueba">
        <Prose>Todas son eliminatorias. Si no llegas al mínimo en una sola, quedas fuera, aunque vayas muy bien en las demás.</Prose>
        <Tabla
          caption="Mínimos y si suma al ranking"
          head={["Prueba", "Mínimo", "¿Suma?"]}
          rows={[
            ["F1 A · Conocimientos", "25 puntos", "Sí"],
            ["F1 B · Inglés escrito", "10 de 20", "Sí"],
            ["F1 C · Aptitudes", "25 de 50", "Sí"],
            ["F1 D · Personalidad", "Apto", "No"],
            ["F2 · FEAST y PDEA", "50 de 100 y cada test", "Sí"],
            ["F3 A · Inglés oral", "25 de 50", "Sí"],
            ["F3 B · Conductual", "60 de 120 y la mitad en cada competencia", "Sí"],
            ["F3 C · Clínica", "Apto", "No"],
          ]}
          source={res(g, { r: "bases", loc: "base 8, págs. 9 a 14, y base 9" })}
        />
        <Cita source={res(g, P11)}>
          En la Fase 2 no basta con sumar 50: hay que superar además cada uno de los test de FEAST y de PDEA con su mínimo. Ese mínimo de cada test no consta en las bases.
        </Cita>
        <Cita source={res(g, anexo4)}>
          En la evaluación conductual hay que sacar al menos el 50 % en cada una de las siete competencias, además de 60 en total.
        </Cita>
        <Cita source={res(g, P9)}>
          También te excluye no presentarte el día y la hora de tu convocatoria, o hacerlo sin un documento de identidad válido.
        </Cita>
      </Bloque>

      <Bloque title="El corte del puesto 596">
        <Cita source={res(g, P12)}>
          Tras la Fase 2 se hace un ranking con quienes han aprobado las Fases 1 y 2. Suma conocimientos, inglés escrito, aptitudes y pruebas digitales. Solo pasan a la Fase 3 quienes tienen una nota igual o superior a la de la persona número 596 de ese ranking.
        </Cita>
        <Prose>
          Ejemplo: si la persona 596 tiene 150 puntos, pasa todo el que tenga 150 o más. Con 149,9 te quedas fuera aunque hayas aprobado todas las pruebas.
        </Prose>
        <div className="space-y-2">
          <p className="font-bold text-foreground">Nota de corte de la convocatoria 2025</p>
          <NoConsta label="No consta en las fuentes de Torre" source={res(g, { r: "portal" })} />
        </div>
        <Cita source={res(g, { r: "boe" })}>La convocatoria de 2025 ofrecía 149 puestos.</Cita>
        <Consejo>
          <p>
            El corte deja pasar a la Fase 3 a unas cuatro personas por plaza. Por eso no basta con aprobar la Fase 1 y la 2: hay que quedar entre los primeros 596.
          </p>
        </Consejo>
      </Bloque>

      <Bloque title="Si hay empate en el ranking final">
        <Cita source={res(g, P14)}>
          <ol className="list-decimal space-y-2 pl-6">
            <li>Más puntos en la evaluación conductual.</li>
            <li>Más puntos en las pruebas digitales.</li>
            <li>Más puntos en el inglés oral.</li>
            <li>Más puntos sumando las pruebas de la Fase 1.</li>
          </ol>
        </Cita>
      </Bloque>

      <Bloque title="Qué significa esto para tu estudio">
        <Consejo>
          <ul className="list-disc space-y-3 pl-6">
            <li>
              <strong className="font-bold">El peso está al final.</strong> Con la hipótesis de 50 puntos en Conocimientos (su máximo no consta en las bases), la evaluación conductual ({pct(120, TOTAL)} %) y las pruebas digitales ({pct(100, TOTAL)} %) suman más de la mitad del ranking final, y el temario sería solo una parte ({pct(50, TOTAL)} %).
            </li>
            <li>
              <strong className="font-bold">Para llegar a la Fase 3, manda la Fase 2.</strong> En el corte del puesto 596, FEAST y PDEA suman el {pct(100, CORTE)} % con la misma hipótesis de 50 puntos en Conocimientos.
            </li>
            <li>
              <strong className="font-bold">No basta con el temario.</strong> Aptitudes, FEAST y la entrevista se entrenan con práctica regular, no estudiando. Empieza desde el primer día, en paralelo al temario.
            </li>
            <li>
              <strong className="font-bold">Dos pruebas son solo apto o no apto:</strong> personalidad y clínica. No suben tu nota. Ve descansado y sé sincero.
            </li>
            <li>
              <strong className="font-bold">El inglés aparece tres veces:</strong> test escrito, test de inglés de FEAST I y entrevista oral. Pesa poco por separado, pero suspender una vez te saca del proceso.
            </li>
            <li>
              <strong className="font-bold">Los mínimos son trampas.</strong> Cada prueba y cada competencia tiene el suyo. Un punto débil te elimina aunque la media sea buena.
            </li>
          </ul>
        </Consejo>
      </Bloque>

      <Section title="Las pruebas, una a una" aside={`${PRUEBAS.length} pruebas`} flush>
        <ul className="divide-y divide-line">
          {PRUEBAS.map((p) => (
            <li key={p.slug}>
              <Link href={`/guia/examen/${p.slug}`} className={cn(CHECKLIST_ROW, ROW_HOVER)}>
                <span className="min-w-0 flex-1 space-y-1">
                  <span className="block text-sm text-muted-foreground">{p.code}</span>
                  <span className="block leading-snug font-bold text-foreground">{p.title}</span>
                  <span className="block text-sm text-muted-foreground">{p.short}</span>
                </span>
                <ChevronRight aria-hidden="true" className="size-5 shrink-0 self-center text-muted-foreground" />
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </GuiaPage>
  )
}

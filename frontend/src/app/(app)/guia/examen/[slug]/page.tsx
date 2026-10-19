import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react"
import { CHECKLIST_ROW, ROW_HOVER } from "@/components/ui-torre/checklist"
import { Prose } from "@/components/ui-torre/page-header"
import { Bloque, Cita, Consejo, GuiaPage, NoConsta, Tabla } from "@/components/guia/guia-ui"
import { SourceLink } from "@/components/source-link"
import { loadGuia } from "@/lib/guia"
import { cn } from "@/lib/utils"
import { COMPETENCIAS, PRUEBAS, anexo4, res, type Enlace } from "@/lib/guia-examen"

export function generateStaticParams() {
  return PRUEBAS.map((p) => ({ slug: p.slug }))
}

function Lista({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-2 pl-6">
      {items.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  )
}

function Enlaces({ items }: { items: Enlace[] }) {
  return (
    <ul className="divide-y divide-line overflow-hidden rounded-lg border bg-card shadow-sm">
      {items.map((e) => {
        const body = (
          <>
            <span className="min-w-0 flex-1 space-y-1">
              <span className="block leading-snug font-bold text-primary">{e.label}</span>
              <span className="block text-sm text-muted-foreground">{e.desc}</span>
            </span>
            {e.ext ? (
              <ArrowUpRight aria-hidden="true" className="size-5 shrink-0 self-center text-muted-foreground" />
            ) : (
              <ChevronRight aria-hidden="true" className="size-5 shrink-0 self-center text-muted-foreground" />
            )}
          </>
        )
        const cls = cn(CHECKLIST_ROW, ROW_HOVER)
        return (
          <li key={e.href}>
            {e.ext ? (
              <a href={e.href} target="_blank" rel="noopener noreferrer" className={cls}>
                {body}
              </a>
            ) : (
              <Link href={e.href} className={cls}>
                {body}
              </Link>
            )}
          </li>
        )
      })}
    </ul>
  )
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const i = PRUEBAS.findIndex((x) => x.slug === slug)
  if (i < 0) notFound()
  const p = PRUEBAS[i]
  const next = PRUEBAS[i + 1]
  const prev = i > 0 ? PRUEBAS[i - 1] : undefined
  const g = await loadGuia()

  return (
    <GuiaPage label={p.code} title={p.title} intro={p.short} back={{ href: "/guia/examen", label: "El examen por dentro" }}>
      <Bloque title="Qué es y qué mide">
        {p.que.map((t) => (
          <Cita key={t.text} source={res(g, t.c)}>
            {t.text}
          </Cita>
        ))}
      </Bloque>

      <Bloque title="Formato">
        <dl className="divide-y divide-line rounded-lg border bg-card px-5 shadow-sm sm:px-6">
          {p.formato.map((f) => (
            <div key={f.label} className="space-y-2 py-5">
              <dt className="font-bold text-foreground">{f.label}</dt>
              <dd className="space-y-2">
                {f.value === null ? (
                  <NoConsta label={f.falta} source={res(g, f.c)} />
                ) : (
                  <>
                    <Prose>{f.value}</Prose>
                    <SourceLink source={res(g, f.c)} />
                  </>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </Bloque>

      <Bloque title="Por qué se hace">
        {p.porque.length > 0 ? (
          p.porque.map((t) => (
            <Cita key={t.text} source={res(g, t.c)}>
              {t.text}
            </Cita>
          ))
        ) : (
          <NoConsta label="La convocatoria no lo explica" />
        )}
        {p.porqueConsejo.length > 0 ? (
          <Consejo>
            {p.porqueConsejo.map((t) => (
              <p key={t}>{t}</p>
            ))}
          </Consejo>
        ) : null}
      </Bloque>

      {p.slug === "conductual" ? (
        <Bloque title="Las siete competencias">
          <Prose>Cada competencia tiene su propio máximo. Necesitas al menos la mitad en cada una: si fallas en una sola, no superas la prueba.</Prose>
          <Tabla
            caption="Competencias de la evaluación conductual"
            head={["Competencia", "Máximo", "Mínimo (50 %)"]}
            rows={[
              ...COMPETENCIAS.map(([n, m]) => [n, String(m), String(m / 2).replace(".", ",")]),
              ["Total", "120", "60"],
            ]}
            source={res(g, anexo4)}
          />
          <div className="space-y-2">
            <p className="font-bold text-foreground">Definición de cada competencia</p>
            <NoConsta label="No consta en el Anexo IV" source={res(g, anexo4)} />
          </div>
        </Bloque>
      ) : null}

      <Bloque title="Qué hay que saber o entrenar">
        {p.saberOficial.map((t) => (
          <Cita key={t.text} source={res(g, t.c)}>
            {t.text}
          </Cita>
        ))}
        {p.saber.length > 0 ? (
          <Consejo>
            <Lista items={p.saber} />
          </Consejo>
        ) : null}
        {p.slug === "conductual" ? (
          <Consejo>
            <p>
              Prepara ejemplos reales de tu vida con el <strong className="font-bold">método STAR</strong>. Cada ejemplo tiene cuatro partes:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li><strong className="font-bold">S · Situación.</strong> Dónde y cuándo. Una o dos frases.</li>
              <li><strong className="font-bold">T · Tarea.</strong> Qué tenías que conseguir tú.</li>
              <li><strong className="font-bold">A · Acción.</strong> Qué hiciste tú, paso a paso. Es la parte más larga.</li>
              <li><strong className="font-bold">R · Resultado.</strong> Qué pasó, con datos si puedes, y qué aprendiste.</li>
            </ul>
            <p>
              Ejemplo para <em>gestión del estrés</em>: &laquo;En mi trabajo de verano en un hotel (S), una noche falló el sistema de reservas con 40 llegadas (T). Repartí las llegadas en papel por orden de hora y avisé a cada cliente del retraso (A). Todos tuvieron habitación en menos de una hora y desde entonces dejamos una lista en papel cada noche (R).&raquo;
            </p>
            <p>Prepara al menos dos ejemplos distintos por competencia, de ámbitos distintos: estudios, trabajo, deporte, voluntariado. Escríbelos, cuéntalos en voz alta y cronométrate: unos dos minutos cada uno.</p>
          </Consejo>
        ) : null}
      </Bloque>

      <Bloque title="Cómo prepararla en la app">
        {p.appNota ? <Prose className="text-muted-foreground">{p.appNota}</Prose> : null}
        <Enlaces items={p.app} />
      </Bloque>

      <Bloque title="Errores frecuentes y estrategia">
        <Consejo>
          <Lista items={p.errores} />
        </Consejo>
      </Bloque>

      <nav aria-label="Pruebas" className="grid max-w-prose gap-3 border-t pt-8 sm:grid-cols-2">
        {prev ? (
          <Link href={`/guia/examen/${prev.slug}`} className="rounded-lg border p-4 transition-colors hover:border-primary/50 hover:bg-card">
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <ChevronLeft aria-hidden="true" className="size-4" /> Anterior
            </span>
            <span className="mt-1 block leading-snug font-bold text-primary">{prev.title}</span>
          </Link>
        ) : (
          <Link href="/guia/examen" className="rounded-lg border p-4 transition-colors hover:border-primary/50 hover:bg-card">
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <ChevronLeft aria-hidden="true" className="size-4" /> Volver
            </span>
            <span className="mt-1 block leading-snug font-bold text-primary">El examen por dentro</span>
          </Link>
        )}
        {next ? (
          <Link href={`/guia/examen/${next.slug}`} className="rounded-lg border p-4 text-right transition-colors hover:border-primary/50 hover:bg-card">
            <span className="flex items-center justify-end gap-1 text-sm text-muted-foreground">
              Siguiente <ChevronRight aria-hidden="true" className="size-4" />
            </span>
            <span className="mt-1 block leading-snug font-bold text-primary">{next.title}</span>
          </Link>
        ) : null}
      </nav>
    </GuiaPage>
  )
}

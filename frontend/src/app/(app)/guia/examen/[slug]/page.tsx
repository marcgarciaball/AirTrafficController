import Link from "next/link"
import { notFound } from "next/navigation"
import { Prose } from "@/components/cockpit/page-title"
import { Bloque, Cita, Consejo, GuiaPage, NoConsta, Tabla } from "@/components/guia/guia-ui"
import { SourceLink } from "@/components/source-link"
import { loadGuia } from "@/lib/guia"
import { COMPETENCIAS, PRUEBAS, anexo4, res, type Enlace } from "@/lib/guia-examen"

export function generateStaticParams() {
  return PRUEBAS.map((p) => ({ slug: p.slug }))
}

function Lista({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-1.5 pl-5">
      {items.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  )
}

function Enlaces({ items }: { items: Enlace[] }) {
  return (
    <ul className="divide-y divide-line">
      {items.map((e) => {
        const body = (
          <>
            <span className="min-w-0 flex-1">
              <span className="block text-sm uppercase tracking-wide text-cyan">{e.label}</span>
              <span className="block text-sm text-muted-foreground">{e.desc}</span>
            </span>
            <span aria-hidden="true" className="shrink-0 self-center font-mono text-cyan">{e.ext ? "↗" : "›"}</span>
          </>
        )
        const cls = "flex items-start gap-3 py-2.5 hover:bg-surface"
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
  const g = await loadGuia()

  return (
    <GuiaPage label={`Guía · examen · ${p.code}`} title={p.title} intro={p.short}>
      <Bloque title="Qué es y qué mide">
        {p.que.map((t) => (
          <Cita key={t.text} source={res(g, t.c)}>
            {t.text}
          </Cita>
        ))}
      </Bloque>

      <Bloque title="Formato">
        <dl className="divide-y divide-line">
          {p.formato.map((f) => (
            <div key={f.label} className="space-y-1.5 py-3 first:pt-0 last:pb-0">
              <dt className="text-xs uppercase tracking-wide text-foreground">{f.label}</dt>
              <dd className="space-y-1.5">
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
          <div className="space-y-1.5">
            <p className="text-xs uppercase tracking-wide text-foreground">Definición de cada competencia</p>
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
              Prepara ejemplos reales de tu vida con el <strong className="font-normal text-cyan">método STAR</strong>. Cada ejemplo tiene cuatro partes:
            </p>
            <ul className="list-disc space-y-1.5 pl-5">
              <li><strong className="font-normal text-cyan">S · Situación.</strong> Dónde y cuándo. Una o dos frases.</li>
              <li><strong className="font-normal text-cyan">T · Tarea.</strong> Qué tenías que conseguir tú.</li>
              <li><strong className="font-normal text-cyan">A · Acción.</strong> Qué hiciste tú, paso a paso. Es la parte más larga.</li>
              <li><strong className="font-normal text-cyan">R · Resultado.</strong> Qué pasó, con datos si puedes, y qué aprendiste.</li>
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

      <nav className="flex flex-wrap justify-between gap-3 text-sm uppercase tracking-wide">
        <Link href="/guia/examen" className="text-cyan hover:underline">‹ El examen por dentro</Link>
        {next ? (
          <Link href={`/guia/examen/${next.slug}`} className="text-cyan hover:underline">
            {next.title} ›
          </Link>
        ) : null}
      </nav>
    </GuiaPage>
  )
}

import type { ReactNode } from "react"
import { Annunciator } from "@/components/cockpit/annunciator"
import { PageTitle, Prose } from "@/components/cockpit/page-title"
import { Panel } from "@/components/cockpit/panel"
import { SourceLink } from "@/components/source-link"
import { VerificationBadge } from "@/components/verification-badge"
import { cn } from "@/lib/utils"
import type { Item, Src } from "@/lib/guia"

export function GuiaPage({ label, title, intro, children }: { label: string; title: string; intro?: string; children: ReactNode }) {
  return (
    <section className="space-y-8">
      <PageTitle code={label} title={title} back={{ href: "/guia", label: "Guía" }}>
        {intro ? <Prose className="pt-1">{intro}</Prose> : null}
      </PageTitle>
      {children}
    </section>
  )
}

export function Bloque({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Panel title={title}>
      <div className="space-y-4">{children}</div>
    </Panel>
  )
}

/** Lista de datos: etiqueta fija, valor, estado de verificación y fuente. */
export function Datos({ items }: { items: Item[] }) {
  if (items.length === 0) return <p className="text-sm text-muted-foreground">No hay datos disponibles.</p>
  return (
    <dl className="divide-y divide-line">
      {items.map((it) => {
        const ok = it.verified && it.value !== null
        return (
          <div key={it.label} className="space-y-1.5 py-3 first:pt-0 last:pb-0">
            <dt className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wide text-foreground">
              {it.label}
              <VerificationBadge verified={ok} />
            </dt>
            <dd className="space-y-1.5">
              <Prose className={it.value ? "" : "text-amber"}>{it.value ?? "Pendiente de verificar"}</Prose>
              <SourceLink source={it.source} />
            </dd>
          </div>
        )
      })}
    </dl>
  )
}

const NUMERIC = /^[\d\s.,—–-]+$|^Apto$/

/** Tabla con su fuente. Las columnas numéricas se alinean a la derecha. */
export function Tabla({ caption, head, rows, source, verified = true }: { caption: string; head: string[]; rows: string[][]; source: Src; verified?: boolean }) {
  const right = head.map((_, i) => i > 0 && rows.every((r) => NUMERIC.test(r[i] ?? "")))
  return (
    <div className="space-y-2">
      <div className="overflow-x-auto" tabIndex={0} role="region" aria-label={caption}>
        <table className="w-full min-w-[20rem] text-left text-sm">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr className="border-b border-line">
              {head.map((h, i) => (
                <th key={h} scope="col" className={cn("py-1.5 pr-3 text-xs font-normal uppercase tracking-wide text-muted-foreground last:pr-0", right[i] && "text-right")}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.join("|")} className="border-b border-line last:border-b-0">
                {r.map((c, i) =>
                  i === 0 ? (
                    <th key={i} scope="row" className="py-2 pr-3 align-top font-normal text-foreground">
                      {c}
                    </th>
                  ) : (
                    <td key={i} className={cn("py-2 pr-3 align-top font-mono text-foreground tabular-nums last:pr-0", right[i] && "text-right")}>
                      {c}
                    </td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col items-start gap-1.5">
        <VerificationBadge verified={verified} />
        <SourceLink source={source} />
      </div>
    </div>
  )
}

/** Nota de precaución: anunciador en amber y texto de lectura. */
export function Nota({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <Annunciator tone="amber" className="mt-0.5">Nota</Annunciator>
      <Prose>{children}</Prose>
    </div>
  )
}

/** Texto que no sale de una fuente oficial: interpretación o consejo de Torre. */
export function Consejo({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-2 border-l border-line pl-3">
      <Annunciator tone="white">Consejo propio · no oficial</Annunciator>
      <div className="max-w-[68ch] space-y-2 text-base leading-relaxed text-foreground">{children}</div>
    </div>
  )
}

/** Dato que las fuentes oficiales no recogen: chip amber y la fuente revisada. */
export function NoConsta({ label = "No consta en las bases", source }: { label?: string; source?: Src }) {
  return (
    <span className="inline-flex flex-col items-start gap-1.5">
      <Annunciator tone="amber">{label}</Annunciator>
      {source ? <SourceLink source={source} /> : null}
    </span>
  )
}

/** Párrafo oficial con su fuente debajo. */
export function Cita({ children, source }: { children: ReactNode; source: Src }) {
  return (
    <div className="space-y-1.5">
      <Prose>{children}</Prose>
      <SourceLink source={source} />
    </div>
  )
}

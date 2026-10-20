import type { ReactNode } from "react"
import { StatusChip } from "@/components/ui-torre/status-chip"
import { PageHeader, Prose } from "@/components/ui-torre/page-header"
import { OwnTip } from "@/components/ui-torre/content-labels"
import { Section } from "@/components/ui-torre/section"
import { SourceLink } from "@/components/source-link"
import { VerificationBadge } from "@/components/verification-badge"
import { cn } from "@/lib/utils"
import type { Item, Src } from "@/lib/guia"

export function GuiaPage({ label, title, intro, back = { href: "/guia", label: "Guía del proceso" }, children }: { label: string; title: string; intro?: string; back?: { href: string; label: string }; children: ReactNode }) {
  return (
    <article className="space-y-14">
      <PageHeader title={title} back={back}>
        <p className="text-sm text-muted-foreground">{label}</p>
        {intro ? <Prose className="pt-2 text-muted-foreground">{intro}</Prose> : null}
      </PageHeader>
      {children}
    </article>
  )
}

export function Bloque({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Section title={title} plain>
      <div className="space-y-6">{children}</div>
    </Section>
  )
}

/** Lista de datos: etiqueta fija, valor, estado de verificación y fuente. */
export function Datos({ items }: { items: Item[] }) {
  if (items.length === 0) return <p className="text-muted-foreground">No hay datos disponibles.</p>
  return (
    <dl className="divide-y divide-line rounded-lg border bg-card px-5 shadow-sm sm:px-6">
      {items.map((it) => {
        const ok = it.verified && it.value !== null
        return (
          <div key={it.label} className="space-y-2 py-5">
            <dt className="flex flex-wrap items-center gap-2 font-bold text-foreground">
              {it.label}
              <VerificationBadge verified={ok} />
            </dt>
            <dd className="space-y-2">
              <Prose className={it.value ? "" : "text-warning"}>{it.value ?? "Pendiente de verificar"}</Prose>
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
    <div className="space-y-3">
      <div className="overflow-x-auto rounded-lg border bg-card shadow-sm" tabIndex={0} role="region" aria-label={caption}>
        <table className="w-full min-w-[20rem] text-left">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr className="border-b bg-subtle">
              {head.map((h, i) => (
                <th key={h} scope="col" className={cn("px-4 py-3 text-sm font-bold text-muted-foreground", right[i] && "text-right")}>
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
                    <th key={i} scope="row" className="px-4 py-3 align-top font-normal text-foreground">
                      {c}
                    </th>
                  ) : (
                    <td key={i} className={cn("px-4 py-3 align-top text-foreground", right[i] && "text-right")}>
                      {c}
                    </td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col items-start gap-2">
        <VerificationBadge verified={verified} />
        <SourceLink source={source} />
      </div>
    </div>
  )
}

/** Nota de precaución: filete warning a la izquierda y texto de lectura. */
export function Nota({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-prose space-y-2 border-l-[3px] border-warning pl-5">
      <p className="text-sm font-bold text-warning">Nota</p>
      <Prose>{children}</Prose>
    </div>
  )
}

/** Texto que no sale de una fuente oficial: interpretación o consejo de Torre. */
export function Consejo({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-prose space-y-3 rounded-lg bg-subtle px-5 py-5 sm:px-6">
      <OwnTip />
      <div className="space-y-3 text-lg leading-relaxed text-foreground">{children}</div>
    </div>
  )
}

/** Dato que las fuentes oficiales no recogen: chip amber y la fuente revisada. */
export function NoConsta({ label = "No consta en las bases", source }: { label?: string; source?: Src }) {
  return (
    <span className="inline-flex flex-col items-start gap-1.5">
      <StatusChip tone="warning">{label.charAt(0).toLowerCase() + label.slice(1)}</StatusChip>
      {source ? <SourceLink source={source} /> : null}
    </span>
  )
}

/** Párrafo oficial con su fuente debajo. */
export function Cita({ children, source }: { children: ReactNode; source: Src }) {
  return (
    <div className="space-y-2">
      <Prose>{children}</Prose>
      <SourceLink source={source} />
    </div>
  )
}

export type Nivel = "oficial" | "testimonio" | "verificar"
export type Hecho = {
  nivel: Nivel
  titulo?: string
  texto: string
  /** Un testimonio o dato de academia siempre se marca además como pendiente de verificar. */
  fuente?: Src
}

const NIVEL_CHIP: Record<Nivel, { tone: "success" | "guide" | "warning"; label: string }> = {
  oficial: { tone: "success", label: "oficial" },
  testimonio: { tone: "guide", label: "testimonio" },
  verificar: { tone: "warning", label: "pendiente de verificar" },
}

/** Lista de hechos con etiqueta visible: oficial, testimonio (siempre con aviso de verificar) o pendiente de verificar. */
export function Hechos({ items }: { items: Hecho[] }) {
  return (
    <ul className="divide-y divide-line rounded-lg border bg-card px-5 shadow-sm sm:px-6">
      {items.map((it) => {
        const chip = NIVEL_CHIP[it.nivel]
        return (
          <li key={(it.titulo ?? "") + it.texto} className="space-y-2 py-5">
            <div className="flex flex-wrap items-center gap-2">
              <StatusChip tone={chip.tone}>{chip.label}</StatusChip>
              {it.nivel === "testimonio" ? <StatusChip tone="warning">pendiente de verificar</StatusChip> : null}
              {it.titulo ? <span className="font-bold text-foreground">{it.titulo}</span> : null}
            </div>
            <Prose>{it.texto}</Prose>
            {it.fuente ? <SourceLink source={it.fuente} /> : null}
          </li>
        )
      })}
    </ul>
  )
}

/** Leyenda de las tres etiquetas. */
export function Leyenda() {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
      <span className="flex items-center gap-2"><StatusChip tone="success">oficial</StatusChip> norma o autoridad</span>
      <span className="flex items-center gap-2"><StatusChip tone="guide">testimonio</StatusChip> aspirante o academia</span>
      <span className="flex items-center gap-2"><StatusChip tone="warning">pendiente de verificar</StatusChip> no confirmado</span>
    </div>
  )
}

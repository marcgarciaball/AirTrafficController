import Link from "next/link"
import type { ReactNode } from "react"

/** Cabecera de página: referencia en dim y título en white (sin títulos gigantes). */
export function PageTitle({ code, title, back, children }: { code: string; title: ReactNode; back?: { href: string; label: string }; children?: ReactNode }) {
  return (
    <header className="space-y-2">
      {back ? (
        <Link href={back.href} className="inline-block text-sm uppercase tracking-wide text-cyan hover:underline">
          ‹ {back.label}
        </Link>
      ) : null}
      <p className="font-mono text-xs uppercase tracking-wide text-muted-foreground">{code}</p>
      <h1 className="text-lg leading-snug font-normal text-foreground">{title}</h1>
      {children}
    </header>
  )
}

/** Texto de lectura: 15 px, interlínea relajada y unos 68 caracteres de ancho. */
export function Prose({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`max-w-[68ch] text-base leading-relaxed text-foreground ${className}`}>{children}</div>
}

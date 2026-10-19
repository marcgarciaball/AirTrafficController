import Link from "next/link"
import type { ReactNode } from "react"
import { ChevronLeft } from "lucide-react"
import { cn } from "@/lib/utils"

/** Cabecera de página: enlace de vuelta, título de 28 px y una entradilla opcional. */
export function PageHeader({
  title,
  description,
  back,
  children,
}: {
  title: ReactNode
  description?: ReactNode
  back?: { href: string; label: string }
  children?: ReactNode
}) {
  return (
    <header className="space-y-3">
      {back ? (
        <Link
          href={back.href}
          className="-ml-1.5 inline-flex min-h-11 items-center gap-1 rounded-md px-1.5 text-sm text-primary hover:underline"
        >
          <ChevronLeft aria-hidden="true" className="size-4" />
          {back.label}
        </Link>
      ) : null}
      <h1 className="text-2xl font-bold text-foreground">{title}</h1>
      {description ? <p className="max-w-prose text-base text-muted-foreground">{description}</p> : null}
      {children}
    </header>
  )
}

/** Texto de lectura: 18 px, interlínea relajada y unos 68 caracteres de ancho. */
export function Prose({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("max-w-prose text-lg leading-relaxed text-foreground", className)}>{children}</div>
}

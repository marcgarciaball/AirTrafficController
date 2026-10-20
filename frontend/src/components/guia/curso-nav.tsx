"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { CURSO, LECCIONES } from "@/lib/curso"

/** Anterior y siguiente lección del curso "Empieza aquí". */
export function CursoNav() {
  const pathname = usePathname()
  const i = LECCIONES.findIndex((l) => l.href === pathname)
  if (i < 0) return null
  const prev = LECCIONES[i - 1]
  const next = LECCIONES[i + 1]
  return (
    <nav aria-label="Lecciones" className="space-y-3 border-t pt-8">
      <p className="text-sm text-muted-foreground">
        Lección {i + 1} de {LECCIONES.length} · {CURSO[LECCIONES[i].modulo].title}
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {prev ? (
          <Link href={prev.href} className="flex items-center gap-3 rounded-lg border bg-card p-4 shadow-sm hover:border-primary/50">
            <ChevronLeft aria-hidden="true" className="size-5 shrink-0 text-muted-foreground" />
            <span><span className="block text-sm text-muted-foreground">Anterior</span><span className="font-bold">{prev.title}</span></span>
          </Link>
        ) : <span />}
        {next ? (
          <Link href={next.href} className="flex items-center justify-end gap-3 rounded-lg border bg-card p-4 text-right shadow-sm hover:border-primary/50">
            <span><span className="block text-sm text-muted-foreground">Siguiente</span><span className="font-bold">{next.title}</span></span>
            <ChevronRight aria-hidden="true" className="size-5 shrink-0 text-muted-foreground" />
          </Link>
        ) : (
          <Link href="/estudio" className="flex items-center justify-end gap-3 rounded-lg border border-primary bg-card p-4 text-right shadow-sm">
            <span><span className="block text-sm text-muted-foreground">Ya sabes cómo funciona</span><span className="font-bold">Empieza a estudiar</span></span>
            <ChevronRight aria-hidden="true" className="size-5 shrink-0 text-primary" />
          </Link>
        )}
      </div>
    </nav>
  )
}

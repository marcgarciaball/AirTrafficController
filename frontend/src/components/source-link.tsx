"use client"

import { formatDate } from "@/lib/format"
import { useRegisterSource, type Source } from "@/components/sources"

/** Dentro de una página con SourcesProvider la fuente se lista al final; fuera se pinta aquí. */
export function SourceLink({ source }: { source: Source }) {
  const collected = useRegisterSource(source)
  if (collected) return null
  return (
    <span className="block text-sm leading-relaxed">
      <span className="text-muted-foreground">Fuente: </span>
      <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-primary underline decoration-primary/40 hover:decoration-primary">
        {source.title}
      </a>
      <span className="text-muted-foreground"> · consultada el {formatDate(source.consulted_on)}</span>
    </span>
  )
}

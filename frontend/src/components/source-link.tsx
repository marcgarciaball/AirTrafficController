import { formatDate } from "@/lib/format"

export function SourceLink({
  source,
}: {
  source: { url: string; title: string; consulted_on: string }
}) {
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

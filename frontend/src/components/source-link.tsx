import { formatDate } from "@/lib/format"

export function SourceLink({
  source,
}: {
  source: { url: string; title: string; consulted_on: string }
}) {
  return (
    <span className="block text-sm leading-snug">
      <span className="text-xs uppercase tracking-wide text-muted-foreground">Fuente </span>
      <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-cyan underline decoration-line underline-offset-2 hover:decoration-cyan">
        {source.title}
      </a>
      <span className="text-muted-foreground"> · consultada el <span className="font-mono tabular-nums">{formatDate(source.consulted_on)}</span></span>
    </span>
  )
}

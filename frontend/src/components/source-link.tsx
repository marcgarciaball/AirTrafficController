import { formatDate } from "@/lib/format"

export function SourceLink({
  source,
}: {
  source: { url: string; title: string; consulted_on: string }
}) {
  return (
    <a
      href={source.url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-xs text-muted-foreground underline underline-offset-2 rounded-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      Fuente: {source.title} · consultada el {formatDate(source.consulted_on)}
    </a>
  )
}

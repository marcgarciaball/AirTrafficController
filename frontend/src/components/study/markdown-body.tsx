import { parseMarkdown, type Inline } from "@/lib/study/markdown"

function Inlines({ inlines }: { inlines: Inline[] }) {
  return (
    <>
      {inlines.map((i, k) => (i.bold ? <strong key={k} className="font-bold text-foreground">{i.text}</strong> : <span key={k}>{i.text}</span>))}
    </>
  )
}

/** Render seguro de markdown mínimo (React escapa el texto; no se usa dangerouslySetInnerHTML). */
export function MarkdownBody({ md }: { md: string }) {
  return (
    <div className="max-w-[68ch] space-y-3 text-base leading-relaxed text-foreground">
      {parseMarkdown(md).map((b, k) => {
        if (b.type === "h3") return <h4 key={k} className="pt-1 text-sm font-normal uppercase tracking-wide text-foreground"><Inlines inlines={b.inlines} /></h4>
        if (b.type === "ul")
          return (
            <ul key={k} className="list-disc space-y-1 pl-5 marker:text-muted-foreground">
              {b.items.map((it, j) => <li key={j}><Inlines inlines={it} /></li>)}
            </ul>
          )
        return <p key={k}><Inlines inlines={b.inlines} /></p>
      })}
    </div>
  )
}

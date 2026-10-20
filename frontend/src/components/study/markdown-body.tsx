import { parseMarkdown, type Inline } from "@/lib/study/markdown"

function Inlines({ inlines }: { inlines: Inline[] }) {
  return (
    <>
      {inlines.map((i, k) => (i.bold ? <strong key={k} className="font-bold text-foreground">{i.text}</strong> : <span key={k}>{i.text}</span>))}
    </>
  )
}

/** Render seguro de markdown mínimo (React escapa el texto; no se usa dangerouslySetInnerHTML). Texto de lectura a 18 px. */
export function MarkdownBody({ md }: { md: string }) {
  return (
    <div className="max-w-prose space-y-5 text-lg leading-relaxed text-foreground">
      {parseMarkdown(md).map((b, k) => {
        if (b.type === "h3") return <h4 key={k} className="pt-3 text-lg font-bold text-foreground"><Inlines inlines={b.inlines} /></h4>
        if (b.type === "ul")
          return (
            <ul key={k} className="list-disc space-y-2 pl-6 marker:text-muted-foreground">
              {b.items.map((it, j) => <li key={j} className="pl-1"><Inlines inlines={it} /></li>)}
            </ul>
          )
        if (b.type === "table")
          return (
            <div key={k} className="overflow-x-auto">
              <table className="w-full border-collapse text-base">
                <thead>
                  <tr>{b.head.map((c, j) => <th key={j} className="border-b-2 px-3 py-2 text-left font-bold"><Inlines inlines={c} /></th>)}</tr>
                </thead>
                <tbody>
                  {b.rows.map((r, j) => (
                    <tr key={j} className="border-b">{r.map((c, m) => <td key={m} className="px-3 py-2 align-top"><Inlines inlines={c} /></td>)}</tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        return <p key={k}><Inlines inlines={b.inlines} /></p>
      })}
    </div>
  )
}

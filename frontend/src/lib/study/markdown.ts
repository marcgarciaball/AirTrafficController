export type Inline = { text: string; bold: boolean }
export type Block =
  | { type: "h3"; inlines: Inline[] }
  | { type: "p"; inlines: Inline[] }
  | { type: "ul"; items: Inline[][] }

export function parseInline(s: string): Inline[] {
  return s
    .split(/(\*\*[^*]+\*\*)/g)
    .filter((x) => x !== "")
    .map((x) => (x.startsWith("**") && x.endsWith("**") && x.length > 4 ? { text: x.slice(2, -2), bold: true } : { text: x, bold: false }))
}

/** Markdown mínimo: títulos ###, listas con "- " o "* ", párrafos y **negrita**. Todo se devuelve como datos, sin HTML. */
export function parseMarkdown(md: string): Block[] {
  const blocks: Block[] = []
  let para: string[] = []
  let list: Inline[][] | null = null
  const flushPara = () => {
    if (para.length) blocks.push({ type: "p", inlines: parseInline(para.join(" ")) })
    para = []
  }
  const flushList = () => {
    if (list) blocks.push({ type: "ul", items: list })
    list = null
  }
  for (const raw of md.replace(/\r\n/g, "\n").split("\n")) {
    const line = raw.trim()
    if (line === "") {
      flushPara()
      flushList()
    } else if (/^#{1,6}\s+/.test(line)) {
      flushPara()
      flushList()
      blocks.push({ type: "h3", inlines: parseInline(line.replace(/^#{1,6}\s+/, "")) })
    } else if (/^[-*]\s+/.test(line)) {
      flushPara()
      list ??= []
      list.push(parseInline(line.replace(/^[-*]\s+/, "")))
    } else {
      flushList()
      para.push(line)
    }
  }
  flushPara()
  flushList()
  return blocks
}

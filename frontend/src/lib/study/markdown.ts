export type Inline = { text: string; bold: boolean }
export type Block =
  | { type: "h3"; inlines: Inline[] }
  | { type: "p"; inlines: Inline[] }
  | { type: "ul"; items: Inline[][] }
  | { type: "table"; head: Inline[][]; rows: Inline[][][] }

export function parseInline(s: string): Inline[] {
  return s
    .split(/(\*\*[^*]+\*\*)/g)
    .filter((x) => x !== "")
    .map((x) => (x.startsWith("**") && x.endsWith("**") && x.length > 4 ? { text: x.slice(2, -2), bold: true } : { text: x, bold: false }))
}

/** Markdown mínimo: títulos ###, listas con "- " o "* ", tablas con "|", párrafos y **negrita**. Todo se devuelve como datos, sin HTML. */
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
  let table: string[][] | null = null
  const flushTable = () => {
    if (table) {
      const [head, ...rows] = table.filter((r) => !r.every((c) => /^:?-{2,}:?$/.test(c)))
      blocks.push({ type: "table", head: (head ?? []).map(parseInline), rows: rows.map((r) => r.map(parseInline)) })
    }
    table = null
  }
  for (const raw of md.replace(/\r\n/g, "\n").split("\n")) {
    const line = raw.trim()
    if (line.startsWith("|") && line.endsWith("|") && line.length > 1) {
      flushPara()
      flushList()
      table ??= []
      table.push(line.slice(1, -1).split("|").map((c) => c.trim()))
      continue
    }
    flushTable()
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
  flushTable()
  return blocks
}

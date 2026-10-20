"use client"

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react"
import { ChevronDown } from "lucide-react"
import { formatDate } from "@/lib/format"

export type Source = { url: string; title: string; consulted_on: string }

type Ctx = { add: (s: Source) => void }
const SourcesContext = createContext<Ctx | null>(null)
const ListContext = createContext<Source[]>([])

/** Recoge las fuentes citadas dentro de la página para listarlas juntas al final. */
export function SourcesProvider({ children }: { children: ReactNode }) {
  const [list, setList] = useState<Source[]>([])
  const add = useCallback((s: Source) => {
    setList((prev) => (prev.some((p) => p.url === s.url && p.title === s.title) ? prev : [...prev, s]))
  }, [])
  return (
    <SourcesContext.Provider value={{ add }}>
      <ListContext.Provider value={list}>{children}</ListContext.Provider>
    </SourcesContext.Provider>
  )
}

/** Dentro de un SourcesProvider registra la fuente y no pinta nada; fuera, devuelve false. */
export function useRegisterSource(source: Source): boolean {
  const ctx = useContext(SourcesContext)
  useEffect(() => {
    ctx?.add(source)
  }, [ctx, source.url, source.title]) // eslint-disable-line react-hooks/exhaustive-deps
  return ctx !== null
}

/** Desplegable con todas las fuentes de la página. */
export function SourcesFooter() {
  const list = useContext(ListContext)
  if (list.length === 0) return null
  return (
    <details className="group rounded-lg border bg-card shadow-sm">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 font-bold sm:px-6">
        Fuentes de esta página ({list.length})
        <ChevronDown aria-hidden="true" className="size-5 text-muted-foreground transition-transform group-open:rotate-180" />
      </summary>
      <ol className="list-decimal space-y-2 border-t px-5 py-4 pl-10 text-sm leading-relaxed sm:px-6 sm:pl-11">
        {list.map((s) => (
          <li key={s.url + s.title}>
            <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-primary underline decoration-primary/40 hover:decoration-primary">
              {s.title}
            </a>
            <span className="text-muted-foreground"> · consultada el {formatDate(s.consulted_on)}</span>
          </li>
        ))}
      </ol>
    </details>
  )
}

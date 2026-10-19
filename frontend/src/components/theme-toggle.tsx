"use client"

import { useSyncExternalStore } from "react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

// Sin opción "Sistema": la app fija el modo radar por defecto (enableSystem=false).
const THEMES = [
  { value: "dark", label: "Radar", hint: "Oscuro" },
  { value: "light", label: "Strips", hint: "Claro" },
]

const subscribe = () => () => {}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const mounted = useSyncExternalStore(subscribe, () => true, () => false)
  return (
    <fieldset className="space-y-2">
      <legend className="mb-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Tema</legend>
      <div className="grid grid-cols-2 overflow-hidden rounded-sm border bg-card">
        {THEMES.map((t, i) => {
          const active = mounted && theme === t.value
          return (
            <button
              key={t.value}
              type="button"
              aria-pressed={active}
              onClick={() => setTheme(t.value)}
              className={cn(
                "relative flex flex-col items-start gap-1 px-3.5 py-3 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
                i > 0 && "border-l",
                active ? "bg-primary/10 text-foreground shadow-[inset_0_2px_0_var(--primary)]" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              )}
            >
              <span className="text-sm font-medium">{t.hint}</span>
              <span className={cn("font-mono text-[10px] uppercase tracking-[0.12em]", active ? "text-primary" : "text-muted-foreground")}>
                {t.label}
              </span>
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}

"use client"

import { useSyncExternalStore } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

const THEMES = [
  { value: "light", label: "Claro" },
  { value: "dark", label: "Oscuro" },
  { value: "system", label: "Sistema" },
]

const subscribe = () => () => {}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const mounted = useSyncExternalStore(subscribe, () => true, () => false)
  return (
    <fieldset className="flex flex-wrap gap-2">
      <legend className="mb-2 text-sm font-medium">Tema</legend>
      {THEMES.map((t) => {
        const active = mounted && theme === t.value
        return (
          <Button
            key={t.value}
            type="button"
            variant={active ? "default" : "outline"}
            aria-pressed={active}
            onClick={() => setTheme(t.value)}
          >
            {t.label}
          </Button>
        )
      })}
    </fieldset>
  )
}

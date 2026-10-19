"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

/** Interruptor claro/oscuro. Los iconos se alternan por CSS, así no hay desajuste de hidratación. */
export function ThemeToggle({ className, withLabel = false }: { className?: string; withLabel?: boolean }) {
  const { resolvedTheme, setTheme } = useTheme()
  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Cambiar entre modo claro y oscuro"
      className={cn(
        "inline-flex min-h-11 min-w-11 items-center justify-center gap-3 rounded-md text-muted-foreground transition-colors hover:bg-subtle hover:text-foreground",
        withLabel && "w-full justify-start px-3",
        className
      )}
    >
      <Moon aria-hidden="true" className="size-5 dark:hidden" />
      <Sun aria-hidden="true" className="hidden size-5 dark:block" />
      {withLabel ? (
        <span className="text-[15px]">
          <span className="dark:hidden">Modo oscuro</span>
          <span className="hidden dark:inline">Modo claro</span>
        </span>
      ) : null}
    </button>
  )
}

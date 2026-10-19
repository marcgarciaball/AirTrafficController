"use client"

import { useSyncExternalStore } from "react"
import { cn } from "@/lib/utils"

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 1000)
  return () => clearInterval(id)
}

// Segundo actual: valor estable entre renders dentro del mismo segundo.
const getSnapshot = () => Math.floor(Date.now() / 1000)
const getServerSnapshot = () => null

const pad = (n: number) => String(n).padStart(2, "0")

export function UtcClock({ className, align = "end" }: { className?: string; align?: "start" | "end" }) {
  const seconds = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const now = seconds === null ? null : new Date(seconds * 1000)
  const utc = now ? `${pad(now.getUTCHours())}:${pad(now.getUTCMinutes())}:${pad(now.getUTCSeconds())}Z` : "--:--:--Z"
  const local = now ? `${pad(now.getHours())}:${pad(now.getMinutes())}` : "--:--"

  return (
    <div
      aria-live="off"
      className={cn(
        "flex flex-col font-mono tabular-nums leading-none",
        align === "end" ? "items-end" : "items-start",
        className
      )}
    >
      <time dateTime={now?.toISOString()} className="text-sm font-medium tracking-[0.04em] text-foreground">
        <span className="sr-only">Hora UTC </span>
        {utc}
      </time>
      <span className="mt-1 text-[10px] tracking-[0.12em] text-muted-foreground">
        <span aria-hidden="true">LCL </span>
        <span className="sr-only">Hora local </span>
        {local}
      </span>
    </div>
  )
}

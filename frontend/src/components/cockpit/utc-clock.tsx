"use client"

import { useSyncExternalStore } from "react"

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 1000)
  return () => clearInterval(id)
}

// Minuto actual: valor estable entre renders dentro del mismo minuto.
const getSnapshot = () => Math.floor(Date.now() / 60000)
const getServerSnapshot = () => null
const pad = (n: number) => String(n).padStart(2, "0")

/** Reloj UTC con el formato de cabina: 14:32Z. */
export function UtcClock({ className }: { className?: string }) {
  const minutes = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const now = minutes === null ? null : new Date(minutes * 60000)
  return (
    <time dateTime={now?.toISOString()} className={className}>
      <span className="sr-only">Hora UTC </span>
      {now ? `${pad(now.getUTCHours())}:${pad(now.getUTCMinutes())}Z` : "--:--Z"}
    </time>
  )
}

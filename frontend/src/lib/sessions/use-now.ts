"use client"

import { useEffect, useState } from "react"

/** Reloj en cliente: devuelve la hora actual y se actualiza cada `ms`. */
export function useNow(ms = 1000): Date {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), ms)
    return () => clearInterval(t)
  }, [ms])
  return now
}

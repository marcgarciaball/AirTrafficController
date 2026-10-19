"use client"

import { useEffect } from "react"

/** Registra el service worker (solo en producción, para no interferir con el desarrollo). */
export function RegisterSw() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) return
    navigator.serviceWorker.register("/sw.js").catch(() => {})
  }, [])
  return null
}

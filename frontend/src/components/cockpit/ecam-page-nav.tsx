"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

// Teclas de página, como las del panel de control del ECAM.
const KEYS = [
  { href: "/hoy", key: "HOY", label: "Hoy" },
  { href: "/ruta", key: "RUTA", label: "Ruta" },
  { href: "/estudio", key: "ESTD", label: "Estudio" },
  { href: "/ingles", key: "ENG", label: "Inglés" },
  { href: "/mas", key: "MÁS", label: "Más" },
]

export function EcamPageNav() {
  const pathname = usePathname()
  return (
    <nav
      aria-label="Principal"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-background pb-[env(safe-area-inset-bottom)] md:inset-x-auto md:inset-y-0 md:left-0 md:w-20 md:border-t-0 md:border-r md:pb-0"
    >
      <p aria-hidden="true" className="hidden h-12 items-center justify-center border-b border-line font-mono text-sm tracking-wider text-foreground md:flex">
        TORRE
      </p>
      <ul className="mx-auto grid max-w-2xl grid-cols-5 gap-1 p-1 md:mt-1 md:grid-cols-1">
        {KEYS.map(({ href, key, label }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`)
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                aria-label={label}
                className={cn(
                  "flex h-11 items-center justify-center border font-mono text-sm uppercase tracking-wide",
                  active ? "border-cyan text-cyan" : "border-line text-foreground hover:bg-surface"
                )}
              >
                {key}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

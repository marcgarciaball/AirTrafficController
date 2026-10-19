"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, CalendarCheck, Ellipsis, Languages, Route } from "lucide-react"
import { cn } from "@/lib/utils"

const ITEMS = [
  { href: "/hoy", label: "Hoy", Icon: CalendarCheck },
  { href: "/ruta", label: "Ruta", Icon: Route },
  { href: "/estudio", label: "Estudio", Icon: BookOpen },
  { href: "/ingles", label: "Inglés", Icon: Languages },
  { href: "/mas", label: "Más", Icon: Ellipsis },
]

export function BottomNav() {
  const pathname = usePathname()
  return (
    <nav
      aria-label="Principal"
      className="fixed inset-x-0 bottom-0 z-10 border-t bg-background pb-[env(safe-area-inset-bottom)]"
    >
      <ul className="mx-auto flex max-w-xl">
        {ITEMS.map(({ href, label, Icon }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`)
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex flex-col items-center gap-1 py-2 text-xs outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                  active ? "font-semibold text-foreground" : "text-muted-foreground"
                )}
              >
                <Icon className="size-5" aria-hidden="true" />
                {label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

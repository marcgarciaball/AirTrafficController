"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, CalendarCheck, Ellipsis, Languages, RadioTower, Route } from "lucide-react"
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
      className="fixed inset-x-0 bottom-0 z-30 border-t bg-card pb-[env(safe-area-inset-bottom)] md:inset-x-auto md:inset-y-0 md:left-0 md:w-20 md:border-t-0 md:border-r md:pb-0"
    >
      <div aria-hidden="true" className="hidden h-14 items-center justify-center border-b text-primary md:flex">
        <RadioTower className="size-[18px]" strokeWidth={1.75} />
      </div>
      <ul className="mx-auto flex max-w-xl md:mt-2 md:flex-col">
        {ITEMS.map(({ href, label, Icon }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`)
          return (
            <li key={href} className="flex-1 md:flex-none">
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative flex h-14 flex-col items-center justify-center gap-1.5 outline-none transition-colors md:h-16",
                  "before:absolute before:inset-x-3 before:top-0 before:h-0.5 before:bg-transparent md:before:inset-x-auto md:before:inset-y-3 md:before:left-0 md:before:h-auto md:before:w-0.5",
                  "focus-visible:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
                  active
                    ? "text-primary before:bg-primary"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                )}
              >
                <Icon className="size-[18px]" strokeWidth={1.75} aria-hidden="true" />
                <span className="font-mono text-[10px] leading-none uppercase tracking-[0.12em]">{label}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, Ellipsis, Languages, Route, Sun } from "lucide-react"
import { cn } from "@/lib/utils"
import { Logo } from "./logo"
import { ThemeToggle } from "./theme-toggle"

const ITEMS = [
  { href: "/hoy", label: "Hoy", icon: Sun },
  { href: "/ruta", label: "Ruta", icon: Route },
  { href: "/estudio", label: "Estudio", icon: BookOpen },
  { href: "/ingles", label: "Inglés", icon: Languages },
  { href: "/mas", label: "Más", icon: Ellipsis },
]

const isActive = (pathname: string, href: string) =>
  pathname === href ||
  pathname.startsWith(`${href}/`) ||
  // Aptitudes cuelga de Estudio y la guía de Más.
  (href === "/estudio" && pathname.startsWith("/aptitudes")) ||
  (href === "/mas" && pathname.startsWith("/guia"))

/** Barra lateral en escritorio y barra inferior en móvil, siempre con palabras completas. */
export function MainNav() {
  const pathname = usePathname()
  return (
    <nav
      aria-label="Principal"
      className="fixed inset-x-0 bottom-0 z-30 border-t bg-background pb-[env(safe-area-inset-bottom)] md:inset-x-auto md:inset-y-0 md:left-0 md:flex md:w-60 md:flex-col md:border-t-0 md:border-r md:pb-0"
    >
      <Link href="/hoy" className="hidden h-20 items-center rounded-md px-7 md:flex">
        <Logo />
      </Link>
      <ul className="mx-auto grid max-w-lg grid-cols-5 md:mx-0 md:max-w-none md:grid-cols-1 md:gap-1 md:px-4">
        {ITEMS.map(({ href, label, icon: Icon }) => {
          const active = isActive(pathname, href)
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex h-16 flex-col items-center justify-center gap-1 text-xs transition-colors md:h-11 md:flex-row md:justify-start md:gap-3 md:rounded-md md:px-3 md:text-[15px]",
                  active
                    ? "font-bold text-primary md:bg-subtle md:text-foreground"
                    : "text-muted-foreground hover:text-foreground md:hover:bg-subtle"
                )}
              >
                <Icon aria-hidden="true" strokeWidth={active ? 2.25 : 1.75} className={cn("size-[22px] md:size-5", active && "md:text-primary")} />
                {label}
              </Link>
            </li>
          )
        })}
      </ul>
      <div className="mt-auto hidden px-4 pb-6 md:block">
        <ThemeToggle withLabel />
      </div>
    </nav>
  )
}

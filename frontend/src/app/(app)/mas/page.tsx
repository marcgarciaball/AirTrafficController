import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { FlightStrip } from "@/components/atc/flight-strip"
import { PageHeader } from "@/components/atc/page-header"
import { SectionLabel } from "@/components/atc/section-label"
import { signOut } from "./actions"

export default function MasPage() {
  return (
    <section className="space-y-8">
      <PageHeader label="05 · Más" title="Más" />

      <div className="space-y-2">
        <SectionLabel as="h2">Cuenta</SectionLabel>
        <Link
          href="/mas/perfil"
          className="group block rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <FlightStrip
            kind="neutral"
            title="Perfil y respuestas del cuestionario"
            code={<ChevronRight className="size-[18px] text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" aria-hidden="true" />}
            className="transition-colors group-hover:border-muted-foreground/40"
          />
        </Link>
      </div>

      <ThemeToggle />

      <div className="border-t pt-6">
        <form action={signOut}>
          <Button type="submit" variant="outline">
            Cerrar sesión
          </Button>
        </form>
      </div>
    </section>
  )
}

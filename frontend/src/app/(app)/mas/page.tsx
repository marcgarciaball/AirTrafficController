import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { signOut } from "./actions"

export default function MasPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">Más</h1>
      <Link
        href="/mas/perfil"
        className="block rounded-lg border p-4 outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        Perfil y respuestas del cuestionario
      </Link>
      <ThemeToggle />
      <form action={signOut}>
        <Button type="submit" variant="outline">
          Cerrar sesión
        </Button>
      </form>
    </section>
  )
}

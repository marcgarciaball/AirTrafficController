import { PageHeader } from "@/components/ui-torre/page-header"
import { Section } from "@/components/ui-torre/section"
import { localDay } from "@/lib/plan/time"
import { createClient } from "@/lib/supabase/server"
import { CardForm, CardList, Reviewer } from "./card-tools"

export default async function Page() {
  const supabase = await createClient()
  const { data: auth } = await supabase.auth.getUser()
  const { data: profile } = auth.user
    ? await supabase.from("profiles").select("timezone").eq("id", auth.user.id).maybeSingle()
    : { data: null }
  const today = localDay(new Date().toISOString(), profile?.timezone ?? "Europe/Madrid")
  const [{ data: due }, { data: all }] = await Promise.all([
    supabase.from("flashcards").select("id, deck, front, back").lte("due_on", today).order("due_on").limit(50),
    supabase.from("flashcards").select("id, deck, front, due_on").order("created_at", { ascending: false }).limit(200),
  ])
  return (
    <section className="space-y-12">
      <PageHeader title="Tarjetas de repaso" description="Vocabulario y fraseología con repetición espaciada: cada tarjeta vuelve cuando estás a punto de olvidarla." back={{ href: "/ingles", label: "Inglés" }} />
      <Section title="Repaso de hoy" aside={`${due?.length ?? 0} pendientes`}>
        <Reviewer cards={due ?? []} today={today} />
      </Section>
      <Section title="Nueva tarjeta">
        <CardForm />
      </Section>
      <Section title="Todas las tarjetas" aside={`${all?.length ?? 0} tarjetas`}>
        <CardList cards={all ?? []} />
      </Section>
    </section>
  )
}

import { PageTitle } from "@/components/cockpit/page-title"
import { Panel } from "@/components/cockpit/panel"
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
    <section className="space-y-6">
      <PageTitle code="ENG TARJETAS" title="Tarjetas de repaso" back={{ href: "/ingles", label: "Inglés" }} />
      <Panel title="Repaso de hoy" aside={`${due?.length ?? 0} pendientes`}>
        <Reviewer cards={due ?? []} today={today} />
      </Panel>
      <Panel title="Nueva tarjeta">
        <CardForm />
      </Panel>
      <Panel title="Todas las tarjetas" aside={`${all?.length ?? 0}`}>
        <CardList cards={all ?? []} />
      </Panel>
    </section>
  )
}

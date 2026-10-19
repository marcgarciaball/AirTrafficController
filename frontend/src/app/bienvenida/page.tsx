import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { OnboardingWizard } from "@/components/onboarding/onboarding-wizard"
import { draftFromProfile, loadCalls } from "@/components/onboarding/load"

// Fuente: bases de la convocatoria 2025 (seed.sql).
const BASES_2025_SOURCE_ID = "00000000-0000-4000-8000-000000000002"

export default async function BienvenidaPage() {
  const supabase = await createClient()
  const { data: auth } = await supabase.auth.getUser()
  if (!auth.user) redirect("/login")
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", auth.user.id).maybeSingle()
  const calls = await loadCalls()
  const { data: basesSource } = await supabase
    .from("sources")
    .select("url, title, consulted_on")
    .eq("id", BASES_2025_SOURCE_ID)
    .maybeSingle()
  return (
    <main>
      <OnboardingWizard
        calls={calls}
        initial={draftFromProfile(profile, calls)}
        basesSource={basesSource}
        repeating={!!profile?.onboarded_at}
      />
    </main>
  )
}

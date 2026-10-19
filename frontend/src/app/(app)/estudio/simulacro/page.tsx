import { PageTitle } from "@/components/cockpit/page-title"
import { createClient } from "@/lib/supabase/server"
import { loadClientQuestions } from "@/lib/study/load"
import { pickSimulacro } from "@/lib/study/quiz"
import { SIMULACRO_SIZE } from "@/lib/study/types"
import { QuizRunner } from "../_components/quiz-runner"

export const dynamic = "force-dynamic"

export default async function Page() {
  const supabase = await createClient()
  const [{ data: topics }, byTopic] = await Promise.all([
    supabase.from("topics").select("id, number, title").order("number"),
    loadClientQuestions(),
  ])
  const titles = Object.fromEntries((topics ?? []).map((t) => [t.id, `Tema ${t.number}. ${t.title}`]))
  const questions = pickSimulacro(byTopic, SIMULACRO_SIZE)
  return (
    <section className="space-y-6">
      <PageTitle code="ESTD · Simulacro" title="Simulacro" back={{ href: "/estudio", label: "Estudio" }} />
      <QuizRunner mode="simulacro" topicId={null} topicTitles={titles} questions={questions} label="SIM" />
    </section>
  )
}

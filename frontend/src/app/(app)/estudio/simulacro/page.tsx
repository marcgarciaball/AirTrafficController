import { PageHeader } from "@/components/ui-torre/page-header"
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
    <section className="space-y-10">
      <PageHeader title="Simulacro de examen" description="Preguntas de todos los temas, como en la prueba de conocimientos." back={{ href: "/estudio", label: "Estudio" }} />
      <QuizRunner mode="simulacro" topicId={null} topicTitles={titles} questions={questions} label="Simulacro" />
    </section>
  )
}

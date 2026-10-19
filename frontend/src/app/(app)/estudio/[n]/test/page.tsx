import { notFound } from "next/navigation"
import { PageTitle } from "@/components/cockpit/page-title"
import { createClient } from "@/lib/supabase/server"
import { loadClientQuestions } from "@/lib/study/load"
import { pickQuestions } from "@/lib/study/quiz"
import { TEMA_TEST_SIZE } from "@/lib/study/types"
import { QuizRunner } from "../../_components/quiz-runner"

export const dynamic = "force-dynamic"

export default async function Page({ params }: { params: Promise<{ n: string }> }) {
  const { n } = await params
  const num = Number(n)
  if (!Number.isInteger(num) || num < 1 || num > 9) notFound()
  const supabase = await createClient()
  const { data: topic } = await supabase.from("topics").select("id, number, title").eq("number", num).maybeSingle()
  if (!topic) notFound()
  const pool = (await loadClientQuestions(topic.id))[topic.id] ?? []
  const questions = pickQuestions(pool, TEMA_TEST_SIZE)
  return (
    <section className="space-y-6">
      <PageTitle code={`Tema T${topic.number} · Test`} title={topic.title} back={{ href: `/estudio/${topic.number}`, label: `Tema T${topic.number}` }} />
      <QuizRunner mode="tema" topicId={topic.id} topicTitles={{ [topic.id]: topic.title }} questions={questions} label={`T${topic.number}`} />
    </section>
  )
}

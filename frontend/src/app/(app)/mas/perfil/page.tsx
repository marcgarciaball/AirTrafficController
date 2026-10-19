import Link from "next/link"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { PageHeader } from "@/components/ui-torre/page-header"
import { Section } from "@/components/ui-torre/section"
import { buttonVariants } from "@/components/ui/button"
import { formatDate } from "@/lib/format"
import type { OnboardingAnswers } from "@/lib/onboarding/schema"
import { ProfileEditForm } from "./profile-edit-form"

const LABELS: Record<string, string> = {
  espanola: "Española", ue: "UE o libre circulación", residente: "Extranjera con residencia legal", ninguna: "Ninguna",
  bachiller: "Bachiller", tecnico_superior: "Técnico Superior", grado: "Grado universitario", extranjero: "Título extranjero",
  b1_o_menos: "B1 o inferior", b2: "B2", c1: "C1", c2: "C2",
  sin_cita: "Sin cita", cita: "Con cita", vigente: "En vigor", otra_clase: "Otra clase",
}

export default async function PerfilPage() {
  const supabase = await createClient()
  const { data: auth } = await supabase.auth.getUser()
  if (!auth.user) redirect("/login")
  const { data: p } = await supabase.from("profiles").select("*").eq("id", auth.user.id).maybeSingle()
  if (!p || !p.onboarded_at || !p.nationality_status || !p.degree || !p.english_level || !p.medical_status || !p.birth_date || !p.target_date || p.weekly_hours == null) {
    redirect("/bienvenida")
  }

  const answers: OnboardingAnswers = {
    nationality_status: p.nationality_status,
    birth_date: p.birth_date,
    degree: p.degree,
    english_level: p.english_level,
    medical_status: p.medical_status,
    medical_valid_until: p.medical_valid_until ?? undefined,
    target_exam_call_id: p.target_exam_call_id,
    target_date: p.target_date,
    target_is_expected: p.target_is_expected ?? false,
    weekly_hours: Number(p.weekly_hours),
    timezone: p.timezone,
  }

  const rows: [string, string][] = [
    ["Nacionalidad o residencia", LABELS[p.nationality_status]],
    ["Fecha de nacimiento", formatDate(p.birth_date)],
    ["Titulación", LABELS[p.degree]],
    ["Nivel de inglés", LABELS[p.english_level]],
    ["Médico de Clase 3", LABELS[p.medical_status] + (p.medical_valid_until ? ` hasta ${formatDate(p.medical_valid_until)}` : "")],
    ["Fecha objetivo", formatDate(p.target_date) + (p.target_is_expected ? " (estimación)" : "")],
    ["Horas por semana", String(p.weekly_hours)],
    ["Zona horaria", p.timezone],
  ]

  return (
    <section className="space-y-12">
      <PageHeader title="Perfil" back={{ href: "/mas", label: "Más" }} />
      <Section title="Respuestas del cuestionario" flush>
        <dl className="divide-y divide-line">
          {rows.map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-6 px-5 py-3.5 sm:px-6">
              <dt className="text-muted-foreground">{k}</dt>
              <dd className="text-right text-foreground">{v}</dd>
            </div>
          ))}
        </dl>
      </Section>
      <Section title="Editar plan">
        <ProfileEditForm answers={answers} />
      </Section>
      <Link href="/bienvenida" className={buttonVariants({ variant: "outline", size: "lg" })}>
        Repetir cuestionario
      </Link>
    </section>
  )
}

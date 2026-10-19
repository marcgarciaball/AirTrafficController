import Link from "next/link"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Separator } from "@/components/ui/separator"
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
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">Perfil</h1>
      <dl className="space-y-3">
        {rows.map(([k, v]) => (
          <div key={k}>
            <dt className="text-sm text-muted-foreground">{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
      <Separator />
      <ProfileEditForm answers={answers} />
      <Separator />
      <Link href="/bienvenida" className="inline-block rounded-md border px-4 py-2 outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50">
        Repetir cuestionario
      </Link>
    </section>
  )
}

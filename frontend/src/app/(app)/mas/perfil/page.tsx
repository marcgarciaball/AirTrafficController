import Link from "next/link"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Separator } from "@/components/ui/separator"
import { formatDate } from "@/lib/format"
import type { OnboardingAnswers } from "@/lib/onboarding/schema"
import { ProfileEditForm } from "./profile-edit-form"
import { PageHeader } from "@/components/atc/page-header"
import { SectionLabel } from "@/components/atc/section-label"

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
    <section className="space-y-8">
      <PageHeader label="05 · Más · Perfil" title="Perfil" />
      <div className="space-y-2">
        <SectionLabel as="h2">Respuestas del cuestionario</SectionLabel>
        <dl className="divide-y overflow-hidden rounded-sm border bg-card">
          {rows.map(([k, v]) => (
            <div key={k} className="grid grid-cols-1 gap-1 px-3.5 py-2.5 sm:grid-cols-[11rem_minmax(0,1fr)] sm:items-baseline sm:gap-4">
              <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">{k}</dt>
              <dd className="text-sm tabular-nums">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
      <Separator />
      <ProfileEditForm answers={answers} />
      <Separator />
      <Link href="/bienvenida" className="inline-flex h-9 items-center rounded-md border px-3.5 text-sm font-medium outline-none transition-colors hover:border-muted-foreground/50 hover:bg-muted/60 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
        Repetir cuestionario
      </Link>
    </section>
  )
}

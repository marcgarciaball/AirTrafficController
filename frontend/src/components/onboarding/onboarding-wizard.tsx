"use client"

import { useState, useTransition } from "react"
import { SourceLink } from "@/components/source-link"
import { Button } from "@/components/ui/button"
import { StatusChip } from "@/components/ui-torre/status-chip"
import { ProgressBar } from "@/components/ui-torre/progress-bar"
import { Logo } from "@/components/ui-torre/logo"
import { ThemeToggle } from "@/components/ui-torre/theme-toggle"
import { saveOnboarding } from "@/app/bienvenida/actions"
import { onboardingActionSchema, type OnboardingAnswers } from "@/lib/onboarding/schema"
import { todayISO } from "@/lib/onboarding/schema"
import { evaluateEligibility } from "@/lib/onboarding/eligibility"
import {
  CUSTOM,
  callTargetDate,
  referenceDateOf,
  toAnswers,
  type Draft,
  type ExamCallOption,
  type SourceInfo,
} from "./types"
import { StepNationality } from "./steps/step-nationality"
import { StepAge } from "./steps/step-age"
import { StepDegree } from "./steps/step-degree"
import { StepEnglish } from "./steps/step-english"
import { StepMedical } from "./steps/step-medical"
import { StepTarget } from "./steps/step-target"
import { StepHours } from "./steps/step-hours"
import { StepTimezone } from "./steps/step-timezone"

const TOTAL = 8

function canContinue(step: number, d: Draft, calls: ExamCallOption[]): boolean {
  switch (step) {
    case 0: return !!d.nationality_status
    case 1: return !!d.birth_date
    case 2: return !!d.degree
    case 3: return !!d.english_level
    case 4: return !!d.medical_status && (d.medical_status !== "vigente" || !!d.medical_valid_until)
    case 5: {
      const today = todayISO()
      if (d.target_choice === CUSTOM) return d.target_date > today
      const c = calls.find((x) => x.id === d.target_choice)
      const date = c && callTargetDate(c)
      return !!c && c.status !== "cerrada" && !!date && date > today
    }
    case 6: return Number(d.weekly_hours.replace(",", ".")) > 0
    case 7: return d.timezone.trim() !== ""
    default: return true
  }
}

export function OnboardingWizard({
  calls,
  initial,
  repeating,
  basesSource,
}: {
  calls: ExamCallOption[]
  initial: Draft
  repeating: boolean
  basesSource: SourceInfo | null
}) {
  const [step, setStep] = useState(0)
  const [draft, setDraft] = useState<Draft>(initial)
  const [error, setError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()
  const set = (p: Partial<Draft>) => setDraft((d) => ({ ...d, ...p }))

  const parsed = step === TOTAL ? onboardingActionSchema.safeParse(toAnswers(draft, calls)) : null
  const result =
    parsed?.success
      ? evaluateEligibility(parsed.data, referenceDateOf(draft, calls))
      : null

  function next() {
    setError(null)
    if (step === 6 && !repeating) {
      // Al entrar en el paso 8, usa la zona horaria detectada del navegador.
      set({ timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || draft.timezone })
    }
    setStep((s) => s + 1)
  }

  function save(answers: OnboardingAnswers) {
    setError(null)
    startTransition(async () => {
      const res = await saveOnboarding(answers)
      if (res?.error) setError(res.error)
    })
  }

  const stepProps = { draft, set }
  const shown = Math.min(step + 1, TOTAL)

  return (
    <div className="mx-auto w-full max-w-xl space-y-10 px-5 pt-5 pb-12 sm:px-8 md:pt-12">
      <div className="flex items-center justify-between">
        <Logo />
        <ThemeToggle className="-mr-2" />
      </div>

      <div className="space-y-3">
        <p className="flex items-baseline justify-between gap-4" aria-live="polite">
          <span className="font-bold text-foreground">Cuestionario de viabilidad</span>
          <span className="text-muted-foreground">{step < TOTAL ? `Pregunta ${shown} de ${TOTAL}` : "Resultado"}</span>
        </p>
        <ProgressBar value={(Math.min(step, TOTAL) / TOTAL) * 100} tone="primary" size="sm" label={`Progreso del cuestionario, paso ${shown} de ${TOTAL}`} />
      </div>

      {step === 0 && <StepNationality {...stepProps} />}
      {step === 1 && <StepAge {...stepProps} />}
      {step === 2 && <StepDegree {...stepProps} />}
      {step === 3 && <StepEnglish {...stepProps} />}
      {step === 4 && <StepMedical {...stepProps} />}
      {step === 5 && <StepTarget {...stepProps} calls={calls} />}
      {step === 6 && <StepHours {...stepProps} />}
      {step === 7 && <StepTimezone {...stepProps} />}

      {step === TOTAL && (
        <section className="space-y-5" aria-labelledby="resultado">
          <h1 id="resultado" className="text-2xl font-bold text-foreground">
            Resultado
          </h1>
          {!parsed?.success && (
            <p role="alert" className="text-danger">
              Faltan o no son válidas algunas respuestas. Vuelve atrás y revísalas.
            </p>
          )}
          {result && result.blockers.length > 0 && (
            <div role="alert" className="space-y-3">
              <p className="flex items-center gap-2">
                <StatusChip tone="danger">{result.blockers.length === 1 ? "1 bloqueo" : `${result.blockers.length} bloqueos`}</StatusChip>
              </p>
              <ul className="space-y-3">
                {result.blockers.map((b) => (
                  <li key={b.code} className="max-w-prose border-l-[3px] border-danger pl-4 text-lg leading-relaxed text-foreground">
                    {b.message}
                  </li>
                ))}
              </ul>
              {basesSource && <SourceLink source={basesSource} />}
              <p className="text-foreground">Te quedarás en la fase 0 hasta resolverlo.</p>
            </div>
          )}
          {result && result.blockers.length === 0 && (
            <p className="max-w-prose border-l-[3px] border-success pl-4 text-lg leading-relaxed">
              <span className="font-bold text-success">Cumples los requisitos declarados.</span> Empezarás en la fase 1.
            </p>
          )}
          {result && result.warnings.length > 0 && (
            <div role="status" className="space-y-3">
              <p className="flex items-center gap-2">
                <StatusChip tone="warning">{result.warnings.length === 1 ? "1 aviso" : `${result.warnings.length} avisos`}</StatusChip>
                <span className="text-sm text-muted-foreground">no bloquean</span>
              </p>
              <ul className="space-y-3">
                {result.warnings.map((w) => (
                  <li key={w.code} className="max-w-prose border-l-[3px] border-warning pl-4 text-lg leading-relaxed text-foreground">
                    {w.message}
                  </li>
                ))}
              </ul>
              {basesSource && <SourceLink source={basesSource} />}
            </div>
          )}
        </section>
      )}

      {error && <p role="alert" className="text-danger">{error}</p>}

      <div className="flex justify-between gap-3 border-t pt-6">
        <Button type="button" variant="ghost" size="lg" disabled={step === 0 || pending} onClick={() => { setError(null); setStep((s) => s - 1) }}>
          Atrás
        </Button>
        {step < TOTAL ? (
          <Button type="button" size="lg" disabled={!canContinue(step, draft, calls)} onClick={next}>
            Siguiente
          </Button>
        ) : (
          <Button type="button" size="lg" disabled={!parsed?.success || pending} onClick={() => parsed?.success && save(parsed.data)}>
            {pending ? "Guardando…" : "Guardar y empezar"}
          </Button>
        )}
      </div>
    </div>
  )
}

"use client"

import { useState, useTransition } from "react"
import { SourceLink } from "@/components/source-link"
import { Button } from "@/components/ui/button"
import { Annunciator } from "@/components/cockpit/annunciator"
import { Tape } from "@/components/cockpit/tape"
import { UtcClock } from "@/components/cockpit/utc-clock"
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
    <div className="mx-auto w-full max-w-xl space-y-6 px-4 pt-3 pb-10 md:pt-10">
      <div className="flex h-10 items-center justify-between border-b border-line font-mono text-sm">
        <span className="tracking-wider text-foreground">TORRE</span>
        <UtcClock className="text-foreground tabular-nums" />
      </div>

      <div className="space-y-2">
        <p className="flex items-baseline justify-between font-mono text-sm uppercase tracking-wide" aria-live="polite">
          <span className="text-foreground">Preflight</span>
          <span className="sr-only">{step < TOTAL ? `Pregunta ${shown} de ${TOTAL}` : "Resultado"}</span>
          <span aria-hidden="true" className="text-foreground tabular-nums">{step < TOTAL ? `${shown}/${TOTAL}` : "RES"}</span>
        </p>
        <Tape value={(Math.min(step, TOTAL) / TOTAL) * 100} tone="green" label={`Progreso del cuestionario, paso ${shown} de ${TOTAL}`} />
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Cuestionario · F0 Viabilidad</p>
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
          {/* Página ECAM: título subrayado, bloqueos en red y avisos en amber. */}
          <h1 id="resultado" className="w-fit border-b border-foreground text-sm uppercase tracking-wide text-foreground">
            Resultado · Viabilidad
          </h1>
          {!parsed?.success && (
            <p role="alert" className="text-red">
              Faltan o no son válidas algunas respuestas. Vuelve atrás y revísalas.
            </p>
          )}
          {result && result.blockers.length > 0 && (
            <div role="alert" className="space-y-3">
              <p className="flex items-center gap-2">
                <Annunciator tone="red">Bloqueo</Annunciator>
                <span className="font-mono text-sm text-red tabular-nums">{result.blockers.length}</span>
              </p>
              <ul className="space-y-2">
                {result.blockers.map((b) => (
                  <li key={b.code} className="flex max-w-[68ch] gap-3 leading-relaxed text-red">
                    <span aria-hidden="true" className="font-mono">■</span>
                    <span>{b.message}</span>
                  </li>
                ))}
              </ul>
              {basesSource && <SourceLink source={basesSource} />}
              <p className="text-foreground">Te quedarás en la fase 0 hasta resolverlo.</p>
            </div>
          )}
          {result && result.blockers.length === 0 && (
            <p className="flex max-w-[68ch] items-start gap-3 leading-relaxed text-green">
              <span aria-hidden="true" className="font-mono">✓</span>
              <span>Cumples los requisitos declarados. Empezarás en la fase 1.</span>
            </p>
          )}
          {result && result.warnings.length > 0 && (
            <div role="status" className="space-y-3">
              <p className="flex items-center gap-2">
                <Annunciator tone="amber">Aviso</Annunciator>
                <span className="text-xs uppercase tracking-wide text-muted-foreground">No bloquea · {result.warnings.length}</span>
              </p>
              <ul className="space-y-2">
                {result.warnings.map((w) => (
                  <li key={w.code} className="flex max-w-[68ch] gap-3 leading-relaxed text-amber">
                    <span aria-hidden="true" className="font-mono">△</span>
                    <span>{w.message}</span>
                  </li>
                ))}
              </ul>
              {basesSource && <SourceLink source={basesSource} />}
            </div>
          )}
        </section>
      )}

      {error && <p role="alert" className="text-sm text-red">{error}</p>}

      <div className="flex justify-between gap-3 border-t border-line pt-5">
        <Button type="button" variant="outline" size="lg" disabled={step === 0 || pending} onClick={() => { setError(null); setStep((s) => s - 1) }}>
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

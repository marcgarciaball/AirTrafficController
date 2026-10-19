import { describe, it, expect } from 'vitest'
import { evaluateEligibility, ageOn } from '../onboarding/eligibility'
import { onboardingSchema, onboardingActionSchema, todayISO, type OnboardingAnswers } from '../onboarding/schema'

const REF = '2027-02-06'
const base: OnboardingAnswers = {
  nationality_status: 'espanola',
  degree: 'grado',
  english_level: 'b2',
  medical_status: 'sin_cita',
  birth_date: '1995-05-10',
  target_exam_call_id: null,
  target_date: '2027-10-01',
  target_is_expected: true,
  weekly_hours: 10,
  timezone: 'Europe/Madrid',
}
const ev = (o: Partial<OnboardingAnswers>) => evaluateEligibility({ ...base, ...o }, REF)
const codes = (o: Partial<OnboardingAnswers>) => ev(o).blockers.map((b) => b.code)

describe('evaluateEligibility', () => {
  it('base: apto, fase 1, aviso médico pendiente', () => {
    const r = ev({})
    expect(r.eligible).toBe(true)
    expect(r.startPhase).toBe(1)
    expect(r.blockers).toEqual([])
    expect(r.warnings.map((w) => w.code)).toEqual(['medico_pendiente'])
  })
  it('nacionalidad', () => {
    expect(codes({ nationality_status: 'ninguna' })).toContain('nacionalidad')
    expect(ev({ nationality_status: 'residente' }).eligible).toBe(true)
  })
  it('edad mínima en el límite', () => {
    expect(ageOn('2009-02-06', REF)).toBe(18)
    expect(ev({ birth_date: '2009-02-06' }).eligible).toBe(true)
    expect(codes({ birth_date: '2009-02-07' })).toContain('edad_min')
  })
  it('edad máxima en el límite', () => {
    expect(codes({ birth_date: '1962-02-06' })).toContain('edad_max')
    expect(ev({ birth_date: '1962-02-07' }).eligible).toBe(true)
  })
  it('titulación', () => {
    expect(codes({ degree: 'ninguna' })).toContain('titulacion')
    const r = ev({ degree: 'extranjero' })
    expect(r.eligible).toBe(true)
    expect(r.warnings.map((w) => w.code)).toContain('homologacion')
  })
  it('médico', () => {
    expect(ev({ medical_status: 'vigente' }).warnings).toEqual([])
    expect(ev({ medical_status: 'otra_clase' }).warnings.map((w) => w.code)).toContain('medico_otra_clase')
  })
  it('con blocker: no apto y fase 0', () => {
    const r = ev({ nationality_status: 'ninguna' })
    expect(r.eligible).toBe(false)
    expect(r.startPhase).toBe(0)
  })
})

describe('onboardingSchema', () => {
  it('vigente exige medical_valid_until', () => {
    expect(onboardingSchema.safeParse({ ...base, medical_status: 'vigente' }).success).toBe(false)
    expect(
      onboardingSchema.safeParse({ ...base, medical_status: 'vigente', medical_valid_until: '2027-12-01' }).success,
    ).toBe(true)
  })
  it('weekly_hours 0 falla', () => {
    expect(onboardingSchema.safeParse({ ...base, weekly_hours: 0 }).success).toBe(false)
  })
})

describe('onboardingActionSchema', () => {
  it('rechaza una fecha objetivo pasada o de hoy', () => {
    expect(onboardingActionSchema.safeParse({ ...base, target_date: '2020-01-01' }).success).toBe(false)
    expect(onboardingActionSchema.safeParse({ ...base, target_date: todayISO() }).success).toBe(false)
  })
  it('acepta una fecha futura', () => {
    expect(onboardingActionSchema.safeParse({ ...base, target_date: '2999-01-01' }).success).toBe(true)
  })
  it('rechaza una zona horaria inválida', () => {
    expect(onboardingSchema.safeParse({ ...base, timezone: 'Madrid' }).success).toBe(false)
  })
})

import { describe, it, expect } from 'vitest'
import { onboardingTaskUpdates } from '../roadmap/onboarding'

const get = (r: { onboarding_key: string; status: string }[], k: string) => r.find((x) => x.onboarding_key === k)?.status

describe('onboardingTaskUpdates', () => {
  it('elegible con médico vigente: las 4 hechas', () => {
    const r = onboardingTaskUpdates({ medical_status: 'vigente' }, true)
    expect(r).toHaveLength(4)
    for (const k of ['nacionalidad', 'edad', 'titulacion', 'medico']) expect(get(r, k)).toBe('hecha')
  })
  it('elegible sin médico vigente: medico pendiente', () => {
    const r = onboardingTaskUpdates({ medical_status: 'sin_cita' }, true)
    expect(get(r, 'medico')).toBe('pendiente')
    expect(get(r, 'edad')).toBe('hecha')
  })
  it('no elegible: vacío', () => {
    expect(onboardingTaskUpdates({ medical_status: 'vigente' }, false)).toEqual([])
  })
})

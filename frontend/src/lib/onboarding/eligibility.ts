import type { OnboardingAnswers } from './schema'

export type Blocker = {
  code: 'nacionalidad' | 'edad_min' | 'edad_max' | 'titulacion'
  message: string
  sourceKey: 'bases_2025'
}
export type Warning = {
  code: 'homologacion' | 'medico_pendiente' | 'medico_otra_clase'
  message: string
}
export type EligibilityResult = {
  eligible: boolean
  startPhase: 0 | 1
  blockers: Blocker[]
  warnings: Warning[]
}

/** Años cumplidos entre dos fechas ISO (calendario, sin horas). */
export function ageOn(birthDate: string, onDate: string): number {
  const [by, bm, bd] = birthDate.split('-').map(Number)
  const [oy, om, od] = onDate.split('-').map(Number)
  let age = oy - by
  if (om < bm || (om === bm && od < bd)) age--
  return age
}

export function evaluateEligibility(a: OnboardingAnswers, referenceDate: string): EligibilityResult {
  const blockers: Blocker[] = []
  const warnings: Warning[] = []
  const age = ageOn(a.birth_date, referenceDate)

  if (a.nationality_status === 'ninguna') {
    blockers.push({
      code: 'nacionalidad',
      message: 'Base 3.1.a de la convocatoria 2025: se exige nacionalidad española, de un Estado de la UE o residencia legal.',
      sourceKey: 'bases_2025',
    })
  }
  if (age < 18) {
    blockers.push({
      code: 'edad_min',
      message: 'Base 3.1.b de la convocatoria 2025: hay que tener cumplidos 18 años.',
      sourceKey: 'bases_2025',
    })
  }
  if (age >= 65) {
    blockers.push({
      code: 'edad_max',
      message: 'Base 3.1.b de la convocatoria 2025: no se puede haber cumplido la edad de 65 años.',
      sourceKey: 'bases_2025',
    })
  }
  if (a.degree === 'ninguna') {
    blockers.push({
      code: 'titulacion',
      message: 'Base 3.1.c de la convocatoria 2025: se exige la titulación académica requerida.',
      sourceKey: 'bases_2025',
    })
  }

  if (a.degree === 'extranjero') {
    warnings.push({
      code: 'homologacion',
      message: 'Tu titulación extranjera debe estar homologada o reconocida en España para presentarte.',
    })
  }
  if (a.medical_status === 'otra_clase') {
    warnings.push({
      code: 'medico_otra_clase',
      message: 'Tu certificado médico es de otra clase: necesitarás el de Clase 3 inicial para la contratación.',
    })
  } else if (a.medical_status !== 'vigente') {
    warnings.push({
      code: 'medico_pendiente',
      message:
        'No es obligatorio para presentarte, pero sí para la contratación (Base 3.2.3). Recomendado hacerlo pronto en un AeMC autorizado para Clase 3 inicial.',
    })
  }

  const eligible = blockers.length === 0
  return { eligible, startPhase: eligible ? 1 : 0, blockers, warnings }
}

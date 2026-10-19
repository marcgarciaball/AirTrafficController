import { z } from 'zod'

export const NATIONALITY_STATUSES = ['espanola', 'ue', 'residente', 'ninguna'] as const
export const DEGREES = ['bachiller', 'tecnico_superior', 'grado', 'extranjero', 'ninguna'] as const
export const ENGLISH_LEVELS = ['b1_o_menos', 'b2', 'c1', 'c2'] as const
export const MEDICAL_STATUSES = ['sin_cita', 'cita', 'vigente', 'otra_clase'] as const

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Fecha ISO (AAAA-MM-DD)')

function validTimeZone(tz: string): boolean {
  try {
    new Intl.DateTimeFormat('es', { timeZone: tz })
    return true
  } catch {
    return false
  }
}

/** Fecha de hoy (AAAA-MM-DD) en Europe/Madrid. */
export function todayISO(now: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Madrid' }).format(now)
}

export const onboardingSchema = z
  .object({
    nationality_status: z.enum(NATIONALITY_STATUSES),
    degree: z.enum(DEGREES),
    english_level: z.enum(ENGLISH_LEVELS),
    medical_status: z.enum(MEDICAL_STATUSES),
    birth_date: isoDate,
    medical_valid_until: isoDate.optional(),
    target_exam_call_id: z.uuid().nullable(),
    target_date: isoDate,
    target_is_expected: z.boolean(),
    weekly_hours: z.number().gt(0).max(80),
    timezone: z.string().refine(validTimeZone, 'Zona horaria no válida'),
  })
  .refine((a) => a.medical_status !== 'vigente' || !!a.medical_valid_until, {
    path: ['medical_valid_until'],
    message: 'Indica hasta cuándo es válido tu certificado médico',
  })

/** Esquema para el cuestionario y la action: exige fecha objetivo posterior a hoy. */
export const onboardingActionSchema = onboardingSchema.refine((a) => a.target_date > todayISO(), {
  path: ['target_date'],
  message: 'La fecha objetivo debe ser posterior a hoy',
})

export type OnboardingAnswers = z.infer<typeof onboardingSchema>

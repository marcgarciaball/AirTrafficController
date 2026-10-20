import type { ReactNode } from "react"

export function StepFieldset({
  legend,
  hint,
  children,
}: {
  legend: string
  hint?: string
  children: ReactNode
}) {
  return (
    <fieldset className="space-y-5">
      <legend className="mb-2 text-xl leading-snug font-bold text-foreground">{legend}</legend>
      {hint ? <p className="max-w-prose leading-relaxed text-muted-foreground">{hint}</p> : null}
      {children}
    </fieldset>
  )
}

export type Option = { value: string; label: string; extra?: ReactNode; disabled?: boolean }

/** Opciones como líneas de la MCDU: texto en white y la seleccionada recuadrada en cyan. */
export function OptionList({
  name,
  options,
  value,
  onChange,
}: {
  name: string
  options: Option[]
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="space-y-3">
      {options.map((o) => (
        <label
          key={o.value}
          className="flex min-h-14 cursor-pointer items-start gap-4 rounded-lg border bg-card px-4 py-3.5 shadow-sm transition-colors hover:bg-subtle has-[:checked]:border-primary has-[:checked]:ring-1 has-[:checked]:ring-primary has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-primary has-[:disabled]:cursor-not-allowed has-[:disabled]:text-muted-foreground has-[:disabled]:hover:bg-transparent"
        >
          <input
            type="radio"
            name={name}
            value={o.value}
            checked={value === o.value}
            disabled={o.disabled}
            onChange={() => onChange(o.value)}
            className="peer sr-only"
          />
          <span aria-hidden="true" className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border-2 border-muted-foreground peer-checked:border-primary peer-checked:[&>span]:block">
            <span className="hidden size-2.5 rounded-full bg-primary" />
          </span>
          <span className="flex-1 space-y-1.5">
            <span className="block text-lg leading-snug">{o.label}</span>
            {o.extra}
          </span>
        </label>
      ))}
    </div>
  )
}

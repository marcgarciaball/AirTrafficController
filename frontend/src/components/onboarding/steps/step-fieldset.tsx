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
    <fieldset className="space-y-4">
      <legend className="mb-2 text-lg leading-snug font-normal text-foreground">{legend}</legend>
      {hint ? <p className="max-w-[68ch] text-sm leading-relaxed text-muted-foreground">{hint}</p> : null}
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
    <div className="divide-y divide-line border-y border-line">
      {options.map((o, i) => (
        <label
          key={o.value}
          className="flex min-h-11 cursor-pointer items-start gap-3 border border-transparent px-3 py-2.5 hover:bg-subtle has-[:checked]:border-primary has-[:focus-visible]:outline has-[:focus-visible]:outline-1 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-primary has-[:disabled]:cursor-not-allowed has-[:disabled]:text-muted-foreground has-[:disabled]:hover:bg-transparent"
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
          <span aria-hidden="true" className="shrink-0 font-mono text-primary tabular-nums peer-disabled:text-muted-foreground">
            [{i + 1}]
          </span>
          <span className="flex-1 space-y-1.5">
            <span className="block leading-snug">{o.label}</span>
            {o.extra}
          </span>
        </label>
      ))}
    </div>
  )
}

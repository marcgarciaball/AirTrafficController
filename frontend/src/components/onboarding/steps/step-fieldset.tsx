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
    <fieldset className="space-y-3">
      <legend className="text-xl font-semibold">{legend}</legend>
      {hint ? <p className="text-sm text-muted-foreground">{hint}</p> : null}
      {children}
    </fieldset>
  )
}

export type Option = { value: string; label: string; extra?: ReactNode; disabled?: boolean }

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
    <div className="space-y-2">
      {options.map((o) => (
        <label
          key={o.value}
          className="flex cursor-pointer items-start gap-3 rounded-lg border p-3 has-[:checked]:border-primary has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-ring/50 has-[:disabled]:opacity-50"
        >
          <input
            type="radio"
            name={name}
            value={o.value}
            checked={value === o.value}
            disabled={o.disabled}
            onChange={() => onChange(o.value)}
            className="mt-1 size-4 accent-primary"
          />
          <span className="flex-1 space-y-1">
            <span className="block">{o.label}</span>
            {o.extra}
          </span>
        </label>
      ))}
    </div>
  )
}

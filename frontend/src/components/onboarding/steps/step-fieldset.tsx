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
      <legend className="mb-2 text-xl leading-tight font-semibold tracking-tight">{legend}</legend>
      {hint ? <p className="text-sm leading-relaxed text-muted-foreground">{hint}</p> : null}
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
    <div className="divide-y overflow-hidden rounded-sm border bg-card">
      {options.map((o, i) => (
        <label
          key={o.value}
          className="flex cursor-pointer items-start gap-3 border-l-2 border-l-transparent py-3 pr-3.5 pl-3 transition-colors hover:bg-muted/40 has-[:checked]:border-l-primary has-[:checked]:bg-primary/10 has-[:focus-visible]:outline-2 has-[:focus-visible]:-outline-offset-2 has-[:focus-visible]:outline-ring has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50 has-[:disabled]:hover:bg-transparent"
        >
          <span aria-hidden="true" className="w-5 pt-[3px] font-mono text-[11px] leading-4 text-muted-foreground tabular-nums">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="flex-1 space-y-1.5">
            <span className="block text-[15px] leading-snug">{o.label}</span>
            {o.extra}
          </span>
          <input
            type="radio"
            name={name}
            value={o.value}
            checked={value === o.value}
            disabled={o.disabled}
            onChange={() => onChange(o.value)}
            className="mt-[3px] size-4 shrink-0 cursor-pointer appearance-none rounded-full border border-muted-foreground/60 bg-background transition-[border] outline-none checked:border-[5px] checked:border-primary disabled:cursor-not-allowed"
          />
        </label>
      ))}
    </div>
  )
}

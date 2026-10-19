import { FlightStrip } from "@/components/atc/flight-strip"
import { PageHeader } from "@/components/atc/page-header"
import { SectionLabel } from "@/components/atc/section-label"

export default function Page() {
  return (
    <section className="space-y-6">
      <PageHeader label="01 · Hoy" title="Hoy" />
      <FlightStrip
        kind="neutral"
        holding
        title={<SectionLabel as="span">Próximo incremento</SectionLabel>}
        meta="En espera"
        code="INC 2"
      >
        <p className="text-[15px] text-foreground">Llega en el incremento 2.</p>
      </FlightStrip>
    </section>
  )
}

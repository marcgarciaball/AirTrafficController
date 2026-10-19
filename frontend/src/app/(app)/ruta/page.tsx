import { FlightStrip } from "@/components/atc/flight-strip"
import { PageHeader } from "@/components/atc/page-header"
import { SectionLabel } from "@/components/atc/section-label"

export default function Page() {
  return (
    <section className="space-y-6">
      <PageHeader label="02 · Ruta" title="Ruta" />
      <FlightStrip
        kind="neutral"
        title={<SectionLabel as="span">Próximo incremento</SectionLabel>}
        meta="En cola"
        code="INC 2"
      >
        <p className="text-[15px] text-foreground">Llega en el incremento 2.</p>
      </FlightStrip>
    </section>
  )
}

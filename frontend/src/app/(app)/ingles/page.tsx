import { FlightStrip } from "@/components/atc/flight-strip"
import { PageHeader } from "@/components/atc/page-header"
import { SectionLabel } from "@/components/atc/section-label"

export default function Page() {
  return (
    <section className="space-y-6">
      <PageHeader label="04 · Inglés" title="Inglés" />
      <FlightStrip
        kind="arr"
        title={<SectionLabel as="span">Próximo incremento</SectionLabel>}
        meta="Inglés"
        code="INC 3"
      >
        <p className="text-[15px] text-foreground">Llega en el incremento 3.</p>
      </FlightStrip>
    </section>
  )
}

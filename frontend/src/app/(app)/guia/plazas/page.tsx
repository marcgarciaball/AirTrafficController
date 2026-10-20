import { GuiaPage } from "@/components/guia/guia-ui"
import { Checklist, LinkRow } from "@/components/ui-torre/checklist"
import { Card, Section } from "@/components/ui-torre/section"
import { StatusChip } from "@/components/ui-torre/status-chip"

const BOE_BUSQUEDA =
  "https://www.boe.es/buscar/anuncios.php?campo%5B0%5D=TITULO&dato%5B0%5D=controladores+ENAIRE&accion=Buscar&sort_field%5B0%5D=FECHA_PUBLICACION&sort_order%5B0%5D=desc"

const ENLACES = [
  { href: "https://empleo.enaire.es/empleo/PFSrv?accion=inicio", title: "Portal de empleo de ENAIRE", detail: "Aquí se publican las bases y se abre la inscripción. Es lo primero que hay que mirar." },
  { href: BOE_BUSQUEDA, title: "BOE: anuncios de ENAIRE sobre controladores", detail: "Búsqueda ya hecha y ordenada por fecha. El anuncio oficial sale aquí el mismo día." },
  { href: "https://www.enaire.es/sala_de_prensa", title: "Sala de prensa de ENAIRE", detail: "Notas de prensa: suelen anunciar el número de plazas." },
]

export default function Page() {
  return (
    <GuiaPage label="Plazas" title="¿Hay plazas nuevas?" intro="La app no comprueba sola las convocatorias. Abre estas tres fuentes oficiales: si hay convocatoria nueva, aparecerá en ellas.">
      <Card className="space-y-3">
        <p className="flex items-center justify-between gap-3">
          <span className="font-bold">Convocatoria 2026</span>
          <StatusChip tone="warning">no publicada a 20-10-2026</StatusChip>
        </p>
        <p className="text-sm text-muted-foreground">
          ENAIRE anunció el 17-08-2026 que la aprobará antes de fin de año, con un número de plazas similar al de las dos anteriores (149 en 2025 y 158 en 2024). Las cuatro últimas se publicaron entre el 20 de noviembre y el 15 de diciembre. La fecha exacta y el número de plazas están pendientes de verificar.
        </p>
      </Card>
      <Section title="Comprobar ahora" flush>
        <Checklist>
          {ENLACES.map((e) => (
            <LinkRow key={e.href} href={e.href} detail={e.detail} external>
              {e.title}
            </LinkRow>
          ))}
        </Checklist>
      </Section>
    </GuiaPage>
  )
}

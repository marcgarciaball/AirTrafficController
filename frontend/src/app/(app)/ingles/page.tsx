import { Annunciator } from "@/components/cockpit/annunciator"
import { Memo, MemoItem } from "@/components/cockpit/memo"
import { PageTitle } from "@/components/cockpit/page-title"
import { Panel } from "@/components/cockpit/panel"

export default function Page() {
  return (
    <section className="space-y-6">
      <PageTitle code="ENG" title="Inglés" />
      <Panel title="Próximo incremento" flush>
        <Memo>
          <MemoItem state="bloqueado" reason="Llega en el incremento 3." meta={<Annunciator tone="dim">INC 3</Annunciator>}>
            Módulo de inglés
          </MemoItem>
        </Memo>
      </Panel>
    </section>
  )
}

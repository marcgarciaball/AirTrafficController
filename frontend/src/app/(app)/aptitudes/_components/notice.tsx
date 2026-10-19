import { Annunciator } from "@/components/cockpit/annunciator"

export const FEAST_TRAINING_URL = "https://feast-training.eurocontrol.int/"

export function AptNotice() {
  return (
    <div className="space-y-1.5 border border-line px-3 py-2.5 text-sm text-muted-foreground">
      <Annunciator tone="amber">Aviso</Annunciator>
      <p className="max-w-[68ch] leading-relaxed">
        Ejercicios propios de entrenamiento. No reproducen las pruebas oficiales. Para FEAST, usa también la{" "}
        <a href={FEAST_TRAINING_URL} target="_blank" rel="noopener noreferrer" className="text-cyan underline underline-offset-2">
          plataforma oficial gratuita (feast-training)
        </a>
        .
      </p>
    </div>
  )
}

export const FEAST_TRAINING_URL = "https://feast-training.eurocontrol.int/"

export function AptNotice() {
  return (
    <p className="max-w-prose rounded-lg border border-warning/40 bg-card px-5 py-4 leading-relaxed text-muted-foreground">
      <span className="font-bold text-warning">Ejercicios propios de entrenamiento.</span> No reproducen las pruebas oficiales. Para FEAST, usa también la{" "}
      <a href={FEAST_TRAINING_URL} target="_blank" rel="noopener noreferrer" className="text-primary underline decoration-primary/40 hover:decoration-primary">
        plataforma oficial gratuita (feast-training)
      </a>
      .
    </p>
  )
}

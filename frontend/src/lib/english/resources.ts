import type { EnglishSkill } from "./plan"

/** Recursos por destreza (docs/GUIA_INGLES.md). */
export const SKILL_RESOURCES: Record<EnglishSkill, { label: string; href: string }[]> = {
  reading_use: [
    { label: "Sample papers Cambridge C1", href: "https://www.cambridgeenglish.org/Images/174025-advanced-2015-sample-papers-1.zip" },
    { label: "British Council Reading C1", href: "https://learnenglish.britishcouncil.org/skills/reading/c1-reading" },
    { label: "British Council Grammar C1", href: "https://learnenglish.britishcouncil.org/free-resources/grammar/c1" },
  ],
  writing: [
    { label: "Write & Improve", href: "https://writeandimprove.com/" },
    { label: "British Council Writing C1", href: "https://learnenglish.britishcouncil.org/skills/writing/c1-writing" },
  ],
  listening: [
    { label: "British Council Listening C1", href: "https://learnenglish.britishcouncil.org/skills/listening/c1-listening" },
    { label: "FEAST: práctica ELICIT (Eurocontrol)", href: "https://feast-training.eurocontrol.int/en/" },
  ],
  speaking: [
    { label: "Vídeo oficial Speaking C1 (Cambridge)", href: "https://www.youtube.com/watch?v=5nGESyDgmdw" },
    { label: "Guía de profesor de Speaking", href: "https://www.cambridgeenglish.org/Images/735851-teacher-guide-for-speaking-c1-advanced.pdf" },
  ],
}

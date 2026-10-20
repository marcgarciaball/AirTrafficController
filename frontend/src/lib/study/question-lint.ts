type Q = { id: string; options: string[]; correct_index: number }

const mean = (n: number[]) => n.reduce((a, b) => a + b, 0) / n.length

export function lintQuestions(qs: Q[]): { id: string; issue: "longest_bias" | "length_out_of_range" }[] {
  const out: { id: string; issue: "longest_bias" | "length_out_of_range" }[] = []
  let longest = 0
  for (const q of qs) {
    const c = q.options[q.correct_index]?.length ?? 0
    const others = q.options.filter((_, i) => i !== q.correct_index).map((o) => o.length)
    if (!others.length) continue
    const avg = mean(others)
    if (Math.abs(c - avg) > 0.2 * avg) out.push({ id: q.id, issue: "length_out_of_range" })
    if (others.every((l) => c > l)) longest++
  }
  if (qs.length && longest / qs.length > 0.4) out.push({ id: "*", issue: "longest_bias" })
  return out
}

export function positionBalance(qs: Q[]): number[] {
  const n = Math.max(4, ...qs.map((q) => q.options.length))
  const counts = Array<number>(n).fill(0)
  for (const q of qs) counts[q.correct_index]++
  return counts
}

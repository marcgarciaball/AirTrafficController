export function blockMastery(checkCorrect: number, checkTotal: number, reviews: { rating: number }[]): number {
  const check = checkTotal > 0 ? (100 * checkCorrect) / checkTotal : 0
  if (reviews.length < 3) return Math.round(check)
  const retention = (100 * reviews.filter((r) => r.rating !== 1).length) / reviews.length
  return Math.round(0.6 * check + 0.4 * retention)
}

export function topicMastery(blocks: { mastery: number | null }[]): number | null {
  const v = blocks.map((b) => b.mastery).filter((m): m is number => m != null)
  return v.length ? v.reduce((a, b) => a + b, 0) / v.length : null
}

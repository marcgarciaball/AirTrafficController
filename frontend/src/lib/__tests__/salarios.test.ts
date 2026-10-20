import { describe, expect, it } from "vitest"
import { estimar } from "@/lib/salarios"

describe("estimar", () => {
  it("ACC Madrid entrada: base + 60 % del CPT del grupo 1", () => {
    expect(Math.round(estimar("acc-mad-bcn", "1-3")!.total)).toBe(74446)
  })
  it("Torre Melilla pleno suma residencia", () => {
    expect(Math.round(estimar("twr-melilla", "7+")!.total)).toBe(67650)
  })
  it("destino desconocido devuelve null", () => {
    expect(estimar("x", "7+")).toBeNull()
  })
})

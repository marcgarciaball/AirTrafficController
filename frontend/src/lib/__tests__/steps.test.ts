import { describe, expect, it } from "vitest"
import { visibleSteps } from "@/lib/study/steps"

describe("visibleSteps", () => {
  it("omite mnemotecnia y ejemplo si son null o vacios", () => {
    const s = visibleSteps({ example_md: null, mnemonic_md: "  " })
    expect(s).not.toContain("mnemotecnia")
    expect(s).not.toContain("ejemplo")
    expect(s).toContain("idea")
  })
  it("los incluye si hay contenido", () => {
    const s = visibleSteps({ example_md: "x", mnemonic_md: "y" })
    expect(s).toContain("ejemplo")
    expect(s).toContain("mnemotecnia")
  })
})

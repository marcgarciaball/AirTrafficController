import { describe, expect, it } from "vitest";
import { resolveSiteUrl } from "../site-url";

const h = (map: Record<string, string>) => (name: string) => map[name] ?? null;

describe("resolveSiteUrl", () => {
  it("usa el host de Vercel con https", () => {
    expect(
      resolveSiteUrl(h({ "x-forwarded-host": "air-traffic-controller.vercel.app", "x-forwarded-proto": "https" })),
    ).toBe("https://air-traffic-controller.vercel.app");
  });

  it("usa http en localhost", () => {
    expect(resolveSiteUrl(h({ host: "localhost:3000" }))).toBe("http://localhost:3000");
  });

  it("sin cabeceras usa el valor de reserva", () => {
    expect(resolveSiteUrl(h({}), "https://ejemplo.app/")).toBe("https://ejemplo.app");
  });
});

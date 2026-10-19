import { describe, expect, it } from "vitest";
import { resolveRedirect } from "@/lib/routing";

const r = (pathname: string, isAuthenticated: boolean, isOnboarded = false) =>
  resolveRedirect({ pathname, isAuthenticated, isOnboarded });

describe("resolveRedirect", () => {
  it("sin sesión en ruta privada va a /login", () => expect(r("/hoy", false)).toBe("/login"));
  it("con sesión en /login va a /hoy", () => expect(r("/login", true, true)).toBe("/hoy"));
  it("con sesión sin onboarding en /registro va a /bienvenida", () =>
    expect(r("/registro", true, false)).toBe("/bienvenida"));
  it("sin onboarding en /hoy va a /bienvenida", () => expect(r("/hoy", true, false)).toBe("/bienvenida"));
  it("/bienvenida sin onboarding no redirige", () => expect(r("/bienvenida", true, false)).toBeNull());
  it("/bienvenida con onboarding no redirige", () => expect(r("/bienvenida", true, true)).toBeNull());
  it("/auth/confirm sin sesión no redirige", () => expect(r("/auth/confirm", false)).toBeNull());
  it("/ con sesión y onboarding va a /hoy", () => expect(r("/", true, true)).toBe("/hoy"));
  it("/ sin sesión va a /login", () => expect(r("/", false)).toBe("/login"));
  it("/auth/callback con sesión no redirige", () => expect(r("/auth/callback", true, true)).toBeNull());
  it("/nueva-contrasena con sesión sin onboarding no redirige", () =>
    expect(r("/nueva-contrasena", true, false)).toBeNull());
});

// URL pública de la app. Se deduce de la petición para que los enlaces de email y OAuth
// apunten siempre al sitio desde el que se usa la app (local, preview o producción).
// NEXT_PUBLIC_SITE_URL solo se usa si no hay cabeceras (no debería ocurrir en una petición).
export function resolveSiteUrl(
  get: (name: string) => string | null,
  fallback = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
): string {
  const host = get("x-forwarded-host") ?? get("host");
  if (!host) return fallback.replace(/\/$/, "");
  const proto =
    get("x-forwarded-proto") ?? (host.startsWith("localhost") || host.startsWith("127.") ? "http" : "https");
  return `${proto}://${host}`;
}

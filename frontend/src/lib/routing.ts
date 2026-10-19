export const PUBLIC_ROUTES = ["/login", "/registro", "/recuperar", "/auth/confirm", "/auth/callback"];
export const ONBOARDING_ROUTE = "/bienvenida";
const HOME_ROUTE = "/hoy";
// Con sesión, estas rutas públicas llevan a la app; el resto (confirm, callback, recuperar) siguen accesibles.
const GUEST_ONLY = ["/login", "/registro"];
// Con sesión pero sin onboarding, se permite (el usuario llega aquí desde el enlace de recuperación).
const NO_ONBOARDING_GATE = ["/nueva-contrasena"];

const matches = (pathname: string, routes: string[]) =>
  routes.some((r) => pathname === r || pathname.startsWith(`${r}/`));

export function resolveRedirect(input: {
  pathname: string;
  isAuthenticated: boolean;
  isOnboarded: boolean;
}): string | null {
  const { pathname, isAuthenticated, isOnboarded } = input;
  const target = isOnboarded ? HOME_ROUTE : ONBOARDING_ROUTE;

  if (!isAuthenticated) {
    return matches(pathname, PUBLIC_ROUTES) ? null : "/login";
  }
  if (pathname === "/" || matches(pathname, GUEST_ONLY)) return target;
  if (matches(pathname, PUBLIC_ROUTES) || matches(pathname, NO_ONBOARDING_GATE)) return null;
  if (!isOnboarded && !matches(pathname, [ONBOARDING_ROUTE])) return ONBOARDING_ROUTE;
  return null;
}

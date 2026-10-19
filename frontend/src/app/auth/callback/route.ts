import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Anti open redirect: `next` solo puede ser una de estas rutas internas.
const ALLOWED_NEXT = ["/hoy", "/bienvenida", "/nueva-contrasena"];

// Intercambia el `code` (OAuth de Google, confirmación de registro y recuperación, flujo PKCE) por una sesión.
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");
  const nextParam = searchParams.get("next");
  const next = nextParam && ALLOWED_NEXT.includes(nextParam) ? nextParam : "/hoy";
  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(`${origin}${next}`);
  }
  return NextResponse.redirect(`${origin}/login?error=${nextParam ? "enlace" : "google"}`);
}

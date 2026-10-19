import type { EmailOtpType } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

const TYPES: EmailOtpType[] = ["signup", "recovery", "email", "invite", "magiclink", "email_change"];

// token_hash + verifyOtp (no PKCE): el enlace funciona aunque se abra en otro navegador.
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;

  if (tokenHash && type && TYPES.includes(type)) {
    const supabase = await createClient();
    const { error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash });
    if (!error) {
      // Destino fijo (sin parámetro `next`) para evitar redirecciones abiertas.
      return NextResponse.redirect(`${origin}${type === "recovery" ? "/nueva-contrasena" : "/hoy"}`);
    }
  }
  return NextResponse.redirect(`${origin}/login?error=enlace`);
}

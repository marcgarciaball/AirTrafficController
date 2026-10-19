"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type FormState = { error?: string; message?: string };

const MIN_PASSWORD = 8;
const siteUrl = () => process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const field = (fd: FormData, name: string) => String(fd.get(name) ?? "").trim();

export async function signIn(_prev: FormState, formData: FormData): Promise<FormState> {
  const email = field(formData, "email");
  const password = String(formData.get("password") ?? "");
  if (!email || !password) return { error: "Introduce tu email y tu contraseña." };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return {
      error:
        error.code === "email_not_confirmed"
          ? "Confirma tu email antes de iniciar sesión."
          : "Email o contraseña incorrectos.",
    };
  }
  redirect("/hoy"); // el proxy lleva a /bienvenida si falta el cuestionario
}

export async function signUp(_prev: FormState, formData: FormData): Promise<FormState> {
  const email = field(formData, "email");
  const password = String(formData.get("password") ?? "");
  if (!email) return { error: "Introduce tu email." };
  if (password.length < MIN_PASSWORD) {
    return { error: `La contraseña debe tener al menos ${MIN_PASSWORD} caracteres.` };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: `${siteUrl()}/auth/callback?next=/bienvenida` },
  });
  if (error) return { error: "No hemos podido crear la cuenta. Revisa los datos e inténtalo de nuevo." };
  if (data.session) redirect("/bienvenida"); // confirmación de email desactivada
  return { message: "Te hemos enviado un email para confirmar tu cuenta." };
}

export async function requestPasswordReset(_prev: FormState, formData: FormData): Promise<FormState> {
  const email = field(formData, "email");
  if (!email) return { error: "Introduce tu email." };

  const supabase = await createClient();
  await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${siteUrl()}/auth/callback?next=/nueva-contrasena`,
  }); // PKCE: el enlace debe abrirse en el mismo navegador
  // Mismo mensaje exista o no la cuenta, para no revelar qué emails están registrados.
  return { message: "Si existe una cuenta con ese email, recibirás un enlace." };
}

export async function updatePassword(_prev: FormState, formData: FormData): Promise<FormState> {
  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm") ?? "");
  if (password.length < MIN_PASSWORD) {
    return { error: `La contraseña debe tener al menos ${MIN_PASSWORD} caracteres.` };
  }
  if (password !== confirm) return { error: "Las contraseñas no coinciden." };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "El enlace ha caducado. Solicita uno nuevo desde «Recuperar contraseña»." };

  const { error } = await supabase.auth.updateUser({ password });
  if (error) return { error: "No hemos podido cambiar la contraseña. Inténtalo de nuevo." };
  redirect("/hoy");
}

export async function signInWithGoogle(): Promise<never> {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: `${siteUrl()}/auth/callback` },
  });
  if (error || !data.url) redirect("/login?error=google");
  redirect(data.url);
}

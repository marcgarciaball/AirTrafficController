"use client";

import { Suspense, useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { signIn, type FormState } from "../actions";
import { AuthCard, AuthLink, Field, FormMessages, GoogleButton } from "../auth-ui";

const URL_ERRORS: Record<string, string> = {
  enlace: "El enlace no es válido o ha caducado. Pide uno nuevo.",
  google: "No se ha podido iniciar sesión con Google.",
};

function UrlError() {
  const code = useSearchParams().get("error");
  const message = code ? URL_ERRORS[code] : undefined;
  return message ? (
    <p role="alert" className="text-sm text-danger">
      {message}
    </p>
  ) : null;
}

export default function LoginPage() {
  const [state, action, pending] = useActionState<FormState, FormData>(signIn, {});
  return (
    <AuthCard title="Iniciar sesión">
      <Suspense>
        <UrlError />
      </Suspense>
      <form action={action} className="flex flex-col gap-4">
        <Field id="email" label="Email" type="email" autoComplete="email" />
        <Field id="password" label="Contraseña" type="password" autoComplete="current-password" />
        <FormMessages state={state} />
        <Button type="submit" size="lg" className="mt-2 w-full" disabled={pending}>
          {pending ? "Entrando…" : "Entrar"}
        </Button>
      </form>
      <GoogleButton />
      <div className="flex flex-col gap-1">
        <AuthLink href="/recuperar">¿Has olvidado tu contraseña?</AuthLink>
        <AuthLink href="/registro">Crear una cuenta</AuthLink>
      </div>
    </AuthCard>
  );
}

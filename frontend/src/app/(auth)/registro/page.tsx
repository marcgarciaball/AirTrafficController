"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { signUp, type FormState } from "../actions";
import { AuthCard, AuthLink, Field, FormMessages, GoogleButton } from "../auth-ui";

export default function RegistroPage() {
  const [state, action, pending] = useActionState<FormState, FormData>(signUp, {});
  return (
    <AuthCard title="Crear cuenta">
      <form action={action} className="flex flex-col gap-4">
        <Field id="email" label="Email" type="email" autoComplete="email" />
        <Field id="password" label="Contraseña (mínimo 8 caracteres)" type="password" autoComplete="new-password" minLength={8} />
        <FormMessages state={state} />
        <Button type="submit" size="lg" className="mt-1" disabled={pending}>
          {pending ? "Creando..." : "Crear cuenta"}
        </Button>
      </form>
      <GoogleButton />
      <AuthLink href="/login">Ya tengo cuenta</AuthLink>
    </AuthCard>
  );
}

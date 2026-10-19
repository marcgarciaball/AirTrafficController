"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { requestPasswordReset, type FormState } from "../actions";
import { AuthCard, AuthLink, Field, FormMessages } from "../auth-ui";

export default function RecuperarPage() {
  const [state, action, pending] = useActionState<FormState, FormData>(requestPasswordReset, {});
  return (
    <AuthCard title="Recuperar contraseña">
      <form action={action} className="flex flex-col gap-4">
        <Field id="email" label="Email" type="email" autoComplete="email" />
        <FormMessages state={state} />
        <Button type="submit" disabled={pending}>
          {pending ? "Enviando..." : "Enviar enlace"}
        </Button>
      </form>
      <p className="text-sm text-muted-foreground">Abre el enlace en este mismo navegador.</p>
      <AuthLink href="/login">Volver a iniciar sesión</AuthLink>
    </AuthCard>
  );
}

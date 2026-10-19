"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { updatePassword, type FormState } from "../actions";
import { AuthCard, Field, FormMessages } from "../auth-ui";

export default function NuevaContrasenaPage() {
  const [state, action, pending] = useActionState<FormState, FormData>(updatePassword, {});
  return (
    <AuthCard title="Nueva contraseña">
      <form action={action} className="flex flex-col gap-4">
        <Field id="password" label="Nueva contraseña (mínimo 8 caracteres)" type="password" autoComplete="new-password" minLength={8} />
        <Field id="confirm" label="Repite la contraseña" type="password" autoComplete="new-password" minLength={8} />
        <FormMessages state={state} />
        <Button type="submit" size="lg" className="mt-1" disabled={pending}>
          {pending ? "Guardando..." : "Cambiar contraseña"}
        </Button>
      </form>
    </AuthCard>
  );
}

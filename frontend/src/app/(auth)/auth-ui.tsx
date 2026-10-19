"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { AttitudeIndicator } from "@/components/cockpit/attitude-indicator";
import { UtcClock } from "@/components/cockpit/utc-clock";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInWithGoogle, type FormState } from "./actions";

/** Pantalla de acceso: PFD como motivo y formulario como página de la MCDU. */
export function AuthCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <main className="flex min-h-dvh flex-col bg-background md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      {/* Móvil: franja fina de horizonte. */}
      <div aria-hidden="true" className="relative h-12 shrink-0 md:hidden">
        <div className="absolute inset-x-0 top-0 h-1/2 bg-sky" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-ground" />
        <div className="absolute inset-x-0 top-1/2 h-px bg-foreground" />
        <div className="absolute top-1/2 left-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 border border-foreground bg-background" />
      </div>

      {/* Escritorio: panel lateral con el horizonte artificial. */}
      <aside className="hidden flex-col border-r border-line md:flex">
        <div className="flex h-10 items-center justify-between border-b border-line px-5 font-mono text-sm">
          <span className="tracking-wider text-foreground">TORRE</span>
          <UtcClock className="text-foreground tabular-nums" />
        </div>
        <div className="flex flex-1 items-center justify-center p-10">
          <AttitudeIndicator className="w-full max-w-[420px]" />
        </div>
        <p className="border-t border-line px-5 py-3 text-xs uppercase tracking-wide text-muted-foreground">
          Oposiciones · Controlador aéreo
        </p>
      </aside>

      <div className="flex flex-1 items-start justify-center px-5 pt-8 pb-12 sm:items-center md:px-10">
        <div className="w-full max-w-sm border border-line">
          <header className="flex items-baseline justify-between gap-3 border-b border-line px-4 py-2.5">
            <h1 className="text-sm uppercase tracking-wide text-foreground">{title}</h1>
            <span className="font-mono text-xs text-muted-foreground md:hidden">TORRE</span>
          </header>
          <div className="flex flex-col gap-6 px-4 pt-5 pb-5">{children}</div>
        </div>
      </div>
    </main>
  );
}

export function Field(props: {
  id: string;
  label: string;
  type?: string;
  autoComplete?: string;
  minLength?: number;
}) {
  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor={props.id}>{props.label}</Label>
      <Input
        id={props.id}
        name={props.id}
        type={props.type ?? "text"}
        autoComplete={props.autoComplete}
        minLength={props.minLength}
        required
      />
    </div>
  );
}

export function FormMessages({ state }: { state: FormState }) {
  return (
    <>
      {state.error && (
        <p role="alert" className="text-sm text-red">
          {state.error}
        </p>
      )}
      {state.message && (
        <p role="status" className="text-sm text-green">
          {state.message}
        </p>
      )}
    </>
  );
}

export function GoogleButton() {
  return (
    <div className="flex flex-col gap-5">
      <div aria-hidden="true" className="flex items-center gap-3">
        <span className="h-px flex-1 bg-line" />
        <span className="text-xs uppercase tracking-wide text-muted-foreground">o</span>
        <span className="h-px flex-1 bg-line" />
      </div>
      <form action={signInWithGoogle}>
        <Button type="submit" variant="outline" size="lg" className="w-full">
          Continuar con Google
        </Button>
      </form>
    </div>
  );
}

export function AuthLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="flex w-fit items-baseline gap-2 text-sm text-cyan hover:underline">
      {children}
      <span aria-hidden="true" className="font-mono">›</span>
    </Link>
  );
}

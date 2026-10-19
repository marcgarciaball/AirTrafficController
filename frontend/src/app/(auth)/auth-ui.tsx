"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadarScope } from "@/components/atc/radar-scope";
import { SectionLabel } from "@/components/atc/section-label";
import { UtcClock } from "@/components/atc/utc-clock";
import { signInWithGoogle, type FormState } from "./actions";

function Wordmark() {
  return (
    <span className="font-mono text-sm font-medium tracking-[0.42em] text-foreground">
      TORRE
    </span>
  );
}

export function AuthCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <main className="flex min-h-dvh flex-col md:grid md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
      {/* Móvil: franja de consola */}
      <div className="flex h-14 shrink-0 items-center justify-between border-b bg-card px-4 md:hidden">
        <Wordmark />
        <UtcClock />
      </div>

      {/* Escritorio: panel de pantalla radar */}
      <aside className="relative hidden flex-col overflow-hidden border-r bg-card md:flex">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:48px_48px] opacity-35"
        />
        <div className="relative flex h-14 items-center justify-between border-b px-6">
          <Wordmark />
          <UtcClock />
        </div>
        <div className="relative flex flex-1 items-center justify-center p-10">
          <RadarScope className="w-full max-w-[520px]" />
        </div>
        <div className="relative flex items-end justify-between gap-6 border-t px-6 py-5">
          <div className="space-y-1.5">
            <SectionLabel>Oposiciones · Controlador aéreo</SectionLabel>
            <p className="font-mono text-sm text-foreground">Del primer tema a la licencia ATCO.</p>
          </div>
          <SectionLabel as="span" className="tabular-nums">RNG 30</SectionLabel>
        </div>
      </aside>

      {/* Formulario */}
      <div className="flex flex-1 items-start justify-center px-5 pt-10 pb-12 sm:items-center md:px-10">
        <div className="w-full max-w-sm">
          <header className="mb-7 space-y-2 border-l-2 border-primary pl-3">
            <SectionLabel>Torre · Acceso</SectionLabel>
            <h1 className="text-2xl leading-tight font-semibold tracking-tight">{title}</h1>
          </header>
          <div className="flex flex-col gap-5">{children}</div>
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
    <div className="flex flex-col gap-2">
      <Label
        htmlFor={props.id}
        className="font-mono text-[11px] font-normal uppercase tracking-[0.14em] text-muted-foreground"
      >
        {props.label}
      </Label>
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
        <p role="alert" className="border-l-2 border-destructive pl-3 text-sm text-destructive">
          {state.error}
        </p>
      )}
      {state.message && (
        <p role="status" className="border-l-2 border-accent pl-3 text-sm text-muted-foreground">
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
        <span className="h-px flex-1 bg-border" />
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">o</span>
        <span className="h-px flex-1 bg-border" />
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
    <Link
      href={href}
      className="w-fit rounded-sm text-sm text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-primary hover:decoration-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      {children}
    </Link>
  );
}

"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { Logo } from "@/components/ui-torre/logo";
import { ThemeToggle } from "@/components/ui-torre/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInWithGoogle, type FormState } from "./actions";

const STEPS = ["Requisitos y documentación", "Temario, aptitudes e inglés", "Examen y formación"];

/** Pantalla de acceso: a la izquierda, la ruta en tres waypoints; a la derecha, el formulario. */
export function AuthCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <main className="flex min-h-dvh flex-col bg-background md:grid md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
      <aside className="hidden flex-col justify-between border-r bg-subtle px-12 py-12 md:flex lg:px-16">
        <div className="flex items-center justify-between">
          <Logo />
          <ThemeToggle />
        </div>
        <div className="max-w-sm space-y-10">
          <p className="text-2xl font-bold text-foreground">
            Prepara la oposición de controlador aéreo, un día cada vez.
          </p>
          <ol className="relative space-y-7 border-l-2 border-dashed border-guide/40 pl-7">
            {STEPS.map((s, i) => (
              <li key={s} className="relative">
                <span
                  aria-hidden="true"
                  className={`absolute top-1 -left-[37px] size-4 rotate-45 rounded-[3px] border-2 border-guide ${i === 0 ? "bg-guide" : "bg-subtle"}`}
                />
                <span className="block text-sm text-muted-foreground">Paso {i + 1}</span>
                <span className="block text-lg leading-snug text-foreground">{s}</span>
              </li>
            ))}
          </ol>
        </div>
        <p className="text-sm text-muted-foreground">Oposiciones de controlador aéreo · España</p>
      </aside>

      <div className="flex flex-1 flex-col px-5 pt-6 pb-12 sm:px-8 md:justify-center md:px-12">
        <div className="mb-10 flex items-center justify-between md:hidden">
          <Logo />
          <ThemeToggle className="-mr-2" />
        </div>
        <div className="mx-auto w-full max-w-[400px]">
          <h1 className="mb-8 text-2xl font-bold text-foreground">{title}</h1>
          <div className="flex flex-col gap-7">{children}</div>
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
        <p role="alert" className="text-sm text-danger">
          {state.error}
        </p>
      )}
      {state.message && (
        <p role="status" className="text-sm text-success">
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
        <span className="text-sm text-muted-foreground">o bien</span>
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
    <Link href={href} className="-mx-1 flex min-h-11 w-fit items-center gap-1 rounded-md px-1 text-[15px] text-primary hover:underline">
      {children}
      <ChevronRight aria-hidden="true" className="size-4" />
    </Link>
  );
}

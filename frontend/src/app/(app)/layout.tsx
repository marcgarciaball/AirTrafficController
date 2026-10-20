import { Logo } from "@/components/ui-torre/logo"
import { MainNav } from "@/components/ui-torre/main-nav"
import { RunningBar } from "@/components/ui-torre/running-bar"
import { ThemeToggle } from "@/components/ui-torre/theme-toggle"
import { createClient } from "@/lib/supabase/server"

type Open = { task_id: string | null; started_at: string; ended_at: string | null; paused_seconds: number; paused_at: string | null }

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data } = await supabase
    .from("study_sessions")
    .select("task_id, started_at, ended_at, paused_seconds, paused_at")
    .is("ended_at", null)
    .maybeSingle()
  const open = (data as Open | null) ?? null
  let title: string | null = null
  if (open?.task_id) {
    const { data: t } = await supabase.from("tasks").select("title").eq("id", open.task_id).maybeSingle()
    title = t?.title ?? null
  }
  return (
    <div className="flex min-h-dvh flex-col md:pl-60">
      {open ? <RunningBar session={open} title={title} /> : null}
      <header className="flex h-14 items-center justify-between px-5 md:hidden">
        <Logo />
        <ThemeToggle className="-mr-2" />
      </header>
      {/* Las páginas de lectura con índice lateral marcan data-wide para ganar ancho. */}
      <main className="mx-auto w-full max-w-4xl flex-1 px-5 pt-4 pb-28 sm:px-8 md:pt-14 md:pb-20 lg:has-[[data-wide]]:max-w-6xl">{children}</main>
      <MainNav />
    </div>
  )
}

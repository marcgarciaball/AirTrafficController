import { EcamPageNav } from "@/components/cockpit/ecam-page-nav"
import { RunningBar } from "@/components/cockpit/running-bar"
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
    <div className="flex min-h-dvh flex-col md:pl-20">
      {open ? <RunningBar session={open} title={title} /> : null}
      <header className="flex h-10 items-center border-b border-line px-4 md:hidden">
        <span className="font-mono text-sm tracking-wider text-foreground">TORRE</span>
      </header>
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 pt-5 pb-24 md:px-6 md:pt-8 md:pb-12">{children}</main>
      <EcamPageNav />
    </div>
  )
}

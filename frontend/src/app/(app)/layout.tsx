import { EcamPageNav } from "@/components/cockpit/ecam-page-nav"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col md:pl-20">
      <header className="flex h-10 items-center border-b border-line px-4 md:hidden">
        <span className="font-mono text-sm tracking-wider text-foreground">TORRE</span>
      </header>
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 pt-5 pb-24 md:px-6 md:pt-8 md:pb-12">{children}</main>
      <EcamPageNav />
    </div>
  )
}

import { BottomNav } from "@/components/bottom-nav"
import { UtcClock } from "@/components/atc/utc-clock"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col md:pl-20">
      <header className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur-[2px] supports-[backdrop-filter]:bg-background/85">
        <div className="mx-auto flex h-14 w-full max-w-xl items-center justify-between px-4 md:max-w-2xl md:px-6">
          <span className="flex items-baseline gap-3">
            <span className="font-mono text-sm font-medium tracking-[0.42em]">TORRE</span>
            <span aria-hidden="true" className="hidden font-mono text-[10px] tracking-[0.14em] text-muted-foreground sm:inline">
              ATC
            </span>
          </span>
          <UtcClock />
        </div>
      </header>
      <main className="mx-auto w-full max-w-xl flex-1 px-4 pt-6 pb-24 md:max-w-2xl md:px-6 md:pt-10 md:pb-12">
        {children}
      </main>
      <BottomNav />
    </div>
  )
}

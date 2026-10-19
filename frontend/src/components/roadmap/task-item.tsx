import { SourceLink } from "@/components/source-link"
import { VerificationBadge } from "@/components/verification-badge"
import type { TaskView } from "@/lib/roadmap/types"
import { TaskStatusSelect } from "./task-status-select"

export type SourceMap = Record<string, { url: string; title: string; consulted_on: string }>
export type LinkMap = Record<string, { source_id: string; role: string }[]>

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-sm border px-1.5 py-0.5 font-mono text-[10px] leading-4 uppercase tracking-[0.1em] text-muted-foreground">
      {children}
    </span>
  )
}

function LinkList({ title, items, sources }: { title: string; items: { source_id: string }[]; sources: SourceMap }) {
  const list = items.filter((l) => sources[l.source_id])
  if (list.length === 0) return null
  return (
    <div className="space-y-1">
      <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">{title}</p>
      <ul className="space-y-0.5">
        {list.map((l) => (
          <li key={l.source_id}>
            <SourceLink source={sources[l.source_id]} />
          </li>
        ))}
      </ul>
    </div>
  )
}

function TaskBody({ task, sources, links }: { task: TaskView; sources: SourceMap; links: LinkMap }) {
  const own = links[task.id] ?? []
  return (
    <div className="space-y-3 text-sm">
      <p className="leading-relaxed text-muted-foreground">{task.explanation}</p>
      {task.est_minutes ? (
        <p className="font-mono text-xs text-muted-foreground">estimación ~{task.est_minutes} min</p>
      ) : null}
      {task.source_id && sources[task.source_id] ? <SourceLink source={sources[task.source_id]} /> : null}
      <LinkList title="Enlaces oficiales" items={own.filter((l) => l.role === "oficial")} sources={sources} />
      <LinkList title="Enlaces recomendados" items={own.filter((l) => l.role === "recomendado")} sources={sources} />
      <VerificationBadge verified={task.verified} />
    </div>
  )
}

export function TaskItem({ task, sources, links }: { task: TaskView; sources: SourceMap; links: LinkMap }) {
  const hasChildren = task.children.length > 0
  const done = task.status === "hecha"
  return (
    <li className="rounded-sm border bg-card">
      <details className="group">
        <summary className="flex cursor-pointer list-none items-start gap-2 px-3.5 py-3 outline-none focus-visible:ring-3 focus-visible:ring-ring/50 [&::-webkit-details-marker]:hidden">
          <span aria-hidden="true" className="mt-0.5 font-mono text-xs text-muted-foreground transition-transform group-open:rotate-90">
            ▸
          </span>
          <span className="min-w-0 flex-1 space-y-1">
            <span className={`block text-[15px] leading-snug font-medium ${done ? "text-muted-foreground line-through" : ""}`}>
              {task.title}
            </span>
            <span className="flex flex-wrap gap-1.5">
              {task.recommended ? <Chip>Recomendada</Chip> : null}
              {hasChildren ? <Chip>{task.children.length} subtareas</Chip> : null}
              <Chip>{task.status.replace("_", " ")}</Chip>
              {task.blocked ? <Chip>Bloqueada</Chip> : null}
            </span>
          </span>
        </summary>
        <div className="space-y-4 border-t px-3.5 py-3">
          <TaskBody task={task} sources={sources} links={links} />
          {hasChildren ? (
            <ul className="space-y-2">
              {task.children.map((c) => (
                <TaskItem key={c.id} task={c} sources={sources} links={links} />
              ))}
            </ul>
          ) : (
            <TaskStatusSelect
              taskId={task.id}
              status={task.status}
              disabled={task.blocked}
              reason={task.blockedBy.join(", ")}
            />
          )}
        </div>
      </details>
    </li>
  )
}

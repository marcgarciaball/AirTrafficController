import { Annunciator } from "@/components/cockpit/annunciator"
import { MEMO_TONE, MemoMark, type MemoState } from "@/components/cockpit/memo"
import { Prose } from "@/components/cockpit/page-title"
import { TEXT } from "@/components/cockpit/tones"
import { SourceLink } from "@/components/source-link"
import { VerificationBadge } from "@/components/verification-badge"
import { cn } from "@/lib/utils"
import type { TaskView } from "@/lib/roadmap/types"
import { TaskStatusSelect } from "./task-status-select"

export type SourceMap = Record<string, { url: string; title: string; consulted_on: string }>
export type LinkMap = Record<string, { source_id: string; role: string }[]>

function stateOf(task: TaskView, nextId: string | null): MemoState {
  if (task.status === "hecha") return "hecho"
  if (task.blocked) return "bloqueado"
  if (task.id === nextId) return "siguiente"
  return "disponible"
}

function LinkList({ title, items, sources }: { title: string; items: { source_id: string }[]; sources: SourceMap }) {
  const list = items.filter((l) => sources[l.source_id])
  if (list.length === 0) return null
  return (
    <div className="space-y-1">
      <p className="text-xs uppercase tracking-wide text-foreground">{title}</p>
      <ul className="space-y-1">
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
    <div className="space-y-3">
      <Prose>{task.explanation}</Prose>
      {task.est_minutes ? (
        <p className="flex items-center gap-2 text-sm">
          <Annunciator tone="amber">Estimación</Annunciator>
          <span className="font-mono text-muted-foreground tabular-nums">~{task.est_minutes} MIN</span>
        </p>
      ) : null}
      {task.source_id && sources[task.source_id] ? <SourceLink source={sources[task.source_id]} /> : null}
      <LinkList title="Enlaces oficiales" items={own.filter((l) => l.role === "oficial")} sources={sources} />
      <LinkList title="Enlaces recomendados" items={own.filter((l) => l.role === "recomendado")} sources={sources} />
      <VerificationBadge verified={task.verified} />
    </div>
  )
}

/** Línea de MEMO desplegable: estado, título y, dentro, la explicación y el selector de estado. */
export function TaskItem({
  task,
  sources,
  links,
  nextId,
  depth = 0,
}: {
  task: TaskView
  sources: SourceMap
  links: LinkMap
  nextId: string | null
  depth?: number
}) {
  const hasChildren = task.children.length > 0
  const state = stateOf(task, nextId)
  const indent = depth > 0 ? "pl-9 sm:pl-10" : "pl-3 sm:pl-4"
  return (
    <li>
      <details className="group">
        <summary
          className={cn(
            "flex min-h-11 cursor-pointer list-none items-start gap-3 py-2.5 pr-3 hover:bg-surface sm:pr-4 [&::-webkit-details-marker]:hidden",
            indent
          )}
        >
          <MemoMark state={state} />
          <span className="min-w-0 flex-1 space-y-1">
            <span className={cn("block leading-snug", TEXT[MEMO_TONE[state]])}>{task.title}</span>
            {state === "bloqueado" && task.blockedBy.length > 0 ? (
              <span className="block text-sm text-amber">Requiere: {task.blockedBy.join(", ")}</span>
            ) : null}
            <span className="flex flex-wrap gap-1.5 empty:hidden">
              {task.recommended ? <Annunciator tone="white">Recomendada</Annunciator> : null}
              {task.status === "en_curso" ? <Annunciator tone="green">En curso</Annunciator> : null}
              {!task.verified ? <Annunciator tone="amber">Pdte verificar</Annunciator> : null}
              {hasChildren ? (
                <span className="font-mono text-xs leading-5 text-muted-foreground tabular-nums">
                  {task.children.filter((c) => c.status === "hecha").length}/{task.children.length} SUBTAREAS
                </span>
              ) : null}
            </span>
          </span>
          <span aria-hidden="true" className="shrink-0 font-mono text-cyan group-open:rotate-90">
            ›
          </span>
        </summary>
        <div className={cn("space-y-4 pr-3 pb-4 sm:pr-4", depth > 0 ? "pl-16" : "pl-10 sm:pl-11")}>
          <TaskBody task={task} sources={sources} links={links} />
          {hasChildren ? null : (
            <TaskStatusSelect taskId={task.id} status={task.status} disabled={task.blocked} reason={task.blockedBy.join(", ")} />
          )}
        </div>
        {hasChildren ? (
          <ul className="divide-y divide-line border-t border-line">
            {task.children.map((c) => (
              <TaskItem key={c.id} task={c} sources={sources} links={links} nextId={nextId} depth={depth + 1} />
            ))}
          </ul>
        ) : null}
      </details>
    </li>
  )
}

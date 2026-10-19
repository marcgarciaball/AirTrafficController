import { StatusChip } from "@/components/ui-torre/status-chip"
import { ChecklistMark, ROW_HOVER, type ChecklistState } from "@/components/ui-torre/checklist"
import { Prose } from "@/components/ui-torre/page-header"
import { ChevronDown } from "lucide-react"
import { SourceLink } from "@/components/source-link"
import { VerificationBadge } from "@/components/verification-badge"
import { cn } from "@/lib/utils"
import type { TaskView } from "@/lib/roadmap/types"
import { TaskStatusSelect } from "./task-status-select"

export type SourceMap = Record<string, { url: string; title: string; consulted_on: string }>
export type LinkMap = Record<string, { source_id: string; role: string }[]>

function stateOf(task: TaskView, nextId: string | null): ChecklistState {
  if (task.status === "hecha") return "hecho"
  if (task.blocked) return "bloqueado"
  if (task.id === nextId) return "siguiente"
  return "disponible"
}

function LinkList({ title, items, sources }: { title: string; items: { source_id: string }[]; sources: SourceMap }) {
  const list = items.filter((l) => sources[l.source_id])
  if (list.length === 0) return null
  return (
    <div className="space-y-1.5">
      <p className="text-sm font-bold text-foreground">{title}</p>
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
    <div className="space-y-4">
      <Prose>{task.explanation}</Prose>
      {task.est_minutes ? (
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <StatusChip tone="warning">estimación</StatusChip>
          unos {task.est_minutes} minutos
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
  const indent = depth > 0 ? "pl-14 sm:pl-15" : "pl-5 sm:pl-6"
  return (
    <li>
      <details className="group">
        <summary
          className={cn(
            "flex min-h-14 cursor-pointer list-none items-start gap-4 py-4 pr-5 sm:pr-6 [&::-webkit-details-marker]:hidden",
            ROW_HOVER,
            indent
          )}
        >
          <ChecklistMark state={state} />
          <span className="min-w-0 flex-1 space-y-1">
            <span className={cn("block leading-snug", state === "bloqueado" ? "text-muted-foreground" : "text-foreground", state === "siguiente" && "font-bold")}>{task.title}</span>
            {state === "siguiente" ? <span className="block text-sm text-guide">Lo siguiente que te toca</span> : null}
            {state === "bloqueado" && task.blockedBy.length > 0 ? (
              <span className="block text-sm text-warning">Antes necesitas: {task.blockedBy.join(", ")}</span>
            ) : null}
            <span className="flex flex-wrap items-center gap-2 pt-0.5 empty:hidden">
              {task.recommended ? <StatusChip tone="primary">recomendada</StatusChip> : null}
              {task.status === "en_curso" ? <StatusChip tone="success">en curso</StatusChip> : null}
              {!task.verified ? <StatusChip tone="warning">pendiente de verificar</StatusChip> : null}
              {hasChildren ? (
                <span className="text-sm text-muted-foreground">
                  {task.children.filter((c) => c.status === "hecha").length} de {task.children.length} subtareas
                </span>
              ) : null}
            </span>
          </span>
          <ChevronDown aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
        </summary>
        <div className={cn("space-y-5 pr-5 pb-6 sm:pr-6", depth > 0 ? "pl-23 sm:pl-24" : "pl-14 sm:pl-15")}>
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

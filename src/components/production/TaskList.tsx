import {
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  Clock,
  Flame,
  PlayCircle,
  Snowflake,
  SprayCan,
  Store,
} from "lucide-react";
import { useState } from "react";
import type { ActionKind, Task } from "@/lib/production-data";
import { cn } from "@/lib/utils";

const styles: Record<
  ActionKind,
  { icon: typeof Flame; bg: string; rail: string; soft: string; text: string }
> = {
  "forno-entrada": { icon: Flame, bg: "bg-oven", rail: "bg-oven", soft: "bg-oven-soft", text: "text-oven" },
  "forno-saida": { icon: Flame, bg: "bg-urgent", rail: "bg-urgent", soft: "bg-urgent-soft", text: "text-urgent" },
  camara: { icon: Snowflake, bg: "bg-cold", rail: "bg-cold", soft: "bg-cold-soft", text: "text-cold" },
  balcao: { icon: Store, bg: "bg-counter", rail: "bg-counter", soft: "bg-counter-soft", text: "text-counter" },
  preparo: { icon: ArrowUpRight, bg: "bg-prep", rail: "bg-prep", soft: "bg-prep-soft", text: "text-prep" },
  higiene: { icon: SprayCan, bg: "bg-muted-foreground", rail: "bg-border", soft: "bg-muted", text: "text-muted-foreground" },
};

export function TaskList({ tasks, onComplete }: { tasks: Task[]; onComplete: (t: Task) => void }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? tasks : tasks.slice(0, 4);

  return (
    <section aria-labelledby="proximas" className="flex min-h-0 flex-col">
      <div className="mb-2 flex items-center gap-2">
        <Clock className="h-5 w-5 shrink-0 text-muted-foreground" />
        <h2 id="proximas" className="text-lg font-extrabold tracking-tight uppercase">
          Próximas atividades
        </h2>
      </div>

      <ul className="flex flex-col gap-2">
        {visible.map((task) => {
          const s = styles[task.kind];
          const Icon = s.icon;
          return (
            <li
              key={task.id}
              className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 overflow-hidden rounded-xl bg-surface pr-3 shadow-card sm:grid-cols-[auto_auto_minmax(0,1fr)_auto]"
            >
              <div className={cn("flex h-full items-center gap-2 py-3 pl-3", s.soft)}>
                <span className={cn("h-10 w-1 rounded-full", s.rail)} />
                <div className="text-center">
                  <p className={cn("text-lg leading-none font-black tabular-nums", s.text)}>
                    {task.minutes}
                  </p>
                  <p className="text-[9px] font-bold tracking-wider text-muted-foreground uppercase">
                    minutos
                  </p>
                </div>
              </div>

              <div className={cn("hidden h-10 w-10 shrink-0 place-items-center rounded-full sm:grid", s.bg)}>
                <Icon className="h-5 w-5 text-urgent-foreground" />
              </div>

              <div className="min-w-0 py-2">
                <p className="truncate text-sm font-extrabold tracking-tight uppercase">{task.title}</p>
                {task.cart ? (
                  <p className="truncate text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground">{task.cart}</span> • {task.units}{" "}
                    unidades
                  </p>
                ) : null}
                <p className="truncate text-xs text-muted-foreground">{task.product ?? task.note}</p>
              </div>

              <button
                onClick={() => onComplete(task)}
                className={cn(
                  "col-span-2 mb-3 inline-flex items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-[11px] font-bold uppercase transition-colors sm:col-span-1 sm:mb-0 sm:w-32",
                  s.soft,
                  s.text,
                  "border-current/20 hover:brightness-95",
                )}
              >
                {task.kind === "preparo" || task.kind === "forno-entrada" ? (
                  <PlayCircle className="h-4 w-4 shrink-0" />
                ) : (
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                )}
                <span className="truncate">{task.cta}</span>
              </button>
            </li>
          );
        })}
      </ul>

      {tasks.length > 4 ? (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="mx-auto mt-2 inline-flex items-center gap-1.5 rounded-lg bg-surface px-4 py-2 text-[11px] font-bold text-muted-foreground uppercase shadow-card"
        >
          {expanded ? "Ver menos" : "Ver todas as atividades"}
          <ChevronDown className={cn("h-4 w-4 transition-transform", expanded && "rotate-180")} />
        </button>
      ) : null}
    </section>
  );
}

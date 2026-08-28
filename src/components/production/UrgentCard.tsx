import { Bell, CheckCircle2, Lightbulb, Timer } from "lucide-react";
import { urgentTask } from "@/lib/production-data";

export function UrgentCard({ onDone }: { onDone: () => void }) {
  return (
    <section aria-labelledby="faca-agora">
      <div className="mb-2 flex items-baseline gap-2">
        <Bell className="h-5 w-5 shrink-0 text-urgent" />
        <h2 id="faca-agora" className="text-lg font-extrabold tracking-tight text-urgent uppercase">
          Faça agora
        </h2>
        <p className="hidden text-xs text-muted-foreground sm:block">
          Esta é sua prioridade no momento
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border-2 border-urgent bg-urgent shadow-card">
        <div className="grid grid-cols-[minmax(0,1fr)] sm:grid-cols-[9rem_minmax(0,1fr)] lg:grid-cols-[11rem_minmax(0,1fr)]">
          <div className="flex flex-row items-center justify-center gap-3 px-4 py-3 text-urgent-foreground sm:flex-col sm:py-8">
            <Timer className="h-9 w-9 shrink-0 sm:h-14 sm:w-14" strokeWidth={1.5} />
            <div className="text-center">
              <p className="text-xl leading-none font-black sm:text-3xl">TIRE DO FORNO</p>
              <p className="mt-1 text-[11px] font-bold tracking-[0.12em] text-oven-soft uppercase">
                Ação urgente
              </p>
            </div>
          </div>

          <div className="bg-surface p-4 sm:p-5">
            <p className="text-3xl leading-none font-black tracking-tight sm:text-5xl">
              {urgentTask.cart}
            </p>
            <p className="mt-2 text-sm font-semibold sm:text-base">
              {urgentTask.product} <span className="text-muted-foreground">•</span> {urgentTask.units}{" "}
              <span className="font-medium text-muted-foreground">unidades</span>
            </p>

            <div className="mt-3 flex items-center gap-3 rounded-xl bg-urgent-soft px-4 py-2.5">
              <Timer className="h-6 w-6 shrink-0 text-urgent" />
              <div>
                <p className="text-[10px] font-bold tracking-[0.14em] text-urgent uppercase">
                  Atrasado
                </p>
                <p className="text-2xl leading-none font-black text-urgent tabular-nums sm:text-3xl">
                  {urgentTask.lateBy}
                </p>
              </div>
            </div>

            <p className="mt-3 flex items-start gap-2 border-t border-border pt-3 text-xs text-muted-foreground">
              <Lightbulb className="mt-px h-4 w-4 shrink-0 text-oven" />
              {urgentTask.hint}
            </p>
          </div>
        </div>

        <button
          onClick={onDone}
          className="flex w-full items-center justify-center gap-3 bg-urgent px-4 py-4 text-lg font-black tracking-wide text-urgent-foreground uppercase transition-opacity hover:opacity-90 active:opacity-80 sm:text-2xl"
        >
          <CheckCircle2 className="h-7 w-7 shrink-0" />
          Retirei do forno
        </button>
      </div>
    </section>
  );
}

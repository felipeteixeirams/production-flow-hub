import { ChefHat, Clock, LogOut, RefreshCw, Wifi } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  operator: string;
  clock: string;
  dateLabel: string;
  syncedAgo: string;
  onRefresh: () => void;
  onLogout: () => void;
};

export function TopBar({ operator, clock, dateLabel, syncedAgo, onRefresh, onLogout }: Props) {
  return (
    <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-2xl bg-surface px-4 py-3 shadow-card md:grid-cols-[minmax(0,1fr)_auto_auto] md:px-5">
      <div className="flex min-w-0 items-center gap-3">
        <ChefHat className="h-8 w-8 shrink-0 text-oven md:h-9 md:w-9" strokeWidth={1.6} />
        <div className="min-w-0">
          <p className="text-[10px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
            Assistente de produção
          </p>
          <h1 className="truncate text-lg leading-tight font-extrabold tracking-tight md:text-2xl">
            Meu dia — {operator}
          </h1>
        </div>
      </div>

      <div className="col-span-2 order-3 flex items-center gap-2 border-t border-border pt-2 md:order-none md:col-span-1 md:border-0 md:pt-0">
        <div className="flex items-center gap-2 md:flex-col md:gap-0">
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-xl font-bold tabular-nums md:text-2xl">{clock}</span>
          </div>
          <p className="text-[10px] font-medium tracking-wide text-muted-foreground uppercase">
            {dateLabel}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1.5">
        <span className="hidden items-center gap-1.5 rounded-full bg-success-soft px-2.5 py-1 text-[11px] font-semibold text-success sm:inline-flex">
          <Wifi className="h-3.5 w-3.5" />
          Sincronizado
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground"
          onClick={onRefresh}
          aria-label={`Atualizar (${syncedAgo})`}
          title={`Atualizar · ${syncedAgo}`}
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-urgent"
          onClick={onLogout}
          aria-label="Sair"
          title="Sair"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}

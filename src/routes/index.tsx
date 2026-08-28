import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { TopBar } from "@/components/production/TopBar";
import { UrgentCard } from "@/components/production/UrgentCard";
import { TaskList } from "@/components/production/TaskList";
import { QuickActions } from "@/components/production/QuickActions";
import { initialEquipment, initialTasks, type Equipment, type Task } from "@/lib/production-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Meu dia — Assistente de Produção da Padaria" },
      {
        name: "description",
        content:
          "Painel de tablet para operadores de padaria: prioridade do momento, próximas atividades, equipamentos, ocorrências e manutenção.",
      },
      { property: "og:title", content: "Meu dia — Assistente de Produção da Padaria" },
      {
        property: "og:description",
        content:
          "Acompanhe fornos, estufas e esqueletos, registre produção avulsa, ocorrências e manutenções direto do tablet.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [equipment, setEquipment] = useState<Equipment[]>(initialEquipment);
  const [clock, setClock] = useState("09:53");

  useEffect(() => {
    const tick = () =>
      setClock(
        new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      );
    tick();
    const id = setInterval(tick, 20000);
    return () => clearInterval(id);
  }, []);

  const dateLabel = new Date()
    .toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric", weekday: "long" })
    .toUpperCase();

  const updateEquipment = (id: string, patch: Partial<Equipment>) =>
    setEquipment((prev) => prev.map((e) => (e.id === id ? { ...e, ...patch } : e)));

  return (
    <main className="min-h-screen bg-background p-3 md:p-4">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-3">
        <TopBar
          operator="João"
          clock={clock}
          dateLabel={dateLabel}
          syncedAgo="Atualizado agora"
          onRefresh={() => toast.success("Dados sincronizados")}
          onLogout={() => toast("Operador desconectado", { description: "Sessão encerrada." })}
        />

        <div className="grid gap-3 lg:grid-cols-[1.1fr_1fr] lg:items-start">
          <UrgentCard
            onDone={() => toast.success("Carrinho 08 retirado do forno", { description: "465 un. de Pão Francês em resfriamento." })}
          />
          <TaskList
            tasks={tasks}
            onComplete={(task) => {
              setTasks((prev) => prev.filter((t) => t.id !== task.id));
              toast.success(task.cta, {
                description: [task.cart, task.product].filter(Boolean).join(" · ") || task.note,
              });
            }}
          />
        </div>

        <div className="grid gap-3 lg:grid-cols-[1.1fr_1fr] lg:items-start">
          <QuickActions equipment={equipment} onUpdateEquipment={updateEquipment} />
          <aside className="flex items-center gap-3 rounded-2xl bg-oven-soft px-4 py-3 shadow-card">
            <Star className="h-5 w-5 shrink-0 text-oven" />
            <div className="min-w-0">
              <p className="text-xs font-bold tracking-wide text-oven uppercase">Dica do dia</p>
              <p className="text-xs text-muted-foreground">
                Verifique sempre a validade dos ingredientes antes do preparo.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

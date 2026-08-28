import { useState } from "react";
import {
  AlertTriangle,
  Boxes,
  CheckCircle2,
  PlusCircle,
  Wrench,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import {
  occurrenceReasons,
  occurrenceTypes,
  productOptions,
  stageOptions,
  type Equipment,
} from "@/lib/production-data";

type Props = {
  equipment: Equipment[];
  onUpdateEquipment: (id: string, patch: Partial<Equipment>) => void;
};

const actions = [
  { key: "producao", label: "Produção avulsa", icon: PlusCircle, tone: "text-oven", soft: "bg-oven-soft" },
  { key: "equipamentos", label: "Equipamentos", icon: Boxes, tone: "text-cold", soft: "bg-cold-soft" },
  { key: "ocorrencia", label: "Ocorrência", icon: AlertTriangle, tone: "text-urgent", soft: "bg-urgent-soft" },
  { key: "manutencao", label: "Manutenção", icon: Wrench, tone: "text-counter", soft: "bg-counter-soft" },
] as const;

type ActionKey = (typeof actions)[number]["key"];

export function QuickActions({ equipment, onUpdateEquipment }: Props) {
  const [open, setOpen] = useState<ActionKey | null>(null);
  const close = () => setOpen(null);

  const inUse = equipment.filter((e) => e.status === "em-uso").length;
  const free = equipment.filter((e) => e.status === "livre").length;

  return (
    <>
      <section aria-label="Ações rápidas" className="rounded-2xl bg-surface p-3 shadow-card">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {actions.map((a) => (
            <button
              key={a.key}
              onClick={() => setOpen(a.key)}
              className="flex flex-col items-center justify-center gap-1.5 rounded-xl border border-border px-2 py-3 transition-colors hover:bg-muted"
            >
              <span className={cn("grid h-10 w-10 shrink-0 place-items-center rounded-full", a.soft)}>
                <a.icon className={cn("h-5 w-5", a.tone)} />
              </span>
              <span className="text-center text-[11px] leading-tight font-bold uppercase">
                {a.label}
              </span>
              {a.key === "equipamentos" ? (
                <span className="text-[10px] text-muted-foreground">
                  {inUse} em uso · {free} livres
                </span>
              ) : null}
            </button>
          ))}
        </div>
      </section>

      <ProducaoAvulsaDialog open={open === "producao"} onClose={close} equipment={equipment} />
      <OcorrenciaDialog open={open === "ocorrencia"} onClose={close} />
      <ManutencaoDialog
        open={open === "manutencao"}
        onClose={close}
        equipment={equipment}
        onUpdateEquipment={onUpdateEquipment}
      />
      <EquipamentosSheet open={open === "equipamentos"} onClose={close} equipment={equipment} />
    </>
  );
}

function ProducaoAvulsaDialog({
  open,
  onClose,
  equipment,
}: {
  open: boolean;
  onClose: () => void;
  equipment: Equipment[];
}) {
  const [product, setProduct] = useState("");
  const [units, setUnits] = useState("");
  const [stage, setStage] = useState("");
  const [equip, setEquip] = useState("");
  const free = equipment.filter((e) => e.status !== "manutencao");

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Produção avulsa</DialogTitle>
          <DialogDescription>Registre um lote fora do plano do dia.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Produto">
            <Picker value={product} onChange={setProduct} options={productOptions} placeholder="Selecione" />
          </Field>
          <Field label="Quantidade (un.)">
            <Input
              inputMode="numeric"
              value={units}
              onChange={(e) => setUnits(e.target.value.replace(/\D/g, ""))}
              placeholder="Ex.: 240"
            />
          </Field>
          <Field label="Etapa inicial">
            <Picker value={stage} onChange={setStage} options={stageOptions} placeholder="Selecione" />
          </Field>
          <Field label="Equipamento">
            <Picker
              value={equip}
              onChange={setEquip}
              options={free.map((e) => `${e.name}${e.status === "livre" ? " (livre)" : " (em uso)"}`)}
              placeholder="Selecione"
            />
          </Field>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            disabled={!product || !units || !stage || !equip}
            onClick={() => {
              toast.success("Produção avulsa registrada", {
                description: `${units} un. de ${product} · ${stage} · ${equip}`,
              });
              setProduct("");
              setUnits("");
              setStage("");
              setEquip("");
              onClose();
            }}
          >
            Registrar produção
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function OcorrenciaDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [type, setType] = useState("");
  const [reason, setReason] = useState("");
  const [product, setProduct] = useState("");
  const [units, setUnits] = useState("");
  const [note, setNote] = useState("");

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Registrar ocorrência</DialogTitle>
          <DialogDescription>Descarte, ruptura ou exceção na produção.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Tipo">
            <Picker value={type} onChange={setType} options={occurrenceTypes} placeholder="Selecione" />
          </Field>
          <Field label="Motivo">
            <Picker value={reason} onChange={setReason} options={occurrenceReasons} placeholder="Selecione" />
          </Field>
          <Field label="Produto">
            <Picker value={product} onChange={setProduct} options={productOptions} placeholder="Selecione" />
          </Field>
          <Field label="Quantidade (un.)">
            <Input
              inputMode="numeric"
              value={units}
              onChange={(e) => setUnits(e.target.value.replace(/\D/g, ""))}
              placeholder="Ex.: 30"
            />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Observação (opcional)">
              <Textarea value={note} onChange={(e) => setNote(e.target.value)} rows={2} />
            </Field>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            variant="destructive"
            disabled={!type || !reason || !product}
            onClick={() => {
              toast.success("Ocorrência registrada", {
                description: `${type} · ${reason} · ${product}${units ? ` · ${units} un.` : ""}`,
              });
              setType("");
              setReason("");
              setProduct("");
              setUnits("");
              setNote("");
              onClose();
            }}
          >
            Registrar ocorrência
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ManutencaoDialog({
  open,
  onClose,
  equipment,
  onUpdateEquipment,
}: Props & { open: boolean; onClose: () => void }) {
  const [id, setId] = useState("");
  const [reason, setReason] = useState("");
  const selected = equipment.find((e) => e.id === id);
  const isSuspended = selected?.status === "manutencao";

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Manutenção de equipamento</DialogTitle>
          <DialogDescription>
            Suspenda um equipamento ou registre a volta dele à operação.
          </DialogDescription>
        </DialogHeader>

        <Field label="Equipamento">
          <Select value={id} onValueChange={setId}>
            <SelectTrigger className="h-11">
              <SelectValue placeholder="Selecione o equipamento" />
            </SelectTrigger>
            <SelectContent>
              {equipment.map((e) => (
                <SelectItem key={e.id} value={e.id}>
                  {e.name} — {e.status === "manutencao" ? "em manutenção" : e.status === "em-uso" ? "em uso" : "livre"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        {selected && !isSuspended ? (
          <Field label="Motivo da suspensão">
            <Textarea
              rows={2}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Ex.: resistência queimada"
            />
          </Field>
        ) : null}

        {isSuspended ? (
          <p className="rounded-lg bg-counter-soft px-3 py-2 text-sm text-counter">
            Suspenso por: {selected?.reason ?? "não informado"}
          </p>
        ) : null}

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            disabled={!selected || (!isSuspended && !reason)}
            onClick={() => {
              if (!selected) return;
              if (isSuspended) {
                onUpdateEquipment(selected.id, { status: "livre", reason: undefined });
                toast.success(`${selected.name} voltou à operação`);
              } else {
                onUpdateEquipment(selected.id, {
                  status: "manutencao",
                  reason,
                  product: undefined,
                  units: undefined,
                  stage: undefined,
                });
                toast.success(`${selected.name} suspenso para manutenção`, { description: reason });
              }
              setId("");
              setReason("");
              onClose();
            }}
          >
            {isSuspended ? "Voltar à operação" : "Suspender equipamento"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function EquipamentosSheet({
  open,
  onClose,
  equipment,
}: {
  open: boolean;
  onClose: () => void;
  equipment: Equipment[];
}) {
  const groups = ["Forno", "Estufa", "Esqueleto"] as const;

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>Equipamentos</SheetTitle>
          <SheetDescription>Situação atual de fornos, estufas e esqueletos.</SheetDescription>
        </SheetHeader>

        <div className="space-y-5 px-4 pb-8">
          {groups.map((g) => {
            const list = equipment.filter((e) => e.type === g);
            return (
              <div key={g}>
                <p className="mb-2 text-xs font-bold tracking-wider text-muted-foreground uppercase">
                  {g}s ({list.filter((e) => e.status === "em-uso").length}/{list.length} em uso)
                </p>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {list.map((e) => (
                    <li
                      key={e.id}
                      className={cn(
                        "rounded-xl border border-border p-3",
                        e.status === "em-uso" && "bg-oven-soft/60",
                        e.status === "livre" && "bg-success-soft/60",
                        e.status === "manutencao" && "bg-counter-soft/60",
                      )}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate text-sm font-extrabold">{e.name}</p>
                        <span
                          className={cn(
                            "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase",
                            e.status === "em-uso" && "bg-oven text-urgent-foreground",
                            e.status === "livre" && "bg-success text-urgent-foreground",
                            e.status === "manutencao" && "bg-counter text-urgent-foreground",
                          )}
                        >
                          {e.status === "em-uso" ? "Em uso" : e.status === "livre" ? "Livre" : "Manutenção"}
                        </span>
                      </div>
                      {e.status === "em-uso" ? (
                        <div className="mt-1.5 text-xs text-muted-foreground">
                          <p className="font-semibold text-foreground">
                            {e.units} un. · {e.product}
                          </p>
                          <p>
                            {e.stage} · desde {e.since}
                          </p>
                        </div>
                      ) : e.status === "manutencao" ? (
                        <p className="mt-1.5 text-xs text-muted-foreground">{e.reason}</p>
                      ) : (
                        <p className="mt-1.5 flex items-center gap-1 text-xs text-success">
                          <CheckCircle2 className="h-3.5 w-3.5" /> Disponível para uso
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-semibold tracking-wide uppercase">{label}</Label>
      {children}
    </div>
  );
}

function Picker({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
  placeholder: string;
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="h-11 w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((o) => (
          <SelectItem key={o} value={o}>
            {o}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

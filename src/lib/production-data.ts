export type Stage =
  | "Descongelamento"
  | "Esqueleto"
  | "Fermentação"
  | "Assando"
  | "Resfriamento"
  | "Balcão";

export type ActionKind = "forno-entrada" | "forno-saida" | "camara" | "balcao" | "preparo" | "higiene";

export type Task = {
  id: string;
  kind: ActionKind;
  title: string;
  cart?: string;
  units?: number;
  product?: string;
  note?: string;
  minutes: string;
  cta: string;
};

export type EquipmentType = "Esqueleto" | "Estufa" | "Forno";

export type Equipment = {
  id: string;
  name: string;
  type: EquipmentType;
  status: "em-uso" | "livre" | "manutencao";
  product?: string;
  units?: number;
  stage?: Stage;
  since?: string;
  reason?: string;
};

export type LogEntry = {
  id: string;
  at: string;
  label: string;
  detail: string;
  tone: "urgent" | "success" | "neutral";
};

export const urgentTask = {
  cart: "CARRINHO 08",
  product: "PÃO FRANCÊS",
  units: 465,
  lateBy: "01:58",
  hint: "Retire o carrinho do forno e leve para a área de resfriamento.",
};

export const initialTasks: Task[] = [
  {
    id: "t1",
    kind: "forno-entrada",
    title: "COLOQUE NO FORNO",
    cart: "CARRINHO 11",
    units: 278,
    product: "Pão de Queijo",
    minutes: "00:04",
    cta: "Coloquei no forno",
  },
  {
    id: "t2",
    kind: "camara",
    title: "RETIRE DA CÂMARA FRIA",
    cart: "CARRINHO 03",
    units: 80,
    product: "Croissant",
    minutes: "03:25",
    cta: "Retirei da câmara",
  },
  {
    id: "t3",
    kind: "balcao",
    title: "LEVE PARA O BALCÃO",
    cart: "CARRINHO 05",
    units: 200,
    product: "Pão Francês",
    minutes: "08:40",
    cta: "Levei pro balcão",
  },
  {
    id: "t4",
    kind: "preparo",
    title: "PREPARE O PRÓXIMO LOTE",
    cart: "CARRINHO 12",
    units: 300,
    product: "Pão Integral",
    minutes: "12:15",
    cta: "Iniciar preparo",
  },
  {
    id: "t5",
    kind: "higiene",
    title: "HIGIENIZAÇÃO",
    note: "Equipamentos do forno · Após o último lote",
    minutes: "18:30",
    cta: "Ver orientações",
  },
];

export const initialEquipment: Equipment[] = [
  { id: "e1", name: "Forno 01", type: "Forno", status: "em-uso", product: "Pão Francês", units: 465, stage: "Assando", since: "09:41" },
  { id: "e2", name: "Forno 02", type: "Forno", status: "livre" },
  { id: "e3", name: "Forno 03", type: "Forno", status: "manutencao", reason: "Resistência queimada" },
  { id: "e4", name: "Estufa 01", type: "Estufa", status: "em-uso", product: "Pão de Queijo", units: 278, stage: "Fermentação", since: "09:20" },
  { id: "e5", name: "Estufa 02", type: "Estufa", status: "em-uso", product: "Croissant", units: 80, stage: "Descongelamento", since: "08:55" },
  { id: "e6", name: "Estufa 03", type: "Estufa", status: "livre" },
  { id: "e7", name: "Esqueleto 05", type: "Esqueleto", status: "em-uso", product: "Pão Francês", units: 200, stage: "Esqueleto", since: "09:32" },
  { id: "e8", name: "Esqueleto 08", type: "Esqueleto", status: "em-uso", product: "Pão Integral", units: 300, stage: "Esqueleto", since: "09:44" },
  { id: "e9", name: "Esqueleto 11", type: "Esqueleto", status: "livre" },
  { id: "e10", name: "Esqueleto 12", type: "Esqueleto", status: "livre" },
];

export const productOptions = [
  "Pão Francês",
  "Pão de Queijo",
  "Croissant",
  "Pão Integral",
  "Bisnaguinha",
  "Sonho",
];

export const stageOptions: Stage[] = [
  "Descongelamento",
  "Esqueleto",
  "Fermentação",
  "Assando",
  "Resfriamento",
  "Balcão",
];

export const occurrenceTypes = ["Descarte", "Ruptura", "Exceção"];

export const occurrenceReasons = [
  "Queima no forno",
  "Falta de insumo",
  "Falha de energia",
  "Contaminação",
  "Produto fora do padrão",
  "Queda de demanda",
  "Outro",
];

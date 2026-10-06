import type { OrderLine } from "./order-rules";
export type OrderStatus =
  | "Pendiente"
  | "Aceptado"
  | "Preparando"
  | "Listo"
  | "En camino"
  | "Entregado"
  | "Cancelado";
export type BusinessStatus = "Abierto" | "Pausado" | "Cerrado";

export const flavors = [
  "Habanero",
  "Habanero parmesano",
  "Mango habanero",
  "Piña habanero",
  "Salsa brava",
  "Valentina",
  "Tajín",
  "Valentina ranch",
  "Buffalo",
  "BBQ chipotle",
  "BBQ",
  "Lemon pepper",
  "Parmesano",
];

export const menuItems = [
  {
    name: "Alitas",
    detail: "Orden completa · 10 piezas",
    price: 170,
    pieces: 10,
    maxFlavors: 3,
    ranchIncluded: true,
    active: true,
  },
  {
    name: "Alitas",
    detail: "Media orden · 5 piezas",
    price: 95,
    pieces: 5,
    maxFlavors: 2,
    ranchIncluded: true,
    active: true,
  },
  {
    name: "Boneless",
    detail: "Orden completa · 17 piezas",
    price: 170,
    pieces: 17,
    maxFlavors: 3,
    ranchIncluded: true,
    active: true,
  },
  {
    name: "Boneless",
    detail: "Media orden · 8 piezas",
    price: 95,
    pieces: 8,
    maxFlavors: 2,
    ranchIncluded: true,
    active: true,
  },
  {
    name: "Bolipapas",
    detail: "Papas + 8 boneless",
    price: 165,
    pieces: 8,
    maxFlavors: 2,
    ranchIncluded: false,
    active: true,
  },
  {
    name: "Papas a la francesa",
    detail: "Porción",
    price: 50,
    pieces: 0,
    maxFlavors: 0,
    ranchIncluded: false,
    active: true,
  },
  {
    name: "Papas gajo",
    detail: "Porción",
    price: 60,
    pieces: 0,
    maxFlavors: 0,
    ranchIncluded: false,
    active: false,
  },
];

export type Order = {
  id: string;
  customer: string;
  phone?: string;
  channel: "WhatsApp" | "Manual" | "Llamada";
  mode: "Domicilio" | "Recoger";
  summary: string;
  total: number;
  status: OrderStatus;
  payment: "Pendiente" | "Efectivo" | "Transferencia";
  received?: boolean;
  address?: string;
  issue?: string;
  time: string;
  elapsed: string;
  estimatedMinutes?: number;
  lines?: OrderLine[];
  cashTendered?: number;
  createdAt?: string;
  acceptedAt?: string;
};

export const demoOrders: Order[] = [
  {
    id: "BF-1042",
    customer: "Mariana López",
    phone: "—",
    channel: "WhatsApp",
    mode: "Domicilio",
    summary: "10 alitas · BBQ, Parmesano + ranch",
    total: 180,
    status: "Pendiente",
    payment: "Efectivo",
    address: "Callejón del Sol #18, frente a la plaza",
    issue: "Esperando confirmación",
    time: "12:42",
    elapsed: "hace 8 min",
  },
  {
    id: "BF-1041",
    customer: "Carlos Ruiz",
    phone: "—",
    channel: "WhatsApp",
    mode: "Domicilio",
    summary: "17 boneless · Mango habanero + papas",
    total: 220,
    status: "Pendiente",
    payment: "Efectivo",
    address: "En casa de Matías",
    issue: "Ubicación por aclarar",
    time: "12:28",
    elapsed: "hace 22 min",
  },
  {
    id: "BF-1040",
    customer: "Sofía Martínez",
    channel: "Manual",
    mode: "Recoger",
    summary: "2 medias alitas · Buffalo + BBQ",
    total: 200,
    status: "Preparando",
    payment: "Transferencia",
    time: "12:11",
    elapsed: "hace 39 min",
  },
  {
    id: "BF-1039",
    customer: "Diego Hernández",
    channel: "WhatsApp",
    mode: "Recoger",
    summary: "Bolipapas + queso amarillo",
    total: 175,
    status: "Listo",
    payment: "Efectivo",
    issue: "Cambio de $500",
    time: "11:56",
    elapsed: "hace 54 min",
  },
  {
    id: "BF-1038",
    customer: "Ana Pérez",
    channel: "WhatsApp",
    mode: "Domicilio",
    summary: "Orden alitas · Habanero parmesano",
    total: 170,
    status: "En camino",
    payment: "Efectivo",
    address: "Calle Juárez #5",
    time: "11:32",
    elapsed: "hace 1 h 18 min",
  },
  {
    id: "BF-1037",
    customer: "Luis Torres",
    channel: "Manual",
    mode: "Recoger",
    summary: "Papas a la francesa",
    total: 50,
    status: "Entregado",
    payment: "Efectivo",
    received: true,
    time: "10:45",
    elapsed: "hace 2 h 5 min",
  },
  {
    id: "BF-1036",
    customer: "Valeria Cruz",
    channel: "WhatsApp",
    mode: "Domicilio",
    summary: "Media orden boneless · BBQ",
    total: 95,
    status: "Cancelado",
    payment: "Transferencia",
    issue: "Devolución pendiente",
    time: "10:12",
    elapsed: "hace 2 h 38 min",
  },
];

export const money = (value: number) => `$${value.toLocaleString("es-MX")}`;
export const statusTone = (status: OrderStatus) =>
  ({
    Pendiente: "amber",
    Aceptado: "blue",
    Preparando: "orange",
    Listo: "green",
    "En camino": "purple",
    Entregado: "slate",
    Cancelado: "rose",
  })[status] || "slate";
export const nextStatus = (
  status: OrderStatus,
  mode: Order["mode"],
): OrderStatus | null => {
  const flow: OrderStatus[] =
    mode === "Recoger"
      ? ["Aceptado", "Preparando", "Listo", "Entregado"]
      : ["Aceptado", "Preparando", "Listo", "En camino", "Entregado"];
  const index = flow.indexOf(status);
  return index >= 0 && index < flow.length - 1 ? flow[index + 1] : null;
};

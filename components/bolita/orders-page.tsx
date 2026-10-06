"use client";

import {
type Order
} from "@/lib/bolita-data";
import {
Check,
Clock3,
Package,
Plus,
Search,
Truck,
Utensils
} from "lucide-react";

import { OrderCard } from "./order-card";
import { OrderDetail } from "./order-detail";

export function OrdersPage({
  orders,
  filtered,
  selected,
  setSelected,
  updateOrder,
  filter,
  setFilter,
  search,
  setSearch,
  onNew,
}: {
  orders: Order[];
  filtered: Order[];
  selected: Order | null;
  setSelected: (order: Order) => void;
  updateOrder: (id: string, patch: Partial<Order>) => void;
  filter: string;
  setFilter: (value: string) => void;
  search: string;
  setSearch: (value: string) => void;
  onNew: () => void;
}) {
  const counts = {
    pending: orders.filter((o: Order) => o.status === "Pendiente").length,
    prep: orders.filter((o: Order) => o.status === "Preparando").length,
    ready: orders.filter((o: Order) =>
      ["Listo", "En camino"].includes(o.status),
    ).length,
    done: orders.filter((o: Order) => o.status === "Entregado").length,
  };
  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-5 flex items-end justify-between gap-3 lg:hidden">
        <div>
          <p className="text-sm text-[#8a7769]">
            {new Intl.DateTimeFormat("es-MX", {
              dateStyle: "full",
              timeZone: "America/Mexico_City",
            }).format(new Date())}
          </p>
          <h1 className="text-2xl font-bold">Pedidos</h1>
        </div>
        <button
          onClick={onNew}
          className="grid size-11 place-items-center rounded-xl bg-[#a44760] text-white"
          aria-label="Nuevo pedido"
        >
          <Plus />
        </button>
      </div>
      <section className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        {(
          [
            [
              "Pendientes de confirmación",
              counts.pending,
              Clock3,
              "text-[#bd761a]",
            ],
            ["En preparación", counts.prep, Utensils, "text-[#da6925]"],
            ["Listos o en camino", counts.ready, Truck, "text-[#6c4ba0]"],
            ["Entregados hoy", counts.done, Check, "text-[#29814a]"],
          ] as const
        ).map(([label, count, Icon, color]) => (
          <div
            key={label as string}
            className="rounded-2xl border border-[#eadfd4] bg-white p-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#8d7b6d]">
                {label as string}
              </span>
              <Icon className={`size-4 ${color}`} />
            </div>
            <div className="mt-2 text-2xl font-bold">{count as number}</div>
          </div>
        ))}
      </section>
      <div className="mt-7 grid gap-6 xl:grid-cols-[minmax(0,1fr)_410px]">
        <section>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex gap-1 rounded-xl bg-[#f3ebe4] p-1">
              {["Pendientes", "En curso", "Finalizados", "Todos"].map(
                (item) => (
                  <button
                    key={item}
                    onClick={() => setFilter(item)}
                    className={`min-h-10 rounded-lg px-3 text-xs font-semibold ${filter === item ? "bg-white text-[#a44760] shadow-sm" : "text-[#857467]"}`}
                  >
                    {item}
                  </button>
                ),
              )}
            </div>
            <div className="relative w-full sm:w-56">
              <Search className="absolute left-3 top-3 size-4 text-[#9e8d80]" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar pedido..."
                className="h-10 w-full rounded-xl border border-[#e0d3c8] bg-white pl-9 pr-3 text-sm outline-none focus:border-[#a44760]"
              />
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-3">
            {filtered.map((order: Order) => (
              <OrderCard
                key={order.id}
                order={order}
                active={selected?.id === order.id}
                onClick={() => setSelected(order)}
              />
            ))}
            {!filtered.length && (
              <div className="rounded-2xl border border-dashed border-[#ddcec0] bg-white p-10 text-center">
                <Package className="mx-auto size-8 text-[#c8b6a7]" />
                <p className="mt-3 font-semibold">No hay pedidos aquí</p>
                <p className="mt-1 text-sm text-[#8d7b6d]">
                  Prueba otro filtro o búsqueda.
                </p>
              </div>
            )}
          </div>
        </section>
        <OrderDetail
          key={selected?.id}
          order={selected}
          updateOrder={updateOrder}
        />
      </div>
    </div>
  );
}

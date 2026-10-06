"use client";

import { Button } from "@/components/ui/button";
import {
demoOrders,
type BusinessStatus,
type Order
} from "@/lib/bolita-data";
import {
ChevronRight,
MoreHorizontal,
Plus,
ShoppingBag,
Store,
Utensils,
Zap
} from "lucide-react";
import { useEffect,useMemo,useState } from "react";

import type { MorePage as MorePageType,Page } from "@/lib/bolita-types";
import { Brand } from "./bolita/brand";
import { BusinessPage } from "./bolita/business-page";
import { MenuPage } from "./bolita/menu-page";
import { MorePage } from "./bolita/more-page";
import { NavButton } from "./bolita/nav-button";
import { NewOrderDialog } from "./bolita/new-order-dialog";
import { OrdersPage } from "./bolita/orders-page";
import { StatusDialog } from "./bolita/status-dialog";

export default function BolitaFoodApp() {
  const [page, setPage] = useState<Page>("Pedidos");
  const [morePage, setMorePage] = useState<MorePageType>("Conversaciones");
  const [businessStatus, setBusinessStatus] =
    useState<BusinessStatus>("Abierto");
  const [orders, setOrders] = useState<Order[]>(demoOrders);
  const [selected, setSelected] = useState<Order | null>(demoOrders[0]);
  const [filter, setFilter] = useState("Pendientes");
  const [search, setSearch] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [chatStep, setChatStep] = useState(1);

  const [hydrated, setHydrated] = useState(false);
  const [storageError, setStorageError] = useState("");
  useEffect(() => {
    try {
      const saved = localStorage.getItem("bolita-orders-v1");
      if (saved) {
        const parsed: unknown = JSON.parse(saved);
        if (!Array.isArray(parsed) || !parsed.every(isStoredOrder))
          throw new Error("invalid");
        setOrders(parsed);
        setSelected(parsed[0] ?? null);
      }
      const status = localStorage.getItem("bolita-business-v1");
      if (status === "Abierto" || status === "Pausado" || status === "Cerrado")
        setBusinessStatus(status);
    } catch {
      setStorageError(
        "No se pudieron recuperar los datos locales. Revisa el almacenamiento antes de guardar pedidos.",
      );
    }
    setHydrated(true);
  }, []);
  useEffect(() => {
    if (!hydrated || storageError) return;
    try {
      localStorage.setItem("bolita-orders-v1", JSON.stringify(orders));
      localStorage.setItem("bolita-business-v1", businessStatus);
    } catch {
      setStorageError("No se pudieron guardar los cambios en este navegador.");
    }
  }, [orders, businessStatus, hydrated, storageError]);

  const filtered = useMemo(
    () =>
      orders.filter((o) => {
        const matchesSearch = `${o.id} ${o.customer} ${o.phone || ""}`
          .toLowerCase()
          .includes(search.toLowerCase());
        const matchesFilter =
          filter === "Todos" ||
          (filter === "Pendientes" && o.status === "Pendiente") ||
          (filter === "En curso" &&
            ["Aceptado", "Preparando", "Listo", "En camino"].includes(
              o.status,
            )) ||
          (filter === "Finalizados" &&
            ["Entregado", "Cancelado"].includes(o.status));
        return matchesSearch && matchesFilter;
      }),
    [orders, filter, search],
  );

  const updateOrder = (id: string, patch: Partial<Order>) => {
    setOrders((current) =>
      current.map((order) =>
        order.id === id ? { ...order, ...patch } : order,
      ),
    );
    setSelected((current) =>
      current?.id === id ? { ...current, ...patch } : current,
    );
  };
  const goPage = (next: Page) => {
    setPage(next);
    if (next !== "Más") return;
  };

  return (
    <div className="min-h-screen bg-[#fffaf4] text-[#273039]">
      <div className="mx-auto flex min-h-screen max-w-[1500px]">
        <aside className="hidden w-64 shrink-0 border-r border-[#eadfd4] bg-[#fffdf9] px-5 py-6 lg:flex lg:flex-col">
          <Brand />
          <div className="mt-9 flex flex-col gap-1">
            {(["Pedidos", "Menú", "Negocio", "Más"] as Page[]).map((item) => (
              <NavButton
                key={item}
                label={item}
                active={page === item}
                onClick={() => goPage(item)}
                icon={
                  item === "Pedidos"
                    ? ShoppingBag
                    : item === "Menú"
                      ? Utensils
                      : item === "Negocio"
                        ? Store
                        : MoreHorizontal
                }
              />
            ))}
          </div>
          <div className="mt-auto rounded-2xl bg-[#fdeef1] p-4">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Zap className="size-4 text-[#a44760]" /> Modo demostración
            </div>
            <p className="mt-2 text-xs leading-relaxed text-[#826e61]">
              Los mensajes y datos son simulados para probar el flujo.
            </p>
          </div>
        </aside>
        <main className="min-w-0 flex-1 pb-20 lg:pb-0">
          {storageError && (
            <p role="alert" className="bg-red-50 p-4 text-red-800">
              {storageError}
            </p>
          )}
          <header className="sticky top-0 z-10 border-b border-[#eadfd4] bg-[#fffaf4]/95 px-4 py-4 backdrop-blur sm:px-7">
            <div className="flex items-center justify-between gap-3">
              <div className="lg:hidden">
                <Brand compact />
              </div>
              <div className="hidden lg:block">
                <p className="text-sm text-[#8a7769]">
                  {new Intl.DateTimeFormat("es-MX", {
                    dateStyle: "full",
                    timeZone: "America/Mexico_City",
                  }).format(new Date())}
                </p>
                <h1 className="text-2xl font-bold tracking-tight">
                  {page === "Más" ? morePage : page}
                </h1>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowStatus(true)}
                  className="flex min-h-11 items-center gap-2 rounded-full border border-[#dfd1c4] bg-white px-3 text-sm font-semibold"
                >
                  <span
                    className={`size-2 rounded-full ${businessStatus === "Abierto" ? "bg-[#2d9b58]" : businessStatus === "Pausado" ? "bg-[#db9a1d]" : "bg-[#a8adb1]"}`}
                  />
                  {businessStatus}
                  <ChevronRight className="size-4 text-[#9a8b7f]" />
                </button>
                <Button
                  onClick={() => setShowNew(true)}
                  className="hidden min-h-11 rounded-xl bg-[#a44760] px-4 hover:bg-[#85354b] sm:flex"
                >
                  <Plus data-icon="inline-start" />
                  Nuevo pedido
                </Button>
              </div>
            </div>
          </header>
          <div className="p-4 sm:p-7">
            {page === "Pedidos" && (
              <OrdersPage
                orders={orders}
                filtered={filtered}
                selected={selected}
                setSelected={setSelected}
                updateOrder={updateOrder}
                filter={filter}
                setFilter={setFilter}
                search={search}
                setSearch={setSearch}
                onNew={() => setShowNew(true)}
              />
            )}
            {page === "Menú" && <MenuPage />}
            {page === "Negocio" && (
              <BusinessPage
                status={businessStatus}
                setStatus={setBusinessStatus}
              />
            )}
            {page === "Más" && (
              <MorePage
                page={morePage}
                setPage={setMorePage}
                orders={orders}
                chatStep={chatStep}
                setChatStep={setChatStep}
              />
            )}
          </div>
        </main>
      </div>
      <nav className="fixed inset-x-0 bottom-0 z-20 grid grid-cols-4 border-t border-[#eadfd4] bg-white px-2 py-2 lg:hidden">
        {(["Pedidos", "Menú", "Negocio", "Más"] as Page[]).map((item) => (
          <NavButton
            key={item}
            label={item}
            active={page === item}
            onClick={() => goPage(item)}
            icon={
              item === "Pedidos"
                ? ShoppingBag
                : item === "Menú"
                  ? Utensils
                  : item === "Negocio"
                    ? Store
                    : MoreHorizontal
            }
            mobile
          />
        ))}
      </nav>
      {showStatus && (
        <StatusDialog
          status={businessStatus}
          setStatus={setBusinessStatus}
          close={() => setShowStatus(false)}
        />
      )}
      {showNew && (
        <NewOrderDialog
          close={() => setShowNew(false)}
          onSave={(order) => {
            setOrders((current) => [order, ...current]);
            setSelected(order);
            setShowNew(false);
            setPage("Pedidos");
          }}
        />
      )}
    </div>
  );
}

function isStoredOrder(value: unknown): value is Order {
  if (!value || typeof value !== "object") return false;
  const o = value as Record<string, unknown>;
  return (
    typeof o.id === "string" &&
    typeof o.customer === "string" &&
    typeof o.summary === "string" &&
    typeof o.total === "number" &&
    Number.isFinite(o.total) &&
    o.total >= 0 &&
    [
      "Pendiente",
      "Aceptado",
      "Preparando",
      "Listo",
      "En camino",
      "Entregado",
      "Cancelado",
    ].includes(String(o.status)) &&
    ["Domicilio", "Recoger"].includes(String(o.mode)) &&
    ["WhatsApp", "Manual", "Llamada"].includes(String(o.channel)) &&
    ["Pendiente", "Efectivo", "Transferencia"].includes(String(o.payment)) &&
    typeof o.time === "string" &&
    typeof o.elapsed === "string"
  );
}

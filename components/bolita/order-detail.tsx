"use client";

import { Button } from "@/components/ui/button";
import {
nextStatus,
type Order
} from "@/lib/bolita-data";
import {
Check,
ChevronRight,
CircleHelp,
MapPin,
MessageCircle,
MoreHorizontal,
Package
} from "lucide-react";
import { useEffect,useState } from "react";

import { Money } from "./money";
import { StatusBadge } from "./status-badge";

export function OrderDetail({
  order,
  updateOrder,
}: {
  order: Order | null;
  updateOrder: (id: string, patch: Partial<Order>) => void;
}) {
  const [stockChecked, setStockChecked] = useState(false);
  const [locationChecked, setLocationChecked] = useState(false);
  const [minutes, setMinutes] = useState(35);
  useEffect(() => {
    setStockChecked(false);
    setLocationChecked(false);
    setMinutes(order?.estimatedMinutes ?? 35);
  }, [order?.id]);
  if (!order)
    return (
      <div className="hidden rounded-2xl border border-dashed border-[#ddcec0] bg-white p-8 text-center xl:block">
        <Package className="mx-auto text-[#c8b6a7]" />
        <p className="mt-2 font-semibold">Selecciona un pedido</p>
      </div>
    );
  const next = nextStatus(order.status, order.mode);
  return (
    <aside className="rounded-2xl border border-[#eadfd4] bg-white p-5 xl:sticky xl:top-24 xl:h-fit">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold">{order.id}</h2>
            <StatusBadge status={order.status} />
          </div>
          <p className="mt-1 text-sm text-[#8d7b6d]">
            {order.time} · {order.channel}
          </p>
        </div>
        <button
          className="grid size-9 place-items-center rounded-lg border border-[#e5d8ce] text-[#806f61]"
          aria-label="Más acciones"
        >
          <MoreHorizontal className="size-4" />
        </button>
      </div>
      <div className="mt-5 flex flex-col gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-[#a08d7e]">
            Cliente
          </p>
          <p className="mt-1 font-semibold">{order.customer}</p>
          <p className="text-sm text-[#78695e]">
            {order.phone || "Teléfono no registrado"}
          </p>
        </div>
        <div className="rounded-xl bg-[#fff8f1] p-4">
          <p className="text-sm font-semibold">{order.summary}</p>
          <p className="mt-2 text-sm text-[#76685d]">
            Envío gratuito · Ranch incluido en medias y órdenes de alitas y
            boneless
          </p>
          <div className="mt-3 flex items-center justify-between border-t border-[#eadfd4] pt-3">
            <span className="text-sm text-[#8d7b6d]">Total</span>
            <Money>{order.total}</Money>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <MapPin className="mt-0.5 size-4 text-[#a44760]" />
          <div>
            <p className="text-sm font-semibold">{order.mode}</p>
            <p className="text-sm text-[#78695e]">
              {order.address || "Punto de recogida: pendiente de configurar"}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <span className="grid size-5 place-items-center rounded-full bg-[#e4f6eb] text-[#247342]">
            <Check className="size-3" />
          </span>
          <div>
            <p className="text-sm font-semibold">Pago: {order.payment}</p>
            <p className="text-xs text-[#8d7b6d]">
              {order.received
                ? "Efectivo recibido"
                : order.payment === "Efectivo"
                  ? "Preguntar si necesita cambio"
                  : "Verificar manualmente"}
            </p>
          </div>
        </div>
        {order.status === "Pendiente" && (
          <div className="rounded-xl border border-[#f1c98c] bg-[#fffaf0] p-4">
            <div className="flex items-center gap-2 font-bold text-[#86591a]">
              <CircleHelp className="size-4" /> Revisar y confirmar
            </div>
            <label className="mt-4 flex items-start gap-3 text-sm">
              <input
                type="checkbox"
                checked={stockChecked}
                onChange={(e) => setStockChecked(e.target.checked)}
                className="mt-0.5 size-4 accent-[#a44760]"
              />
              <span>Productos, sabores y extras disponibles</span>
            </label>
            {order.mode === "Domicilio" && (
              <label className="mt-3 flex items-start gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={locationChecked}
                  onChange={(e) => setLocationChecked(e.target.checked)}
                  className="mt-0.5 size-4 accent-[#a44760]"
                />
                <span>Ubicación revisada; podemos entregar</span>
              </label>
            )}
            <div className="mt-4">
              <p className="text-xs font-semibold text-[#8a6b48]">
                Tiempo estimado · desde aceptación
              </p>
              <div className="mt-2 flex gap-2">
                {[35, 45, 60].map((value) => (
                  <button
                    key={value}
                    onClick={() => setMinutes(value)}
                    className={`min-h-10 rounded-lg border px-3 text-sm font-semibold ${minutes === value ? "border-[#a44760] bg-[#a44760] text-white" : "border-[#e1cba9] bg-white text-[#86591a]"}`}
                  >
                    {value} min
                  </button>
                ))}
              </div>
            </div>
            <Button
              disabled={
                !stockChecked ||
                (order.mode === "Domicilio" && !locationChecked)
              }
              onClick={() =>
                updateOrder(order.id, {
                  status: "Aceptado",
                  acceptedAt: new Date().toISOString(),
                  estimatedMinutes: minutes,
                  issue: undefined,
                })
              }
              className="mt-4 min-h-11 w-full rounded-xl bg-[#a44760] hover:bg-[#85354b]"
            >
              Confirmar pedido
            </Button>
            <button className="mt-3 flex min-h-10 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold text-[#9a5b31] hover:bg-[#fdeef1]">
              <MessageCircle className="size-4" />
              Solicitar información
            </button>
          </div>
        )}
        {next && (
          <Button
            onClick={() => updateOrder(order.id, { status: next })}
            className="min-h-11 w-full rounded-xl bg-[#a44760] hover:bg-[#85354b]"
          >
            Avanzar a {next}
            <ChevronRight data-icon="inline-end" />
          </Button>
        )}
        <div className="border-t border-[#eee3da] pt-3 text-xs text-[#9d8b7d]">
          Historial · Pedido registrado a las {order.time}. Los mensajes al
          cliente son simulados.
        </div>
      </div>
    </aside>
  );
}

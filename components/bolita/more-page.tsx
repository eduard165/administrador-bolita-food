"use client";

import { Button } from "@/components/ui/button";
import {
type Order
} from "@/lib/bolita-data";
import {
Clock3,
MessageCircle,
Phone,
Settings
} from "lucide-react";

import type { MorePage as MorePageType } from "@/lib/bolita-types";
import { ChatSimulator } from "./chat-simulator";
import { Money } from "./money";
import { StatusBadge } from "./status-badge";

export function MorePage({
  page,
  setPage,
  orders,
  chatStep,
  setChatStep,
}: {
  page: MorePageType;
  setPage: (p: MorePageType) => void;
  orders: Order[];
  chatStep: number;
  setChatStep: (n: number) => void;
}) {
  return (
    <div className="mx-auto max-w-5xl">
      <p className="text-sm text-[#8a7769]">Herramientas</p>
      <h1 className="text-2xl font-bold">Más</h1>
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {(
          [
            "Conversaciones",
            "Historial",
            "Configuración",
            "Simulador",
          ] as MorePageType[]
        ).map((item) => (
          <button
            key={item}
            onClick={() => setPage(item)}
            className={`min-h-20 rounded-2xl border p-3 text-left text-sm font-bold ${page === item ? "border-[#a44760] bg-[#fdeef1] text-[#923d55]" : "border-[#eadfd4] bg-white"}`}
          >
            <span className="mb-2 block text-[#a44760]">
              {item === "Conversaciones" ? (
                <MessageCircle />
              ) : item === "Historial" ? (
                <Clock3 />
              ) : item === "Configuración" ? (
                <Settings />
              ) : (
                <Phone />
              )}
            </span>
            {item}
          </button>
        ))}
      </div>
      {page === "Conversaciones" && (
        <div className="mt-5 rounded-2xl border border-[#eadfd4] bg-white p-5">
          <h2 className="font-bold">Atención humana</h2>
          <p className="mt-1 text-sm text-[#8d7b6d]">
            Conversaciones que requieren intervención de la propietaria.
          </p>
          <div className="mt-4 grid gap-3">
            <div className="rounded-xl bg-[#fff8f1] p-4">
              <div className="flex justify-between">
                <b>Ubicación por aclarar</b>
                <span className="text-xs text-[#bb6c1e]">BF-1041</span>
              </div>
              <p className="mt-2 text-sm text-[#78695e]">
                “Estoy en casa de Matías”
              </p>
              <Button className="mt-3 min-h-10 rounded-xl bg-[#a44760] hover:bg-[#85354b]">
                Solicitar referencias
              </Button>
            </div>
          </div>
        </div>
      )}
      {page === "Historial" && (
        <div className="mt-5 grid gap-3">
          {orders
            .filter((o) => ["Entregado", "Cancelado"].includes(o.status))
            .map((o) => (
              <div
                key={o.id}
                className="flex items-center justify-between rounded-xl border border-[#eadfd4] bg-white p-4"
              >
                <div>
                  <b>
                    {o.id} · {o.customer}
                  </b>
                  <p className="text-sm text-[#8d7b6d]">
                    {o.summary} · {o.payment}
                  </p>
                </div>
                <div className="text-right">
                  <Money>{o.total}</Money>
                  <div className="mt-1">
                    <StatusBadge status={o.status} />
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
      {page === "Configuración" && (
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-[#eadfd4] bg-white p-5">
            <h2 className="font-bold">Configuración general</h2>
            <label className="mt-4 flex flex-col gap-2 text-sm font-semibold">
              Nombre del negocio
              <input
                defaultValue="Bolita Food"
                className="min-h-11 rounded-xl border border-[#decfc2] px-3 font-normal"
              />
            </label>
            <label className="mt-4 flex flex-col gap-2 text-sm font-semibold">
              Tiempo predeterminado
              <input
                type="number"
                defaultValue={35}
                className="min-h-11 rounded-xl border border-[#decfc2] px-3 font-normal"
              />
            </label>
            <p className="mt-4 rounded-xl bg-[#fff8f1] p-3 text-xs text-[#8d7b6d]">
              Envío gratuito vigente. Transferencia deshabilitada hasta
              configurar datos.
            </p>
          </div>
          <div className="rounded-2xl border border-[#eadfd4] bg-white p-5">
            <h2 className="font-bold">Avisos</h2>
            <label className="mt-4 flex items-center justify-between text-sm">
              Sonido de notificación
              <input
                type="checkbox"
                className="size-5 accent-[#a44760]"
                defaultChecked
              />
            </label>
            <Button variant="outline" className="mt-4 min-h-11 rounded-xl">
              Probar sonido
            </Button>
            <p className="mt-4 text-xs text-[#8d7b6d]">
              Requiere interacción y depende del navegador. No promete alertas
              con pantalla bloqueada.
            </p>
          </div>
        </div>
      )}
      {page === "Simulador" && (
        <ChatSimulator step={chatStep} setStep={setChatStep} />
      )}
    </div>
  );
}

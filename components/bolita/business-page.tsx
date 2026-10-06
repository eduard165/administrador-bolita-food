"use client";

import { Button } from "@/components/ui/button";
import {
type BusinessStatus
} from "@/lib/bolita-data";
import {
Clock3,
MapPin,
Pencil,
Store
} from "lucide-react";

export function BusinessPage({
  status,
  setStatus,
}: {
  status: BusinessStatus;
  setStatus: (s: BusinessStatus) => void;
}) {
  return (
    <div className="mx-auto max-w-5xl">
      <p className="text-sm text-[#8a7769]">Control operativo</p>
      <h1 className="text-2xl font-bold">Negocio y horarios</h1>
      <div className="mt-6 rounded-2xl bg-[#3c3028] p-5 text-white sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-[#d7c8bc]">Estado actual</p>
            <div className="mt-1 flex items-center gap-2 text-2xl font-bold">
              <span
                className={`size-3 rounded-full ${status === "Abierto" ? "bg-[#72d394]" : status === "Pausado" ? "bg-[#eac16b]" : "bg-[#a5adb2]"}`}
              />
              {status}
            </div>
          </div>
          <Store className="size-7 text-[#f4bd91]" />
        </div>
        <div className="mt-6 grid grid-cols-3 gap-2">
          {(["Abierto", "Pausado", "Cerrado"] as BusinessStatus[]).map((v) => (
            <button
              key={v}
              onClick={() => setStatus(v)}
              className={`min-h-11 rounded-xl text-sm font-semibold ${status === v ? "bg-white text-[#3c3028]" : "bg-white/10 text-white hover:bg-white/15"}`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-[#eadfd4] bg-white p-5">
          <div className="flex items-center gap-2 font-bold">
            <Clock3 className="size-5 text-[#a44760]" />
            Programar apertura y cierre
          </div>
          <p className="mt-2 text-sm text-[#8d7b6d]">
            Se simula mientras la app está abierta. Zona horaria:
            America/Mexico_City.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <input
              type="date"
              className="min-h-11 rounded-xl border border-[#decfc2] px-3 text-sm"
              defaultValue="2026-10-06"
            />
            <input
              type="time"
              className="min-h-11 rounded-xl border border-[#decfc2] px-3 text-sm"
              defaultValue="12:00"
            />
          </div>
          <Button className="mt-3 min-h-11 w-full rounded-xl bg-[#a44760] hover:bg-[#85354b]">
            Guardar programación
          </Button>
        </div>
        <div className="rounded-2xl border border-[#eadfd4] bg-white p-5">
          <div className="flex items-center gap-2 font-bold">
            <MapPin className="size-5 text-[#a44760]" />
            Punto de recogida
          </div>
          <p className="mt-2 text-sm text-[#8d7b6d]">
            La dirección del negocio todavía está pendiente de configurar.
          </p>
          <button className="mt-5 flex min-h-11 items-center gap-2 text-sm font-bold text-[#a44760]">
            <Pencil className="size-4" />
            Configurar dirección
          </button>
        </div>
      </div>
    </div>
  );
}

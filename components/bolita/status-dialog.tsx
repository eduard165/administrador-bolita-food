"use client";

import {
type BusinessStatus
} from "@/lib/bolita-data";
import {
Check,
X
} from "lucide-react";

export function StatusDialog({
  status,
  setStatus,
  close,
}: {
  status: BusinessStatus;
  setStatus: (s: BusinessStatus) => void;
  close: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-[#33251d]/30 p-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Estado del negocio</h2>
          <button onClick={close} aria-label="Cerrar">
            <X />
          </button>
        </div>
        <p className="mt-1 text-sm text-[#8d7b6d]">
          Control manual para recibir nuevos pedidos.
        </p>
        <div className="mt-5 flex flex-col gap-2">
          {(["Abierto", "Pausado", "Cerrado"] as BusinessStatus[]).map(
            (value) => (
              <button
                key={value}
                onClick={() => {
                  setStatus(value);
                  close();
                }}
                className={`flex min-h-12 items-center justify-between rounded-xl border px-4 text-left font-semibold ${status === value ? "border-[#a44760] bg-[#fdeef1] text-[#923d55]" : "border-[#eadfd4]"}`}
              >
                {value}
                {status === value && <Check className="size-4" />}
              </button>
            ),
          )}
        </div>
      </div>
    </div>
  );
}

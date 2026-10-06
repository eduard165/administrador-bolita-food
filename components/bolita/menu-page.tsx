"use client";

import { Button } from "@/components/ui/button";
import {
flavors,
menuItems
} from "@/lib/bolita-data";
import {
Package,
Pencil,
Plus
} from "lucide-react";
import { useState } from "react";

import { Money } from "./money";

export function MenuPage() {
  const [items, setItems] = useState(menuItems);
  const [tab, setTab] = useState("Menú principal");
  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-[#8a7769]">Catálogo y disponibilidad</p>
          <h1 className="text-2xl font-bold">Menú</h1>
        </div>
        <Button className="min-h-11 rounded-xl bg-[#a44760] hover:bg-[#85354b]">
          <Plus data-icon="inline-start" />
          Agregar especial
        </Button>
      </div>
      <div className="mt-6 flex gap-1 overflow-x-auto rounded-xl bg-[#f3ebe4] p-1">
        {["Menú principal", "Especiales", "Sabores", "Extras"].map((item) => (
          <button
            key={item}
            onClick={() => setTab(item)}
            className={`min-h-10 whitespace-nowrap rounded-lg px-4 text-sm font-semibold ${tab === item ? "bg-white text-[#a44760] shadow-sm" : "text-[#857467]"}`}
          >
            {item}
          </button>
        ))}
      </div>
      {tab === "Menú principal" && (
        <div className="mt-5 grid gap-3">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between gap-4 rounded-2xl border border-[#eadfd4] bg-white p-4"
            >
              <div className="min-w-0">
                <p className="font-bold">{item.name}</p>
                <p className="text-sm text-[#8d7b6d]">{item.detail}</p>
              </div>
              <div className="flex items-center gap-3">
                <Money>{item.price}</Money>
                <button
                  onClick={() =>
                    setItems((current) =>
                      current.map((x, j) =>
                        j === i ? { ...x, active: !x.active } : x,
                      ),
                    )
                  }
                  className={`min-h-10 rounded-full px-3 text-xs font-bold ${item.active ? "bg-[#e4f6eb] text-[#247342]" : "bg-[#eef0f2] text-[#69737b]"}`}
                >
                  {item.active ? "Disponible" : "Agotado"}
                </button>
                <button
                  className="hidden size-10 place-items-center rounded-lg border border-[#eadfd4] sm:grid"
                  aria-label="Editar producto"
                >
                  <Pencil className="size-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {tab === "Especiales" && (
        <div className="mt-5 rounded-2xl border border-dashed border-[#ddcec0] bg-white p-10 text-center">
          <Package className="mx-auto size-8 text-[#c8b6a7]" />
          <p className="mt-3 font-semibold">Pan de nuez · dato ficticio</p>
          <p className="mt-1 text-sm text-[#8d7b6d]">
            $85 · Agotado · Retiro opcional
          </p>
        </div>
      )}
      {tab === "Sabores" && (
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {flavors.map((flavor, i) => (
            <div
              key={flavor}
              className="flex min-h-14 items-center justify-between rounded-xl border border-[#eadfd4] bg-white px-4"
            >
              <span className="font-medium">{flavor}</span>
              <span
                className={`text-xs font-bold ${i === 8 ? "text-[#69737b]" : "text-[#247342]"}`}
              >
                {i === 8 ? "Agotado" : "Disponible"}
              </span>
            </div>
          ))}
        </div>
      )}
      {tab === "Extras" && (
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {[
            ["Ranch tradicional", 10],
            ["Queso amarillo", 10],
          ].map(([name, price]) => (
            <div
              key={name as string}
              className="flex items-center justify-between rounded-xl border border-[#eadfd4] bg-white p-4"
            >
              <span className="font-semibold">{name as string}</span>
              <Money>{price as number}</Money>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

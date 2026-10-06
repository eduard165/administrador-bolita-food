"use client";

import {
type Order
} from "@/lib/bolita-data";
import {
Bike,
Store
} from "lucide-react";

import { Money } from "./money";
import { StatusBadge } from "./status-badge";

export function OrderCard({
  order,
  active,
  onClick,
}: {
  order: Order;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-2xl border bg-white p-4 text-left transition hover:border-[#d998ab] ${active ? "border-[#a44760] ring-2 ring-[#f6dce4]" : "border-[#eadfd4]"}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold">{order.id}</span>
            <span className="text-xs text-[#9a897c]">{order.elapsed}</span>
          </div>
          <div className="mt-1 font-semibold">{order.customer}</div>
        </div>
        <Money>{order.total}</Money>
      </div>
      <p className="mt-3 text-sm text-[#695b51]">{order.summary}</p>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <StatusBadge status={order.status} />
        <span className="text-xs text-[#8d7b6d]">
          {order.mode === "Domicilio" ? (
            <Bike className="mr-1 inline size-3.5" />
          ) : (
            <Store className="mr-1 inline size-3.5" />
          )}
          {order.mode}
        </span>
        <span className="text-xs text-[#8d7b6d]">· {order.channel}</span>
        {order.issue && (
          <span className="text-xs font-semibold text-[#bb6c1e]">
            · {order.issue}
          </span>
        )}
      </div>
    </button>
  );
}

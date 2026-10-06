"use client";

import {
statusTone,
type OrderStatus
} from "@/lib/bolita-data";

const toneClasses: Record<string, string> = {
  amber: "bg-[#fff3d6] text-[#a76500]",
  blue: "bg-[#e7f0ff] text-[#3c65a8]",
  orange: "bg-[#ffeadb] text-[#b9581b]",
  green: "bg-[#e4f6eb] text-[#247342]",
  purple: "bg-[#eee7fb] text-[#68459f]",
  slate: "bg-[#eef0f2] text-[#58626d]",
  rose: "bg-[#ffe7ec] text-[#b43a58]",
};

export function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${toneClasses[statusTone(status)]}`}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

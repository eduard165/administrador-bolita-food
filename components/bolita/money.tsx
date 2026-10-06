"use client";

import {
money
} from "@/lib/bolita-data";

export function Money({ children }: { children: number }) {
  return <span className="font-semibold tabular-nums">{money(children)}</span>;
}

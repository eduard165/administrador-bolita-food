"use client";

import {
ShoppingBag
} from "lucide-react";

export function NavButton({
  label,
  icon: Icon,
  active,
  onClick,
  mobile = false,
}: {
  label: string;
  icon: typeof ShoppingBag;
  active: boolean;
  onClick: () => void;
  mobile?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex min-h-11 items-center justify-center gap-2 rounded-xl px-3 text-sm font-semibold transition-colors lg:justify-start ${active ? "bg-[#fdeef1] text-[#a44760]" : "text-[#7a6b60] hover:bg-[#fff6ef]"} ${mobile ? "flex-col gap-0.5 text-[11px]" : ""}`}
    >
      <Icon className={mobile ? "size-5" : "size-[18px]"} />
      <span>{label}</span>
    </button>
  );
}

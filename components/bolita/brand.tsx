import Image from "next/image";
export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <Image
        src="/bolita-logo-reference.png"
        alt="Logo Bolita"
        width={48}
        height={48}
        className="size-12 shrink-0 rounded-full object-cover"
      />
      <div>
        <div className="font-bold leading-tight">Bolita Food</div>
        <div className="text-xs text-[#78695e]">
          {compact ? "Administrador" : "Operación diaria"}
        </div>
      </div>
    </div>
  );
}

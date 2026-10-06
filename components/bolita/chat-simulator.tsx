"use client";

import { Button } from "@/components/ui/button";

export function ChatSimulator({
  step,
  setStep,
}: {
  step: number;
  setStep: (n: number) => void;
}) {
  const messages = [
    "¡Hola! Soy el asistente de Bolita Food. ¿Qué te gustaría hacer?",
    "Menú principal",
    step > 1 ? "Hacer pedido" : "",
    step > 2 ? "Orden completa de alitas · 10 piezas" : "",
    step > 3 ? "¿Cómo recibes tu pedido?" : "",
  ];
  return (
    <div className="mt-5 max-w-md overflow-hidden rounded-[28px] border-8 border-[#3c3028] bg-[#f5eee8] shadow-lg">
      <div className="flex items-center justify-between bg-[#e86e2b] px-4 py-3 text-white">
        <span className="font-bold">Bolita Food</span>
        <span className="text-xs">simulador</span>
      </div>
      <div className="flex min-h-[430px] flex-col gap-3 p-4">
        {messages.filter(Boolean).map((m, i) => (
          <div
            key={i}
            className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${i % 2 === 0 ? "self-start rounded-tl-sm bg-white" : "self-end rounded-tr-sm bg-[#ffe0ca]"}`}
          >
            {m}
          </div>
        ))}
        <div className="mt-auto grid gap-2">
          {step < 4 && (
            <Button
              onClick={() => setStep(step + 1)}
              className="min-h-11 rounded-xl bg-[#e86e2b] hover:bg-[#ca5c20]"
            >
              {step === 1
                ? "Hacer pedido"
                : step === 2
                  ? "Elegir producto"
                  : "Continuar"}
            </Button>
          )}
          {step >= 4 && (
            <Button
              onClick={() => setStep(1)}
              variant="outline"
              className="min-h-11 rounded-xl"
            >
              Reiniciar simulador
            </Button>
          )}
          <p className="text-center text-[11px] text-[#8d7b6d]">
            Mensajes de prueba · no se envía nada
          </p>
        </div>
      </div>
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { flavors,menuItems,money,type Order } from "@/lib/bolita-data";
import {
lineTotal,
validateOrderLine,
type OrderLine,
} from "@/lib/order-rules";
import { Plus,Trash2,X } from "lucide-react";
import { useEffect,useRef,useState } from "react";

const field =
  "min-h-12 w-full rounded-xl border border-[#decfc2] bg-white px-3 font-normal";
const initialLine = (): OrderLine => ({
  productIndex: 0,
  flavors: [{ name: "BBQ", pieces: 10 }],
  ranchExtras: 0,
  cheeseExtras: 0,
  notes: "",
});

export function NewOrderDialog({
  close,
  onSave,
}: {
  close: () => void;
  onSave: (order: Order) => void;
}) {
  const [step, setStep] = useState(1);
  const [customer, setCustomer] = useState("");
  const [phone, setPhone] = useState("");
  const [mode, setMode] = useState<Order["mode"]>("Recoger");
  const [channel, setChannel] = useState<Order["channel"]>("Manual");
  const [address, setAddress] = useState("");
  const [lines, setLines] = useState<OrderLine[]>([initialLine()]);
  const [needsChange, setNeedsChange] = useState(false);
  const [cash, setCash] = useState("");
  const [error, setError] = useState("");
  const saving = useRef(false);
  const panel = useRef<HTMLDivElement>(null);
  const total = lines.reduce((sum, line) => sum + lineTotal(line), 0);
  const dirty = Boolean(customer || phone || address || step > 1);
  const requestClose = () => {
    if (!dirty || window.confirm("¿Descartar este pedido sin guardar?"))
      close();
  };
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, []);
  function patchLine(index: number, patch: Partial<OrderLine>) {
    setLines((current) =>
      current.map((line, i) => (i === index ? { ...line, ...patch } : line)),
    );
  }
  function validate(): string {
    if (!customer.trim()) return "Escribe el nombre del cliente.";
    if (mode === "Domicilio" && !address.trim())
      return "Escribe la dirección o las referencias de entrega.";
    if (step >= 2) {
      if (!lines.length) return "Agrega al menos un producto.";
      for (const line of lines) {
        const issue = validateOrderLine(line);
        if (issue) return issue;
      }
    }
    if (
      step === 3 &&
      needsChange &&
      (!Number.isFinite(Number(cash)) || Number(cash) < total)
    )
      return "El efectivo con el que pagará debe cubrir el total.";
    return "";
  }
  function next() {
    const issue = validate();
    setError(issue);
    if (!issue) setStep((value) => value + 1);
  }
  function save() {
    const issue = validate();
    setError(issue);
    if (issue || saving.current) return;
    saving.current = true;
    const createdAt = new Date().toISOString();
    const summary = lines
      .map((line) => {
        const item = menuItems[line.productIndex];
        const distribution = line.flavors
          .map((f) => `${f.pieces} ${f.name}`)
          .join(", ");
        return `${item.name} (${item.detail})${distribution ? ": " + distribution : ""}${line.ranchExtras ? ` + ${line.ranchExtras} ranch extra` : ""}${line.cheeseExtras ? ` + ${line.cheeseExtras} queso extra` : ""}${line.notes ? ` · ${line.notes}` : ""}`;
      })
      .join("; ");
    onSave({
      id: `BF-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
      customer: customer.trim(),
      phone: phone.trim() || undefined,
      channel,
      mode,
      address: mode === "Domicilio" ? address.trim() : undefined,
      summary,
      total,
      status: "Pendiente",
      payment: "Efectivo",
      received: false,
      createdAt,
      time: new Date(createdAt).toLocaleTimeString("es-MX", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "America/Mexico_City",
      }),
      elapsed: "ahora",
      lines,
      cashTendered: needsChange ? Number(cash) : undefined,
      issue: mode === "Domicilio" ? "Ubicación por validar" : undefined,
    });
  }
  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/30 sm:p-6"
      onKeyDown={(event) => {
        if (event.key === "Escape") requestClose();
        if (event.key === "Tab") {
          const nodes = panel.current?.querySelectorAll<HTMLElement>(
            'button:not(:disabled), input, select, textarea, [tabindex="0"]',
          );
          if (!nodes?.length) return;
          if (event.shiftKey && document.activeElement === nodes[0]) {
            event.preventDefault();
            nodes[nodes.length - 1].focus();
          } else if (
            !event.shiftKey &&
            document.activeElement === nodes[nodes.length - 1]
          ) {
            event.preventDefault();
            nodes[0].focus();
          }
        }
      }}
    >
      <div
        ref={panel}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="new-order-title"
        className="mx-auto min-h-screen max-w-2xl bg-[#fffaf4] p-5 outline-none sm:min-h-0 sm:rounded-2xl sm:p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-[#a44760]">
              Nuevo pedido · Paso {step} de 3
            </p>
            <h2 id="new-order-title" className="mt-1 text-xl font-bold">
              {step === 1
                ? "Cliente y entrega"
                : step === 2
                  ? "Productos"
                  : "Pago y revisión"}
            </h2>
          </div>
          <button
            onClick={requestClose}
            className="grid size-11 place-items-center"
            aria-label="Cerrar nuevo pedido"
          >
            <X />
          </button>
        </div>
        <div className="mt-5 flex gap-1">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full ${i <= step ? "bg-[#a44760]" : "bg-[#eadfd4]"}`}
            />
          ))}
        </div>
        {step === 1 && (
          <div className="mt-6 grid gap-4">
            <label className="grid gap-2 text-sm font-semibold">
              Nombre del cliente
              <input
                value={customer}
                onChange={(e) => setCustomer(e.target.value)}
                className={field}
              />
            </label>
            <label className="grid gap-2 text-sm font-semibold">
              Teléfono (opcional)
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={field}
              />
            </label>
            <label className="grid gap-2 text-sm font-semibold">
              Origen
              <select
                value={channel}
                onChange={(e) => setChannel(e.target.value as Order["channel"])}
                className={field}
              >
                <option value="Manual">Presencial / mensaje atendido</option>
                <option value="Llamada">Llamada</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-semibold">
              Entrega
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value as Order["mode"])}
                className={field}
              >
                <option>Recoger</option>
                <option>Domicilio</option>
              </select>
            </label>
            {mode === "Domicilio" && (
              <label className="grid gap-2 text-sm font-semibold">
                Dirección y referencias
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="min-h-24 rounded-xl border border-[#decfc2] bg-white p-3"
                />
                <span className="font-normal">
                  La ubicación se revisará al confirmar el pedido. Envío gratis.
                </span>
              </label>
            )}
          </div>
        )}
        {step === 2 && (
          <div className="mt-6 grid gap-4">
            {lines.map((line, index) => {
              const item = menuItems[line.productIndex];
              const allocated = line.flavors.reduce(
                (sum, f) => sum + f.pieces,
                0,
              );
              return (
                <fieldset
                  key={index}
                  className="rounded-xl border bg-white p-4"
                >
                  <legend className="px-2 font-semibold">
                    Orden {index + 1}
                  </legend>
                  <label className="grid gap-2 text-sm">
                    Producto
                    <select
                      value={line.productIndex}
                      onChange={(e) => {
                        const productIndex = Number(e.target.value);
                        const product = menuItems[productIndex];
                        patchLine(index, {
                          productIndex,
                          flavors: product.pieces
                            ? [{ name: "BBQ", pieces: product.pieces }]
                            : [],
                        });
                      }}
                      className={field}
                    >
                      {menuItems.map((p, i) => (
                        <option key={i} value={i} disabled={!p.active}>
                          {p.name} · {p.detail} · {money(p.price)}
                          {!p.active ? " · Agotado" : ""}
                        </option>
                      ))}
                    </select>
                  </label>
                  {item.pieces > 0 && (
                    <div className="mt-4 grid gap-3">
                      <p className="text-sm">
                        {allocated} de {item.pieces} piezas · máximo{" "}
                        {item.maxFlavors} sabores
                      </p>
                      {line.flavors.map((flavor, fi) => (
                        <div key={fi} className="flex items-end gap-2">
                          <label className="grid min-w-0 flex-1 gap-1 text-xs">
                            Sabor
                            <select
                              className={field}
                              value={flavor.name}
                              onChange={(e) =>
                                patchLine(index, {
                                  flavors: line.flavors.map((f, j) =>
                                    j === fi
                                      ? { ...f, name: e.target.value }
                                      : f,
                                  ),
                                })
                              }
                            >
                              {flavors.map((f) => (
                                <option key={f}>{f}</option>
                              ))}
                            </select>
                          </label>
                          <label className="grid w-20 gap-1 text-xs">
                            Piezas
                            <input
                              type="number"
                              min={1}
                              max={item.pieces}
                              value={flavor.pieces}
                              onChange={(e) =>
                                patchLine(index, {
                                  flavors: line.flavors.map((f, j) =>
                                    j === fi
                                      ? { ...f, pieces: Number(e.target.value) }
                                      : f,
                                  ),
                                })
                              }
                              className={field}
                            />
                          </label>
                          <button
                            className="grid size-12 place-items-center"
                            aria-label={`Eliminar sabor ${fi + 1}`}
                            onClick={() =>
                              patchLine(index, {
                                flavors: line.flavors.filter(
                                  (_, j) => j !== fi,
                                ),
                              })
                            }
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        disabled={line.flavors.length >= item.maxFlavors}
                        className="min-h-11 rounded-xl border disabled:opacity-50"
                        onClick={() => {
                          const name = flavors.find(
                            (f) => !line.flavors.some((x) => x.name === f),
                          )!;
                          patchLine(index, {
                            flavors: [...line.flavors, { name, pieces: 1 }],
                          });
                        }}
                      >
                        Agregar sabor
                      </button>
                    </div>
                  )}
                  {item.ranchIncluded && (
                    <p className="mt-3 text-xs text-green-800">
                      Incluye una muestra de ranch sin costo.
                    </p>
                  )}
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <label className="grid gap-1 text-xs">
                      Ranch extra · $10
                      <input
                        type="number"
                        min={0}
                        step={1}
                        className={field}
                        value={line.ranchExtras}
                        onChange={(e) =>
                          patchLine(index, {
                            ranchExtras: Number(e.target.value),
                          })
                        }
                      />
                    </label>
                    <label className="grid gap-1 text-xs">
                      Queso extra · $10
                      <input
                        type="number"
                        min={0}
                        step={1}
                        className={field}
                        value={line.cheeseExtras}
                        onChange={(e) =>
                          patchLine(index, {
                            cheeseExtras: Number(e.target.value),
                          })
                        }
                      />
                    </label>
                  </div>
                  <label className="mt-3 grid gap-1 text-xs">
                    Notas
                    <input
                      value={line.notes}
                      onChange={(e) =>
                        patchLine(index, { notes: e.target.value })
                      }
                      className={field}
                    />
                  </label>
                  <div className="mt-3 flex justify-between">
                    <b>{money(lineTotal(line))}</b>
                    <button
                      onClick={() =>
                        setLines((current) =>
                          current.filter((_, i) => i !== index),
                        )
                      }
                      className="min-h-11 px-3 text-sm text-red-700"
                    >
                      Eliminar orden
                    </button>
                  </div>
                </fieldset>
              );
            })}
            <Button
              variant="outline"
              className="min-h-12"
              onClick={() => setLines((current) => [...current, initialLine()])}
            >
              <Plus />
              Agregar otro producto
            </Button>
          </div>
        )}
        {step === 3 && (
          <div className="mt-6 grid gap-4">
            <div className="rounded-xl bg-white p-4">
              <b>
                {customer} · {mode}
              </b>
              {mode === "Domicilio" && (
                <p className="mt-2 text-sm">{address}</p>
              )}
              <ul className="mt-3 grid gap-2 text-sm">
                {lines.map((line, i) => (
                  <li key={i}>
                    {menuItems[line.productIndex].name} ·{" "}
                    {menuItems[line.productIndex].detail}
                    <br />
                    {line.flavors
                      .map((f) => `${f.pieces} ${f.name}`)
                      .join(", ")}{" "}
                    · {money(lineTotal(line))}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex justify-between border-t pt-3">
                <span>Envío</span>
                <b>$0</b>
              </div>
              <div className="mt-2 flex justify-between">
                <span>Total</span>
                <b>{money(total)}</b>
              </div>
            </div>
            <p className="text-sm">
              Pago en efectivo. Transferencia pendiente de configurar.
            </p>
            <label className="flex min-h-11 items-center gap-3">
              <input
                type="checkbox"
                checked={needsChange}
                onChange={(e) => setNeedsChange(e.target.checked)}
              />
              Necesita cambio
            </label>
            {needsChange && (
              <label className="grid gap-2 text-sm">
                ¿Con cuánto pagará?
                <input
                  type="number"
                  min={total}
                  value={cash}
                  onChange={(e) => setCash(e.target.value)}
                  className={field}
                />
                <span>Cambio: {money(Math.max(0, Number(cash) - total))}</span>
              </label>
            )}
            <p className="text-sm text-[#78695e]">
              Se guardará pendiente. Después revisa existencia, ubicación y
              tiempo para aceptarlo. El efectivo todavía no se registra como
              recibido.
            </p>
          </div>
        )}
        {error && (
          <p
            role="alert"
            className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-800"
          >
            {error}
          </p>
        )}
        <div className="sticky bottom-0 mt-6 flex gap-2 bg-[#fffaf4] py-3">
          {step > 1 && (
            <Button
              variant="outline"
              className="min-h-12 flex-1"
              onClick={() => {
                setStep(step - 1);
                setError("");
              }}
            >
              Atrás
            </Button>
          )}
          <Button
            className="min-h-12 flex-1 bg-[#a44760] hover:bg-[#85354b]"
            onClick={step < 3 ? next : save}
          >
            {step < 3 ? "Continuar" : "Guardar pendiente"}
          </Button>
        </div>
      </div>
    </div>
  );
}

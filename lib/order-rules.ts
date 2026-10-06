import { flavors,menuItems } from "./bolita-data";

export type OrderLine = {
  productIndex: number;
  flavors: { name: string; pieces: number }[];
  ranchExtras: number;
  cheeseExtras: number;
  notes: string;
};
export function lineTotal(line: OrderLine) {
  const product = menuItems[line.productIndex];
  return product
    ? (Math.round(product.price * 100) +
        (line.ranchExtras + line.cheeseExtras) * 1000) /
        100
    : 0;
}
export function validateOrderLine(line: OrderLine): string {
  const product = menuItems[line.productIndex];
  if (!product || !product.active) return "Selecciona un producto disponible.";
  if (
    ![line.ranchExtras, line.cheeseExtras].every(
      (n) => Number.isInteger(n) && n >= 0,
    )
  )
    return "Los extras deben ser cantidades enteras de cero o más.";
  if (product.pieces) {
    if (!line.flavors.length || line.flavors.length > product.maxFlavors)
      return `${product.name}: elige entre 1 y ${product.maxFlavors} sabores.`;
    if (new Set(line.flavors.map((f) => f.name)).size !== line.flavors.length)
      return "No repitas sabores; reúne sus piezas en una sola fila.";
    if (
      !line.flavors.every(
        (f) =>
          flavors.includes(f.name) &&
          Number.isInteger(f.pieces) &&
          f.pieces > 0,
      )
    )
      return "Cada sabor necesita una cantidad entera positiva.";
    if (line.flavors.reduce((s, f) => s + f.pieces, 0) !== product.pieces)
      return `${product.name}: distribuye exactamente ${product.pieces} piezas.`;
  } else if (line.flavors.length)
    return "Esta presentación no admite distribución de sabores.";
  return "";
}

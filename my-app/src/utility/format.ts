import type { Product } from "@/types";

/** Format a product price, e.g. "$1,850". */
export function money(p: Pick<Product, "price" | "currency">): string {
  return `${p.currency || "$"}${Number(p.price).toLocaleString("en-US")}`;
}

/** Format a bare number as currency (e.g. cart total). */
export function currency(n: number, symbol = "$"): string {
  return `${symbol}${Number(n).toLocaleString("en-US")}`;
}

/** Initials from a name, for avatar fallbacks. */
export function initials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
}

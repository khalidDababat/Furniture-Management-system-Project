"use client";

// Lightweight cart for the storefront phase: add items, see a count badge and a
// slide-out drawer. Checkout & orders are intentionally deferred to a later phase.
import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Product } from "@/types";

interface CartContextValue {
  items: Product[];
  count: number;
  total: number;
  open: boolean;
  add: (p: Product) => void;
  remove: (index: number) => void;
  clear: () => void;
  setOpen: (v: boolean) => void;
}

export const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "zs_cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items]);

  const add = useCallback((p: Product) => setItems((prev) => [...prev, p]), []);
  const remove = useCallback((index: number) => setItems((prev) => prev.filter((_, i) => i !== index)), []);
  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      count: items.length,
      total: items.reduce((s, p) => s + (p?.price || 0), 0),
      open,
      add,
      remove,
      clear,
      setOpen,
    }),
    [items, open, add, remove, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

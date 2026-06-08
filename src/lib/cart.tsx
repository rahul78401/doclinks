import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type CartItem = {
  id: string;
  kind: "test" | "package";
  name: string;
  price: number;
  originalPrice: number;
  meta: string; // e.g. "26 Parameters" or "78 Tests"
};

type CartContextValue = {
  items: CartItem[];
  add: (item: CartItem) => void;
  remove: (kind: CartItem["kind"], id: string) => void;
  clear: () => void;
  has: (kind: CartItem["kind"], id: string) => boolean;
  count: number;
  totals: { items: number; total: number; original: number; saved: number };
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "doclinks.cart.v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items, hydrated]);

  const add = useCallback((item: CartItem) => {
    setItems((prev) =>
      prev.some((i) => i.id === item.id && i.kind === item.kind) ? prev : [...prev, item],
    );
  }, []);

  const remove = useCallback((kind: CartItem["kind"], id: string) => {
    setItems((prev) => prev.filter((i) => !(i.id === id && i.kind === kind)));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const has = useCallback(
    (kind: CartItem["kind"], id: string) =>
      items.some((i) => i.id === id && i.kind === kind),
    [items],
  );

  const totals = useMemo(() => {
    const total = items.reduce((s, i) => s + i.price, 0);
    const original = items.reduce((s, i) => s + (i.originalPrice || i.price), 0);
    return {
      items: items.length,
      total: Math.round(total),
      original: Math.round(original),
      saved: Math.max(0, Math.round(original - total)),
    };
  }, [items]);

  const value: CartContextValue = {
    items,
    add,
    remove,
    clear,
    has,
    count: items.length,
    totals,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

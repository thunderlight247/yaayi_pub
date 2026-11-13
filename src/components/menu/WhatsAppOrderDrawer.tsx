"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import type { CartLine, Fulfilment, MenuCategoryId, MenuItem, OrderDetails } from "@/types";
import { menuCategories, menuItems } from "@/data/menu";
import { buildOrderMessage, formatGHS, getSubtotal, openWhatsApp } from "@/utils/whatsapp";
import MenuCategoryTabs from "./MenuCategoryTabs";
import MenuItemCard from "./MenuItemCard";

const CART_KEY = "yaayis-cart-v1";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  lines: CartLine[];
  onAdd: (item: Pick<MenuItem, "id" | "name" | "price">) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
}

export default function WhatsAppOrderDrawer({ open, onClose, lines, onAdd, onRemove, onClear }: DrawerProps) {
  const [details, setDetails] = useState<OrderDetails>({ name: "", fulfilment: "Delivery", landmark: "", notes: "" });
  const [error, setError] = useState("");
  const subtotal = getSubtotal(lines);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const set = <K extends keyof OrderDetails>(key: K, value: OrderDetails[K]) => {
    setError("");
    setDetails((d) => ({ ...d, [key]: value }));
  };

  const send = () => {
    if (lines.length === 0) return setError("Add at least one item to your order.");
    if (!details.name.trim()) return setError("Enter your name so we can find your order.");
    if (details.fulfilment === "Delivery" && !details.landmark.trim())
      return setError("Enter a delivery landmark in Damongo.");
    openWhatsApp(buildOrderMessage(lines, details));
  };

  const field =
    "w-full rounded-xl border border-ink-600 bg-ink-800 px-4 py-3 text-sm text-white placeholder:text-stone-500 focus:border-gold-500 focus:outline-none";

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Your order"
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-ink-700 bg-ink-900 sm:max-w-md"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.25 }}
          >
            <div className="flex items-center justify-between border-b border-ink-700 px-5 py-4">
              <h2 className="font-display text-xl font-semibold text-white">Your order</h2>
              <button type="button" onClick={onClose} aria-label="Close order" className="grid h-9 w-9 place-items-center rounded-full text-stone-300 hover:bg-ink-700">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div data-lenis-prevent className="flex-1 space-y-6 overflow-y-auto px-5 py-5">
              {lines.length === 0 ? (
                <p className="rounded-xl border border-dashed border-ink-600 p-6 text-center text-stone-400">
                  Your order is empty. Pick something from the menu to get started.
                </p>
              ) : (
                <ul className="divide-y divide-ink-700">
                  {lines.map((l) => (
                    <li key={l.id} className="flex items-center justify-between gap-3 py-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-white">{l.name}</p>
                        <p className="text-sm text-stone-400">{formatGHS(l.price * l.quantity)}</p>
                      </div>
                      <div className="inline-flex items-center gap-2">
                        <button type="button" onClick={() => onRemove(l.id)} aria-label={`Remove one ${l.name}`} className="grid h-8 w-8 place-items-center rounded-full border border-ink-600 text-stone-300">
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-5 text-center text-sm text-white">{l.quantity}</span>
                        <button type="button" onClick={() => onAdd(l)} aria-label={`Add another ${l.name}`} className="grid h-8 w-8 place-items-center rounded-full border border-ink-600 text-stone-300">
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              <fieldset>
                <legend className="mb-2 text-sm font-medium text-stone-300">How do you want it?</legend>
                <div className="grid grid-cols-2 gap-2">
                  {(["Delivery", "Takeout"] as Fulfilment[]).map((f) => (
                    <button
                      key={f}
                      type="button"
                      aria-pressed={details.fulfilment === f}
                      onClick={() => set("fulfilment", f)}
                      className={`rounded-xl border px-4 py-3 text-sm font-medium transition ${
                        details.fulfilment === f ? "border-gold-500 bg-gold-500/15 text-gold-300" : "border-ink-600 text-stone-300"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="space-y-3">
                <input className={field} placeholder="Your name" value={details.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" aria-label="Your name" />
                {details.fulfilment === "Delivery" && (
                  <input className={field} placeholder="Delivery landmark in Damongo (e.g. near the market)" value={details.landmark} onChange={(e) => set("landmark", e.target.value)} aria-label="Delivery landmark" />
                )}
                <textarea className={field} rows={3} placeholder="Notes (spice level, extra sauce, drink choice)" value={details.notes} onChange={(e) => set("notes", e.target.value)} aria-label="Notes" />
              </div>
            </div>

            <div className="space-y-3 border-t border-ink-700 px-5 pb-safe py-4">
              <div className="flex items-baseline justify-between">
                <span className="text-stone-400">Estimated subtotal</span>
                <span className="font-display text-2xl font-semibold text-gold-400">{formatGHS(subtotal)}</span>
              </div>
              {error && <p role="alert" className="text-sm text-red-300">{error}</p>}
              <button type="button" onClick={send} className="flex w-full items-center justify-center gap-2 rounded-full bg-emerald-500 px-5 py-3.5 font-semibold text-ink-950 transition hover:bg-emerald-400">
                <MessageCircle className="h-5 w-5" aria-hidden /> Send Order on WhatsApp
              </button>
              {lines.length > 0 && (
                <button type="button" onClick={onClear} className="flex w-full items-center justify-center gap-2 text-sm text-stone-400 hover:text-white">
                  <Trash2 className="h-4 w-4" aria-hidden /> Clear order
                </button>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

/** Menu browser with category tabs, cart state (persisted in localStorage) and the order drawer. */
export function MenuWithOrdering() {
  const [active, setActive] = useState<MenuCategoryId>("local");
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(CART_KEY);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          const valid = parsed.filter(
            (l): l is CartLine =>
              typeof l?.id === "string" && typeof l?.name === "string" && typeof l?.price === "number" && typeof l?.quantity === "number" && l.quantity > 0,
          );
          setLines(valid);
        }
      }
    } catch {
      /* ignore corrupted storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(CART_KEY, JSON.stringify(lines));
    } catch {
      /* storage unavailable */
    }
  }, [lines, hydrated]);

  const add = useCallback((item: Pick<MenuItem, "id" | "name" | "price">) => {
    setLines((prev) => {
      const found = prev.find((l) => l.id === item.id);
      if (found) return prev.map((l) => (l.id === item.id ? { ...l, quantity: l.quantity + 1 } : l));
      return [...prev, { id: item.id, name: item.name, price: item.price, quantity: 1 }];
    });
  }, []);

  const remove = useCallback((id: string) => {
    setLines((prev) =>
      prev.flatMap((l) => (l.id !== id ? [l] : l.quantity > 1 ? [{ ...l, quantity: l.quantity - 1 }] : [])),
    );
  }, []);

  const clear = useCallback(() => setLines([]), []);
  const close = useCallback(() => setOpen(false), []);

  const quantities = useMemo(() => new Map(lines.map((l) => [l.id, l.quantity])), [lines]);
  const count = lines.reduce((n, l) => n + l.quantity, 0);
  const category = menuCategories.find((c) => c.id === active) ?? menuCategories[0];
  const items = menuItems.filter((i) => i.category === active);

  return (
    <div className="mt-6">
      <MenuCategoryTabs categories={menuCategories} active={active} onChange={setActive} />
      <p className="mt-4 text-stone-400">{category.blurb}</p>
      <div className="mt-5 grid gap-3 sm:gap-4 lg:grid-cols-2">
        {items.map((item) => (
          <MenuItemCard key={item.id} item={item} quantity={quantities.get(item.id) ?? 0} onAdd={add} onRemove={remove} />
        ))}
      </div>

      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-28 right-4 z-30 inline-flex items-center gap-2 rounded-full bg-gold-500 px-4 py-3 text-sm font-semibold text-ink-950 shadow-glow transition hover:bg-gold-400 sm:px-5 sm:py-3.5 sm:text-base md:bottom-8 md:right-8"
        aria-label={`Open order, ${count} items`}
      >
        <ShoppingBag className="h-5 w-5" aria-hidden />
        {count > 0 ? `${count} item${count > 1 ? "s" : ""} · ${formatGHS(getSubtotal(lines))}` : "Your order"}
      </button>

      <WhatsAppOrderDrawer open={open} onClose={close} lines={lines} onAdd={add} onRemove={remove} onClear={clear} />
    </div>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import type { BookingDetails, BookingOccasion, SeatingPreference } from "@/types";
import { BOOKING_EVENT, buildBookingMessage, openWhatsApp } from "@/utils/whatsapp";
import { formatMinutes, getAccraDateISO } from "@/utils/hours";

const seatingOptions: SeatingPreference[] = ["Indoor", "Outdoor", "VIP Booth"];
const occasions: BookingOccasion[] = ["Casual Dining", "Football Match", "Friday Night Party"];

// Half-hour slots from 10:00 AM to 11:30 PM.
const timeSlots = Array.from({ length: 28 }, (_, i) => {
  const minutes = 10 * 60 + i * 30;
  const value = `${Math.floor(minutes / 60).toString().padStart(2, "0")}:${(minutes % 60).toString().padStart(2, "0")}`;
  return { value, label: formatMinutes(minutes) };
});

const emptyForm = (): BookingDetails => ({
  name: "",
  date: "",
  time: "19:00",
  partySize: 2,
  seating: "Indoor",
  occasion: "Casual Dining",
  notes: "",
});

export default function WhatsAppBookingModal() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<BookingDetails>(emptyForm);
  const [error, setError] = useState("");
  const today = useMemo(() => (open ? getAccraDateISO() : ""), [open]);

  useEffect(() => {
    const onOpen = () => {
      setForm({ ...emptyForm(), date: getAccraDateISO() });
      setError("");
      setOpen(true);
    };
    window.addEventListener(BOOKING_EVENT, onOpen);
    return () => window.removeEventListener(BOOKING_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const set = <K extends keyof BookingDetails>(key: K, value: BookingDetails[K]) => {
    setError("");
    setForm((f) => ({ ...f, [key]: value }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return setError("Enter your name.");
    if (!form.date || form.date < getAccraDateISO()) return setError("Pick today or a future date.");
    if (!Number.isFinite(form.partySize) || form.partySize < 1) return setError("Party size must be at least 1.");
    const label = timeSlots.find((t) => t.value === form.time)?.label ?? form.time;
    openWhatsApp(buildBookingMessage({ ...form, time: label }));
    setOpen(false);
  };

  const field =
    "w-full rounded-xl border border-ink-600 bg-ink-800 px-4 py-3 text-sm text-white placeholder:text-stone-500 focus:border-gold-500 focus:outline-none";
  const label = "mb-1.5 block text-sm font-medium text-stone-300";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 sm:items-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        >
          <motion.form
            role="dialog"
            aria-modal="true"
            aria-label="Book a table"
            onSubmit={submit}
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 40 }}
            animate={{ y: 0 }}
            exit={{ y: 40 }}
            transition={{ type: "tween", duration: 0.2 }}
            className="flex max-h-[92dvh] w-full max-w-lg flex-col rounded-t-3xl border border-ink-700 bg-ink-900 sm:rounded-3xl"
          >
            <div className="flex items-center justify-between border-b border-ink-700 px-6 py-4">
              <h2 className="font-display text-xl font-semibold text-white">Book a table</h2>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close booking form" className="grid h-9 w-9 place-items-center rounded-full text-stone-300 hover:bg-ink-700">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div data-lenis-prevent className="space-y-4 overflow-y-auto px-6 py-5">
              <div>
                <label htmlFor="b-name" className={label}>Name</label>
                <input id="b-name" className={field} value={form.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="b-date" className={label}>Date</label>
                  <input id="b-date" type="date" min={today} className={field} value={form.date} onChange={(e) => set("date", e.target.value)} />
                </div>
                <div>
                  <label htmlFor="b-time" className={label}>Time</label>
                  <select id="b-time" className={field} value={form.time} onChange={(e) => set("time", e.target.value)}>
                    {timeSlots.map((t) => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="b-size" className={label}>Party size</label>
                <input id="b-size" type="number" min={1} max={60} className={field} value={form.partySize} onChange={(e) => set("partySize", Number(e.target.value))} />
              </div>

              <fieldset>
                <legend className={label}>Seating</legend>
                <div className="grid grid-cols-3 gap-2">
                  {seatingOptions.map((s) => (
                    <button key={s} type="button" aria-pressed={form.seating === s} onClick={() => set("seating", s)}
                      className={`rounded-xl border px-2 py-2.5 text-sm font-medium transition ${form.seating === s ? "border-gold-500 bg-gold-500/15 text-gold-300" : "border-ink-600 text-stone-300"}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className={label}>Occasion</legend>
                <div className="grid gap-2 sm:grid-cols-3">
                  {occasions.map((o) => (
                    <button key={o} type="button" aria-pressed={form.occasion === o} onClick={() => set("occasion", o)}
                      className={`rounded-xl border px-2 py-2.5 text-sm font-medium transition ${form.occasion === o ? "border-gold-500 bg-gold-500/15 text-gold-300" : "border-ink-600 text-stone-300"}`}>
                      {o}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div>
                <label htmlFor="b-notes" className={label}>Notes (optional)</label>
                <textarea id="b-notes" rows={2} className={field} value={form.notes} onChange={(e) => set("notes", e.target.value)} placeholder="Tour group, birthday, special requests" />
              </div>
            </div>

            <div className="space-y-3 border-t border-ink-700 px-6 py-4">
              {error && <p role="alert" className="text-sm text-red-300">{error}</p>}
              <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-full bg-emerald-500 px-5 py-3.5 font-semibold text-ink-950 transition hover:bg-emerald-400">
                <MessageCircle className="h-5 w-5" aria-hidden /> Send Booking on WhatsApp
              </button>
            </div>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

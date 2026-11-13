"use client";

import Link from "next/link";
import { CalendarDays, MessageCircle, UtensilsCrossed } from "lucide-react";
import { buildWhatsAppUrl, openBookingModal } from "@/utils/whatsapp";

const base =
  "flex flex-1 flex-col items-center gap-1 rounded-xl py-2 text-xs font-medium text-stone-200 active:bg-ink-700";

export default function MobileStickyBar() {
  return (
    <div className="pb-safe fixed inset-x-0 bottom-0 z-40 border-t border-ink-700 bg-ink-950/95 px-2 pt-2 backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-md items-stretch gap-1">
        <Link href="/menu" className={base}>
          <UtensilsCrossed className="h-5 w-5 text-gold-400" aria-hidden /> Menu
        </Link>
        <button type="button" onClick={openBookingModal} className={base}>
          <CalendarDays className="h-5 w-5 text-gold-400" aria-hidden /> Book Table
        </button>
        <a
          href={buildWhatsAppUrl("Hello Yaayi’s Pub & Grill, I have a question.")}
          target="_blank"
          rel="noopener noreferrer"
          className={base}
        >
          <MessageCircle className="h-5 w-5 text-emerald-400" aria-hidden /> WhatsApp Us
        </a>
      </div>
    </div>
  );
}

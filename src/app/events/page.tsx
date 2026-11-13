import type { Metadata } from "next";
import Image from "next/image";
import { Music2, PartyPopper, Trophy } from "lucide-react";
import { events } from "@/data/events";
import { businessInfo } from "@/data/businessInfo";
import { buildWhatsAppUrl } from "@/utils/whatsapp";

export const metadata: Metadata = {
  title: "Events & Nightlife",
  description:
    "Live DJ nights, weekend parties and live football watch parties at Yaayi's Pub & Grill, Hospital Road, Damongo. Book a table or VIP booth on WhatsApp.",
};

const icons = { music: Music2, party: PartyPopper, football: Trophy } as const;

export default function EventsPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-24 pt-28 sm:px-6">
      <h1 className="font-display text-4xl font-semibold text-white sm:text-5xl">Events &amp; nightlife</h1>
      <p className="mt-3 max-w-xl text-stone-400">
        {businessInfo.name} stays open late: until 12:00 AM most nights and 12:30 AM on Fridays.
      </p>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((e) => {
          const Icon = icons[e.icon];
          return (
            <article key={e.id} className="flex flex-col overflow-hidden rounded-2xl border border-ink-700 bg-ink-900">
              {/* Event image */}
              {e.image && (
                <div className="relative aspect-video w-full shrink-0">
                  <Image
                    src={e.image.src}
                    alt={e.image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-900/70 to-transparent" />
                </div>
              )}
              <div className="flex flex-1 flex-col p-6">
                <Icon className="h-8 w-8 text-gold-400" aria-hidden />
                <h2 className="mt-4 font-display text-2xl font-semibold text-white">{e.title}</h2>
                <p className="mt-1 text-sm font-medium text-gold-400">{e.schedule}</p>
                <p className="mt-3 flex-1 text-stone-400">{e.description}</p>
                <a
                  href={buildWhatsAppUrl(`Hello ${businessInfo.name}, I would like to book a table for: ${e.title}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center justify-center rounded-full bg-gold-500 px-5 py-3 text-sm font-semibold text-ink-950 transition hover:bg-gold-400"
                >
                  Book for {e.title}
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

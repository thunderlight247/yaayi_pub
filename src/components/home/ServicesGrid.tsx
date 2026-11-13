import { Armchair, Bike, CalendarCheck, Music2, PartyPopper, ShoppingBag, Trophy } from "lucide-react";
import { businessInfo } from "@/data/businessInfo";

const icons = [Armchair, ShoppingBag, Bike, CalendarCheck, Music2, PartyPopper, Trophy];

export default function ServicesGrid() {
  return (
    <section className="bg-ink-900 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">Ways to enjoy it</h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {businessInfo.services.map((service, i) => {
            const Icon = icons[i % icons.length];
            return (
              <li key={service} className="flex items-center gap-4 rounded-2xl border border-ink-700 bg-ink-950 p-5">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gold-500/15 text-gold-400">
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <span className="font-medium text-stone-200">{service}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

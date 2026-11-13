import Link from "next/link";
import { featuredItemIds, menuItems } from "@/data/menu";
import { formatGHS } from "@/utils/whatsapp";
import { SafeImage } from "@/components/menu/MenuItemCard";

export default function FeaturedDishes() {
  const featured = featuredItemIds
    .map((id) => menuItems.find((i) => i.id === id))
    .filter((i): i is NonNullable<typeof i> => Boolean(i));

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">From the grill</h2>
          <p className="mt-2 max-w-md text-stone-400">The plates Damongo orders most.</p>
        </div>
        <Link href="/menu" className="text-sm font-medium text-gold-400 hover:text-gold-300">See the full menu</Link>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((item) => (
          <article key={item.id} className="overflow-hidden rounded-2xl border border-ink-700 bg-ink-900">
            <div className="relative aspect-[4/3]">
              <SafeImage image={item.image} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
            </div>
            <div className="p-4">
              <h3 className="font-display text-lg font-semibold leading-snug text-white">{item.name}</h3>
              <p className="mt-1 text-sm text-stone-400">{item.description}</p>
              <p className="mt-3 font-semibold text-gold-400">{formatGHS(item.price)}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

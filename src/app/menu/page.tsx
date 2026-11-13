import type { Metadata } from "next";
import { MenuWithOrdering } from "@/components/menu/WhatsAppOrderDrawer";
import { businessInfo } from "@/data/businessInfo";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Banku with grilled tilapia or chicken, jollof and fried rice, spicy wings, pizza, kelewele and a full bar. Order delivery or takeout from Yaayi’s Pub & Grill in Damongo on WhatsApp.",
};

export default function MenuPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-24 pt-28 sm:px-6">
      <h1 className="font-display text-4xl font-semibold text-white sm:text-5xl">Menu</h1>
      <p className="mt-3 max-w-xl text-stone-400">
        Add what you like, choose delivery or takeout, and send the order straight to our WhatsApp. Average spend{" "}
        {businessInfo.averageSpend}. Prices are in Ghanaian Cedis.
      </p>
      <MenuWithOrdering />
    </section>
  );
}

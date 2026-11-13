import { Clock, Compass, MapPin, MessageCircle } from "lucide-react";
import { businessInfo } from "@/data/businessInfo";
import { formatDayHours } from "@/utils/hours";
import { buildWhatsAppUrl } from "@/utils/whatsapp";

export default function LocationMapSection() {
  const q = encodeURIComponent(businessInfo.mapQuery);
  return (
    <section className="bg-ink-900 py-16">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">Find us in Damongo</h2>
          <p className="mt-4 flex gap-3 text-stone-300">
            <MapPin className="mt-1 h-5 w-5 shrink-0 text-gold-400" aria-hidden />
            <span>
              {businessInfo.addressLines.map((l) => (
                <span key={l} className="block">{l}</span>
              ))}
            </span>
          </p>
          <p className="mt-4 flex gap-3 text-stone-400">
            <Compass className="mt-1 h-5 w-5 shrink-0 text-gold-400" aria-hidden />
            <span>{businessInfo.addressNote}</span>
          </p>

          <div className="mt-6">
            <p className="flex items-center gap-2 font-medium text-white">
              <Clock className="h-5 w-5 text-gold-400" aria-hidden /> Opening hours (Ghana time)
            </p>
            <ul className="mt-3 max-w-sm space-y-1.5 text-sm">
              {[1, 2, 3, 4, 5, 6, 0].map((idx) => (
                <li key={idx} className="flex justify-between border-b border-ink-700 pb-1.5 text-stone-300">
                  <span>{businessInfo.hours[idx].label}</span>
                  <span>{formatDayHours(idx)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href={`https://www.google.com/maps/dir/?api=1&destination=${q}`} target="_blank" rel="noopener noreferrer"
              className="rounded-full bg-gold-500 px-5 py-3 text-sm font-semibold text-ink-950 transition hover:bg-gold-400">
              Get directions
            </a>
            <a href={buildWhatsAppUrl("Hello Yaayi’s Pub & Grill, how do I get to you?")} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-ink-600 px-5 py-3 text-sm font-semibold text-white transition hover:border-gold-500">
              <MessageCircle className="h-4 w-4 text-emerald-400" aria-hidden /> Ask on WhatsApp
            </a>
          </div>
        </div>

        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-ink-700 bg-ink-800 sm:aspect-video lg:aspect-auto lg:min-h-[420px]">
          <iframe
            title="Map showing Yaayi’s Pub & Grill on Hospital Road, Damongo"
            src={`https://www.google.com/maps?q=${q}&output=embed`}
            className="absolute inset-0 h-full w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}

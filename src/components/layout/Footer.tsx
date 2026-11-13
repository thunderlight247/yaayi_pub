import Link from "next/link";
import { MapPin, MessageCircle, Phone } from "lucide-react";
import { businessInfo } from "@/data/businessInfo";
import { formatDayHours } from "@/utils/hours";
import { buildWhatsAppUrl } from "@/utils/whatsapp";

export default function Footer() {
  return (
    <footer className="border-t border-ink-700 bg-ink-900 pb-20 md:pb-0">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-display text-xl font-semibold text-white">{businessInfo.name}</p>
          <p className="mt-2 max-w-xs text-sm text-stone-400">{businessInfo.tagline}</p>
          <ul className="mt-4 flex gap-5 text-sm text-stone-300">
            <li><Link href="/menu" className="hover:text-gold-400">Menu</Link></li>
            <li><Link href="/events" className="hover:text-gold-400">Events</Link></li>
          </ul>
        </div>

        <address className="space-y-3 text-sm not-italic text-stone-300">
          <p className="font-medium text-white">Find us</p>
          <p className="flex gap-2">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" aria-hidden />
            <span>
              {businessInfo.addressLines.map((l) => (
                <span key={l} className="block">{l}</span>
              ))}
            </span>
          </p>
          <p className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-gold-400" aria-hidden />
            <a href={`tel:+${businessInfo.whatsappNumber}`} className="hover:text-gold-400">{businessInfo.phoneDisplay}</a>
          </p>
          <p className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4 text-emerald-400" aria-hidden />
            <a href={buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="hover:text-gold-400">
              Chat on WhatsApp
            </a>
          </p>
        </address>

        <div className="text-sm text-stone-300">
          <p className="font-medium text-white">Opening hours</p>
          <ul className="mt-3 space-y-1">
            {[1, 2, 3, 4, 5, 6, 0].map((idx) => (
              <li key={idx} className="flex justify-between gap-4">
                <span className="text-stone-400">{businessInfo.hours[idx].label}</span>
                <span>{formatDayHours(idx)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-ink-700 py-5 text-center text-xs text-stone-500">
        © {new Date().getFullYear()} {businessInfo.name}. Damongo, Ghana.
      </div>
    </footer>
  );
}

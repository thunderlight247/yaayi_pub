import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileStickyBar from "@/components/layout/MobileStickyBar";
import WhatsAppBookingModal from "@/components/booking/WhatsAppBookingModal";
import { buildJsonLd } from "@/data/businessInfo";

const display = Fraunces({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Yaayi’s Pub & Grill | Restaurant, Bar & Nightlife in Damongo",
    template: "%s | Yaayi’s Pub & Grill, Damongo",
  },
  description:
    "Banku with grilled tilapia, jollof and fried rice with grilled chicken, pizza, cold drinks, live DJ nights and football watch parties on Hospital Road, Damongo. Order or book on WhatsApp. Near Mole National Park.",
  keywords: [
    "Damongo restaurant",
    "Damongo bar",
    "Yaayi's Pub & Grill",
    "restaurant near Mole National Park",
    "banku and tilapia Damongo",
    "nightlife Savannah Region",
  ],
  openGraph: {
    title: "Yaayi’s Pub & Grill, Damongo",
    description: "Grills, local dishes, drinks and nightlife on Hospital Road, Damongo.",
    type: "website",
    locale: "en_GH",
    images: [{ url: "/images/party-platter.webp", alt: "Party platter from Yaayi’s Pub & Grill" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(siteUrl)) }}
        />
        <Navbar />
        <main className="min-h-screen pb-20 md:pb-0">{children}</main>
        <Footer />
        <MobileStickyBar />
        <WhatsAppBookingModal />
      </body>
    </html>
  );
}

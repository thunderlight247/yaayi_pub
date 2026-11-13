import type { BusinessInfo } from "@/types";

const WEEKDAY: [number, number] = [10 * 60, 24 * 60];
const FRIDAY: [number, number] = [10 * 60, 24 * 60 + 30];

export const businessInfo: BusinessInfo = {
  name: "Yaayi’s Pub & Grill",
  tagline: "Grilled chicken, banku, cold drinks and late nights in Damongo.",
  phoneDisplay: "+233 55 862 8466",
  whatsappNumber: "233558628466",
  addressLines: ["Before the market, Hospital Road", "Damongo, Savannah Region, Ghana"],
  addressNote:
    "Visiting Mole National Park? We are in Damongo, the town closest to the park gate, so we make an easy meal stop before or after your safari.",
  mapQuery: "Yaayi's Pub & Grill, Hospital Road, Damongo, Ghana",
  timezone: "Africa/Accra",
  hours: [
    { label: "Sunday", open: WEEKDAY[0], close: WEEKDAY[1] },
    { label: "Monday", open: WEEKDAY[0], close: WEEKDAY[1] },
    { label: "Tuesday", open: WEEKDAY[0], close: WEEKDAY[1] },
    { label: "Wednesday", open: WEEKDAY[0], close: WEEKDAY[1] },
    { label: "Thursday", open: WEEKDAY[0], close: WEEKDAY[1] },
    { label: "Friday", open: FRIDAY[0], close: FRIDAY[1] },
    { label: "Saturday", open: WEEKDAY[0], close: WEEKDAY[1] },
  ],
  averageSpend: "GHS 50 – 100 per person",
  services: [
    "Dine-in (indoor and open-air outdoor seating)",
    "Takeout",
    "Local delivery",
    "Table and VIP booth reservations",
    "Live DJ nights",
    "Weekend parties",
    "Live football watch parties",
  ],
};

export function buildJsonLd(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": ["Restaurant", "BarOrPub"],
    name: "Yaayi's Pub & Grill",
    description:
      "Restaurant, bar and nightlife spot in Damongo serving banku with grilled tilapia, jollof and fried rice with grilled chicken, pizza and a full bar. A convenient stop for Mole National Park visitors.",
    url: siteUrl,
    telephone: "+233558628466",
    priceRange: "GHS 50 - GHS 100",
    servesCuisine: ["Ghanaian", "Grill", "Pizza"],
    acceptsReservations: true,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Before the market, Hospital Road",
      addressLocality: "Damongo",
      addressRegion: "Savannah Region",
      addressCountry: "GH",
    },
    areaServed: ["Damongo", "Savannah Region", "Mole National Park visitors"],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Saturday", "Sunday"],
        opens: "10:00",
        closes: "00:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Friday",
        opens: "10:00",
        closes: "00:30",
      },
    ],
    potentialAction: {
      "@type": "ReserveAction",
      target: "https://wa.me/233558628466",
    },
  };
}

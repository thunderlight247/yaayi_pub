import { businessInfo } from "@/data/businessInfo";
import type { BookingDetails, CartLine, OrderDetails } from "@/types";

export const BOOKING_EVENT = "yaayis:open-booking";

export function formatGHS(amount: number): string {
  return `GHS ${amount.toLocaleString("en-GH", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}

export function buildWhatsAppUrl(message?: string): string {
  const base = `https://wa.me/${businessInfo.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function getSubtotal(lines: CartLine[]): number {
  return lines.reduce((sum, l) => sum + l.price * l.quantity, 0);
}

export function buildOrderMessage(lines: CartLine[], details: OrderDetails): string {
  const items = lines
    .map((l) => `• ${l.quantity} x ${l.name} — ${formatGHS(l.price * l.quantity)}`)
    .join("\n");
  const parts = [
    `Hello ${businessInfo.name}, I would like to place an order.`,
    "",
    `*Name:* ${details.name.trim()}`,
    `*Type:* ${details.fulfilment}`,
  ];
  if (details.fulfilment === "Delivery") parts.push(`*Delivery landmark:* ${details.landmark.trim()}`);
  parts.push("", "*Order:*", items, "", `*Estimated subtotal:* ${formatGHS(getSubtotal(lines))}`);
  if (details.notes.trim()) parts.push("", `*Notes:* ${details.notes.trim()}`);
  parts.push("", "Please confirm availability and the final total. Thank you!");
  return parts.join("\n");
}

export function buildBookingMessage(b: BookingDetails): string {
  const [y, m, d] = b.date.split("-").map(Number);
  const prettyDate = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(y, m - 1, d)));
  const parts = [
    `Hello ${businessInfo.name}, I would like to book a table.`,
    "",
    `*Name:* ${b.name.trim()}`,
    `*Date:* ${prettyDate}`,
    `*Time:* ${b.time}`,
    `*Party size:* ${b.partySize}`,
    `*Seating:* ${b.seating}`,
    `*Occasion:* ${b.occasion}`,
  ];
  if (b.notes.trim()) parts.push(`*Notes:* ${b.notes.trim()}`);
  parts.push("", "Please confirm availability. Thank you!");
  return parts.join("\n");
}

export function openWhatsApp(message?: string): void {
  window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
}

/** Opens the booking modal mounted in the root layout. */
export function openBookingModal(): void {
  window.dispatchEvent(new CustomEvent(BOOKING_EVENT));
}

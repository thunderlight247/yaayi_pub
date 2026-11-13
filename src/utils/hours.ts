import { businessInfo } from "@/data/businessInfo";
import type { OpenStatus } from "@/types";

const WEEKDAY_INDEX: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

/** Current weekday (0 = Sunday) and minutes after midnight in Africa/Accra. */
export function getAccraClock(date: Date = new Date()): { day: number; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: businessInfo.timezone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return {
    day: WEEKDAY_INDEX[get("weekday")] ?? 0,
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

/** Today's date (YYYY-MM-DD) in Africa/Accra, for date inputs. */
export function getAccraDateISO(date: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: businessInfo.timezone }).format(date);
}

export function formatMinutes(total: number): string {
  const normalised = ((total % 1440) + 1440) % 1440;
  const h24 = Math.floor(normalised / 60);
  const m = normalised % 60;
  const suffix = h24 >= 12 ? "PM" : "AM";
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:${m.toString().padStart(2, "0")} ${suffix}`;
}

export function formatDayHours(index: number): string {
  const d = businessInfo.hours[index];
  return `${formatMinutes(d.open)} – ${formatMinutes(d.close)}`;
}

export function getOpenStatus(date: Date = new Date()): OpenStatus {
  const { day, minutes } = getAccraClock(date);
  const today = businessInfo.hours[day];
  const yesterday = businessInfo.hours[(day + 6) % 7];

  // Still open from yesterday's late close (e.g. Friday until 12:30 AM Saturday).
  const spill = yesterday.close - 1440;
  if (spill > 0 && minutes < spill) {
    return { isOpen: true, label: "Open now", detail: `Closes ${formatMinutes(spill)}` };
  }
  if (minutes >= today.open && minutes < today.close) {
    return { isOpen: true, label: "Open now", detail: `Closes ${formatMinutes(today.close)}` };
  }
  if (minutes < today.open) {
    return { isOpen: false, label: "Closed", detail: `Opens today ${formatMinutes(today.open)}` };
  }
  const next = businessInfo.hours[(day + 1) % 7];
  return { isOpen: false, label: "Closed", detail: `Opens tomorrow ${formatMinutes(next.open)}` };
}

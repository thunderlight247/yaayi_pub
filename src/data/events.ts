import type { EventItem } from "@/types";

export const events: EventItem[] = [
  {
    id: "live-dj",
    title: "Live DJ Nights",
    schedule: "Friday nights, until 12:30 AM",
    description: "Afrobeats, highlife and amapiano on the open-air floor. Grab a VIP booth early.",
    icon: "music",
    occasion: "Friday Night Party",
  },
  {
    id: "weekend-parties",
    title: "Weekend Parties",
    schedule: "Saturdays and Sundays",
    description: "Birthdays, celebrations and group nights with grills, drinks and music.",
    icon: "party",
    occasion: "Friday Night Party",
  },
  {
    id: "football",
    title: "Live Football Watch Parties",
    schedule: "Match days — message us for fixtures",
    description: "Big screen, cold beer and grilled wings. Book a table before kick-off.",
    icon: "football",
    occasion: "Football Match",
  },
];

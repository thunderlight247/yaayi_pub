import type { EventItem } from "@/types";

export const events: EventItem[] = [
  {
    id: "live-dj",
    title: "Live DJ Nights",
    schedule: "Friday nights, until 12:30 AM",
    description: "Afrobeats, highlife and amapiano on the open-air floor. Grab a VIP booth early.",
    icon: "music",
    occasion: "Friday Night Party",
    image: {
      src: "/images/event-dj.jpg",
      alt: "DJ performing at Yaayi's Pub & Grill live DJ night, Damongo",
    },
  },
  {
    id: "weekend-parties",
    title: "Weekend Parties",
    schedule: "Saturdays and Sundays",
    description: "Birthdays, celebrations and group nights with grills, drinks and music.",
    icon: "party",
    occasion: "Friday Night Party",
    image: {
      src: "/images/event-party.jpg",
      alt: "Weekend party celebration with friends at Yaayi's Pub & Grill",
    },
  },
  {
    id: "football",
    title: "Live Football Watch Parties",
    schedule: "Match days — message us for fixtures",
    description: "Big screen, cold beer and grilled wings. Book a table before kick-off.",
    icon: "football",
    occasion: "Football Match",
    image: {
      src: "/images/event-football.jpg",
      alt: "Live football match watch party at Yaayi's Pub & Grill with cold drinks",
    },
  },
];

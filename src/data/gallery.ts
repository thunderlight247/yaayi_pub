import type { GalleryItem } from "@/types";

// Drop more photos into public/images/ using these filenames and the layout fills in automatically.
export const galleryItems: GalleryItem[] = [
  {
    id: "banku-tilapia",
    caption: "Banku with grilled tilapia",
    aspect: "aspect-[3/4]",
    image: {
      src: "/images/banku-tilapia.jpg",
      alt: "Banku with whole grilled tilapia and pepper sauce — Yaayi's Pub & Grill, Damongo",
    },
  },
  {
    id: "jollof-chicken",
    caption: "Chicken dum biryani",
    aspect: "aspect-[3/4]",
    image: {
      src: "/images/chicken-dum-biryani6.jpg",
      alt: "Chicken dum biryani with crispy fried onions at Yaayi's Pub & Grill",
    },
  },
  {
    id: "spicy-wings",
    caption: "Spicy grilled wings",
    aspect: "aspect-square",
    image: {
      src: "/images/spicy-wings.jpg",
      alt: "Spicy grilled chicken wings served at Yaayi's Pub & Grill",
    },
  },
  {
    id: "drinks-bar",
    caption: "Cold drinks & cocktails",
    aspect: "aspect-[4/3]",
    image: {
      src: "/images/champagne.jpg",
      alt: "Chilled champagne and drinks at Yaayi's Pub & Grill bar",
    },
  },
  {
    id: "lounge-vibe",
    caption: "Outside Yaayi's on the road",
    aspect: "aspect-[4/3]",
    image: {
      src: "/images/WhatsApp%20Image%202026-11-13%20at%202.24.06%20PM.jpeg",
      alt: "Yaayi's Pub & Grill building and signboard on Hospital Road, Damongo",
    },
  },
  {
    id: "dj-night",
    caption: "Live DJ nights every Friday",
    aspect: "aspect-square",
    image: {
      src: "/images/event-dj.jpg",
      alt: "Live DJ night at Yaayi's Pub & Grill every Friday",
    },
  },
];

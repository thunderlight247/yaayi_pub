import type { GalleryItem } from "@/types";

// Drop more photos into public/images/ using these filenames and the layout fills in automatically.
export const galleryItems: GalleryItem[] = [
  {
    id: "party-platter",
    caption: "Chicken mandi for sharing",
    aspect: "aspect-[3/4]",
    image: {
      src: "/images/chicken-mandi10.jpg",
      alt: "Party platter of assorted rice, grilled chicken, meat and salads from Yaayi’s Pub & Grill in Damongo",
    },
  },
  {
    id: "jollof-chicken",
    caption: "Chicken dum biryani",
    aspect: "aspect-[3/4]",
    image: {
      src: "/images/chicken-dum-biryani6.jpg",
      alt: "Jollof rice with grilled chicken leg and salad served at Yaayi’s Pub & Grill",
    },
  },
  {
    id: "banku-tilapia",
    caption: "Aloo poori",
    aspect: "aspect-square",
    image: {
      src: "/images/aloo-poori1.jpeg",
      alt: "Aloo poori with potato curry served at Yaayi’s Pub & Grill",
    },
  },
  {
    id: "drinks-bar",
    caption: "Chicken manchurian",
    aspect: "aspect-[4/3]",
    image: {
      src: "/images/babycorn-manchurian3.jpg",
      alt: "Chicken manchurian with peppers and spring onions at Yaayi’s Pub & Grill",
    },
  },
  {
    id: "lounge-vibe",
    caption: "Outside Yaayi’s on the road",
    aspect: "aspect-[4/3]",
    image: {
      src: "/images/WhatsApp%20Image%202026-11-13%20at%202.24.06%20PM.jpeg",
      alt: "Yaayi’s Pub & Grill building and signboard on the road in Damongo",
    },
  },
  {
    id: "dj-night",
    caption: "Bhel puri",
    aspect: "aspect-square",
    image: {
      src: "/images/bhel-puri4.jpg",
      alt: "Bhel puri with puffed rice, sev and onion served at Yaayi’s Pub & Grill",
    },
  },
];

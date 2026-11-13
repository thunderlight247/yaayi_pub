export interface ImageAsset {
  src: string;
  alt: string;
}

export type MenuCategoryId = "local" | "rice-grills" | "pizza-sides" | "bar";

export interface MenuCategory {
  id: MenuCategoryId;
  label: string;
  blurb: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  /** Price in Ghanaian Cedis (GHS). */
  price: number;
  category: MenuCategoryId;
  image?: ImageAsset;
  popular?: boolean;
}

export interface CartLine {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export type Fulfilment = "Delivery" | "Takeout";

export interface OrderDetails {
  name: string;
  fulfilment: Fulfilment;
  landmark: string;
  notes: string;
}

export type SeatingPreference = "Indoor" | "Outdoor" | "VIP Booth";
export type BookingOccasion = "Casual Dining" | "Football Match" | "Friday Night Party";

export interface BookingDetails {
  name: string;
  date: string;
  time: string;
  partySize: number;
  seating: SeatingPreference;
  occasion: BookingOccasion;
  notes: string;
}

export interface EventItem {
  id: string;
  title: string;
  schedule: string;
  description: string;
  icon: "music" | "party" | "football";
  occasion: BookingOccasion;
}

export interface GalleryItem {
  id: string;
  caption: string;
  image?: ImageAsset;
  /** Tailwind aspect ratio class so layout never shifts. */
  aspect: string;
}

export interface DayHours {
  label: string;
  /** Minutes after midnight. */
  open: number;
  /** Minutes after midnight; values above 1440 mean closing after midnight the next day. */
  close: number;
}

export interface OpenStatus {
  isOpen: boolean;
  label: string;
  detail: string;
}

export interface BusinessInfo {
  name: string;
  tagline: string;
  phoneDisplay: string;
  whatsappNumber: string;
  addressLines: string[];
  addressNote: string;
  mapQuery: string;
  timezone: string;
  /** Index 0 = Sunday ... 6 = Saturday. */
  hours: DayHours[];
  averageSpend: string;
  services: string[];
}

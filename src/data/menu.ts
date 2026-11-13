import type { MenuCategory, MenuItem } from "@/types";

// NOTE: Prices are sample values within the GHS 50 - 100 average spend. Confirm with the owner.

export const menuCategories: MenuCategory[] = [
  { id: "local", label: "Local Ghanaian", blurb: "Banku with fresh grilled fish and chicken." },
  { id: "rice-grills", label: "Rice & Grills", blurb: "Jollof, fried rice and spicy wings off the grill." },
  { id: "pizza-sides", label: "Pizza & Sides", blurb: "Pizza to share, kelewele and spicy fries." },
  { id: "bar", label: "Full Bar & Drinks", blurb: "Beer, wine, champagne, spirits and soft drinks." },
];

export const menuItems: MenuItem[] = [
  {
    id: "banku-tilapia",
    name: "Banku with Grilled Tilapia",
    description: "Smooth banku, whole grilled tilapia, hot pepper sauce and onions.",
    price: 85,
    category: "local",
    popular: true,
    image: {
      src: "/images/banku-tilapia.jpg",
      alt: "Banku with fresh grilled tilapia and pepper sauce served at Yaayi’s Pub & Grill, Damongo",
    },
  },
  {
    id: "banku-chicken",
    name: "Banku with Grilled Chicken",
    description: "Banku with chargrilled chicken and fresh pepper sauce.",
    price: 70,
    category: "local",
    image: {
      src: "/images/banku-chicken.jpg",
      alt: "Banku with chargrilled chicken and fresh pepper sauce at Yaayi’s Pub & Grill",
    },
  },
  {
    id: "jollof-chicken",
    name: "Chicken Dum Biryani",
    description: "Fragrant basmati rice slow-cooked with chicken, spices and crispy fried onions.",
    price: 65,
    category: "rice-grills",
    popular: true,
    image: {
      src: "/images/chicken-dum-biryani6.jpg",
      alt: "Bowl of chicken dum biryani with crispy fried onions and fresh herbs at Yaayi’s Pub & Grill, Damongo",
    },
  },
  {
    id: "fried-rice-chicken",
    name: "Chicken Fried Rice",
    description: "Fried rice with shredded chicken, peas, red pepper and spring onions.",
    price: 65,
    category: "rice-grills",
    popular: true,
    image: {
      src: "/images/chicken-fried-rice7.jpg",
      alt: "Plate of chicken fried rice with peas, peppers and spring onions at Yaayi’s Pub & Grill",
    },
  },
  {
    id: "chicken-65-biryani",
    name: "Chicken 65 Biryani",
    description: "Basmati rice layered with spicy, deep-fried chicken 65 and fresh coriander.",
    price: 70,
    category: "rice-grills",
    image: {
      src: "/images/chicken-65-biryani5.jpeg",
      alt: "Chicken 65 biryani topped with coriander and served with raita at Yaayi’s Pub & Grill",
    },
  },
  {
    id: "spicy-wings",
    name: "Spicy Grilled Chicken Wings",
    description: "Wings marinated in house pepper spices and finished over the grill.",
    price: 60,
    category: "rice-grills",
    popular: true,
    image: {
      src: "/images/spicy-wings.jpg",
      alt: "Crispy grilled spicy chicken wings at Yaayi’s Pub & Grill",
    },
  },
  {
    id: "aloo-samosa",
    name: "Aloo Samosa",
    description: "Crispy pastry filled with spiced potato, served with chilli sauce and onion.",
    price: 25,
    category: "pizza-sides",
    image: {
      src: "/images/aloo-samosa2.jpeg",
      alt: "Aloo samosas with red onion and chilli sauce at Yaayi’s Pub & Grill",
    },
  },
  {
    id: "assorted-pizza",
    name: "Assorted Pizzas",
    description: "Freshly baked pizza. Ask on WhatsApp for today’s toppings.",
    price: 90,
    category: "pizza-sides",
    image: {
      src: "/images/assorted-pizza.jpg",
      alt: "Freshly baked hot assorted pizza at Yaayi’s Pub & Grill",
    },
  },
  {
    id: "kelewele-fries",
    name: "Kelewele / Spicy Fries",
    description: "Spiced fried plantain or crispy fries, great with a cold drink.",
    price: 35,
    category: "pizza-sides",
    image: {
      src: "/images/kelewele.jpg",
      alt: "Spicy fried ripe plantain kelewele and crispy fries at Yaayi’s Pub & Grill",
    },
  },
  {
    id: "local-beer",
    name: "Local Beer",
    description: "Ice-cold Ghanaian beers.",
    price: 20,
    category: "bar",
    image: {
      src: "/images/local-beer.jpg",
      alt: "Ice-cold local Ghanaian beer in frosty glass at Yaayi’s Pub & Grill",
    },
  },
  {
    id: "imported-beer",
    name: "Imported Beer",
    description: "Chilled imported lagers and ciders.",
    price: 30,
    category: "bar",
    image: {
      src: "/images/imported-beer.jpg",
      alt: "Chilled imported lagers and ciders on ice at Yaayi’s Pub & Grill",
    },
  },
  {
    id: "wine",
    name: "Wine (bottle)",
    description: "Red, white and rosé wines.",
    price: 100,
    category: "bar",
    image: {
      src: "/images/wine-bottle.jpg",
      alt: "Fine red, white and rosé wine bottles at Yaayi’s Pub & Grill",
    },
  },
  {
    id: "champagne",
    name: "Champagne (bottle)",
    description: "For birthdays and big nights out.",
    price: 250,
    category: "bar",
    image: {
      src: "/images/champagne.jpg",
      alt: "Chilled champagne bottle with flutes for celebration at Yaayi’s Pub & Grill",
    },
  },
  {
    id: "whiskey-spirits",
    name: "Whiskey & Hard Liquor (shot)",
    description: "Whiskey and other spirits, served neat or with a mixer.",
    price: 25,
    category: "bar",
    image: {
      src: "/images/whiskey-spirits.jpg",
      alt: "Whiskey and hard liquor served neat or on the rocks at Yaayi’s Pub & Grill",
    },
  },
  {
    id: "soft-drinks",
    name: "Soft Drinks",
    description: "Sodas, juices and bottled water.",
    price: 10,
    category: "bar",
    image: {
      src: "/images/soft-drinks.jpg",
      alt: "Ice-cold soft drinks, sodas and juices at Yaayi’s Pub & Grill",
    },
  },
  {
    id: "chilled-yoghurt",
    name: "Chilled Yoghurt",
    description: "Cold, creamy yoghurt drink.",
    price: 15,
    category: "bar",
    image: {
      src: "/images/chilled-yoghurt.jpg",
      alt: "Refreshing chilled yoghurt drink at Yaayi’s Pub & Grill",
    },
  },
];

export const featuredItemIds = ["jollof-chicken", "fried-rice-chicken", "banku-tilapia", "spicy-wings"];

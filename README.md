# Yaayi’s Pub & Grill

Mobile-first Next.js (App Router, TypeScript, Tailwind) site for Yaayi’s Pub & Grill, Hospital Road, Damongo, Ghana. Orders and table bookings are sent through WhatsApp (+233 55 862 8466).

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck
npm run build
```

Optional: set `NEXT_PUBLIC_SITE_URL` (for example in `.env.local`) to your live domain so metadata and JSON-LD use it.

## What is inside

- `src/data/` static, typed content (business info, menu, events, gallery). Menu prices are sample values: confirm them with the owner.
- `src/utils/whatsapp.ts` builds order and booking messages; `src/utils/hours.ts` powers the Open/Closed badge in `Africa/Accra` time.
- Lenis smooth scroll is started in `Navbar.tsx`; GSAP + ScrollTrigger drive the hero parallax and the nightlife reveal.
- Tailwind is configured through the `postcss` key in `package.json` (no extra config file, to keep the project tree exact).

## Images

`public/images/` contains `jollof-chicken.webp` and `party-platter.webp`. Entries in `src/data/gallery.ts` without a photo show a branded tile. To fill them, add the file and set the `image` field (`src` and `alt`). Same for items in `src/data/menu.ts`.

See `docs/ARCHITECTURE_ROADMAP.md` for the phase 2 plan (Supabase, dynamic stock, QR table menus).

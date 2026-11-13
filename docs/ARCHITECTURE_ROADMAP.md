# Architecture Roadmap

## Phase 1 — Frontend only (this repo today)

- Next.js App Router, TypeScript, Tailwind CSS, `framer-motion`, `lucide-react`.
- Lenis (smooth scroll) and GSAP + ScrollTrigger (parallax and reveals).
- All content lives in static modules under `src/data/` (`businessInfo`, `menu`, `events`, `gallery`).
- Orders, table bookings and enquiries are built client-side and sent through WhatsApp deep links (`src/utils/whatsapp.ts`).
- The "Open now" badge is computed client-side in the `Africa/Accra` timezone (`src/utils/hours.ts`).
- Component modularity and lightweight-performance principles follow `jonathanrao99/Restaurant-Template`.
- No authentication, database or server API exists in this phase.

## Phase 2 — Backend, dynamic stock and QR table menus (future)

Phase 2 adopts patterns from two reference projects:

| Concern | Reference | What we adopt |
| --- | --- | --- |
| Database schema, Supabase integration, dynamic stock management | `rummanhassan13/thaal` | Menu, category, order and stock tables; availability flags; order status lifecycle |
| QR-code table menus | `dustinwloring1988/menuqr` | One QR per table (`/t/[tableId]`), a table-aware order flow, printable QR generation |

### Planned steps

1. **Supabase project.** Tables: `categories`, `menu_items`, `stock_levels`, `orders`, `order_items`, `tables`, `bookings`, `events`.
2. **Swap the data layer.** `src/data/*.ts` currently export plain typed arrays. Replace each export with an async loader of the same return type (for example `getMenuItems(): Promise<MenuItem[]>`) backed by Supabase. Components keep consuming the types in `src/types/index.ts`, so UI changes stay small.
3. **Dynamic stock.** Add `isAvailable` and `stockCount` to `MenuItem`. `MenuItemCard` shows "Sold out" and disables the add button.
4. **QR table menu.** Add `/t/[tableId]` routes that pre-fill the table number in the order. Orders go to Supabase instead of (or alongside) WhatsApp.
5. **Admin area.** Supabase Auth for staff: edit prices, toggle availability, view incoming orders and bookings.
6. **Realtime.** Supabase Realtime for a live kitchen/bar order board.
7. **Keep WhatsApp as a fallback** channel for customers who prefer it.

### Why the migration stays small

- Types are centralised in `src/types/index.ts`.
- Business facts, hours and WhatsApp number are in `src/data/businessInfo.ts`; no component hard-codes them.
- WhatsApp message building is isolated in `src/utils/whatsapp.ts`.

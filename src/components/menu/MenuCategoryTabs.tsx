"use client";

import type { MenuCategory, MenuCategoryId } from "@/types";

interface Props {
  categories: MenuCategory[];
  active: MenuCategoryId;
  onChange: (id: MenuCategoryId) => void;
}

export default function MenuCategoryTabs({ categories, active, onChange }: Props) {
  return (
    <div
      role="tablist"
      aria-label="Menu categories"
      data-lenis-prevent
      className="sticky top-16 z-20 -mx-4 flex gap-2 overflow-x-auto bg-ink-950/95 px-4 py-3 backdrop-blur sm:mx-0 sm:px-0"
    >
      {categories.map((c) => {
        const selected = c.id === active;
        return (
          <button
            key={c.id}
            role="tab"
            type="button"
            aria-selected={selected}
            onClick={() => onChange(c.id)}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition ${
              selected
                ? "border-gold-500 bg-gold-500 text-ink-950"
                : "border-ink-600 text-stone-300 hover:border-gold-500/60"
            }`}
          >
            {c.label}
          </button>
        );
      })}
    </div>
  );
}

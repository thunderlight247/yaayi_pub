"use client";

import Image from "next/image";
import { useState } from "react";
import { Flame, Minus, Plus } from "lucide-react";
import type { ImageAsset, MenuItem } from "@/types";
import { formatGHS } from "@/utils/whatsapp";

/** Image that fills a relatively positioned, fixed-aspect parent and falls back to a branded tile. */
export function SafeImage({
  image,
  sizes,
  priority = false,
  className = "",
}: {
  image?: ImageAsset;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  if (!image || failed) {
    return (
      <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-ink-700 via-ink-800 to-ink-900">
        <Flame className="h-10 w-10 text-gold-500/50" aria-hidden />
      </div>
    );
  }
  return (
    <Image
      src={image.src}
      alt={image.alt}
      fill
      sizes={sizes}
      priority={priority}
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  );
}

interface Props {
  item: MenuItem;
  quantity: number;
  onAdd: (item: MenuItem) => void;
  onRemove: (id: string) => void;
}

export default function MenuItemCard({ item, quantity, onAdd, onRemove }: Props) {
  return (
    <article className="flex overflow-hidden rounded-2xl border border-ink-700 bg-ink-900">
      <div className="relative aspect-square w-24 shrink-0 sm:w-36">
        <SafeImage image={item.image} sizes="(max-width: 640px) 96px, 144px" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col p-3 sm:p-4">
        <h3 className="font-display text-base font-semibold leading-snug text-white sm:text-lg">{item.name}</h3>
        <p className="mt-1 line-clamp-2 text-xs text-stone-400 sm:text-sm">{item.description}</p>
        <div className="mt-auto flex items-center justify-between pt-2 sm:pt-3">
          <span className="font-semibold text-gold-400">{formatGHS(item.price)}</span>
          {quantity === 0 ? (
            <button
              type="button"
              onClick={() => onAdd(item)}
              className="inline-flex items-center gap-1 rounded-full bg-gold-500 px-3 py-1.5 text-xs font-semibold text-ink-950 transition hover:bg-gold-400 sm:gap-1.5 sm:px-4 sm:py-2 sm:text-sm"
              aria-label={`Add ${item.name} to order`}
            >
              <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden /> Add
            </button>
          ) : (
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/50 px-1.5 py-1 sm:gap-3 sm:px-2">
              <button
                type="button"
                onClick={() => onRemove(item.id)}
                className="grid h-6 w-6 place-items-center rounded-full text-gold-400 hover:bg-ink-700 sm:h-7 sm:w-7"
                aria-label={`Remove one ${item.name}`}
              >
                <Minus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </button>
              <span className="min-w-4 text-center text-xs font-semibold text-white sm:text-sm" aria-live="polite">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => onAdd(item)}
                className="grid h-6 w-6 place-items-center rounded-full text-gold-400 hover:bg-ink-700 sm:h-7 sm:w-7"
                aria-label={`Add another ${item.name}`}
              >
                <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

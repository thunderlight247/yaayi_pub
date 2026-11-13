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
      <div className="relative aspect-square w-28 shrink-0 sm:w-36">
        <SafeImage image={item.image} sizes="(max-width: 640px) 112px, 144px" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col p-4">
        <h3 className="font-display text-lg font-semibold leading-snug text-white">{item.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-stone-400">{item.description}</p>
        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="font-semibold text-gold-400">{formatGHS(item.price)}</span>
          {quantity === 0 ? (
            <button
              type="button"
              onClick={() => onAdd(item)}
              className="inline-flex items-center gap-1.5 rounded-full bg-gold-500 px-4 py-2 text-sm font-semibold text-ink-950 transition hover:bg-gold-400"
              aria-label={`Add ${item.name} to order`}
            >
              <Plus className="h-4 w-4" aria-hidden /> Add
            </button>
          ) : (
            <div className="inline-flex items-center gap-3 rounded-full border border-gold-500/50 px-2 py-1">
              <button
                type="button"
                onClick={() => onRemove(item.id)}
                className="grid h-7 w-7 place-items-center rounded-full text-gold-400 hover:bg-ink-700"
                aria-label={`Remove one ${item.name}`}
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="min-w-4 text-center text-sm font-semibold text-white" aria-live="polite">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => onAdd(item)}
                className="grid h-7 w-7 place-items-center rounded-full text-gold-400 hover:bg-ink-700"
                aria-label={`Add another ${item.name}`}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

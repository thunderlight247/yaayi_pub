import { galleryItems } from "@/data/gallery";
import { SafeImage } from "@/components/menu/MenuItemCard";

export default function PhotoGallery() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">Inside Yaayi’s</h2>
      <div className="mt-8 columns-2 gap-4 md:columns-3">
        {galleryItems.map((g) => (
          <figure key={g.id} className="mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-ink-700">
            <div className={`relative w-full ${g.aspect}`}>
              <SafeImage image={g.image} sizes="(max-width: 768px) 50vw, 33vw" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-4 pb-3 pt-10 text-sm text-stone-200">
                {g.caption}
              </figcaption>
            </div>
          </figure>
        ))}
      </div>
    </section>
  );
}

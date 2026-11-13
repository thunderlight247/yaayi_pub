const videos = [
  { src: "/videos/videoplayback8.mp4", title: "Life at Yaayi’s" },
  { src: "/videos/videoplayback9.mp4", title: "Food and drinks" },
];

export default function VideoShowcase() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">See it in action</h2>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {videos.map((v) => (
          <figure key={v.src} className="overflow-hidden rounded-2xl border border-ink-700">
            <video src={v.src} controls playsInline preload="metadata" className="aspect-video w-full bg-black object-cover" aria-label={v.title} />
            <figcaption className="px-4 py-3 text-sm text-stone-200">{v.title}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

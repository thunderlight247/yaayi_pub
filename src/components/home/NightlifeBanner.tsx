"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Music2, PartyPopper, Trophy } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { events } from "@/data/events";

const icons = { music: Music2, party: PartyPopper, football: Trophy } as const;

export default function NightlifeBanner() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduce) return;
      gsap.from(".nl-item", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 75%", once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden bg-gradient-to-br from-ink-800 via-ink-900 to-ink-950 py-20">
      <div className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-ember/20 blur-3xl" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="max-w-2xl font-display text-4xl font-semibold leading-tight text-white sm:text-5xl">
          Open late. Music, matches and parties.
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {events.map((e) => {
            const Icon = icons[e.icon];
            return (
              <div key={e.id} className="nl-item rounded-2xl border border-ink-600 bg-ink-950/60 p-6 backdrop-blur">
                <Icon className="h-8 w-8 text-gold-400" aria-hidden />
                <h3 className="mt-4 font-display text-xl font-semibold text-white">{e.title}</h3>
                <p className="mt-1 text-sm font-medium text-gold-400">{e.schedule}</p>
                <p className="mt-3 text-sm text-stone-400">{e.description}</p>
              </div>
            );
          })}
        </div>
        <Link href="/events" className="mt-8 inline-block text-sm font-medium text-gold-400 hover:text-gold-300">
          See all events
        </Link>
      </div>
    </section>
  );
}

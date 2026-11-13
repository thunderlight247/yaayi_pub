"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { CalendarDays, UtensilsCrossed } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { businessInfo } from "@/data/businessInfo";
import { openBookingModal } from "@/utils/whatsapp";
import OpenStatusBadge from "./OpenStatusBadge";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const heroImage = "/images/chicken-dum-biryani6.jpg";

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.to(imageRef.current, {
        yPercent: 10,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden pt-24">
      <div className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full bg-gold-500/20 blur-3xl" aria-hidden />
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 sm:px-6 md:min-h-[88svh] md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <OpenStatusBadge />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-5 font-display text-5xl font-semibold leading-[1.05] text-white sm:text-6xl lg:text-7xl"
          >
            Yaayi’s <span className="shiny-text">Pub &amp; Grill</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 max-w-lg text-lg text-stone-300"
          >
            {businessInfo.tagline} Dine in, take out or get it delivered. Average spend {businessInfo.averageSpend}.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link href="/menu" className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-6 py-3.5 font-semibold text-ink-950 shadow-glow transition hover:bg-gold-400">
              <UtensilsCrossed className="h-5 w-5" aria-hidden /> Order on WhatsApp
            </Link>
            <button type="button" onClick={openBookingModal} className="inline-flex items-center gap-2 rounded-full border border-ink-600 px-6 py-3.5 font-semibold text-white transition hover:border-gold-500">
              <CalendarDays className="h-5 w-5" aria-hidden /> Book a table
            </button>
          </motion.div>
          <p className="mt-6 text-sm text-stone-400">{businessInfo.addressLines.join(", ")}</p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto w-full max-w-sm md:max-w-none"
        >
          <div ref={imageRef} className="relative aspect-[3/4] overflow-hidden rounded-[2rem] border border-ink-600 shadow-glow">
            <img src={heroImage} alt="Yaayi’s Pub & Grill food truck" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5 pt-16">
              <p className="font-display text-lg font-semibold text-white">Chicken dum biryani</p>
              <p className="text-sm text-stone-300">Fragrant rice slow-cooked with chicken and crispy onions.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

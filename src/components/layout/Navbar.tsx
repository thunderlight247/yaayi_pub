"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CalendarDays, Menu as MenuIcon, X } from "lucide-react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { businessInfo } from "@/data/businessInfo";
import { openBookingModal } from "@/utils/whatsapp";

const links = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/events", label: "Events" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Smooth scrolling for the whole app, driven by GSAP's requestAnimationFrame ticker.
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors ${
        scrolled || open ? "border-b border-ink-700 bg-ink-950/90 backdrop-blur" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6" aria-label="Main">
        <Link href="/" className="font-display text-lg font-semibold text-white">
          {businessInfo.name}
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={pathname === l.href ? "page" : undefined}
                className={`text-sm font-medium transition hover:text-gold-400 ${
                  pathname === l.href ? "text-gold-400" : "text-stone-300"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <button
              type="button"
              onClick={openBookingModal}
              className="inline-flex items-center gap-2 rounded-full bg-your-orange px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-your-orange/90"
            >
              <CalendarDays className="h-4 w-4" aria-hidden /> Book a table
            </button>
          </li>
        </ul>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-full text-white md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-ink-700 px-4 pb-5 pt-2 md:hidden">
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="block py-3 text-lg text-stone-200">
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <button
                type="button"
                onClick={openBookingModal}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-your-orange px-5 py-3 text-sm font-semibold text-white transition hover:bg-your-orange/90"
              >
                <CalendarDays className="h-4 w-4" aria-hidden /> Book a table
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

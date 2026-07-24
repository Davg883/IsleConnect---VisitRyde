"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { launchTrailDemo } from "@/lib/client";

const NAV_LINKS = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Explore Ryde", href: "#story-trails" },
  { label: "Local places", href: "#local-partners" },
  { label: "For partners", href: "#pride-in-place" },
] as const;

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLaunch = () => {
    setMenuOpen(false);
    launchTrailDemo();
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-gold/15 bg-ink-950/85 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="section-shell flex h-20 items-center justify-between gap-6">
        <a href="#top" className="flex items-center gap-3">
          <Image
            src="/brand/logo-mark.png"
            alt="IsleConnect lighthouse mark"
            width={44}
            height={44}
            className="h-11 w-11 rounded-full"
            priority
          />
          <span className="flex flex-col leading-none">
            <span className="font-display text-xl tracking-widest text-cream">
              ISLE<span className="text-gold">CONNECT</span>
            </span>
            <span className="mt-1 text-[0.6rem] uppercase tracking-[0.4em] text-mutedwarm">
              Coastal Creative Gateway
            </span>
          </span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm tracking-wide text-cream/80 transition-colors hover:text-gold"
            >
              {link.label}
            </a>
          ))}
          <button
            type="button"
            onClick={handleLaunch}
            className="rounded-sm border border-gold px-5 py-2.5 text-sm uppercase tracking-[0.2em] text-gold transition-all hover:bg-gold hover:text-ink-950 hover:shadow-glow-sm"
          >
            Preview Trail (Demo)
          </button>
        </nav>

        <button
          type="button"
          className="text-cream lg:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 28 }}
            className="overflow-hidden border-b border-gold/15 bg-ink-950/95 backdrop-blur-md lg:hidden"
          >
            <div className="section-shell flex flex-col gap-1 py-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded px-2 py-3 text-base text-cream/85 transition-colors hover:bg-ink-800 hover:text-gold"
                >
                  {link.label}
                </a>
              ))}
              <button
                type="button"
                onClick={handleLaunch}
                className="mt-3 rounded-sm border border-gold px-5 py-3 text-sm uppercase tracking-[0.2em] text-gold transition-colors hover:bg-gold hover:text-ink-950"
              >
                Preview Trail (Demo)
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

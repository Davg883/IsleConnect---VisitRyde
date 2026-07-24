"use client";

import { motion } from "framer-motion";
import { Compass, Navigation, QrCode, ScrollText } from "lucide-react";

const STEPS = [
  {
    step: "Scan",
    icon: QrCode,
    title: "1. Scan",
    body: "Scan a QR mark at a local landmark, venue or trail stop. No app download required — the experience opens instantly in your mobile browser.",
  },
  {
    step: "A short story",
    icon: ScrollText,
    title: "2. A short story",
    body: "Hear or read a two-minute story about that exact place — local heritage, hidden dispatches or coastal defence history brought to life.",
  },
  {
    step: "Discover nearby",
    icon: Compass,
    title: "3. Discover nearby",
    body: "Find independent cafés, cellar bars, shops, hosted events and the next story stop located just a short walk away.",
  },
  {
    step: "Choose and go",
    icon: Navigation,
    title: "4. Choose and go",
    body: "Tap for walking directions to the door, view a menu, check table availability or present a local offer at the counter.",
  },
] as const;

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-28">
      <div className="section-shell">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Visitor Journey</p>
          <h2 className="mt-4 font-display text-4xl text-cream sm:text-5xl">
            How IsleConnect <span className="italic text-gold">works</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-gold-soft font-medium">
            Curiosity → Welcome → Discovery → Action.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-mutedwarm">
            Four simple steps, with no app to install.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((item, index) => (
            <motion.article
              key={item.step}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative flex flex-col rounded-lg border border-gold/25 bg-ink-900/60 p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/60 hover:shadow-glow-sm"
            >
              {/* Orbital step badge */}
              <div className="relative mb-6 inline-flex self-start">
                <span
                  aria-hidden
                  className="absolute -inset-2.5 rounded-full border border-gold/30"
                />
                <span
                  aria-hidden
                  className="absolute -right-2 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-tide shadow-[0_0_8px_rgba(46,156,166,0.9)]"
                />
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-b from-gold to-gold-soft text-ink-950">
                  <item.icon size={22} strokeWidth={1.7} />
                </span>
              </div>

              <p className="text-[0.65rem] uppercase tracking-[0.35em] text-tide">
                Step {index + 1}
              </p>
              <h3 className="mt-2 font-display text-xl text-cream">
                {item.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-mutedwarm">
                {item.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

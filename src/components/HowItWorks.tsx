"use client";

import { motion } from "framer-motion";
import { Gift, MapPinned, ScrollText } from "lucide-react";

const STEPS = [
  {
    step: "Find",
    icon: MapPinned,
    title: "Locate the brass node",
    body: "Twelve gold-framed plaques thread the seafront from Ryde Pier Head to Appley Tower. Each carries a cipher mark and a QR seal — no app download, the trail runs in the browser.",
  },
  {
    step: "Intel",
    icon: ScrollText,
    title: "Decode the 1862 dispatch",
    body: "Scanning unlocks a confidential telegram from that exact spot in 1862 — smugglers, exiles, and the Foreign Office's business on the Island — narrated on location.",
  },
  {
    step: "Yield",
    icon: Gift,
    title: "Claim the local reward",
    body: "Every decoded stop yields a live coupon at the nearest independent partner. Story becomes footfall; footfall becomes revenue that stays on the High Street.",
  },
] as const;

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-28">
      <div className="section-shell">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">The Gamified Trail</p>
          <h2 className="mt-4 font-display text-4xl text-cream sm:text-5xl">
            How the trail <span className="italic text-gold">plays</span>
          </h2>
          <p className="mt-5 leading-relaxed text-mutedwarm">
            One loop, three beats. The player journey is deliberately simple —
            the depth lives in the story and the town itself.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {STEPS.map((item, index) => (
            <motion.article
              key={item.step}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              className="group relative rounded-lg border border-gold/25 bg-ink-900/60 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-gold/60 hover:shadow-glow-sm"
            >
              {/* Orbital step badge — the signal-dot motif from the mark */}
              <div className="relative mb-7 inline-flex">
                <span
                  aria-hidden
                  className="absolute -inset-3 rounded-full border border-gold/30"
                />
                <span
                  aria-hidden
                  className="absolute -right-3 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-tide shadow-[0_0_8px_rgba(46,156,166,0.9)]"
                />
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-b from-gold to-gold-soft text-ink-950">
                  <item.icon size={24} strokeWidth={1.6} />
                </span>
              </div>

              <p className="text-[0.65rem] uppercase tracking-[0.4em] text-tide">
                Beat {index + 1} · {item.step}
              </p>
              <h3 className="mt-3 font-display text-2xl text-cream">
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-mutedwarm">
                {item.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

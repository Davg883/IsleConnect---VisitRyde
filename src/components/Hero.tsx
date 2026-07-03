"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import PhoneMockup from "@/components/PhoneMockup";
import { launchTrailDemo } from "@/lib/client";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* --- Ambient brand film: uploaded intro clip, subtle behind everything --- */}
      <div aria-hidden className="absolute inset-0">
        <video
          className="h-full w-full scale-105 object-cover opacity-60 [filter:brightness(0.5)_saturate(0.8)]"
          src="/media/intro.mp4"
          poster="/media/intro-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
        {/* Navy wash + edge vignettes keep type legible over any frame */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/80 via-ink-950/55 to-ink-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(11,15,25,0.85)_100%)]" />
      </div>

      <div className="section-shell relative grid min-h-screen items-center gap-16 pb-24 pt-36 lg:grid-cols-2 lg:gap-10">
        {/* --- Left: thesis copy --- */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow flex items-center gap-2">
            <Sparkles size={14} className="text-tide" />
            The 1862 Mystery Trail · Ryde, Isle of Wight
          </p>

          <h1 className="mt-6 font-display text-5xl leading-[1.08] text-cream sm:text-6xl lg:text-[4.2rem]">
            Same Manor heart.
            <br />
            <span className="italic text-gold">A whole new</span>
            <br />
            Appley chapter.
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-mutedwarm">
            IsleConnect turns Ryde&apos;s Victorian seafront into a playable
            story. Scan brass-framed plaques between the Pier Head and Appley
            Tower, decode dispatches from 1862, and unlock real rewards at the
            town&apos;s independent kitchens, bars and cellars.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-5">
            <button
              type="button"
              onClick={launchTrailDemo}
              className="rounded-sm bg-gold px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-ink-950 shadow-glow transition-all hover:scale-[1.03] hover:shadow-glow"
            >
              Experience the 1862 Mystery Trail
            </button>
            <a
              href="#history-hub"
              className="text-sm uppercase tracking-[0.2em] text-cream/70 underline decoration-gold/50 underline-offset-8 transition-colors hover:text-gold"
            >
              Watch the film
            </a>
          </div>

          <dl className="mt-14 grid max-w-md grid-cols-3 gap-6 border-t border-cream/10 pt-6">
            {[
              { value: "12", label: "Trail stops" },
              { value: "1862", label: "The year it begins" },
              { value: "100%", label: "Independent partners" },
            ].map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-2xl text-gold">{stat.value}</dd>
                <dd className="mt-1 text-xs uppercase tracking-wider text-mutedwarm">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>

        {/* --- Right: the interactive device --- */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <PhoneMockup />
        </motion.div>
      </div>
    </section>
  );
}

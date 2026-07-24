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

      <div className="section-shell relative grid min-h-screen items-center gap-14 pb-16 pt-32 lg:grid-cols-2 lg:gap-10">
        {/* --- Left: thesis copy --- */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow flex items-center gap-2">
            <Sparkles size={14} className="text-tide" />
            ISLECONNECT · NO APP REQUIRED
          </p>

          <h1 className="mt-6 font-display text-5xl leading-[1.08] text-cream sm:text-6xl lg:text-[4.2rem]">
            One scan opens a more
            <br />
            <span className="italic text-gold">welcoming, surprising</span>
            <br />
            and connected Island.
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-mutedwarm">
            Discover a short local story, find somewhere nearby and take a
            useful next step. No app needed — just open it on the phone already
            in your pocket.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-5">
            <button
              type="button"
              onClick={launchTrailDemo}
              className="rounded-sm bg-gold px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-ink-950 shadow-glow transition-all hover:scale-[1.03] hover:shadow-glow"
            >
              Preview the Ryde trail
            </button>
            <a
              href="#how-it-works"
              className="rounded-sm border border-gold/40 px-6 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-gold transition-colors hover:border-gold hover:bg-gold hover:text-ink-950"
            >
              See how it works
            </a>
          </div>

          <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-xs uppercase tracking-wider text-gold">
            <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
            Featured pilot experience: The 1862 Mystery Trail
          </div>

          <dl className="mt-10 grid max-w-xl grid-cols-3 gap-6 border-t border-cream/10 pt-6">
            {[
              { value: "No app", label: "Opens in the browser" },
              { value: "Short local stories", label: "Designed for two-minute discovery" },
              { value: "Venue-approved information", label: "Partners control what visitors see" },
            ].map((stat) => (
              <div key={stat.value}>
                <dt className="sr-only">{stat.value}</dt>
                <dd className="font-display text-lg text-gold">{stat.value}</dd>
                <dd className="mt-1 text-xs leading-normal text-mutedwarm">
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

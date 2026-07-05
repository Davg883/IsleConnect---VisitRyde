"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Landmark, TrainFront, Users } from "lucide-react";

const PILLARS = [
  {
    icon: TrainFront,
    number: "Pillar 1",
    title: "Diversifying High-Street Footfall",
    metric: "Transit-bypass capture",
    body: "Thousands of Wightlink and Hovertravel passengers cross Ryde's seafront each day without turning onto the High Street. Trail nodes are positioned on that exact desire line, converting pass-through transit into dwell time and till receipts for independents.",
  },
  {
    icon: Landmark,
    number: "Pillar 2",
    title: "Preserving Civic Heritage",
    metric: "Heritage storytelling as an economic multiplier",
    body: "Each stop attaches a revenue mechanism to a heritage asset — the Colonnade, St Thomas's, Appley Tower — building the commercial case for restoration. The story layer is generated and maintained at a fraction of traditional interpretation-board cost.",
  },
  {
    icon: Users,
    number: "Pillar 3",
    title: "Empowering Local Youth",
    metric: "Digital retraining, in town",
    body: "Trail content, QR operations and partner onboarding are run as a local digital retraining programme in partnership with Network Ryde at St Thomas's Church — real production credits for young residents, not outsourced agency work.",
  },
] as const;

export default function CouncilPitch() {
  return (
    <section id="pride-in-place" className="relative py-28">
      {/* Quiet editorial backdrop shift to mark the civic register */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-transparent via-ink-900/60 to-transparent"
      />
      <div className="section-shell relative">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <div>
            <p className="eyebrow">Pride in Place · Strategic Alignment</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-cream sm:text-5xl">
              A working demonstration for the{" "}
              <span className="italic text-gold">
                Ryde Neighbourhood Board
              </span>
            </h2>
          </div>
          <p className="leading-relaxed text-mutedwarm">
            This page is the live pilot, not a slide deck. Every mechanism the
            programme proposes — the trail, the partner cooperative, the
            measurement layer — is running above, in the browser, today. The
            three pillars below map the pilot directly onto Pride in Place
            objectives.
          </p>
        </div>

        <div className="signal-divider mt-14" aria-hidden>
          <span /> <span /> <span />
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-gold/20 bg-gold/20 lg:grid-cols-3">
          {PILLARS.map((pillar, index) => (
            <motion.article
              key={pillar.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: index * 0.1 }}
              className="bg-ink-950/95 p-9"
            >
              <div className="flex items-center justify-between">
                <pillar.icon
                  size={26}
                  strokeWidth={1.4}
                  className="text-gold"
                />
                <span className="text-[0.6rem] uppercase tracking-[0.35em] text-mutedwarm">
                  {pillar.number}
                </span>
              </div>
              <h3 className="mt-6 font-display text-2xl leading-snug text-cream">
                {pillar.title}
              </h3>
              <p className="mt-3 inline-block rounded-full border border-tide/50 px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-tide">
                {pillar.metric}
              </p>
              <p className="mt-5 text-sm leading-relaxed text-mutedwarm">
                {pillar.body}
              </p>
            </motion.article>
          ))}
        </div>

        {/* Physical deployment proof: real signage render */}
        <div className="mt-14 grid items-center gap-10 rounded-lg border border-cream/10 bg-ink-900/50 p-8 lg:grid-cols-[1fr_1.2fr]">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-xs overflow-hidden rounded-lg">
            <Image
              src="/media/trail-signage.png"
              alt="IsleConnect counter-top trail signage for Stop 5, showing a scannable QR node and local reward partner panel"
              fill
              sizes="(max-width: 1024px) 90vw, 320px"
              className="object-cover"
            />
          </div>
          <div>
            <p className="eyebrow">In the field</p>
            <h3 className="mt-3 font-display text-3xl text-cream">
              Counter-top nodes, ready for partner venues
            </h3>
            <p className="mt-4 leading-relaxed text-mutedwarm">
              Physical deployment is a two-part kit: a wall or counter node
              carrying the stop&apos;s story seal, and a partner card marking
              the venue as a Route Reward Partner. Both are produced to the
              brand system shown across this page, so the trail reads as one
              coherent civic asset from the Esplanade to the till.
            </p>
            <p className="mt-4 text-xs uppercase tracking-[0.25em] text-mutedwarm">
              Measurement: map_opened · stop_selected · reward_clicked — logged
              anonymously, reported quarterly to the Board
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { trackEvent } from "@/lib/client";

const EXAMPLE_STEPS = [
  {
    step: "1",
    title: "Scan at Ryde Pier",
    detail: "Hear or read a two-minute story about the town’s connection to the Solent.",
  },
  {
    step: "2",
    title: "Continue towards Appley",
    detail: "Follow the next story along the seafront.",
  },
  {
    step: "3",
    title: "Discover somewhere nearby",
    detail: "View a café menu, seasonal event or table availability.",
  },
  {
    step: "4",
    title: "Choose what to do next",
    detail: "Tap for walking directions, booking or a local offer.",
  },
] as const;

export default function WorkedExample() {
  const handleView = () => {
    trackEvent({ type: "worked_example_viewed" });
  };

  return (
    <section
      id="worked-example"
      className="relative py-20 border-y border-gold/15 bg-ink-900/40"
      onMouseEnter={handleView}
    >
      <div className="section-shell">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Real-World Walkthrough</p>
          <h2 className="mt-4 font-display text-3xl text-cream sm:text-4xl">
            From Ryde Pier to Appley{" "}
            <span className="italic text-gold">in four simple steps</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-mutedwarm">
            Here is how a visitor journey unfolds in practice — connecting
            coastal heritage directly to local venues.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {EXAMPLE_STEPS.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex flex-col justify-between rounded-lg border border-gold/20 bg-ink-950/80 p-6"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/15 text-xs font-bold text-gold">
                    {item.step}
                  </span>
                  {index < EXAMPLE_STEPS.length - 1 ? (
                    <ArrowRight size={16} className="hidden text-gold/40 lg:block" />
                  ) : (
                    <CheckCircle2 size={16} className="text-tide" />
                  )}
                </div>
                <h3 className="mt-4 font-display text-lg text-cream">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-mutedwarm">
                  {item.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

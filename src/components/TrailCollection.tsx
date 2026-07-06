"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  Crown,
  Handshake,
  Lamp,
  MapPin,
  Play,
  Shield,
} from "lucide-react";
import { getLandmarks, getTrails } from "@/lib/seo/engine";
import type { Trail, TrailStatus } from "@/lib/seo/types";
import { SPONSOR_EMAIL } from "@/lib/config";
import { launchTrailDemo, trackEvent } from "@/lib/client";

const TRAILS = getTrails();
const LANDMARK_NAMES = new Map(getLandmarks().map((l) => [l.id, l.name]));

const STATUS_STYLES: Record<TrailStatus, string> = {
  "live-prototype": "border-gold bg-gold/15 text-gold",
  "in-development": "border-tide bg-tide/10 text-tide",
  concept: "border-cream/30 bg-transparent text-cream/60",
};

const TRAIL_ICONS: Record<string, typeof Crown> = {
  victoria: Crown,
  wartime: Shield,
  smugglers: Lamp,
};

function sponsorHref(trail: Trail): string {
  const subject = encodeURIComponent(
    `Trail partner enquiry — ${trail.title} (IsleConnect)`
  );
  return `mailto:${SPONSOR_EMAIL}?subject=${subject}`;
}

function TrailCard({ trail, index }: { trail: Trail; index: number }) {
  const [routeOpen, setRouteOpen] = useState(false);
  const Icon = TRAIL_ICONS[trail.id] ?? MapPin;

  const handlePrimary = () => {
    trackEvent({ type: "trail_selected", trailId: trail.id });
    if (trail.playable) {
      launchTrailDemo();
      return;
    }
    setRouteOpen((open) => !open);
  };

  const handleSponsor = () => {
    trackEvent({ type: "sponsor_enquiry", trailId: trail.id });
  };

  return (
    <motion.article
      id={trail.anchor}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className="flex scroll-mt-28 flex-col overflow-hidden rounded-lg border border-gold/25 bg-ink-900/60 transition-colors hover:border-gold/50"
    >
      {/* Media panel */}
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-gold/20">
        {trail.media.type === "image" && trail.media.src ? (
          <Image
            src={trail.media.src}
            alt={trail.media.alt}
            fill
            sizes="(max-width: 1024px) 90vw, 380px"
            className="object-cover object-top transition-transform duration-500 hover:scale-105"
          />
        ) : (
          /* Honest concept treatment — styled, never a fake photograph */
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[radial-gradient(ellipse_at_50%_120%,rgba(46,156,166,0.25)_0%,rgba(11,15,25,0.95)_65%)]">
            <Icon size={40} strokeWidth={1} className="text-gold/70" />
            <p className="text-[0.6rem] uppercase tracking-[0.35em] text-mutedwarm">
              Concept artwork in production
            </p>
          </div>
        )}
        <span
          className={`absolute left-4 top-4 rounded-full border px-3 py-1 text-[0.6rem] uppercase tracking-[0.25em] backdrop-blur-sm ${STATUS_STYLES[trail.status]}`}
        >
          {trail.statusLabel}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-7">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-2xl leading-snug text-cream">
              {trail.title}
            </h3>
            <p className="mt-1 text-sm italic text-gold-soft">
              {trail.subtitle}
            </p>
          </div>
          <Icon size={22} strokeWidth={1.4} className="mt-1 shrink-0 text-gold" />
        </div>

        <p className="mt-4 flex-1 text-sm leading-relaxed text-mutedwarm">
          {trail.description}
        </p>

        <dl className="mt-5 space-y-2 border-t border-cream/10 pt-4 text-xs leading-relaxed">
          <div>
            <dt className="inline font-semibold uppercase tracking-wider text-cream/70">
              Best for:{" "}
            </dt>
            <dd className="inline text-mutedwarm">{trail.bestFor}</dd>
          </div>
          <div>
            <dt className="inline font-semibold uppercase tracking-wider text-cream/70">
              Partner fit:{" "}
            </dt>
            <dd className="inline text-mutedwarm">{trail.partnerFit}</dd>
          </div>
        </dl>

        <p className="mt-4 rounded border-l-2 border-tide/60 bg-tide/5 px-3 py-2 text-xs leading-relaxed text-cream/70">
          {trail.playableNote}
        </p>

        {/* Route preview for non-playable chapters */}
        <AnimatePresence initial={false}>
          {routeOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              className="overflow-hidden"
            >
              <div className="mt-4 rounded-lg border border-cream/10 bg-ink-950/60 p-4">
                <p className="text-[0.6rem] uppercase tracking-[0.3em] text-tide">
                  Indicative route · {trail.routePurpose}
                </p>
                <ul className="mt-3 space-y-2">
                  {trail.sampleStops.map((stopId, stopIndex) => (
                    <li
                      key={stopId}
                      className="flex items-center gap-2 text-xs text-cream/75"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-gold/50 text-[0.6rem] text-gold">
                        {stopIndex + 1}
                      </span>
                      {LANDMARK_NAMES.get(stopId) ?? stopId}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTAs */}
        <div className="mt-6 flex flex-col gap-3">
          <button
            type="button"
            onClick={handlePrimary}
            aria-expanded={trail.playable ? undefined : routeOpen}
            className="flex items-center justify-center gap-2 rounded-sm bg-gold px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-ink-950 transition-all hover:scale-[1.02] hover:shadow-glow-sm"
          >
            {trail.playable ? (
              <>
                <Play size={14} /> Explore trail
              </>
            ) : (
              <>
                Preview the route
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-300 ${routeOpen ? "rotate-180" : ""}`}
                />
              </>
            )}
          </button>
          <a
            href={sponsorHref(trail)}
            onClick={handleSponsor}
            className="flex items-center justify-center gap-2 rounded-sm border border-gold px-5 py-3 text-xs uppercase tracking-[0.2em] text-gold transition-colors hover:bg-gold hover:text-ink-950"
          >
            <Handshake size={14} /> Sponsor this trail
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export default function TrailCollection() {
  return (
    <section id="story-trails" className="relative py-28">
      <div className="section-shell">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Explore Ryde&apos;s Story Trails</p>
          <h2 className="mt-4 font-display text-4xl text-cream sm:text-5xl">
            Three playable heritage routes.{" "}
            <span className="italic text-gold">
              One visitor discovery platform.
            </span>
          </h2>
          <p className="mt-5 leading-relaxed text-mutedwarm">
            One platform. Three story routes. Multiple audiences. Measurable
            local footfall.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-mutedwarm">
            Each route uses the same IsleConnect infrastructure: scan the
            place, hear the story, unlock a local reward and track the
            engagement.
          </p>
        </div>

        <div className="signal-divider mt-10" aria-hidden>
          <span /> <span /> <span />
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {TRAILS.map((trail, index) => (
            <TrailCard key={trail.id} trail={trail} index={index} />
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-xs leading-relaxed text-mutedwarm">
          Trail statuses are shown honestly: live prototype, in development,
          or concept. Public-facing history will be verified before launch.
        </p>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Calendar,
  CheckCircle,
  ChevronDown,
  Compass,
  MapPin,
  ShieldCheck,
  Ticket,
  Utensils,
} from "lucide-react";
import type { MerchantCardDTO } from "@/lib/seo/types";
import { trackEvent } from "@/lib/client";

/** Order the featured cooperative trio first; any further partners follow. */
const FEATURED_ORDER = ["cibo", "fumo33", "smugglers-cellar"] as const;

type FetchState =
  | { status: "loading" }
  | { status: "error" }
  | { status: "ready"; merchants: MerchantCardDTO[] };

const VENUE_BENEFITS = [
  {
    icon: MapPin,
    title: "Directions to your door",
    body: "Guide walking visitors straight from a story stop to your front door.",
  },
  {
    icon: Utensils,
    title: "Menu & booking views",
    body: "Showcase food, drinks, experiences and live availability at the moment of decision.",
  },
  {
    icon: Calendar,
    title: "Seasonal offers & events",
    body: "Feature current promotions and hosted local events as visitor traffic flows.",
  },
  {
    icon: Compass,
    title: "Simple evidence summaries",
    body: "Clear, privacy-first reporting on what visitors did next across each route.",
  },
] as const;

export default function SMEHub() {
  const [state, setState] = useState<FetchState>({ status: "loading" });
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const response = await fetch("/api/merchants");
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const payload = (await response.json()) as {
          merchants: MerchantCardDTO[];
        };
        if (cancelled) return;
        const rank = (id: string) => {
          const index = FEATURED_ORDER.indexOf(
            id as (typeof FEATURED_ORDER)[number]
          );
          return index === -1 ? FEATURED_ORDER.length : index;
        };
        const merchants = [...payload.merchants].sort(
          (a, b) => rank(a.id) - rank(b.id)
        );
        setState({ status: "ready", merchants });
      } catch (error) {
        console.error("[SMEHub] merchant fetch failed", error);
        if (!cancelled) setState({ status: "error" });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const toggleOffer = (merchantId: string) => {
    setOpenId((current) => {
      const next = current === merchantId ? null : merchantId;
      if (next) trackEvent({ type: "offer_opened", merchantId });
      return next;
    });
  };

  return (
    <section id="local-partners" className="relative py-28">
      <div className="section-shell">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Local Venue Network</p>
          <h2 className="mt-4 font-display text-4xl text-cream sm:text-5xl">
            Be discovered at the moment a visitor is{" "}
            <span className="italic text-gold">deciding what to do next.</span>
          </h2>
          <p className="mt-5 leading-relaxed text-mutedwarm">
            IsleConnect helps independent venues connect with passing trail
            traffic. Below are sample partner listings showing how verified
            local details, landmark distances and seasonal offers appear.
          </p>
        </div>

        {/* --- Venue Benefit Cards --- */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VENUE_BENEFITS.map((benefit) => (
            <div
              key={benefit.title}
              className="rounded-lg border border-gold/20 bg-ink-900/40 p-6"
            >
              <benefit.icon size={22} className="text-gold" />
              <h3 className="mt-4 font-display text-lg text-cream">
                {benefit.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-mutedwarm">
                {benefit.body}
              </p>
            </div>
          ))}
        </div>

        {/* --- Venue Trust Guarantee Banner --- */}
        <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-6 rounded-lg border border-gold/30 bg-gradient-to-r from-gold/10 via-ink-900/60 to-ink-950 p-7">
          <div className="flex items-start gap-4">
            <ShieldCheck size={28} className="mt-1 shrink-0 text-gold" />
            <div>
              <h4 className="font-display text-lg text-cream">
                The Venue Control Guarantee
              </h4>
              <p className="mt-1 text-xs leading-relaxed text-mutedwarm">
                <strong className="text-gold-soft font-semibold">
                  You approve your story, details and offers before anything goes live.
                </strong>{" "}
                Once approved, the same venue foundation can support new seasonal
                stories and campaigns without starting again each time.
              </p>
            </div>
          </div>
          <a
            href="mailto:david@isleconnect.co.uk?subject=Venue%20Partner%20Enquiry%20%E2%80%94%20IsleConnect"
            onClick={() => trackEvent({ type: "sponsor_enquiry" })}
            className="shrink-0 rounded-sm border border-gold px-5 py-3 text-xs uppercase tracking-[0.2em] text-gold transition-colors hover:bg-gold hover:text-ink-950"
          >
            Partner Enquiry
          </a>
        </div>

        {/* --- Partner Cards --- */}
        <div className="mt-16">
          {state.status === "loading" && (
            <div className="grid gap-8 md:grid-cols-3" aria-hidden>
              {[0, 1, 2].map((placeholder) => (
                <div
                  key={placeholder}
                  className="h-72 animate-pulse rounded-lg border border-cream/10 bg-ink-900/50"
                />
              ))}
            </div>
          )}

          {state.status === "error" && (
            <p className="rounded-lg border border-gold/25 bg-ink-900/60 p-8 text-center text-mutedwarm">
              Partner listings can&apos;t load right now. Refresh the page to
              try again.
            </p>
          )}

          {state.status === "ready" && (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {state.merchants.map((merchant) => {
                const open = openId === merchant.id;
                return (
                  <article
                    key={merchant.id}
                    className="flex flex-col rounded-lg border border-gold/25 bg-ink-900/60 p-7 transition-colors hover:border-gold/50"
                  >
                    <p className="text-[0.65rem] uppercase tracking-[0.35em] text-tide">
                      {merchant.primaryCategory}
                    </p>
                    <h3 className="mt-2 font-display text-2xl text-cream">
                      {merchant.name}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-mutedwarm">
                      {merchant.tagline}
                    </p>

                    <p className="mt-5 flex items-center gap-2 text-xs text-cream/60">
                      <MapPin size={13} className="shrink-0 text-gold-soft" />
                      {merchant.nearestLandmark.distanceLabel} from{" "}
                      {merchant.nearestLandmark.name}
                    </p>

                    <ul className="mt-4 flex flex-wrap gap-2">
                      {merchant.services.slice(0, 3).map((service) => (
                        <li
                          key={service}
                          className="rounded-full border border-cream/15 px-3 py-1 text-[0.65rem] uppercase tracking-wider text-cream/70"
                        >
                          {service}
                        </li>
                      ))}
                    </ul>

                    <button
                      type="button"
                      onClick={() => toggleOffer(merchant.id)}
                      aria-expanded={open}
                      className="mt-6 flex items-center justify-between rounded-sm border border-gold px-4 py-3 text-xs uppercase tracking-[0.2em] text-gold transition-colors hover:bg-gold hover:text-ink-950"
                    >
                      View partner offer & menu
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-300 ${
                          open ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 30,
                          }}
                          className="overflow-hidden"
                        >
                          <div className="mt-4 rounded-lg border border-dashed border-gold/50 bg-gold/10 p-4 text-center">
                            <p className="flex items-center justify-center gap-2 text-[0.65rem] uppercase tracking-[0.25em] text-gold-soft">
                              <Ticket size={14} /> Partner offer code
                            </p>
                            <p className="mt-2 font-mono text-lg font-semibold tracking-[0.2em] text-gold">
                              {merchant.couponCode}
                            </p>
                            <p className="mt-2 text-[0.65rem] text-mutedwarm">
                              Present at counter or mention when booking. Verified
                              by venue partner.
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

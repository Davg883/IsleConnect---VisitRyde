"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { onLaunchTrailDemo, trackEvent } from "@/lib/client";
import { BridgeMessageSchema } from "@/lib/seo/types";

const LIVE_TRAIL_URL = "https://cody-tours.vercel.app/trail.html";

/** Only messages from the trail app's exact origin are ever processed. */
const TRAIL_APP_ORIGIN = new URL(LIVE_TRAIL_URL).origin;

/**
 * Realistic smartphone chassis housing the LIVE trail app in a sandboxed
 * iframe. Layering order (bottom → top):
 *   z-20 iframe (fully interactive)
 *   z-30 diagonal glass sheen — pointer-events-none so taps pass through
 *   z-40 dynamic-island notch — pointer-events-none
 */
export default function PhoneMockup() {
  const [appReady, setAppReady] = useState(false);
  const [pulse, setPulse] = useState(false);

  /* Header CTA → scroll here (handled in launchTrailDemo), then draw the
     eye with a brief gold pulse around the chassis. */
  useEffect(
    () =>
      onLaunchTrailDemo(() => {
        trackEvent({ type: "stop_selected", stopId: "live-trail-demo" });
        setPulse(true);
        window.setTimeout(() => setPulse(false), 1600);
      }),
    []
  );

  /* Cross-origin event bridge: the embedded trail app posts
     ISLECONNECT_IFRAME_EVENT envelopes via window.parent.postMessage.
     Gate 1: exact origin match. Gate 2: Zod structural validation.
     Valid events are re-shaped onto the /api/events contract. */
  useEffect(() => {
    const handleIframeMessage = (event: MessageEvent) => {
      if (event.origin !== TRAIL_APP_ORIGIN) return;

      const parsed = BridgeMessageSchema.safeParse(event.data);
      if (!parsed.success) return;

      const { event: eventName, metadata } = parsed.data.payload;
      trackEvent({
        type: eventName,
        merchantId:
          typeof metadata?.merchantId === "string"
            ? metadata.merchantId
            : undefined,
        stopId:
          typeof metadata?.stopId === "string" ? metadata.stopId : undefined,
        meta: metadata,
      });
    };

    window.addEventListener("message", handleIframeMessage);
    return () => window.removeEventListener("message", handleIframeMessage);
  }, []);

  return (
    <div id="trail-demo" className="relative mx-auto w-full max-w-[340px]">
      {/* 1. Ambient aura glow behind the device */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[3rem] bg-gold/15 blur-2xl"
      />

      {/* Launch pulse ring */}
      <motion.div
        aria-hidden
        animate={
          pulse
            ? { opacity: [0, 1, 0], scale: [1, 1.06, 1.1] }
            : { opacity: 0 }
        }
        transition={{ duration: 1.6, ease: "easeOut" }}
        className="pointer-events-none absolute -inset-2 rounded-[3.4rem] border-2 border-gold"
      />

      {/* 2. Physical chassis */}
      <div className="relative z-10 overflow-hidden rounded-[3rem] border-4 border-gray-700/80 bg-[#1f2937] p-3 shadow-2xl">
        {/* 3. Diagonal glass sheen — must stay pointer-events-none */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-30 rounded-[3rem] bg-gradient-to-tr from-white/0 via-white/5 to-white/10"
        />

        {/* 4. Dynamic-island camera notch */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-5 z-40 flex h-6 w-28 -translate-x-1/2 items-center justify-center rounded-full bg-black"
        >
          <span className="absolute left-4 h-2.5 w-2.5 rounded-full bg-blue-900/60" />
        </div>

        {/* 5. Screen workspace, true handset aspect ratio */}
        <div className="relative z-20 aspect-[9/19.5] overflow-hidden rounded-[2.3rem] border border-black/40 bg-ink-950">
          {/* Loading state under the iframe until the live app paints */}
          {!appReady && (
            <div
              aria-hidden
              className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-ink-950"
            >
              <span className="h-10 w-10 animate-spin-slow rounded-full border border-gold/60 border-t-gold" />
              <p className="text-[0.6rem] uppercase tracking-[0.35em] text-mutedwarm">
                Connecting to trail…
              </p>
            </div>
          )}

          {/* 6. The live trail app */}
          <iframe
            src={LIVE_TRAIL_URL}
            title="IsleConnect Live Trail Demo — Ryde Sovereign Treasure Hunt"
            className="absolute inset-0 h-full w-full rounded-[2.3rem] border-0"
            allow="autoplay; camera; geolocation"
            sandbox="allow-scripts allow-same-origin allow-forms"
            loading="lazy"
            onLoad={() => setAppReady(true)}
          />
        </div>
      </div>

      <p className="mt-5 text-center text-[0.65rem] uppercase tracking-[0.3em] text-mutedwarm">
        Live demo — tap the screen to play
      </p>
    </div>
  );
}

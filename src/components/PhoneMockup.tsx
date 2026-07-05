"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Compass, QrCode, RotateCcw, Ticket } from "lucide-react";
import { onLaunchTrailDemo, trackEvent } from "@/lib/client";

type PhoneState = "idle" | "scanning" | "decoded";

const SCAN_DURATION_MS = 3500;

const TELEGRAM_LINES = [
  "FOREIGN OFFICE — CONFIDENTIAL DISPATCH",
  "RYDE STATION · 14 AUGUST 1862",
  "",
  "TO THE BEARER AT DOVER STREET —",
  "THE MANOR PAPERS ARE MOVED. LOOK TO",
  "THE COLONNADE AT THE EVENING TIDE.",
  "TRUST THE LAMPLIGHTER. SPEAK TO NO ONE.",
  "",
  "— DECODED BY ISLECONNECT NODE 05",
] as const;

const FULL_TELEGRAM = TELEGRAM_LINES.join("\n");

export default function PhoneMockup() {
  const [phoneState, setPhoneState] = useState<PhoneState>("idle");
  const [typedCount, setTypedCount] = useState(0);
  const scanTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const typeTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimers = useCallback(() => {
    if (scanTimer.current) clearTimeout(scanTimer.current);
    if (typeTimer.current) clearInterval(typeTimer.current);
    scanTimer.current = null;
    typeTimer.current = null;
  }, []);

  const beginScan = useCallback(() => {
    clearTimers();
    setTypedCount(0);
    setPhoneState("scanning");
    trackEvent({ type: "stop_selected", stopId: "dover-street-node" });
    scanTimer.current = setTimeout(() => {
      setPhoneState("decoded");
    }, SCAN_DURATION_MS);
  }, [clearTimers]);

  const reset = useCallback(() => {
    clearTimers();
    setTypedCount(0);
    setPhoneState("idle");
  }, [clearTimers]);

  /* Header CTA → scroll here and auto-run the sequence. */
  useEffect(() => onLaunchTrailDemo(beginScan), [beginScan]);
  useEffect(() => clearTimers, [clearTimers]);

  /* Typewriter effect for the decoded telegram. */
  useEffect(() => {
    if (phoneState !== "decoded") return;
    typeTimer.current = setInterval(() => {
      setTypedCount((count) => {
        if (count >= FULL_TELEGRAM.length) {
          if (typeTimer.current) clearInterval(typeTimer.current);
          return count;
        }
        return count + 2;
      });
    }, 24);
    return () => {
      if (typeTimer.current) clearInterval(typeTimer.current);
    };
  }, [phoneState]);

  const typedText = FULL_TELEGRAM.slice(0, typedCount);
  const typingDone = typedCount >= FULL_TELEGRAM.length;

  return (
    <div id="trail-demo" className="relative mx-auto w-[290px] sm:w-[320px]">
      {/* Ambient glow behind the device */}
      <div
        aria-hidden
        className="absolute -inset-8 rounded-[4rem] bg-gold/10 blur-3xl"
      />

      {/* Bezel */}
      <div className="relative rounded-[2.8rem] border border-cream/10 bg-gradient-to-b from-[#2a2f3d] to-[#14181f] p-[10px] shadow-[0_30px_80px_rgba(0,0,0,0.65)]">
        {/* Screen */}
        <div className="relative h-[600px] overflow-hidden rounded-[2.2rem] bg-ink-950 sm:h-[640px]">
          {/* Dynamic island */}
          <div className="absolute left-1/2 top-3 z-30 h-7 w-28 -translate-x-1/2 rounded-full bg-black" />

          {/* Reflective glare */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-br from-white/10 via-transparent to-transparent"
          />

          {/* Status bar */}
          <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-7 pt-4 text-[0.65rem] font-medium text-cream/70">
            <span>18:62</span>
            <span className="tracking-widest text-gold-soft">ISLECONNECT</span>
          </div>

          <AnimatePresence mode="wait">
            {phoneState === "idle" && (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center gap-8 px-8 text-center"
              >
                <div className="relative">
                  <div
                    aria-hidden
                    className="absolute -inset-6 rounded-full bg-tide/20 blur-2xl"
                  />
                  <div className="relative animate-spin-slow rounded-full border border-gold/40 p-6">
                    <Compass size={72} strokeWidth={1} className="text-gold" />
                  </div>
                </div>
                <div>
                  <p className="font-display text-2xl text-cream">Ryde, 1862</p>
                  <p className="mt-2 text-sm tracking-[0.25em] text-mutedwarm">
                    SCAN TO BEGIN
                  </p>
                </div>
                <button
                  type="button"
                  onClick={beginScan}
                  className="flex items-center gap-2 rounded-full bg-gold px-7 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-ink-950 shadow-glow-sm transition-transform hover:scale-105"
                >
                  <QrCode size={18} />
                  Scan Code
                </button>
              </motion.div>
            )}

            {phoneState === "scanning" && (
              <motion.div
                key="scanning"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-8"
              >
                {/* Camera simulator viewfinder */}
                <div className="relative h-64 w-56 overflow-hidden rounded-xl bg-[radial-gradient(circle_at_50%_40%,#1d2534_0%,#0b0f19_75%)]">
                  {/* Corner brackets */}
                  {(
                    [
                      "left-3 top-3 border-l-2 border-t-2",
                      "right-3 top-3 border-r-2 border-t-2",
                      "bottom-3 left-3 border-b-2 border-l-2",
                      "bottom-3 right-3 border-b-2 border-r-2",
                    ] as const
                  ).map((position) => (
                    <span
                      key={position}
                      aria-hidden
                      className={`absolute h-8 w-8 border-gold ${position}`}
                    />
                  ))}
                  {/* Faux plaque in the viewfinder */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-60">
                    <QrCode size={90} strokeWidth={0.8} className="text-cream/60" />
                  </div>
                  {/* Gold laser sweep */}
                  <motion.div
                    aria-hidden
                    initial={{ top: "8%" }}
                    animate={{ top: ["8%", "88%", "8%"] }}
                    transition={{
                      duration: 1.6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-x-4 h-[2px] bg-gold shadow-[0_0_18px_4px_rgba(212,175,55,0.65)]"
                  />
                </div>
                <div className="text-center">
                  <p className="text-sm uppercase tracking-[0.3em] text-gold">
                    Aligning cipher…
                  </p>
                  <p className="mt-2 text-xs text-mutedwarm">
                    Node 05 · Dover Street · Signal locked
                  </p>
                </div>
              </motion.div>
            )}

            {phoneState === "decoded" && (
              <motion.div
                key="decoded"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col px-6 pb-6 pt-16"
              >
                <p className="text-center text-[0.65rem] uppercase tracking-[0.35em] text-tide">
                  Decoded Telegram
                </p>
                <div className="mt-3 flex-1 overflow-hidden rounded-lg border border-gold/25 bg-[#101623] p-4">
                  <pre className="whitespace-pre-wrap font-mono text-[0.68rem] leading-relaxed text-cream/90">
                    {typedText}
                    {!typingDone && (
                      <span className="animate-pulse text-gold">▌</span>
                    )}
                  </pre>
                </div>

                <AnimatePresence>
                  {typingDone && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-4 rounded-lg border border-dashed border-gold/60 bg-gold/10 p-3 text-center"
                    >
                      <p className="flex items-center justify-center gap-2 text-[0.65rem] uppercase tracking-[0.25em] text-gold-soft">
                        <Ticket size={14} /> Reward unlocked
                      </p>
                      <p className="mt-1 font-mono text-lg font-semibold tracking-widest text-gold">
                        CIBO1862RYDE
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="button"
                  onClick={reset}
                  className="mt-4 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.25em] text-mutedwarm transition-colors hover:text-gold"
                >
                  <RotateCcw size={14} /> Run again
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

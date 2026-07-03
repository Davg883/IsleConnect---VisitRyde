/**
 * src/lib/client.ts
 * Client-side helpers shared across components:
 *  - trackEvent: fire-and-forget POST to /api/events
 *  - demo bus: lets the Header CTA trigger the phone mockup's scan sequence
 */

"use client";

import type { TrackingEvent } from "@/lib/seo/types";

export function trackEvent(event: TrackingEvent): void {
  try {
    const payload = JSON.stringify({
      ...event,
      timestamp: event.timestamp ?? new Date().toISOString(),
    });
    if (typeof navigator !== "undefined" && navigator.sendBeacon) {
      navigator.sendBeacon(
        "/api/events",
        new Blob([payload], { type: "application/json" })
      );
      return;
    }
    void fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      keepalive: true,
    });
  } catch {
    // Tracking must never interrupt the experience.
  }
}

export const LAUNCH_DEMO_EVENT = "isleconnect:launch-demo";

export function launchTrailDemo(): void {
  document
    .getElementById("trail-demo")
    ?.scrollIntoView({ behavior: "smooth", block: "center" });
  window.dispatchEvent(new CustomEvent(LAUNCH_DEMO_EVENT));
}

export function onLaunchTrailDemo(handler: () => void): () => void {
  window.addEventListener(LAUNCH_DEMO_EVENT, handler);
  return () => window.removeEventListener(LAUNCH_DEMO_EVENT, handler);
}

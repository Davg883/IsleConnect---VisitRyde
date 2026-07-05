/**
 * IsleConnect postMessage bridge — IFRAME SIDE
 * ---------------------------------------------------------------------------
 * Drop this into the trail app at cody-tours.vercel.app (e.g. include it in
 * trail.html) and call dispatchIsleConnectEvent() whenever a player completes
 * a tracked action. The parent landing page validates origin + payload shape
 * and forwards the event to its Zod-checked /api/events endpoint.
 *
 * Allowed event names (anything else is rejected by the parent):
 *   "map_opened" | "stop_selected" | "reward_clicked"
 *
 * Metadata values must be strings, numbers, or booleans. Two keys get
 * special treatment on the parent side and are lifted into first-class
 * fields: `merchantId` and `stopId`.
 * ---------------------------------------------------------------------------
 */

/**
 * Parent origins permitted to receive events. postMessage silently drops
 * the message when the actual parent doesn't match the targetOrigin, so
 * listing dev + production origins here is safe — only the real parent
 * ever receives anything.
 */
const ISLECONNECT_PARENT_ORIGINS = [
  "https://isle-connect-visit-ryde.vercel.app",
  "http://localhost:3000",
];

/**
 * Safely dispatch a trail event to the IsleConnect parent page.
 * No-ops when the app is opened directly (not inside an iframe).
 *
 * @param {"map_opened"|"stop_selected"|"reward_clicked"} eventName
 * @param {Record<string, string|number|boolean>} [eventMetadata]
 */
function dispatchIsleConnectEvent(eventName, eventMetadata = {}) {
  if (window.parent === window) return; // standalone — nothing to talk to

  const message = {
    type: "ISLECONNECT_IFRAME_EVENT",
    payload: {
      event: eventName,
      metadata: eventMetadata,
    },
  };

  for (const targetOrigin of ISLECONNECT_PARENT_ORIGINS) {
    try {
      window.parent.postMessage(message, targetOrigin);
    } catch (error) {
      // A mismatched targetOrigin throws in some browsers; never let the
      // bridge break the game loop.
    }
  }
}

/* ---------------------------------------------------------------------------
 * Example wiring inside the trail app:
 *
 *   // When the map view opens:
 *   dispatchIsleConnectEvent("map_opened");
 *
 *   // When a player selects a stop:
 *   dispatchIsleConnectEvent("stop_selected", { stopId: "dover-street-node" });
 *
 *   // When the Cibo voucher is revealed:
 *   revealButton.addEventListener("click", () => {
 *     dispatchIsleConnectEvent("reward_clicked", {
 *       merchantId: "cibo",
 *       voucher_code: "CIBO_SUMMER_10",
 *       venue: "Cibo",
 *     });
 *   });
 * ------------------------------------------------------------------------- */

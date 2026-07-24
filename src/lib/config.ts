/**
 * src/lib/config.ts
 * Site-wide configuration. Values can be overridden per-deployment via
 * NEXT_PUBLIC_* environment variables without touching component code.
 */
export const SPONSOR_EMAIL =
  process.env.NEXT_PUBLIC_SPONSOR_EMAIL ?? "david@isleconnect.co.uk";

export const PILOT_STATUS =
  process.env.NEXT_PUBLIC_PILOT_STATUS ??
  "Working pilot demonstration — public trail locations and partner offers subject to agreement";

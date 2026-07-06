# IsleConnect — Coastal Creative Gateway

Single-page interactive portal for Ryde, Isle of Wight: the 1862 Mystery Trail
demo, the independent partner cooperative, and the Pride in Place pitch for the
Ryde Neighbourhood Board.

## Stack
Next.js 14 (App Router) · TypeScript (strict) · Tailwind CSS · Framer Motion ·
Lucide React · Zod

## Run it
```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start   # production
```

## Story Trails
The site presents three status-labelled trails from `src/lib/seo/data/trails.json`
(validated by `TrailSchema`): Queen Victoria & Imperial Ryde (live prototype,
played as the 1862 Mystery Trail), Wartime Solent Defence (in development),
and Ryde Smugglers' Past (concept). Each renders as a card in
`TrailCollection.tsx` with best-for/partner-fit lines, an indicative-route
preview, and Explore/Sponsor CTAs. The sponsor mailto address is a single
config value in `src/lib/config.ts` (override with NEXT_PUBLIC_SPONSOR_EMAIL).
TouristTrip JSON-LD is generated per trail alongside the LocalBusiness blocks.
Tracking events: map_opened, stop_selected, reward_clicked, trail_selected,
sponsor_enquiry — the enum is defined once in types.ts and shared by the API,
the parent bridge listener, and docs/trail-app-bridge.js.

## What's inside
- `src/components/` — Header (responsive, spring-animated mobile menu), Hero
  (your intro clip playing subtly behind the copy: brightness/saturation
  filter + navy gradient + vignette), PhoneMockup (compass → gold laser scan
  → 3.5s → typewriter telegram + coupon), Showcase (styled YouTube iframe player),
  HowItWorks (Find → Intel → Reward), SMEHub (fetches `/api/merchants`, accordion reward reveals),
  CouncilPitch (three pillars + your signage render), Footer (compliance note).
- `src/app/api/merchants` — GBP-aligned merchant card DTOs.
- `src/app/api/schema/[merchantId]` — engine-generated LocalBusiness JSON-LD
  (also injected into the page head server-side via `SchemaScripts`).
- `src/app/api/events` — Zod-validated sink for `map_opened`,
  `stop_selected`, `reward_clicked` (fired via `navigator.sendBeacon`).
- `src/lib/seo/` — the Haversine/JSON-LD engine and validated datasets,
  shared contract with the visitryde-seo backend module.
- `public/brand`, `public/media` — your uploaded logos, signage render,
  intro clip, and an extracted poster frame.

## Notes
- The "Launch Trail (Demo)" header CTA scrolls to the phone and auto-runs the
  scan sequence via a custom window event.
- Fonts load via `<link>` tags; `optimizeFonts` is disabled so CI/offline
  builds don't need font-CDN access. Remove that line if you prefer inlining.
- Reduced-motion preferences are respected globally in `globals.css`.
- Merchant coordinates/addresses inherit the backend datasets — verify against
  each partner's Google Business Profile before go-live.

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

## What's inside
- `src/components/` — Header (responsive, spring-animated mobile menu), Hero
  (your intro clip playing subtly behind the copy: brightness/saturation
  filter + navy gradient + vignette), PhoneMockup (compass → gold laser scan
  → 3.5s → typewriter telegram + coupon), Showcase (custom video player:
  play/pause, seekable progress, mute, timecodes), HowItWorks (Find → Intel →
  Yield), SMEHub (fetches `/api/merchants`, accordion reward reveals),
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

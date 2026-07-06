export default function Showcase() {
  return (
    <section id="history-hub" className="relative py-28">
      <div className="section-shell">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Wartime Chapter</p>
          <h2 className="mt-4 font-display text-4xl text-cream sm:text-5xl">
            Puckpool Battery, <span className="italic text-gold">1940s</span>
          </h2>
          <p className="mt-5 leading-relaxed text-mutedwarm">
            A cinematic time-slip through Ryde&apos;s coastal defence network —
            revealing how the Island&apos;s seafront, batteries, piers and
            observation points helped protect Spithead and Portsmouth Harbour
            during the Second World War.
          </p>
        </div>

        <div className="signal-divider mt-10" aria-hidden>
          <span /> <span /> <span />
        </div>

        {/* --- Player --- */}
        <div className="group relative mx-auto mt-10 max-w-4xl overflow-hidden rounded-lg border border-gold/20 shadow-[0_40px_100px_rgba(0,0,0,0.55)] bg-black">
          <iframe
            src="https://www.youtube-nocookie.com/embed/ompzocP76dw?rel=0&modestbranding=1"
            title="IsleConnect — Puckpool Battery, 1940s Film"
            className="aspect-video w-full border-0 block"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-mutedwarm">
          This preview shows how the Wartime Solent Defence trail can turn each QR stop into a short, mobile-first briefing for walkers, cyclists, families, schools and military-history visitors.
        </p>

        <p className="mx-auto mt-4 max-w-4xl text-center text-[0.65rem] uppercase tracking-[0.25em] text-mutedwarm/80">
          Excerpt · Wartime trail sizzle reel produced through the Vectis ONE media pipeline
        </p>
      </div>
    </section>
  );
}

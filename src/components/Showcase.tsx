export default function Showcase() {
  return (
    <section id="history-hub" className="relative py-28">
      <div className="section-shell">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">History Hub</p>
          <h2 className="mt-4 font-display text-4xl text-cream sm:text-5xl">
            Dover Street, <span className="italic text-gold">1862</span>
          </h2>
          <p className="mt-5 leading-relaxed text-mutedwarm">
            A cinematic time-slip through Ryde&apos;s imperial transformation —
            the season the town became the Solent&apos;s front door. Each trail
            stop unlocks a chapter of this film on location.
          </p>
        </div>

        <div className="signal-divider mt-10" aria-hidden>
          <span /> <span /> <span />
        </div>

        {/* --- Player --- */}
        <div className="group relative mx-auto mt-10 max-w-4xl overflow-hidden rounded-lg border border-gold/20 shadow-[0_40px_100px_rgba(0,0,0,0.55)] bg-black">
          <iframe
            src="https://www.youtube-nocookie.com/embed/ompzocP76dw?rel=0&modestbranding=1"
            title="IsleConnect — Dover Street, 1862 Film"
            className="aspect-video w-full border-0 block"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        <p className="mx-auto mt-6 max-w-4xl text-center text-xs uppercase tracking-[0.25em] text-mutedwarm">
          Excerpt · Full Appley Time-Slip sequence renders per stop via the
          Remotion pipeline
        </p>
      </div>
    </section>
  );
}

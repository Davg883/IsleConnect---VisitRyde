import Image from "next/image";
import { Mail, MapPin, ShieldCheck } from "lucide-react";
import { PILOT_STATUS, SPONSOR_EMAIL } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="border-t border-gold/15 bg-ink-950 py-16">
      <div className="section-shell grid gap-12 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/brand/logo-mark.png"
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 rounded-full"
            />
            <span className="font-display text-lg tracking-widest text-cream">
              ISLE<span className="text-gold">CONNECT</span>
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-mutedwarm">
            IsleConnect is a friendly, no-app guide connecting local stories,
            places and useful next steps across the Isle of Wight.
          </p>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-[0.3em] text-gold-soft">
            Contact
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-mutedwarm">
            <li className="flex items-center gap-2">
              <Mail size={15} className="text-gold-soft" />
              <a
                href={`mailto:${SPONSOR_EMAIL}`}
                className="transition-colors hover:text-gold"
              >
                {SPONSOR_EMAIL}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={15} className="mt-0.5 shrink-0 text-gold-soft" />
              <span>Ryde, Isle of Wight, United Kingdom</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-[0.3em] text-gold-soft flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-tide" /> How IsleConnect stays trusted
          </h3>
          <p className="mt-4 text-xs leading-relaxed text-mutedwarm">
            Verified &amp; current place details · Permission-aware venue information ·
            Reusable content foundation maintained via the Vectis ONE media pipeline.
          </p>
          <p className="mt-3 text-[0.65rem] text-gold-soft/80">
            {PILOT_STATUS}.
          </p>
        </div>
      </div>
      <div className="section-shell mt-12 border-t border-cream/10 pt-6 flex flex-col md:flex-row justify-between gap-4">
        <p className="text-xs text-mutedwarm">
          © {new Date().getFullYear()} IsleConnect. Crafted on the Island.
        </p>
        <p className="text-xs text-mutedwarm">
          No app download required. Open in any mobile browser.
        </p>
      </div>
    </footer>
  );
}

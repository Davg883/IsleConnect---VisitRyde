import Image from "next/image";
import { Mail, MapPin } from "lucide-react";

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
            The Coastal Creative Gateway — an interactive heritage and
            local-economy platform for Ryde, Isle of Wight. Built with, and
            for, the town&apos;s independent businesses.
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
                href="mailto:david@isleconnect.co.uk"
                className="transition-colors hover:text-gold"
              >
                david@isleconnect.co.uk
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={15} className="mt-0.5 shrink-0 text-gold-soft" />
              <span>Ryde, Isle of Wight, United Kingdom</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-[0.3em] text-gold-soft">
            Programme note
          </h3>
          <p className="mt-4 text-xs leading-relaxed text-mutedwarm">
            This pilot is presented to Ryde Town Council and the Ryde
            Neighbourhood Board in support of an application under the Pride in
            Place programme. Figures shown are programme targets for the pilot
            period unless stated otherwise; interaction data is collected
            anonymously and reported to the Board. IsleConnect is an
            independent initiative and this page does not represent the views
            of Ryde Town Council.
          </p>
        </div>
      </div>
      <div className="section-shell mt-12 border-t border-cream/10 pt-6">
        <p className="text-xs text-mutedwarm">
          © {new Date().getFullYear()} IsleConnect. Crafted on the Island.
        </p>
      </div>
    </footer>
  );
}

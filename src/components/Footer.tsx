"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const FOOTER_LINKS = {
  Explorer: [
    { href: "#biens", label: "Biens à la une" },
    { href: "#galerie", label: "Galerie" },
    { href: "#pourquoi", label: "Pourquoi YourHome" },
  ],
  Agence: [
    { href: "#agence", label: "Notre équipe" },
    { href: "#temoignages", label: "Témoignages" },
    { href: "#contact", label: "Contact" },
  ],
};

const SOCIALS = ["Instagram", "LinkedIn", "Pinterest"];

export default function Footer() {
  const footerRef = useScrollReveal<HTMLElement>();

  return (
    <footer
      ref={footerRef}
      className="border-t border-white/10 px-gutter pb-10 pt-section"
    >
      <div className="grid gap-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="flex flex-col gap-6" data-reveal>
          <span className="font-display text-3xl">
            Your<span className="text-gold">Home</span>
          </span>
          <p className="max-w-xs text-stone">
            L&apos;immobilier de prestige, pensé comme une expérience de la
            première visite à la remise des clés.
          </p>
        </div>

        {Object.entries(FOOTER_LINKS).map(([title, links]) => (
          <div key={title} data-reveal className="flex flex-col gap-4">
            <h3 className="text-xs uppercase tracking-wide2 text-gold">{title}</h3>
            <ul className="flex flex-col gap-3">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="nav-hover-btn text-sm normal-case tracking-normal"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div
        data-reveal
        className="mt-20 flex flex-col gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between"
      >
        <p className="text-xs text-stone">
          © {new Date().getFullYear()} YourHome. Tous droits réservés.
        </p>
        <div className="flex gap-6">
          {SOCIALS.map((social) => (
            <a key={social} href="#" className="nav-hover-btn text-xs">
              {social}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

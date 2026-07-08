"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useSiteReady } from "./SiteReadyContext";
import Button from "./Button";

const NAV_LINKS = [
  { href: "#biens", label: "Biens" },
  { href: "#agence", label: "Agence" },
  { href: "#galerie", label: "Galerie" },
  { href: "#temoignages", label: "Témoignages" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const { isReady } = useSiteReady();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("");

  // Logo/nav entrance, gated behind the preloader curtain finishing.
  useGSAP(
    () => {
      if (!isReady || !navRef.current) return;
      gsap.from(navRef.current, {
        y: -40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.15,
      });
    },
    { dependencies: [isReady] }
  );

  // Transparent-over-hero -> solid-on-scroll background swap.
  useGSAP(() => {
    const trigger = ScrollTrigger.create({
      start: "80px top",
      onEnter: () => navRef.current?.classList.add("nav-scrolled"),
      onLeaveBack: () => navRef.current?.classList.remove("nav-scrolled"),
    });
    return () => trigger.kill();
  }, []);

  // Scrollspy: highlights the nav link for whichever section currently
  // spans the vertical centre of the viewport. Reads live bounding boxes on
  // every scroll tick (rather than precomputed start/end offsets) because
  // the pinned horizontal gallery section keeps its rect fixed on screen
  // for the whole time it's active, which static ScrollTrigger offsets
  // can't represent.
  useGSAP(() => {
    const sections = NAV_LINKS.map((link) => ({
      href: link.href,
      el: document.querySelector<HTMLElement>(link.href),
    })).filter((section): section is { href: string; el: HTMLElement } => Boolean(section.el));

    const updateActive = () => {
      const centerY = window.innerHeight / 2;
      const current = sections.find(({ el }) => {
        const rect = el.getBoundingClientRect();
        return rect.top <= centerY && rect.bottom >= centerY;
      });
      setActiveHref(current?.href ?? "");
    };

    const trigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: updateActive,
      onRefresh: updateActive,
    });
    return () => trigger.kill();
  }, []);

  return (
    <header
      ref={navRef}
      className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-gutter py-5 transition-colors"
    >
      <Link
        href="#top"
        className="font-display text-xl tracking-tight text-ivory transition-opacity duration-300 hover:opacity-70"
      >
        Your<span className="text-gold">Home</span>
      </Link>

      <nav className="hidden items-center gap-10 md:flex">
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={`nav-hover-btn ${activeHref === link.href ? "is-active" : ""}`}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className="hidden md:block">
        <Button href="#contact" variant="outline">
          Prendre rendez-vous
        </Button>
      </div>

      <button
        type="button"
        aria-label="Ouvrir le menu"
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen((open) => !open)}
        className="flex flex-col gap-1.5 md:hidden"
      >
        <span
          className={`h-px w-7 bg-ivory transition-transform duration-300 ${
            isMenuOpen ? "translate-y-0.75 rotate-45" : ""
          }`}
        />
        <span
          className={`h-px w-7 bg-ivory transition-opacity duration-300 ${
            isMenuOpen ? "opacity-0" : "opacity-100"
          }`}
        />
        <span
          className={`h-px w-7 bg-ivory transition-transform duration-300 ${
            isMenuOpen ? "-translate-y-1.25 -rotate-45" : ""
          }`}
        />
      </button>

      {isMenuOpen && (
        <nav className="absolute inset-x-0 top-full flex flex-col gap-6 bg-ink/95 px-gutter py-8 backdrop-blur-md md:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={`text-lg transition-all duration-300 hover:translate-x-1 hover:text-gold ${
                activeHref === link.href ? "translate-x-1 text-gold" : "text-ivory"
              }`}
            >
              {link.label}
            </a>
          ))}
          <Button href="#contact" variant="solid" className="mt-2 justify-center">
            Prendre rendez-vous
          </Button>
        </nav>
      )}
    </header>
  );
}

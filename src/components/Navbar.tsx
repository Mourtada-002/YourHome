"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useSiteReady } from "./SiteReadyContext";
import { useIsMobile } from "@/hooks/useIsMobile";
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
  const menuOverlayRef = useRef<HTMLDivElement>(null);
  const menuLinksRef = useRef<Array<HTMLAnchorElement | null>>([]);
  const menuCtaRef = useRef<HTMLDivElement>(null);
  const menuTlRef = useRef<gsap.core.Timeline | null>(null);
  const { isReady } = useSiteReady();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("");
  const closeMenu = () => setIsMenuOpen(false);

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

  // Mobile menu overlay: a single paused timeline (backdrop fade, then links
  // and CTA staggering in) that plays forward on open and reverses on close,
  // instead of the overlay just popping in/out with no transition.
  useGSAP(() => {
    if (!menuOverlayRef.current) return;
    const links = menuLinksRef.current.filter((el): el is HTMLAnchorElement => Boolean(el));

    const tl = gsap.timeline({ paused: true })
      .fromTo(
        menuOverlayRef.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.5, ease: "power2.out" }
      )
      .fromTo(
        links,
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.07, ease: "power3.out" },
        "-=0.25"
      )
      .fromTo(
        menuCtaRef.current,
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
        "-=0.3"
      );

    menuTlRef.current = tl;
    return () => {
      tl.kill();
      menuTlRef.current = null;
    };
  }, []);

  useGSAP(
    () => {
      if (isMenuOpen) {
        menuTlRef.current?.play();
      } else {
        menuTlRef.current?.reverse();
      }
    },
    { dependencies: [isMenuOpen] }
  );

  // Force-close if the viewport grows past the mobile breakpoint while open
  // (e.g. rotating a tablet), so the overlay can't get stuck open behind the
  // desktop nav.
  useEffect(() => {
    if (!isMobile) setIsMenuOpen(false);
  }, [isMobile]);

  // Block scroll behind the overlay while it's open, and let Escape close it.
  useEffect(() => {
    if (!isMenuOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <>
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
        aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen((open) => !open)}
        className="relative z-50 flex flex-col gap-1.5 transition-transform duration-300 ease-premium active:scale-90 md:hidden"
      >
        <span
          className={`h-px w-7 bg-ivory transition-transform duration-500 ease-premium ${
            isMenuOpen ? "translate-y-2 rotate-45" : ""
          }`}
        />
        <span
          className={`h-px w-7 bg-ivory transition-opacity duration-300 ease-premium ${
            isMenuOpen ? "opacity-0" : "opacity-100"
          }`}
        />
        <span
          className={`h-px w-7 bg-ivory transition-transform duration-500 ease-premium ${
            isMenuOpen ? "-translate-y-2 -rotate-45" : ""
          }`}
        />
      </button>
    </header>

    {/* Rendered as a sibling of <header>, not a child: the header gets a
        GSAP `y` entrance animation, which leaves an inline `transform` on
        it. A `transform` on an ancestor turns it into the containing block
        for `position: fixed` descendants, so a fixed overlay nested inside
        would size itself to the header's own (thin) box instead of the
        viewport. Always mounted (visibility/opacity are GSAP-driven) so
        both the open and close transitions can animate — a
        `{isMenuOpen && ...}` mount would just pop the panel in/out. */}
    <div
      ref={menuOverlayRef}
      className="invisible fixed inset-0 z-40 flex flex-col items-center justify-center gap-4 bg-ink/98 backdrop-blur-lg opacity-0 md:hidden"
    >
      <nav className="flex flex-col items-center gap-4">
        {NAV_LINKS.map((link, index) => (
          <a
            key={link.href}
            ref={(el) => {
              menuLinksRef.current[index] = el;
            }}
            href={link.href}
            onClick={closeMenu}
            className={`flex items-baseline gap-3 font-display text-4xl transition-colors duration-300 ${
              activeHref === link.href ? "text-gold" : "text-ivory active:text-gold"
            }`}
          >
            <span className="font-sans text-xs tracking-wide2 text-gold/60">
              {String(index + 1).padStart(2, "0")}
            </span>
            {link.label}
          </a>
        ))}
      </nav>
      <div ref={menuCtaRef} onClick={closeMenu} className="mt-6">
        <Button href="#contact" variant="solid">
          Prendre rendez-vous
        </Button>
      </div>
    </div>
    </>
  );
}

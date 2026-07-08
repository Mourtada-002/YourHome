"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useSiteReady } from "./SiteReadyContext";

export default function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(true);
  const { markReady } = useSiteReady();

  useEffect(() => {
    if (!isMounted) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [isMounted]);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const counter = { value: 0 };
      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        onComplete: () => {
          markReady();
          setIsMounted(false);
        },
      });

      if (prefersReducedMotion) {
        tl.set(leftPanelRef.current, { xPercent: -100 })
          .set(rightPanelRef.current, { xPercent: 100 });
        return;
      }

      tl.from(logoRef.current, {
        opacity: 0,
        y: 16,
        duration: 0.8,
        ease: "power3.out",
      })
        .to(
          counter,
          {
            value: 100,
            duration: 1.5,
            ease: "power2.inOut",
            onUpdate: () => {
              if (counterRef.current) {
                counterRef.current.textContent = `${Math.floor(counter.value)}%`;
              }
            },
          },
          "-=0.3"
        )
        .to(barRef.current, { scaleX: 1, duration: 1.5, ease: "power2.inOut" }, "<")
        .to(logoRef.current, { opacity: 0, y: -16, duration: 0.5 }, "-=0.2")
        .to(
          leftPanelRef.current,
          { xPercent: -100, duration: 1.1, ease: "power4.inOut" },
          "curtain"
        )
        .to(
          rightPanelRef.current,
          { xPercent: 100, duration: 1.1, ease: "power4.inOut" },
          "curtain"
        );
    },
    { scope: rootRef }
  );

  if (!isMounted) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-100 pointer-events-none"
      aria-hidden="true"
    >
      <div ref={leftPanelRef} className="curtain-panel absolute inset-y-0 left-0 w-1/2" />
      <div ref={rightPanelRef} className="curtain-panel absolute inset-y-0 right-0 w-1/2" />

      <div
        ref={logoRef}
        className="absolute inset-0 flex flex-col items-center justify-center gap-6"
      >
        <span className="text-[0.65rem] uppercase tracking-wide2 text-gold">
          Agence immobilière de prestige
        </span>
        <span className="font-display text-4xl tracking-tight text-ivory md:text-5xl">
          Your<span className="text-gold">Home</span>
        </span>
        <div className="flex items-center gap-4">
          <div className="h-px w-40 overflow-hidden bg-white/10 md:w-56">
            <div
              ref={barRef}
              className="h-full w-full origin-left scale-x-0 bg-gold"
            />
          </div>
          <span
            ref={counterRef}
            className="font-display text-xs tabular-nums text-stone"
          >
            0%
          </span>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useSiteReady } from "./SiteReadyContext";
import { useSplitTextReveal } from "@/hooks/useSplitTextReveal";
import { useIsMobile } from "@/hooks/useIsMobile";
import { properties } from "@/lib/images";
import Button from "./Button";
import HeroScene from "./HeroScene";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const { isReady } = useSiteReady();
  const isMobile = useIsMobile();

  const titleRef = useSplitTextReveal<HTMLHeadingElement>({
    type: "lines",
    stagger: 0.08,
    delay: 0.1,
    trigger: "load",
    enabled: isReady,
  });

  // Subtitle + CTA fade in just after the title lines finish revealing.
  useGSAP(
    () => {
      if (!isReady) return;
      gsap.from([subRef.current, ctaRef.current], {
        y: 24,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        delay: 0.9,
        ease: "power3.out",
      });
    },
    { dependencies: [isReady] }
  );

  // Background parallax: image drifts and scales slightly slower than
  // scroll (scrub: true keeps it locked to the exact scroll position).
  // Skipped on mobile to keep scroll performance light on that breakpoint.
  useGSAP(
    () => {
      if (isMobile || !imageWrapRef.current || !sectionRef.current) return;
      gsap.to(imageWrapRef.current, {
        yPercent: 18,
        scale: 1.12,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { dependencies: [isMobile] }
  );

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex h-svh min-h-160 w-full items-end overflow-hidden"
    >
      <div ref={imageWrapRef} className="absolute inset-0 -z-10 scale-[1.06]">
        <Image
          src={properties.villaCotedazur.src}
          alt={properties.villaCotedazur.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/30 to-ink/10" />
      </div>

      {/* Optional 3D accent (R3F): a floating wireframe icosahedron, desktop only */}
      {!isMobile && (
        <div className="pointer-events-none absolute right-[6vw] top-[16vh] hidden h-[38vh] w-[38vh] max-w-md md:block">
          <HeroScene />
        </div>
      )}

      <div className="flex w-full flex-col gap-8 px-gutter pb-24 pt-40 md:pb-32">
        <p className="text-xs uppercase tracking-wide2 text-gold">
          Agence immobilière de prestige
        </p>
        <h1
          ref={titleRef}
          className="max-w-4xl font-display text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.95] text-ivory"
        >
          Chaque adresse
          <br />
          raconte une histoire.
        </h1>
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p ref={subRef} className="max-w-md text-stone">
            YourHome sélectionne et accompagne l&apos;acquisition des biens
            d&apos;exception — villas, penthouses et demeures de caractère —
            avec une exigence de service sur-mesure.
          </p>
          <div ref={ctaRef}>
            <Button href="#biens" variant="solid">
              Découvrir nos biens
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useIsMobile } from "@/hooks/useIsMobile";
import { properties } from "@/lib/images";

const GALLERY = [
  properties.villaPiscine,
  properties.facadePierre,
  properties.maisonVegetation,
  properties.villaNuit,
  properties.architectureLignes,
  properties.maisonAngle,
];

export default function HorizontalGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Pin the section for the length of the horizontal track, then drive its
  // x-translation with the vertical scrollbar (scrub: true) — vertical
  // scroll becomes horizontal motion while the section stays pinned.
  useGSAP(
    () => {
      if (isMobile || !trackRef.current || !sectionRef.current) return;
      const track = trackRef.current;
      const scrollDistance = track.scrollWidth - window.innerWidth;
      if (scrollDistance <= 0) return;

      gsap.to(track, {
        x: -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${scrollDistance}`,
          scrub: true,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    },
    { dependencies: [isMobile] }
  );

  return (
    <section id="galerie" ref={sectionRef} className="relative overflow-hidden">
      {isMobile ? (
        <div className="no-scrollbar flex gap-6 overflow-x-auto px-gutter py-section">
          {GALLERY.map((image) => (
            <div
              key={image.src}
              className="relative h-[50vh] w-[85vw] flex-none overflow-hidden rounded-sm"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="85vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      ) : (
        <div ref={trackRef} className="flex h-screen w-max items-center gap-10 px-gutter">
          <div className="flex h-full max-w-md flex-none flex-col justify-center gap-6 pr-10">
            <p className="text-xs uppercase tracking-wide2 text-gold">Galerie</p>
            <h2 className="font-display text-5xl">Un patrimoine d&apos;exception</h2>
            <p className="text-stone">
              Faites défiler pour parcourir une sélection de biens
              représentatifs du savoir-faire YourHome.
            </p>
          </div>
          {GALLERY.map((image) => (
            <div
              key={image.src}
              className="relative h-[70vh] w-[36vw] min-w-[320px] flex-none overflow-hidden rounded-sm"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="36vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useIsMobile } from "@/hooks/useIsMobile";
import { properties } from "@/lib/images";

interface FeaturedProperty {
  image: { src: string; alt: string };
  name: string;
  location: string;
  price: string;
}

const FEATURED: FeaturedProperty[] = [
  {
    image: properties.villaCotedazur,
    name: "Villa Azur",
    location: "Cap-Ferrat, France",
    price: "6 800 000 €",
  },
  {
    image: properties.penthouseParis,
    name: "Penthouse Haussmann",
    location: "Paris 8e",
    price: "4 950 000 €",
  },
  {
    image: properties.maisonDusk,
    name: "Maison des Collines",
    location: "Saint-Tropez",
    price: "8 250 000 €",
  },
];

export default function FeaturedProperties() {
  const sectionRef = useScrollReveal<HTMLElement>();
  const isMobile = useIsMobile();
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  useGSAP(
    () => {
      if (isMobile) return;
      cardRefs.current.forEach((card) => {
        if (!card) return;
        const image = card.querySelector<HTMLElement>("[data-zoom-image]");
        if (!image) return;

        gsap.fromTo(
          image,
          { scale: 1.35 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    },
    { dependencies: [isMobile], scope: sectionRef }
  );

  return (
    <section id="biens" ref={sectionRef} className="px-gutter py-section">
      <div className="mb-16 flex flex-col gap-4" data-reveal>
        <p className="text-xs uppercase tracking-wide2 text-gold">Sélection</p>
        <h2 className="max-w-2xl font-display text-4xl md:text-6xl">
          Biens à la une
        </h2>
      </div>

      <div className="flex flex-col gap-24">
        {FEATURED.map((property, index) => (
          <div
            key={property.name}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            data-reveal
            className="group relative h-[70vh] min-h-105 w-full overflow-hidden rounded-sm"
          >
            <div data-zoom-image className="absolute inset-0 h-full w-full">
              <Image
                src={property.image.src}
                alt={property.image.alt}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-linear-to-t from-ink/80 via-ink/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-8 md:p-12">
              <span className="text-xs uppercase tracking-wide2 text-gold">
                {property.location}
              </span>
              <h3 className="font-display text-3xl text-ivory md:text-5xl">
                {property.name}
              </h3>
              <span className="text-stone">{property.price}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

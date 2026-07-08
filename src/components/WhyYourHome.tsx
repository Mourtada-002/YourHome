"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { properties } from "@/lib/images";

const REASONS = [
  {
    title: "Expertise locale",
    text: "Une connaissance fine des marchés les plus recherchés, quartier par quartier.",
  },
  {
    title: "Réseau international",
    text: "Une clientèle qualifiée en France comme à l'étranger, pour une diffusion ciblée.",
  },
  {
    title: "Accompagnement sur-mesure",
    text: "Un interlocuteur unique, de la visite privée jusqu'à la signature.",
  },
  {
    title: "Confidentialité",
    text: "Des transactions menées avec la discrétion que méritent les biens d'exception.",
  },
];

export default function WhyYourHome() {
  const sectionRef = useScrollReveal<HTMLElement>();
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!imageRef.current) return;
      gsap.fromTo(
        imageRef.current,
        { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: 1.4,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 75%",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="pourquoi"
      ref={sectionRef}
      className="grid gap-16 px-gutter py-section md:grid-cols-2 md:items-center"
    >
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-4" data-reveal>
          <p className="text-xs uppercase tracking-wide2 text-gold">
            Pourquoi YourHome
          </p>
          <h2 className="max-w-lg font-display text-4xl md:text-5xl">
            Une exigence qui se ressent à chaque étape
          </h2>
        </div>
        <dl className="grid gap-8 sm:grid-cols-2">
          {REASONS.map((reason) => (
            <div
              key={reason.title}
              data-reveal
              className="flex flex-col gap-2 border-t border-white/10 pt-4"
            >
              <dt className="font-display text-lg text-ivory">{reason.title}</dt>
              <dd className="text-sm text-stone">{reason.text}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div
        ref={imageRef}
        className="relative h-[60vh] min-h-105 w-full overflow-hidden rounded-sm"
      >
        <Image
          src={properties.facadeModerne.src}
          alt={properties.facadeModerne.alt}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}

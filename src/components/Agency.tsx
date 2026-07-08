"use client";

import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { portraits } from "@/lib/images";

const TEAM = [
  {
    image: portraits.agentClaire,
    name: "Claire Fontaine",
    role: "Fondatrice & CEO",
  },
  {
    image: portraits.agentMarc,
    name: "Christian Emmanuel",
    role: "Directeur des transactions",
  },
  {
    image: portraits.agentNoah,
    name: "Noah Bertrand",
    role: "Expert biens de prestige",
  },
  {
    image: portraits.agentSofia,
    name: "Fadimata Diallo",
    role: "Relation clients",
  },
];

export default function Agency() {
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section id="agence" ref={sectionRef} className="px-gutter py-section">
      <div className="mb-16 flex flex-col gap-4 md:max-w-2xl" data-reveal>
        <p className="text-xs uppercase tracking-wide2 text-gold">Notre agence</p>
        <h2 className="font-display text-4xl md:text-6xl">
          Une équipe qui connaît chaque quartier par cœur
        </h2>
        <p className="text-stone">
          Depuis plus de quinze ans, YourHome réunit des experts passionnés,
          attachés à une relation de confiance durable avec leurs clients.
        </p>
      </div>

      <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
        {TEAM.map((member) => (
          <div key={member.name} data-reveal className="group flex flex-col gap-4">
            <div className="relative h-80 w-full overflow-hidden rounded-sm">
              <Image
                src={member.image.src}
                alt={member.image.alt}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-premium group-hover:scale-110"
              />
            </div>
            <div>
              <h3 className="font-display text-xl text-ivory">{member.name}</h3>
              <p className="text-sm text-stone">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

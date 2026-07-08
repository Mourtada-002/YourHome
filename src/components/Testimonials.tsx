"use client";

import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { portraits, properties } from "@/lib/images";

const TESTIMONIALS = [
  {
    quote:
      "YourHome a su comprendre exactement ce que nous cherchions. La vente s'est faite en toute confidentialité, avec un accompagnement irréprochable.",
    author: "Henri D.",
    role: "Propriétaire, Neuilly-sur-Seine",
    image: portraits.clientHenri,
  },
  {
    quote:
      "Un réseau d'acheteurs qualifiés et une connaissance fine du marché : nous avons vendu notre villa au juste prix, en six semaines.",
    author: "Elena M.",
    role: "Vendeuse, Saint-Tropez",
    image: portraits.clientElena,
  },
  {
    quote:
      "L'équipe a anticipé chaque étape de notre acquisition, jusqu'aux moindres détails administratifs.",
    author: "Yanis K.",
    role: "Investisseur",
    image: portraits.clientYanis,
  },
  {
    quote:
      "Une expérience à la hauteur du bien que nous recherchions : rare, précise, humaine.",
    author: "Amélie R.",
    role: "Acquéreuse, Paris 16e",
    image: portraits.clientAmelie,
  },
];

export default function Testimonials() {
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section
      id="temoignages"
      ref={sectionRef}
      className="relative overflow-hidden px-gutter py-section"
    >
      <div className="absolute inset-0 -z-10 opacity-25">
        <Image
          src={properties.interieurLuxe.src}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="mb-16 flex flex-col gap-4" data-reveal>
        <p className="text-xs uppercase tracking-wide2 text-gold">Témoignages</p>
        <h2 className="mask-text max-w-3xl font-display text-4xl text-ivory md:text-6xl">
          Ils nous ont fait confiance
        </h2>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {TESTIMONIALS.map((testimonial) => (
          <figure
            key={testimonial.author}
            data-reveal
            className="flex flex-col gap-6 rounded-sm border border-white/10 bg-surface/60 p-8 backdrop-blur-sm"
          >
            <blockquote className="font-display text-xl leading-snug text-ivory">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>
            <figcaption className="flex items-center gap-4">
              <div className="relative h-12 w-12 overflow-hidden rounded-full">
                <Image
                  src={testimonial.image.src}
                  alt={testimonial.image.alt}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm text-ivory">{testimonial.author}</p>
                <p className="text-xs text-stone">{testimonial.role}</p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { properties } from "@/lib/images";

export default function Contact() {
  const sectionRef = useScrollReveal<HTMLElement>();
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitted(true);
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="grid gap-16 px-gutter py-section md:grid-cols-2"
    >
      <div
        className="relative order-2 h-[50vh] min-h-[360px] overflow-hidden rounded-sm md:order-1"
        data-reveal
      >
        <Image
          src={properties.salonLumiere.src}
          alt={properties.salonLumiere.alt}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="order-1 flex flex-col gap-8 md:order-2">
        <div className="flex flex-col gap-4" data-reveal>
          <p className="text-xs uppercase tracking-wide2 text-gold">Contact</p>
          <h2 className="font-display text-4xl md:text-5xl">
            Planifions votre prochaine visite
          </h2>
          <p className="text-stone">
            Décrivez votre projet, un conseiller YourHome vous recontacte sous
            24h.
          </p>
        </div>

        {isSubmitted ? (
          <p
            data-reveal
            className="rounded-sm border border-gold/30 bg-surface p-6 text-ivory"
          >
            Merci, votre demande a bien été transmise. Un conseiller vous
            recontactera très prochainement.
          </p>
        ) : (
          <form onSubmit={handleSubmit} data-reveal className="flex flex-col gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <input
                required
                name="name"
                placeholder="Nom complet"
                className="border-b border-white/20 bg-transparent py-3 text-ivory placeholder:text-stone focus:border-gold focus:outline-none"
              />
              <input
                required
                type="email"
                name="email"
                placeholder="Email"
                className="border-b border-white/20 bg-transparent py-3 text-ivory placeholder:text-stone focus:border-gold focus:outline-none"
              />
            </div>
            <input
              name="phone"
              placeholder="Téléphone"
              className="border-b border-white/20 bg-transparent py-3 text-ivory placeholder:text-stone focus:border-gold focus:outline-none"
            />
            <textarea
              name="message"
              rows={4}
              placeholder="Votre projet"
              className="border-b border-white/20 bg-transparent py-3 text-ivory placeholder:text-stone focus:border-gold focus:outline-none"
            />
            <button
              type="submit"
              className="group relative mt-2 inline-flex w-fit items-center gap-3 overflow-hidden rounded-full border border-gold bg-gold px-7 py-3 text-xs font-medium uppercase tracking-wide2 text-ink"
            >
              Envoyer ma demande
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

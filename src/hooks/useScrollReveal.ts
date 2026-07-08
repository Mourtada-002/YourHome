"use client";

import { useRef, type RefObject } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

interface UseScrollRevealOptions {
  /** Selector (scoped to the returned container ref) for elements to stagger in. */
  targets?: string;
  y?: number;
  stagger?: number;
  start?: string;
  duration?: number;
}

/**
 * Generic fade + translateY reveal on scroll, with stagger across a grid of
 * children. Attach the returned ref to a section container and mark each
 * child that should animate with `data-reveal`.
 */
export function useScrollReveal<T extends HTMLElement>(
  options: UseScrollRevealOptions = {}
): RefObject<T | null> {
  const containerRef = useRef<T>(null);
  const {
    targets = "[data-reveal]",
    y = 60,
    stagger = 0.12,
    start = "top 80%",
    duration = 1,
  } = options;

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const elements = containerRef.current.querySelectorAll<HTMLElement>(targets);
      if (elements.length === 0) return;

      gsap.from(elements, {
        y,
        opacity: 0,
        duration,
        stagger,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start,
        },
      });
    },
    { scope: containerRef } // useGSAP auto-reverts everything created here on unmount
  );

  return containerRef;
}

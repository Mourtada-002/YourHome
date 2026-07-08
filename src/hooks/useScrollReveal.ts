"use client";

import { useRef, type RefObject } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

interface UseScrollRevealOptions {
  targets?: string;
  y?: number;
  stagger?: number;
  start?: string;
  duration?: number;
}

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
    { scope: containerRef }
  );

  return containerRef;
}

"use client";

import { useRef, type RefObject } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap";

type SplitType = "lines" | "words" | "chars";

interface UseSplitTextRevealOptions {
  type?: SplitType;
  stagger?: number;
  delay?: number;
  trigger?: "load" | "scroll";
  enabled?: boolean;
}

export function useSplitTextReveal<T extends HTMLElement>(
  options: UseSplitTextRevealOptions = {}
): RefObject<T | null> {
  const ref = useRef<T>(null);
  const {
    type = "lines",
    stagger = 0.06,
    delay = 0,
    trigger = "load",
    enabled = true,
  } = options;

  useGSAP(
    () => {
      if (!ref.current || !enabled) return;

      const split = SplitText.create(ref.current, {
        type,
        mask: type,
        autoSplit: true,
      });

      const revealTargets =
        type === "lines" ? split.lines : type === "words" ? split.words : split.chars;

      gsap.from(revealTargets, {
        yPercent: 110,
        opacity: 0,
        duration: 1.1,
        stagger,
        delay,
        ease: "power4.out",
        scrollTrigger:
          trigger === "scroll"
            ? { trigger: ref.current, start: "top 85%" }
            : undefined,
      });
    },
    { scope: ref, dependencies: [enabled], revertOnUpdate: true }
  );

  return ref;
}

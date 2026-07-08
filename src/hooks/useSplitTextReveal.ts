"use client";

import { useRef, type RefObject } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap";

type SplitType = "lines" | "words" | "chars";

interface UseSplitTextRevealOptions {
  type?: SplitType;
  stagger?: number;
  delay?: number;
  /** "load" fires immediately (e.g. hero title), "scroll" waits for the element to enter view. */
  trigger?: "load" | "scroll";
  /** Gate the load-triggered animation behind an external readiness flag (e.g. preloader done). */
  enabled?: boolean;
}

/**
 * Splits text into lines/words/chars (each masked in an overflow-hidden
 * wrapper) and animates them up from behind the mask — the Zentry-style
 * headline reveal. SplitText instance is reverted automatically by useGSAP.
 */
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

"use client";

import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./gsap";

/**
 * Wires Lenis' smooth-scroll rAF loop into GSAP's ticker and keeps
 * ScrollTrigger's cached measurements in sync with Lenis' virtual scroll
 * position. Without this bridge, scrub/pin animations desync from what the
 * user actually sees Lenis render.
 */
export function createLenis(): Lenis {
  const lenis = new Lenis({
    duration: 1.15,
    easing: (t: number) => 1 - Math.pow(1 - t, 3),
    smoothWheel: true,
  });

  lenis.on("scroll", ScrollTrigger.update);

  const tick = (time: number) => {
    lenis.raf(time * 1000);
  };
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  // Stash the ticker callback on the instance so the provider can remove it on unmount.
  (lenis as Lenis & { __tick: (time: number) => void }).__tick = tick;

  return lenis;
}

export function destroyLenis(lenis: Lenis) {
  gsap.ticker.remove((lenis as Lenis & { __tick: (time: number) => void }).__tick);
  lenis.destroy();
}

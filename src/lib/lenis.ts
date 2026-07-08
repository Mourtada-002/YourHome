"use client";

import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./gsap";

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

  (lenis as Lenis & { __tick: (time: number) => void }).__tick = tick;

  return lenis;
}

export function destroyLenis(lenis: Lenis) {
  gsap.ticker.remove((lenis as Lenis & { __tick: (time: number) => void }).__tick);
  lenis.destroy();
}

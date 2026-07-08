"use client";

import { useSyncExternalStore } from "react";

const MOBILE_QUERY = "(max-width: 767px)";

function subscribe(callback: () => void) {
  const mql = window.matchMedia(MOBILE_QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(MOBILE_QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

/**
 * Tracks the project's single breakpoint (768px) so heavy scroll-driven
 * animations (pin, scrub, parallax) can be simplified or skipped on mobile.
 *
 * Uses useSyncExternalStore (not useState + useEffect) so the real value is
 * available on the client's very first render, with no hydration-mismatch
 * warning. A useEffect-based version briefly reports `false` (desktop) on
 * mobile's first client render before correcting itself one tick later —
 * long enough for GSAP effects gated on `isMobile` (e.g. HorizontalGallery's
 * pin) to set up their desktop pin/spacer and then tear it down, which can
 * leave a stray empty pinned block behind.
 */
export function useIsMobile(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

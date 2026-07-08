"use client";

import { useEffect, useState } from "react";

const MOBILE_QUERY = "(max-width: 767px)";

function getInitialMatch(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(MOBILE_QUERY).matches;
}

/**
 * Tracks the project's single breakpoint (768px) so heavy scroll-driven
 * animations (pin, scrub, parallax) can be simplified or skipped on mobile.
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(getInitialMatch);

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY);
    const listener = (event: MediaQueryListEvent) => setIsMobile(event.matches);
    mql.addEventListener("change", listener);
    return () => mql.removeEventListener("change", listener);
  }, []);

  return isMobile;
}

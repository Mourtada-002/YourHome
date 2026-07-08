"use client";

import { useEffect, useState } from "react";

const MOBILE_QUERY = "(max-width: 767px)";

/**
 * Tracks the project's single breakpoint (768px) so heavy scroll-driven
 * animations (pin, scrub, parallax) can be simplified or skipped on mobile.
 *
 * Always starts `false` (matching the server, which has no viewport to
 * measure) and corrects itself inside an effect after mount. Reading
 * `matchMedia` synchronously in the initial state would give the real value
 * on the client's first render but not the server's, which is a hydration
 * mismatch on every mobile page load.
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY);
    setIsMobile(mql.matches);
    const listener = (event: MediaQueryListEvent) => setIsMobile(event.matches);
    mql.addEventListener("change", listener);
    return () => mql.removeEventListener("change", listener);
  }, []);

  return isMobile;
}

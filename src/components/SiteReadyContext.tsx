"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

interface SiteReadyContextValue {
  isReady: boolean;
  markReady: () => void;
}

const SiteReadyContext = createContext<SiteReadyContextValue | null>(null);

/**
 * Tracks whether the Preloader curtain animation has finished. Hero (and any
 * load-triggered SplitText reveal) waits on this before animating in, and
 * SmoothScrollProvider keeps Lenis stopped until it flips to true.
 */
export function SiteReadyProvider({ children }: { children: ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const value = useMemo(
    () => ({ isReady, markReady: () => setIsReady(true) }),
    [isReady]
  );

  return (
    <SiteReadyContext.Provider value={value}>{children}</SiteReadyContext.Provider>
  );
}

export function useSiteReady(): SiteReadyContextValue {
  const ctx = useContext(SiteReadyContext);
  if (!ctx) {
    throw new Error("useSiteReady must be used within a SiteReadyProvider");
  }
  return ctx;
}

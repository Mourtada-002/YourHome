"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import type Lenis from "lenis";
import { createLenis, destroyLenis } from "@/lib/lenis";
import { useSiteReady } from "./SiteReadyContext";

interface SmoothScrollProviderProps {
  children: ReactNode;
}

/**
 * Boots Lenis once for the whole app and keeps it paused while the
 * Preloader curtain is still playing, so the user can't scroll behind it.
 */
export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const { isReady } = useSiteReady();

  useGSAP(() => {
    const lenis = createLenis();
    lenis.stop();
    lenisRef.current = lenis;

    return () => {
      destroyLenis(lenis);
      lenisRef.current = null;
    };
  }, []);

  useGSAP(() => {
    if (!lenisRef.current) return;
    if (isReady) {
      lenisRef.current.start();
    } else {
      lenisRef.current.stop();
    }
  }, [isReady]);

  return <>{children}</>;
}

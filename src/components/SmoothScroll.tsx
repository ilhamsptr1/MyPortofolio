"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { ReactNode, useEffect } from "react";

const expoOut = (t: number): number =>
  t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

/**
 * Intercepts clicks on href="#section" links and delegates
 * smooth-scrolling to Lenis. Offset of -80px accounts for fixed Navbar.
 */
function AnchorScrollHandler() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>(
        "a[href^='#']"
      );
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, {
        offset: -80,
        duration: 1.2,
        easing: expoOut,
      });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [lenis]);

  return null;
}

/**
 * SmoothScroll — wraps the entire app in Lenis for smooth scrolling.
 *
 * Runs on all devices. Mobile uses native touch events via Lenis
 * (touchMultiplier controls feel). The animation optimizations elsewhere
 * handle performance — Lenis just provides the scroll engine.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        // Natural easing factor — not too slow, not too floaty
        lerp: 0.1,
        duration: 1.0,
        easing: expoOut,
        smoothWheel: true,
        // Standard wheel speed
        wheelMultiplier: 1.0,
        // 2.0 gives responsive touch that still feels native
        touchMultiplier: 2.0,
        infinite: false,
      }}
    >
      <AnchorScrollHandler />
      {children}
    </ReactLenis>
  );
}

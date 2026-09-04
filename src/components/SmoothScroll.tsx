"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { ReactNode, useEffect } from "react";

// Exponential ease-out: decelerates naturally to a stop, not floaty
const expoOut = (t: number): number =>
  t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

/**
 * Intercepts clicks on href="#section" links and delegates
 * smooth-scrolling to Lenis (so anchor nav stays smooth).
 * Offset of -80px accounts for the fixed Navbar height.
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

export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        // 0.08 = natural easing factor — not too slow, not too floaty
        lerp: 0.08,
        // Overall scroll animation ceiling in seconds
        duration: 1.1,
        // Exponential decel — content stops sharply, not elastically
        easing: expoOut,
        // Smooth mouse wheel events
        smoothWheel: true,
        // 1.0 = don't over-amplify wheel delta
        wheelMultiplier: 1.0,
        // 1.2 = gentle touch — doesn't hijack native swipe feel on mobile
        touchMultiplier: 1.2,
        infinite: false,
      }}
    >
      <AnchorScrollHandler />
      {children}
    </ReactLenis>
  );
}

"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { ReactNode, useEffect, useState } from "react";

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
 * SmoothScroll — wraps app in Lenis on desktop only.
 *
 * On touch/coarse-pointer devices (phones, tablets) Lenis is NOT activated.
 * This allows native iOS/Android momentum scrolling to work unobstructed,
 * which is far smoother than any JS scroll library on mobile.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  // SSR-safe: default to false, detect after mount
  const [isTouch, setIsTouch] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // (hover: none) + (pointer: coarse) = real touch device (phone/tablet)
    const mq = window.matchMedia("(hover: none) and (pointer: coarse)");
    setIsTouch(mq.matches);
    setReady(true);
  }, []);

  // Before mount or on touch device → native scroll (no Lenis)
  if (!ready || isTouch) {
    return <>{children}</>;
  }

  // Desktop / trackpad → Lenis smooth scroll
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,
        duration: 1.1,
        easing: expoOut,
        smoothWheel: true,
        wheelMultiplier: 1.0,
        // touchMultiplier is irrelevant here since we only activate Lenis
        // on non-touch devices, but keep it for trackpad edge cases
        touchMultiplier: 1.2,
        infinite: false,
      }}
    >
      <AnchorScrollHandler />
      {children}
    </ReactLenis>
  );
}

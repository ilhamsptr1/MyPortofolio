"use client";

import { useEffect, useRef } from "react";

/**
 * ScrollProgressBar — razor-thin accent bar at the very top of the viewport.
 *
 * Performance: uses a passive scroll listener + single rAF per scroll event,
 * NOT a continuously-looping rAF. This means zero CPU work when the user
 * is not scrolling (important for mobile battery / thermal).
 */
export default function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    let raf = 0;
    let ticking = false;

    const compute = () => {
      const scrollTop = window.scrollY;
      const docH =
        document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = `${
        docH > 0 ? Math.min((scrollTop / docH) * 100, 100) : 0
      }%`;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        raf = requestAnimationFrame(compute);
        ticking = true;
      }
    };

    // Passive: never blocks scroll thread
    window.addEventListener("scroll", onScroll, { passive: true });
    compute(); // set initial value

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[9998] h-1 bg-white/10 pointer-events-none"
      aria-hidden="true"
    >
      <div
        ref={barRef}
        className="h-full w-0 origin-left"
        style={{
          background:
            "linear-gradient(90deg, var(--theme-bg), var(--theme-accent))",
          boxShadow: "0 0 12px var(--theme-accent)",
          transition: "width 0.05s linear",
        }}
      />
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";

/**
 * ScrollProgressBar
 * A razor-thin (4px) accent-colored bar that fills from left → right
 * as the user scrolls down the page. Uses a raw rAF loop so there
 * are zero re-renders and it stays buttery-smooth at 60 fps.
 */
export default function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    let raf: number;

    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = `${Math.min(progress, 100)}%`;
      raf = requestAnimationFrame(update);
    };

    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    /* Fixed strip along the very top of the viewport — above everything except cursor */
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

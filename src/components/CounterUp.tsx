"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

/**
 * CounterUp
 * Animates a number from 0 to `end` using an easeOutExpo tween
 * whenever the element scrolls into view.
 *
 * Props:
 *  end       — target number
 *  duration  — animation duration in ms (default 1800)
 *  suffix    — appended string, e.g. "+" or "%" (default "")
 *  prefix    — prepended string, e.g. "$" (default "")
 *  className — extra classes for the <span>
 *  decimals  — decimal places to display (default 0)
 */
interface CounterUpProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  decimals?: number;
}

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export default function CounterUp({
  end,
  duration = 1800,
  suffix = "",
  prefix = "",
  className = "",
  decimals = 0,
}: CounterUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [value, setValue] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutExpo(progress);
      setValue(parseFloat((eased * end).toFixed(decimals)));

      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [isInView, end, duration, decimals]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

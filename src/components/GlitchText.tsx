"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const SYMBOLS = "!<>-_\\\\/[]{}—=+*^?#________";

interface GlitchTextProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
}

export default function GlitchText({ text, className = "", speed = 30, delay = 0 }: GlitchTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!isInView || hasAnimated) return;

    let iteration = 0;
    let timeoutId: NodeJS.Timeout;

    // Wait for the delay before starting the animation
    const startTimeoutId = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayText((prev) => {
          return text
            .split("")
            .map((letter, index) => {
              if (index < iteration) {
                return text[index];
              }
              return SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
            })
            .join("");
        });

        if (iteration >= text.length) {
          clearInterval(interval);
          setHasAnimated(true);
        }

        iteration += 1 / 3; // Controls how fast it resolves to actual text
      }, speed);

      timeoutId = interval;
    }, delay * 1000);

    return () => {
      clearTimeout(startTimeoutId);
      clearInterval(timeoutId);
    };
  }, [text, speed, delay, isInView, hasAnimated]);

  // Initial state before in view
  useEffect(() => {
    if (!isInView && !hasAnimated) {
      setDisplayText(SYMBOLS.slice(0, text.length));
    }
  }, [isInView, text, hasAnimated]);

  return (
    <motion.span
      ref={ref}
      className={`inline-block font-black uppercase tracking-tight ${className}`}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.1, delay }}
    >
      {displayText}
    </motion.span>
  );
}

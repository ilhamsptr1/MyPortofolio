"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

/**
 * TextReveal
 * Splits text into individual words, then animates each word
 * sliding up from below (masked by overflow:hidden) when the
 * container enters the viewport.  Feels like a high-end agency site.
 *
 * Props:
 *  text      — string to split & animate
 *  className — applied to the outer wrapper
 *  delay     — stagger base delay (seconds, default 0)
 *  once      — animate only the first time (default true)
 */
interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  once?: boolean;
  stagger?: number;
}

export default function TextReveal({
  text,
  className = "",
  delay = 0,
  once = true,
  stagger = 0.08,
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-10% 0px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else if (!once) {
      controls.start("hidden");
    }
  }, [isInView, controls, once]);

  const words = text.split(" ");

  return (
    <div ref={ref} className={`flex flex-wrap ${className}`} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={i}
          /* Each span clips its child so the slide-up is masked */
          className="inline-block overflow-hidden mr-[0.25em]"
          aria-hidden="true"
        >
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "110%", opacity: 0 },
              visible: { y: "0%", opacity: 1 },
            }}
            initial="hidden"
            animate={controls}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],   // custom ease-out-expo
              delay: delay + i * stagger,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </div>
  );
}

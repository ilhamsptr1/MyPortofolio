"use client";

import { motion } from "framer-motion";

const marqueeText = "ILHAM SAPUTRA • FRONTEND DEVELOPER • REACT • NEXT.JS • TYPESCRIPT • AI APPLICATIONS • MODERN UI/UX • AVAILABLE FOR FREELANCE • BUILDING BEAUTIFUL DIGITAL EXPERIENCES •";
const marqueeTextReverse = "INFORMATIKA • UNIVERSITAS GUNADARMA • OPEN SOURCE • WEB DEVELOPER • JAVASCRIPT • FRAMER MOTION • GSAP • TAILWIND CSS • HIGH PERFORMANCE •";

export default function Marquee() {
  const repeated = Array(6).fill(marqueeText).join(" ");
  const repeatedReverse = Array(6).fill(marqueeTextReverse).join(" ");

  return (
    <div className="relative z-10">
      {/* Row 1 – Left to Right */}
      <div className="overflow-hidden py-4 border-y-4 border-black bg-accent">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        >
          {[repeated, repeated].map((text, idx) => (
            <span key={idx} className="text-black font-black text-xl md:text-2xl uppercase tracking-widest pr-8 shrink-0">
              {text}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Row 2 – Right to Left (reverse), dark background */}
      <div className="overflow-hidden py-3 border-b-4 border-black bg-black/80">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          {[repeatedReverse, repeatedReverse].map((text, idx) => (
            <span key={idx} className="text-accent font-bold text-sm md:text-base uppercase tracking-widest pr-8 shrink-0">
              {text}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}


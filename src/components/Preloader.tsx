"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Disable scrolling while loading
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);

    const duration = 2000;
    const interval = 20;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setProgress(Math.min(100, Math.floor((currentStep / steps) * 100)));

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          setLoading(false);
          document.body.style.overflow = ""; // Re-enable scrolling
        }, 400); // slight pause at 100%
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center pointer-events-none"
          style={{ backgroundColor: "var(--theme-bg)" }}
        >
          <div className="flex flex-col items-center">
            {/* Massive Percentage Counter */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[6rem] md:text-[12rem] font-black neo-shadow-text leading-none tracking-tighter"
              style={{ color: "var(--theme-accent)" }}
            >
              {progress}%
            </motion.h1>

            {/* Loading Bar Container */}
            <div className="w-64 md:w-96 h-4 md:h-6 bg-black rounded-full border-4 border-black p-1 shadow-[4px_4px_0px_#000] mt-4 overflow-hidden relative">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: "var(--theme-accent)" }}
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: "linear" }}
              />
            </div>
            
            <p className="mt-6 font-black uppercase tracking-[0.3em] text-white text-sm">
              Loading Experience
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FaGithub, FaInstagram, FaTiktok } from "react-icons/fa";
import { useThemeSound } from "@/context/ThemeSoundContext";
import confetti from "canvas-confetti";
import MagneticWrapper from "@/components/MagneticWrapper";
import Hero3D from "./Hero3D";

const roles = ["Frontend Developer", "UI/UX Enthusiast", "React Specialist", "Next.js Developer"];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, -120]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  
  const { playHover, playClick } = useThemeSound();

  // Cycle through roles
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  // Easter Egg Logic
  const handleNameClick = () => {
    playClick();
    setClickCount((prev) => {
      const newCount = prev + 1;
      if (newCount === 3) {
        // Trigger massive confetti explosion
        const duration = 3000;
        const end = Date.now() + duration;

        const frame = () => {
          confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#ccff00', '#ffffff', '#0033ff', '#ff00ff', '#00ff41']
          });
          confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#ccff00', '#ffffff', '#0033ff', '#ff00ff', '#00ff41']
          });

          if (Date.now() < end) {
            requestAnimationFrame(frame);
          }
        };
        frame();
        return 0; // reset
      }
      return newCount;
    });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-16 md:pt-20 md:pb-0" style={{ overflow: "hidden" }}>

      {/* Decorative Blobs — fully inside, half-clipped */}
      <div
        className="absolute top-16 -right-20 w-56 h-56 bg-accent rounded-full opacity-15 blur-3xl pointer-events-none"
      />
      <div
        className="absolute bottom-20 -left-20 w-72 h-72 bg-white rounded-full opacity-10 blur-3xl pointer-events-none"
      />

      {/* 3D Liquid Sphere Background */}
      <Hero3D />

      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="container mx-auto px-6 relative z-10 flex flex-col items-center justify-center mt-24 md:mt-32"
      >

        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: -30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", bounce: 0.5, duration: 1 }}
          className="mb-8 px-6 py-2.5 rounded-full border-2 border-[var(--theme-border,black)] bg-accent shadow-neo-sm flex items-center gap-3 cursor-default"
          data-magnetic="true"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
          <span className="text-sm font-black tracking-widest text-black uppercase">Available for Freelance</span>
        </motion.div>

        {/* Massive Typography */}
        <div className="text-center flex flex-col items-center relative z-20 select-none">
          <div className="overflow-hidden cursor-pointer" onClick={handleNameClick} onMouseEnter={playHover} data-magnetic="true">
            <motion.h1
              initial={{ y: 120, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", bounce: 0.4, duration: 1.2 }}
              className="text-[4rem] sm:text-[6rem] md:text-[12rem] font-black leading-none tracking-tighter text-accent neo-shadow-text"
            >
              ILHAM
            </motion.h1>
          </div>

          <div className="overflow-hidden -mt-2 md:-mt-6 cursor-pointer" onClick={handleNameClick} onMouseEnter={playHover} data-magnetic="true">
            <motion.h1
              initial={{ y: 120, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", bounce: 0.4, duration: 1.2, delay: 0.1 }}
              className="text-[3.2rem] sm:text-[5rem] md:text-[10rem] font-black leading-none tracking-tighter text-white neo-shadow-text"
            >
              SAPUTRA
            </motion.h1>
          </div>

          {/* Animated Role Ticker */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-3 md:mt-6 h-10 md:h-16 overflow-hidden pointer-events-none"
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={roleIndex}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="text-sm sm:text-lg md:text-3xl font-black text-white uppercase tracking-widest neo-shadow-text-sm text-center"
              >
                — {roles[roleIndex]} —
              </motion.p>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 w-full px-4"
        >
          <MagneticWrapper strength={40} className="w-full sm:w-auto">
            <a
              href="#work"
              onMouseEnter={playHover}
              onClick={playClick}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-accent text-black font-black text-base uppercase tracking-widest border-4 border-black shadow-neo hover:shadow-neo-lg transition-all duration-150 block text-center"
            >
              See My Work ↓
            </a>
          </MagneticWrapper>

          <MagneticWrapper strength={40} className="w-full sm:w-auto">
            <a
              href="#contact"
              onMouseEnter={playHover}
              onClick={playClick}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-transparent text-white font-black text-base uppercase tracking-widest border-4 border-white shadow-[6px_6px_0px_rgba(255,255,255,0.3)] hover:shadow-[8px_8px_0px_rgba(255,255,255,0.4)] transition-all duration-150 block text-center"
            >
              Hire Me →
            </a>
          </MagneticWrapper>
        </motion.div>

        {/* Social Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="flex items-center gap-6 mt-8"
        >
          {[
            { icon: <FaGithub className="w-5 h-5" />, href: "https://github.com/ilhamsptr1" },
            { icon: <FaInstagram className="w-5 h-5" />, href: "https://www.instagram.com/ilhammsptra_/" },
            { icon: <FaTiktok className="w-5 h-5" />, href: "https://www.tiktok.com/@ninetofive925" },
          ].map((s, i) => (
            <MagneticWrapper key={i} strength={60} className="rounded-2xl">
              <motion.a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHover}
                onClick={playClick}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-2xl bg-white/10 border-2 border-white/30 flex items-center justify-center text-white hover:bg-accent hover:text-black hover:border-black transition-colors"
              >
                {s.icon}
              </motion.a>
            </MagneticWrapper>
          ))}
        </motion.div>

      </motion.div>

      {/* Floating Stats Card (right) */}
      <div className="absolute top-28 right-[5%] md:right-[10%] z-30 hidden md:block">
        <motion.div
          drag
          dragConstraints={{ left: -60, right: 60, top: -60, bottom: 60 }}
          initial={{ opacity: 0, x: 80, rotate: 12 }}
          animate={{ opacity: 1, x: 0, rotate: 12 }}
          transition={{ type: "spring", duration: 1.8, delay: 1 }}
          whileHover={{ scale: 1.06, rotate: 8 }}
          onHoverStart={playHover}
          className="w-48 bg-white text-black rounded-3xl border-4 border-black shadow-neo-lg p-5 cursor-grab active:cursor-grabbing"
          data-magnetic="true"
        >
          <p className="text-4xl font-black text-primary mb-1">6+</p>
          <p className="font-black uppercase text-sm tracking-widest">Projects Built</p>
          <div className="mt-3 w-full h-1.5 bg-gray-200 rounded-full">
            <div className="w-4/5 h-full bg-accent rounded-full" />
          </div>
        </motion.div>
      </div>

      {/* Floating Skill Chip (left) */}
      <div className="absolute bottom-36 left-[5%] md:left-[8%] z-30 hidden md:block">
        <motion.div
          drag
          dragConstraints={{ left: -60, right: 60, top: -60, bottom: 60 }}
          initial={{ opacity: 0, x: -80, rotate: -14 }}
          animate={{ opacity: 1, x: 0, rotate: -14 }}
          transition={{ type: "spring", duration: 1.8, delay: 1.2 }}
          whileHover={{ scale: 1.06, rotate: -10 }}
          onHoverStart={playHover}
          className="w-44 bg-accent text-black rounded-3xl border-4 border-black shadow-neo-lg p-5 cursor-grab active:cursor-grabbing"
          data-magnetic="true"
        >
          <p className="text-3xl font-black mb-1">100%</p>
          <p className="font-black uppercase text-sm tracking-widest">Passion Driven</p>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 pointer-events-none"
      >
        <span className="text-xs font-black uppercase tracking-[0.3em] text-white/70">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-3 border-white/50 flex items-start justify-center pt-1.5 border-2"
        >
          <div className="w-1.5 h-2.5 rounded-full bg-accent" />
        </motion.div>
      </motion.div>

    </section>
  );
}

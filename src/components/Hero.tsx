"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import { FaGithub, FaInstagram, FaTiktok } from "react-icons/fa";
import { useThemeSound } from "@/context/ThemeSoundContext";
import confetti from "canvas-confetti";
import MagneticWrapper from "@/components/MagneticWrapper";
import ParticleBackground from "@/components/ParticleBackground";
import Image from "next/image";
import { useIsMobile } from "@/hooks/useIsMobile";

const roles = ["Frontend Developer", "UI/UX Enthusiast", "React Specialist", "Next.js Developer"];

/* ── 3-D tilt hook ─────────────────────────────────────────────────── */
function use3DTilt(intensity = 14) {
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef<number | null>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
  const [hovering, setHovering] = useState(false);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      setTilt({ rotateX: -ny * intensity, rotateY: nx * intensity, glareX: ((e.clientX - r.left) / r.width) * 100, glareY: ((e.clientY - r.top) / r.height) * 100 });
    });
  }, [intensity]);

  const onLeave = useCallback(() => {
    if (raf.current) cancelAnimationFrame(raf.current);
    setTilt({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
    setHovering(false);
  }, []);

  return { ref, tilt, hovering, setHovering, onMove, onLeave };
}

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const isMobile = useIsMobile();
  const { scrollY } = useScroll();
  // Start fade only after 100px scroll, fully gone at 900px
  const heroYRaw = useTransform(scrollY, [0, 900], [0, -80]);
  const heroOpacity = useTransform(scrollY, [100, 900], [1, 0]);
  const { playHover, playClick } = useThemeSound();
  const photo = use3DTilt(14);

  useEffect(() => {
    const interval = setInterval(() => setRoleIndex((p) => (p + 1) % roles.length), 2200);
    return () => clearInterval(interval);
  }, []);

  const handleNameClick = () => {
    playClick();
    setClickCount((prev) => {
      const n = prev + 1;
      if (n === 3) {
        const end = Date.now() + 3000;
        const frame = () => {
          confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 }, colors: ["#ccff00", "#ffffff", "#0033ff"] });
          confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 }, colors: ["#ccff00", "#ffffff", "#0033ff"] });
          if (Date.now() < end) requestAnimationFrame(frame);
        };
        frame();
        return 0;
      }
      return n;
    });
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 md:pt-20 md:pb-0"
      style={{ overflow: "hidden" }}
    >
      {/* Particles */}
      <ParticleBackground count={90} maxDistance={140} speed={0.35} className="z-0" />

      {/* Decorative blobs */}
      <div className="absolute top-16 -right-20 w-56 h-56 bg-accent rounded-full opacity-15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 -left-20 w-72 h-72 bg-white rounded-full opacity-10 blur-3xl pointer-events-none" />

      {/* ── Main centered column ── */}
      <motion.div
        style={{ y: isMobile ? 0 : heroYRaw, opacity: heroOpacity }}
        className="container mx-auto px-6 relative z-10 flex flex-col items-center justify-center mt-20 md:mt-28"
      >

        {/* Availability Badge — centered */}
        <motion.div
          initial={{ opacity: 0, y: -30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", bounce: 0.5, duration: 1 }}
          className="mb-6 px-6 py-2.5 rounded-full border-2 border-black bg-accent shadow-neo-sm flex items-center gap-3 cursor-default"
          data-magnetic="true"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
          <span className="text-sm font-black tracking-widest text-black uppercase">Available for Freelance</span>
        </motion.div>

        {/* ── Main row: Photo LEFT + Name RIGHT (desktop) / stacked (mobile) ── */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 w-full">

          {/* 3D Photo — always shown prominently */}
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.85 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ type: "spring", bounce: 0.3, duration: 1.3, delay: 0.2 }}
            className="relative flex-shrink-0 flex items-center justify-center"
          >
            {/* Glow blob — static on mobile, animated on desktop */}
            <motion.div
              animate={isMobile ? {} : { scale: [1, 1.1, 1], opacity: [0.35, 0.6, 0.35] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full blur-2xl pointer-events-none"
              style={{ background: "var(--theme-accent)", transform: "scale(1.4)", opacity: 0.35 }}
            />

            {/* 3D tilt — disabled on mobile (no mouse) */}
            <div
              ref={isMobile ? undefined : photo.ref}
              onMouseMove={isMobile ? undefined : photo.onMove}
              onMouseLeave={isMobile ? undefined : photo.onLeave}
              onMouseEnter={isMobile ? undefined : () => photo.setHovering(true)}
              style={{ perspective: isMobile ? undefined : "900px" }}
            >
              <motion.div
                animate={isMobile ? {} : { rotateX: photo.tilt.rotateX, rotateY: photo.tilt.rotateY, scale: photo.hovering ? 1.05 : 1 }}
                transition={photo.hovering
                  ? { type: "spring", stiffness: 300, damping: 28, mass: 0.5 }
                  : { type: "spring", stiffness: 180, damping: 20 }
                }
                style={isMobile ? {} : { transformStyle: "preserve-3d", willChange: "transform" }}
              >
                {/* Float animation — disabled on mobile */}
                <motion.div
                  animate={isMobile ? {} : (photo.hovering ? {} : { y: [0, -12, 0] })}
                  transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                  className="relative"
                >
                  {/* Frame */}
                  <div
                    className="relative rounded-3xl border-4 border-black overflow-hidden shadow-[8px_8px_0px_#000]"
                    style={{ width: "clamp(180px, 22vw, 260px)", height: "clamp(230px, 28vw, 330px)" }}
                  >
                    <Image
                      src="/fotosaya.jpg"
                      alt="Ilham Saputra"
                      fill
                      priority
                      className="object-cover object-top"
                      sizes="260px"
                    />
                    <div
                      className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
                      style={{ background: "linear-gradient(to top, rgba(0,51,255,0.75) 0%, transparent 100%)" }}
                    />
                    {!isMobile && (
                      <div
                        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                        style={{
                          background: `radial-gradient(circle at ${photo.tilt.glareX}% ${photo.tilt.glareY}%, rgba(255,255,255,0.2), transparent 65%)`,
                          opacity: photo.hovering ? 1 : 0,
                        }}
                      />
                    )}
                  </div>

                  {/* Spinning star — static on mobile */}
                  <motion.div
                    animate={isMobile ? {} : { rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 7, ease: "linear" }}
                    className="absolute -top-4 -left-4 w-10 h-10 bg-white border-4 border-black rounded-full flex items-center justify-center text-base shadow-[3px_3px_0px_#000] z-10 select-none"
                  >
                    ✦
                  </motion.div>

                  {/* Open to Work badge — static on mobile */}
                  <motion.div
                    animate={isMobile ? {} : { rotate: [0, 5, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                    className="absolute -bottom-4 -right-3 bg-accent text-black text-[10px] font-black uppercase tracking-widest px-2.5 py-1.5 rounded-xl border-4 border-black shadow-[3px_3px_0px_#000] z-10 whitespace-nowrap"
                  >
                    Open to Work ✦
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Name — right of photo on desktop, below on mobile */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left select-none">
            <div className="overflow-hidden cursor-pointer" onClick={handleNameClick} onMouseEnter={playHover} data-magnetic="true">
              <motion.h1
                initial={{ y: 120, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", bounce: 0.4, duration: 1.2 }}
                className="text-[3.5rem] sm:text-[5rem] md:text-[8rem] lg:text-[10rem] font-black leading-none tracking-tighter text-accent neo-shadow-text"
              >
                ILHAM
              </motion.h1>
            </div>
            <div className="overflow-hidden -mt-2 md:-mt-4 cursor-pointer" onClick={handleNameClick} onMouseEnter={playHover} data-magnetic="true">
              <motion.h1
                initial={{ y: 120, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", bounce: 0.4, duration: 1.2, delay: 0.1 }}
                className="text-[2.8rem] sm:text-[4rem] md:text-[6.5rem] lg:text-[8rem] font-black leading-none tracking-tighter text-white neo-shadow-text"
              >
                SAPUTRA
              </motion.h1>
            </div>

            {/* Role Ticker — desktop only, sits right of photo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mt-4 h-10 md:h-14 overflow-hidden pointer-events-none hidden md:block"
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={roleIndex}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -50, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="text-lg md:text-2xl font-black text-white uppercase tracking-widest neo-shadow-text-sm"
                >
                  — {roles[roleIndex]} —
                </motion.p>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
        {/* END main row */}

        {/* Role Ticker — mobile only, below the row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-4 h-10 overflow-hidden pointer-events-none md:hidden"
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={roleIndex}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="text-sm font-black text-white uppercase tracking-widest neo-shadow-text-sm text-center"
            >
              — {roles[roleIndex]} —
            </motion.p>
          </AnimatePresence>
        </motion.div>


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
          <MagneticWrapper strength={40} className="w-full sm:w-auto">
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHover}
              onClick={playClick}
              download
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-black text-base uppercase tracking-widest border-4 border-black shadow-neo hover:shadow-neo-lg hover:-translate-y-1 transition-all duration-150 flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Download CV
            </a>
          </MagneticWrapper>
        </motion.div>

        {/* Social Row — hidden on lg+ because Sidebar already shows these icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="flex lg:hidden items-center gap-6 mt-8"
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

      {/* Floating Stats Card — only on very wide screens, pushed far right */}
      <div className="absolute top-32 right-6 z-30 hidden 2xl:block">
        <motion.div
          drag
          dragConstraints={{ left: -60, right: 60, top: -60, bottom: 60 }}
          initial={{ opacity: 0, x: 80, rotate: 12 }}
          animate={{ opacity: 1, x: 0, rotate: 12 }}
          transition={{ type: "spring", duration: 1.8, delay: 1 }}
          whileHover={{ scale: 1.06, rotate: 8 }}
          onHoverStart={playHover}
          className="w-44 bg-white text-black rounded-3xl border-4 border-black shadow-neo-lg p-5 cursor-grab active:cursor-grabbing"
        >
          <p className="text-4xl font-black text-primary mb-1">7+</p>
          <p className="font-black uppercase text-sm tracking-widest">Projects Built</p>
          <div className="mt-3 w-full h-1.5 bg-gray-200 rounded-full">
            <div className="w-4/5 h-full bg-accent rounded-full" />
          </div>
        </motion.div>
      </div>

      {/* Floating Passion Chip — only on very wide screens, pushed far left */}
      <div className="absolute bottom-40 left-6 z-30 hidden 2xl:block">
        <motion.div
          drag
          dragConstraints={{ left: -60, right: 60, top: -60, bottom: 60 }}
          initial={{ opacity: 0, x: -80, rotate: -14 }}
          animate={{ opacity: 1, x: 0, rotate: -14 }}
          transition={{ type: "spring", duration: 1.8, delay: 1.2 }}
          whileHover={{ scale: 1.06, rotate: -10 }}
          onHoverStart={playHover}
          className="w-44 bg-accent text-black rounded-3xl border-4 border-black shadow-neo-lg p-5 cursor-grab active:cursor-grabbing"
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
          className="w-6 h-10 rounded-full border-2 border-white/50 flex items-start justify-center pt-1.5"
        >
          <div className="w-1.5 h-2.5 rounded-full bg-accent" />
        </motion.div>
      </motion.div>

    </section>
  );
}

"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import { FaGithub, FaInstagram, FaTiktok } from "react-icons/fa";
import { useThemeSound } from "@/context/ThemeSoundContext";
import confetti from "canvas-confetti";
import MagneticWrapper from "@/components/MagneticWrapper";
import ParticleBackground from "@/components/ParticleBackground";
import Image from "next/image";

const roles = ["Frontend Developer", "UI/UX Enthusiast", "React Specialist", "Next.js Developer"];

/* ── 3-D tilt hook ─────────────────────────────────────────────────── */
function use3DTilt(intensity = 18) {
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
      setTilt({
        rotateX: -ny * intensity,
        rotateY: nx * intensity,
        glareX: ((e.clientX - r.left) / r.width) * 100,
        glareY: ((e.clientY - r.top) / r.height) * 100,
      });
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
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, -120]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const { playHover, playClick } = useThemeSound();
  const photo = use3DTilt(16);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  const handleNameClick = () => {
    playClick();
    setClickCount((prev) => {
      const newCount = prev + 1;
      if (newCount === 3) {
        const duration = 3000;
        const end = Date.now() + duration;
        const frame = () => {
          confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#ccff00', '#ffffff', '#0033ff', '#ff00ff', '#00ff41'] });
          confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#ccff00', '#ffffff', '#0033ff', '#ff00ff', '#00ff41'] });
          if (Date.now() < end) requestAnimationFrame(frame);
        };
        frame();
        return 0;
      }
      return newCount;
    });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-16 md:pt-20 md:pb-0" style={{ overflow: "hidden" }}>

      {/* Particle constellation background */}
      <ParticleBackground count={90} maxDistance={140} speed={0.35} className="z-0" />

      {/* Decorative Blobs */}
      <div className="absolute top-16 -right-20 w-56 h-56 bg-accent rounded-full opacity-15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 -left-20 w-72 h-72 bg-white rounded-full opacity-10 blur-3xl pointer-events-none" />

      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="container mx-auto px-6 relative z-10 flex flex-col items-center justify-center mt-16 md:mt-24"
      >
        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: -30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", bounce: 0.5, duration: 1 }}
          className="mb-8 px-6 py-2.5 rounded-full border-2 border-black bg-accent shadow-neo-sm flex items-center gap-3 cursor-default"
          data-magnetic="true"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
          <span className="text-sm font-black tracking-widest text-black uppercase">Available for Freelance</span>
        </motion.div>

        {/* ── Main two-column layout: Text + Photo ── */}
        <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">

          {/* LEFT — Typography */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left select-none relative z-20 flex-1">
            <div className="overflow-hidden cursor-pointer" onClick={handleNameClick} onMouseEnter={playHover} data-magnetic="true">
              <motion.h1
                initial={{ y: 120, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", bounce: 0.4, duration: 1.2 }}
                className="text-[3.5rem] sm:text-[5.5rem] md:text-[9rem] lg:text-[10rem] font-black leading-none tracking-tighter text-accent neo-shadow-text"
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
                className="text-[2.8rem] sm:text-[4.5rem] md:text-[7.5rem] lg:text-[8.5rem] font-black leading-none tracking-tighter text-white neo-shadow-text"
              >
                SAPUTRA
              </motion.h1>
            </div>

            {/* Role Ticker */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mt-4 h-10 md:h-14 overflow-hidden pointer-events-none"
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={roleIndex}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -50, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="text-sm sm:text-lg md:text-2xl font-black text-white uppercase tracking-widest neo-shadow-text-sm"
                >
                  — {roles[roleIndex]} —
                </motion.p>
              </AnimatePresence>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.7 }}
              className="flex flex-col sm:flex-row items-center lg:items-start gap-4 mt-8 w-full"
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
          </div>

          {/* RIGHT — 3D Photo */}
          <motion.div
            initial={{ opacity: 0, x: 80, scale: 0.85 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ type: "spring", bounce: 0.35, duration: 1.4, delay: 0.4 }}
            className="relative flex-shrink-0 flex items-center justify-center"
          >
            {/* Floating glow behind photo */}
            <motion.div
              animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute inset-0 rounded-3xl blur-2xl pointer-events-none"
              style={{ background: "var(--theme-accent)", opacity: 0.3, transform: "scale(1.1)" }}
            />

            {/* 3D Tilt Card — the photo frame */}
            <div
              ref={photo.ref}
              onMouseMove={photo.onMove}
              onMouseLeave={photo.onLeave}
              onMouseEnter={() => photo.setHovering(true)}
              style={{ perspective: "900px" }}
            >
              <motion.div
                animate={{
                  rotateX: photo.tilt.rotateX,
                  rotateY: photo.tilt.rotateY,
                  scale: photo.hovering ? 1.04 : 1,
                  /* Continuous float when not hovering */
                  y: photo.hovering ? 0 : undefined,
                }}
                transition={
                  photo.hovering
                    ? { type: "spring", stiffness: 280, damping: 28, mass: 0.5 }
                    : { type: "spring", stiffness: 200, damping: 20 }
                }
                style={{ transformStyle: "preserve-3d", willChange: "transform" }}
                className="relative"
              >
                {/* Floating animation wrapper (only when not tilting) */}
                <motion.div
                  animate={photo.hovering ? {} : { y: [0, -14, 0] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                >
                  {/* Outer neo-brutalist frame */}
                  <div
                    className="relative rounded-3xl border-4 border-black overflow-hidden shadow-[10px_10px_0px_#000]"
                    style={{
                      width: "clamp(220px, 28vw, 340px)",
                      height: "clamp(280px, 36vw, 430px)",
                    }}
                  >
                    {/* Photo */}
                    <Image
                      src="/fotosaya.jpg"
                      alt="Ilham Saputra"
                      fill
                      priority
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 240px, 340px"
                    />

                    {/* Accent color overlay at bottom */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
                      style={{
                        background: "linear-gradient(to top, rgba(0,51,255,0.7) 0%, transparent 100%)",
                      }}
                    />

                    {/* Name label inside photo */}
                    <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
                      <p className="text-white font-black text-sm uppercase tracking-widest drop-shadow-lg">
                        Ilham Saputra
                      </p>
                      <p className="text-accent text-xs font-bold uppercase tracking-wider">
                        Frontend Developer
                      </p>
                    </div>

                    {/* Specular glare layer */}
                    <div
                      className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-300"
                      style={{
                        background: `radial-gradient(circle at ${photo.tilt.glareX}% ${photo.tilt.glareY}%, rgba(255,255,255,0.22), transparent 65%)`,
                        opacity: photo.hovering ? 1 : 0,
                      }}
                    />
                  </div>

                  {/* Small accent sticker badge — bottom-right corner */}
                  <motion.div
                    animate={{ rotate: [0, 6, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="absolute -bottom-4 -right-4 bg-accent text-black text-xs font-black uppercase tracking-widest px-3 py-2 rounded-2xl border-4 border-black shadow-[4px_4px_0px_#000] z-10"
                  >
                    Open to Work ✦
                  </motion.div>

                  {/* Floating star sticker — top-left */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                    className="absolute -top-5 -left-5 w-12 h-12 bg-white border-4 border-black rounded-full flex items-center justify-center text-lg shadow-[3px_3px_0px_#000] z-10"
                  >
                    ✦
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
          {/* END RIGHT */}

        </div>
        {/* END two-column */}

      </motion.div>

      {/* Floating Stats Card (desktop only) */}
      <div className="absolute top-28 right-[3%] z-30 hidden xl:block">
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

      {/* Floating Skill Chip (desktop only) */}
      <div className="absolute bottom-36 left-[3%] z-30 hidden xl:block">
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

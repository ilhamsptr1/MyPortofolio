"use client";

import { motion, Variants } from "framer-motion";
import { Code2, Palette, Zap } from "lucide-react";
import { useThemeSound } from "@/context/ThemeSoundContext";
import GlitchText from "./GlitchText";
import DraggableWindow from "./DraggableWindow";
import CounterUp from "./CounterUp";
import TextReveal from "./TextReveal";

// ── Services ──────────────────────────────────────────────────────────────────
const services = [
  {
    number: "01",
    icon: <Code2 strokeWidth={1.75} className="w-7 h-7" />,
    title: "Development",
    description:
      "I build modern web applications with React, Next.js, and TypeScript, focusing on clean code and reliable performance.",
    bg: "bg-[#F5F5F0]",
    accentNum: false,
    offset: false,
  },
  {
    number: "02",
    icon: <Palette strokeWidth={1.75} className="w-7 h-7" />,
    title: "Design",
    description:
      "Turning ideas into clean interfaces that feel simple, intuitive, and easy to use.",
    bg: "bg-white",
    accentNum: false,
    offset: true, // pushed down on desktop — breaks the grid symmetry
  },
  {
    number: "03",
    icon: <Zap strokeWidth={1.75} className="w-7 h-7" />,
    title: "Performance",
    description:
      "Making websites feel fast, responsive, and smooth across different devices.",
    bg: "bg-[#F5F5F0]",
    accentNum: true, // lime accent on number label only
    offset: false,
  },
];

const techs = [
  "React", "Next.js", "TypeScript", "Tailwind CSS",
  "Framer Motion", "GSAP", "Node.js", "Figma", "Three.js", "Git",
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.12, ease: "easeOut" as const },
  }),
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function About() {
  const { playHover } = useThemeSound();

  return (
    <section id="about" className="py-16 md:py-28 relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">

          {/* ── Section Heading ── */}
          <h2 className="text-5xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter mb-12 md:mb-20">
            <GlitchText text="ABOUT ME" />
          </h2>

          {/* ── Bio Window ── */}
          <DraggableWindow title="C:\\USERS\\ILHAM\\BIO.TXT" className="mb-12 md:mb-16">
            <div className="bg-white text-black p-6 md:p-12">
              <p className="text-base md:text-2xl font-bold leading-relaxed">
                Saya{" "}
                <span className="text-primary inline-block hover:scale-105 transition-transform duration-200">
                  Ilham Saputra
                </span>
                , mahasiswa Informatika{" "}
                <span className="text-primary inline-block hover:scale-105 transition-transform duration-200">
                  Universitas Gunadarma
                </span>{" "}
                yang fokus pada web development dan UI. Saya senang membangun
                website dengan tampilan yang modern, clean, dan nyaman
                digunakan.{" "}
                Saya menggunakan{" "}
                <span className="bg-black text-white px-2 rounded-md -rotate-2 inline-block shadow-[2px_2px_0px_#ccff00]">
                  React
                </span>
                ,{" "}
                <span className="bg-black text-white px-2 rounded-md rotate-1 inline-block shadow-[2px_2px_0px_#ccff00]">
                  Next.js
                </span>
                ,{" "}
                <span className="bg-black text-white px-2 rounded-md -rotate-1 inline-block shadow-[2px_2px_0px_#ccff00]">
                  TypeScript
                </span>
                , dan teknologi frontend modern lainnya untuk membuat website
                yang cepat, responsif, dan memiliki pengalaman pengguna yang
                baik.
              </p>
            </div>
          </DraggableWindow>

          {/* ── What I Do — section intro ── */}
          <div className="mb-8 md:mb-12">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-[11px] font-black tracking-[0.22em] text-white/40 uppercase select-none">
                What I Do
              </span>
              <div className="flex-1 h-px bg-white/10" />
            </div>
            <p className="text-white/55 text-base font-medium max-w-md leading-relaxed">
              Building digital experiences with code, design, and performance in mind.
            </p>
          </div>

          {/* ── Service Cards ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-10 md:mb-14">
            {services.map((s, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                onHoverStart={playHover}
                // Asymmetry: middle card pushed down on desktop
                className={`
                  ${s.bg} border-4 border-black rounded-2xl
                  shadow-[6px_6px_0px_#000]
                  hover:-translate-y-2 hover:-translate-x-0.5
                  hover:shadow-[10px_10px_0px_#000]
                  transition-all duration-200 cursor-default
                  p-7 md:p-8 flex flex-col
                  ${s.offset ? "md:mt-8" : ""}
                `}
              >
                {/* Top row: number label + icon */}
                <div className="flex items-start justify-between mb-10">
                  <span
                    className={`
                      text-[10px] font-black tracking-[0.2em] uppercase leading-none
                      ${s.accentNum ? "text-accent" : "text-black/25"}
                    `}
                  >
                    {s.number}&nbsp;/&nbsp;{s.title.toUpperCase()}
                  </span>
                  <div className="text-black/70">{s.icon}</div>
                </div>

                {/* Title */}
                <h3 className="text-[1.65rem] font-black uppercase tracking-tight text-black leading-none mb-3">
                  {s.title}
                </h3>

                {/* Description — intentionally lighter weight */}
                <p className="text-black/55 text-[0.9rem] font-medium leading-relaxed mt-auto pt-4">
                  {s.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* ── Stats Strip ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 md:mb-12"
          >
            {[
              { end: 7,   suffix: "+", label: "Projects Built"   },
              { end: 2,   suffix: "+", label: "Years of Learning" },
              { end: 10,  suffix: "+", label: "Technologies"      },
              { end: 100, suffix: "%", label: "Passion Driven"    },
            ].map((stat, i) => (
              <div
                key={i}
                onMouseEnter={playHover}
                className="bg-white/10 border-4 border-black rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-[6px_6px_0px_#000] hover:-translate-y-1 hover:shadow-[8px_8px_0px_#000] transition-all duration-200"
              >
                <CounterUp
                  end={stat.end}
                  suffix={stat.suffix}
                  duration={1600}
                  className="text-4xl md:text-5xl font-black text-accent neo-shadow-text-sm"
                />
                <p className="font-black uppercase text-xs md:text-sm tracking-widest text-white mt-2">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>

          {/* ── Tech Stack ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-primary/80 rounded-2xl border-4 border-black shadow-[6px_6px_0px_#000] p-8"
          >
            <h3 className="text-2xl font-black uppercase text-accent neo-shadow-text-sm mb-2">
              Tech Stack
            </h3>
            <TextReveal
              text="Tools and technologies I use every day to build great products."
              className="text-white/60 text-sm font-medium mb-6"
              delay={0}
              stagger={0.04}
            />
            <div className="flex flex-wrap gap-3">
              {techs.map((tech, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  whileHover={{ y: -3, boxShadow: "4px 4px 0px var(--theme-shadow)" }}
                  onHoverStart={playHover}
                  className="px-5 py-2 rounded-full bg-white text-black font-black text-sm uppercase tracking-wider border-2 border-black shadow-[3px_3px_0px_var(--theme-shadow)] transition-all duration-150 cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

"use client";

import { motion, Variants } from "framer-motion";
import { Code2, Palette, Zap } from "lucide-react";
import { useThemeSound } from "@/context/ThemeSoundContext";
import SpotlightCard from "./SpotlightCard";
import GlitchText from "./GlitchText";
import DraggableWindow from "./DraggableWindow";
import CounterUp from "./CounterUp";
import TextReveal from "./TextReveal";

const skills = [
  {
    icon: <Code2 className="w-10 h-10" />,
    title: "Development",
    description: "Building scalable and performant web applications using modern frameworks like React and Next.js.",
    color: "bg-accent text-black",
  },
  {
    icon: <Palette className="w-10 h-10" />,
    title: "Design",
    description: "Creating intuitive, accessible, and pixel-perfect user interfaces with a focus on modern aesthetics.",
    color: "bg-white text-black",
  },
  {
    icon: <Zap className="w-10 h-10" />,
    title: "Performance",
    description: "Optimizing web experiences for speed, smooth animations, and high lighthouse scores.",
    color: "bg-accent text-black",
  },
];

const techs = ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP", "Node.js", "Figma", "Three.js", "Git"];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.15, ease: "easeOut" as const },
  }),
};

export default function About() {
  const { playHover } = useThemeSound();

  return (
    <section id="about" className="py-16 md:py-28 relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">

          {/* Section Heading */}
          <h2 className="text-5xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter mb-12 md:mb-20">
            <GlitchText text="ABOUT ME" />
          </h2>

          {/* Bio Card in Draggable Window */}
          <DraggableWindow title="C:\\USERS\\ILHAM\\BIO.TXT" className="mb-8 md:mb-12">
            <div className="bg-white text-black p-6 md:p-12">
              <p className="text-base md:text-2xl font-bold leading-relaxed">
                Saya <span className="text-primary inline-block hover:scale-105 transition-transform duration-200">Ilham Saputra</span>, mahasiswa Informatika{" "}
                <span className="text-primary inline-block hover:scale-105 transition-transform duration-200">Universitas Gunadarma</span> yang memiliki passion dalam menciptakan website modern dengan desain elegan, performa tinggi, dan pengalaman pengguna yang optimal. Saya mengembangkan aplikasi menggunakan <span className="bg-black text-white px-2 rounded-md -rotate-2 inline-block shadow-[2px_2px_0px_#ccff00]">React</span>, <span className="bg-black text-white px-2 rounded-md rotate-1 inline-block shadow-[2px_2px_0px_#ccff00]">Next.js</span>, <span className="bg-black text-white px-2 rounded-md -rotate-1 inline-block shadow-[2px_2px_0px_#ccff00]">TypeScript</span>, serta teknologi frontend modern lainnya. Setiap proyek yang saya bangun mengutamakan kualitas kode, estetika desain, dan pengalaman pengguna yang maksimal.
              </p>
            </div>
          </DraggableWindow>

          {/* Skill Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                whileHover={{ y: -8, boxShadow: "10px 10px 0px var(--theme-shadow)" }}
                onHoverStart={playHover}
                className={`${skill.color} rounded-3xl border-4 border-black shadow-neo transition-all duration-200 cursor-default`}
              >
                <SpotlightCard className="p-6 md:p-8 w-full h-full rounded-3xl" spotlightColor="rgba(0,0,0,0.1)">
                  <div className="mb-4">{skill.icon}</div>
                  <h3 className="text-2xl font-black uppercase mb-3">{skill.title}</h3>
                  <p className="font-medium leading-relaxed">{skill.description}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>

          {/* ── Animated Stats Strip ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 md:mb-12"
          >
            {[
              { end: 7,   suffix: "+", label: "Projects Built"    },
              { end: 2,   suffix: "+", label: "Years of Learning"  },
              { end: 10,  suffix: "+", label: "Technologies"       },
              { end: 100, suffix: "%", label: "Passion Driven"     },
            ].map((stat, i) => (
              <div
                key={i}
                onMouseEnter={playHover}
                className="bg-white/10 border-4 border-black rounded-3xl p-6 flex flex-col items-center justify-center text-center shadow-neo hover:-translate-y-1 hover:shadow-neo-lg transition-all duration-200"
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

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-primary/80 rounded-3xl border-4 border-black shadow-neo p-8"
          >
            <h3 className="text-2xl font-black uppercase text-accent neo-shadow-text-sm mb-2">Tech Stack</h3>
            <TextReveal
              text="Tools and technologies I use every day to build great products."
              className="text-white/70 text-sm font-medium mb-6"
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
                  whileHover={{ y: -3, boxShadow: "5px 5px 0px var(--theme-shadow)" }}
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


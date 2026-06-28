"use client";

import { motion, Variants } from "framer-motion";
import { Code2, Palette, Zap } from "lucide-react";
import { useThemeSound } from "@/context/ThemeSoundContext";

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
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-4xl md:text-8xl font-black uppercase text-accent neo-shadow-text mb-8 md:mb-16"
          >
            About <span className="text-white">Me</span>
          </motion.h2>

          {/* Bio Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-white text-black rounded-3xl border-4 border-black shadow-neo-lg p-6 md:p-12 mb-8 md:mb-12"
          >
            <p className="text-base md:text-2xl font-bold leading-relaxed">
              Saya <span className="text-primary">Ilham Saputra</span>, mahasiswa Informatika{" "}
              <span className="text-primary">Universitas Gunadarma</span> yang memiliki passion dalam menciptakan website modern dengan desain elegan, performa tinggi, dan pengalaman pengguna yang optimal. Saya mengembangkan aplikasi menggunakan React, Next.js, TypeScript, serta teknologi frontend modern lainnya. Setiap proyek yang saya bangun mengutamakan kualitas kode, estetika desain, dan pengalaman pengguna yang maksimal.
            </p>
          </motion.div>

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
                className={`${skill.color} rounded-3xl border-4 border-black shadow-neo p-8 transition-all duration-200 cursor-default`}
              >
                <div className="mb-4">{skill.icon}</div>
                <h3 className="text-2xl font-black uppercase mb-3">{skill.title}</h3>
                <p className="font-medium leading-relaxed">{skill.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-primary/80 rounded-3xl border-4 border-black shadow-neo p-8"
          >
            <h3 className="text-2xl font-black uppercase text-accent neo-shadow-text-sm mb-6">Tech Stack</h3>
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


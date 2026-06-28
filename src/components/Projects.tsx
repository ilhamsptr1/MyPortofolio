"use client";

import { motion, Variants } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useThemeSound } from "@/context/ThemeSoundContext";
import SpotlightCard from "./SpotlightCard";

const projects = [
  {
    title: "i-Photo Booth",
    description: "A fun and interactive web-based photo booth application with real-time filters and sharing capabilities.",
    image: "https://api.microlink.io/?url=https://i-photo-booth-chi.vercel.app/&screenshot=true&meta=false&embed=screenshot.url",
    tags: ["React", "Webcam API", "Tailwind"],
    link: "https://i-photo-booth-chi.vercel.app/",
    color: "bg-accent",
    num: "01"
  },
  {
    title: "Prediksi Bola",
    description: "A football match prediction platform with live scores and statistics.",
    image: "https://api.microlink.io/?url=https://prediksibola-two.vercel.app/&screenshot=true&meta=false&embed=screenshot.url",
    tags: ["Next.js", "API", "Sports"],
    link: "https://prediksibola-two.vercel.app/",
    color: "bg-white",
    num: "02"
  },
  {
    title: "Laporan Keuangan",
    description: "Financial reporting dashboard to manage expenses and track revenue effectively.",
    image: "https://api.microlink.io/?url=https://laporan-keuangan-ivory.vercel.app/&screenshot=true&meta=false&embed=screenshot.url",
    tags: ["React", "Dashboard", "Finance"],
    link: "https://laporan-keuangan-ivory.vercel.app/",
    color: "bg-accent",
    num: "03"
  },
  {
    title: "Aplikasi Cuaca",
    description: "Real-time weather application showing current conditions and forecasts for multiple cities.",
    image: "https://api.microlink.io/?url=https://ilhamsptr1.github.io/cuaca-1/&screenshot=true&meta=false&embed=screenshot.url",
    tags: ["JavaScript", "Weather API", "HTML/CSS"],
    link: "https://ilhamsptr1.github.io/cuaca-1/",
    color: "bg-white",
    num: "04"
  },
  {
    title: "Ultra Milk Promo",
    description: "An engaging and vibrant landing page designed for Ultra Milk promotional campaigns.",
    image: "https://api.microlink.io/?url=https://ilhamsptr1.github.io/ultramilk/&screenshot=true&meta=false&embed=screenshot.url",
    tags: ["HTML", "CSS", "Landing Page"],
    link: "https://ilhamsptr1.github.io/ultramilk/",
    color: "bg-accent",
    num: "05"
  },
  {
    title: "i-Rating",
    description: "A universal feedback and rating system widget that can be embedded in any application.",
    image: "https://api.microlink.io/?url=https://i-rating.vercel.app/&screenshot=true&meta=false&embed=screenshot.url",
    tags: ["React", "UI/UX", "Feedback"],
    link: "https://i-rating.vercel.app/",
    color: "bg-white",
    num: "06"
  }
];

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 60 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 80, damping: 18 } }
};

export default function Projects() {
  const { playHover, playClick } = useThemeSound();

  return (
    <section id="work" className="py-16 md:py-28 relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <h2 className="text-4xl md:text-8xl font-black uppercase text-accent neo-shadow-text leading-none">
              My <span className="text-white">Work</span>
            </h2>
            <p className="text-white/80 font-bold text-base md:text-lg max-w-sm">
              A selection of recent projects — each one built with care, creativity, and clean code.
            </p>
          </motion.div>

          {/* Project Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -10, rotate: index % 2 === 0 ? 1 : -1 }}
                onHoverStart={playHover}
                className={`${project.color} text-black rounded-3xl border-4 border-black shadow-neo overflow-hidden flex flex-col group hover:shadow-neo-xl transition-all duration-200 relative`}
              >
                <SpotlightCard className="w-full h-full flex flex-col" spotlightColor="rgba(0,0,0,0.1)">
                  {/* Project Screenshot */}
                  <div className="relative h-48 overflow-hidden border-b-4 border-black">
                    {/* Big number overlay */}
                    <span className="absolute top-3 left-4 text-7xl font-black opacity-10 select-none z-10 leading-none">
                      {project.num}
                    </span>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Live Demo Overlay on Hover */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={playClick}
                        className="flex items-center gap-2 bg-accent text-black font-black px-5 py-2.5 rounded-full border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-[2px_2px_0px_#000] active:shadow-none transition-all"
                      >
                        <ExternalLink className="w-4 h-4" /> OPEN SITE
                      </a>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-black uppercase tracking-tight">{project.title}</h3>
                      <span className="text-3xl font-black opacity-20 leading-none">{project.num}</span>
                    </div>
                    <p className="font-medium text-sm leading-relaxed mb-5 flex-grow opacity-80">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, ti) => (
                        <span
                          key={ti}
                          className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-black/10 border border-black/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}


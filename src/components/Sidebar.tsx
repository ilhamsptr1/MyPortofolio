"use client";

import { motion } from "framer-motion";
import { Github, Instagram, Mail } from "lucide-react";
import { FaTiktok } from "react-icons/fa";
import { useThemeSound } from "@/context/ThemeSoundContext";
import MagneticWrapper from "./MagneticWrapper";

const socialLinks = [
  { icon: <Github className="w-6 h-6" />, href: "https://github.com/ilhamsptr1", color: "blue" },
  { icon: <Instagram className="w-6 h-6" />, href: "https://www.instagram.com/ilhammsptra_/", color: "green" },
  { icon: <FaTiktok className="w-6 h-6" />, href: "https://www.tiktok.com/@ninetofive925", color: "blue" },
  { icon: <Mail className="w-6 h-6" />, href: "mailto:ilham0909saputraaa@gmail.com", color: "green" },
];

export default function Sidebar() {
  const { playHover, playClick } = useThemeSound();

  return (
    <div className="hidden lg:flex fixed left-0 top-1/2 -translate-y-1/2 z-50 flex-col gap-1">
      {socialLinks.map((link, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
        >
          <MagneticWrapper strength={20}>
            <motion.a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHover}
              onClick={playClick}
              whileHover={{ x: 5, scale: 1.05 }}
              className={`w-14 h-16 flex items-center justify-center rounded-r-xl border-y border-r border-white/50 shadow-neo transition-colors
                ${link.color === "green" 
                  ? "bg-accent text-black hover:bg-white" 
                  : "bg-primary text-white hover:bg-accent hover:text-black"
                }`}
            >
              {link.icon}
            </motion.a>
          </MagneticWrapper>
        </motion.div>
      ))}
    </div>
  );
}


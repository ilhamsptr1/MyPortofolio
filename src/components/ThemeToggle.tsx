"use client";

import { motion } from "framer-motion";
import { useThemeSound } from "@/context/ThemeSoundContext";
import { Paintbrush } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme, playHover, playClick } = useThemeSound();

  const themes = [
    { id: "blue", label: "Blue & Yellow" },
    { id: "matrix", label: "Matrix Hacker" },
    { id: "cyberpunk", label: "Cyberpunk Pink" }
  ] as const;

  const cycleTheme = () => {
    playClick();
    const currentIndex = themes.findIndex(t => t.id === theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex].id);
  };

  return (
    <motion.button
      onMouseEnter={playHover}
      onClick={cycleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-black bg-accent text-black font-black uppercase tracking-widest text-xs shadow-neo transition-colors hover:bg-white"
    >
      <Paintbrush className="w-4 h-4" />
      <span className="hidden md:inline">Theme: {theme}</span>
    </motion.button>
  );
}


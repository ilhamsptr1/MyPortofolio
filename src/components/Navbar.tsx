"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useThemeSound } from "@/context/ThemeSoundContext";
import MagneticWrapper from "./MagneticWrapper";

const navLinks = [
  { label: "Work",    href: "#work",    id: "work"    },
  { label: "About",   href: "#about",   id: "about"   },
  { label: "Contact", href: "#contact", id: "contact" },
];

export default function Navbar() {
  const { playHover, playClick } = useThemeSound();
  const [menuOpen, setMenuOpen]       = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // ── Active section via IntersectionObserver ──────────────────────────────
  useEffect(() => {
    const targets = navLinks
      .map(l => document.getElementById(l.id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry that is most visible
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) setActiveSection(visible[0].target.id);
      },
      { threshold: 0.25, rootMargin: "-72px 0px -40% 0px" }
    );

    targets.forEach(t => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  const toggleMenu = () => { playClick(); setMenuOpen(p => !p); };
  const closeMenu  = () => { playClick(); setMenuOpen(false); };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full px-5 md:px-12 z-50 pt-5">
        <div className="flex items-center justify-between w-full">

          {/* Left: Theme Toggle */}
          <ThemeToggle />

          {/* Center Pill Navigation — desktop */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="hidden md:flex items-center gap-2 px-6 py-3 rounded-full border-4 border-black bg-white shadow-neo"
          >
            {navLinks.map((link, i) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={i}
                  href={link.href}
                  onMouseEnter={playHover}
                  onClick={playClick}
                  className={`
                    px-5 py-1.5 rounded-full text-sm font-black uppercase tracking-widest
                    transition-all duration-200 border-2
                    ${isActive
                      ? "bg-accent text-black border-black shadow-[2px_2px_0px_#000]"
                      : "text-black border-transparent hover:bg-accent hover:border-black"
                    }
                  `}
                >
                  {link.label}
                </a>
              );
            })}
          </motion.div>

          {/* Right: Hire Me (desktop) + Hamburger (mobile) */}
          <div className="flex items-center gap-3">
            <MagneticWrapper strength={20}>
              <motion.a
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={playHover}
                onClick={playClick}
                href="#contact"
                className="hidden md:block px-6 py-3 rounded-full border-4 border-black text-white font-black uppercase tracking-widest bg-primary shadow-neo transition-colors hover:bg-accent hover:text-black"
              >
                Hire me
              </motion.a>
            </MagneticWrapper>

            {/* Hamburger — mobile */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleMenu}
              className="md:hidden w-12 h-12 rounded-2xl border-4 border-black bg-white text-black flex items-center justify-center shadow-neo"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-40 md:hidden flex flex-col"
            style={{ backgroundColor: "var(--theme-bg)" }}
          >
            <div className="flex-1 flex flex-col items-center justify-center gap-6 px-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={i}
                  href={link.href}
                  onClick={closeMenu}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="text-5xl font-black uppercase tracking-tighter w-full text-center py-4 border-b-2 border-white/20 last:border-0 active:opacity-70"
                >
                  <span style={{ color: activeSection === link.id ? "var(--theme-accent)" : "white" }}>
                    {link.label}
                  </span>
                </motion.a>
              ))}

              <motion.a
                href="#contact"
                onClick={closeMenu}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-6 w-full py-5 rounded-2xl font-black uppercase tracking-widest text-black text-xl text-center border-4 border-black shadow-neo"
                style={{ backgroundColor: "var(--theme-accent)" }}
              >
                Hire Me →
              </motion.a>
            </div>

            <div className="py-10 text-center">
              <button
                onClick={closeMenu}
                className="text-white/50 font-bold text-sm uppercase tracking-widest"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

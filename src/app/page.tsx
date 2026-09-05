"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ThemeSoundProvider } from "@/context/ThemeSoundContext";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import BackToTop from "@/components/BackToTop";

const CursorTrail = dynamic(() => import("@/components/CursorTrail"), { ssr: false });
const Sidebar     = dynamic(() => import("@/components/Sidebar"),     { ssr: false });
const Navbar      = dynamic(() => import("@/components/Navbar"),      { ssr: false });
const Hero        = dynamic(() => import("@/components/Hero"),        { ssr: false });
const Marquee     = dynamic(() => import("@/components/Marquee"),     { ssr: false });

import About       from "@/components/About";
import Projects    from "@/components/Projects";
import Contact     from "@/components/Contact";
import NoiseOverlay from "@/components/NoiseOverlay";

export default function Home() {
  return (
    <ThemeSoundProvider>
      <ScrollProgressBar />
      <NoiseOverlay />

      {/* Page fade-in on load */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <main className="relative w-full min-h-screen bg-grid">
          {/* Global Overlays */}
          <CursorTrail />
          <Navbar />
          <Sidebar />

          {/* Page Content */}
          <div className="relative z-10 flex flex-col">
            <Hero />
            <Marquee />
            <About />
            <Projects />
            <Contact />
          </div>
        </main>
      </motion.div>

      {/* Sticky Back to Top button */}
      <BackToTop />
    </ThemeSoundProvider>
  );
}

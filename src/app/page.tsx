"use client";

import dynamic from "next/dynamic";
import { ThemeSoundProvider } from "@/context/ThemeSoundContext";
import Preloader from "@/components/Preloader";

const CursorTrail = dynamic(() => import("@/components/CursorTrail"), { ssr: false });
const Sidebar = dynamic(() => import("@/components/Sidebar"), { ssr: false });
const Navbar = dynamic(() => import("@/components/Navbar"), { ssr: false });
const Hero = dynamic(() => import("@/components/Hero"), { ssr: false });
const Marquee = dynamic(() => import("@/components/Marquee"), { ssr: false });

import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <ThemeSoundProvider>
      <Preloader />
      <main className="relative w-full min-h-screen bg-grid">
        {/* Global Overlays */}
        <CursorTrail />
        <Navbar />
        <Sidebar />

        {/* Page Content Layer */}
        <div className="relative z-10 flex flex-col">
          <Hero />
          <Marquee />
          <About />
          <Projects />
          <Contact />
        </div>
      </main>
    </ThemeSoundProvider>
  );
}


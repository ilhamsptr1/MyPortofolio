"use client";

import { FaGithub, FaInstagram, FaTiktok } from "react-icons/fa";
import { useThemeSound } from "@/context/ThemeSoundContext";

const links = [
  { label: "Work",    href: "#work"    },
  { label: "About",  href: "#about"   },
  { label: "Contact", href: "#contact" },
];

const socials = [
  { icon: FaGithub,    href: "https://github.com/ilhamsptr1",               label: "GitHub"    },
  { icon: FaInstagram, href: "https://www.instagram.com/ilhammsptra_/",      label: "Instagram" },
  { icon: FaTiktok,    href: "https://www.tiktok.com/@ninetofive925",        label: "TikTok"    },
];

export default function Footer() {
  const { playHover, playClick } = useThemeSound();
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t-4 border-black bg-black/20 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-10 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">

          {/* Left — Brand */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <span className="text-2xl font-black text-white tracking-tighter">
              ILHAM<span className="text-accent">.</span>
            </span>
            <p className="text-white/50 text-sm font-medium max-w-xs text-center md:text-left">
              Frontend Developer — building modern, clean, and fast web experiences.
            </p>
          </div>

          {/* Center — Quick Links */}
          <nav className="flex items-center gap-1 flex-wrap justify-center" aria-label="Footer navigation">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onMouseEnter={playHover}
                onClick={playClick}
                className="px-4 py-2 text-sm font-black uppercase tracking-widest text-white/70 hover:text-accent transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Right — Socials */}
          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                onMouseEnter={playHover}
                onClick={playClick}
                className="w-10 h-10 rounded-xl bg-white/10 border-2 border-white/20 flex items-center justify-center text-white hover:bg-accent hover:text-black hover:border-black transition-all duration-150"
              >
                <s.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/40 text-xs font-medium">
            © {year} Ilham Saputra. All rights reserved.
          </p>
          <p className="text-white/30 text-xs font-medium">
            Built with Next.js · TypeScript · Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MapPin, ArrowRight } from "lucide-react";
import { useThemeSound } from "@/context/ThemeSoundContext";
import GlitchText from "./GlitchText";
import DraggableWindow from "./DraggableWindow";
import MagneticWrapper from "./MagneticWrapper";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { playHover, playClick } = useThemeSound();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    playClick();
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="pt-16 md:pt-28 relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">

          {/* Section Heading */}
          <h2 className="text-6xl sm:text-7xl md:text-[8rem] leading-[0.85] font-black uppercase tracking-tighter mb-16 md:mb-24">
            <GlitchText text="LET'S" /><br />
            <GlitchText text="TALK" delay={0.2} />
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">

            {/* Left Info Cards */}
            <div className="flex flex-col gap-6">
              <div
                onMouseEnter={playHover}
                className="bg-accent text-black rounded-3xl border-4 border-black shadow-neo p-6 flex items-start gap-4 hover:-translate-y-1 hover:shadow-neo-lg transition-all duration-200"
              >
                <div className="p-3 rounded-2xl bg-black/10 shrink-0">
                  <Mail className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-lg font-black uppercase mb-1">Email</h3>
                  <a href="mailto:ilham0909saputraaa@gmail.com" className="font-bold break-all text-sm hover:underline">
                    ilham0909saputraaa@gmail.com
                  </a>
                </div>
              </div>

              <div
                onMouseEnter={playHover}
                className="bg-white text-black rounded-3xl border-4 border-black shadow-neo p-6 flex items-start gap-4 hover:-translate-y-1 hover:shadow-neo-lg transition-all duration-200"
              >
                <div className="p-3 rounded-2xl bg-primary/10 shrink-0">
                  <MapPin className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-black uppercase mb-1">Location</h3>
                  <p className="font-bold text-sm">Indonesia 🇮🇩 — Available Remote / Worldwide</p>
                </div>
              </div>

              {/* Availability Badge */}
              <div
                onMouseEnter={playHover}
                className="bg-primary text-white rounded-3xl border-4 border-black shadow-neo p-6 hover:-translate-y-1 hover:shadow-neo-lg transition-all duration-200"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 rounded-full bg-accent animate-pulse" />
                  <span className="font-black uppercase text-accent">Available Now</span>
                </div>
                <p className="font-bold text-white/90 text-sm">
                  I&apos;m currently open for freelance projects, collaborations, and full-time opportunities. Let&apos;s create something amazing!
                </p>
              </div>
            </div>

            {/* Right Contact Form */}
            <div className="relative z-10 w-full md:col-span-1">
              <DraggableWindow title="C:\\SYSTEM\\CONTACT.EXE" className="w-full">
                <div className="bg-white text-black p-6 md:p-8 flex flex-col gap-5">
                  {submitted ? (
                    <div className="flex flex-col items-center justify-center text-center p-8 min-h-[300px]">
                      <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center border-4 border-black shadow-neo mb-6">
                        <Send className="w-8 h-8 text-black" />
                      </div>
                      <h3 className="text-3xl font-black uppercase mb-2 text-black">Message Sent!</h3>
                      <p className="font-bold text-black/70">I&apos;ll get back to you as soon as possible.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                      <div className="grid md:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-2">
                          <label htmlFor="name" className="text-sm font-black uppercase tracking-wider">Name</label>
                          <input
                            type="text"
                            id="name"
                            required
                            className="bg-transparent border-4 border-black p-4 font-bold focus:outline-none focus:shadow-[4px_4px_0px_var(--theme-primary)] transition-shadow placeholder:text-black/30"
                            placeholder="John Doe"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label htmlFor="email" className="text-sm font-black uppercase tracking-wider">Email</label>
                          <input
                            type="email"
                            id="email"
                            required
                            className="bg-transparent border-4 border-black p-4 font-bold focus:outline-none focus:shadow-[4px_4px_0px_var(--theme-primary)] transition-shadow placeholder:text-black/30"
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="message" className="text-sm font-black uppercase tracking-wider">Message</label>
                        <textarea
                          id="message"
                          required
                          rows={4}
                          className="bg-transparent border-4 border-black p-4 font-bold focus:outline-none focus:shadow-[4px_4px_0px_var(--theme-primary)] transition-shadow resize-none placeholder:text-black/30"
                          placeholder="Tell me about your project..."
                        />
                      </div>

                      <MagneticWrapper className="w-full">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          onMouseEnter={playHover}
                          className="w-full bg-primary text-white border-4 border-black shadow-neo p-4 font-black uppercase tracking-widest text-lg hover:-translate-y-1 hover:shadow-neo-lg active:translate-y-1 active:shadow-none transition-all disabled:opacity-70 disabled:cursor-wait flex items-center justify-center gap-3"
                        >
                          {isSubmitting ? "Sending..." : "Send Message"}
                          <ArrowRight className="w-5 h-5" />
                        </button>
                      </MagneticWrapper>
                    </form>
                  )}
                </div>
              </DraggableWindow>
            </div>

          </div>{/* end grid */}
        </div>{/* end max-w-6xl */}
      </div>{/* end container */}

      {/* Footer */}
      <div className="mt-20 border-t-4 border-black bg-black text-white">
        <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-black uppercase tracking-widest text-sm">
            © 2026 <span className="text-accent">Ilham Saputra</span>
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-black uppercase tracking-widest text-white/70">Available for Freelance</span>
          </div>
        </div>
      </div>
    </section>
  );
}


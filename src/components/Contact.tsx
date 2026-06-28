"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MapPin } from "lucide-react";
import { useThemeSound } from "@/context/ThemeSoundContext";
import MagneticWrapper from "./MagneticWrapper";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const { playHover, playClick } = useThemeSound();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playClick(); // Play click sound on submit
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="pt-16 md:pt-28 relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">

          {/* Section Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-8xl font-black uppercase text-accent neo-shadow-text mb-8 md:mb-16"
          >
            Let&apos;s <span className="text-white">Talk</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8">

            {/* Left Info Cards */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="md:col-span-2 flex flex-col gap-6"
            >
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
            </motion.div>

            {/* Right Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="md:col-span-3"
            >
              <form
                onSubmit={handleSubmit}
                className="bg-white text-black rounded-3xl border-4 border-black shadow-neo-lg p-8 flex flex-col gap-5"
              >
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-sm font-black uppercase tracking-wider">Name</label>
                    <input
                      type="text"
                      id="name"
                      required
                      className="border-3 border-black rounded-2xl px-4 py-3 font-bold focus:outline-none focus:ring-4 focus:ring-[var(--theme-accent)] transition-all bg-white placeholder:text-gray-400 border-2"
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm font-black uppercase tracking-wider">Email</label>
                    <input
                      type="email"
                      id="email"
                      required
                      className="border-2 border-black rounded-2xl px-4 py-3 font-bold focus:outline-none focus:ring-4 focus:ring-[var(--theme-accent)] transition-all bg-white placeholder:text-gray-400"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="subject" className="text-sm font-black uppercase tracking-wider">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    required
                    className="border-2 border-black rounded-2xl px-4 py-3 font-bold focus:outline-none focus:ring-4 focus:ring-[var(--theme-accent)] transition-all bg-white placeholder:text-gray-400"
                    placeholder="Project Collaboration / Freelance / etc."
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-sm font-black uppercase tracking-wider">Message</label>
                  <textarea
                    id="message"
                    rows={5}
                    required
                    className="border-2 border-black rounded-2xl px-4 py-3 font-bold focus:outline-none focus:ring-4 focus:ring-[var(--theme-accent)] transition-all resize-none bg-white placeholder:text-gray-400"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <MagneticWrapper strength={20} className="w-full">
                  <motion.button
                    type="submit"
                    onMouseEnter={playHover}
                    whileHover={{ y: -3 }}
                    whileTap={{ y: 2, boxShadow: "2px 2px 0px var(--theme-shadow)" }}
                    className="w-full py-4 rounded-2xl bg-accent text-black font-black uppercase tracking-widest text-lg border-4 border-black shadow-neo flex items-center justify-center gap-3 transition-all duration-150"
                  >
                    {submitted ? "Message Sent! ✓" : (
                      <>Send Message <Send className="w-5 h-5" /></>
                    )}
                  </motion.button>
                </MagneticWrapper>
              </form>
            </motion.div>

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


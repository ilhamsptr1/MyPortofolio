"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MapPin, ArrowRight, CheckCircle, AlertCircle } from "lucide-react";
import { useThemeSound } from "@/context/ThemeSoundContext";
import GlitchText from "./GlitchText";
import DraggableWindow from "./DraggableWindow";
import MagneticWrapper from "./MagneticWrapper";
import TextReveal from "./TextReveal";
import emailjs from "@emailjs/browser";

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<FormStatus>("idle");
  const { playHover, playClick } = useThemeSound();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus("submitting");
    playClick();

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setStatus("success");
      formRef.current.reset();
      // Reset back to idle after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact" className="pt-16 md:pt-28 relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">

          {/* Section Heading */}
          <h2 className="text-6xl sm:text-7xl md:text-[8rem] leading-[0.85] font-black uppercase tracking-tighter mb-8">
            <GlitchText text="LET'S" /><br />
            <GlitchText text="TALK" delay={0.2} />
          </h2>
          <TextReveal
            text="Have a project in mind? Let's build something amazing together."
            className="text-white/70 text-lg md:text-xl font-medium mb-16 md:mb-24 max-w-xl"
            delay={0.3}
            stagger={0.05}
          />

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

                  {/* Success State */}
                  {status === "success" && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center text-center p-8 min-h-[300px]"
                    >
                      <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center border-4 border-black shadow-neo mb-6">
                        <CheckCircle className="w-8 h-8 text-black" />
                      </div>
                      <h3 className="text-3xl font-black uppercase mb-2 text-black">Message Sent!</h3>
                      <p className="font-bold text-black/70">Pesan sudah masuk ke email saya. Saya akan balas secepatnya!</p>
                    </motion.div>
                  )}

                  {/* Error State */}
                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center text-center p-8 min-h-[300px]"
                    >
                      <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center border-4 border-black shadow-neo mb-6">
                        <AlertCircle className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-black uppercase mb-2 text-black">Gagal Terkirim</h3>
                      <p className="font-bold text-black/70 text-sm">Coba lagi atau langsung email ke ilham0909saputraaa@gmail.com</p>
                    </motion.div>
                  )}

                  {/* Form */}
                  {(status === "idle" || status === "submitting") && (
                    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
                      <div className="grid md:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-2">
                          <label htmlFor="name" className="text-sm font-black uppercase tracking-wider">Name</label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            disabled={status === "submitting"}
                            className="bg-transparent border-4 border-black p-4 font-bold focus:outline-none focus:shadow-[4px_4px_0px_var(--theme-primary)] transition-shadow placeholder:text-black/30 disabled:opacity-50"
                            placeholder="John Doe"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label htmlFor="email" className="text-sm font-black uppercase tracking-wider">Email</label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            disabled={status === "submitting"}
                            className="bg-transparent border-4 border-black p-4 font-bold focus:outline-none focus:shadow-[4px_4px_0px_var(--theme-primary)] transition-shadow placeholder:text-black/30 disabled:opacity-50"
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="message" className="text-sm font-black uppercase tracking-wider">Message</label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={4}
                          disabled={status === "submitting"}
                          className="bg-transparent border-4 border-black p-4 font-bold focus:outline-none focus:shadow-[4px_4px_0px_var(--theme-primary)] transition-shadow resize-none placeholder:text-black/30 disabled:opacity-50"
                          placeholder="Tell me about your project..."
                        />
                      </div>

                      <MagneticWrapper className="w-full">
                        <button
                          type="submit"
                          disabled={status === "submitting"}
                          onMouseEnter={playHover}
                          className="w-full bg-primary text-white border-4 border-black shadow-neo p-4 font-black uppercase tracking-widest text-lg hover:-translate-y-1 hover:shadow-neo-lg active:translate-y-1 active:shadow-none transition-all disabled:opacity-70 disabled:cursor-wait flex items-center justify-center gap-3"
                        >
                          {status === "submitting" ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                className="w-5 h-5 border-3 border-white border-t-transparent rounded-full"
                                style={{ borderWidth: "3px" }}
                              />
                              Sending...
                            </>
                          ) : (
                            <>
                              Send Message
                              <ArrowRight className="w-5 h-5" />
                            </>
                          )}
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

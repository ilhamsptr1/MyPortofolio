"use client";

import { useEffect, useRef } from "react";

interface ParticleBackgroundProps {
  count?: number;
  maxDistance?: number;
  speed?: number;
  className?: string;
}

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
  opacity: number;
  pulse: number;
}

export default function ParticleBackground({
  count = 80,
  maxDistance = 130,
  speed = 0.4,
  className = "",
}: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // ── Skip on reduced-motion preference (accessibility) ──
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // ── Skip on touch-only devices (saves battery + avoids jank) ──
    const isTouchOnly =
      window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    if (isTouchOnly) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Reduce particle count on smaller screens
    const isSmallScreen = window.innerWidth < 768;
    const particleCount = isSmallScreen ? Math.floor(count * 0.4) : count;
    const lineDistance  = isSmallScreen ? 0 : maxDistance; // skip lines on small

    let W = 0, H = 0;
    let particles: Particle[] = [];
    let raf: number;
    let mouse = { x: -9999, y: -9999 };

    // ── Cache CSS var — read once per theme change, NOT every frame ──
    const hexToRgb = (hex: string): [number, number, number] => {
      const clean = hex.replace("#", "");
      const int = parseInt(clean, 16);
      return [(int >> 16) & 255, (int >> 8) & 255, int & 255];
    };

    let accentRgb: [number, number, number] = [204, 255, 0]; // fallback lime
    const refreshAccent = () => {
      const raw = getComputedStyle(document.documentElement)
        .getPropertyValue("--theme-accent")
        .trim();
      accentRgb = hexToRgb(raw || "#ccff00");
    };
    refreshAccent();

    // Refresh accent when theme changes (MutationObserver on <html> style/class)
    const mo = new MutationObserver(refreshAccent);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "style"] });

    /* ── resize ── */
    const resize = () => {
      const parent = canvas.parentElement;
      W = canvas.width  = parent ? parent.clientWidth  : window.innerWidth;
      H = canvas.height = parent ? parent.clientHeight : window.innerHeight;
    };

    /* ── init particles ── */
    const init = () => {
      particles = Array.from({ length: particleCount }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        r: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        pulse: Math.random() * Math.PI * 2,
      }));
    };

    /* ── draw loop ── */
    let frame = 0;
    const draw = () => {
      raf = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, W, H);
      frame++;

      const [r, g, b] = accentRgb;

      // Update + draw particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10;
        if (p.y > H + 10) p.y = -10;

        // Mouse repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          const force = ((100 - dist) / 100) * 0.5;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        p.vx *= 0.99;
        p.vy *= 0.99;
        const spd = Math.hypot(p.vx, p.vy);
        if (spd < speed * 0.3) {
          p.vx += (Math.random() - 0.5) * speed * 0.1;
          p.vy += (Math.random() - 0.5) * speed * 0.1;
        }

        const alpha = p.opacity * (0.7 + 0.3 * Math.sin(frame * 0.02 + p.pulse));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.fill();
      }

      // Connecting lines — skipped on small screens (too many draw calls)
      if (lineDistance > 0) {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const a = particles[i];
            const bP = particles[j];
            const dx = a.x - bP.x;
            const dy = a.y - bP.y;
            const d = Math.hypot(dx, dy);
            if (d < lineDistance) {
              const lineAlpha = (1 - d / lineDistance) * 0.2;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(bP.x, bP.y);
              ctx.strokeStyle = `rgba(${r},${g},${b},${lineAlpha})`;
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }
        }
      }
    };

    /* ── mouse track ── */
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMouseLeave = () => { mouse = { x: -9999, y: -9999 }; };

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.parentElement?.addEventListener("mouseleave", onMouseLeave);

    const ro = new ResizeObserver(() => { resize(); init(); });
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    resize();
    init();
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.parentElement?.removeEventListener("mouseleave", onMouseLeave);
      ro.disconnect();
      mo.disconnect();
    };
  }, [count, maxDistance, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}

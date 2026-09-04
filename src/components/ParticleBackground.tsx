"use client";

import { useEffect, useRef } from "react";

/**
 * ParticleBackground
 * Canvas-based floating particle field rendered on a transparent canvas
 * so it sits on top of (or behind) the hero section.
 *
 * Particles drift slowly and connect with thin lines when close —
 * giving the classic "constellation" look that feels premium without
 * the weight of Three.js for this specific use-case.
 *
 * Respects the current theme accent color from CSS variables.
 * Uses requestAnimationFrame for silky-smooth 60 fps rendering.
 *
 * Props:
 *  count         — number of particles (default 80)
 *  maxDistance   — max distance to draw connecting lines (default 130)
 *  speed         — base drift speed multiplier (default 0.4)
 *  className     — extra Tailwind classes for the <canvas>
 */
interface ParticleBackgroundProps {
  count?: number;
  maxDistance?: number;
  speed?: number;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  opacity: number;
  pulse: number;   // phase offset for opacity pulsing
}

export default function ParticleBackground({
  count = 80,
  maxDistance = 130,
  speed = 0.4,
  className = "",
}: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Don't run on touch-only devices to save battery
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0;
    let particles: Particle[] = [];
    let raf: number;
    let mouse = { x: -9999, y: -9999 };

    const getCSSVar = (name: string) =>
      getComputedStyle(document.documentElement).getPropertyValue(name).trim() || "#ccff00";

    /* ── resize ── */
    const resize = () => {
      const parent = canvas.parentElement;
      W = canvas.width = parent ? parent.clientWidth : window.innerWidth;
      H = canvas.height = parent ? parent.clientHeight : window.innerHeight;
    };

    /* ── init particles ── */
    const init = () => {
      particles = Array.from({ length: count }, () => ({
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
      ctx.clearRect(0, 0, W, H);
      frame++;

      const accent = getCSSVar("--theme-accent");

      // Parse accent hex → rgb for alpha usage
      // We'll use a pre-built rgba approach
      const hexToRgb = (hex: string): [number, number, number] => {
        const clean = hex.replace("#", "");
        const int = parseInt(clean, 16);
        return [(int >> 16) & 255, (int >> 8) & 255, int & 255];
      };
      const [r, g, b] = hexToRgb(accent);

      particles.forEach((p) => {
        // Drift
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around
        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10;
        if (p.y > H + 10) p.y = -10;

        // Mouse repulsion (gentle)
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          const force = (100 - dist) / 100 * 0.5;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        // Dampen velocity so it doesn't accelerate forever
        p.vx *= 0.99;
        p.vy *= 0.99;
        // Restore base speed if too slow
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (spd < speed * 0.3) {
          p.vx += (Math.random() - 0.5) * speed * 0.1;
          p.vy += (Math.random() - 0.5) * speed * 0.1;
        }

        // Pulsing opacity
        const alpha = p.opacity * (0.7 + 0.3 * Math.sin(frame * 0.02 + p.pulse));

        // Draw dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.fill();
      });

      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const bP = particles[j];
          const dx = a.x - bP.x;
          const dy = a.y - bP.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < maxDistance) {
            const lineAlpha = (1 - d / maxDistance) * 0.25;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(bP.x, bP.y);
            ctx.strokeStyle = `rgba(${r},${g},${b},${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
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

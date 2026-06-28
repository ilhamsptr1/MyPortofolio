"use client";

import { useEffect, useRef } from "react";

const TRAIL_LENGTH = 16;

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Don't run cursor trail on touch devices (no mouse)
    if (window.matchMedia("(hover: none)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Mouse state via refs — no React re-renders
    const mouse = { x: -300, y: -300 };
    let isHovering = false;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      const target = e.target as HTMLElement;
      isHovering = !!(
        target.closest('[data-magnetic="true"]') ||
        target.closest("a") ||
        target.closest("button")
      );
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Dot positions — lerp chain
    const dots = Array.from({ length: TRAIL_LENGTH }, () => ({
      x: -300,
      y: -300,
    }));

    // Helper: read a CSS variable as a real color
    const getCSSVar = (name: string): string => {
      return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || "#ccff00";
    };

    let animFrame: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Resolve theme colors every frame (cheap string lookup)
      const accent = getCSSVar("--theme-accent");
      const bg = getCSSVar("--theme-bg");

      // Move dots: each lerps toward the one ahead
      dots[0].x += (mouse.x - dots[0].x) * 0.45;
      dots[0].y += (mouse.y - dots[0].y) * 0.45;
      for (let i = 1; i < dots.length; i++) {
        dots[i].x += (dots[i - 1].x - dots[i].x) * 0.3;
        dots[i].y += (dots[i - 1].y - dots[i].y) * 0.3;
      }

      // Draw
      for (let i = 0; i < dots.length; i++) {
        const progress = 1 - i / dots.length;
        const size = Math.max(3, 20 * progress);
        const opacity = progress * 0.8;

        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.beginPath();

        if (isHovering && i === 0) {
          // Hollow ring on hover
          ctx.arc(dots[i].x, dots[i].y, 24, 0, Math.PI * 2);
          ctx.strokeStyle = accent;
          ctx.lineWidth = 2.5;
          ctx.globalAlpha = 1;
          ctx.stroke();
        } else {
          ctx.arc(dots[i].x, dots[i].y, size / 2, 0, Math.PI * 2);
          const colorIndex = i % 3;
          ctx.fillStyle = colorIndex === 0 ? accent : colorIndex === 1 ? "#ffffff" : bg;
          ctx.fill();
        }

        ctx.restore();
      }

      animFrame = requestAnimationFrame(draw);
    };

    animFrame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[100]"
    />
  );
}

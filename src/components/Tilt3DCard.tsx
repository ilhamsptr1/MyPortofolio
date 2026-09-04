"use client";

import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

/**
 * Tilt3DCard
 * Wraps any children in a card that rotates in 3-D following the mouse.
 * Uses CSS perspective + transform so it is entirely GPU-accelerated.
 *
 * Props:
 *  className      — extra classes for the outer wrapper
 *  intensity      — max tilt angle in degrees (default 15)
 *  glare          — show a specular glare highlight (default true)
 *  glareOpacity   — max opacity of glare (default 0.25)
 *  scale          — scale on hover (default 1.04)
 */
interface Tilt3DCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  glare?: boolean;
  glareOpacity?: number;
  scale?: number;
}

export default function Tilt3DCard({
  children,
  className = "",
  intensity = 15,
  glare = true,
  glareOpacity = 0.25,
  scale = 1.04,
}: Tilt3DCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);
  const rafRef = useRef<number | null>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (!card) return;

      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      rafRef.current = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        // Normalise to -0.5 … +0.5
        const nx = (e.clientX - rect.left) / rect.width - 0.5;
        const ny = (e.clientY - rect.top) / rect.height - 0.5;

        setTransform({
          rotateX: -ny * intensity,   // invert Y so it feels natural
          rotateY: nx * intensity,
        });
        setGlarePos({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      });
    },
    [intensity]
  );

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setTransform({ rotateX: 0, rotateY: 0 });
    setIsHovering(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative ${className}`}
      style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      <motion.div
        animate={{
          rotateX: transform.rotateX,
          rotateY: transform.rotateY,
          scale: isHovering ? scale : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          mass: 0.5,
        }}
        style={{ transformStyle: "preserve-3d", willChange: "transform" }}
        className="w-full h-full"
      >
        {children}

        {/* Glare layer */}
        {glare && (
          <div
            className="absolute inset-0 rounded-[inherit] pointer-events-none overflow-hidden"
            style={{ borderRadius: "inherit" }}
          >
            <div
              className="absolute inset-0 transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,${glareOpacity}), transparent 60%)`,
                opacity: isHovering ? 1 : 0,
              }}
            />
          </div>
        )}
      </motion.div>
    </div>
  );
}

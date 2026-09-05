"use client";

import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useIsTouch } from "@/hooks/useIsMobile";

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
  const isTouch = useIsTouch();
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
        const nx = (e.clientX - rect.left) / rect.width - 0.5;
        const ny = (e.clientY - rect.top) / rect.height - 0.5;
        setTransform({ rotateX: -ny * intensity, rotateY: nx * intensity });
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

  const handleMouseEnter = useCallback(() => setIsHovering(true), []);

  // ── Mobile / touch: render plain wrapper — no 3D, no willChange, no GPU layers ──
  if (isTouch) {
    return (
      <div className={`relative ${className}`}>
        {children}
      </div>
    );
  }

  // ── Desktop: full 3D tilt with mouse tracking ──
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
        transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.5 }}
        style={{ transformStyle: "preserve-3d", willChange: "transform" }}
        className="w-full h-full"
      >
        {children}

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

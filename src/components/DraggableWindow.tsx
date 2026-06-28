"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

interface DraggableWindowProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function DraggableWindow({ title, children, className = "" }: DraggableWindowProps) {
  const windowRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches || window.matchMedia("(pointer: coarse)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <motion.div
      ref={windowRef}
      drag={!isMobile} // Disable drag on mobile to prevent scroll issues
      dragConstraints={{ left: -100, right: 100, top: -50, bottom: 50 }}
      dragElastic={0.1}
      whileDrag={{ scale: 1.02, cursor: "grabbing" }}
      className={`bg-white border-4 border-black shadow-neo rounded-xl overflow-hidden flex flex-col ${isMobile ? "" : "cursor-grab active:cursor-grabbing"} ${className}`}
    >
      {/* Title Bar */}
      <div className="bg-black text-white px-4 py-2 flex items-center justify-between border-b-4 border-black select-none">
        <span className="font-bold tracking-widest uppercase text-sm">{title}</span>
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500 border-2 border-white/20"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400 border-2 border-white/20"></div>
          <div className="w-3 h-3 rounded-full bg-green-500 border-2 border-white/20"></div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-0 flex-grow pointer-events-auto">
        {children}
      </div>
    </motion.div>
  );
}

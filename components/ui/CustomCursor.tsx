"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isProjectHovered, setIsProjectHovered] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for cursor follow
  const springX = useSpring(mouseX, { stiffness: 450, damping: 28 });
  const springY = useSpring(mouseY, { stiffness: 450, damping: 28 });

  useEffect(() => {
    // Only enable on desktop pointer devices
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    document.body.classList.add("has-custom-cursor");

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const projectEl = target.closest('[data-cursor="project"]');
      const interactiveEl = target.closest('a, button, [role="button"], input, textarea, select');

      if (projectEl) {
        setIsProjectHovered(true);
        setIsHovered(true);
        setCursorText("VIEW →");
      } else if (interactiveEl) {
        setIsHovered(true);
        setIsProjectHovered(false);
        setCursorText("");
      } else {
        setIsHovered(false);
        setIsProjectHovered(false);
        setCursorText("");
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Outer follow element / View text banner */}
      <motion.div
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className={`fixed flex items-center justify-center rounded-full transition-colors duration-200 pointer-events-none ${
          isProjectHovered
            ? "w-24 h-24 bg-violet-600/90 text-white text-[11px] font-mono font-bold tracking-wider shadow-[0_0_30px_rgba(139,92,246,0.6)] backdrop-blur-md"
            : isHovered
            ? "w-10 h-10 border border-cyan-400/60 bg-cyan-500/10 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
            : "w-3 h-3 bg-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.8)]"
        }`}
      >
        {isProjectHovered && (
          <span className="select-none animate-pulse">{cursorText}</span>
        )}
      </motion.div>
    </div>
  );
};

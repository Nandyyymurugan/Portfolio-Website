"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost" | "accent";
  size?: "sm" | "md" | "lg";
  asLink?: boolean;
  href?: string;
  download?: boolean | string;
  target?: string;
  rel?: string;
  ariaLabel?: string;
  disabled?: boolean;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = "",
  onClick,
  variant = "primary",
  size = "md",
  asLink = false,
  href = "#",
  download,
  target,
  rel,
  ariaLabel,
  disabled = false,
}) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const reducedMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || disabled || !buttonRef.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = buttonRef.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const sizeStyles = {
    sm: "px-4 py-2 text-xs font-medium rounded-lg gap-2",
    md: "px-5 py-2.5 text-sm font-medium rounded-xl gap-2.5",
    lg: "px-7 py-3.5 text-base font-semibold rounded-xl gap-3",
  };

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 text-white shadow-[0_0_20px_-3px_rgba(79,70,229,0.5)] hover:shadow-[0_0_28px_0_rgba(6,182,212,0.6)] border border-white/20 hover:scale-[1.02]",
    secondary:
      "bg-slate-800/80 hover:bg-slate-700/80 text-white border border-white/10 hover:border-indigo-400/40 shadow-sm hover:scale-[1.02]",
    ghost:
      "bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border border-white/10 hover:border-white/20",
    accent:
      "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_20px_-3px_rgba(6,182,212,0.5)] hover:shadow-[0_0_28px_0_rgba(6,182,212,0.7)] border border-white/20 hover:scale-[1.02]",
  };

  const content = (
    <motion.div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 250, damping: 18, mass: 0.1 }}
      className={cn(
        "inline-flex items-center justify-center transition-all duration-200 cursor-pointer select-none",
        sizeStyles[size],
        variantStyles[variant],
        disabled && "opacity-50 pointer-events-none cursor-not-allowed",
        className
      )}
    >
      {children}
    </motion.div>
  );

  if (asLink) {
    return (
      <a
        href={href}
        download={download}
        target={target}
        rel={rel || (target === "_blank" ? "noopener noreferrer" : undefined)}
        aria-label={ariaLabel}
        className="inline-block"
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
      className="inline-block focus:outline-none"
    >
      {content}
    </button>
  );
};

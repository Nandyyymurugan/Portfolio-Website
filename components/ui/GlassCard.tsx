"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  glow?: "indigo" | "cyan" | "purple" | "none";
  interactive?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = "",
  glow = "none",
  interactive = false,
  ...props
}) => {
  const glowStyles = {
    none: "",
    indigo: "hover:border-indigo-500/40 hover:shadow-[0_0_30px_-5px_rgba(79,70,229,0.3)]",
    cyan: "hover:border-cyan-500/40 hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.3)]",
    purple: "hover:border-purple-500/40 hover:shadow-[0_0_30px_-5px_rgba(124,58,237,0.3)]",
  };

  return (
    <motion.div
      className={cn(
        "relative rounded-2xl border border-white/10 bg-slate-900/60 p-6 md:p-8 backdrop-blur-xl transition-all duration-300",
        interactive && "cursor-pointer hover:-translate-y-1 hover:bg-slate-800/60",
        glowStyles[glow],
        className
      )}
      {...props}
    >
      {/* Subtle border highlight */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      {children}
    </motion.div>
  );
};

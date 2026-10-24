"use client";

import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export const LiquidCausticsBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (!prefersReduced) {
        time += 0.008;
      }

      // 1. Organic Fluid Mercury Ribbons
      const ribbonCount = 5;
      for (let r = 0; r < ribbonCount; r++) {
        ctx.beginPath();
        const yBase = (height / ribbonCount) * r + Math.sin(time + r) * 60;
        ctx.moveTo(-50, yBase);

        for (let x = 0; x <= width + 50; x += 40) {
          const y =
            yBase +
            Math.sin(x * 0.003 + time * 1.5 + r * 1.2) * 45 +
            Math.cos(x * 0.002 - time * 0.8 + r) * 35;
          ctx.lineTo(x, y);
        }

        const gradient = ctx.createLinearGradient(0, yBase - 50, width, yBase + 50);
        gradient.addColorStop(0, "rgba(255, 59, 48, 0.03)");
        gradient.addColorStop(0.3, "rgba(228, 228, 231, 0.08)"); // Liquid chrome shine
        gradient.addColorStop(0.6, "rgba(244, 63, 94, 0.05)");
        gradient.addColorStop(1, "rgba(168, 85, 247, 0.02)");

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5 + r * 0.6;
        ctx.stroke();
      }

      // 2. Liquid Chrome Specular Drops
      for (let i = 0; i < 18; i++) {
        const x = ((Math.sin(i * 99 + time * 0.3) + 1) / 2) * width;
        const y = ((Math.cos(i * 33 + time * 0.4) + 1) / 2) * height;
        const radius = 1.5 + (i % 3);

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 === 0 ? "rgba(255, 255, 255, 0.25)" : "rgba(255, 59, 48, 0.35)";
        ctx.shadowColor = "#ff3b30";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, [prefersReduced]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};

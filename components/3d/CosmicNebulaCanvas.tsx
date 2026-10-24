"use client";

import React, { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export const CosmicNebulaCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReduced = useReducedMotion();
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Mouse tracking for soft parallax
    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
    };

    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / width - 0.5) * 2;
      const normY = (e.clientY / height - 0.5) * 2;
      mouse.targetX = normX;
      mouse.targetY = normY;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Handle visibility to save resources
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Star generation for twinkling overlay (soft royal purple & sapphire star dust)
    const starCount = Math.min(Math.floor((width * height) / 10500), 90);
    const stars: Array<{
      x: number;
      y: number;
      radius: number;
      baseAlpha: number;
      twinkleSpeed: number;
      phase: number;
      color: string;
    }> = [];

    const starColors = ["#ffffff", "#c4b5fd", "#93c5fd", "#e0e7ff", "#ddd6fe"];

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 0.9 + 0.3,
        baseAlpha: Math.random() * 0.35 + 0.12,
        twinkleSpeed: Math.random() * 0.012 + 0.005,
        phase: Math.random() * Math.PI * 2,
        color: starColors[Math.floor(Math.random() * starColors.length)],
      });
    }

    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      if (!prefersReduced) {
        setMouseOffset({
          x: -mouse.x * 10,
          y: -mouse.y * 8,
        });
      }

      ctx.clearRect(0, 0, width, height);

      // Draw subtle twinkling stars overlay
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.phase += s.twinkleSpeed;
        const twinkle = Math.sin(s.phase) * 0.3 + 0.7;
        const alpha = Math.max(0.08, Math.min(0.55, s.baseAlpha * twinkle));

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = alpha;
        ctx.fill();

        // Shimmer flare for prominent stars
        if (s.radius > 0.95 && twinkle > 0.92) {
          ctx.strokeStyle = s.color;
          ctx.lineWidth = 0.5;
          ctx.globalAlpha = alpha * 0.45;
          ctx.beginPath();
          ctx.moveTo(s.x - 2, s.y);
          ctx.lineTo(s.x + 2, s.y);
          ctx.moveTo(s.x, s.y - 2);
          ctx.lineTo(s.x, s.y + 2);
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [prefersReduced]);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        backgroundColor: "#04060d",
      }}
      aria-hidden="true"
    >
      {/* Concept A: Royal Purple & Midnight Sapphire Cosmic Nebula Background (Softened by 0.2-0.3) */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{
          backgroundImage: "url('/royal-purple-nebula.jpg')",
          backgroundPosition: "center center",
          backgroundSize: "cover",
          opacity: 0.60,
          filter: "brightness(0.86) contrast(0.96)",
          transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0) scale(1.02)`,
          transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          willChange: "transform",
        }}
      />

      {/* Gentle ambient dark vignette for subtle depth without obscuring nebula */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 35%, rgba(4, 6, 14, 0.12) 0%, rgba(4, 6, 14, 0.38) 100%)",
        }}
      />

      {/* Live interactive twinkling starfield overlay */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

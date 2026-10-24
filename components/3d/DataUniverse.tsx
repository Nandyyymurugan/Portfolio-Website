"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Database, Brain, Sparkles, TrendingUp, Code2 } from "lucide-react";

export const DataUniverse: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const [activeChip, setActiveChip] = useState(0);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const width = currentMount.clientWidth;
    const height = currentMount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    const universeGroup = new THREE.Group();
    scene.add(universeGroup);

    // 1. Futuristic Wireframe Data Sphere (Central Core)
    const sphereGeo = new THREE.IcosahedronGeometry(4.8, 3);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6, // Violet
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    universeGroup.add(sphereMesh);

    // Inner glowing sphere
    const innerGeo = new THREE.SphereGeometry(2.6, 24, 24);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4, // Cyan
      transparent: true,
      opacity: 0.2,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    universeGroup.add(innerMesh);

    // 2. Orbital Analytics Rings
    const ringGeo1 = new THREE.TorusGeometry(8.2, 0.04, 16, 120);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0xa78bfa, // Soft purple
      transparent: true,
      opacity: 0.45,
    });
    const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
    ringMesh1.rotation.x = Math.PI / 3;
    universeGroup.add(ringMesh1);

    const ringGeo2 = new THREE.TorusGeometry(9.6, 0.03, 16, 120);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x06b6d4, // Cyan
      transparent: true,
      opacity: 0.35,
    });
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh2.rotation.x = -Math.PI / 3.5;
    ringMesh2.rotation.y = Math.PI / 5;
    universeGroup.add(ringMesh2);

    // 3. Mini Database Cylinders along orbit
    const dbCylinders: THREE.Mesh[] = [];
    for (let i = 0; i < 3; i++) {
      const cylGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.7, 16);
      const cylMat = new THREE.MeshBasicMaterial({
        color: 0x06b6d4,
        wireframe: true,
        transparent: true,
        opacity: 0.7,
      });
      const cyl = new THREE.Mesh(cylGeo, cylMat);
      const angle = (i * Math.PI * 2) / 3;
      cyl.position.set(Math.cos(angle) * 8.2, Math.sin(angle) * 4.1, Math.sin(angle) * 7);
      universeGroup.add(cyl);
      dbCylinders.push(cyl);
    }

    // 4. Data Particle Point Cloud
    const particleCount = 260;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const palette = [
      new THREE.Color(0x8b5cf6),
      new THREE.Color(0x06b6d4),
      new THREE.Color(0xa78bfa),
      new THREE.Color(0x38bdf8),
    ];

    for (let i = 0; i < particleCount; i++) {
      const radius = 5.5 + Math.random() * 8.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const col = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    universeGroup.add(particles);

    // 5. Floating Glowing Hub Nodes with connecting lines
    const nodeCount = 6;
    const nodePoints: THREE.Vector3[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const angle = (i * Math.PI * 2) / nodeCount;
      const nodeGeo = new THREE.SphereGeometry(0.3, 16, 16);
      const nodeMat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0x06b6d4 : 0x8b5cf6,
      });
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      const v = new THREE.Vector3(
        Math.cos(angle) * 6.5,
        Math.sin(angle) * 3.5,
        Math.sin(angle * 2) * 4
      );
      node.position.copy(v);
      universeGroup.add(node);
      nodePoints.push(v);
    }

    // Connect node lines to center
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.25,
    });

    nodePoints.forEach((pt) => {
      const lineGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), pt]);
      const line = new THREE.Line(lineGeo, lineMat);
      universeGroup.add(line);
    });

    // Mouse Interaction
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (prefersReduced) return;
      const rect = currentMount.getBoundingClientRect();
      const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
      const mouseY = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotationY = mouseX * 0.7;
      targetRotationX = -mouseY * 0.7;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!currentMount || !renderer) return;
      const newWidth = currentMount.clientWidth;
      const newHeight = currentMount.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      if (!prefersReduced) {
        sphereMesh.rotation.y = elapsed * 0.12;
        sphereMesh.rotation.x = elapsed * 0.06;

        innerMesh.rotation.y = -elapsed * 0.15;
        ringMesh1.rotation.z = elapsed * 0.08;
        ringMesh2.rotation.z = -elapsed * 0.09;

        particles.rotation.y = elapsed * 0.04;

        dbCylinders.forEach((cyl, idx) => {
          cyl.rotation.y = elapsed * 0.5 + idx;
        });

        // Pulsing inner core
        const scale = 1 + Math.sin(elapsed * 2.2) * 0.06;
        innerMesh.scale.set(scale, scale, scale);

        // Smooth mouse damping
        universeGroup.rotation.y += (targetRotationY - universeGroup.rotation.y) * 0.05;
        universeGroup.rotation.x += (targetRotationX - universeGroup.rotation.x) * 0.05;
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const chipTimer = setInterval(() => {
      setActiveChip((prev) => (prev + 1) % 3);
    }, 3000);

    return () => {
      clearInterval(chipTimer);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);

      sphereGeo.dispose();
      sphereMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      lineMat.dispose();

      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [prefersReduced]);

  const telemetryBadges = [
    {
      title: "Data Stream",
      metric: "Python • SQL",
      sub: "Wrangling & Relational Queries",
      icon: Database,
      color: "from-cyan-500 to-blue-500",
    },
    {
      title: "Predictive Models",
      metric: "scikit-learn • Pandas",
      sub: "End-to-End Analytics",
      icon: TrendingUp,
      color: "from-violet-500 to-purple-500",
    },
    {
      title: "AI Integrations",
      metric: "Gemini API • NLP",
      sub: "TeamUp Task Allocation",
      icon: Brain,
      color: "from-purple-500 to-indigo-500",
    },
  ];

  return (
    <div className="relative w-full h-[400px] sm:h-[460px] lg:h-[540px] flex items-center justify-center">
      {/* Three.js Canvas */}
      <div
        ref={mountRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* Atmospheric ambient glows */}
      <div className="pointer-events-none absolute w-72 h-72 rounded-full bg-violet-600/20 blur-3xl" />
      <div className="pointer-events-none absolute w-60 h-60 rounded-full bg-cyan-500/15 blur-2xl translate-x-14 translate-y-12" />

      {/* Floating Pill Telemetry: Top Left */}
      <div className="absolute top-2 left-2 sm:left-4 z-10 max-w-[210px] pointer-events-auto">
        <div className="glass-card p-3 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-2 mb-1">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-[10px] font-mono tracking-wider text-cyan-300 font-bold uppercase">
              Data Orbit Active
            </span>
          </div>
          <div className="text-xs text-white font-semibold">
            {telemetryBadges[activeChip].title}
          </div>
          <div className="text-[11px] text-slate-400 font-mono mt-0.5">
            {telemetryBadges[activeChip].metric}
          </div>
        </div>
      </div>

      {/* Floating Pill Telemetry: Bottom Right */}
      <div className="absolute bottom-4 right-2 sm:right-4 z-10 max-w-[220px] pointer-events-auto">
        <div className="glass-card p-3 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-xl bg-gradient-to-br ${telemetryBadges[activeChip].color} text-white`}>
              {React.createElement(telemetryBadges[activeChip].icon, { size: 15 })}
            </div>
            <div>
              <div className="text-xs font-bold text-white tracking-tight">
                {telemetryBadges[activeChip].metric}
              </div>
              <div className="text-[10px] text-slate-400">
                {telemetryBadges[activeChip].sub}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

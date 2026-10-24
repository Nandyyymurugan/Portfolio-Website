"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export const CrystallineNeuralCore: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let width = mount.clientWidth;
    let height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // 1. Outer Faceted Crystal Sphere (Geometric Polyhedron)
    const icosaGeo = new THREE.IcosahedronGeometry(4.2, 2);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xff3b30, // Signal Coral / Crimson
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const crystalMesh = new THREE.Mesh(icosaGeo, wireMat);
    rootGroup.add(crystalMesh);

    // 2. Vertex Glowing Nodes (Points on vertices of icosahedron)
    const nodeMat = new THREE.PointsMaterial({
      color: 0x38bdf8, // Electric Sky Cyan
      size: 0.22,
      transparent: true,
      opacity: 0.9,
    });
    const nodePoints = new THREE.Points(icosaGeo, nodeMat);
    rootGroup.add(nodePoints);

    // 3. Inner Pulsing Energy Nucleus
    const nucleusGeo = new THREE.SphereGeometry(2.0, 32, 32);
    const nucleusMat = new THREE.MeshBasicMaterial({
      color: 0xf43f5e, // Rose Violet
      transparent: true,
      opacity: 0.35,
      wireframe: false,
    });
    const nucleusMesh = new THREE.Mesh(nucleusGeo, nucleusMat);
    rootGroup.add(nucleusMesh);

    // Core central bright node
    const coreCenterGeo = new THREE.SphereGeometry(0.8, 16, 16);
    const coreCenterMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.85,
    });
    const coreCenter = new THREE.Mesh(coreCenterGeo, coreCenterMat);
    rootGroup.add(coreCenter);

    // 4. Orbital Trajectory Rings
    const ring1Geo = new THREE.TorusGeometry(6.4, 0.035, 16, 120);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0xff3b30,
      transparent: true,
      opacity: 0.6,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 6;
    rootGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(7.2, 0.03, 16, 120);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0xa855f7, // Violet
      transparent: true,
      opacity: 0.5,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.z = Math.PI / 4;
    rootGroup.add(ring2);

    const ring3Geo = new THREE.TorusGeometry(8.0, 0.025, 16, 120);
    const ring3Mat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8, // Cyan
      transparent: true,
      opacity: 0.4,
    });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.y = Math.PI / 2.5;
    rootGroup.add(ring3);

    // 5. Surrounding Neural Particle Swarm
    const particleCount = 180;
    const posArray = new Float32Array(particleCount * 3);
    const colorArray = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(0xff3b30);
    const color2 = new THREE.Color(0x38bdf8);
    const color3 = new THREE.Color(0xf43f5e);

    for (let i = 0; i < particleCount; i++) {
      const radius = 5.0 + Math.random() * 4.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      posArray[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      posArray[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      posArray[i * 3 + 2] = radius * Math.cos(phi);

      const chosenColor = i % 3 === 0 ? color1 : i % 3 === 1 ? color2 : color3;
      colorArray[i * 3] = chosenColor.r;
      colorArray[i * 3 + 1] = chosenColor.g;
      colorArray[i * 3 + 2] = chosenColor.b;
    }

    const swarmGeo = new THREE.BufferGeometry();
    swarmGeo.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
    swarmGeo.setAttribute("color", new THREE.BufferAttribute(colorArray, 3));

    const swarmMat = new THREE.PointsMaterial({
      size: 0.14,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
    });

    const swarmPoints = new THREE.Points(swarmGeo, swarmMat);
    rootGroup.add(swarmPoints);

    // Mouse Tracking for Parallax
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      const mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      targetRotationY = mouseX * 0.45;
      targetRotationX = -mouseY * 0.35;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Handle Window Resize
    const handleResize = () => {
      if (!mount) return;
      width = mount.clientWidth;
      height = mount.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (!prefersReduced) {
        // Continuous organic rotation
        crystalMesh.rotation.y = elapsedTime * 0.25;
        crystalMesh.rotation.x = elapsedTime * 0.15;
        nodePoints.rotation.y = crystalMesh.rotation.y;
        nodePoints.rotation.x = crystalMesh.rotation.x;

        // Orbital rings opposite rotations
        ring1.rotation.z = elapsedTime * 0.35;
        ring2.rotation.y = -elapsedTime * 0.3;
        ring3.rotation.x = elapsedTime * 0.25;

        // Particle swarm slow rotation
        swarmPoints.rotation.y = elapsedTime * 0.08;

        // Subtle pulsing scale for nucleus
        const scale = 1 + Math.sin(elapsedTime * 2.5) * 0.08;
        nucleusMesh.scale.set(scale, scale, scale);

        // Smooth mouse parallax easing
        rootGroup.rotation.y += (targetRotationY - rootGroup.rotation.y) * 0.06;
        rootGroup.rotation.x += (targetRotationX - rootGroup.rotation.x) * 0.06;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [prefersReduced]);

  return (
    <div className="relative w-full h-[320px] sm:h-[400px] lg:h-[460px] flex items-center justify-center">
      {/* 3D Canvas Mounting Container */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* Subtle radial backlight glow behind 3D core */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden="true"
      >
        <div className="w-[260px] h-[260px] rounded-full bg-gradient-to-r from-[#ff3b30]/20 via-[#f43f5e]/25 to-[#38bdf8]/15 blur-3xl opacity-75" />
      </div>
    </div>
  );
};

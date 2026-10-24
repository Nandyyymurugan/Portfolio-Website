"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export const LiquidChromeTorus: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let width = mount.clientWidth;
    let height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 16;

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

    // 1. High-Performance Metallic Environment Lighting
    const ambientLight = new THREE.AmbientLight(0x080810, 2.5);
    scene.add(ambientLight);

    const crimsonLight = new THREE.DirectionalLight(0xff3b30, 4.0);
    crimsonLight.position.set(-8, 6, 8);
    scene.add(crimsonLight);

    const violetLight = new THREE.DirectionalLight(0xa855f7, 3.5);
    violetLight.position.set(8, -6, 6);
    scene.add(violetLight);

    const specularWhite = new THREE.PointLight(0xffffff, 3.0, 50);
    specularWhite.position.set(0, 8, 10);
    scene.add(specularWhite);

    const rimCyan = new THREE.DirectionalLight(0x38bdf8, 2.0);
    rimCyan.position.set(0, -10, -5);
    scene.add(rimCyan);

    // 2. Main Liquid Chrome Torus (Molten Mercury Ring)
    // We use a dense Torus geometry so we can ripple vertices like fluid
    const torusGeo = new THREE.TorusGeometry(4.4, 1.45, 64, 128);
    // Clone original positions for wave displacement
    const originalPositions = torusGeo.attributes.position.clone();

    const chromeMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4d4d8, // Polished platinum / chrome
      roughness: 0.12,
      metalness: 0.95,
      wireframe: false,
    });

    const liquidTorus = new THREE.Mesh(torusGeo, chromeMaterial);
    rootGroup.add(liquidTorus);

    // 3. Inner Concentric Chrome Accent Ring
    const innerRingGeo = new THREE.TorusGeometry(2.3, 0.18, 32, 96);
    const innerRingMat = new THREE.MeshStandardMaterial({
      color: 0xff3b30,
      roughness: 0.2,
      metalness: 0.9,
    });
    const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
    innerRing.rotation.x = Math.PI / 4;
    rootGroup.add(innerRing);

    // 4. Outer Molten Metal Droplets (Floating Spheres orbiting ring)
    const droplets: { mesh: THREE.Mesh; angle: number; speed: number; radius: number; yOffset: number }[] = [];
    const dropGeo = new THREE.SphereGeometry(0.32, 24, 24);
    const dropMat = new THREE.MeshStandardMaterial({
      color: 0xf4f4f5,
      roughness: 0.08,
      metalness: 0.98,
    });

    for (let i = 0; i < 6; i++) {
      const drop = new THREE.Mesh(dropGeo, dropMat);
      const angle = (i * Math.PI * 2) / 6;
      droplets.push({
        mesh: drop,
        angle,
        speed: 0.4 + (i % 3) * 0.15,
        radius: 6.2 + (i % 2) * 0.8,
        yOffset: (Math.random() - 0.5) * 2,
      });
      rootGroup.add(drop);
    }

    // Mouse Tracking for Interactive Tilting
    let targetRotX = 0;
    let targetRotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      const mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      targetRotY = mouseX * 0.35;
      targetRotX = -mouseY * 0.25;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Handle Resize
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
      const time = clock.getElapsedTime();

      if (!prefersReduced) {
        // Continuous smooth rotation
        liquidTorus.rotation.z = time * 0.18;
        liquidTorus.rotation.y = time * 0.08;
        innerRing.rotation.z = -time * 0.28;
        innerRing.rotation.x = Math.PI / 4 + Math.sin(time) * 0.2;

        // Fluid Mercury Wave Displacement along the Torus surface
        const posAttr = torusGeo.attributes.position;
        const origArray = originalPositions.array;
        const count = posAttr.count;

        for (let i = 0; i < count; i++) {
          const ox = origArray[i * 3];
          const oy = origArray[i * 3 + 1];
          const oz = origArray[i * 3 + 2];

          // Compute ripple displacement
          const wave =
            Math.sin(ox * 0.8 + time * 2.2) * 0.12 +
            Math.cos(oy * 0.8 + time * 1.8) * 0.12 +
            Math.sin(oz * 0.8 + time * 1.5) * 0.08;

          const norm = Math.sqrt(ox * ox + oy * oy + oz * oz);
          if (norm > 0) {
            posAttr.setXYZ(
              i,
              ox + (ox / norm) * wave,
              oy + (oy / norm) * wave,
              oz + (oz / norm) * wave
            );
          }
        }
        posAttr.needsUpdate = true;
        torusGeo.computeVertexNormals();

        // Orbit molten droplets
        droplets.forEach((d) => {
          const currentAngle = d.angle + time * d.speed;
          d.mesh.position.x = Math.cos(currentAngle) * d.radius;
          d.mesh.position.y = Math.sin(currentAngle) * (d.radius * 0.5) + d.yOffset;
          d.mesh.position.z = Math.sin(currentAngle) * (d.radius * 0.6);
        });

        // Dynamic light pulsation
        crimsonLight.intensity = 4.0 + Math.sin(time * 2.0) * 0.8;
        violetLight.intensity = 3.5 + Math.cos(time * 2.0) * 0.6;

        // Smooth cursor tilt inertia
        rootGroup.rotation.y += (targetRotY - rootGroup.rotation.y) * 0.05;
        rootGroup.rotation.x += (targetRotX - rootGroup.rotation.x) * 0.05;
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
    <div className="relative w-full h-[420px] sm:h-[500px] lg:h-[560px] flex items-center justify-center">
      {/* 3D Canvas Mount */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Atmospheric Neon Caustics Ambient Glow */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden="true"
      >
        <div className="w-[320px] sm:w-[420px] h-[320px] sm:h-[420px] rounded-full bg-gradient-to-r from-[#ff3b30]/25 via-[#a855f7]/20 to-[#e4e4e7]/10 blur-3xl opacity-75" />
      </div>
    </div>
  );
};

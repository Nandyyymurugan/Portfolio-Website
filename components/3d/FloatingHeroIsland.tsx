"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export const FloatingHeroIsland: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    let isVisible = true;

    const width = container.clientWidth || 550;
    const height = container.clientHeight || 550;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 2.2, 7.8);
    camera.lookAt(0, 0.4, 0);

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0x0f172a, 1.4);
    scene.add(ambientLight);

    const cyanKeyLight = new THREE.DirectionalLight(0x06b6d4, 3.2);
    cyanKeyLight.position.set(4, 6, 5);
    scene.add(cyanKeyLight);

    const emeraldRimLight = new THREE.DirectionalLight(0x10b981, 2.5);
    emeraldRimLight.position.set(-5, 4, -3);
    scene.add(emeraldRimLight);

    // Vibrant neon underglow light pointing up from below the island
    const underGlowLight = new THREE.PointLight(0x8b5cf6, 4.0, 12);
    underGlowLight.position.set(0, -2.5, 0.5);
    scene.add(underGlowLight);

    const cyanSpotLight = new THREE.PointLight(0x06b6d4, 2.5, 8);
    cyanSpotLight.position.set(0, 3, 2);
    scene.add(cyanSpotLight);

    // Master Group for the Floating Island
    const islandGroup = new THREE.Group();
    scene.add(islandGroup);

    // 4. Floating Rock Island Geometry
    // Crystalline rock base
    const rockGeo = new THREE.CylinderGeometry(2.5, 0.5, 1.9, 7, 3);
    // Deform vertices slightly to give organic faceted rock look
    const posAttr = rockGeo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const y = posAttr.getY(i);
      if (y < 0.5) {
        posAttr.setX(i, posAttr.getX(i) + (Math.random() - 0.5) * 0.22);
        posAttr.setZ(i, posAttr.getZ(i) + (Math.random() - 0.5) * 0.22);
      }
    }
    rockGeo.computeVertexNormals();

    const rockMat = new THREE.MeshStandardMaterial({
      color: 0x090e1b,
      roughness: 0.75,
      metalness: 0.2,
      flatShading: true,
    });
    const rockMesh = new THREE.Mesh(rockGeo, rockMat);
    rockMesh.position.y = -0.6;
    islandGroup.add(rockMesh);

    // Top Platform Grid / Glowing Caustic Ring
    const platformGeo = new THREE.CylinderGeometry(2.52, 2.52, 0.08, 36);
    const platformMat = new THREE.MeshStandardMaterial({
      color: 0x070c18,
      roughness: 0.3,
      metalness: 0.8,
    });
    const platformMesh = new THREE.Mesh(platformGeo, platformMat);
    platformMesh.position.y = 0.38;
    islandGroup.add(platformMesh);

    // Neon Cyber Grid Ring on the platform
    const ringGeo = new THREE.RingGeometry(1.6, 2.45, 48);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.55,
      wireframe: true,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.y = 0.43;
    islandGroup.add(ringMesh);

    // Inner glowing energy core circle
    const coreGeo = new THREE.CircleGeometry(1.2, 32);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.2,
      side: THREE.DoubleSide,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.rotation.x = Math.PI / 2;
    coreMesh.position.y = 0.435;
    islandGroup.add(coreMesh);

    // 5. 3D Holographic Laptop
    const laptopGroup = new THREE.Group();
    laptopGroup.position.set(0.1, 0.46, 0.25);
    laptopGroup.rotation.y = -0.15;
    islandGroup.add(laptopGroup);

    // Laptop Base
    const baseGeo = new THREE.BoxGeometry(1.5, 0.05, 1.05);
    const laptopMat = new THREE.MeshStandardMaterial({
      color: 0x0d1424,
      roughness: 0.3,
      metalness: 0.85,
    });
    const laptopBase = new THREE.Mesh(baseGeo, laptopMat);
    laptopGroup.add(laptopBase);

    // Glowing Keyboard Backlight Plane
    const kbGeo = new THREE.PlaneGeometry(1.3, 0.75);
    const kbMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.45,
    });
    const kbMesh = new THREE.Mesh(kbGeo, kbMat);
    kbMesh.rotation.x = -Math.PI / 2;
    kbMesh.position.set(0, 0.03, 0.05);
    laptopGroup.add(kbMesh);

    // Laptop Screen Lid & Display
    const lidGroup = new THREE.Group();
    lidGroup.position.set(0, 0.03, -0.5);
    lidGroup.rotation.x = 0.35; // Tilted back
    laptopGroup.add(lidGroup);

    const lidGeo = new THREE.BoxGeometry(1.5, 1.05, 0.04);
    const lidMesh = new THREE.Mesh(lidGeo, laptopMat);
    lidMesh.position.set(0, 0.52, 0);
    lidGroup.add(lidMesh);

    // Offscreen Canvas for Dynamic Telemetry Screen
    const screenCanvas = document.createElement("canvas");
    screenCanvas.width = 512;
    screenCanvas.height = 360;
    const sCtx = screenCanvas.getContext("2d")!;
    const screenTexture = new THREE.CanvasTexture(screenCanvas);

    const screenGeo = new THREE.PlaneGeometry(1.42, 0.96);
    const screenMat = new THREE.MeshBasicMaterial({
      map: screenTexture,
      toneMapped: false,
    });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.set(0, 0.52, 0.025);
    lidGroup.add(screenMesh);

    // 6. 3D Golden Trophy
    const trophyGroup = new THREE.Group();
    trophyGroup.position.set(1.4, 0.44, 0.6);
    trophyGroup.scale.set(0.72, 0.72, 0.72);
    trophyGroup.rotation.y = -0.4;
    islandGroup.add(trophyGroup);

    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xffc72c,
      roughness: 0.22,
      metalness: 0.92,
    });

    // Base pedestal
    const tBaseGeo = new THREE.CylinderGeometry(0.3, 0.36, 0.2, 16);
    const tBaseMat = new THREE.MeshStandardMaterial({
      color: 0x0b1120,
      roughness: 0.5,
      metalness: 0.6,
    });
    const tBase = new THREE.Mesh(tBaseGeo, tBaseMat);
    trophyGroup.add(tBase);

    // Gold Plaque on base
    const plaqueGeo = new THREE.BoxGeometry(0.3, 0.08, 0.02);
    const plaque = new THREE.Mesh(plaqueGeo, goldMat);
    plaque.position.set(0, 0, 0.29);
    trophyGroup.add(plaque);

    // Stem
    const stemGeo = new THREE.CylinderGeometry(0.08, 0.12, 0.35, 16);
    const stem = new THREE.Mesh(stemGeo, goldMat);
    stem.position.y = 0.25;
    trophyGroup.add(stem);

    // Cup Chalice
    const cupGeo = new THREE.CylinderGeometry(0.34, 0.16, 0.52, 24);
    const cup = new THREE.Mesh(cupGeo, goldMat);
    cup.position.y = 0.65;
    trophyGroup.add(cup);

    // Handles (Torus)
    const handleGeo = new THREE.TorusGeometry(0.2, 0.035, 8, 20, Math.PI);
    const leftHandle = new THREE.Mesh(handleGeo, goldMat);
    leftHandle.rotation.z = -Math.PI / 2;
    leftHandle.position.set(-0.35, 0.68, 0);
    trophyGroup.add(leftHandle);

    const rightHandle = new THREE.Mesh(handleGeo, goldMat);
    rightHandle.rotation.z = Math.PI / 2;
    rightHandle.position.set(0.35, 0.68, 0);
    trophyGroup.add(rightHandle);

    // 7. 3D Graduation Cap (Mortarboard)
    const capGroup = new THREE.Group();
    capGroup.position.set(-1.35, 0.52, 0.5);
    capGroup.scale.set(0.75, 0.75, 0.75);
    capGroup.rotation.set(0.1, 0.3, -0.15); // Stylish tilt
    islandGroup.add(capGroup);

    const capMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.65,
      metalness: 0.2,
    });

    // Skull cap under-layer
    const skullGeo = new THREE.CylinderGeometry(0.36, 0.3, 0.25, 20);
    const skull = new THREE.Mesh(skullGeo, capMat);
    capGroup.add(skull);

    // Flat Top Diamond Board
    const boardGeo = new THREE.BoxGeometry(0.95, 0.03, 0.95);
    const board = new THREE.Mesh(boardGeo, capMat);
    board.position.y = 0.14;
    board.rotation.y = Math.PI / 4;
    capGroup.add(board);

    // Golden Button & Tassel
    const buttonGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.03, 12);
    const button = new THREE.Mesh(buttonGeo, goldMat);
    button.position.y = 0.17;
    capGroup.add(button);

    // Tassel string hanging down
    const tasselGeo = new THREE.CylinderGeometry(0.015, 0.03, 0.45, 8);
    const tassel = new THREE.Mesh(tasselGeo, goldMat);
    tassel.position.set(0.26, 0.02, 0.26);
    tassel.rotation.z = -0.3;
    capGroup.add(tassel);

    // 8. Swirling Neon Orbital Rings
    // Ring 1 (Cyan)
    const orbit1Geo = new THREE.TorusGeometry(3.1, 0.022, 16, 80);
    const orbit1Mat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.7,
    });
    const orbit1 = new THREE.Mesh(orbit1Geo, orbit1Mat);
    orbit1.rotation.x = Math.PI / 3;
    orbit1.rotation.y = 0.2;
    islandGroup.add(orbit1);

    // Ring 2 (Violet)
    const orbit2Geo = new THREE.TorusGeometry(3.4, 0.018, 16, 80);
    const orbit2Mat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.6,
    });
    const orbit2 = new THREE.Mesh(orbit2Geo, orbit2Mat);
    orbit2.rotation.x = -Math.PI / 3.5;
    orbit2.rotation.z = 0.4;
    islandGroup.add(orbit2);

    // Glowing Orbital Particles
    const orbPCount = 35;
    const orbPGeo = new THREE.BufferGeometry();
    const orbPPos = new Float32Array(orbPCount * 3);
    for (let i = 0; i < orbPCount; i++) {
      const angle = (i / orbPCount) * Math.PI * 2;
      orbPPos[i * 3] = Math.cos(angle) * 3.1;
      orbPPos[i * 3 + 1] = (Math.random() - 0.5) * 0.4;
      orbPPos[i * 3 + 2] = Math.sin(angle) * 3.1;
    }
    orbPGeo.setAttribute("position", new THREE.BufferAttribute(orbPPos, 3));
    const orbPMat = new THREE.PointsMaterial({
      color: 0x67e8f9,
      size: 0.08,
      transparent: true,
      opacity: 0.9,
    });
    const orbitParticles = new THREE.Points(orbPGeo, orbPMat);
    islandGroup.add(orbitParticles);

    // 9. Floating 3D Badge Tags (Sprites)
    const createBadgeTexture = (text: string, icon: string, color: string) => {
      const c = document.createElement("canvas");
      c.width = 320;
      c.height = 80;
      const ctx = c.getContext("2d")!;
      ctx.fillStyle = "rgba(10, 16, 32, 0.88)";
      ctx.beginPath();
      ctx.roundRect(4, 4, 312, 72, 36);
      ctx.fill();
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.font = "bold 28px sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.textBaseline = "middle";
      ctx.fillText(`${icon} ${text}`, 30, 40);

      const tex = new THREE.CanvasTexture(c);
      return tex;
    };

    const badge1Tex = createBadgeTexture("EduNavigator", "🔥", "#10b981");
    const badge1Mat = new THREE.SpriteMaterial({ map: badge1Tex, transparent: true });
    const badge1 = new THREE.Sprite(badge1Mat);
    badge1.position.set(-1.8, 2.0, 1.2);
    badge1.scale.set(1.5, 0.38, 1);
    islandGroup.add(badge1);

    const badge2Tex = createBadgeTexture("8.9 CGPA", "⭐", "#06b6d4");
    const badge2Mat = new THREE.SpriteMaterial({ map: badge2Tex, transparent: true });
    const badge2 = new THREE.Sprite(badge2Mat);
    badge2.position.set(1.9, 1.8, 1.0);
    badge2.scale.set(1.3, 0.34, 1);
    islandGroup.add(badge2);

    // 10. Interactive Mouse / Pointer Tracking
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };
    let userRotationY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouse.targetX = normX;
      mouse.targetY = normY;

      if (isDragging) {
        const deltaX = e.clientX - prevMousePos.x;
        userRotationY += deltaX * 0.008;
        prevMousePos = { x: e.clientX, y: e.clientY };
      }
    };

    const handlePointerDown = (e: MouseEvent) => {
      isDragging = true;
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    window.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);

    // Handle container resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // Handle visibility
    const handleVisibility = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibility);

    setIsLoaded(true);

    // 11. Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      const elapsed = clock.getElapsedTime();

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Levitation floating animation
      if (!prefersReduced) {
        islandGroup.position.y = Math.sin(elapsed * 1.6) * 0.14;
        islandGroup.rotation.y = userRotationY + mouse.x * 0.35 + Math.sin(elapsed * 0.5) * 0.06;
        islandGroup.rotation.x = -mouse.y * 0.22 + 0.12;

        // Swirl orbital rings
        orbit1.rotation.z = elapsed * 0.4;
        orbit2.rotation.y = -elapsed * 0.35;
        orbitParticles.rotation.y = elapsed * 0.5;

        // Floating badges bobbing
        badge1.position.y = 2.0 + Math.sin(elapsed * 2.2) * 0.08;
        badge2.position.y = 1.8 + Math.cos(elapsed * 2.0) * 0.08;

        // Dynamic Laptop Telemetry Screen Drawing
        if (Math.floor(elapsed * 30) % 2 === 0) {
          sCtx.fillStyle = "#060b18";
          sCtx.fillRect(0, 0, 512, 360);

          // Top Header Bar
          sCtx.fillStyle = "#0c172e";
          sCtx.fillRect(0, 0, 512, 44);
          sCtx.fillStyle = "#38bdf8";
          sCtx.font = "bold 15px monospace";
          sCtx.fillText("NANTHINI // AI TELEMETRY ENGINE", 20, 28);
          sCtx.fillStyle = "#10b981";
          sCtx.fillText("● LIVE: 99.4%", 380, 28);

          // Circular CGPA Meter in center
          const centerX = 160;
          const centerY = 190;
          const radius = 75;

          // Background track
          sCtx.beginPath();
          sCtx.arc(centerX, centerY, radius, 0, Math.PI * 2);
          sCtx.strokeStyle = "rgba(6, 182, 212, 0.18)";
          sCtx.lineWidth = 14;
          sCtx.stroke();

          // Value track (8.9 / 10 = 89%)
          const pct = 0.89;
          sCtx.beginPath();
          sCtx.arc(centerX, centerY, radius, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * pct);
          sCtx.strokeStyle = "#06b6d4";
          sCtx.lineWidth = 14;
          sCtx.lineCap = "round";
          sCtx.stroke();

          // Dial text
          sCtx.fillStyle = "#ffffff";
          sCtx.font = "bold 38px monospace";
          sCtx.textAlign = "center";
          sCtx.fillText("8.9", centerX, centerY + 8);
          sCtx.font = "12px monospace";
          sCtx.fillStyle = "#94a3b8";
          sCtx.fillText("OVERALL CGPA", centerX, centerY + 28);
          sCtx.fillText("IFET COLLEGE", centerX, centerY + 44);

          // Right-side Telemetry Bars & Code
          sCtx.textAlign = "left";
          sCtx.fillStyle = "#a5b4fc";
          sCtx.font = "bold 13px monospace";
          sCtx.fillText("CORE COMPETENCIES", 300, 95);

          const metrics = [
            { label: "Data Analytics", val: 0.94, color: "#10b981" },
            { label: "Python & SQL", val: 0.92, color: "#06b6d4" },
            { label: "AI & ML Models", val: 0.88, color: "#8b5cf6" },
            { label: "Power BI / Viz", val: 0.86, color: "#f59e0b" },
          ];

          metrics.forEach((m, idx) => {
            const barY = 120 + idx * 48;
            sCtx.fillStyle = "#cbd5e1";
            sCtx.font = "12px monospace";
            sCtx.fillText(m.label, 300, barY);

            // Bar background
            sCtx.fillStyle = "rgba(255, 255, 255, 0.08)";
            sCtx.beginPath();
            sCtx.roundRect(300, barY + 6, 180, 8, 4);
            sCtx.fill();

            // Progress bar
            sCtx.fillStyle = m.color;
            sCtx.beginPath();
            sCtx.roundRect(300, barY + 6, 180 * m.val, 8, 4);
            sCtx.fill();
          });

          // Bottom status banner
          sCtx.fillStyle = "rgba(16, 185, 129, 0.15)";
          sCtx.fillRect(20, 312, 472, 34);
          sCtx.fillStyle = "#34d399";
          sCtx.font = "12px monospace";
          sCtx.fillText("⚡ EduNavigator System Status: ALL ENGINES OPERATIONAL", 36, 334);

          screenTexture.needsUpdate = true;
        }
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);

      // Clean up Three.js resources
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [prefersReduced]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[520px] md:h-[620px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
      style={{ touchAction: "none" }}
      aria-label="Interactive 3D Floating Island Stage showing Laptop, Golden Trophy, and Graduation Cap"
    >
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Floating Interactive Badge Helper */}
      <div className="absolute bottom-4 right-4 z-20 pointer-events-none flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/30 text-[11px] text-cyan-300 backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        Drag / Move to explore 3D stage
      </div>
    </div>
  );
};

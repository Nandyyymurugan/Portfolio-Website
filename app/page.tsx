import React from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Expertise } from "@/components/Expertise";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Certifications } from "@/components/Certifications";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { CosmicNebulaCanvas } from "@/components/3d/CosmicNebulaCanvas";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-transparent text-[#ffffff] selection:bg-[#a855f7] selection:text-white">
      {/* Concept A: Royal Purple & Midnight Sapphire Cosmic Nebula Background */}
      <CosmicNebulaCanvas />

      {/* Floating Translucent Glass Navbar */}
      <Navbar />

      {/* Main Portfolio Sections (Preserved 100% Intact) */}
      <main className="relative z-10 flex flex-col">
        <Hero />
        <About />
        <Expertise />
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
        <Contact />
      </main>

      {/* Minimal Dark Footer */}
      <Footer />
    </div>
  );
}

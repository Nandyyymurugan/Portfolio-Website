"use client";

import React, { useState, useEffect } from "react";
import { PERSONAL_INFO } from "@/lib/constants";
import { scrollToElement } from "@/lib/utils";
import { useTilt3D } from "@/hooks/useTilt3D";

const TYPING_ROLES = [
  "Data Analyst",
  "Data Engineer",
  "Python Developer",
  "Machine Learning Engineer",
  "Data Visualization Specialist",
];

export const Hero: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const tiltCardRef = useTilt3D<HTMLDivElement>(0.015);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const currentFullText = TYPING_ROLES[roleIndex];

    if (!isDeleting) {
      if (displayText.length < currentFullText.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentFullText.slice(0, displayText.length + 1));
        }, 90);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(currentFullText.slice(0, displayText.length - 1));
        }, 45);
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % TYPING_ROLES.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section className="hero" id="top">
      {/* Floating Colored Atmosphere Spheres */}
      <div className="hero-circles-bg" aria-hidden="true">
        <div className="hero-circle hero-circle-1" />
        <div className="hero-circle hero-circle-2" />
        <div className="hero-circle hero-circle-3" />
      </div>

      <div className="container hero-inner w-full">
        {/* Frosted Glassmorphism Inset Card with 3D Parallax Tilt */}
        <div className="hero-glass-card" ref={tiltCardRef}>
          {/* Card Top Bar Meta */}
          <div className="card-header-meta">
            <span>PORTFOLIO</span>
            <div className="hero-eyebrow">
              <span className="blink" /> OPEN FOR OPPORTUNITIES
            </div>
          </div>

          {/* Card Main Body */}
          <div className="card-body-content">
            <div className="hero-greeting">Hello, I&apos;m</div>
            <h1 className="hero-card-name">NANTHINI MURUGAN</h1>

            <div className="hero-creative-title">
              <span className="creative-accent">Creative</span>
              <div className="creative-role-wrapper">
                <span className="creative-role">{displayText}</span>
                <span className="caret" />
              </div>
            </div>

            <p className="hero-tagline">
              Aspiring Data Analyst with a strong foundation in Python, SQL, data visualization, and analytical problem-solving. Passionate about transforming raw data into meaningful insights to support business decision-making.
            </p>

            <div className="hero-actions">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToElement("#projects");
                }}
                className="btn btn-primary"
              >
                View Projects
              </a>
              <a
                href={PERSONAL_INFO.resumePath}
                className="btn btn-ghost"
                download="Nanthini_Murugan_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download Resume
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToElement("#contact");
                }}
                className="btn btn-ghost"
              >
                Contact
              </a>
            </div>
          </div>

          {/* Card Footer Metadata */}
          <div className="card-footer-meta">
            <div className="hero-meta">
              <div>
                DOMAINS
                <span>Data Analytics · AI &amp; ML · SQL · Python · Visualization</span>
              </div>
              <div>
                FLAGSHIP PROJECT
                <span>EduNavigator — AI Career &amp; Exam Prep Platform</span>
              </div>
              <div>
                EDUCATION
                <span>B.Tech, AI &amp; Data Science — IFET College (8.9 CGPA)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pulsing Scroll Down Indicator */}
      <div className="scroll-indicator">
        <div className="line" /> SCROLL
      </div>
    </section>
  );
};

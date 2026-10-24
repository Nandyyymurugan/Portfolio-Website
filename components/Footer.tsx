"use client";

import React from "react";
import { scrollToElement } from "@/lib/utils";

export const Footer: React.FC = () => {
  return (
    <footer>
      <div className="container footer-inner">
        <div className="footer-logo">
          NANTHINI MURUGAN · DATA ANALYST &amp; AI SPECIALIST
        </div>
        <div className="footer-links">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              scrollToElement("#top");
            }}
          >
            Home
          </a>
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              scrollToElement("#about");
            }}
          >
            About
          </a>
          <a
            href="#skills"
            onClick={(e) => {
              e.preventDefault();
              scrollToElement("#skills");
            }}
          >
            Skills
          </a>
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              scrollToElement("#projects");
            }}
          >
            Projects
          </a>
          <a
            href="#experience"
            onClick={(e) => {
              e.preventDefault();
              scrollToElement("#experience");
            }}
          >
            Experience
          </a>
          <a
            href="#certifications"
            onClick={(e) => {
              e.preventDefault();
              scrollToElement("#certifications");
            }}
          >
            Certifications
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToElement("#contact");
            }}
          >
            Contact
          </a>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
            Resume ↗
          </a>
        </div>
        <div className="footer-note">
          Designed &amp; engineered with Next.js, TypeScript &amp; Glassmorphism · 2026
        </div>
      </div>
    </footer>
  );
};

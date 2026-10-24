"use client";

import React, { useState, useEffect } from "react";
import { scrollToElement } from "@/lib/utils";

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("top");

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Expertise", href: "#expertise" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Certifications", href: "#certifications" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sections = ["top", "about", "expertise", "skills", "projects", "experience", "certifications", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    scrollToElement(href);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`nav ${scrolled ? "scrolled" : ""}`} id="nav">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("#top");
          }}
          className="nav-logo"
        >
          <span className="brackets">&lt;</span>NANTHINI MURUGAN<span className="brackets">/&gt;</span>
        </a>

        <div className="nav-links">
          {navLinks.map((link) => {
            const sectionId = link.href.replace("#", "");
            const isActive = activeSection === sectionId;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className={isActive ? "active" : ""}
              >
                {link.name}
              </a>
            );
          })}
        </div>

        <div className="nav-cta">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#contact");
            }}
            className="btn btn-ghost"
          >
            Contact
          </a>
          <button
            className="nav-burger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            <span
              style={{
                transform: mobileMenuOpen ? "rotate(45deg)" : "none",
                transition: "transform 0.3s ease",
              }}
            >
              <span
                style={{
                  display: "block",
                  width: "16px",
                  height: "1.5px",
                  background: "#fff",
                }}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer (Only rendered when open, preventing desktop dim overlay) */}
      {mobileMenuOpen && (
        <div className="mobile-panel open" id="mobilePanel">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </>
  );
};

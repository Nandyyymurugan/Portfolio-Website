"use client";

import React from "react";
import { CERTIFICATIONS, WORKSHOPS_AND_EVENTS } from "@/lib/constants";

interface CertCardData {
  id: string;
  name: string;
  issuer: string;
  code: string;
  desc: string;
}

interface EventCardData {
  id: string;
  title: string;
  organization: string;
  location?: string;
  type: string;
  icon: string;
  desc: string;
}

const CERTS_DATA: CertCardData[] = [
  {
    id: "ibm-ai",
    name: "Getting Started with Artificial Intelligence",
    issuer: "IBM SkillsBuild",
    code: "AI",
    desc: "AI fundamentals, machine learning basics, generative AI foundations, responsible AI principles, and ethical data science workflows.",
  },
  {
    id: "infosys-prompt",
    name: "Prompt Engineering",
    issuer: "Infosys Springboard",
    code: "PE",
    desc: "Techniques for structured prompting, few-shot conditioning, chain-of-thought workflows, and LLM output steering.",
  },
  {
    id: "infosys-ai-all",
    name: "Artificial Intelligence for All",
    issuer: "Infosys Springboard",
    code: "AI",
    desc: "Foundational concepts of artificial intelligence, real-world industry applications, neural network concepts, and intelligent automation.",
  },
  {
    id: "infosys-genai",
    name: "Generative AI for All",
    issuer: "Infosys Springboard",
    code: "GEN",
    desc: "Foundational generative models, text and media synthesis, transformer architectures, and modern AI ecosystem capabilities.",
  },
  {
    id: "nptel",
    name: "NPTEL Certification",
    issuer: "NPTEL (National Programme on Technology Enhanced Learning)",
    code: "NPTEL",
    desc: "Rigorous academic examination certifying computer science and analytical methodologies via premier IIT institutes.",
  },
  {
    id: "ccna",
    name: "CCNA Certification",
    issuer: "Cisco Networking Academy",
    code: "CCNA",
    desc: "Network fundamentals, IP addressing, routing protocols, subnetting, transport security, and packet switching fundamentals.",
  },
];

const EVENTS_DATA: EventCardData[] = [
  {
    id: "expo",
    title: "Sustainable Innovations Project Expo 2025",
    organization: "IFET College of Engineering",
    location: "Campus Innovation Exhibition",
    type: "Project Expo",
    icon: "🏆",
    desc: "Showcased practical engineering solutions and data-driven systems to academic evaluators and industry judges.",
  },
  {
    id: "hackwarriors",
    title: "IFET Hack Warriors'26",
    organization: "IFET College of Engineering",
    location: "24-Hour National Level Hackathon",
    type: "Hackathon",
    icon: "⚡",
    desc: "24-hour sprint designing, building, and deploying software under strict time constraints in a high-intensity hackathon.",
  },
  {
    id: "hackindia",
    title: "HackIndia 2026",
    organization: "HackIndia",
    location: "National Web3 & AI Hackathon",
    type: "Hackathon",
    icon: "🚀",
    desc: "National-scale competitive hackathon collaborating on cutting-edge Web3 and AI-driven software architectures.",
  },
  {
    id: "tableau",
    title: "Visual Insights: Data Storytelling with Python & Tableau",
    organization: "ISTE Student Chapter, IFET College of Engineering",
    location: "Hands-on Workshop",
    type: "Workshop",
    icon: "📊",
    desc: "Intensive training on translating complex datasets into interactive dashboards and compelling business intelligence narratives.",
  },
  {
    id: "webdev",
    title: "Web Development Workshop",
    organization: "Top Engineers India",
    location: "IIT Madras Research Park",
    type: "Workshop",
    icon: "🌐",
    desc: "Hands-on technical workshop covering client-server architecture, responsive styling, and modern web application development.",
  },
];

export const Certifications: React.FC = () => {
  return (
    <section className="section" id="certifications">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">06 · Certifications &amp; Achievements</div>
          <h2 className="section-title">Certifications &amp; Awards</h2>
          <p className="section-sub">
            Professional credentials, recognized courses, hackathons, and project expos verified from my resume.
          </p>
        </div>

        <div className="cert-achievements-container">
          {/* Left Column: Certifications */}
          <div className="cert-column">
            <h3 className="cert-column-title">
              <span>📜</span> Professional Credentials ({CERTS_DATA.length})
            </h3>
            <div className="cert-stack">
              {CERTS_DATA.map((cert) => (
                <div key={cert.id} className="cert-card glass">
                  <div className="cert-card-header">
                    <div className="cert-icon">{cert.code}</div>
                    <div className="cert-info">
                      <div className="cert-name">{cert.name}</div>
                      <div className="cert-issuer">{cert.issuer}</div>
                    </div>
                  </div>
                  <div className="cert-desc">{cert.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Achievements & Workshops */}
          <div className="cert-column" id="workshops">
            <h3 className="cert-column-title">
              <span>🏆</span> Workshops &amp; Hackathons ({EVENTS_DATA.length})
            </h3>
            <div className="cert-stack">
              {EVENTS_DATA.map((evt) => (
                <div key={evt.id} className="cert-card glass">
                  <div className="cert-card-header">
                    <div className="cert-icon award">{evt.icon}</div>
                    <div className="cert-info">
                      <div className="cert-name">{evt.title}</div>
                      <div className="cert-issuer">
                        {evt.organization} {evt.location ? `· ${evt.location}` : ""}
                      </div>
                    </div>
                  </div>
                  <div className="cert-desc">{evt.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

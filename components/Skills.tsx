"use client";

import React from "react";

interface SkillCategory {
  category: string;
  items: {
    name: string;
    pct: number;
    used: string;
    learning?: boolean;
  }[];
}

const SKILLS_DATA: SkillCategory[] = [
  {
    category: "Programming & Languages",
    items: [
      { name: "Python", pct: 92, used: "Data Analysis, ML Models & Flask Backends" },
      { name: "SQL", pct: 90, used: "Relational Queries & SQLite Database Management" },
      { name: "C", pct: 82, used: "Data Structures & Algorithmic Foundations" },
      { name: "Java", pct: 80, used: "Object-Oriented Programming Paradigms" },
    ],
  },
  {
    category: "Data & Analytics",
    items: [
      { name: "Data Visualization", pct: 88, used: "Visual Storytelling, Charts & Dashboards" },
      { name: "Excel", pct: 85, used: "Analytical Problem Solving & Data Auditing" },
    ],
  },
  {
    category: "AI & Machine Learning",
    items: [
      { name: "AI / ML", pct: 88, used: "Predictive Modeling & Model Development" },
      { name: "NLP", pct: 84, used: "Text Processing & Question Classification" },
    ],
  },
  {
    category: "Web & Database Management",
    items: [
      { name: "Database Management", pct: 86, used: "Schema Design, Data Integrity & Persistence" },
      { name: "Full Stack Development", pct: 88, used: "EduNavigator, FixBox & TeamUp AI" },
      { name: "Web Development", pct: 86, used: "Client-Server Architecture & Dynamic Interfaces" },
      { name: "HTML", pct: 92, used: "Accessible Semantic Web Structure" },
      { name: "CSS", pct: 90, used: "Modern Glassmorphism & Responsive Layouts" },
    ],
  },
  {
    category: "Professional Skills",
    items: [
      { name: "Analytical Problem Solving", pct: 92, used: "Transforming Complex Data into Business Solutions" },
      { name: "Communication", pct: 90, used: "Cross-Functional Collaboration & Technical Presentation" },
    ],
  },
];

export const Skills: React.FC = () => {
  return (
    <section className="section" id="skills">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">03 · Technical Skills</div>
          <h2 className="section-title">My Technical Stack</h2>
          <p className="section-sub">
            A structured breakdown of the programming languages, data analytics tools, and AI technologies verified from my resume.
          </p>
        </div>

        <div className="skills-cats">
          {SKILLS_DATA.map((catGroup) => (
            <div key={catGroup.category} className="skill-cat-reveal">
              <div className="skill-cat-label">{catGroup.category}</div>
              <div className="skill-row">
                {catGroup.items.map((skill) => (
                  <div key={skill.name} className="skill-item glass">
                    <div className="skill-item-top">
                      <span className="skill-name">{skill.name}</span>
                      {skill.learning ? (
                        <span className="learning-badge">Active</span>
                      ) : (
                        <span className="skill-pct">{skill.pct}%</span>
                      )}
                    </div>
                    <div className="skill-bar">
                      <div
                        className="skill-bar-fill"
                        style={{ width: `${skill.pct}%` }}
                      />
                    </div>
                    <div className="skill-used">Used in: {skill.used}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

"use client";

import React, { useState } from "react";

interface ExpertiseItem {
  id: string;
  title: string;
  desc: string;
  tech: string[];
  project: string;
  learning?: boolean;
}

const EXPERTISE_DATA: ExpertiseItem[] = [
  {
    id: "data-analytics",
    title: "Data Analytics & SQL",
    desc: "Extracting insights, auditing datasets, and supporting business decisions with SQL and Python.",
    tech: ["Python", "SQL", "Pandas", "Data Cleaning", "Analytical Problem Solving"],
    project: "NextGen Technologies & FixBox Platform",
  },
  {
    id: "ai-ml",
    title: "Machine Learning & AI",
    desc: "Developing predictive models, data preprocessing, and algorithm evaluation.",
    tech: ["Machine Learning", "scikit-learn", "Model Development", "Predictive ML", "Data Preprocessing"],
    project: "Languify Internship & TwinSync Digital Twin",
  },
  {
    id: "gen-ai",
    title: "Generative AI & NLP",
    desc: "Prompt engineering, task delegation with Google Gemini, and text classification.",
    tech: ["Google Gemini API", "Prompt Engineering", "NLP", "Contextual AI Tutor", "IBM AI Certified"],
    project: "TeamUp AI & EduNavigator Exam Engine",
  },
  {
    id: "full-stack",
    title: "Full-Stack Development",
    desc: "Architecting end-to-end web applications with Flask, SQLite, and responsive frontends.",
    tech: ["Python", "Flask", "SQLite", "HTML", "CSS", "JavaScript"],
    project: "EduNavigator, FixBox & TeamUp AI",
  },
  {
    id: "visualization",
    title: "Data Visualization & BI",
    desc: "Designing dashboards in Tableau and communicating actionable insights to stakeholders.",
    tech: ["Tableau", "Data Visualization", "Excel", "Storytelling", "ISTE Certified"],
    project: "NextGen Technologies Dashboard & ISTE Workshop",
  },
];

export const Expertise: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>("data-analytics");

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="section" id="expertise">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">02 · Core Expertise</div>
          <h2 className="section-title">Core Focus Areas</h2>
          <p className="section-sub">
            The primary domains I specialize in, spanning analytical problem-solving to intelligent full-stack software. Click any area to explore details.
          </p>
        </div>

        <div className="expertise-grid" id="expertiseGrid">
          {EXPERTISE_DATA.map((item, idx) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={`exp-card glass ${isOpen ? "open" : ""}`}
                onClick={() => toggleItem(item.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    toggleItem(item.id);
                  }
                }}
              >
                <div className="exp-card-head">
                  <div>
                    <div className="exp-index">
                      {String(idx + 1).padStart(2, "0")} /0{EXPERTISE_DATA.length}
                    </div>
                    <div className="exp-title">
                      {item.title}
                      {item.learning && (
                        <span className="learning-badge">Active</span>
                      )}
                    </div>
                    <div className="exp-desc">{item.desc}</div>
                  </div>
                  <div className="exp-toggle" aria-hidden="true">
                    +
                  </div>
                </div>

                <div className="exp-body">
                  <div className="exp-chips">
                    {item.tech.map((t) => (
                      <span key={t} className="chip">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="exp-project-tag">
                    → Applied in: {item.project}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

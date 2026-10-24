"use client";

import React, { useState } from "react";
import { EXPERIENCES, EDUCATION_DATA } from "@/lib/constants";

interface TimelineEntry {
  id: string;
  type: "internship" | "education";
  date: string;
  title: string;
  institutionOrCompany: string;
  desc: string;
  tags: string[];
}

const TIMELINE_DATA: TimelineEntry[] = [
  {
    id: "nextgen",
    type: "internship",
    date: "Feb 2025 (15 Days) · Remote / Hybrid",
    title: "Data Analytics Intern",
    institutionOrCompany: "NextGen Technologies Pvt. Ltd.",
    desc: "Performed end-to-end data analysis and developed predictive ML models using Python (Pandas, scikit-learn). Created interactive dashboards in Tableau to communicate data-driven insights to stakeholders.",
    tags: ["Python", "Pandas", "scikit-learn", "Tableau", "Data Analysis", "Predictive ML"],
  },
  {
    id: "languify",
    type: "internship",
    date: "Aug 2024 - Sep 2024 · Online",
    title: "Artificial Intelligence with Python Intern",
    institutionOrCompany: "Languify (Powered by Coincent)",
    desc: "Worked with Python to analyze diverse datasets and implement machine learning techniques. Gained hands-on experience in data preprocessing, model development, and data-driven problem solving.",
    tags: ["Python", "Machine Learning", "Data Preprocessing", "Model Development", "Data-driven Solutions"],
  },
  {
    id: "ifet",
    type: "education",
    date: "2023 — 2027 · Villupuram, Tamil Nadu",
    title: "B.Tech, Artificial Intelligence and Data Science",
    institutionOrCompany: "IFET College of Engineering",
    desc: "CGPA: 8.9 / 10. Rigorous academic curriculum covering Python, SQL, Relational Database Management Systems, Machine Learning algorithms, and Full-Stack systems.",
    tags: ["B.Tech AI & DS", "CGPA: 8.9", "Autonomous Institution", "Batch 2023-2027"],
  },
  {
    id: "hsc",
    type: "education",
    date: "2022 — 2023 · Neyveli, Tamil Nadu",
    title: "HSC — Computer Science",
    institutionOrCompany: "St. Joseph Of Cluny Matriculation Higher Secondary School",
    desc: "Completed Higher Secondary Certificate with 81% marks, concentrating in Computer Science, Mathematics, Physics, and Chemistry.",
    tags: ["HSC Computer Science", "Score: 81%", "Cluny School", "Neyveli"],
  },
  {
    id: "sslc",
    type: "education",
    date: "2020 — 2021 · Neyveli, Tamil Nadu",
    title: "SSLC",
    institutionOrCompany: "St. Joseph Of Cluny Matriculation Higher Secondary School",
    desc: "Completed Secondary School Leaving Certificate (SSLC) foundational education with First Class Pass.",
    tags: ["SSLC", "All Pass", "Cluny School", "Neyveli"],
  },
];

export const Experience: React.FC = () => {
  const [filter, setFilter] = useState<"all" | "internship" | "education">("all");

  const filteredTimeline = TIMELINE_DATA.filter(
    (item) => filter === "all" || item.type === filter
  );

  return (
    <section className="section" id="experience">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">05 · Experience</div>
          <h2 className="section-title">Work &amp; Education</h2>
          <p className="section-sub">
            A chronological timeline of my professional internships, academic achievements, and engineering milestones verified from my resume.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex gap-2 mb-10">
          <button
            onClick={() => setFilter("all")}
            className={`chip cursor-pointer transition-all ${
              filter === "all" ? "!bg-[#ff3b30] !text-white !border-[#ff3b30]" : ""
            }`}
          >
            All Milestones ({TIMELINE_DATA.length})
          </button>
          <button
            onClick={() => setFilter("internship")}
            className={`chip cursor-pointer transition-all ${
              filter === "internship" ? "!bg-[#ff3b30] !text-white !border-[#ff3b30]" : ""
            }`}
          >
            Internships ({EXPERIENCES.length})
          </button>
          <button
            onClick={() => setFilter("education")}
            className={`chip cursor-pointer transition-all ${
              filter === "education" ? "!bg-[#ff3b30] !text-white !border-[#ff3b30]" : ""
            }`}
          >
            Education ({EDUCATION_DATA.length})
          </button>
        </div>

        <div className="timeline" id="timelineList">
          {filteredTimeline.map((item) => (
            <div key={item.id} className="tl-item">
              <div className="tl-dot" />
              <div className="tl-date">{item.date}</div>
              <div className="tl-title">
                {item.title} —{" "}
                <span style={{ color: "var(--text-secondary)", fontWeight: 400 }}>
                  {item.institutionOrCompany}
                </span>
              </div>
              <div className="tl-desc">{item.desc}</div>
              <div className="tl-tags">
                {item.tags.map((tag) => (
                  <span key={tag} className="chip">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

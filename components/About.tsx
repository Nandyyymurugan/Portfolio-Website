"use client";

import React, { useEffect, useState, useRef } from "react";
import { PERSONAL_INFO, SOCIAL_LINKS, PROJECTS } from "@/lib/constants";
import { useInView } from "framer-motion";
import { useTilt3D } from "@/hooks/useTilt3D";

function StatCounter({
  target,
  decimals = 0,
  suffix = "",
}: {
  target: number;
  decimals?: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!inView) return;

    let startTime: number;
    const duration = 1500;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(ease * target);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(animate);
  }, [inView, target]);

  return (
    <div ref={ref} className="stat-num">
      {count.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </div>
  );
}

export const About: React.FC = () => {
  const tiltProfileRef = useTilt3D<HTMLDivElement>(0.02);

  return (
    <section className="section" id="about">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">01 · About</div>
          <h2 className="section-title">Hey, I&apos;m Nanthini Murugan.</h2>
          <p className="section-sub">
            Aspiring Data Analyst with a strong foundation in Python, SQL, data visualization, and analytical problem-solving.
          </p>
        </div>

        <div className="about-grid">
          {/* Left Sticky Profile Card with 3D Tilt */}
          <div className="profile-card glass" ref={tiltProfileRef}>
            <div className="profile-avatar">NM</div>
            <h3>Nanthini Murugan</h3>
            <div className="role">Data Analyst · AI &amp; Data Science Student</div>
            <div className="profile-status">
              <i /> AVAILABLE FOR ROLES
            </div>
            <div className="profile-links">
              <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn <span>↗</span>
              </a>
              <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer">
                GitHub <span>↗</span>
              </a>
              <a href={PERSONAL_INFO.resumePath} target="_blank" rel="noopener noreferrer">
                Resume <span>↗</span>
              </a>
              <a href={`mailto:${PERSONAL_INFO.email}`}>
                Email <span>↗</span>
              </a>
            </div>
          </div>

          {/* Right Narrative & Stats */}
          <div className="about-copy">
            <p>
              I focus on turning raw datasets into actionable intelligence and strategic business insights. With hands-on experience in <strong>Python, SQL, Machine Learning, and Data Visualization</strong>, I develop analytical solutions and full-stack platforms that solve complex operational challenges.
            </p>

            <div className="philosophy">
              &quot;I focus on bridging the gap between raw data pipelines and intelligent software systems — transforming complex datasets into clear, actionable insights for strategic decision-making.&quot;
            </div>

            <p>
              Currently, I am pursuing my <strong>Bachelor of Technology in Artificial Intelligence and Data Science</strong> at <strong>IFET College of Engineering</strong> (2023–2027, CGPA 8.9). Alongside my coursework, I have completed internships at <strong>Languify</strong> (AI with Python) and <strong>NextGen Technologies</strong> (Data Analytics), and engineered {PROJECTS.length} core projects including <strong>EduNavigator</strong> (AI career guidance with 10K+ questions) and <strong>TeamUp AI</strong>.
            </p>

            {/* 5-Cell Hairline Stats Grid */}
            <div className="stats-grid">
              <div className="stat-cell">
                <StatCounter target={PROJECTS.length} />
                <div className="stat-label">Projects</div>
              </div>
              <div className="stat-cell">
                <StatCounter target={15} />
                <div className="stat-label">Core Skills</div>
              </div>
              <div className="stat-cell">
                <StatCounter target={2} />
                <div className="stat-label">Internships</div>
              </div>
              <div className="stat-cell">
                <StatCounter target={8.9} decimals={1} />
                <div className="stat-label">CGPA</div>
              </div>
              <div className="stat-cell">
                <StatCounter target={2027} />
                <div className="stat-label">Graduation</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

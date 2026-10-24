"use client";

import React from "react";
import { motion } from "framer-motion";
import { EDUCATION_DATA } from "@/lib/constants";
import { SectionHeading } from "./ui/SectionHeading";
import { GlassCard } from "./ui/GlassCard";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { GraduationCap, Calendar, Award } from "lucide-react";

export const Education: React.FC = () => {
  return (
    <section id="education" className="relative py-20 md:py-28 overflow-hidden bg-slate-950/40">
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Academic Background"
          title="Education"
          subtitle="Exact educational background and academic scores from resume."
        />

        <div className="relative mt-12">
          {/* Vertical timeline line */}
          <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 bg-gradient-to-b from-indigo-500 via-cyan-500 to-slate-800" />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="flex flex-col gap-10 sm:gap-12"
          >
            {EDUCATION_DATA.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={item.id}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? "sm:flex-row-reverse" : ""
                  }`}
                >
                  {/* Central Node Indicator */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center w-8 h-8 rounded-full bg-slate-900 border-2 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.6)]">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-300" />
                  </div>

                  {/* Spacer for two-sided alignment */}
                  <div className="hidden sm:block sm:w-1/2" />

                  {/* Timeline Card */}
                  <motion.div
                    variants={fadeInUp}
                    className="pl-12 sm:pl-0 sm:w-1/2 sm:px-8 w-full"
                  >
                    <GlassCard
                      glow="indigo"
                      className="p-6 border-white/10 hover:border-cyan-400/40 transition-all duration-300"
                    >
                      {/* Top Header Badge */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-300 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                          <Calendar size={13} />
                          {item.period}
                        </span>

                        <div className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                          <Award size={13} />
                          <span>{item.scoreLabel}: {item.score}</span>
                        </div>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-white mb-1.5">
                        {item.degree}
                      </h3>

                      <div className="flex items-center gap-2 text-sm font-medium text-slate-300">
                        <GraduationCap size={16} className="text-cyan-400" />
                        <span>{item.institution}</span>
                      </div>
                    </GlassCard>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

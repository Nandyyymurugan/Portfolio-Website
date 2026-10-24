"use client";

import React from "react";
import { motion } from "framer-motion";
import { WORKSHOPS_AND_EVENTS } from "@/lib/constants";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Trophy, Presentation, Lightbulb, MapPin, Building2, Sparkles, Calendar } from "lucide-react";

const eventIcons: Record<string, React.ElementType> = {
  Workshop: Presentation,
  Hackathon: Trophy,
  "Project Expo": Lightbulb,
};

const badgeStyles: Record<string, string> = {
  Workshop: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
  Hackathon: "bg-violet-500/10 text-violet-300 border-violet-500/30",
  "Project Expo": "bg-purple-500/10 text-purple-300 border-purple-500/30",
};

export const Workshops: React.FC = () => {
  return (
    <section id="events" className="relative py-24 md:py-32 overflow-hidden bg-[#070A12]">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Pill */}
        <div className="flex items-center gap-2 mb-6">
          <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
          <span className="text-xs font-mono font-bold tracking-widest text-violet-300 uppercase">
            HACKATHONS &amp; WORKSHOPS // COMMUNITY
          </span>
        </div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mb-16 max-w-3xl"
        >
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Hackathons, Expos &amp; Technical Workshops
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            Intensive 24-hour national hackathons, innovation exhibitions, and data storytelling workshops.
          </p>
        </motion.div>

        {/* Dynamic Event Grid with Animated Markers */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {WORKSHOPS_AND_EVENTS.map((event, idx) => {
            const Icon = eventIcons[event.type] || Presentation;
            const badgeClass = badgeStyles[event.type] || badgeStyles.Workshop;

            return (
              <motion.div
                key={event.id}
                variants={fadeInUp}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="group relative p-6 sm:p-7 rounded-3xl bg-[#101827]/80 border border-white/[0.08] backdrop-blur-xl hover:border-violet-500/40 hover:shadow-[0_10px_35px_-5px_rgba(139,92,246,0.15)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium border ${badgeClass}`}>
                      <Icon size={14} />
                      <span>{event.type}</span>
                    </span>

                    <span className="text-[11px] font-mono text-slate-500">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white mb-2 leading-snug group-hover:text-cyan-200 transition-colors">
                    {event.title}
                  </h3>
                </div>

                <div className="pt-4 border-t border-white/5 space-y-1.5 text-xs text-slate-400 font-mono">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Building2 size={13} className="text-violet-400 shrink-0" />
                    <span>{event.organization}</span>
                  </div>
                  {event.location && (
                    <div className="flex items-center gap-2 text-slate-400">
                      <MapPin size={13} className="text-cyan-400 shrink-0" />
                      <span>{event.location}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

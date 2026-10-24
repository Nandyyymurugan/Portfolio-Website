"use client";

import React from "react";
import { SOCIAL_LINKS } from "@/lib/constants";
import { Mail } from "lucide-react";

// Crisp SVG Brand Icons
export const GithubIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 18,
  className = "",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export const LinkedinIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 18,
  className = "",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const YoutubeIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 18,
  className = "",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <polygon points="10 15 15 12 10 9 10 15" fill="currentColor" />
  </svg>
);

interface SocialLinksProps {
  className?: string;
  iconSize?: number;
  showLabels?: boolean;
}

export const SocialLinks: React.FC<SocialLinksProps> = ({
  className = "",
  iconSize = 18,
  showLabels = false,
}) => {
  const links = [
    {
      name: "LinkedIn",
      href: SOCIAL_LINKS.linkedin,
      icon: LinkedinIcon,
      label: "View LinkedIn Profile",
      available: Boolean(SOCIAL_LINKS.linkedin),
    },
    {
      name: "GitHub",
      href: SOCIAL_LINKS.github,
      icon: GithubIcon,
      label: "View GitHub Profile",
      available: Boolean(SOCIAL_LINKS.github),
    },
    {
      name: "Email",
      href: SOCIAL_LINKS.email,
      icon: Mail,
      label: "Send Email",
      available: Boolean(SOCIAL_LINKS.email),
    },
    ...(SOCIAL_LINKS.youtube
      ? [
          {
            name: "YouTube",
            href: SOCIAL_LINKS.youtube,
            icon: YoutubeIcon,
            label: "View YouTube Channel",
            available: true,
          },
        ]
      : []),
  ];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {links.map((link) => {
        const IconComponent = link.icon;
        return (
          <a
            key={link.name}
            href={link.href}
            target={link.name !== "Email" ? "_blank" : undefined}
            rel={link.name !== "Email" ? "noopener noreferrer" : undefined}
            aria-label={link.label}
            className="group relative flex items-center gap-2 p-2.5 rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:text-white hover:border-cyan-400/40 hover:bg-white/10 hover:shadow-[0_0_15px_-3px_rgba(6,182,212,0.4)] transition-all duration-300"
          >
            <IconComponent size={iconSize} className="transition-transform duration-300 group-hover:scale-110" />
            {showLabels && (
              <span className="text-xs font-medium tracking-wide">{link.name}</span>
            )}
            <span className="sr-only">{link.name}</span>
          </a>
        );
      })}
    </div>
  );
};

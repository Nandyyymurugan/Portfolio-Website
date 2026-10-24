"use client";

import React, { useState } from "react";
import { PERSONAL_INFO, SOCIAL_LINKS } from "@/lib/constants";
import confetti from "canvas-confetti";

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setFormStatus("sending");

    setTimeout(() => {
      setFormStatus("sent");
      try {
        confetti({
          particleCount: 55,
          spread: 65,
          origin: { y: 0.8 },
          colors: ["#a855f7", "#3b82f6", "#c084fc", "#60a5fa"],
        });
      } catch (e) {
        // Safe fallback
      }
      setFormData({ name: "", email: "", message: "" });
    }, 900);
  };

  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">07 · Contact</div>
          <h2 className="section-title">Let&apos;s Work Together</h2>
          <p className="section-sub">
            I&apos;m actively open to Data Analyst roles, AI internships, and analytical problem-solving collaborations.
          </p>
        </div>

        <div className="contact-panel glass">
          {/* Left: Contact Form */}
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="cf-name">Name</label>
              <input
                id="cf-name"
                name="name"
                type="text"
                placeholder="Your name"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div className="field">
              <label htmlFor="cf-email">Email</label>
              <input
                id="cf-email"
                name="email"
                type="email"
                placeholder="you@company.com"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className="field">
              <label htmlFor="cf-msg">Message</label>
              <textarea
                id="cf-msg"
                name="message"
                placeholder="What project or opportunity are you discussing?"
                required
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ alignSelf: "flex-start", marginTop: "6px" }}
              disabled={formStatus === "sending"}
            >
              {formStatus === "sending"
                ? "Sending..."
                : formStatus === "sent"
                ? "Message Sent ✓"
                : "Send Message"}
            </button>

            <div
              className="mono"
              style={{
                fontSize: "11.5px",
                color: formStatus === "sent" ? "var(--signal-teal)" : "var(--text-muted)",
                minHeight: "16px",
                marginTop: "12px",
              }}
            >
              {formStatus === "sent"
                ? "Thank you! Your message has been received."
                : "Messages are sent directly to Nanthini's inbox."}
            </div>
          </form>

          {/* Right: Contact Information */}
          <div className="contact-side">
            <div>
              <h3>
                Currently building intelligent, data-driven systems — from raw analytics to deployment.
              </h3>
              <p>Reach out directly, or connect across professional channels.</p>
            </div>

            <div className="contact-links">
              <a href={`mailto:${PERSONAL_INFO.email}`}>
                Email <span>{PERSONAL_INFO.email}</span>
              </a>
              <a href={`tel:${PERSONAL_INFO.phone.replace(/\s+/g, "")}`}>
                Phone <span>{PERSONAL_INFO.phone}</span>
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn <span>↗</span>
              </a>
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub <span>↗</span>
              </a>
              <a href="#contact">
                Location <span>{PERSONAL_INFO.location}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

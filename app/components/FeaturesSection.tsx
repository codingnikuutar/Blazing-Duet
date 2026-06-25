"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const features = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#C8A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="16" cy="16" r="12" />
        <circle cx="16" cy="16" r="4" />
        <line x1="16" y1="4" x2="16" y2="8" />
        <line x1="16" y1="24" x2="16" y2="28" />
        <line x1="4" y1="16" x2="8" y2="16" />
        <line x1="24" y1="16" x2="28" y2="16" />
      </svg>
    ),
    label: "Perpetual Movement",
    copy: "The self-winding Calibre 3255 winds itself via the natural motion of the wrist, never requiring manual intervention.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#C8A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 4 L28 10 L28 22 L16 28 L4 22 L4 10 Z" />
        <path d="M16 10 L22 13 L22 19 L16 22 L10 19 L10 13 Z" />
      </svg>
    ),
    label: "Everose Gold",
    copy: "Rolex's proprietary rose gold alloy resists fading and tarnishing far beyond conventional 18 ct formulations.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#C8A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 16 C6 10 10 6 16 6 C22 6 26 10 26 16" />
        <path d="M6 16 C6 22 10 26 16 26 C22 26 26 22 26 16" />
        <path d="M8 20 Q16 28 24 20" />
        <circle cx="16" cy="16" r="2" />
      </svg>
    ),
    label: "Oyster Waterproofing",
    copy: "The Oyster case is hermetically sealed to 100 metres, protecting the movement from water, dust, and pressure.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#C8A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="12" width="20" height="14" rx="2" />
        <path d="M10 12 L10 9 Q10 4 16 4 Q22 4 22 9 L22 12" />
        <rect x="13" y="17" width="6" height="4" rx="1" />
      </svg>
    ),
    label: "President Bracelet",
    copy: "Three semi-circular links forged in solid Everose gold deliver an unmistakable silhouette on the wrist — fluid, architectural, timeless.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#C8A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6,20 12,14 17,19 26,10" />
        <path d="M22 10 L26 10 L26 14" />
        <line x1="6" y1="26" x2="26" y2="26" />
      </svg>
    ),
    label: "Superlative Chronometer",
    copy: "Certified by COSC and Rolex's own in-house standards, the movement operates within ±2 seconds per day — five times more precise than COSC alone.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#C8A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="12" y="8" width="12" height="10" rx="5" />
        <circle cx="18" cy="13" r="3" />
        <rect x="6" y="18" width="20" height="8" rx="2" />
        <line x1="18" y1="18" x2="18" y2="22" />
      </svg>
    ),
    label: "Cyclops Date",
    copy: "A magnifying Cyclops lens over the date aperture doubles its apparent size, making the calendar instantly legible at a glance.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0, 0, 1] } },
};

export default function FeaturesSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section
      id="collection"
      ref={ref}
      style={{
        background: "#000",
        padding: "clamp(5rem, 10vw, 9rem) clamp(1.5rem, 6vw, 6rem)",
      }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.span
          variants={itemVariants}
          style={{
            display: "block",
            fontFamily: "var(--font-inter)",
            fontSize: "0.65rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#C8A96E",
            marginBottom: "1rem",
          }}
        >
          Crafted Without Compromise
        </motion.span>

        <motion.h2
          variants={itemVariants}
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            fontWeight: 400,
            marginBottom: "4rem",
            maxWidth: "560px",
            lineHeight: 1.15,
          }}
        >
          Every detail. Deliberate.
        </motion.h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "2.5rem 3rem",
          }}
        >
          {features.map((f) => (
            <motion.div key={f.label} variants={itemVariants}>
              <div
                style={{
                  borderTop: "1px solid rgba(200,169,110,0.2)",
                  paddingTop: "1.6rem",
                }}
              >
                <div style={{ marginBottom: "1rem" }}>{f.icon}</div>
                <h3
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.78rem",
                    fontWeight: 500,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#fff",
                    marginBottom: "0.6rem",
                  }}
                >
                  {f.label}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontWeight: 300,
                    fontSize: "0.9rem",
                    color: "#E5E5E5",
                    lineHeight: 1.7,
                  }}
                >
                  {f.copy}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

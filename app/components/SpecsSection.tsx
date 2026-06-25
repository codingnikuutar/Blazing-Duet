"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const specs = [
  { label: "Reference No.", value: "228235" },
  { label: "Case Diameter", value: "40 mm" },
  { label: "Case Material", value: "Everose gold (proprietary 18 ct alloy)" },
  { label: "Movement", value: "Calibre 3255 — self-winding Perpetual" },
  { label: "Power Reserve", value: "Approximately 70 hours" },
  { label: "Accuracy", value: "±2 sec / day (Superlative Chronometer)" },
  { label: "Crystal", value: "Scratch-resistant sapphire, Cyclops lens at 3 o'clock" },
  { label: "Water Resistance", value: "100 metres / 330 feet" },
  { label: "Dial", value: "Chocolate sunburst, set diamond hour markers" },
  { label: "Bracelet", value: "President, three-piece semi-circular links, Everose gold" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const rowVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0, 0, 1] } },
};

export default function SpecsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section
      ref={ref}
      style={{
        background: "#000",
        padding: "clamp(5rem, 10vw, 9rem) clamp(1.5rem, 6vw, 6rem)",
        borderTop: "1px solid rgba(200,169,110,0.12)",
      }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        style={{ maxWidth: "860px" }}
      >
        <motion.span
          variants={rowVariants}
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
          Technical Specifications
        </motion.span>

        <motion.h2
          variants={rowVariants}
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            fontWeight: 400,
            marginBottom: "3.5rem",
            lineHeight: 1.15,
          }}
        >
          The architecture of precision.
        </motion.h2>

        <div>
          {specs.map((s) => (
            <motion.div
              key={s.label}
              variants={rowVariants}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1.6fr",
                gap: "1rem 2rem",
                padding: "1.1rem 0",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
                alignItems: "baseline",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.72rem",
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#C8A96E",
                }}
              >
                {s.label}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 300,
                  fontSize: "0.92rem",
                  color: "#E5E5E5",
                  lineHeight: 1.6,
                }}
              >
                {s.value}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

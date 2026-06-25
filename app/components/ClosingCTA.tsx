"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0, 0, 1] } },
};

export default function ClosingCTA() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section
      ref={ref}
      style={{
        background: "#000",
        padding: "clamp(6rem, 12vw, 11rem) clamp(1.5rem, 6vw, 6rem)",
        textAlign: "center",
        borderTop: "1px solid rgba(200,169,110,0.12)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* radial glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center 70%, rgba(200,169,110,0.10) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        style={{ position: "relative", zIndex: 1 }}
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
            marginBottom: "1.4rem",
          }}
        >
          Yours to Command
        </motion.span>

        <motion.h2
          variants={itemVariants}
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(2.2rem, 5vw, 4.5rem)",
            fontWeight: 400,
            lineHeight: 1.15,
            marginBottom: "1.8rem",
          }}
        >
          A century of mastery.
          <br />
          <em style={{ color: "#E5E5E5", fontStyle: "italic" }}>
            One expression of it.
          </em>
        </motion.h2>

        <motion.p
          variants={itemVariants}
          style={{
            fontFamily: "var(--font-inter)",
            fontWeight: 300,
            fontSize: "1rem",
            color: "#E5E5E5",
            maxWidth: "480px",
            margin: "0 auto 2.8rem",
            lineHeight: 1.7,
          }}
        >
          The Day-Date 40 in Everose gold is available exclusively through
          Rolex's network of Official Retailers. Speak with an expert to begin
          your journey.
        </motion.p>

        <motion.div variants={itemVariants}>
          <motion.a
            href="#retailer"
            whileHover={{
              backgroundColor: "#000",
              color: "#C8A96E",
              transition: { duration: 0.22 },
            }}
            style={{
              display: "inline-block",
              background: "#C8A96E",
              color: "#000",
              fontFamily: "var(--font-inter)",
              fontWeight: 500,
              fontSize: "0.7rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              padding: "0.9rem 2.6rem",
              textDecoration: "none",
              border: "1px solid #C8A96E",
            }}
          >
            Find an Authorised Retailer
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

/**
 * Frame sources for the scroll-driven scrub.
 *
 * LOCAL mode (production): extract frames from hero.mp4 with
 *   ffmpeg -i public/hero.mp4 -vf "fps=24,scale=1920:-1" -q:v 3 "public/frames/frame_%04d.jpg"
 * then set FRAME_MODE to "local" and LOCAL_FRAME_COUNT to the actual count.
 *
 * REMOTE mode (current): uses the Higgsfield CDN images directly in the browser.
 * hero.mp4: https://d8j0ntlcm91z4.cloudfront.net/user_3FdJ9O1M38AiRMxHAprUmX5e5g6/hf_20260626_015643_f1b97aaa-aaec-47ed-bde3-54d46154f58f.mp4
 */
const FRAME_MODE = "remote" as "remote" | "local";

const REMOTE_FRAMES = [
  "https://d8j0ntlcm91z4.cloudfront.net/user_3FdJ9O1M38AiRMxHAprUmX5e5g6/hf_20260625_145912_6e456c35-5857-4fe7-ab89-b9f3e0d85a03.png",
  "https://d8j0ntlcm91z4.cloudfront.net/user_3FdJ9O1M38AiRMxHAprUmX5e5g6/hf_20260625_150004_c09c9491-01cd-4ed3-b69d-a581ba02328f.png",
];

const LOCAL_FRAME_COUNT = 240;
const pad = (n: number) => String(n).padStart(4, "0");
const LOCAL_FRAMES = Array.from(
  { length: LOCAL_FRAME_COUNT },
  (_, i) => `/frames/frame_${pad(i + 1)}.jpg`
);

const FRAMES = FRAME_MODE === "local" ? LOCAL_FRAMES : REMOTE_FRAMES;
const FRAME_COUNT = FRAMES.length;

function coverFit(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  cw: number,
  ch: number
) {
  const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
  const sw = img.naturalWidth * scale;
  const sh = img.naturalHeight * scale;
  const ox = (cw - sw) / 2;
  const oy = (ch - sh) / 2;
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, cw, ch);
  ctx.drawImage(img, ox, oy, sw, sh);
}

export default function ScrollHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let currentIdx = 0;
    let rafId = 0;
    const images: HTMLImageElement[] = [];
    let loaded = 0;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = "100vw";
      canvas.style.height = "100vh";
      ctx!.scale(dpr, dpr);
      if (images[currentIdx]?.complete) {
        coverFit(ctx!, images[currentIdx], window.innerWidth, window.innerHeight);
      }
    }

    function draw(idx: number) {
      const img = images[idx];
      if (!img?.complete || !img.naturalWidth) return;
      coverFit(ctx!, img, window.innerWidth, window.innerHeight);
      currentIdx = idx;
    }

    function tick() {
      if (container) {
        const top = container.getBoundingClientRect().top;
        const scrollable = container.offsetHeight - window.innerHeight;
        const progress = scrollable > 0 ? Math.max(0, Math.min(1, -top / scrollable)) : 0;
        const target = Math.round(progress * (FRAME_COUNT - 1));
        if (target !== currentIdx) draw(target);
      }
      rafId = requestAnimationFrame(tick);
    }

    resize();
    window.addEventListener("resize", resize);

    FRAMES.forEach((src, i) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = src;
      images[i] = img;
      img.onload = () => {
        loaded++;
        if (i === 0) draw(0);
      };
    });

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div ref={containerRef} style={{ height: "300vh", position: "relative" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          background: "#000",
        }}
      >
        <canvas ref={canvasRef} style={{ display: "block" }} />

        {/* gradient behind overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.35) 50%, transparent 100%)",
            pointerEvents: "none",
          }}
        />

        {/* text overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "clamp(2rem, 5vw, 5rem)",
          }}
        >
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.9, ease: "easeOut" }}
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.65rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#C8A96E",
              display: "block",
              marginBottom: "1rem",
            }}
          >
            Est. 1905 · Geneva
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.9, ease: "easeOut" }}
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(2.4rem, 6vw, 5.5rem)",
              fontWeight: 400,
              lineHeight: 1.1,
              marginBottom: "1.2rem",
              maxWidth: "680px",
            }}
          >
            Day‑Date 40
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.9, ease: "easeOut" }}
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 300,
              fontSize: "1.05rem",
              color: "#E5E5E5",
              maxWidth: "460px",
              lineHeight: 1.65,
              marginBottom: "2rem",
            }}
          >
            Forged in Everose gold, driven by an in-house Perpetual movement —
            an icon refined over a century of uncompromising craft.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.25, duration: 0.9, ease: "easeOut" }}
          >
            <a
              href="#collection"
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
                pointerEvents: "auto",
              }}
            >
              Explore Collection
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

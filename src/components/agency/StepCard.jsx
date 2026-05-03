import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const SANS = "'Inter', system-ui, -apple-system, sans-serif";
const MONO = "'JetBrains Mono', 'Fira Code', monospace";

export default function StepCard({ number, title, description, accent, icon, scrollProgress, index, total }) {
  const [hovered, setHovered] = useState(false);

  const inputStart = (index / total) * 0.6;
  const inputEnd   = inputStart + 0.25;

  const x       = useTransform(scrollProgress, [inputStart, inputEnd], ["80px", "0px"]);
  const opacity = useTransform(scrollProgress, [inputStart, inputStart + 0.1], [0, 1]);

  return (
    <motion.div
      style={{ x, opacity }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <motion.div
        animate={{ borderColor: hovered ? accent : "rgba(255,255,255,0.12)" }}
        transition={{ duration: 0.3 }}
        style={{
          minWidth: "320px", width: "320px", minHeight: "580px",
          background: "rgba(8,8,8,0.95)",
          border: "1px solid rgba(255,255,255,0.12)",
          display: "flex", flexDirection: "column",
          justifyContent: "space-between", padding: "36px 32px",
          flexShrink: 0, willChange: "transform",
          position: "relative", overflow: "hidden",
          cursor: "default",
        }}
      >

        {/* ── Inner grid lines ── */}
        <svg style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          pointerEvents: "none", opacity: 0.5,
        }}>
          <defs>
            <pattern id={`cardGrid${number}`} width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#cardGrid${number})`}/>
        </svg>

        {/* ── Accent glow on hover ── */}
        <motion.div
          animate={{
            opacity: hovered ? 1 : 0,
            background: `radial-gradient(ellipse at top right, ${accent}18 0%, transparent 65%)`,
          }}
          transition={{ duration: 0.4 }}
          style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
        />

        {/* ── Bottom accent bar ── */}
        <motion.div
          animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
          initial={{ scaleX: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            height: "2px", background: accent,
            transformOrigin: "left",
          }}
        />

        {/* ── Corner cross ── */}
        <div style={{ position: "absolute", bottom: 28, right: 28, opacity: 0.2 }}>
          <div style={{ width: 12, height: 1, background: "#fff", position: "absolute", top: "50%", left: 0 }}/>
          <div style={{ width: 1, height: 12, background: "#fff", position: "absolute", left: "50%", top: 0 }}/>
        </div>

        {/* ─── TOP: Step number + icon ─── */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <span style={{
              fontFamily: MONO, fontSize: "0.72rem", fontWeight: 600,
              letterSpacing: "0.2em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.25)",
            }}>
              STEP {number}
              <span style={{ color: accent }}>.</span>
            </span>
          </div>

          {/* Icon badge */}
          <motion.div
            animate={{
              borderColor: hovered ? accent : "rgba(255,255,255,0.1)",
              color: hovered ? accent : "rgba(255,255,255,0.2)",
            }}
            transition={{ duration: 0.3 }}
            style={{
              width: 40, height: 40, border: "1px solid rgba(255,255,255,0.1)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1.2rem",
            }}
          >
            {icon}
          </motion.div>
        </div>

        {/* ─── MIDDLE: Large number watermark ─── */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          fontFamily: SANS, fontSize: "10rem", fontWeight: 900,
          color: "rgba(255,255,255,0.025)", letterSpacing: "-0.05em",
          userSelect: "none", pointerEvents: "none", lineHeight: 1,
        }}>
          {number}
        </div>

        {/* ─── BOTTOM: Title + Description ─── */}
        <div>
          {/* Divider line */}
          <motion.div
            animate={{ width: hovered ? "60px" : "30px", background: hovered ? accent : "rgba(255,255,255,0.2)" }}
            transition={{ duration: 0.3 }}
            style={{ height: "1px", marginBottom: 20 }}
          />

          <h3 style={{
            fontFamily: SANS,
            fontSize: "clamp(1.8rem, 2.5vw, 2.4rem)",
            fontWeight: 800, color: "#ffffff",
            lineHeight: 1.08, letterSpacing: "-0.03em",
            marginBottom: "16px", whiteSpace: "pre-line",
          }}>
            {title}
          </h3>

          <p style={{
            fontFamily: SANS,
            fontSize: "clamp(0.85rem, 0.95vw, 0.95rem)",
            color: "rgba(255,255,255,0.38)",
            lineHeight: 1.7, margin: 0,
          }}>
            {description}
          </p>

          {/* Read more link */}
          <motion.div
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
            transition={{ duration: 0.3 }}
            style={{
              marginTop: 20, display: "flex", alignItems: "center", gap: 8,
              fontFamily: MONO, fontSize: "0.68rem", letterSpacing: "0.15em",
              color: accent, textTransform: "uppercase",
            }}
          >
            <span>EXPLORE</span>
            <span>→</span>
          </motion.div>
        </div>

      </motion.div>
    </motion.div>
  );
}

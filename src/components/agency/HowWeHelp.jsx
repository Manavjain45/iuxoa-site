import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const SANS = "'Inter', 'Helvetica Neue', Arial, sans-serif";

const SERVICES = [
  {
    number: "01", title: "Web Design & Development",
    description: "Pixel-perfect, performance-first websites built with modern frameworks. From concept to launch, we craft digital experiences that convert visitors into customers.",
    tags: ["Responsive Design", "Interaction Design", "CMS Integration", "SEO Optimization"],
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80",
  },
  {
    number: "02", title: "Games",
    description: "Immersive, high-performance games built from the ground up — from concept and mechanics to full launch across mobile, web, and desktop platforms.",
    tags: ["Unity", "Unreal Engine", "WebGL", "Mobile Gaming"],
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800&q=80",
  },
  {
    number: "03", title: "Apps",
    description: "Native and cross-platform applications with seamless UX — built for speed, scale, and real-world usability that users keep coming back to.",
    tags: ["React Native", "Flutter", "iOS / Android", "Web Apps"],
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
  },
  {
    number: "04", title: "Research Paper",
    description: "Rigorous, publication-ready research papers backed by data analysis, domain expertise, and academic precision — driving insights that matter.",
    tags: ["Data Analysis", "Machine Learning", "Academic Writing", "Publication"],
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80",
  },
];

/* ── Service Row — image embedded inside ── */
function ServiceRow({ number, title, description, tags, image, isHovered, onHover, onLeave, index }) {
  const rowRef = useRef(null);
  const inView = useInView(rowRef, { once: true, margin: "0px 0px -60px 0px" });
  const delay  = index * 0.1;

  return (
    <div ref={rowRef}>
      {/* Top divider */}
      <div style={{ position: "relative", height: 1 }}>
        <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.07)" }} />
        <motion.div
          initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.4, delay, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: "absolute", inset: 0, background: isHovered ? "linear-gradient(90deg,#FF4D00,rgba(255,77,0,0.2))" : "rgba(255,255,255,0.12)", transformOrigin: "left", transition: "background 0.4s" }}
        />
      </div>

      <motion.div
        onMouseEnter={onHover} onMouseLeave={onLeave}
        animate={{ backgroundColor: isHovered ? "rgba(255,77,0,0.04)" : "rgba(0,0,0,0)" }}
        transition={{ duration: 0.3 }}
        style={{ position: "relative", padding: "0 80px", cursor: "default" }}
      >
        {/* Left accent bar */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} exit={{ scaleY: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: "linear-gradient(to bottom, #FF4D00, transparent)", borderRadius: 999, transformOrigin: "top" }}
            />
          )}
        </AnimatePresence>

        {/* ── Main row: number | image | title ── */}
        <div style={{ display: "flex", alignItems: "center", gap: 32, padding: "28px 0" }}>

          {/* Number */}
          <motion.div
            initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: delay + 0.2 }}
            style={{ flexShrink: 0, minWidth: 70 }}
          >
            <motion.span
              animate={{ scale: isHovered ? 1.25 : 1, color: isHovered ? "#FF4D00" : "#FF4D00" }}
              transition={{ duration: 0.3 }}
              style={{ fontWeight: 300, fontSize: "clamp(1.6rem, 2.8vw, 3rem)", letterSpacing: "0.05em", display: "inline-block", color: "#FF4D00", textShadow: isHovered ? "0 0 28px rgba(255,77,0,0.6)" : "none", transition: "text-shadow 0.3s" }}
            >{number}.</motion.span>
          </motion.div>

          {/* ── Embedded Image — always visible, expands on hover ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: delay + 0.3 }}
            style={{ flexShrink: 0, overflow: "hidden", borderRadius: 14, border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <motion.div
              animate={{
                width: isHovered ? 220 : 130,
                height: isHovered ? 148 : 86,
              }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: "hidden", borderRadius: 13, position: "relative" }}
            >
              <motion.img
                src={image} alt={title}
                animate={{ scale: isHovered ? 1.08 : 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              {/* Overlay on hover */}
              <motion.div
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(255,77,0,0.25) 0%, transparent 60%)" }}
              />
            </motion.div>
          </motion.div>

          {/* Tags — center, shown on hover */}
          <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.3 }}
                  style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}
                >
                  {tags.map((tag, i) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05, duration: 0.22 }}
                      style={{ padding: "5px 14px", fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,77,0,0.3)", borderRadius: 999, background: "rgba(255,77,0,0.08)", fontWeight: 500, fontFamily: SANS }}
                    >{tag}</motion.span>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Title — right */}
          <motion.h3
            initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: delay + 0.3 }}
            style={{ margin: 0, textAlign: "right", flexShrink: 0, maxWidth: "45%", fontFamily: SANS, fontWeight: 700, fontSize: "clamp(1.8rem, 3.5vw, 4.2rem)", letterSpacing: "-0.025em", lineHeight: 1.05, color: isHovered ? "#fff" : "rgba(255,255,255,0.8)", textShadow: isHovered ? "0 0 50px rgba(255,77,0,0.2)" : "none", transition: "color 0.3s, text-shadow 0.3s" }}
          >{title}</motion.h3>
        </div>

        {/* ── Expandable description row ── */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: "hidden" }}
            >
              <div style={{ paddingBottom: 28, paddingLeft: 102 }}>
                <motion.p
                  initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.35 }}
                  style={{ color: "rgba(255,255,255,0.38)", fontSize: "clamp(0.9rem, 1.2vw, 1.1rem)", lineHeight: 1.75, margin: 0, maxWidth: 500, fontFamily: SANS }}
                >{description}</motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default function HowWeHelp() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const headingRef    = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: "0px 0px -60px 0px" });

  return (
    <section style={{ background: "#080808", fontFamily: SANS, paddingBottom: 80, position: "relative", overflow: "hidden" }}>

      {/* Grid bg */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, background: "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 30%, #080808 100%)" }} />

      {/* Orange glow */}
      <motion.div
        animate={{ opacity: [0.5, 0.85, 0.5], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: "absolute", top: "-10%", left: "50%", transform: "translateX(-50%)", width: 700, height: 350, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,77,0,0.18) 0%, transparent 65%)", filter: "blur(80px)", pointerEvents: "none", zIndex: 0 }}
      />
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        style={{ position: "absolute", bottom: "-5%", right: "-5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(90,60,255,0.12) 0%, transparent 65%)", filter: "blur(80px)", pointerEvents: "none", zIndex: 0 }}
      />

      {/* Heading */}
      <div ref={headingRef} style={{ padding: "72px 80px 40px", position: "relative", zIndex: 5 }}>
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}
        >
          <div style={{ width: 28, height: 1, background: "#FF4D00", opacity: 0.7 }} />
          <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 500 }}>Services</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }} animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "flex", alignItems: "baseline", gap: 16, flexWrap: "wrap" }}
        >
          <h2 style={{ color: "#fff", fontWeight: 900, fontSize: "clamp(2.4rem,7vw,7.5rem)", letterSpacing: "-.04em", textTransform: "uppercase", margin: 0, lineHeight: 0.95 }}>How We</h2>
          <h2 style={{ fontWeight: 900, fontSize: "clamp(2.4rem,7vw,7.5rem)", letterSpacing: "-.04em", textTransform: "uppercase", margin: 0, lineHeight: 0.95, background: "linear-gradient(90deg,#FF4D00 0%,#ff8a50 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Can Help</h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.35 }}
          style={{ color: "rgba(255,255,255,0.28)", fontSize: "clamp(0.9rem,1.3vw,1.1rem)", marginTop: 20, marginBottom: 0, maxWidth: 480, lineHeight: 1.6 }}
        >Hover each service to explore. We build things that last.</motion.p>
      </div>

      {/* Rows */}
      <div style={{ position: "relative", zIndex: 5 }}>
        {SERVICES.map((service, index) => (
          <ServiceRow
            key={index} {...service} index={index}
            isHovered={hoveredIndex === index}
            onHover={() => setHoveredIndex(index)}
            onLeave={() => setHoveredIndex(null)}
          />
        ))}
        {/* Bottom line */}
        <div style={{ position: "relative", height: 1 }}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.07)" }} />
        </div>
      </div>

      <div style={{ padding: "32px 80px 0", display: "flex", alignItems: "center", gap: 10, position: "relative", zIndex: 5 }}>
        <span style={{ color: "rgba(255,255,255,0.15)", fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase" }}>{SERVICES.length} services available</span>
        <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
        <span style={{ color: "#FF4D00", fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase" }}>EST. 2026</span>
      </div>
    </section>
  );
}

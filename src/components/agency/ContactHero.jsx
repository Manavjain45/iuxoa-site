import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const HAND_IMAGE = "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&q=85";

const SANS = "'Inter', 'Helvetica Neue', Arial, sans-serif";

export default function ContactHero() {
  const navigate = useNavigate();
  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: "70vh", display: "flex", alignItems: "flex-end", paddingBottom: 0 }}
    >
      {/* Background hand image */}
      <div className="absolute inset-0">
        <img
          src={HAND_IMAGE}
          alt="Reaching hand"
          className="w-full h-full object-cover"
          style={{ opacity: 0.4 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        {/* Top fade — blends image into the section above */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '220px', background: 'linear-gradient(to bottom, #000000 0%, rgba(0,0,0,0.7) 50%, transparent 100%)' }} />
      </div>

      {/* Content */}
      <div
        className="relative z-10 w-full"
        style={{
          padding: "0 80px 80px",
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: "48px",
        }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: SANS,
            fontSize: "clamp(3.5rem, 8vw, 8rem)",
            fontWeight: 900,
            color: "#fff",
            lineHeight: 0.95,
            letterSpacing: "-0.04em",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          LET'S WORK<br />TOGETHER
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: "20px",
            maxWidth: "380px",
            flexShrink: 0,
          }}
        >
          <p
            style={{
              color: "rgba(200,200,200,0.75)",
              fontSize: "0.95rem",
              lineHeight: 1.7,
              textAlign: "right",
              margin: 0,
              fontFamily: SANS,
            }}
          >
            Have a project in mind? We'd love to hear about it. Let's create something great together!
          </p>
          <button
            onClick={() => navigate('/contact')}
            style={{
              display: "inline-block",
              padding: "14px 36px",
              borderRadius: "100px",
              border: "1.5px solid #FF4D00",
              color: "#fff",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              textDecoration: "none",
              fontFamily: SANS,
              background: "transparent",
              transition: "background 0.3s ease, transform 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#FF4D00";
              e.currentTarget.style.transform = "scale(1.04)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            GET IN TOUCH
          </button>
        </motion.div>
      </div>
    </section>
  );
}

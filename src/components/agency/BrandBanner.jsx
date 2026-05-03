import React from "react";

const BRAND_TEXT = "NAKULA · LET'S CREATE · DESIGN · BRANDING · WEB · MOTION · ";

export default function BrandBanner() {
  return (
    <div
      style={{
        overflow: "hidden",
        padding: "20px 0",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        background: "#000",
      }}
    >
      <div
        style={{
          display: "flex",
          whiteSpace: "nowrap",
          animation: "brandScroll 22s linear infinite",
        }}
      >
        {[...Array(6)].map((_, i) => (
          <span
            key={i}
            style={{
              color: "rgba(255,255,255,0.12)",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              flexShrink: 0,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {BRAND_TEXT}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes brandScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

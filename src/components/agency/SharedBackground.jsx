/**
 * SharedBackground.jsx
 * One reusable crazy background system used by
 * NakulaTestimonial, HowWeHelp (and any other section)
 * so they all look like one continuous canvas.
 */
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const MONO = "'JetBrains Mono','Fira Code',monospace";
const SANS = "'Inter','Helvetica Neue',Arial,sans-serif";

/* ── Particle canvas ── */
export function ParticleCanvas({ colors = ['#FF4D00','#7B61FF','#00D4FF','#00FF94','#ffffff'], count = 70 }) {
  const ref = useRef(null);
  const raf = useRef(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, pts = [];
    const resize = () => { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);
    for (let i = 0; i < count; i++) pts.push({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - .5) * .32, vy: (Math.random() - .5) * .32,
      r: Math.random() * 1.5 + .3,
      color: colors[Math.floor(Math.random() * colors.length)],
      a: Math.random() * .4 + .08,
    });
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, d = Math.hypot(dx, dy);
        if (d < 110) { ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.strokeStyle = `rgba(255,255,255,${.03 * (1 - d / 110)})`; ctx.lineWidth = .4; ctx.stroke(); }
      }
      pts.forEach(p => {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.round(p.a * 255).toString(16).padStart(2, '0');
        ctx.fill();
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      });
      raf.current = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf.current); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={ref} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }} />;
}

/* ── Multi-layer grid + diagonals ── */
export function CrazyGrid({ id = 'shared' }) {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <defs>
          <pattern id={`${id}Micro`} width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M28 0L0 0 0 28" fill="none" stroke="rgba(255,255,255,0.038)" strokeWidth=".4" />
          </pattern>
          <pattern id={`${id}Mid`} width="112" height="112" patternUnits="userSpaceOnUse">
            <rect width="112" height="112" fill={`url(#${id}Micro)`} />
            <path d="M112 0L0 0 0 112" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth=".7" />
          </pattern>
          <pattern id={`${id}Macro`} width="448" height="448" patternUnits="userSpaceOnUse">
            <rect width="448" height="448" fill={`url(#${id}Mid)`} />
            <path d="M448 0L0 0 0 448" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="1" />
          </pattern>
          <radialGradient id={`${id}Fade`} cx="50%" cy="50%" r="65%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id={`${id}Mask`}>
            <rect width="100%" height="100%" fill={`url(#${id}Fade)`} />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id}Macro)`} mask={`url(#${id}Mask)`} />
        <line x1="0" y1="0"    x2="100%" y2="100%" stroke="rgba(255,77,0,0.05)"    strokeWidth="1" />
        <line x1="100%" y1="0" x2="0"    y2="100%" stroke="rgba(123,97,255,0.05)"  strokeWidth="1" />
        <line x1="0" y1="50%"  x2="100%" y2="0"    stroke="rgba(0,212,255,0.035)"  strokeWidth=".8" />
        <line x1="0" y1="50%"  x2="100%" y2="100%" stroke="rgba(0,255,148,0.035)"  strokeWidth=".8" />
        {[160, 300, 460, 620, 780].map((r, i) => (
          <circle key={i} cx="50%" cy="50%" r={r} fill="none"
            stroke={['#FF4D00', '#7B61FF', '#00D4FF', '#00FF94', '#ef4444'][i]}
            strokeWidth=".6" strokeDasharray={i % 2 === 0 ? '5 7' : 'none'} opacity=".055" />
        ))}
      </svg>
    </div>
  );
}

/* ── Floating orbs ── */
export function FloatingOrbs({ orbs }) {
  const defaults = [
    { top: '0%',  left: '0%',  w: 550, h: 550, color: 'rgba(255,77,0,0.10)',    blur: 90,  anim: 'orbF1 10s ease-in-out infinite' },
    { top: '35%', left: '42%', w: 480, h: 480, color: 'rgba(123,97,255,0.09)',  blur: 85,  anim: 'orbF2 13s ease-in-out infinite' },
    { top: '55%', left: '68%', w: 400, h: 400, color: 'rgba(0,212,255,0.08)',   blur: 75,  anim: 'orbF3 9s ease-in-out infinite' },
    { top: '8%',  left: '68%', w: 360, h: 360, color: 'rgba(0,255,148,0.07)',   blur: 65,  anim: 'orbF1 12s ease-in-out infinite reverse' },
    { top: '72%', left: '12%', w: 300, h: 300, color: 'rgba(239,68,68,0.07)',   blur: 65,  anim: 'orbF2 8s ease-in-out infinite reverse' },
  ];
  const list = orbs || defaults;
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
      {list.map((o, i) => (
        <div key={i} style={{
          position: 'absolute', top: o.top, left: o.left,
          width: o.w, height: o.h, borderRadius: '50%',
          background: `radial-gradient(circle,${o.color} 0%,transparent 70%)`,
          filter: `blur(${o.blur}px)`, animation: o.anim,
        }} />
      ))}
    </div>
  );
}

/* ── Laser beams ── */
export function LaserBeams({ beams }) {
  const defaults = [
    { top: '20%', color: '#FF4D00', dur: '7s',  delay: '0s',   opacity: .28 },
    { top: '48%', color: '#7B61FF', dur: '10s', delay: '1.8s', opacity: .22 },
    { top: '74%', color: '#00FF94', dur: '8s',  delay: '3.2s', opacity: .22 },
    { top: '90%', color: '#00D4FF', dur: '12s', delay: '0.6s', opacity: .18 },
  ];
  const list = beams || defaults;
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none', overflow: 'hidden' }}>
      {list.map((b, i) => (
        <div key={i} style={{
          position: 'absolute', top: b.top, left: 0, width: '100%', height: '1px',
          background: `linear-gradient(to right,transparent,${b.color},transparent)`,
          opacity: b.opacity, animation: `laserSweepBg ${b.dur} linear infinite`,
          animationDelay: b.delay, boxShadow: `0 0 10px 2px ${b.color}44`,
        }} />
      ))}
      <div style={{
        position: 'absolute', top: 0, bottom: 0, width: '2px',
        background: 'linear-gradient(to bottom,transparent,#FF4D00 40%,#7B61FF 60%,transparent)',
        opacity: .35, animation: 'vertSweepBg 9s linear infinite',
        boxShadow: '0 0 18px 4px rgba(255,77,0,0.18)',
      }} />
    </div>
  );
}

/* ── Ghost text watermark ── */
export function GhostText({ word1 = 'WORK', word2 = 'BUILD', color1 = 'rgba(255,77,0,0.05)', color2 = 'rgba(123,97,255,0.04)' }) {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', top: '-5%', left: '-2%',
        fontFamily: SANS, fontSize: 'clamp(11rem,17vw,21rem)',
        fontWeight: 900, color: 'transparent',
        WebkitTextStroke: `1px ${color1}`,
        letterSpacing: '-0.06em', lineHeight: 1, userSelect: 'none', whiteSpace: 'nowrap',
        animation: 'ghostD1 14s ease-in-out infinite',
      }}>{word1}</div>
      <div style={{
        position: 'absolute', bottom: '-8%', right: '-3%',
        fontFamily: SANS, fontSize: 'clamp(9rem,14vw,18rem)',
        fontWeight: 900, color: 'transparent',
        WebkitTextStroke: `1px ${color2}`,
        letterSpacing: '-0.06em', lineHeight: 1, userSelect: 'none', whiteSpace: 'nowrap',
        animation: 'ghostD2 16s ease-in-out infinite',
      }}>{word2}</div>
    </div>
  );
}

/* ── Crosshairs ── */
export function Crosshair({ x, y, color, size = 22, delay = '0s' }) {
  return (
    <div style={{
      position: 'absolute', left: x, top: y, zIndex: 3,
      transform: 'translate(-50%,-50%)', pointerEvents: 'none',
      animation: `crossPulseBg 2.5s ease-in-out infinite`, animationDelay: delay,
    }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <line x1={size/2} y1={0}          x2={size/2}     y2={size/2-4} stroke={color} strokeWidth="1" />
        <line x1={size/2} y1={size/2+4}   x2={size/2}     y2={size}     stroke={color} strokeWidth="1" />
        <line x1={0}      y1={size/2}     x2={size/2-4}   y2={size/2}   stroke={color} strokeWidth="1" />
        <line x1={size/2+4} y1={size/2}   x2={size}       y2={size/2}   stroke={color} strokeWidth="1" />
        <circle cx={size/2} cy={size/2} r={2.5} fill="none" stroke={color} strokeWidth="1" />
      </svg>
    </div>
  );
}

/* ── Corner marks ── */
export function CornerMarks() {
  const marks = [
    { style: { top: 18, left: 18 },            color: 'rgba(255,77,0,0.55)',    delay: '0s'   },
    { style: { top: 18, right: 18 },            color: 'rgba(123,97,255,0.55)', delay: '.6s', rot: 'scaleX(-1)'  },
    { style: { bottom: 18, left: 18 },          color: 'rgba(0,212,255,0.55)',  delay: '1.2s', rot: 'scaleY(-1)' },
    { style: { bottom: 18, right: 18 },         color: 'rgba(0,255,148,0.55)',  delay: '1.8s', rot: 'scale(-1)'  },
  ];
  return (
    <>
      {marks.map((m, i) => (
        <div key={i} style={{
          position: 'absolute', ...m.style, width: 20, height: 20, zIndex: 4,
          transform: m.rot, animation: `cornerPulseBg 3s ease-in-out infinite`,
          animationDelay: m.delay, pointerEvents: 'none',
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 2, background: m.color }} />
          <div style={{ position: 'absolute', top: 0, left: 0, width: 2, height: '100%', background: m.color }} />
        </div>
      ))}
    </>
  );
}

/* ── Noise overlay ── */
export function NoiseOverlay() {
  return (
    <div style={{
      position: 'absolute', inset: '-20px', zIndex: 4, pointerEvents: 'none',
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      backgroundSize: '180px 180px', opacity: .025,
      animation: 'noiseShiftBg .15s steps(1) infinite', mixBlendMode: 'overlay',
    }} />
  );
}

/* ── HUD label ── */
export function HudLabel({ left, right, bottom, top, text, zIndex = 5 }) {
  const pos = {};
  if (left   !== undefined) pos.left   = left;
  if (right  !== undefined) pos.right  = right;
  if (bottom !== undefined) pos.bottom = bottom;
  if (top    !== undefined) pos.top    = top;
  return (
    <div style={{
      position: 'absolute', ...pos, zIndex,
      fontFamily: MONO, fontSize: '.58rem',
      color: 'rgba(255,255,255,0.16)', letterSpacing: '.14em',
      pointerEvents: 'none',
    }}>{text}</div>
  );
}

/* ── Global keyframes — inject once ── */
export function SharedBgStyles() {
  return (
    <style>{`
      @keyframes laserSweepBg  { 0%{transform:translateX(-120%)} 100%{transform:translateX(120vw)} }
      @keyframes vertSweepBg   { 0%{left:-2%} 100%{left:102%} }
      @keyframes orbF1         { 0%,100%{transform:translateY(0)   scale(1)}    50%{transform:translateY(-28px) scale(1.05)} }
      @keyframes orbF2         { 0%,100%{transform:translateY(0)   scale(1)}    50%{transform:translateY(24px)  scale(0.97)} }
      @keyframes orbF3         { 0%,100%{transform:translateY(0)   scale(1)}    50%{transform:translateY(-16px) scale(1.03)} }
      @keyframes ghostD1       { 0%,100%{transform:translateY(0)}  50%{transform:translateY(-16px)} }
      @keyframes ghostD2       { 0%,100%{transform:translateY(0)}  50%{transform:translateY(12px)} }
      @keyframes crossPulseBg  { 0%,100%{opacity:.28;transform:translate(-50%,-50%) scale(1)} 50%{opacity:.75;transform:translate(-50%,-50%) scale(1.3)} }
      @keyframes cornerPulseBg { 0%,100%{opacity:.28} 50%{opacity:.65} }
      @keyframes noiseShiftBg  { 0%{transform:translate(0,0)} 20%{transform:translate(-2px,1px)} 40%{transform:translate(1px,-2px)} 60%{transform:translate(-1px,2px)} 80%{transform:translate(2px,-1px)} 100%{transform:translate(0,0)} }
      @keyframes pulse-dot     { 0%,100%{opacity:1} 50%{opacity:.4} }
    `}</style>
  );
}

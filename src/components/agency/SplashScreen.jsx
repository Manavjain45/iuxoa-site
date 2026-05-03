import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';

const DISPLAY = "'Playfair Display', 'Georgia', serif";
const MONO    = "'DM Mono', 'Courier New', monospace";
const SANS    = "'DM Sans', 'Helvetica Neue', Arial, sans-serif";

/* ── Particle system ── */
function Particles() {
  const particles = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2.5 + 0.5,
    duration: Math.random() * 6 + 4,
    delay: Math.random() * 3,
    opacity: Math.random() * 0.4 + 0.05,
  }));

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
      {particles.map(p => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: [0, p.opacity, p.opacity, 0], y: -60 }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            left: `${p.x}%`, top: `${p.y}%`,
            width: p.size, height: p.size,
            borderRadius: '50%',
            background: p.id % 3 === 0 ? '#C8502A' : 'rgba(255,255,255,0.6)',
          }}
        />
      ))}
    </div>
  );
}

/* ── Animated grid lines ── */
function GridLines() {
  return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} preserveAspectRatio="none">
      <defs>
        <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
          <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
      {/* Diagonal accent lines */}
      <motion.line
        x1="0" y1="0" x2="100%" y2="100%"
        stroke="rgba(200,80,42,0.06)" strokeWidth="1"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: 'easeInOut' }}
      />
      <motion.line
        x1="100%" y1="0" x2="0" y2="100%"
        stroke="rgba(200,80,42,0.04)" strokeWidth="1"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 2.5, ease: 'easeInOut', delay: 0.3 }}
      />
    </svg>
  );
}

/* ── Orbiting ring ── */
function OrbitRing({ size, duration, delay, color, dashes }) {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration, repeat: Infinity, ease: 'linear', delay }}
      style={{ position: 'absolute', width: size, height: size, top: '50%', left: '50%',
               transform: 'translate(-50%, -50%)', pointerEvents: 'none' }}
    >
      <svg viewBox={`0 0 ${size} ${size}`} style={{ width: '100%', height: '100%' }}>
        <circle cx={size/2} cy={size/2} r={size/2 - 1}
          stroke={color} strokeWidth="1" fill="none"
          strokeDasharray={dashes} strokeLinecap="round" />
      </svg>
    </motion.div>
  );
}

/* ── Letter reveal ── */
function RevealText({ text, delayStart = 0, stagger = 0.05, charStyle, style }) {
  return (
    <span style={{ display: 'inline-flex', ...style }}>
      {text.split('').map((ch, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden' }}>
          <motion.span
            initial={{ y: '115%', opacity: 0, rotateX: 30 }}
            animate={{ y: '0%', opacity: 1, rotateX: 0 }}
            transition={{ duration: 0.9, delay: delayStart + i * stagger, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'inline-block', ...charStyle }}
          >
            {ch === ' ' ? '\u00A0' : ch}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ── Glitch text effect ── */
function GlitchChar({ ch, delay }) {
  const glitchChars = 'XOZP@#$%';
  const [display, setDisplay] = useState(ch);
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setGlitching(true);
      let count = 0;
      const interval = setInterval(() => {
        setDisplay(glitchChars[Math.floor(Math.random() * glitchChars.length)]);
        count++;
        if (count > 5) { clearInterval(interval); setDisplay(ch); setGlitching(false); }
      }, 60);
    }, delay);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.span
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay / 1000, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{ display: 'inline-block', color: glitching ? '#C8502A' : 'inherit',
               transition: glitching ? 'none' : 'color 0.3s' }}
    >
      {display}
    </motion.span>
  );
}

export default function SplashScreen({ onComplete }) {
  const [phase, setPhase]     = useState('enter');
  const [progress, setProgress] = useState(0);
  const [counter, setCounter] = useState(0);
  const [showTagline, setShowTagline] = useState(false);

  useEffect(() => {
    let start = null;
    const duration = 2600;
    const tick = (ts) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const pct = Math.min(Math.round((elapsed / duration) * 100), 100);
      setProgress(pct);
      setCounter(pct);
      if (pct < 100) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    const taglineTimer = setTimeout(() => setShowTagline(true), 1200);
    const holdTimer    = setTimeout(() => setPhase('exit'), 2900);
    const doneTimer    = setTimeout(() => onComplete(), 3900);
    return () => { clearTimeout(taglineTimer); clearTimeout(holdTimer); clearTimeout(doneTimer); };
  }, [onComplete]);

  const BRAND  = '#C8502A';
  const letters = ['I', 'U', 'X', 'O', 'A'];
  // panel widths: 5 equal letter panels + 1 thin filler panel = 6 total
  const panelCount = 6;

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999,
                      pointerEvents: phase === 'exit' ? 'none' : 'all' }}>

          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,900;1,900&family=DM+Sans:wght@300;400;700&family=DM+Mono:wght@400;500&display=swap');
            @keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
            @keyframes pulse-glow { 0%,100%{opacity:0.4} 50%{opacity:1} }
          `}</style>

          {/* ── EXIT PANELS — 5 letter panels (I U X O A) + 1 filler ── */}
          {Array.from({ length: panelCount }).map((_, i) => {
            const isLetterPanel = i < 5;
            const letter = isLetterPanel ? letters[i] : null;
            const isX = letter === 'X';
            return (
              <motion.div key={i}
                initial={{ y: '0%' }}
                animate={phase === 'exit' ? { y: '-102%' } : { y: '0%' }}
                transition={{ duration: 0.95, delay: i * 0.07, ease: [0.76, 0, 0.24, 1] }}
                style={{
                  position: 'absolute', top: 0, bottom: 0,
                  left: `${(i / panelCount) * 100}%`,
                  width: `${100 / panelCount + 0.3}%`,
                  background: i % 2 === 0 ? '#080808' : '#0c0c0c',
                  zIndex: 3,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  overflow: 'hidden',
                }}
              >
                {/* Subtle vertical seam line on right edge */}
                <div style={{
                  position: 'absolute', right: 0, top: '15%', bottom: '15%',
                  width: '1px',
                  background: 'linear-gradient(180deg, transparent, rgba(200,80,42,0.15), transparent)',
                }} />

                {isLetterPanel && (
                  <>
                    {/* Letter — visible from start, brightens on exit */}
                    <motion.span
                      initial={{ opacity: 0, y: 16 }}
                      animate={{
                        opacity: phase === 'exit' ? 1 : (isX ? 0.9 : 0.6),
                        y: 0,
                        textShadow: phase === 'exit'
                          ? (isX
                              ? '0 0 60px rgba(200,80,42,0.8), 0 0 120px rgba(200,80,42,0.4)'
                              : '0 0 40px rgba(200,80,42,0.4)')
                          : (isX
                              ? '0 0 30px rgba(200,80,42,0.4)'
                              : '0 0 20px rgba(200,80,42,0.15)'),
                      }}
                      transition={{ duration: 0.6, delay: i * 0.08 + 0.3, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        fontFamily: DISPLAY,
                        fontWeight: 900,
                        fontStyle: isX ? 'italic' : 'normal',
                        fontSize: 'clamp(3.5rem, 8vw, 7rem)',
                        color: isX ? BRAND : 'rgba(200,80,42,0.75)',
                        letterSpacing: '-0.04em',
                        lineHeight: 1,
                        userSelect: 'none',
                      }}
                    >
                      {letter}
                    </motion.span>

                    {/* Small dot below — always visible */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: phase === 'exit' ? 0.7 : 0.3 }}
                      transition={{ delay: i * 0.08 + 0.5 }}
                      style={{
                        position: 'absolute', bottom: '22%',
                        width: 3, height: 3, borderRadius: '50%',
                        background: isX ? BRAND : 'rgba(200,80,42,0.5)',
                      }}
                    />
                  </>
                )}

                {/* ── LAST PANEL: "Loading" label ── */}
                {!isLetterPanel && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    style={{
                      display: 'flex', flexDirection: 'column',
                      alignItems: 'center', gap: 14,
                    }}
                  >
                    {/* Spinning arc */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
                      style={{ width: 28, height: 28 }}
                    >
                      <svg viewBox="0 0 28 28" fill="none" style={{ width: '100%', height: '100%' }}>
                        <circle cx="14" cy="14" r="12" stroke="rgba(200,80,42,0.15)" strokeWidth="1.5" />
                        <circle cx="14" cy="14" r="12" stroke={BRAND} strokeWidth="1.5"
                          strokeDasharray="16 60" strokeLinecap="round" />
                      </svg>
                    </motion.div>

                    {/* Vertical "LOADING" text */}
                    <div style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
                    }}>
                      {'LOADING'.split('').map((ch, ci) => (
                        <motion.span
                          key={ci}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.9 + ci * 0.07, duration: 0.4 }}
                          style={{
                            fontFamily: MONO,
                            fontSize: '0.45rem',
                            color: 'rgba(200,80,42,0.55)',
                            letterSpacing: '0.15em',
                            lineHeight: 1,
                          }}
                        >
                          {ch}
                        </motion.span>
                      ))}
                    </div>

                    {/* Pulsing dot */}
                    <motion.div
                      animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                      transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                      style={{ width: 4, height: 4, borderRadius: '50%', background: BRAND }}
                    />
                  </motion.div>
                )}
              </motion.div>
            );
          })}

          {/* ── MAIN CANVAS ── */}
          <motion.div
            animate={phase === 'exit' ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            style={{
              position: 'absolute', inset: 0, zIndex: 1,
              background: 'radial-gradient(ellipse 80% 60% at 50% 40%, #0f0a08 0%, #080808 60%, #050505 100%)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            <GridLines />
            <Particles />

            {/* ── ORBITING RINGS ── */}
            <OrbitRing size={420} duration={18} delay={0}   color="rgba(200,80,42,0.08)"  dashes="8 30" />
            <OrbitRing size={560} duration={28} delay={1}   color="rgba(255,255,255,0.04)" dashes="4 50" />
            <OrbitRing size={680} duration={40} delay={0.5} color="rgba(200,80,42,0.04)"  dashes="2 80" />

            {/* ── AMBIENT LIGHT BLOBS ── */}
            <motion.div
              animate={{ scale: [1, 1.3, 1], x: [0, 30, 0], y: [0, -20, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute', top: '-15%', right: '-5%',
                width: 600, height: 600,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(200,80,42,0.18) 0%, transparent 70%)',
                filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0,
              }}
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1], x: [0, -25, 0], y: [0, 15, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
              style={{
                position: 'absolute', bottom: '-20%', left: '-10%',
                width: 500, height: 500,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(200,80,42,0.1) 0%, transparent 70%)',
                filter: 'blur(100px)', pointerEvents: 'none', zIndex: 0,
              }}
            />

            {/* ── GRAIN OVERLAY ── */}
            <div style={{
              position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.45,
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`,
              backgroundSize: '160px',
            }} />

            {/* ── TOP NAV LINE ── */}
            <motion.div
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                       background: 'linear-gradient(90deg, transparent, rgba(200,80,42,0.5) 40%, rgba(200,80,42,0.5) 60%, transparent)',
                       transformOrigin: 'left', zIndex: 2 }}
            />

            {/* ── TOP LABELS ── */}
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              style={{ position: 'absolute', top: 28, left: 40, display: 'flex', alignItems: 'center', gap: 10, zIndex: 2 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: BRAND,
                            animation: 'pulse-glow 2s ease-in-out infinite' }} />
              <span style={{ fontFamily: MONO, fontSize: '0.58rem', color: 'rgba(255,255,255,0.35)',
                             letterSpacing: '0.22em', textTransform: 'uppercase' }}>Initializing</span>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              style={{ position: 'absolute', top: 28, right: 40, zIndex: 2 }}>
              <span style={{ fontFamily: MONO, fontSize: '0.58rem', color: 'rgba(255,255,255,0.2)',
                             letterSpacing: '0.18em' }}>IUXOA® 2025</span>
            </motion.div>

            {/* ── CENTRE CONTENT ── */}
            <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column',
                          alignItems: 'center', textAlign: 'center', gap: '0.5rem' }}>

              {/* Eyebrow badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '0.6rem' }}
              >
                <motion.div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${BRAND})`, width: 40 }}
                  initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                />
                <span style={{ fontFamily: MONO, fontSize: '0.58rem', color: BRAND,
                               letterSpacing: '0.3em', textTransform: 'uppercase' }}>
                  Creative Digital Studio
                </span>
                <motion.div style={{ height: 1, background: `linear-gradient(90deg, ${BRAND}, transparent)`, width: 40 }}
                  initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                />
              </motion.div>

              {/* ── BIG WORDMARK ── */}
              <div style={{ lineHeight: 0.82, perspective: '800px' }}>
                <div style={{ overflow: 'hidden' }}>
                  <motion.div
                    initial={{ y: '120%', rotateX: 25 }} animate={{ y: '0%', rotateX: 0 }}
                    transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    style={{ display: 'flex', alignItems: 'baseline', gap: '0.06em', justifyContent: 'center' }}
                  >
                    <span style={{ fontFamily: DISPLAY, fontWeight: 900,
                                   fontSize: 'clamp(5.5rem, 19vw, 15rem)',
                                   color: '#ffffff', letterSpacing: '-0.05em', lineHeight: 0.82 }}>IU</span>
                    <span style={{
                      fontFamily: DISPLAY, fontWeight: 900, fontStyle: 'italic',
                      fontSize: 'clamp(5.5rem, 19vw, 15rem)',
                      letterSpacing: '-0.05em', lineHeight: 0.82,
                      background: `linear-gradient(135deg, ${BRAND} 0%, #f07040 40%, ${BRAND} 100%)`,
                      backgroundSize: '200% auto',
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                      animation: 'shimmer 3s linear infinite',
                    }}>X</span>
                    <span style={{ fontFamily: DISPLAY, fontWeight: 900, fontStyle: 'italic',
                                   fontSize: 'clamp(5.5rem, 19vw, 15rem)',
                                   color: 'rgba(255,255,255,0.12)', letterSpacing: '-0.05em', lineHeight: 0.82 }}>OA</span>
                  </motion.div>
                </div>

                {/* Stroke outline ghost text — offset behind */}
                <div style={{ overflow: 'hidden', marginTop: '-0.25em', opacity: 0.06 }}>
                  <motion.div
                    initial={{ y: '120%' }} animate={{ y: '0%' }}
                    transition={{ duration: 1.2, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    style={{ display: 'flex', alignItems: 'baseline', gap: '0.06em', justifyContent: 'center' }}
                  >
                    <span style={{ fontFamily: DISPLAY, fontWeight: 900,
                                   fontSize: 'clamp(5.5rem, 19vw, 15rem)',
                                   WebkitTextStroke: '1px rgba(255,255,255,0.8)',
                                   color: 'transparent', letterSpacing: '-0.05em', lineHeight: 0.82 }}>IUXOA</span>
                  </motion.div>
                </div>
              </div>

              {/* ── ANIMATED TAGLINE ── */}
              <AnimatePresence>
                {showTagline && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    style={{ marginTop: '1.4rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
                  >
                    <RevealText
                      text="Code · Creativity · Collaboration"
                      delayStart={0}
                      stagger={0.028}
                      style={{ justifyContent: 'center' }}
                      charStyle={{ fontFamily: MONO, fontSize: 'clamp(0.5rem,0.9vw,0.7rem)',
                                   color: 'rgba(255,255,255,0.22)', letterSpacing: '0.28em', textTransform: 'uppercase' }}
                    />
                    <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      style={{ height: 1, width: 120,
                               background: `linear-gradient(90deg, transparent, ${BRAND}, transparent)`,
                               transformOrigin: 'center' }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ── CORNER DETAIL — bottom left ── */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.8 }}
              style={{ position: 'absolute', bottom: 30, left: 40, zIndex: 2 }}>
              <span style={{ fontFamily: MONO, fontSize: '0.5rem', color: 'rgba(255,255,255,0.15)',
                             letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                Ludhiana · Punjab · India
              </span>
            </motion.div>

            {/* ── COUNTER ── */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              style={{ position: 'absolute', bottom: '1.6rem', right: '2.5rem', zIndex: 2,
                       display: 'flex', alignItems: 'baseline', gap: 3 }}>
              <motion.span
                key={counter}
                style={{ fontFamily: MONO, fontSize: '2rem', fontWeight: 500,
                         color: 'rgba(255,255,255,0.07)', letterSpacing: '-0.05em', lineHeight: 1 }}
              >
                {String(counter).padStart(3, '0')}
              </motion.span>
              <span style={{ fontFamily: MONO, fontSize: '0.65rem', color: 'rgba(255,255,255,0.12)' }}>%</span>
            </motion.div>

            {/* ── PROGRESS BAR ── */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px',
                          background: 'rgba(255,255,255,0.04)', zIndex: 2 }}>
              <motion.div
                style={{ height: '100%', originX: 0,
                         background: `linear-gradient(90deg, ${BRAND} 0%, #f07040 50%, ${BRAND} 100%)`,
                         backgroundSize: '200% 100%', animation: 'shimmer 2s linear infinite' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.04, ease: 'linear' }}
              />
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

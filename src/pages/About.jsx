import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import originImg    from '../assets/team/The Origin.png';
import teamGroupImg from '../assets/team/IMG_1806.png';
import ayushImg   from '../assets/team/Ayush Mahanta.jpg';
import manovImg   from '../assets/team/Manav Jain.jpeg';
import athravImg  from '../assets/team/Atharv Gupta.jpg';
import ridhiImg   from '../assets/team/Ridhi Gupta.jpeg';
import vaishalImg from '../assets/team/Vaishali Bahuguna.jpg';
import sarikaImg  from '../assets/team/Sarika Ruhil.jpg';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import Navigation from '../components/agency/Navigation';
import ContactFooter from '../components/agency/ContactFooter';

const SECTIONS = [
  {
    number: '01',
    tag: 'Our Edge',
    lines: ['BEYOND', 'VISUALS.'],
    accent: 'VISUALS',
    description: 'With a decade of expertise, we craft bold brands and high-impact digital experiences that get results — not just looks.',
    keyword: 'Bold. Impactful. Real.',
  },
  {
    number: '02',
    tag: 'Our Thinking',
    lines: ['BUILT', 'WITH', 'VISION.'],
    accent: 'VISION',
    description: "Every brand we build starts with a clear strategy and bold ideas. We design with the brand's growth in mind, not just the way it looks.",
    keyword: 'Strategic. Intentional. Sharp.',
  },
  {
    number: '03',
    tag: 'Our Purpose',
    lines: ['DRIVEN', 'BY', 'PURPOSE.'],
    accent: 'PURPOSE',
    description: 'Every pixel, every word, every interaction is intentional. We build experiences that mean something — and perform.',
    keyword: 'Meaningful. Precise. Alive.',
  },
];

// ── Sticky scroll philosophy block
// Outer div is tall (300vh), inner is sticky so it pins while you scroll.
// Active section index is derived from scrollYProgress.
function PhilosophyScroll() {
  const containerRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [prevIdx, setPrevIdx] = useState(null);
  const [direction, setDirection] = useState(1); // 1 = down, -1 = up

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Map scroll progress → section index
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      const raw = v * SECTIONS.length;
      const idx = Math.min(Math.floor(raw), SECTIONS.length - 1);
      setActiveIdx(prev => {
        if (idx !== prev) {
          setDirection(idx > prev ? 1 : -1);
          setPrevIdx(prev);
          return idx;
        }
        return prev;
      });
    });
    return unsubscribe;
  }, [scrollYProgress]);

  const s = SECTIONS[activeIdx];
  const BRAND = '#C8502A';

  return (
    <div ref={containerRef} style={{ height: `${SECTIONS.length * 100}vh`, background: '#080808', position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>

        {/* ── BACKGROUND LAYER ── */}
        {/* Animated section-color orb */}
        <AnimatePresence mode="wait">
          <motion.div key={activeIdx}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute', zIndex: 0, pointerEvents: 'none',
              top: '20%', right: '-5%',
              width: 'clamp(300px, 50vw, 700px)', height: 'clamp(300px, 50vw, 700px)',
              borderRadius: '50%',
              background: `radial-gradient(circle, rgba(200,80,42,${0.06 + activeIdx * 0.02}) 0%, transparent 70%)`,
              filter: 'blur(80px)',
            }}
          />
        </AnimatePresence>

        {/* Grain */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.25,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`,
          backgroundSize: '160px' }} />

        {/* Subtle grid */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '80px 80px' }} />

        {/* ── TOP STRIP: section tag + horizontal rule ── */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 5,
          display: 'flex', alignItems: 'center', padding: '2.2rem 5%', gap: 16 }}>
          <AnimatePresence mode="wait">
            <motion.span key={activeIdx + '-tag'}
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.4 }}
              style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.58rem', color: BRAND,
                       letterSpacing: '0.25em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
              {s.tag}
            </motion.span>
          </AnimatePresence>
          <motion.div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${BRAND}, rgba(200,80,42,0.15), transparent)` }}
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} />
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.55rem',
                         color: 'rgba(255,255,255,0.2)', letterSpacing: '0.18em' }}>
            {String(activeIdx + 1).padStart(2, '0')} / {String(SECTIONS.length).padStart(2, '0')}
          </span>
        </div>

        {/* ── MAIN CONTENT — full height flex ── */}
        <div style={{ height: '100%', display: 'flex', alignItems: 'center', padding: '0 5%' }}>

          {/* LEFT: big ghost number */}
          <div style={{ width: 'clamp(7rem, 14vw, 16rem)', flexShrink: 0, position: 'relative',
                        height: 'clamp(6rem, 14vw, 13rem)', overflow: 'hidden', zIndex: 2 }}>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div key={activeIdx}
                initial={{ y: direction > 0 ? '100%' : '-100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                exit={{ y: direction > 0 ? '-100%' : '100%', opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                style={{ position: 'absolute', inset: 0,
                         fontFamily: "'Barlow Condensed', sans-serif",
                         fontSize: 'clamp(5rem, 13vw, 11rem)', fontWeight: 900,
                         color: 'transparent',
                         WebkitTextStroke: '1px rgba(255,255,255,0.06)',
                         lineHeight: 1, letterSpacing: '-0.03em', userSelect: 'none' }}>
                {s.number}.
              </motion.div>
            </AnimatePresence>
            {/* Filled dim number — slightly offset */}
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div key={activeIdx + '-fill'}
                initial={{ y: direction > 0 ? '100%' : '-100%', opacity: 0 }}
                animate={{ y: '6%', opacity: 1 }}
                exit={{ y: direction > 0 ? '-100%' : '100%', opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.04, ease: [0.76, 0, 0.24, 1] }}
                style={{ position: 'absolute', inset: 0,
                         fontFamily: "'Barlow Condensed', sans-serif",
                         fontSize: 'clamp(5rem, 13vw, 11rem)', fontWeight: 900,
                         color: 'rgba(255,255,255,0.05)',
                         lineHeight: 1, letterSpacing: '-0.03em', userSelect: 'none' }}>
                {s.number}.
              </motion.div>
            </AnimatePresence>
          </div>

          {/* CENTER: big heading */}
          <div style={{ flex: '0 0 auto', paddingLeft: '2rem', paddingRight: '4rem', zIndex: 2 }}>
            {/* Animated brand dot above heading */}
            <AnimatePresence mode="wait">
              <motion.div key={activeIdx + '-dot'}
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '0.8rem' }}>
                <motion.div
                  animate={{ scale: [1, 1.4, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ width: 6, height: 6, borderRadius: '50%', background: BRAND }} />
                <div style={{ width: 32, height: 1, background: `linear-gradient(90deg, ${BRAND}, transparent)` }} />
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div key={activeIdx} initial="hidden" animate="visible" exit="exit">
                {s.lines.map((line, i) => {
                  const isAccentLine = line.replace('.', '') === s.accent;
                  return (
                    <div key={line} style={{ overflow: 'hidden' }}>
                      <motion.div
                        variants={{
                          hidden: { y: direction > 0 ? '110%' : '-110%', skewY: direction > 0 ? 3 : -3 },
                          visible: { y: '0%', skewY: 0, transition: { duration: 0.75, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] } },
                          exit:    { y: direction > 0 ? '-110%' : '110%', skewY: direction > 0 ? -2 : 2, transition: { duration: 0.5, delay: i * 0.05, ease: [0.76, 0, 0.24, 1] } },
                        }}
                        style={{
                          fontFamily: "'Barlow Condensed', sans-serif",
                          fontSize: 'clamp(3.8rem, 9vw, 8rem)',
                          fontWeight: 900,
                          lineHeight: 0.88,
                          letterSpacing: '-0.02em',
                          textTransform: 'uppercase',
                          color: isAccentLine ? BRAND : '#e8e6e0',
                          textShadow: isAccentLine ? `0 0 80px rgba(200,80,42,0.35)` : 'none',
                        }}
                      >
                        {line}
                      </motion.div>
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>

            {/* Keyword pills */}
            <AnimatePresence mode="wait">
              <motion.div key={activeIdx + '-kw'}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                style={{ marginTop: '1.4rem', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {s.keyword.split('. ').map((kw, ki) => (
                  <span key={ki} style={{
                    fontFamily: "'DM Mono', monospace", fontSize: '0.55rem',
                    color: ki === 0 ? BRAND : 'rgba(255,255,255,0.28)',
                    letterSpacing: '0.18em', textTransform: 'uppercase',
                    padding: '4px 10px',
                    border: `1px solid ${ki === 0 ? 'rgba(200,80,42,0.4)' : 'rgba(255,255,255,0.08)'}`,
                    borderRadius: 3,
                  }}>{kw.replace('.', '')}</span>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT: description card */}
          <div style={{ flex: 1, maxWidth: 420, zIndex: 2 }}>
            {/* Decorative vertical line */}
            <div style={{ width: 1, height: 48, background: `linear-gradient(180deg, transparent, ${BRAND}, transparent)`, marginBottom: '1.4rem' }} />

            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={activeIdx + '-desc'}
                initial={{ opacity: 0, y: direction > 0 ? 28 : -28 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.65, delay: 0.28, ease: [0.22, 1, 0.36, 1] } }}
                exit={{ opacity: 0, y: direction > 0 ? -20 : 20, transition: { duration: 0.3 } }}
              >
                <p style={{ fontFamily: "'Inter', sans-serif",
                            fontSize: 'clamp(0.9rem, 1.4vw, 1.08rem)',
                            color: 'rgba(255,255,255,0.48)', lineHeight: 1.75, margin: 0 }}>
                  {s.description}
                </p>

                {/* Bottom stat strip */}
                <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 20, height: 1, background: BRAND }} />
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.55rem',
                                 color: 'rgba(255,255,255,0.2)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                    iuxoa philosophy
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── BOTTOM STRIP ── */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 5,
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '1.8rem 5%', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          {/* Scroll hint */}
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.52rem',
                         color: 'rgba(255,255,255,0.18)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Scroll to explore
          </span>

          {/* Progress bar */}
          <div style={{ flex: 1, maxWidth: 200, height: 1, background: 'rgba(255,255,255,0.06)', margin: '0 2rem', position: 'relative' }}>
            <motion.div
              animate={{ width: `${((activeIdx + 1) / SECTIONS.length) * 100}%` }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: 'absolute', top: 0, left: 0, height: '100%', background: BRAND }} />
          </div>

          {/* Dot nav */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {SECTIONS.map((_, i) => (
              <motion.div key={i}
                animate={{ width: i === activeIdx ? 24 : 6, background: i === activeIdx ? BRAND : 'rgba(255,255,255,0.2)' }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{ height: 2, borderRadius: 2 }} />
            ))}
          </div>
        </div>

        {/* ── RIGHT EDGE: vertical section counter ── */}
        <div style={{ position: 'absolute', right: '2.2%', top: '50%', transform: 'translateY(-50%)',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, zIndex: 5 }}>
          {SECTIONS.map((sec, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <motion.div
                animate={{ height: i === activeIdx ? 32 : 10, background: i === activeIdx ? BRAND : 'rgba(255,255,255,0.15)' }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{ width: 2, borderRadius: 2 }} />
              {i === activeIdx && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.42rem',
                           color: BRAND, letterSpacing: '0.1em', writingMode: 'vertical-rl' }}>
                  {sec.number}
                </motion.span>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

// ── Team photo hero — uses real team group photo
function TeamPhoto() {
  return (
    <div style={{
      position: 'relative', width: '100%', height: '100vh', minHeight: 600,
      background: '#0a0612',
      overflow: 'hidden',
    }}>
      {/* ── Deep dark bg ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: 'radial-gradient(ellipse 80% 70% at 60% 60%, #1a0a2e 0%, #0d0618 38%, #080110 68%, #030008 100%)',
      }} />

      {/* ── Film grain ── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', opacity: 0.22,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`,
        backgroundSize: '160px' }} />

      {/* ── Subtle grid ── */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none', opacity: 0.04 }}>
        <defs><pattern id="hg" width="90" height="90" patternUnits="userSpaceOnUse"><path d="M 90 0 L 0 0 0 90" fill="none" stroke="rgba(255,255,255,1)" strokeWidth="0.5"/></pattern></defs>
        <rect width="100%" height="100%" fill="url(#hg)" />
      </svg>

      {/* ── TEAM PHOTO — centered, fills right side ── */}
      <div style={{
        position: 'absolute',
        top: 0, right: 0, bottom: 0,
        width: '70%',
        zIndex: 2,
        overflow: 'hidden',
      }}>
        <motion.img
          src={teamGroupImg}
          alt="IUXOA Team"
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
            display: 'block',
            // Moody site-matching treatment: desaturate, darken slightly, warm tone
            filter: 'brightness(0.88) contrast(1.08) saturate(1.1)',
            mixBlendMode: 'normal',
          }}
        />

        {/* Left edge fade — blends photo into left text area */}
        <div style={{
          position: 'absolute', top: 0, left: 0, bottom: 0, width: '45%', zIndex: 3,
          background: 'linear-gradient(to right, #060404 0%, rgba(6,4,4,0.85) 40%, transparent 100%)',
          pointerEvents: 'none',
        }} />

        {/* Bottom fade */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%', zIndex: 3,
          background: 'linear-gradient(to top, #030000 0%, transparent 100%)',
          pointerEvents: 'none',
        }} />

        {/* Top fade */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '18%', zIndex: 3,
          background: 'linear-gradient(to bottom, #060404 0%, transparent 100%)',
          pointerEvents: 'none',
        }} />

        {/* ── Brand ember glow overlay on photo ── */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 4, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 60% 55% at 65% 60%, rgba(200,80,42,0.12) 0%, transparent 70%)',
        }} />
      </div>

      {/* ── Left side dark vignette ── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, bottom: 0, width: '40%', zIndex: 3, pointerEvents: 'none',
        background: 'linear-gradient(to right, rgba(3,0,0,0.95) 0%, rgba(6,4,4,0.7) 60%, transparent 100%)',
      }} />

      {/* ── Thin vertical accent lines — matching original style ── */}
      <div style={{ position: 'absolute', top: 0, right: '22%', width: 1, height: '45%', zIndex: 5, background: 'linear-gradient(180deg, transparent, rgba(200,70,30,0.45), transparent)' }} />
      <div style={{ position: 'absolute', top: 0, right: '38%', width: 1, height: '30%', zIndex: 5, background: 'linear-gradient(180deg, transparent, rgba(200,70,30,0.18), transparent)' }} />

      {/* ── TAGLINE — bottom right ── */}
      <div style={{ position: 'absolute', bottom: '8%', right: '5%', maxWidth: 460, textAlign: 'right', zIndex: 8 }}>
        <motion.div
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ delay: 1.0, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(200,80,42,0.6))', marginBottom: '1rem', transformOrigin: 'right' }}
        />
        <motion.p
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(1.1rem, 2.4vw, 1.4rem)', fontWeight: 700, color: '#fff', lineHeight: 1.35, marginBottom: '0.5rem' }}>
          We combine years of web design and branding expertise
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(1rem, 2vw, 1.2rem)', fontWeight: 400, color: 'rgba(255,255,255,0.38)', lineHeight: 1.35 }}>
          to craft meaningful, story-driven experiences.
        </motion.p>
      </div>

      {/* ── Team badge — floating bottom-left ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'absolute', bottom: '9%', left: '5%', zIndex: 8,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
        <div style={{ width: 28, height: 1, background: '#C8502A' }} />
        <div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.55rem', color: '#C8502A', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 3 }}>IUXOA Studio</div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.5rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.16em', textTransform: 'uppercase' }}>Core Team · Est. 2024</div>
        </div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        style={{ position: 'absolute', bottom: '5%', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, zIndex: 8 }}
      >
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.5rem', color: 'rgba(255,255,255,0.22)', letterSpacing: '0.22em', textTransform: 'uppercase' }}>Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: 1, height: 32, background: 'linear-gradient(to bottom, rgba(200,80,42,0.6), transparent)' }} />
      </motion.div>
    </div>
  );
}
// ── Origins section: big heading left, description right, wide image below
function OriginsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const imgRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  return (
    <div ref={ref} style={{ background: '#000', padding: '7rem 5% 0' }}>
      {/* Top row: ORIGINS + description */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'flex-end', marginBottom: '3.5rem', gap: '2rem' }}>
        {/* Heading */}
        <div style={{ overflow: 'hidden' }}>
          <motion.h2
            initial={{ y: '105%' }}
            animate={inView ? { y: '0%' } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 'clamp(4rem, 10vw, 9rem)',
              fontWeight: 900,
              color: '#e8e6e0',
              lineHeight: 0.88,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              margin: 0,
            }}
          >
            ORIGINS
          </motion.h2>
        </div>

        {/* Description — top-right, fades in */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)',
            color: 'rgba(255,255,255,0.45)',
            lineHeight: 1.7,
            maxWidth: 400,
            marginLeft: 'auto',
            margin: 0,
            paddingBottom: '0.5rem',
          }}
        >
          Rooted in creativity, our journey blends heritage and innovation, shaping meaningful digital stories that connect brands globally.
        </motion.p>
      </div>

      {/* Wide image — parallax scroll */}
      <motion.div
        ref={imgRef}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: '100%',
          height: 'clamp(320px, 55vw, 620px)',
          borderRadius: '12px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Parallax inner */}
        <motion.div style={{ y: imgY, width: '100%', height: '115%', position: 'absolute', top: '-7.5%' }}>
          <img
            src={originImg}
            alt="IUXOA Core Team"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

function AwardRow({ award, index, parentInView }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={parentInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12 + 0.2, ease: [0.22, 1, 0.36, 1] }}
      style={{ borderTop: '1px solid rgba(255,255,255,0.1)', padding: '2.2rem 0', cursor: 'default' }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '3.5rem 1fr auto', gap: '0.5rem', alignItems: 'center' }}>
        {/* Number with red dot */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.85rem', fontWeight: 500,
            color: 'rgba(255,255,255,0.3)',
            letterSpacing: '0.03em',
          }}>{award.num}</span>
          <span style={{
            width: 5, height: 5, borderRadius: '50%',
            background: '#e85533', display: 'inline-block', flexShrink: 0,
          }} />
        </div>
        {/* Org + Title stacked */}
        <div>
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.78rem',
            color: 'rgba(255,255,255,0.35)',
            letterSpacing: '0.04em',
            marginBottom: '0.3rem',
          }}>{award.org}</div>
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
            fontWeight: 700,
            color: hovered ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.82)',
            letterSpacing: '-0.01em',
            transition: 'color 0.25s',
          }}>{award.title}</div>
        </div>
        {/* Year */}
        <span style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)',
          fontWeight: 700,
          color: hovered ? '#fff' : 'rgba(255,255,255,0.22)',
          transition: 'color 0.25s',
          letterSpacing: '0.02em',
        }}>{award.year}</span>
      </div>
    </motion.div>
  );
}

function AwardsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const awards = [
    { num: '01.', org: 'Awwwards',        title: 'Site of the Day – iuxoa',          year: '2024' },
    { num: '02.', org: 'Awwwards',        title: 'Site of the Month – Brandex',      year: '2024' },
    { num: '03.', org: 'CSSDesignAward',  title: 'Website of the Day – iuxoa',       year: '2024' },
    { num: '04.', org: 'The FWA',         title: 'FWA of the Day – Momentum',        year: '2025' },
  ];
  return (
    <div ref={ref} style={{ background: '#000', padding: '6rem 5% 6rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '2rem', alignItems: 'flex-start' }} className="awards-grid">

        {/* Left — bright bold AWARDS, sticky */}
        <div style={{ overflow: 'visible' }}>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 'clamp(4rem, 10vw, 8.5rem)',
              fontWeight: 900,
              color: '#e8e6e0',
              lineHeight: 0.88,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              margin: 0,
              position: 'sticky',
              top: '35vh',
            }}
          >
            AWARDS
          </motion.h2>
        </div>

        {/* Right — rows */}
        <div>
          {awards.map((a, i) => (
            <AwardRow key={a.title} award={a} index={i} parentInView={inView} />
          ))}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }} />
        </div>
      </div>
    </div>
  );
}

const TEAM = [
  { name: 'Ayush Mahanta',      role: 'DATA ANALYST · FULL STACK · RESEARCHER',              joined: 'Jan 2025',   img: ayushImg,   color: '#1a1a1a', socials: { linkedin: '#', instagram: 'https://www.instagram.com/duneli.iuxoa?igsh=MWhtanI0eTZ0eGU3eA==', twitter: '#' } },
  { name: 'Manav Jain',         role: 'FRONTEND DEV · GRAPHICS DESIGNER · MARKETING',        joined: 'May 2025',   img: manovImg,   color: '#1c1c1c', socials: { linkedin: '#', instagram: '#', twitter: '#' } },
  { name: 'Atharv Gupta',       role: 'FULL STACK DEVELOPER',                                joined: 'Sept 2025',  img: athravImg,  color: '#181818', socials: { linkedin: '#', instagram: '#', twitter: '#' } },
  { name: 'Simranpreet Kaur',   role: 'FULL STACK DEVELOPER',                                joined: 'Jan 2026',   img: null,       color: '#1a1a1a', socials: { linkedin: '#', instagram: '#', twitter: '#' } },
  { name: 'Sarika Ruhil',       role: 'FULL STACK DEVELOPER',                                joined: 'Jan 2026',   img: sarikaImg,  color: '#1c1c1c', socials: { linkedin: '#', instagram: '#', twitter: '#' } },
  { name: 'Manan Jain',         role: 'FRONTEND DEVELOPER · APP TESTER',                     joined: 'Jan 2026',   img: null,       color: '#181818', socials: { linkedin: '#', instagram: '#', twitter: '#' } },
  { name: 'Divya',              role: 'FRONTEND DEVELOPER',                                  joined: 'Feb 2026',   img: null,       color: '#1a1a1a', socials: { linkedin: '#', instagram: '#', twitter: '#' } },
  { name: 'Ridhi Gupta',        role: 'BACKEND DEVELOPER · DATA ANALYST',                    joined: 'March 2026', img: ridhiImg,   color: '#1c1c1c', socials: { linkedin: '#', instagram: '#', twitter: '#' } },
  { name: 'Vaishali Bahuguna',  role: 'FULL STACK DEVELOPER',                                joined: 'March 2026', img: vaishalImg, color: '#181818', socials: { linkedin: '#', instagram: '#', twitter: '#' } },
  { name: 'Manish Anand Pandey',role: 'BACKEND DEVELOPER · RESEARCHER',                      joined: 'Apr 2026',   img: null,       color: '#1a1a1a', socials: { linkedin: '#', instagram: '#', twitter: '#' } },
  { name: 'Khushi',             role: 'FRONTEND DEVELOPER',                                  joined: 'Apr 2026',   img: null,       color: '#1c1c1c', socials: { linkedin: '#', instagram: '#', twitter: '#' } },
];

// ── Holographic shimmer TeamCard ──
function TeamCard({ member, index, inView }) {
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    const nx = (cx / rect.width - 0.5) * 2;   // -1 to 1
    const ny = (cy / rect.height - 0.5) * 2;
    setTilt({ x: ny * -14, y: nx * 14 });
    setGlowPos({ x: (cx / rect.width) * 100, y: (cy / rect.height) * 100 });
  };
  const handleMouseLeave = () => {
    setHovered(false);
    setTilt({ x: 0, y: 0 });
    setGlowPos({ x: 50, y: 50 });
  };

  // Accent colors cycling per card
  const ACCENTS = ['#C8502A', '#8B5CF6', '#06B6D4', '#10B981', '#F59E0B', '#EC4899', '#3B82F6', '#EF4444', '#14B8A6', '#F97316', '#A855F7'];
  const accent = ACCENTS[index % ACCENTS.length];

  // SVG avatar colours per card
  const avatarPalettes = [
    { skin: '#c8956a', hair: '#3a2010', shirt: '#2a3545' },
    { skin: '#d4a882', hair: '#1a0c04', shirt: '#2c2c2c' },
    { skin: '#c09070', hair: '#1c1008', shirt: '#e8e0d0' },
    { skin: '#c8a080', hair: '#281408', shirt: '#1a1a1a' },
  ];
  const p = avatarPalettes[index % avatarPalettes.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.92 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, delay: index * 0.09 + 0.15, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: '900px' }}
    >
    <motion.div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX: tilt.x, rotateY: tilt.y, scale: hovered ? 1.035 : 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      style={{
        borderRadius: 20,
        overflow: 'hidden',
        position: 'relative',
        cursor: 'default',
        transformStyle: 'preserve-3d',
        boxShadow: hovered
          ? `0 30px 80px rgba(0,0,0,0.7), 0 0 0 1.5px ${accent}55, 0 0 60px ${accent}22`
          : '0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)',
        transition: 'box-shadow 0.4s ease',
        background: '#0d0d0d',
      }}
    >
      {/* ── Holographic mouse-follow glow ── */}
      {hovered && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', borderRadius: 20,
          background: `radial-gradient(circle 180px at ${glowPos.x}% ${glowPos.y}%, ${accent}28, transparent 70%)`,
          transition: 'background 0.05s',
        }} />
      )}

      {/* ── Rainbow shimmer border ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none', borderRadius: 20,
        opacity: hovered ? 1 : 0,
        background: `linear-gradient(135deg, ${accent}44 0%, transparent 40%, ${accent}22 100%)`,
        transition: 'opacity 0.3s',
      }} />

      {/* ── Photo area ── */}
      <div style={{ width: '100%', aspectRatio: '3/3.6', background: '#161616', overflow: 'hidden', position: 'relative' }}>

        {/* Accent top bar */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 3, zIndex: 10,
          background: `linear-gradient(90deg, ${accent}, ${accent}88, transparent)`,
        }} />

        {/* Index number — top right */}
        <div style={{
          position: 'absolute', top: 12, right: 14, zIndex: 10,
          fontFamily: "'DM Mono', monospace", fontSize: '0.58rem',
          color: 'rgba(255,255,255,0.22)', letterSpacing: '0.1em',
        }}>#{String(index + 1).padStart(2, '0')}</div>

        {/* Real photo */}
        {member.img && (
          <motion.img
            src={member.img}
            alt={member.name}
            animate={{ scale: hovered ? 1.07 : 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center top',
              display: 'block', filter: hovered ? 'brightness(1.1) contrast(1.05)' : 'brightness(0.9)',
              transition: 'filter 0.4s',
            }}
          />
        )}

        {/* SVG avatar for no-photo members */}
        {!member.img && (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: `radial-gradient(ellipse at 50% 30%, ${accent}18, #111 70%)` }}>
            <svg viewBox="0 0 200 240" width="70%" height="70%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient id={`skin-av-${index}`} cx="50%" cy="35%" r="55%">
                  <stop offset="0%" stopColor={p.skin} />
                  <stop offset="100%" stopColor="#3a1a08" />
                </radialGradient>
              </defs>
              {/* Body */}
              <ellipse cx="100" cy="270" rx="90" ry="55" fill={p.shirt} />
              <rect x="38" y="195" width="124" height="90" rx="14" fill={p.shirt} />
              {/* Neck */}
              <rect x="84" y="155" width="32" height="38" rx="8" fill={`url(#skin-av-${index})`} />
              {/* Head */}
              <ellipse cx="100" cy="125" rx="56" ry="60" fill={`url(#skin-av-${index})`} />
              {/* Hair based on index */}
              {index % 2 === 0 ? (
                <ellipse cx="100" cy="74" rx="60" ry="30" fill={p.hair} />
              ) : (
                <>
                  <ellipse cx="100" cy="72" rx="62" ry="32" fill={p.hair} />
                  <rect x="44" y="88" width="18" height="80" rx="9" fill={p.hair} />
                  <rect x="138" y="88" width="18" height="80" rx="9" fill={p.hair} />
                </>
              )}
              {/* Eyes */}
              <ellipse cx="82" cy="124" rx="7" ry="7" fill="#1a0c04" />
              <ellipse cx="118" cy="124" rx="7" ry="7" fill="#1a0c04" />
              <ellipse cx="84" cy="122" rx="2.5" ry="2.5" fill="rgba(255,255,255,0.5)" />
              <ellipse cx="120" cy="122" rx="2.5" ry="2.5" fill="rgba(255,255,255,0.5)" />
              {/* Smile */}
              <path d="M 84 150 Q 100 162 116 150" stroke="rgba(100,40,20,0.5)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              {/* Accent glow ring */}
              <circle cx="100" cy="125" r="68" fill="none" stroke={accent} strokeWidth="1.5" strokeOpacity="0.2" strokeDasharray="6 4" />
            </svg>
          </div>
        )}

        {/* Bottom gradient */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '55%', zIndex: 3,
          background: 'linear-gradient(to top, #0d0d0d 20%, transparent 100%)',
          pointerEvents: 'none',
        }} />

        {/* ── Name overlay on photo ── */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 4, padding: '0 1.2rem 1rem' }}>
          <div style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 'clamp(1.4rem, 2.2vw, 1.8rem)',
            fontWeight: 900,
            color: '#fff',
            letterSpacing: '-0.01em',
            lineHeight: 1,
            textShadow: '0 2px 20px rgba(0,0,0,0.8)',
          }}>{member.name}</div>
          <div style={{
            fontFamily: "'DM Mono', monospace", fontSize: '0.56rem',
            color: accent, letterSpacing: '0.14em', textTransform: 'uppercase',
            marginTop: 4, opacity: 0.9,
          }}>Joined {member.joined}</div>
        </div>
      </div>

      {/* ── Info area ── */}
      <div style={{ padding: '1rem 1.2rem 1.2rem', position: 'relative', zIndex: 5 }}>

        {/* Role chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: '1rem' }}>
          {member.role.split(' · ').map((r, ri) => (
            <span key={ri} style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '0.52rem',
              color: ri === 0 ? accent : 'rgba(255,255,255,0.35)',
              background: ri === 0 ? `${accent}18` : 'rgba(255,255,255,0.04)',
              border: `1px solid ${ri === 0 ? accent + '44' : 'rgba(255,255,255,0.08)'}`,
              borderRadius: 6,
              padding: '3px 8px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}>{r}</span>
          ))}
        </div>

        {/* Animated underline */}
        <motion.div
          animate={{ scaleX: hovered ? 1 : 0.3, opacity: hovered ? 1 : 0.3 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ height: 1, background: `linear-gradient(90deg, ${accent}, transparent)`,
            transformOrigin: 'left', marginBottom: '0.9rem' }}
        />

        {/* Social icons */}
        <div style={{ display: 'flex', gap: 6 }}>
          {[
            { key: 'linkedin',  label: 'in', href: member.socials?.linkedin },
            { key: 'instagram', label: '◎',  href: member.socials?.instagram },
            { key: 'twitter',   label: '✕',  href: member.socials?.twitter },
          ].map(({ key, label, href }) => (
            <a key={key} href={href || '#'} target="_blank" rel="noopener noreferrer"
              onClick={e => { if (!href || href === '#') e.preventDefault(); }}
              style={{
                width: 30, height: 30, borderRadius: 8,
                border: `1px solid rgba(255,255,255,0.1)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                textDecoration: 'none', position: 'relative', overflow: 'hidden',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = accent;
                e.currentTarget.style.background = `${accent}22`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.62rem', fontWeight: 700,
                color: 'rgba(255,255,255,0.45)' }}>{label}</span>
            </a>
          ))}

          {/* Status dot */}
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 5 }}>
            <motion.div
              animate={{ opacity: [1, 0.3, 1], scale: [1, 0.8, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: index * 0.3 }}
              style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e',
                boxShadow: '0 0 8px rgba(34,197,94,0.7)' }}
            />
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.48rem',
              color: 'rgba(255,255,255,0.22)', letterSpacing: '0.1em' }}>ACTIVE</span>
          </div>
        </div>
      </div>
    </motion.div>
    </motion.div>
  );
}

function MeetOurTeam() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });
  const [filter, setFilter] = useState('ALL');
  const navigate = useNavigate();

  const roles = ['ALL', 'DEV', 'DESIGN', 'DATA', 'RESEARCH'];
  const filterMap = {
    ALL: () => true,
    DEV: m => m.role.toUpperCase().includes('DEVELOPER') || m.role.toUpperCase().includes('STACK'),
    DESIGN: m => m.role.toUpperCase().includes('DESIGN') || m.role.toUpperCase().includes('FRONTEND'),
    DATA: m => m.role.toUpperCase().includes('DATA') || m.role.toUpperCase().includes('ANALYST'),
    RESEARCH: m => m.role.toUpperCase().includes('RESEARCH'),
  };
  const filtered = TEAM.filter(filterMap[filter]);

  return (
    <div ref={ref} style={{ background: '#080808', padding: '8rem 5% 8rem', position: 'relative', overflow: 'hidden' }}>

      {/* ── BG decoration orbs ── */}
      <div style={{ position: 'absolute', top: '10%', left: '-10%', width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(200,80,42,0.06) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '5%', right: '-8%', width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }} />

      {/* ── Heading block ── */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '3.5rem' }}>

        {/* eyebrow */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1.2rem' }}>
          <div style={{ width: 28, height: 1, background: '#C8502A' }} />
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.62rem',
            letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C8502A' }}>(OUR TEAM)</span>
        </motion.div>

        {/* Giant heading with stagger */}
        <div style={{ overflow: 'hidden', lineHeight: 0.85 }}>
          <motion.div initial={{ y: '110%' }} animate={inView ? { y: '0%' } : {}}
            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(4rem, 10vw, 9rem)',
              color: '#e8e6e0', textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
            MEET THE
          </motion.div>
        </div>
        <div style={{ overflow: 'hidden', lineHeight: 0.85 }}>
          <motion.div initial={{ y: '110%' }} animate={inView ? { y: '0%' } : {}}
            transition={{ duration: 1, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'flex', alignItems: 'baseline', gap: '0.2em' }}>
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(4rem, 10vw, 9rem)',
              color: '#C8502A', textTransform: 'uppercase', letterSpacing: '-0.02em',
              textShadow: '0 0 80px rgba(200,80,42,0.4)' }}>SQUAD</span>
            <motion.span animate={{ rotate: [0, 20, 0, -15, 0] }} transition={{ duration: 4, repeat: Infinity, delay: 2 }}
              style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', display: 'inline-block' }}>✦</motion.span>
          </motion.div>
        </div>

        {/* Subtitle + filter row */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%', marginTop: '2rem', flexWrap: 'wrap', gap: '1.5rem' }}>

          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(0.9rem, 1.3vw, 1rem)',
            color: 'rgba(255,255,255,0.38)', lineHeight: 1.7, maxWidth: 380, margin: 0 }}>
            A tight-knit crew of designers, builders & strategists who turn wild ideas into digital reality.
          </p>

          {/* Filter pills */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {roles.map(r => (
              <button key={r} onClick={() => setFilter(r)}
                style={{
                  fontFamily: "'DM Mono', monospace", fontSize: '0.58rem',
                  letterSpacing: '0.14em', textTransform: 'uppercase',
                  padding: '6px 14px', borderRadius: 100,
                  cursor: 'pointer', border: 'none', outline: 'none',
                  background: filter === r ? '#C8502A' : 'rgba(255,255,255,0.06)',
                  color: filter === r ? '#fff' : 'rgba(255,255,255,0.4)',
                  transition: 'all 0.25s ease',
                  boxShadow: filter === r ? '0 0 20px rgba(200,80,42,0.4)' : 'none',
                }}
                onMouseEnter={e => { if (filter !== r) e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; }}
                onMouseLeave={e => { if (filter !== r) e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
              >{r}</button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── member count badge ── */}
      <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.6 }}
        style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '2.5rem' }}>
        <div style={{ height: 1, flex: 1, background: 'rgba(255,255,255,0.06)' }} />
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.56rem',
          color: 'rgba(255,255,255,0.2)', letterSpacing: '0.16em' }}>
          {filtered.length} MEMBER{filtered.length !== 1 ? 'S' : ''}
        </span>
      </motion.div>

      {/* ── Card grid ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
        gap: '1.4rem',
      }}>
        {filtered.map((member, i) => (
          <TeamCard key={member.name} member={member} index={TEAM.indexOf(member)} inView={inView} />
        ))}
      </div>

      {/* ── Bottom CTA strip ── */}
      <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.8 }}
        style={{ marginTop: '5rem', padding: '2.5rem 3rem', borderRadius: 20,
          background: 'linear-gradient(135deg, rgba(200,80,42,0.12), rgba(139,92,246,0.08))',
          border: '1px solid rgba(200,80,42,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
        <div>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
            fontWeight: 800, color: '#e8e6e0', letterSpacing: '-0.01em', marginBottom: 6 }}>
            Want to join the squad?
          </div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.88rem',
            color: 'rgba(255,255,255,0.38)', lineHeight: 1.6 }}>
            We're always looking for passionate humans to build with.
          </div>
        </div>
        <motion.button onClick={() => navigate('/contact')} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
          style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.72rem', letterSpacing: '0.14em',
            textTransform: 'uppercase', padding: '14px 28px', borderRadius: 100,
            background: '#C8502A', color: '#fff', border: 'none', cursor: 'pointer',
            boxShadow: '0 0 30px rgba(200,80,42,0.35)' }}>
          Get in Touch →
        </motion.button>
      </motion.div>

      {/* dummy div for old heading shape compatibility */}
      <div style={{ display: 'none' }}>
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.72rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)',
              marginBottom: '1rem',
            }}
          >
            (OUR TEAM)
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function StatsRow() {
  const stats = [
    { num: '2+', label: 'Years of Experience' },
    { num: '10+', label: 'Projects Delivered' },
    { num: '98%', label: 'Client Satisfaction' },
    { num: '12', label: 'Team Members' },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, borderTop: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)', background: '#0a0a0a' }} className="stats-grid">
      {stats.map((s, i) => (
        <motion.div key={s.label} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: i * 0.1 + 0.2, duration: 0.6 }}
          style={{ padding: '3rem 2rem', borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none', textAlign: 'center' }}>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, color: '#e85533', lineHeight: 1, letterSpacing: '-0.02em' }}>{s.num}</div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.15em', marginTop: 8 }}>{s.label}</div>
        </motion.div>
      ))}
    </div>
  );
}

// ── Main About page
export default function About() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <div style={{ background: '#000', minHeight: '100vh' }}>
      <Navigation />

      {/* ── Hero: team photo ── */}
      <div style={{ position: 'relative' }}>
        {/* (ABOUT US) eyebrow */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: mounted ? 1 : 0, x: mounted ? 0 : -20 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          style={{ position: 'absolute', top: '13%', left: '5%', zIndex: 10, display: 'flex', alignItems: 'center', gap: 10 }}
        >
          <div style={{ width: 20, height: 1, background: '#C8502A' }} />
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>(ABOUT US)</span>
        </motion.div>

        {/* BEHIND IUXOA — main hero heading */}
        <div style={{ position: 'absolute', top: '18%', left: '5%', zIndex: 10 }}>
          {/* "BEHIND" */}
          <div style={{ overflow: 'hidden' }}>
            <motion.div
              initial={{ y: '110%' }}
              animate={{ y: mounted ? '0%' : '110%' }}
              transition={{ delay: 0.2, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            >
              <span style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 'clamp(4rem, 10vw, 8.5rem)',
                fontWeight: 900,
                color: '#ffffff',
                lineHeight: 0.88,
                letterSpacing: '-0.01em',
                textTransform: 'uppercase',
                display: 'block',
                textShadow: '0 4px 60px rgba(0,0,0,0.6)',
              }}>BEHIND</span>
            </motion.div>
          </div>
          {/* "IUXOA" with X in brand color */}
          <div style={{ overflow: 'hidden' }}>
            <motion.div
              initial={{ y: '110%' }}
              animate={{ y: mounted ? '0%' : '110%' }}
              transition={{ delay: 0.32, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'flex', alignItems: 'baseline' }}
            >
              <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(4rem, 10vw, 8.5rem)', fontWeight: 900, color: '#ffffff', lineHeight: 0.88, letterSpacing: '-0.01em', textTransform: 'uppercase', textShadow: '0 4px 60px rgba(0,0,0,0.6)' }}>IU</span>
              <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(4rem, 10vw, 8.5rem)', fontWeight: 900, color: '#C8502A', lineHeight: 0.88, letterSpacing: '-0.01em', textTransform: 'uppercase', textShadow: '0 0 60px rgba(200,80,42,0.5), 0 4px 40px rgba(0,0,0,0.5)' }}>X</span>
              <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(4rem, 10vw, 8.5rem)', fontWeight: 900, color: '#ffffff', lineHeight: 0.88, letterSpacing: '-0.01em', textTransform: 'uppercase', textShadow: '0 4px 60px rgba(0,0,0,0.6)' }}>OA</span>
            </motion.div>
          </div>
          {/* Animated underline */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: mounted ? 1 : 0 }}
            transition={{ delay: 0.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ height: 2, background: 'linear-gradient(90deg, #C8502A, rgba(200,80,42,0.3), transparent)', marginTop: '0.6rem', transformOrigin: 'left', width: '80%' }}
          />
        </div>
        <TeamPhoto />
      </div>

      {/* ── Sticky scroll philosophy: number + text switches on scroll ── */}
      <PhilosophyScroll />

      {/* ── Origins: heading + image ── */}
      <OriginsSection />

      {/* ── Awards list ── */}
      <AwardsSection />

      {/* ── Meet Our Team ── */}
      <MeetOurTeam />

      {/* ── Stats ── */}
      <StatsRow />

      <ContactFooter />
    </div>
  );
}

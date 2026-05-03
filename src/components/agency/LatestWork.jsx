import React, { useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'framer-motion';
import { usePageTransition } from '../../context/TransitionContext';
import paradoxImg from '../../assets/team/Paradox.png';
import woinkImg   from '../../assets/team/Woink.png';
import runoxImg   from '../../assets/team/Runox.png';
import ubilityImg from '../../assets/team/Ubility.png';

const DISPLAY = "'Playfair Display', 'Georgia', serif";
const BODY    = "'DM Sans', 'Helvetica Neue', Arial, sans-serif";
const MONO    = "'DM Mono', 'Courier New', monospace";

/* ─── Per-character flip ─── */
function FlipText({ text, direction, style, charDelay = 0.05 }) {
  return (
    <span style={{ display: 'inline-flex', flexWrap: 'wrap', overflow: 'hidden', ...style }}>
      {text.split('').map((char, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden' }}>
          <motion.span
            key={`${text}-${i}`}
            initial={{ y: direction > 0 ? '100%' : '-100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: direction > 0 ? '-100%' : '100%', opacity: 0 }}
            transition={{ duration: 0.7, delay: i * charDelay, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'inline-block' }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ─── Block flip ─── */
function FlipBlock({ children, direction, style }) {
  return (
    <div style={{ overflow: 'hidden', ...style }}>
      <motion.div
        initial={{ y: direction > 0 ? '100%' : '-100%', opacity: 0 }}
        animate={{ y: '0%', opacity: 1 }}
        exit={{ y: direction > 0 ? '-100%' : '100%', opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

const projects = [
  {
    id: '01', name: 'Woink',
    tag: 'Word Game · Indie',
    desc: 'A fast-paced word game that challenges your vocabulary and reaction speed — build words, beat the clock, and outsmart your opponents in real time.',
    image: woinkImg,
    year: '2026',
  },
  {
    id: '02', name: 'Runox',
    tag: 'Territory App · GPS',
    desc: 'A smart footstep tracker that maps your movement — complete a full loop of any area with zero displacement and that territory gets named after you. Own your ground.',
    image: runoxImg,
    year: '2025',
  },
  {
    id: '03', name: 'Ubility',
    tag: 'Schedule App · Social',
    desc: 'Upload your schedule and instantly see when your friends, teachers, or anyone else is free — no more guessing, just real-time availability at a glance.',
    image: ubilityImg,
    year: '2026',
  },
  {
    id: '04', name: 'Paradox',
    tag: 'Space Game · Adventure',
    desc: 'An epic space warrior adventure — pilot through galaxies, battle alien forces, and race across the universe to return home and save your dying planet before time runs out.',
    image: paradoxImg,
    year: '2026',
  },
];

/* ─── Project Card ─── */
function ProjectCard({ project, onVisible }) {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const { scrollYProgress } = useScroll({ target: cardRef, offset: ['start end', 'end start'] });

  useTransform(scrollYProgress, (v) => { if (v > 0.3 && v < 0.85) onVisible(); });

  const scale        = useTransform(scrollYProgress, [0, 0.35, 0.6, 0.78, 1], [0.55, 1, 1, 1, 0.9]);
  const opacity      = useTransform(scrollYProgress, [0, 0.22, 0.5, 0.82, 1], [0, 1, 1, 1, 0.5]);
  const y            = useTransform(scrollYProgress, [0, 0.5, 1], ['6vh', '0vh', '-6vh']);
  const borderRadius = useTransform(scrollYProgress, [0, 0.35, 0.6], [40, 20, 20]);
  const imgScaleBase = useTransform(scrollYProgress, [0, 0.35, 0.6, 0.78, 1], [1.25, 1.04, 1.04, 1.04, 1.12]);
  const imgScale     = useSpring(imgScaleBase, { stiffness: 80, damping: 20 });

  return (
    <div ref={cardRef} style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 40px 24px 16px' }}>
      <motion.div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={handleMouseMove}
        onClick={() => { setClicked(true); setTimeout(() => setClicked(false), 600); }}
        style={{
          scale, opacity, y, borderRadius,
          width: '100%', maxWidth: '860px', height: '78vh',
          overflow: 'hidden', cursor: 'pointer', position: 'relative',
          boxShadow: '0 40px 120px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.06)',
          willChange: 'transform, opacity',
        }}
      >
        <motion.img src={project.image} alt={project.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', scale: imgScale, transformOrigin: 'center', display: 'block' }} />

        {/* Gradient overlay always */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)', pointerEvents: 'none' }} />

        {/* Hover dark overlay */}
        <motion.div animate={{ opacity: hovered ? 0.35 : 0 }} transition={{ duration: 0.3 }}
          style={{ position: 'absolute', inset: 0, background: '#000', pointerEvents: 'none' }} />

        {/* Bottom info bar */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '28px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', pointerEvents: 'none' }}>
          <div>
            <div style={{ fontFamily: MONO, fontSize: '0.62rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 6 }}>{project.tag}</div>
            <div style={{ fontFamily: DISPLAY, fontSize: 'clamp(1.6rem,3vw,2.6rem)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1 }}>{project.name}</div>
          </div>
          <div style={{ fontFamily: MONO, fontSize: '0.68rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em' }}>{project.year}</div>
        </div>

        {/* Cursor follow: VIEW PROJECT pill */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0, x: cursorPos.x, y: cursorPos.y, scale: clicked ? 0.88 : 1 }}
          transition={{ opacity: { duration: 0.3 }, x: { type: 'spring', stiffness: 200, damping: 25 }, y: { type: 'spring', stiffness: 200, damping: 25 }, scale: { duration: 0.2 } }}
          style={{ position: 'absolute', top: 0, left: 0, translateX: '-50%', translateY: '-50%', pointerEvents: 'none', zIndex: 20,
            display: 'flex', alignItems: 'center', gap: 9, background: '#C8502A',
            borderRadius: '999px', padding: '13px 24px', whiteSpace: 'nowrap' }}
        >
          <span style={{ fontFamily: BODY, fontWeight: 700, fontSize: '0.76rem', color: '#fff', letterSpacing: '0.1em', textTransform: 'uppercase' }}>View Project</span>
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
            <path d="M2 12L12 2M12 2H5M12 2V9" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>

        {/* Click flash */}
        <motion.div animate={{ opacity: clicked ? [0, 0.15, 0] : 0 }} transition={{ duration: 0.45 }}
          style={{ position: 'absolute', inset: 0, background: '#fff', pointerEvents: 'none', borderRadius: 'inherit' }} />
      </motion.div>
    </div>
  );
}

/* ─── More Projects Button ─── */
function MoreProjectsButton() {
  const [hovered, setHovered] = useState(false);
  const { navigateTo } = usePageTransition();
  return (
    <div style={{ background: '#0a0a0a', padding: '32px 40px 48px' }}>
      <motion.button
        onClick={() => navigateTo('/works')}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileTap={{ scale: 0.98 }}
        style={{ width: '100%', maxWidth: '860px', margin: '0 auto', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', position: 'relative', overflow: 'hidden',
          borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)',
          padding: '28px 40px', background: 'transparent', cursor: 'pointer', isolation: 'isolate' }}
      >
        <motion.div animate={{ scaleX: hovered ? 1 : 0 }} initial={{ scaleX: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: 'absolute', inset: 0, background: '#1a1a1a', transformOrigin: 'left', zIndex: 0, borderRadius: 'inherit' }} />
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
          <span style={{ fontFamily: MONO, fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>See everything</span>
          <span style={{ fontFamily: DISPLAY, fontSize: 'clamp(1.4rem,2.5vw,2rem)', fontWeight: 700, color: hovered ? '#fff' : 'rgba(255,255,255,0.7)', letterSpacing: '-0.02em', transition: 'color 0.3s' }}>All Projects →</span>
        </div>
        <motion.div animate={{ rotate: hovered ? 45 : 0, color: hovered ? '#C8502A' : 'rgba(255,255,255,0.25)' }}
          transition={{ duration: 0.35 }}
          style={{ position: 'relative', zIndex: 1, fontSize: '2rem', lineHeight: 1 }}>
          ✦
        </motion.div>
      </motion.button>
    </div>
  );
}

/* ─── Main Export ─── */
export default function LatestWork() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection]     = useState(1);
  const prevIndexRef                  = useRef(0);

  const handleVisible = useCallback((index) => {
    if (index !== prevIndexRef.current) {
      setDirection(index > prevIndexRef.current ? 1 : -1);
      prevIndexRef.current = index;
      setActiveIndex(index);
    }
  }, []);

  const project = projects[activeIndex];

  return (
    <div id="latest-work" style={{ background: '#0a0a0a', fontFamily: BODY }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');`}</style>

      {/* ── HEADING SECTION ── */}
      <div style={{ padding: '80px 48px 40px', position: 'relative', overflow: 'hidden' }}>
        {/* Eyebrow */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1.5rem' }}>
          <div style={{ width: 28, height: 1, background: '#C8502A' }} />
          <span style={{ fontFamily: MONO, fontSize: '0.65rem', color: '#C8502A', letterSpacing: '0.22em', textTransform: 'uppercase' }}>Selected Work</span>
        </motion.div>

        {/* Title row */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ overflow: 'hidden' }}>
            <motion.h2
              initial={{ y: '110%', opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontFamily: DISPLAY, fontSize: 'clamp(3.5rem, 9vw, 8rem)', fontWeight: 900,
                color: '#fff', letterSpacing: '-0.03em', lineHeight: 0.9, margin: 0 }}>
              Latest <em style={{ fontStyle: 'italic', fontWeight: 400, color: 'rgba(255,255,255,0.35)' }}>Work.</em>
            </motion.h2>
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, paddingBottom: '0.5rem' }}>
            <span style={{ fontFamily: MONO, fontSize: '0.6rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Total projects</span>
            <span style={{ fontFamily: DISPLAY, fontSize: '3rem', fontWeight: 900, color: 'rgba(255,255,255,0.12)', letterSpacing: '-0.04em', lineHeight: 1 }}>(0{projects.length})</span>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={{ height: 1, background: 'rgba(255,255,255,0.1)', marginTop: '2rem', transformOrigin: 'left' }} />
      </div>

      {/* ── TWO-COLUMN SCROLL AREA ── */}
      <div style={{ display: 'flex', position: 'relative' }}>

        {/* LEFT PANEL — sticky */}
        <div style={{ width: '32%', flexShrink: 0, position: 'sticky', top: 0, height: '100vh',
          display: 'flex', flexDirection: 'column', padding: '0 24px 52px 48px', zIndex: 10 }}>

          {/* Big dim project number */}
          <div style={{ paddingTop: '80px' }}>
            <div style={{ fontFamily: DISPLAY, fontSize: 'clamp(4rem, 10vw, 8rem)', fontWeight: 900,
              fontStyle: 'italic', color: 'rgba(255,255,255,0.05)', letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 24, userSelect: 'none' }}>
              <AnimatePresence mode="wait">
                <FlipText key={`num-${activeIndex}`} text={project.id} direction={direction} charDelay={0.1} />
              </AnimatePresence>
            </div>

            {/* Nav list */}
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {projects.map((p, i) => (
                <li key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <motion.div animate={{ width: i === activeIndex ? 20 : 8, background: i === activeIndex ? '#C8502A' : 'rgba(255,255,255,0.15)' }}
                    style={{ height: 1, flexShrink: 0, borderRadius: 1 }} transition={{ duration: 0.4 }} />
                  <span style={{ fontFamily: BODY, color: i === activeIndex ? '#fff' : 'rgba(255,255,255,0.2)',
                    fontWeight: i === activeIndex ? 600 : 400, fontSize: '0.82rem', letterSpacing: '0.02em', transition: 'color 0.4s' }}>
                    {p.name}
                  </span>
                  {i === activeIndex && (
                    <motion.span initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
                      style={{ fontFamily: MONO, fontSize: '0.55rem', color: '#C8502A', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      {p.tag}
                    </motion.span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ flex: 1 }} />

          {/* Active project name + desc */}
          <div>
            <div style={{ overflow: 'hidden', marginBottom: 8 }}>
              <AnimatePresence mode="wait">
                <FlipText key={`name-${activeIndex}`} text={project.name} direction={direction} charDelay={0.06}
                  style={{ fontFamily: DISPLAY, fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 900,
                    color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.05 }} />
              </AnimatePresence>
            </div>
            <AnimatePresence mode="wait">
              <FlipBlock key={`desc-${activeIndex}`} direction={direction} style={{ maxWidth: '230px' }}>
                <p style={{ fontFamily: BODY, color: 'rgba(255,255,255,0.35)', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
                  {project.desc}
                </p>
              </FlipBlock>
            </AnimatePresence>
          </div>
        </div>

        {/* RIGHT PANEL — scroll cards */}
        <div style={{ flex: 1 }}>
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} onVisible={() => handleVisible(i)} />
          ))}
        </div>
      </div>

      <MoreProjectsButton />
    </div>
  );
}

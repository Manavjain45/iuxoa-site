import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Navigation from '../components/agency/Navigation';
import { usePageTransition } from '../context/TransitionContext';

import ubilityImg      from '../assets/Projects/Ubility1.png';
import duneliImg       from '../assets/Projects/Duneli1.png';
import paradoxImg      from '../assets/Projects/paradox1.png';
import runoxImg        from '../assets/Projects/Runox1.png';
import solivoiceImg    from '../assets/Projects/Solivoice (2).png';
import codelensImg     from '../assets/Projects/Codelens1.png';
import superwebsiteImg from '../assets/Projects/Superwebsite1.png';
import woinkImg        from '../assets/Projects/Woink1.png';
import bexifyImg       from '../assets/Projects/Bexify1.png';

const DISPLAY = "'Playfair Display', 'Georgia', serif";
const BODY    = "'DM Sans', 'Helvetica Neue', Arial, sans-serif";
const MONO    = "'DM Mono', 'Courier New', monospace";

const FILTERS = ['All', 'App', 'Site', 'Game'];

const projects = [
  { id: '01', name: 'Ubility',      category: 'App',        tags: ['App'],        desc: 'Upload your schedule and instantly see when your friends, teachers, or anyone else is free — real-time availability at a glance.',                image: ubilityImg,      year: '2026' },
  { id: '02', name: 'Duneli',       category: 'Site',       tags: ['Site'],       desc: 'A modern website crafted with smooth interactions and a bold visual identity.',                       image: duneliImg,       year: '2025' },
  { id: '03', name: 'Paradox One',  category: 'Game',       tags: ['Game'],       desc: 'An epic space warrior adventure — pilot through galaxies and race across the universe to save your dying planet.',                             image: paradoxImg,      year: '2026' },
  { id: '04', name: 'Runox',        category: 'App',        tags: ['App'],        desc: 'A smart footstep tracker — complete a full loop of any area with zero displacement and that territory gets named after you.',                   image: runoxImg,        year: '2025' },
  { id: '05', name: 'Solivoice',    category: 'App',        tags: ['App'],        desc: 'A voice-powered productivity app designed for solo entrepreneurs and freelancers.',                   image: solivoiceImg,    year: '2025' },
  { id: '06', name: 'ERS',          category: 'App',        tags: ['App'],        desc: 'An emergency response system app that streamlines crisis management in real time.',                  image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=85', year: '2025' },
  { id: '07', name: 'Snorax',       category: 'App',        tags: ['App'],        desc: 'A sleep tracking and wellness app that helps users build better rest habits.',                       image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&q=85', year: '2025' },
  { id: '08', name: 'Codelens',     category: 'App',        tags: ['App'],        desc: 'A developer tool app for code review, insights, and team collaboration.',                            image: codelensImg,     year: '2025' },
  { id: '09', name: 'Superwebsite', category: 'Site',       tags: ['Site'],       desc: 'A high-performance marketing website with bold design and blazing-fast load times.',                 image: superwebsiteImg, year: '2025' },
  { id: '10', name: 'Woink',        category: 'Game',       tags: ['Game'],       desc: 'A fast-paced word game that challenges your vocabulary — build words, beat the clock, and outsmart your opponents in real time.',               image: woinkImg,        year: '2026' },
  { id: '11', name: 'Bexify',       category: 'App + Site', tags: ['App','Site'], desc: 'A full-stack product with both a feature-rich app and a polished marketing site.',                  image: bexifyImg,       year: '2025' },
];

const TAG_COLORS = { App: '#C8502A', Site: '#4A7FB5', Game: '#6B5EA8' };

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  // 3D tilt via mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-1, 1], [8, -8]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-1, 1], [-8, 8]), { stiffness: 150, damping: 20 });
  const glareX  = useTransform(mouseX, [-1, 1], ['0%', '100%']);
  const glareY  = useTransform(mouseY, [-1, 1], ['0%', '100%']);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(((e.clientX - rect.left) / rect.width  - 0.5) * 2);
    mouseY.set(((e.clientY - rect.top)  / rect.height - 0.5) * 2);
  };
  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); setHovered(false); };

  const tagColor = TAG_COLORS[project.tags[0]] || '#C8502A';

  // All cards same aspect ratio
  const aspectRatio = '8/5';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 60, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.96 }}
      transition={{ duration: 0.65, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: '800px' }}
    >
      <motion.div
        ref={cardRef}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        style={{
          rotateX, rotateY,
          transformStyle: 'preserve-3d',
          cursor: 'pointer',
          borderRadius: 20,
          overflow: 'hidden',
          position: 'relative',
          background: '#111',
          boxShadow: hovered
            ? '0 32px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.1)'
            : '0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)',
          transition: 'box-shadow 0.4s ease',
        }}
      >
        {/* ── IMAGE ── */}
        <div style={{ position: 'relative', overflow: 'hidden', aspectRatio }}>
          <motion.img
            src={project.image} alt={project.name}
            animate={{ scale: hovered ? 1.1 : 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', background: '#0a0a0a' }}
          />

          {/* Base dark gradient */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, transparent 40%, rgba(0,0,0,0.85) 100%)', pointerEvents: 'none' }} />

          {/* Hover full overlay */}
          <motion.div animate={{ opacity: hovered ? 1 : 0 }} transition={{ duration: 0.4 }}
            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', pointerEvents: 'none' }} />

          {/* Glare shine on hover */}
          <motion.div animate={{ opacity: hovered ? 0.12 : 0 }} transition={{ duration: 0.4 }}
            style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.7) 0%, transparent 60%)`,
            }} />

          {/* ── TOP BADGES ── */}
          <div style={{ position: 'absolute', top: 16, left: 16, right: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <motion.div animate={{ y: hovered ? 0 : -4, opacity: hovered ? 1 : 0.85 }} transition={{ duration: 0.3 }}
              style={{ display: 'flex', alignItems: 'center', gap: 6,
                background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(12px)',
                borderRadius: 999, padding: '5px 12px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <span style={{ fontFamily: MONO, fontSize: '0.58rem', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.12em' }}>{project.year}</span>
            </motion.div>
            <motion.div animate={{ y: hovered ? 0 : -4, opacity: hovered ? 1 : 0.85 }} transition={{ duration: 0.3, delay: 0.04 }}
              style={{ background: tagColor, borderRadius: 999, padding: '5px 12px' }}>
              <span style={{ fontFamily: MONO, fontSize: '0.55rem', fontWeight: 700, color: '#fff', letterSpacing: '0.14em', textTransform: 'uppercase' }}>{project.category}</span>
            </motion.div>
          </div>

          {/* ── SLIDE-UP INFO PANEL ── */}
          <motion.div
            animate={{ y: hovered ? 0 : '105%' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'absolute', bottom: 0, left: 0, right: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.75) 100%)',
              backdropFilter: 'blur(4px)', padding: '28px 24px 24px' }}
          >
            {/* Index + name */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
              <h3 style={{ fontFamily: DISPLAY, fontSize: 'clamp(1.3rem,2vw,1.75rem)', fontWeight: 700,
                color: '#fff', letterSpacing: '-0.025em', lineHeight: 1.05, margin: 0 }}>
                {project.name}
              </h3>
              <span style={{ fontFamily: MONO, fontSize: '0.62rem', color: tagColor, letterSpacing: '0.06em', marginTop: 4, flexShrink: 0, marginLeft: 12 }}>
                #{project.id}
              </span>
            </div>
            <p style={{ fontFamily: BODY, fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, margin: '0 0 16px' }}>
              {project.desc}
            </p>
            {/* CTA row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6,
                background: tagColor, borderRadius: 999, padding: '8px 18px' }}>
                <span style={{ fontFamily: BODY, fontSize: '0.7rem', fontWeight: 700, color: '#fff', letterSpacing: '0.1em', textTransform: 'uppercase' }}>View Project</span>
                <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
                  <path d="M2 12L12 2M12 2H5M12 2V9" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>↗</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── BELOW-IMAGE STRIP (visible when not hovered) ── */}
        <motion.div
          animate={{ opacity: hovered ? 0 : 1, height: hovered ? 0 : 'auto' }}
          transition={{ duration: 0.35 }}
          style={{ padding: '14px 20px 18px', overflow: 'hidden' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: DISPLAY, fontSize: 'clamp(1.1rem,1.8vw,1.5rem)', fontWeight: 700,
              color: 'rgba(255,255,255,0.85)', letterSpacing: '-0.02em', lineHeight: 1 }}>
              {project.name}
            </span>
            <motion.div animate={{ rotate: hovered ? 45 : 0 }} transition={{ duration: 0.3 }}
              style={{ width: 28, height: 28, borderRadius: '50%', border: `1px solid ${tagColor}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: tagColor, fontSize: '0.75rem' }}>
              ↗
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function Works() {
  const { navigateTo } = usePageTransition();
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.tags.includes(activeFilter));

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', fontFamily: BODY }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');`}</style>
      <Navigation />

      <div style={{ paddingTop: '80px' }}>

        {/* ── HERO HEADING ── */}
        <div style={{ padding: '70px 56px 20px', position: 'relative', overflow: 'hidden' }}>
          {/* Eyebrow */}
          

          {/* Big heading */}
          <div style={{ overflow: 'hidden', marginBottom: '1.5rem' }}>
            <motion.h1 initial={{ y: '110%', opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontFamily: DISPLAY, fontSize: 'clamp(4rem, 11vw, 10rem)', fontWeight: 900,
                color: '#fff', letterSpacing: '-0.035em', lineHeight: 0.88, margin: 0 }}>
              Our{' '}
              <em style={{ fontStyle: 'italic', fontWeight: 400, color: 'rgba(255,255,255,0.25)' }}>Works.</em>
            </motion.h1>
          </div>

          {/* Subtext + count row */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <p style={{ fontFamily: BODY, color: 'rgba(255,255,255,0.4)', fontSize: '1rem', maxWidth: 460, lineHeight: 1.65, margin: 0 }}>
              A selection of projects where we've turned bold ideas into digital experiences that perform.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingBottom: 4 }}>
              <span style={{ fontFamily: MONO, fontSize: '0.6rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Total</span>
              <span style={{ fontFamily: DISPLAY, fontSize: '2.5rem', fontWeight: 900, color: 'rgba(255,255,255,0.07)', letterSpacing: '-0.04em', lineHeight: 1 }}>{String(projects.length).padStart(2,'0')}</span>
            </div>
          </motion.div>

          {/* Divider */}
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ duration: 1.1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={{ height: 1, background: 'rgba(255,255,255,0.08)', marginTop: '2.5rem', transformOrigin: 'left' }} />
        </div>

        {/* ── FILTER BAR ── */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.5 }}
          style={{ padding: '28px 56px 32px', display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
          {FILTERS.map((tag) => {
            const isActive = activeFilter === tag;
            const count = tag === 'All' ? projects.length : projects.filter(p => p.tags.includes(tag)).length;
            const accent = TAG_COLORS[tag] || '#C8502A';
            return (
              <motion.button key={tag} onClick={() => setActiveFilter(tag)}
                whileTap={{ scale: 0.94 }} whileHover={{ scale: 1.03 }}
                style={{
                  fontFamily: BODY, fontSize: '0.78rem', fontWeight: isActive ? 700 : 500,
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  color: isActive ? '#fff' : 'rgba(255,255,255,0.4)',
                  background: isActive ? accent : 'transparent',
                  border: `1.5px solid ${isActive ? accent : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: 999, padding: '9px 20px', cursor: 'pointer',
                  transition: 'all 0.25s ease', outline: 'none',
                  display: 'flex', alignItems: 'center', gap: 7,
                }}>
                {tag}
                <span style={{
                  fontFamily: MONO, fontSize: '0.58rem', fontWeight: 700,
                  background: isActive ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.07)',
                  borderRadius: 999, padding: '2px 7px',
                  color: isActive ? '#fff' : 'rgba(255,255,255,0.25)',
                }}>{count}</span>
              </motion.button>
            );
          })}
          {/* Active filter label */}
          <AnimatePresence mode="wait">
            <motion.span key={activeFilter} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ fontFamily: MONO, fontSize: '0.6rem', color: 'rgba(255,255,255,0.18)', letterSpacing: '0.15em', textTransform: 'uppercase', marginLeft: 8 }}>
              {filtered.length} result{filtered.length !== 1 ? 's' : ''}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        {/* ── GRID ── */}
        <motion.div layout style={{ padding: '0 56px 80px',
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '32px',
          alignItems: 'start',
        }}>
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            )) : (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ gridColumn: '1 / -1', padding: '80px 0', textAlign: 'center',
                  fontFamily: BODY, color: 'rgba(255,255,255,0.2)', fontSize: '1rem', letterSpacing: '0.05em' }}>
                No projects in this category yet.
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── FOOTER CTA ── */}
        <div style={{ margin: '0 56px', borderTop: '1px solid rgba(255,255,255,0.07)', padding: '64px 0 80px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 28, height: 1, background: '#C8502A' }} />
            <span style={{ fontFamily: MONO, fontSize: '0.62rem', color: '#C8502A', letterSpacing: '0.22em', textTransform: 'uppercase' }}>More Upcoming</span>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <motion.p initial={{ y: '110%' }} whileInView={{ y: 0 }} viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontFamily: DISPLAY, fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', fontWeight: 900,
                color: '#fff', margin: 0, letterSpacing: '-0.03em', lineHeight: 0.92 }}>
              Have a project<br />
              <em style={{ fontStyle: 'italic', fontWeight: 400, color: 'rgba(255,255,255,0.3)' }}>in mind?</em>
            </motion.p>
          </div>
          <motion.button onClick={() => navigateTo('/contact')}
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 36px',
              borderRadius: 999, background: '#C8502A', border: 'none', cursor: 'pointer' }}>
            <span style={{ fontFamily: BODY, fontWeight: 700, fontSize: '0.82rem', color: '#fff', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Let's Talk</span>
            <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
              style={{ fontSize: '1rem', color: '#fff' }}>→</motion.span>
          </motion.button>
        </div>

      </div>
    </div>
  );
}

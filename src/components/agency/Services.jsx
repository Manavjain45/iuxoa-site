import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Smartphone, Globe, Palette, Code, FlaskConical } from 'lucide-react';

const services = [
  {
    icon: Gamepad2,
    number: '01',
    title: 'Game Development',
    description: 'Immersive, performant games built with passion — from concept to launch across mobile, web and desktop platforms.',
    tags: ['Unity', 'Unreal', 'WebGL'],
  },
  {
    icon: Smartphone,
    number: '02',
    title: 'App Development',
    description: 'Native and cross-platform apps with polished UX that users actually love to use every day.',
    tags: ['React Native', 'Flutter', 'iOS / Android'],
  },
  {
    icon: Globe,
    number: '03',
    title: 'Web & Sites',
    description: 'Fast, beautiful, SEO-optimised websites and web apps that convert visitors into loyal customers.',
    tags: ['React', 'Next.js', 'Vite'],
  },
  {
    icon: Palette,
    number: '04',
    title: 'UI / UX Design',
    description: 'Interfaces that feel effortless — grounded in research, refined through iteration.',
    tags: ['Figma', 'Prototyping', 'Motion'],
  },
  {
    icon: Code,
    number: '05',
    title: 'Full Stack Engineering',
    description: 'End-to-end engineering from database architecture to pixel-perfect frontend delivery.',
    tags: ['Node.js', 'PostgreSQL', 'APIs'],
  },
  {
    icon: FlaskConical,
    number: '06',
    title: 'Research & Analysis',
    description: 'Published research papers, data analysis, and technical documentation that drives real decisions.',
    tags: ['Data Analysis', 'ML', 'Research'],
  },
];

export default function Services() {
  const [hovered, setHovered] = useState(null);

  return (
    <section style={{ background: '#fff', padding: '6rem 0', position: 'relative', overflow: 'hidden' }}>

      {/* background texture */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(rgba(0,0,0,0.03) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', position: 'relative' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ marginBottom: '4rem' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <span style={{ color: '#FF4D2D', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700 }}>◆ What We Do</span>
          </div>
          <h2 style={{ fontFamily: "'Barlow Condensed', 'Inter', sans-serif", fontSize: 'clamp(2.8rem, 6vw, 5rem)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1, color: '#0a0a0a', textTransform: 'uppercase' }}>
            Our Services
          </h2>
        </motion.div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'rgba(0,0,0,0.08)' }}>
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: hovered === i ? '#0a0a0a' : '#fff',
                padding: '2.5rem 2rem',
                transition: 'background 0.4s ease',
                cursor: 'default',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* accent blob on hover */}
              {hovered === i && (
                <div style={{
                  position: 'absolute', top: '-40px', right: '-40px',
                  width: 180, height: 180, borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(255,77,45,0.15) 0%, transparent 70%)',
                  pointerEvents: 'none',
                }} />
              )}

              {/* number */}
              <div style={{ fontSize: '0.68rem', color: hovered === i ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.2)', letterSpacing: '0.15em', fontWeight: 700, marginBottom: '1.2rem', transition: 'color 0.4s' }}>
                {s.number}
              </div>

              {/* icon */}
              <div style={{ marginBottom: '1rem' }}>
                <s.icon size={28} color={hovered === i ? '#FF4D2D' : '#FF4D2D'} strokeWidth={1.5} />
              </div>

              {/* title */}
              <h3 style={{ fontFamily: "'Barlow Condensed', 'Inter', sans-serif", fontSize: '1.4rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.02em', color: hovered === i ? '#fff' : '#0a0a0a', marginBottom: '0.75rem', transition: 'color 0.4s' }}>
                {s.title}
              </h3>

              {/* desc */}
              <p style={{ fontSize: '0.85rem', lineHeight: 1.7, color: hovered === i ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)', marginBottom: '1.2rem', transition: 'color 0.4s' }}>
                {s.description}
              </p>

              {/* tags */}
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {s.tags.map(tag => (
                  <span key={tag} style={{
                    fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
                    padding: '0.25rem 0.6rem', borderRadius: '100px',
                    border: `1px solid ${hovered === i ? 'rgba(255,77,45,0.4)' : 'rgba(0,0,0,0.12)'}`,
                    color: hovered === i ? '#FF4D2D' : 'rgba(0,0,0,0.4)',
                    transition: 'all 0.4s',
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

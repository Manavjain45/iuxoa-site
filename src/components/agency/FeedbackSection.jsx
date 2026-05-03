import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { GlowCard } from '@/components/ui/spotlight-card';
import { AvatarHoverCard } from '@/components/ui/avatar-hover-card';

const SANS = "'Inter', 'Helvetica Neue', Arial, sans-serif";

const AVATAR1 = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80';
const AVATAR2 = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80';
const AVATAR3 = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80';
const AVATAR4 = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80';

const STARS_COLORS = {
  'WEB DEVELOPMENT': { glow: 'blue',   star: '#4F8EF7', badge: 'rgba(79,142,247,0.15)',  badgeBorder: 'rgba(79,142,247,0.3)'  },
  'UI/UX DESIGN':    { glow: 'purple', star: '#A855F7', badge: 'rgba(168,85,247,0.15)', badgeBorder: 'rgba(168,85,247,0.3)' },
  'FULL STACK':      { glow: 'green',  star: '#22C55E', badge: 'rgba(34,197,94,0.15)',  badgeBorder: 'rgba(34,197,94,0.3)'  },
};

const testimonials = [
  {
    name: 'Arjun Mehta',
    role: 'Lead Developer',
    company: 'NexaBuild',
    avatar: AVATAR1,
    category: 'WEB DEVELOPMENT',
    stars: 5,
    quote: "They don't copy, they create. Every solution felt genuinely original — built for the gap, not the trend.",
  },
  {
    name: 'Priya Sharma',
    role: 'Product Head',
    company: 'Orbix Labs',
    avatar: AVATAR2,
    category: 'UI/UX DESIGN',
    stars: 5,
    quote: "The research behind their work is what sets them apart. They don't just ship — they understand why it needs to exist.",
  },
  {
    name: 'Rohan Verma',
    role: 'Co-founder',
    company: 'StackForge',
    avatar: AVATAR3,
    category: 'FULL STACK',
    stars: 5,
    quote: 'Working with IUXOA felt like collaborating with people who actually care about filling real gaps, not recycling ideas.',
  },
];

const featured = {
  name: 'Dhruv Kapoor',
  role: 'Founder',
  company: 'Kapoor Digital Studios',
  avatar: AVATAR4,
  stars: 5,
  quote: '"Working with IUXOA felt personal. The process was smooth, the design was stunning, and everything had meaning. It\'s rare to find a team that listens this well."',
};

function StarRow({ count, color }) {
  return (
    <div style={{ display: 'flex', gap: '3px' }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 20 20" fill={i < count ? color : 'rgba(255,255,255,0.12)'}>
          <polygon points="10,1 12.9,7 19.5,7.6 14.5,12 16.2,18.5 10,15 3.8,18.5 5.5,12 0.5,7.6 7.1,7" />
        </svg>
      ))}
    </div>
  );
}

function QuoteIcon({ color }) {
  return (
    <svg width="28" height="22" viewBox="0 0 28 22" fill="none">
      <path d="M0 22V13.4C0 9.8 0.9 6.8 2.7 4.4C4.5 2 7.1 0.6 10.5 0L11.6 2.2C9.4 2.8 7.7 3.9 6.5 5.5C5.3 7.1 4.8 8.9 5 11H10V22H0ZM17 22V13.4C17 9.8 17.9 6.8 19.7 4.4C21.5 2 24.1 0.6 27.5 0L28.6 2.2C26.4 2.8 24.7 3.9 23.5 5.5C22.3 7.1 21.8 8.9 22 11H27V22H17Z"
        fill={color} fillOpacity="0.6" />
    </svg>
  );
}

function TestimonialCard({ t, index }) {
  const theme = STARS_COLORS[t.category];
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.8, delay: index * 0.14, ease: [0.16, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ height: '100%' }}
    >
      <GlowCard
        glowColor={theme.glow}
        className="h-full"
        style={{ padding: 0, height: '100%' }}
      >
        <div style={{
          padding: '28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          height: '100%',
          boxSizing: 'border-box',
        }}>
          {/* Top row: badge + stars */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{
              fontSize: '0.65rem',
              fontFamily: SANS,
              fontWeight: 700,
              letterSpacing: '0.12em',
              color: theme.star,
              background: theme.badge,
              border: `1px solid ${theme.badgeBorder}`,
              borderRadius: '20px',
              padding: '4px 10px',
            }}>
              {t.category}
            </span>
            <StarRow count={t.stars} color={theme.star} />
          </div>

          {/* Quote icon */}
          <QuoteIcon color={theme.star} />

          {/* Quote text */}
          <p style={{
            fontFamily: SANS,
            fontSize: 'clamp(1rem, 1.4vw, 1.2rem)',
            fontWeight: 500,
            color: 'rgba(255,255,255,0.88)',
            lineHeight: 1.65,
            margin: 0,
            fontStyle: 'italic',
            flex: 1,
            letterSpacing: '-0.01em',
          }}>
            {t.quote}
          </p>

          {/* Divider */}
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />

          {/* Avatar + name */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <AvatarHoverCard
              imageSrc={t.avatar}
              imageAlt={t.name}
              name={t.name}
              description={`${t.role} · ${t.company}`}
              size="sm"
              variant="default"
              buttonText="View Profile"
            />
            <div>
              <p style={{ fontFamily: SANS, color: '#fff', fontWeight: 700, fontSize: '0.9rem', margin: 0, letterSpacing: '-0.01em' }}>
                {t.name}
              </p>
              <p style={{ fontFamily: SANS, color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem', margin: '2px 0 0' }}>
                {t.role} · <span style={{ color: theme.star, fontWeight: 600 }}>{t.company}</span>
              </p>
            </div>
          </div>
        </div>
      </GlowCard>
    </motion.div>
  );
}

function FeaturedCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.36, 1] }}
    >
      <GlowCard glowColor="orange" style={{ padding: 0, width: '100%' }}>
        <div style={{
          padding: '40px 48px',
          display: 'flex',
          alignItems: 'center',
          gap: '48px',
          flexWrap: 'wrap',
        }}>
          {/* Avatar large */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <div style={{
              width: '80px', height: '80px',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '2px solid rgba(255,120,0,0.4)',
              boxShadow: '0 0 24px rgba(255,120,0,0.25)',
            }}>
              <img src={featured.avatar} alt={featured.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            {/* online dot */}
            <div style={{
              position: 'absolute', bottom: '4px', right: '4px',
              width: '14px', height: '14px', borderRadius: '50%',
              background: '#FF7800',
              border: '2px solid #000',
              boxShadow: '0 0 8px #FF7800',
            }} />
          </div>

          {/* Stars + quote */}
          <div style={{ flex: 1, minWidth: '280px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <StarRow count={5} color="#FF7800" />
              <span style={{
                fontSize: '0.65rem', fontFamily: SANS, fontWeight: 700,
                letterSpacing: '0.12em', color: '#FF7800',
                background: 'rgba(255,120,0,0.12)',
                border: '1px solid rgba(255,120,0,0.3)',
                borderRadius: '20px', padding: '4px 10px',
              }}>
                FEATURED REVIEW
              </span>
            </div>
            <p style={{
              fontFamily: SANS,
              fontSize: 'clamp(1.1rem, 1.8vw, 1.45rem)',
              fontWeight: 500,
              color: 'rgba(255,255,255,0.9)',
              lineHeight: 1.65,
              margin: '0 0 20px',
              fontStyle: 'italic',
              letterSpacing: '-0.01em',
            }}>
              {featured.quote}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <p style={{ fontFamily: SANS, color: '#fff', fontWeight: 700, fontSize: '0.95rem', margin: 0 }}>
                {featured.name}
              </p>
              <span style={{ color: '#FF7800', fontSize: '1rem' }}>✦</span>
              <p style={{ fontFamily: SANS, color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', margin: 0 }}>
                {featured.role} · {featured.company}
              </p>
            </div>
          </div>
        </div>
      </GlowCard>
    </motion.div>
  );
}

export default function FeedbackSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: '0px 0px -80px 0px' });

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#000',
        fontFamily: SANS,
        padding: '80px 80px 96px 80px',
        position: 'relative',
        zIndex: 10,
        overflow: 'hidden',
      }}
    >
      {/* BG noise grain overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 512 512\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.03\'/%3E%3C/svg%3E")',
        pointerEvents: 'none',
      }} />

      {/* Glowing orbs background */}
      <div style={{ position: 'absolute', top: '-10%', left: '20%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(79,142,247,0.04) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '0%', right: '15%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(168,85,247,0.05) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '64px', gap: '40px', flexWrap: 'wrap' }}>
          <div ref={headingRef}>
            {/* Label */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={headingInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}
            >
              <span style={{ color: '#FF4D00', fontSize: '1rem' }}>✦</span>
              <span style={{ fontFamily: SANS, fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>
                CLIENT VOICES
              </span>
            </motion.div>

            {/* Big heading */}
            <div style={{ overflow: 'hidden' }}>
              <motion.h2
                initial={{ y: '105%' }}
                animate={headingInView ? { y: '0%' } : {}}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
                style={{
                  fontFamily: SANS,
                  fontSize: 'clamp(2.6rem, 5vw, 5.5rem)',
                  fontWeight: 900,
                  color: '#fff',
                  lineHeight: 1,
                  letterSpacing: '-0.04em',
                  margin: 0,
                  textTransform: 'uppercase',
                }}
              >
                WHAT THEY SAY
              </motion.h2>
            </div>
            <div style={{ overflow: 'hidden' }}>
              <motion.h2
                initial={{ y: '105%' }}
                animate={headingInView ? { y: '0%' } : {}}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                style={{
                  fontFamily: SANS,
                  fontSize: 'clamp(2.6rem, 5vw, 5.5rem)',
                  fontWeight: 900,
                  color: 'rgba(255,255,255,0.12)',
                  lineHeight: 1,
                  letterSpacing: '-0.04em',
                  margin: 0,
                  textTransform: 'uppercase',
                }}
              >
                ABOUT WORKING WITH US.
              </motion.h2>
            </div>
          </div>

          {/* Right side — tagline + rating */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'flex-end', paddingTop: '8px' }}
          >
            <p style={{ fontFamily: SANS, color: 'rgba(255,255,255,0.35)', fontSize: '0.88rem', lineHeight: 1.6, margin: 0, textAlign: 'right', maxWidth: '240px' }}>
              Real words from real people we've built with — no templates, no fluff.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '40px', padding: '10px 18px' }}>
              <svg width="16" height="16" viewBox="0 0 20 20" fill="#FF4D00">
                <polygon points="10,1 12.9,7 19.5,7.6 14.5,12 16.2,18.5 10,15 3.8,18.5 5.5,12 0.5,7.6 7.1,7" />
              </svg>
              <span style={{ fontFamily: SANS, color: '#fff', fontWeight: 800, fontSize: '1.3rem', letterSpacing: '-0.03em' }}>4.9</span>
              <span style={{ fontFamily: SANS, color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem' }}>/5 · 300+ reviews</span>
            </div>
          </motion.div>
        </div>

        {/* 3 Cards grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '16px' }}>
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} t={t} index={i} />
          ))}
        </div>

        {/* Featured wide card */}
        <FeaturedCard />
      </div>
    </section>
  );
}

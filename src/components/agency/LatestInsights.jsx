import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import BlogCard from './BlogCard';

const SANS = "'Inter', 'Helvetica Neue', Arial, sans-serif";

const BLOG_POSTS = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&q=80',
    category: 'Design Strategy',
    tag: '01',
    date: 'FEB 4, 2025',
    readTime: '5 min read',
    title: 'Why Clarity Beats Creativity in Web Design',
    description: "Great design is invisible. When users navigate without thinking, you've won.",
    isLarge: true,
    accent: '#FF4D2D',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80',
    category: 'Social Media',
    tag: '02',
    date: 'FEB 4, 2025',
    readTime: '3 min read',
    title: 'Why Motion Design Makes Your Website Feel Alive',
    description: "Motion helps your website feel modern and clear. Here's why it matters.",
    isLarge: false,
    accent: '#a78bfa',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&q=80',
    category: 'Branding',
    tag: '03',
    date: 'FEB 4, 2025',
    readTime: '4 min read',
    title: 'What to Look for in a Premium Framer Template',
    description: "Not all templates are the same. Here's how to spot the ones worth using.",
    isLarge: false,
    accent: '#34d399',
  },
];

function MarqueeStrip() {
  const items = ['Games', 'App Development', 'Research Papers', 'Sites', 'Web Dev', 'Branding'];
  return (
    <div style={{ overflow: 'hidden', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '12px 0', marginBottom: '60px' }}>
      <div style={{ display: 'flex', animation: 'ins-marquee 22s linear infinite', width: 'max-content' }}>
        {[...items, ...items, ...items, ...items].map((t, i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '18px', marginRight: '36px', color: 'rgba(255,255,255,0.2)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
            <span style={{ color: '#FF4D2D', fontSize: '0.5rem' }}>◆</span>{t}
          </span>
        ))}
      </div>
      <style>{`@keyframes ins-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </div>
  );
}

export default function LatestInsights() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '6%']);

  return (
    <section ref={sectionRef} style={{ background: '#080808', fontFamily: SANS, padding: '80px 0 100px', position: 'relative', zIndex: 10, overflow: 'hidden' }}>

      {/* Ambient glow blobs */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
        <div style={{ position: 'absolute', top: '-10%', left: '20%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,77,45,0.045) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div style={{ position: 'absolute', bottom: '0%', right: '10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(167,139,250,0.04) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      </motion.div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 48px' }}>

        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '40px', gap: '24px', flexWrap: 'wrap' }}>

          {/* Heading block — NO overflow:hidden so animation doesn't clip */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* OUR BLOG — red label line */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <span style={{ color: '#FF4D2D', fontSize: 'clamp(1.2rem, 2.5vw, 2.2rem)', lineHeight: 1 }}>■</span>
              <h2 style={{ fontFamily: SANS, fontSize: 'clamp(1.2rem, 2.5vw, 2.2rem)', fontWeight: 700, color: '#FF4D2D', lineHeight: 1, letterSpacing: '-0.01em', textTransform: 'uppercase', margin: 0 }}>
                OUR BLOG
              </h2>
            </div>

            {/* LATEST INSIGHTS — giant white */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '20px', flexWrap: 'wrap' }}>
              <h2 style={{ fontFamily: SANS, fontSize: 'clamp(3.2rem, 7vw, 7.5rem)', fontWeight: 900, color: '#fff', lineHeight: 0.88, letterSpacing: '-0.04em', textTransform: 'uppercase', margin: 0 }}>
                LATEST
              </h2>
              <h2 style={{ fontFamily: SANS, fontSize: 'clamp(3.2rem, 7vw, 7.5rem)', fontWeight: 900, color: '#fff', lineHeight: 0.88, letterSpacing: '-0.04em', textTransform: 'uppercase', margin: 0 }}>
                INSIGHTS
              </h2>
            </div>
          </motion.div>

          {/* See All pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            style={{ paddingBottom: '12px', flexShrink: 0 }}
          >
            <button
              style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 24px', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.04)', color: '#F2F2F2', fontFamily: SANS, fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.3s', backdropFilter: 'blur(10px)' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#FF4D2D'; e.currentTarget.style.borderColor = '#FF4D2D'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; }}
            >
              See All Articles <ArrowUpRight size={14} />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Marquee */}
      <MarqueeStrip />

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 48px' }}>

        {/* Cards grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ gridRow: 'span 2' }}
          >
            <BlogCard {...BLOG_POSTS[0]} />
          </motion.div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {[BLOG_POSTS[1], BLOG_POSTS[2]].map((post, i) => (
              <motion.div key={post.id}
                initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.8, delay: (i + 1) * 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                <BlogCard {...post} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom stat bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }} transition={{ duration: 0.6, delay: 0.4 }}
          style={{ marginTop: '48px', paddingTop: '28px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}
        >
          <div style={{ display: 'flex', gap: '32px' }}>
            {[['12+', 'Articles Published'], ['3', 'Categories'], ['2025', 'Updated']].map(([num, label]) => (
              <div key={label}>
                <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1 }}>{num}</div>
                <div style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: '4px' }}>{label}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.2)', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF4D2D', display: 'inline-block' }} />
            Insights dropping regularly
          </div>
        </motion.div>

      </div>
    </section>
  );
}

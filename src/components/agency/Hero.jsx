import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { usePageTransition } from '../../context/TransitionContext';

const DISPLAY = "'Playfair Display', 'Georgia', serif";
const BODY = "'DM Sans', 'Helvetica Neue', Arial, sans-serif";
const MONO = "'DM Mono', 'Courier New', monospace";

function MagneticBtn({ onClick, children, style }) {
  const ref = useRef(null);
  const x = useMotionValue(0); const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });
  const handleMove = (e) => { const r = ref.current.getBoundingClientRect(); x.set((e.clientX - r.left - r.width / 2) * 0.4); y.set((e.clientY - r.top - r.height / 2) * 0.4); };
  const handleLeave = () => { x.set(0); y.set(0); };
  return (
    <motion.button ref={ref} onClick={onClick} onMouseMove={handleMove} onMouseLeave={handleLeave}
      style={{ x: sx, y: sy, cursor: 'pointer', border: 'none', background: 'none', padding: 0, ...style }}>
      {children}
    </motion.button>
  );
}

function FloatingTag({ children, style, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ position: 'absolute', zIndex: 20, backdropFilter: 'blur(16px)', background: 'rgba(255,255,255,0.88)', border: '1px solid rgba(0,0,0,0.07)', borderRadius: '16px', padding: '12px 16px', boxShadow: '0 8px 32px rgba(0,0,0,0.08), 0 1px 0 rgba(255,255,255,0.9) inset', ...style }}>
      {children}
    </motion.div>
  );
}

export default function Hero() {
  const sectionRef = useRef(null);
  const { navigateTo } = usePageTransition();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);

  const rawMX = useMotionValue(0); const rawMY = useMotionValue(0);
  const mx = useSpring(rawMX, { stiffness: 50, damping: 20 });
  const my = useSpring(rawMY, { stiffness: 50, damping: 20 });

  const [mousePos, setMousePos] = useState({ x: -999, y: -999 });
  const [hoveredPrimary, setHoveredPrimary] = useState(false);

  useEffect(() => {
    const onMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      rawMX.set((e.clientX / window.innerWidth - 0.5) * 30);
      rawMY.set((e.clientY / window.innerHeight - 0.5) * 20);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <motion.section ref={sectionRef} id="home"
      style={{ opacity: sectionOpacity, fontFamily: BODY, background: '#F7F4EF', minHeight: '100vh', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');`}</style>

      {/* Custom cursor */}
      <motion.div className="fixed pointer-events-none z-[999]"
        style={{ left: mousePos.x, top: mousePos.y, transform: 'translate(-50%,-50%)', width: hoveredPrimary ? 72 : 14, height: hoveredPrimary ? 72 : 14, borderRadius: '50%', background: hoveredPrimary ? '#C8502A' : '#1a1a1a', mixBlendMode: hoveredPrimary ? 'normal' : 'difference', transition: 'width 0.35s cubic-bezier(0.22,1,0.36,1), height 0.35s cubic-bezier(0.22,1,0.36,1), left 0.07s ease, top 0.07s ease' }}
      />

      {/* Grain */}
      <div className="absolute inset-0 pointer-events-none z-[1]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat', backgroundSize: '200px', opacity: 0.6 }} />

      {/* Blobs */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div style={{ x: mx, y: my }}>
          <motion.div animate={{ scale: [1, 1.06, 1], rotate: [0, 3, 0] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            style={{ position: 'absolute', top: '-20%', right: '-12%', width: 800, height: 800, borderRadius: '60% 40% 55% 45% / 50% 60% 40% 50%', background: 'radial-gradient(circle at 40% 40%, rgba(200,80,42,0.09) 0%, rgba(200,80,42,0.03) 50%, transparent 70%)', filter: 'blur(40px)' }} />
          <motion.div animate={{ scale: [1, 1.08, 1], rotate: [0, -4, 0] }} transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
            style={{ position: 'absolute', bottom: '-10%', left: '-15%', width: 700, height: 700, borderRadius: '45% 55% 40% 60% / 55% 45% 60% 40%', background: 'radial-gradient(circle at 60% 60%, rgba(180,160,120,0.08) 0%, transparent 65%)', filter: 'blur(50px)' }} />
        </motion.div>
      </div>

      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />

      {/* ── CARD 1 — Projects delivered ── */}
      <FloatingTag delay={1.2} style={{ top: '18%', right: '6%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 42, height: 42, borderRadius: 12, background: 'linear-gradient(135deg,#1a1a1a,#333)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" rx="1.5" fill="#FF4D00"/><rect x="14" y="3" width="7" height="7" rx="1.5" fill="rgba(255,255,255,0.4)"/><rect x="3" y="14" width="7" height="7" rx="1.5" fill="rgba(255,255,255,0.4)"/><rect x="14" y="14" width="7" height="7" rx="1.5" fill="rgba(255,255,255,0.4)"/></svg>
          </div>
          <div>
            <div style={{ fontFamily: BODY, fontSize: '0.85rem', fontWeight: 800, color: '#111', letterSpacing: '-0.01em', lineHeight: 1 }}>10+ Projects</div>
            <div style={{ fontFamily: MONO, fontSize: '0.6rem', color: 'rgba(0,0,0,0.38)', marginTop: 4, letterSpacing: '0.06em' }}>Shipped & Live</div>
          </div>
          <div style={{ marginLeft: 6, display: 'flex', flexDirection: 'column', gap: 3 }}>
            {[1,0.5,0.8].map((o,i) => <div key={i} style={{ width: 28, height: 3, borderRadius: 99, background: `rgba(200,80,42,${o})` }} />)}
          </div>
        </div>
      </FloatingTag>

      {/* ── CARD 2 — Services we offer ── */}
      <FloatingTag delay={1.5} style={{ bottom: '30%', right: '5%' }}>
        <div style={{ minWidth: 160 }}>
          <div style={{ fontFamily: MONO, fontSize: '0.55rem', color: 'rgba(0,0,0,0.32)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 8 }}>What we build</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {[
              { label: 'Web & Design', icon: '◈' },
              { label: 'Games', icon: '◉' },
              { label: 'Apps', icon: '◎' },
              { label: 'Research', icon: '◆' },
            ].map(({ label, icon }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: '#C8502A', fontSize: '0.6rem' }}>{icon}</span>
                <span style={{ fontFamily: BODY, fontSize: '0.7rem', fontWeight: 600, color: '#111' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </FloatingTag>

      {/* ── CARD 3 — Client satisfaction ── */}
      <FloatingTag delay={1.8} style={{ bottom: '18%', right: '7%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ position: 'relative', width: 44, height: 44, flexShrink: 0 }}>
            <svg width="44" height="44" viewBox="0 0 44 44">
              <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(0,0,0,0.07)" strokeWidth="4"/>
              <circle cx="22" cy="22" r="18" fill="none" stroke="#C8502A" strokeWidth="4" strokeDasharray="113" strokeDashoffset="11" strokeLinecap="round" transform="rotate(-90 22 22)"/>
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: BODY, fontSize: '0.62rem', fontWeight: 800, color: '#111' }}>98%</div>
          </div>
          <div>
            <div style={{ fontFamily: BODY, fontSize: '0.75rem', fontWeight: 700, color: '#111', lineHeight: 1 }}>Satisfaction</div>
            <div style={{ fontFamily: MONO, fontSize: '0.57rem', color: 'rgba(0,0,0,0.38)', marginTop: 3 }}>Client rated</div>
            <div style={{ display: 'flex', gap: 2, marginTop: 4 }}>
              {[...Array(5)].map((_, i) => <span key={i} style={{ color: '#C8502A', fontSize: '0.5rem' }}>★</span>)}
            </div>
          </div>
        </div>
      </FloatingTag>

      {/* Hero image */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div style={{ scale: imgScale, y: imgY }} className="w-full h-full relative">
          <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&q=90" alt="Creative background" className="w-full h-full object-cover"
            style={{ clipPath: 'ellipse(44% 36% at 72% 52%)', filter: 'brightness(1.05) contrast(1.05) saturate(0.85)' }} />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 50% 40% at 72% 52%, transparent 30%, #F7F4EF 75%)' }} />
        </motion.div>
      </div>

      {/* Main content */}
      <motion.div style={{ y: textY, paddingTop: 'clamp(5rem, 9vh, 8rem)' }} className="relative z-10 flex-1 flex flex-col justify-center px-8 lg:px-16 pb-6">

        <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1.25rem' }}>
          <div style={{ width: 32, height: 1, background: '#C8502A' }} />
          <span style={{ fontFamily: MONO, fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C8502A' }}>Digital Innovation Studio</span>
        </motion.div>

        <div style={{ maxWidth: '780px' }}>
          <div style={{ overflow: 'hidden', marginBottom: '0.02em' }}>
            <motion.div initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 1.1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: 'flex', alignItems: 'baseline', gap: '0.22em', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: DISPLAY, fontSize: 'clamp(2.6rem, 7vw, 6.2rem)', fontWeight: 900, color: '#1a1a1a', letterSpacing: '-0.03em', lineHeight: 0.92 }}>We</span>
              <span style={{ fontFamily: DISPLAY, fontSize: 'clamp(2.4rem, 6.6vw, 5.8rem)', fontWeight: 400, fontStyle: 'italic', color: 'rgba(0,0,0,0.22)', letterSpacing: '-0.02em', lineHeight: 0.92 }}>craft</span>
              <motion.span animate={{ rotate: [0, 15, 0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 2 }}
                style={{ fontSize: 'clamp(2rem,4vw,4rem)', lineHeight: 1, display: 'inline-block', marginLeft: '0.05em' }}>✦</motion.span>
            </motion.div>
          </div>
          <div style={{ overflow: 'hidden', marginBottom: '0.02em' }}>
            <motion.div initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 1.1, delay: 0.52, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: 'flex', alignItems: 'baseline', gap: '0.18em', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: DISPLAY, fontSize: 'clamp(2.6rem, 7vw, 6.2rem)', fontWeight: 900, color: '#1a1a1a', letterSpacing: '-0.03em', lineHeight: 0.92 }}>Games,</span>
              <span style={{ fontFamily: DISPLAY, fontSize: 'clamp(2.6rem, 7vw, 6.2rem)', fontWeight: 900, color: '#C8502A', letterSpacing: '-0.03em', lineHeight: 0.92 }}>Apps</span>
            </motion.div>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <motion.div initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 1.1, delay: 0.64, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: 'flex', alignItems: 'baseline', gap: '0.18em', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: DISPLAY, fontSize: 'clamp(1.9rem, 5.3vw, 4.6rem)', fontWeight: 400, fontStyle: 'italic', color: 'rgba(0,0,0,0.2)', letterSpacing: '-0.02em', lineHeight: 1 }}>&amp;</span>
              <span style={{ fontFamily: DISPLAY, fontSize: 'clamp(2.6rem, 7vw, 6.2rem)', fontWeight: 900, color: '#1a1a1a', letterSpacing: '-0.03em', lineHeight: 0.92 }}>Digital</span>
              <span style={{ fontFamily: DISPLAY, fontSize: 'clamp(2.2rem, 6.1vw, 5.4rem)', fontWeight: 400, fontStyle: 'italic', color: 'rgba(0,0,0,0.18)', letterSpacing: '-0.02em', lineHeight: 0.92 }}>Experiences.</span>
            </motion.div>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginTop: '1.5rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '2rem' }}>
          <p style={{ fontFamily: BODY, fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)', fontWeight: 400, color: 'rgba(0,0,0,0.5)', lineHeight: 1.7, maxWidth: '340px', margin: 0 }}>
            We build bold digital products — from immersive games to sleek apps — that feel alive and leave a mark.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
            <MagneticBtn onClick={() => navigateTo && navigateTo('/contact')} onMouseEnter={() => setHoveredPrimary(true)} onMouseLeave={() => setHoveredPrimary(false)}>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 28px', borderRadius: '100px', background: '#1a1a1a', cursor: 'pointer' }}>
                <span style={{ fontFamily: BODY, fontSize: '0.82rem', fontWeight: 600, color: '#fff', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Start a Project</span>
                <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ fontSize: '0.9rem', color: '#C8502A' }}>→</motion.span>
              </motion.div>
            </MagneticBtn>
            <MagneticBtn onClick={() => navigateTo && navigateTo('/works')}>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '13px 26px', borderRadius: '100px', background: 'transparent', cursor: 'pointer', border: '1.5px solid rgba(0,0,0,0.15)' }}>
                <span style={{ fontFamily: BODY, fontSize: '0.82rem', fontWeight: 600, color: '#1a1a1a', letterSpacing: '0.06em', textTransform: 'uppercase' }}>View Work</span>
              </motion.div>
            </MagneticBtn>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.15 }}
          style={{ marginTop: '1.75rem', display: 'flex', gap: '2.5rem', flexWrap: 'wrap' }}>
          {[{ num: '10+', label: 'Projects Delivered' }, { num: '10+', label: 'Research Papers' }, { num: '98%', label: 'Client Satisfaction' }].map((s, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <span style={{ fontFamily: DISPLAY, fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 700, color: '#1a1a1a', letterSpacing: '-0.03em', lineHeight: 1 }}>{s.num}</span>
              <span style={{ fontFamily: BODY, fontSize: '0.68rem', fontWeight: 500, color: 'rgba(0,0,0,0.4)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>{s.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
        className="relative z-10" style={{ display: 'flex', justifyContent: 'center', paddingBottom: '1rem', gap: 8, alignItems: 'center' }}>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity }}
          style={{ width: 1, height: 24, background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.25), transparent)' }} />
        <span style={{ fontFamily: MONO, fontSize: '0.58rem', letterSpacing: '0.2em', color: 'rgba(0,0,0,0.25)', textTransform: 'uppercase', writingMode: 'vertical-rl' }}>Scroll</span>
      </motion.div>
    </motion.section>
  );
}

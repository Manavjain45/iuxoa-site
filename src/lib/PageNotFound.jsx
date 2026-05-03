import { useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const SANS = "'Inter', 'Helvetica Neue', Arial, sans-serif";

export default function PageNotFound() {
  const location = useLocation();
  const pageName = location.pathname.substring(1);
  const [mouse, setMouse] = useState({ x: -999, y: -999 });
  const [tick, setTick] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const onMove = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', onMove);
    const t = setInterval(() => setTick(n => n + 1), 50);
    return () => { window.removeEventListener('mousemove', onMove); clearInterval(t); };
  }, []);

  // Glitch chars
  const glitchChars = '!@#$%^&*<>?/\\|[]{}~';
  const glitch = (text) => text.split('').map((ch, i) =>
    Math.random() > 0.85 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : ch
  ).join('');

  return (
    <div ref={ref} style={{ minHeight: '100vh', background: '#080808', fontFamily: SANS, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

      {/* Custom cursor */}
      <div style={{ position: 'fixed', left: mouse.x, top: mouse.y, transform: 'translate(-50%,-50%)', width: 12, height: 12, borderRadius: '50%', background: '#FF4D2D', pointerEvents: 'none', zIndex: 999, transition: 'left 0.08s ease, top 0.08s ease', mixBlendMode: 'difference' }} />

      {/* Dot grid */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '32px 32px', pointerEvents: 'none' }} />

      {/* Glow blobs */}
      <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,77,45,0.12) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
      <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        style={{ position: 'absolute', bottom: '10%', left: '20%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)', filter: 'blur(70px)', pointerEvents: 'none' }} />

      {/* Scanlines */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.012) 2px, rgba(255,255,255,0.012) 4px)', pointerEvents: 'none' }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 24px', maxWidth: 700 }}>

        {/* Eyebrow */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', borderRadius: 100, border: '1px solid rgba(255,77,45,0.3)', background: 'rgba(255,77,45,0.06)', marginBottom: 32 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF4D2D', boxShadow: '0 0 8px #FF4D2D' }} />
          <span style={{ color: '#FF4D2D', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Error 404 · Page Not Found</span>
        </motion.div>

        {/* Giant 404 */}
        <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            {/* Shadow layer — red offset */}
            <div style={{ position: 'absolute', top: 4, left: 6, fontSize: 'clamp(7rem, 22vw, 18rem)', fontWeight: 900, color: 'transparent', WebkitTextStroke: '2px rgba(255,77,45,0.25)', letterSpacing: '-0.06em', lineHeight: 0.85, userSelect: 'none', pointerEvents: 'none' }}>404</div>
            {/* Main */}
            <div style={{ fontSize: 'clamp(7rem, 22vw, 18rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.06em', lineHeight: 0.85, userSelect: 'none' }}>
              {/* 4 white — 0 red — 4 white */}
              <span>4</span>
              <span style={{ color: '#FF4D2D', textShadow: '0 0 60px rgba(255,77,45,0.5)' }}>0</span>
              <span>4</span>
            </div>
          </div>
        </motion.div>

        {/* Wrong URL display */}
        {pageName && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35 }}
            style={{ marginTop: 24, display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 18px', borderRadius: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', fontFamily: "'Courier New', monospace" }}>
            <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.78rem' }}>iuxoa.com/</span>
            <span style={{ color: '#FF4D2D', fontSize: '0.78rem', textDecoration: 'line-through', opacity: 0.7 }}>{pageName}</span>
          </motion.div>
        )}

        {/* Message */}
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.45 }}
          style={{ color: 'rgba(255,255,255,0.3)', fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)', lineHeight: 1.75, marginTop: 28, marginBottom: 0 }}>
          Looks like you wandered into the void.<br />
          This page doesn't exist — but the good stuff does.
        </motion.p>

        {/* CTA Button */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }}
          style={{ marginTop: 44 }}>
          <button
            onClick={() => window.location.href = '/'}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '16px 36px', borderRadius: 100, background: '#FF4D2D', border: 'none', cursor: 'pointer', fontFamily: SANS, fontSize: '0.88rem', fontWeight: 700, color: '#fff', letterSpacing: '0.08em', textTransform: 'uppercase', boxShadow: '0 8px 32px rgba(255,77,45,0.35)', transition: 'all 0.3s ease' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#FF4D2D'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(255,77,45,0.25)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#FF4D2D'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(255,77,45,0.35)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M3 12L12 3L21 12M5 10V20C5 20.5523 5.44772 21 6 21H10V16H14V21H18C18.5523 21 19 20.5523 19 20V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Take Me Home
          </button>
        </motion.div>

        {/* Bottom nav hints */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.8 }}
          style={{ marginTop: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, flexWrap: 'wrap' }}>
          <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: '0.68rem', letterSpacing: '0.1em' }}>Or try:</span>
          {[['/', 'Home'], ['/works', 'Works'], ['/about', 'About'], ['/contact', 'Contact']].map(([href, label]) => (
            <a key={href} href={href}
              style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.08em', textDecoration: 'none', padding: '4px 12px', borderRadius: 100, border: '1px solid rgba(255,255,255,0.08)', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#FF4D2D'; e.currentTarget.style.borderColor = 'rgba(255,77,45,0.3)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.3)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
            >{label}</a>
          ))}
        </motion.div>
      </div>

      {/* Bottom signature */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
        style={{ position: 'absolute', bottom: 24, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
        <span style={{ color: 'rgba(255,255,255,0.08)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>IUXOA Studio · iuxoa.vercel.app</span>
      </motion.div>
    </div>
  );
}

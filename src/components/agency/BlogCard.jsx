import React, { useState, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

const SANS = "'Inter', 'Helvetica Neue', Arial, sans-serif";

export default function BlogCard({ image, category, tag, date, readTime, title, description, isLarge = false, accent = '#FF4D2D' }) {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [ripples, setRipples] = useState([]);
  const cardRef = useRef(null);
  const rippleId = useRef(0);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springConfig = { stiffness: 180, damping: 22, mass: 0.6 };
  const x = useSpring(rawX, springConfig);
  const y = useSpring(rawY, springConfig);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    rawX.set(e.clientX - rect.left - 72);
    rawY.set(e.clientY - rect.top - 22);
  }, [rawX, rawY]);

  const handleMouseEnter = (e) => { setHovered(true); handleMouseMove(e); };
  const handleMouseLeave = () => { setHovered(false); setClicked(false); };

  const handleMouseDown = (e) => {
    if (!cardRef.current) return;
    setClicked(true);
    const rect = cardRef.current.getBoundingClientRect();
    const id = rippleId.current++;
    setRipples(prev => [...prev, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 750);
  };
  const handleMouseUp = () => setTimeout(() => setClicked(false), 120);

  const cardHeight = isLarge ? '580px' : '280px';

  return (
    <motion.div
      ref={cardRef}
      className="relative overflow-hidden select-none"
      style={{
        height: cardHeight,
        cursor: 'none',
        borderRadius: '20px',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
      whileHover={{ scale: 1.012 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {/* ── Image ── */}
      <motion.img
        src={image} alt={title}
        className="absolute inset-0 w-full h-full object-cover"
        animate={{ scale: clicked ? 1.04 : hovered ? 1.08 : 1, filter: hovered ? 'brightness(0.5)' : 'brightness(0.85)' }}
        transition={{ duration: clicked ? 0.12 : 0.7, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* ── Gradient overlays ── */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)' }} />
      {/* accent color wash on hover */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: hovered ? 0.12 : 0 }}
        transition={{ duration: 0.5 }}
        style={{ background: `linear-gradient(135deg, ${accent} 0%, transparent 60%)` }}
      />

      {/* ── Noise grain overlay for texture ── */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.04\'/%3E%3C/svg%3E")', backgroundSize: '200px 200px', opacity: 0.4, mixBlendMode: 'overlay' }} />

      {/* ── Ripples ── */}
      <AnimatePresence>
        {ripples.map(r => (
          <motion.span key={r.id} className="absolute rounded-full pointer-events-none"
            style={{ left: r.x, top: r.y, translateX: '-50%', translateY: '-50%', background: 'rgba(255,255,255,0.15)', zIndex: 30 }}
            initial={{ width: 0, height: 0, opacity: 0.8 }}
            animate={{ width: 340, height: 340, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
      </AnimatePresence>

      {/* ── Top row: tag number + category ── */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-start justify-between p-5">
        {/* tag number */}
        <span style={{ fontFamily: SANS, fontSize: '0.65rem', fontWeight: 700, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.15em' }}>
          {tag}
        </span>
        {/* category pill */}
        <motion.span
          animate={{ y: hovered ? 0 : -4, opacity: hovered ? 1 : 0.85 }}
          transition={{ duration: 0.35 }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '5px 12px', borderRadius: '100px', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: SANS }}
        >
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: accent, flexShrink: 0 }} />
          {category}
        </motion.span>
      </div>

      {/* ── Cursor-following VIEW BLOG button ── */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute z-20 pointer-events-none"
            style={{ x, y, top: 0, left: 0 }}
            initial={{ opacity: 0, scale: 0.65 }}
            animate={{ opacity: 1, scale: clicked ? 0.85 : 1 }}
            exit={{ opacity: 0, scale: 0.65, transition: { duration: 0.25 } }}
            transition={{ opacity: { duration: 0.3 }, scale: { duration: clicked ? 0.1 : 0.4, ease: [0.16, 1.4, 0.36, 1] } }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px', borderRadius: '100px', background: clicked ? '#fff' : accent, boxShadow: `0 8px 28px ${accent}55`, backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)', whiteSpace: 'nowrap', transition: 'background 0.1s' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: SANS, color: clicked ? '#111' : '#fff' }}>Read Post</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1 11L11 1M11 1H4M11 1v7" stroke={clicked ? '#111' : '#fff'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Bottom content ── */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-5">

        {/* divider line that grows in on hover */}
        <motion.div
          animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 0.3 : 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ height: 1, background: '#fff', marginBottom: '14px', transformOrigin: 'left', borderRadius: 1 }}
        />

        {/* date + readtime */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <p style={{ fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(200,200,200,0.5)', fontFamily: SANS, margin: 0 }}>{date}</p>
          <motion.span
            animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 8 }}
            transition={{ duration: 0.3 }}
            style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.62rem', color: accent, fontWeight: 600, letterSpacing: '0.06em', fontFamily: SANS }}
          >
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: accent }} />
            {readTime}
          </motion.span>
        </div>

        {/* title */}
        <h3
          style={{
            fontFamily: SANS,
            fontSize: isLarge ? 'clamp(1.2rem, 2.5vw, 1.75rem)' : '0.95rem',
            fontWeight: 800,
            color: '#F2F2F2',
            lineHeight: 1.25,
            letterSpacing: '-0.02em',
            margin: 0,
          }}
        >
          {title}
        </h3>

        {/* description slides up on hover */}
        <AnimatePresence>
          {(hovered || isLarge) && description && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.35 }}
              style={{ fontSize: '0.78rem', lineHeight: 1.65, color: 'rgba(200,200,200,0.6)', fontFamily: SANS, margin: '10px 0 0', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
            >
              {description}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

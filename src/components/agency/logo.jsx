import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Logo() {
  const { scrollY } = useScroll();

  // Scale from full size to small as you scroll
  const scale = useTransform(scrollY, [0, 400], [1, 0.18]);

  // Hero section is roughly 100vh. Switch color: black on hero (white bg), white after
  // Use a spring-like crossfade via opacity of two overlapping elements
  const heroOpacity = useTransform(scrollY, [0, 300, 600], [1, 0.5, 0]);
  const darkOpacity = useTransform(scrollY, [0, 300, 600], [0, 0.5, 1]);

  return (
    <motion.div
      className="fixed top-0 left-0 z-[70] pointer-events-none"
      style={{ padding: '0 1rem', height: '80px', display: 'flex', alignItems: 'center' }}
    >
      <motion.div
        style={{
          scale,
          transformOrigin: 'top left',
          fontSize: 'clamp(6rem, 18vw, 15rem)',
          letterSpacing: '-0.02em',
          fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
          lineHeight: 1,
          position: 'relative',
          display: 'inline-block',
        }}
        className="font-black uppercase leading-none select-none"
      >
        {/* Black version (on white/hero bg) */}
        <motion.span
          style={{ opacity: heroOpacity, position: 'absolute', top: 0, left: 0, color: '#000' }}
          className="font-black uppercase"
        >
          iuxoa<sup style={{ fontSize: '0.14em', position: 'relative', top: '0.1em', marginLeft: '0.08em', fontWeight: 300, opacity: 0.7 }}>®</sup>
        </motion.span>

        {/* White version (on dark bg) */}
        <motion.span
          style={{ opacity: darkOpacity, position: 'absolute', top: 0, left: 0, color: '#fff' }}
          className="font-black uppercase"
        >
          iuxoa<sup style={{ fontSize: '0.14em', position: 'relative', top: '0.1em', marginLeft: '0.08em', fontWeight: 300, opacity: 0.7 }}>®</sup>
        </motion.span>

        {/* Invisible spacer to hold size */}
        <span style={{ visibility: 'hidden' }}>
          iuxoa<sup style={{ fontSize: '0.14em' }}>®</sup>
        </span>
      </motion.div>
    </motion.div>
  );
}
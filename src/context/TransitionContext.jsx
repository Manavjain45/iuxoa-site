import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// ── Context ──────────────────────────────────────────────────────────────────
const TransitionContext = createContext(null);

export function usePageTransition() {
  return useContext(TransitionContext);
}

// ── Provider (must be rendered INSIDE <Router>) ───────────────────────────────
export function TransitionProvider({ children }) {
  const [phase, setPhase] = useState('idle'); // idle | entering | leaving
  const pendingPath = useRef(null);
  const navigate = useNavigate();

  /**
   * navigateTo(path)
   *   1. Overlay slides UP from bottom → covers screen (entering)
   *   2. Once fully visible → navigate react-router, then start leaving
   *   3. Overlay slides UP off screen (leaving)
   */
  const navigateTo = useCallback((path) => {
    if (phase !== 'idle') return;
    pendingPath.current = path;
    setPhase('entering');
  }, [phase]);

  const onCoverComplete = useCallback(() => {
    if (pendingPath.current) {
      // Mark that this is an SPA navigation, not a reload
      sessionStorage.setItem('spaNavigation', 'true');
      navigate(pendingPath.current);
      pendingPath.current = null;
    }
    window.scrollTo(0, 0);
    setTimeout(() => setPhase('leaving'), 100);
  }, [navigate]);

  const onLeaveComplete = useCallback(() => {
    setPhase('idle');
  }, []);

  return (
    <TransitionContext.Provider value={{ navigateTo, phase }}>
      {children}

      {/* ── Fullscreen white overlay with IUXOA logo ── */}
      <AnimatePresence>
        {(phase === 'entering' || phase === 'leaving') && (
          <motion.div
            key="page-transition"
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 200,
              background: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            initial={{ y: '-100%' }}
            animate={phase === 'entering' ? { y: '0%' } : { y: '-100%' }}
            transition={{ duration: 0.72, ease: [0.76, 0, 0.24, 1] }}
            onAnimationComplete={() => {
              if (phase === 'entering') onCoverComplete();
              else if (phase === 'leaving') onLeaveComplete();
            }}
          >
            {/* IUXOA text clips in from bottom */}
            <div style={{ overflow: 'hidden' }}>
              <motion.h1
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
                  fontWeight: 900,
                  fontSize: 'clamp(4rem, 12vw, 10rem)',
                  letterSpacing: '-0.03em',
                  textTransform: 'uppercase',
                  lineHeight: 1,
                  color: '#000',
                  userSelect: 'none',
                  margin: 0,
                }}
              >
                IUXOA
              </motion.h1>
            </div>

            {/* Thin progress bar at bottom */}
            <motion.div
              style={{ position: 'absolute', bottom: 0, left: 0, height: 2, background: 'rgba(0,0,0,0.15)' }}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.7, ease: 'linear' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  );
}

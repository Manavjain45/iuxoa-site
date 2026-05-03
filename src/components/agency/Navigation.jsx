import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { usePageTransition } from '../../context/TransitionContext';

// ── NavItem: text reveals upward from bottom on menu open (clip reveal)
function NavItem({ link, index, onNav, isActive }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        onClick={() => onNav(link.id)}
        className="w-full text-left py-5 flex items-center justify-between"
        style={{
          fontFamily: "'Barlow Condensed', 'Inter', sans-serif",
          fontSize: 'clamp(2.6rem, 6vw, 4rem)',
          fontWeight: 800,
          letterSpacing: '-0.01em',
          lineHeight: 1,
          textTransform: 'uppercase',
          background: 'none',
          border: 'none',
          padding: '1.25rem 0',
          cursor: 'pointer',
          width: '100%',
        }}
      >
        {/* Clip container — text slides up from bottom, layout unchanged */}
        <span style={{ overflow: 'hidden', display: 'block', lineHeight: 1.1 }}>
          <motion.span
            initial={{ y: '105%' }}
            animate={{ y: 0 }}
            transition={{
              delay: index * 0.08 + 0.1,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              display: 'block',
              color: hovered ? '#fff' : 'rgba(255,255,255,0.85)',
              transition: 'color 0.2s',
            }}
          >
            {link.label}
          </motion.span>
        </span>

        {/* Active dot — fades in, position locked to right */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.08 + 0.5, duration: 0.3 }}
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: '#e85533',
            display: 'inline-block',
            flexShrink: 0,
            opacity: isActive ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        />
      </button>
      {/* Line: grey base + orange slides in left→right on hover */}
      <div style={{ position: 'relative', width: '100%', height: 1, background: 'rgba(255,255,255,0.1)' }}>
        <motion.div
          animate={{ scaleX: hovered ? 1 : 0, transformOrigin: hovered ? 'left' : 'right' }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: 'absolute', inset: 0, background: '#e85533', transformOrigin: 'left' }}
        />
      </div>
    </motion.div>
  );
}

// ── SocialItem: same hover-driven orange underline for social links
function SocialItem({ label, href }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: hovered ? '#fff' : 'rgba(255,255,255,0.7)', transition: 'color 0.2s' }}
        className="flex items-center gap-1.5 text-sm pb-1"
      >
        {label}
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M1 9L9 1M9 1H3M9 1v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>
      <div style={{ position: 'relative', width: '100%', height: 1, background: 'rgba(255,255,255,0.1)' }}>
        <motion.div
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: 'absolute', inset: 0, background: '#e85533', transformOrigin: 'left' }}
        />
      </div>
    </div>
  );
}

export default function Navigation() {
  const [time, setTime] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [isOnHero, setIsOnHero] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const { scrollY } = useScroll();
  const { navigateTo } = usePageTransition();
  const location = useLocation();

  // On Works page always show dark nav style
  const isWorksPage = location.pathname === '/works';
  const isAboutPage = location.pathname === '/about';
  const isContactPage = location.pathname === '/contact';
  const isLegalPage = location.pathname === '/privacy-policy' || location.pathname === '/terms-of-service';
  const isDarkPage = isWorksPage || isAboutPage || isContactPage || isLegalPage;

  useEffect(() => {
    const unsub = scrollY.on('change', (v) => setIsOnHero(v < window.innerHeight * 0.7));
    return unsub;
  }, [scrollY]);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const gmtOffset = (() => {
    const offset = -new Date().getTimezoneOffset();
    const sign = offset >= 0 ? '+' : '-';
    const h = Math.floor(Math.abs(offset) / 60);
    const m = Math.abs(offset) % 60;
    return `GMT${sign}${h}${m ? ':' + String(m).padStart(2, '0') : ''}`;
  })();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = ['home', 'latest-work', 'about-scroll', 'contact'];
    const observers = [];
    const visibilityMap = {};

    const pickActive = () => {
      // Prefer the section closest to top of viewport
      for (const id of sectionIds) {
        if (visibilityMap[id]) { setActiveSection(id); return; }
      }
    };

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          visibilityMap[id] = entry.isIntersecting;
          pickActive();
        },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id) => {
    // WORKS → navigate to the separate /works page with transition
    if (id === 'works-page') {
      setMenuOpen(false);
      setTimeout(() => navigateTo('/works'), 350);
      return;
    }
    // CONTACT → navigate to the separate /contact page
    if (id === 'contact-page') {
      setMenuOpen(false);
      setTimeout(() => navigateTo('/contact'), 350);
      return;
    }
    // ABOUT → navigate to the separate /about page
    if (id === 'about-page') {
      setMenuOpen(false);
      setTimeout(() => navigateTo('/about'), 350);
      return;
    }
    // HOME → if on any non-home page, navigate back to home with transition
    if (id === 'home' && isDarkPage) {
      setMenuOpen(false);
      setTimeout(() => navigateTo('/'), 350);
      return;
    }
    // Map section id → navLink id so activeSection updates immediately on click
    const idMap = {
      'home': 'home',
      'latest-work': 'latest-work',
      'about-scroll': 'about-scroll',
      'contact': 'contact',
    };
    if (idMap[id]) setActiveSection(id);
    setMenuOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 600);
  };

  const navLinks = [
    { label: 'HOME',    id: 'home' },
    { label: 'WORKS',   id: 'works-page' },
    { label: 'ABOUT',   id: 'about-page' },
    { label: 'CONTACT', id: 'contact-page' },
  ];

  const tc     = (isOnHero && !isDarkPage) ? 'text-black' : 'text-white';
  const tc40   = (isOnHero && !isDarkPage) ? 'text-black/40' : 'text-white/40';
  const divider = (isOnHero && !isDarkPage) ? 'bg-black/20' : 'bg-white/20';

  return (
    <>
      {/* ── Top nav bar ── */}
      <nav className="fixed top-0 left-0 right-0 z-[55] transition-all duration-500" style={{
          background: (isOnHero && !isDarkPage) ? 'transparent' : 'rgba(0,0,0,0.5)',
          backdropFilter: (isOnHero && !isDarkPage) ? 'none' : 'blur(16px)',
          WebkitBackdropFilter: (isOnHero && !isDarkPage) ? 'none' : 'blur(16px)',
        }}>
        <div className="w-full px-6 lg:px-10">
          <div className="flex items-center justify-end h-20 gap-7">

            {/* Logo — left side */}
            <button
              onClick={() => isDarkPage ? navigateTo('/') : scrollTo('home')}
              className="mr-auto pointer-events-auto"
              style={{
                fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
                lineHeight: 1,
                color: (isOnHero && !isDarkPage) ? '#000' : '#fff',
                transition: 'color 0.3s',
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <div style={{
                fontSize: '1.35rem',
                fontWeight: 900,
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
                lineHeight: 1,
              }}>
                iuxoa<sup style={{ fontSize: '0.45em', fontWeight: 300, opacity: 0.7, verticalAlign: 'super' }}>®</sup>
              </div>
              <div style={{
                fontSize: '0.45rem',
                fontWeight: 500,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                opacity: 0.45,
                marginTop: '3px',
                whiteSpace: 'nowrap',
              }}>
                Multiple Research Papers&nbsp;·&nbsp;Multiple Projects&nbsp;·&nbsp;Multiple Websites
              </div>
            </button>

            {/* Availability */}
            <div className="hidden md:flex flex-col items-start text-[14px] leading-tight">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-400 flex-shrink-0 animate-pulse" />
                <span className={`font-semibold tracking-wide transition-colors duration-300 ${tc}`}>Available for project</span>
              </div>
              <span className={`uppercase tracking-widest text-[11px] pl-4 transition-colors duration-300 ${tc40}`}>Early Feb 2026</span>
            </div>
            <div className={`hidden md:block w-px h-6 transition-colors duration-300 ${divider}`} />

            {/* Time */}
            <div className="hidden md:flex flex-col items-end text-[14px] leading-tight">
              <span className={`font-semibold tabular-nums tracking-wide transition-colors duration-300 ${tc}`}>{time}</span>
              <span className={`uppercase tracking-widest text-[11px] transition-colors duration-300 ${tc40}`}>({gmtOffset})</span>
            </div>
            <div className={`hidden md:block w-px h-6 transition-colors duration-300 ${divider}`} />

            {/* LET'S TALK */}
            <button
              onClick={() => scrollTo('contact-page')}
              className={`hidden md:block text-[14px] font-bold tracking-[0.2em] uppercase border rounded-full px-6 py-2.5 transition-all duration-300 ${
                (isOnHero && !isDarkPage)
                  ? 'text-black border-black/30 hover:bg-black hover:text-white bg-white'
                  : 'text-white border-white/30 hover:bg-white hover:text-black bg-transparent'
              }`}
            >
              LET'S TALK
            </button>

            {/* Hamburger — 3 lines, animates to X */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`p-1 flex flex-col gap-[6px] transition-colors duration-300 ${menuOpen ? 'text-white' : tc}`}
              aria-label="Toggle menu"
            >
              <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }}   transition={{ duration: 0.3 }} className="block w-7 h-[2px] bg-current" />
              <motion.span animate={{ opacity: menuOpen ? 0 : 1 }}                          transition={{ duration: 0.2 }} className="block w-7 h-[2px] bg-current" />
              <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }} transition={{ duration: 0.3 }} className="block w-7 h-[2px] bg-current" />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Right-side sliding panel ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Dark left backdrop — clicking it closes menu */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-40"
              style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
            />

            {/* Panel slides in from right */}
            <motion.div
              key="panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
              className="fixed top-0 right-0 bottom-0 z-[60] flex flex-col"
              style={{ width: 'min(480px, 100vw)', background: 'rgba(10,10,10,0.75)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', borderLeft: '1px solid rgba(255,255,255,0.06)' }}
            >
              {/* Panel header */}
              <div className="flex items-center justify-between px-8 h-20 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <span style={{ color: '#e85533', fontSize: '0.65rem' }}>■</span>
                  <span className="text-white text-sm font-semibold tracking-[0.2em] uppercase">Menu</span>
                </div>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-[#e85533] hover:border-[#e85533] transition-all duration-200"
                  aria-label="Close menu"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex flex-col px-8 pt-6 flex-1">
                {navLinks.map((link, i) => (
                  <NavItem key={link.label} link={link} index={i} onNav={scrollTo} isActive={activeSection === link.id} />
                ))}
              </nav>

              {/* Email + Socials footer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.45, duration: 0.4 }}
                className="px-8 py-8 border-t border-white/10"
              >
                {/* Email */}
                <p className="text-white/35 text-xs tracking-widest uppercase mb-2">(EMAIL)</p>
                <a
                  href="mailto:hello@iuxoa.com"
                  className="text-[#e85533] text-5xl font-semibold hover:underline block mb-6"
                >
                  hello@iuxoa.com
                </a>

                {/* Socials */}
                <p className="text-white/35 text-xs tracking-widest uppercase mb-3">(SOCIALS)</p>
                <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                  {[
                    { label: 'X/Twitter',  href: '#' },
                    { label: 'LinkedIn',   href: '#' },
                    { label: 'Instagram',  href: '#' },
                    { label: 'Behance',    href: '#' },
                  ].map(s => (
                    <SocialItem key={s.label} label={s.label} href={s.href} />
                  ))}
                </div>
              </motion.div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

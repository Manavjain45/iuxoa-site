import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SplashScreen from '../components/agency/SplashScreen';
import Navigation from '../components/agency/Navigation';
import Logo from '../components/agency/logo';
import Hero from '../components/agency/Hero';
import AboutScroll from '../components/agency/AboutScroll';
import LatestWork from '../components/agency/LatestWork';
import NakulaTestimonial from '../components/agency/NakulaTestimonial';
import Testimonial from '../components/agency/Testimonial';
import HowWeHelp from '../components/agency/HowWeHelp';
import ProcessSection from '../components/agency/ProcessSection';
import FAQSection from '../components/agency/FAQSection';
import LatestInsights from '../components/agency/LatestInsights';
import ContactHero from '../components/agency/ContactHero';
import BrandBanner from '../components/agency/BrandBanner';
import ContactFooter from '../components/agency/ContactFooter';

// Hero shrinks + rounds as user scrolls, revealing dark content beneath
function HeroWithTransition() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const scale        = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.4, 1], ['0px', '12px', '24px']);
  const opacity      = useTransform(scrollYProgress, [0.7, 1], [1, 0.6]);

  return (
    <div ref={containerRef} style={{ position: 'relative', height: '110vh' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', zIndex: 1 }}>
        <motion.div style={{ scale, borderRadius, overflow: 'hidden', height: '100%', opacity, originY: 0 }}>
          <Hero />
        </motion.div>
      </div>
    </div>
  );
}

export default function Home() {
  const [showSplash, setShowSplash] = useState(() => {
    const isSpaNav = sessionStorage.getItem('spaNavigation') === 'true';
    sessionStorage.removeItem('spaNavigation');
    return !isSpaNav;
  });

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <div style={{ background: '#000' }}>
      <Navigation />
      <HeroWithTransition />
      <AboutScroll />
      <div style={{ position: 'relative', zIndex: 2 }}>
        <LatestWork />
      </div>
      <NakulaTestimonial />
      <HowWeHelp />
      <ProcessSection />
      <Testimonial />
      <div style={{ position: 'relative', zIndex: 10 }}>
        <FAQSection />
        <LatestInsights />
        <ContactHero />
        <BrandBanner />
        <ContactFooter />
      </div>
    </div>
  );
}

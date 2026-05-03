import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

const SANS = "'Inter', 'Helvetica Neue', Arial, sans-serif";

const faqData = [
  {
    number: '01',
    question: "What's your typical process for a new project?",
    answer: "We start with a discovery phase to understand your brand, goals, and audience. Then we move into strategy, design, development, and finally launch. Each phase includes collaborative checkpoints to ensure alignment.",
    tag: 'PROCESS',
  },
  {
    number: '02',
    question: "How long does a project usually take?",
    answer: "Timelines vary based on scope. A typical branding project takes 4–6 weeks, while a full website build ranges from 6–12 weeks. We'll provide a detailed timeline during our initial consultation.",
    tag: 'TIMELINE',
  },
  {
    number: '03',
    question: "Do you offer packages or custom quotes?",
    answer: "We offer both. Our packages provide a clear starting point, but every project is unique. We're happy to create custom proposals tailored to your specific needs and budget.",
    tag: 'PRICING',
  },
  {
    number: '04',
    question: "What's included in a branding package?",
    answer: "Our branding packages typically include brand strategy, logo design, color palette, typography system, brand guidelines, and core visual assets. We can also extend to brand voice, messaging, and collateral design.",
    tag: 'BRANDING',
  },
  {
    number: '05',
    question: "Can you work with our existing dev or marketing team?",
    answer: "Absolutely. We frequently collaborate with in-house teams and other agencies. We're flexible and can adapt our workflow to integrate seamlessly with your existing processes.",
    tag: 'COLLAB',
  },
];

function FAQItem({ item, isOpen, onClick, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      style={{ cursor: 'pointer', position: 'relative' }}
    >
      {/* Hover background fill */}
      <motion.div
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ position: 'absolute', inset: 0, background: 'rgba(255,77,45,0.04)', borderRadius: '16px', pointerEvents: 'none' }}
      />

      <div style={{
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        padding: '0 4px',
      }}>
        {/* Question row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '26px 0' }}>

          {/* Number */}
          <span style={{
            fontFamily: SANS, fontSize: '0.65rem', fontWeight: 700,
            color: isOpen ? '#FF4D2D' : 'rgba(255,255,255,0.18)',
            letterSpacing: '0.1em', flexShrink: 0, minWidth: '24px',
            transition: 'color 0.3s',
          }}>
            {item.number}
          </span>

          {/* Tag pill */}
          <motion.span
            animate={{ opacity: isOpen ? 1 : 0.4, scale: isOpen ? 1 : 0.95 }}
            transition={{ duration: 0.3 }}
            style={{
              display: 'none',
              alignItems: 'center',
              padding: '3px 10px', borderRadius: '100px',
              background: isOpen ? 'rgba(255,77,45,0.15)' : 'rgba(255,255,255,0.05)',
              border: `1px solid ${isOpen ? 'rgba(255,77,45,0.3)' : 'rgba(255,255,255,0.08)'}`,
              color: isOpen ? '#FF4D2D' : 'rgba(255,255,255,0.3)',
              fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.15em',
              flexShrink: 0, transition: 'all 0.3s', whiteSpace: 'nowrap',
              '@media(min-width:768px)': { display: 'flex' },
            }}
          >
            {item.tag}
          </motion.span>

          {/* Question text */}
          <span style={{
            flex: 1,
            color: isOpen ? '#fff' : 'rgba(255,255,255,0.6)',
            fontSize: 'clamp(0.95rem, 1.3vw, 1.15rem)',
            fontWeight: isOpen ? 700 : 500,
            lineHeight: 1.3, letterSpacing: '-0.01em',
            transition: 'color 0.3s, font-weight 0.3s',
          }}>
            {item.question}
          </span>

          {/* Toggle icon */}
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0, background: isOpen ? '#FF4D2D' : 'transparent' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{
              width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
              border: `1.5px solid ${isOpen ? '#FF4D2D' : 'rgba(255,255,255,0.15)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 1v10M1 6h10" stroke={isOpen ? '#fff' : 'rgba(255,255,255,0.5)'} strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          </motion.div>
        </div>

        {/* Answer panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{ display: 'flex', gap: '20px', paddingBottom: '28px', paddingLeft: '44px' }}>
                {/* accent line */}
                <div style={{ width: 2, borderRadius: 2, background: 'linear-gradient(to bottom, #FF4D2D, transparent)', flexShrink: 0, minHeight: '100%' }} />
                <p style={{
                  color: 'rgba(255,255,255,0.5)',
                  fontSize: 'clamp(0.85rem, 1vw, 0.96rem)',
                  lineHeight: 1.8, margin: 0, fontWeight: 400,
                }}>
                  {item.answer}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const faqY = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);

  return (
    <section
      ref={sectionRef}
      style={{ background: '#080808', fontFamily: SANS, padding: '80px 0 100px', position: 'relative', overflow: 'hidden' }}
    >
      {/* Background decoration */}
      <motion.div style={{ y: faqY }} className="absolute inset-0 pointer-events-none">
        <div style={{ position: 'absolute', top: '10%', right: '-5%', width: 550, height: 550, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,77,45,0.05) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div style={{ position: 'absolute', bottom: '-10%', left: '20%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)', filter: 'blur(50px)' }} />
        {/* Grid dots pattern */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px', maskImage: 'radial-gradient(ellipse at 80% 50%, black 20%, transparent 70%)' }} />
      </motion.div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.7fr', gap: '80px', alignItems: 'start' }}>

          {/* ── Left sticky panel ── */}
          <div style={{ position: 'sticky', top: '120px' }}>

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.5 }}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}
            >
              <span style={{ color: '#FF4D2D', fontSize: '0.6rem' }}>■</span>
              <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase' }}>Got Questions?</span>
            </motion.div>

            {/* Giant FAQ text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* F — white */}
              <div style={{ display: 'flex', alignItems: 'flex-start', lineHeight: 0.85 }}>
                <span style={{ fontFamily: SANS, fontSize: 'clamp(7rem, 13vw, 14rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.06em', lineHeight: 0.85 }}>F</span>
                <span style={{ fontFamily: SANS, fontSize: 'clamp(7rem, 13vw, 14rem)', fontWeight: 900, color: '#FF4D2D', letterSpacing: '-0.06em', lineHeight: 0.85 }}>A</span>
                <span style={{ fontFamily: SANS, fontSize: 'clamp(7rem, 13vw, 14rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.06em', lineHeight: 0.85 }}>Q</span>
              </div>

              {/* Underline accent */}
              <motion.div
                initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                style={{ height: 3, background: 'linear-gradient(90deg, #FF4D2D 0%, transparent 100%)', borderRadius: 2, marginTop: '8px', transformOrigin: 'left', width: '80%' }}
              />
            </motion.div>

            {/* Count badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.5, delay: 0.4 }}
              style={{ marginTop: '28px', display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '8px 16px', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF4D2D' }} />
              <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{faqData.length} Questions</span>
            </motion.div>

            {/* Subtitle + CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.5, delay: 0.5 }}
              style={{ marginTop: '32px' }}
            >
              <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.88rem', margin: '0 0 10px', lineHeight: 1.6 }}>
                Still have questions? We're happy to chat.
              </p>
              <a
                href="#contact"
                style={{ color: '#FF4D2D', fontSize: '0.88rem', textDecoration: 'none', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '6px', letterSpacing: '0.02em', transition: 'gap 0.3s' }}
                onMouseEnter={e => e.currentTarget.style.gap = '12px'}
                onMouseLeave={e => e.currentTarget.style.gap = '6px'}
              >
                Contact Us
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M1 11L11 1M11 1H4M11 1v7" stroke="#FF4D2D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </motion.div>
          </div>

          {/* ── Right: FAQ accordion ── */}
          <div style={{ paddingTop: '4px' }}>
            {/* Top border */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', marginBottom: '0' }} />
            {faqData.map((item, index) => (
              <FAQItem
                key={index}
                item={item}
                index={index}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}

            {/* Bottom tag */}
            <motion.div
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.5, delay: 0.6 }}
              style={{ marginTop: '32px', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                {faqData.length} of {faqData.length} questions shown
              </span>
              <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

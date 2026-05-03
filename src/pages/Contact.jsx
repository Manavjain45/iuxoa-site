import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navigation from '../components/agency/Navigation';
import ContactFooter from '../components/agency/ContactFooter';

const SANS = "'Inter', 'Helvetica Neue', Arial, sans-serif";
const COND = "'Barlow Condensed', sans-serif";

function ContactHero() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSubmitted(true);
  };

  const inputStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 10,
    padding: '1rem 1.2rem',
    fontFamily: SANS,
    fontSize: '0.95rem',
    color: '#e8e6e0',
    outline: 'none',
    transition: 'border-color 0.25s',
    boxSizing: 'border-box',
  };

  return (
    <div style={{ background: '#080808', minHeight: '100vh', paddingTop: '5rem' }}>
      <div style={{ maxWidth: 1300, margin: '0 auto', padding: '3rem 5% 5rem' }}>

        {/* Two-col on desktop, single col on mobile */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
          gap: 'clamp(2rem, 5vw, 5rem)',
          alignItems: 'flex-start',
        }}>

          {/* ── LEFT ── */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              style={{ fontFamily: SANS, fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '1.2rem' }}
            >
              (CONTACT US)
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: COND,
                fontSize: 'clamp(3.5rem, 11vw, 9.5rem)',
                fontWeight: 900,
                color: '#e8e6e0',
                lineHeight: 0.86,
                letterSpacing: '-0.01em',
                textTransform: 'uppercase',
                margin: '0 0 1.8rem',
              }}
            >
              LET'S<br />WORK<br />TOGETHER
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontFamily: SANS, fontSize: 'clamp(0.88rem, 1.3vw, 1.05rem)', color: 'rgba(255,255,255,0.4)', lineHeight: 1.75, maxWidth: 400, margin: 0 }}
            >
              Have a project in mind? We'd love to hear about it. Let's create something great together!
            </motion.p>
          </div>

          {/* ── RIGHT: form ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {submitted ? (
              <div style={{
                background: 'rgba(232,85,51,0.08)', border: '1px solid rgba(232,85,51,0.3)',
                borderRadius: 14, padding: '3rem 2rem', textAlign: 'center', marginBottom: '2rem',
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>✓</div>
                <p style={{ fontFamily: COND, fontSize: '1.6rem', fontWeight: 800, color: '#e8e6e0', margin: '0 0 0.5rem' }}>Message Sent!</p>
                <p style={{ fontFamily: SANS, fontSize: '0.9rem', color: 'rgba(255,255,255,0.4)', margin: 0 }}>We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <div style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 14, padding: '1.5rem', marginBottom: '1.5rem',
              }}>
                {/* Name + Email — stack on mobile */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                  gap: '0.8rem', marginBottom: '0.8rem'
                }}>
                  <input name="name" value={form.name} onChange={handleChange} placeholder="Enter your name" style={inputStyle}
                    onFocus={e => e.target.style.borderColor = 'rgba(232,85,51,0.6)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'} />
                  <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" style={inputStyle}
                    onFocus={e => e.target.style.borderColor = 'rgba(232,85,51,0.6)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'} />
                </div>

                <textarea name="message" value={form.message} onChange={handleChange} placeholder="Message" rows={5}
                  style={{ ...inputStyle, resize: 'vertical', minHeight: 120, marginBottom: '1.2rem' }}
                  onFocus={e => e.target.style.borderColor = 'rgba(232,85,51,0.6)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'} />

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                  <p style={{ fontFamily: SANS, fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', lineHeight: 1.6, margin: 0, maxWidth: 200 }}>
                    By submitting you agree to our{' '}
                    <a href="#" style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600, textDecoration: 'none' }}>Terms of Service</a>
                    {' '}and{' '}
                    <a href="#" style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600, textDecoration: 'none' }}>Privacy Policy</a>
                  </p>
                  <button onClick={handleSubmit}
                    onMouseEnter={() => setBtnHovered(true)}
                    onMouseLeave={() => setBtnHovered(false)}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                      padding: '0.85rem 1.8rem', borderRadius: 999,
                      background: btnHovered ? '#c94020' : '#e85533', border: 'none', color: '#fff',
                      fontFamily: COND, fontSize: '0.95rem', fontWeight: 700,
                      letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer',
                      transition: 'background 0.25s', whiteSpace: 'nowrap',
                    }}>
                    SUBSCRIBE
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M1 13L13 1M13 1H5M13 1v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            )}

            <p style={{ fontFamily: SANS, fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', marginBottom: '1.5rem' }}>
              Prefer to hop on a call?{' '}
              <a href="https://calendly.com" target="_blank" rel="noopener noreferrer" style={{ color: '#e85533', fontWeight: 600, textDecoration: 'none' }}>Book a call</a>{' '}instead.
            </p>

            <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', marginBottom: '1.5rem' }} />

            <div>
              <h3 style={{ fontFamily: SANS, fontSize: '1.2rem', fontWeight: 700, color: '#e8e6e0', margin: '0 0 1.2rem' }}>Visit Us</h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '1rem'
              }}>
                <div>
                  <p style={{ fontFamily: SANS, fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '0.5rem' }}>(ADDRESS)</p>
                  <p style={{ fontFamily: SANS, fontSize: '0.95rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, margin: 0 }}>
                    Chandigarh University,<br />NH-95, Chandigarh-Ludhiana Highway,<br />Mohali, Punjab 140413
                  </p>
                </div>
                <div>
                  <p style={{ fontFamily: SANS, fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '0.5rem' }}>(OFFICE HOURS)</p>
                  <p style={{ fontFamily: SANS, fontSize: '0.95rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, margin: 0 }}>
                    Monday – Friday<br />9:00 AM – 6:00 PM (GMT+0)
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function Contact() {
  return (
    <div style={{ background: '#080808', minHeight: '100vh' }}>
      <Navigation />
      <ContactHero />
      <ContactFooter />
    </div>
  );
}

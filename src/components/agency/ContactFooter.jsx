import React, { useState, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID  = 'service_95xs632';
const EMAILJS_TEMPLATE_ID = 'template_k44dzfr';
const EMAILJS_PUBLIC_KEY  = 'x-T8gQsChBd7S-CzH';

const SANS = "'Inter', 'Helvetica Neue', Arial, sans-serif";
const COND = "'Barlow Condensed', sans-serif";
const curveEase = [0.16, 1.4, 0.36, 1];

function LetsWorkTogether() {
  const [btnHovered, setBtnHovered] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      { from_name: form.name, from_email: form.email, message: form.message, company: '' },
      EMAILJS_PUBLIC_KEY
    ).then(() => {
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    }).catch(() => setStatus('error'));
  };

  const inputStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 10,
    padding: '14px 18px',
    color: '#fff',
    fontSize: '0.95rem',
    fontFamily: SANS,
    outline: 'none',
    transition: 'border-color 0.25s ease',
    boxSizing: 'border-box',
  };

  return (
    <div style={{
      position: 'relative',
      background: '#060606',
      overflow: 'hidden',
      padding: '80px 5%',
    }}>

      {/* Grid background */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, #060606 100%)',
      }} />

      {/* Orange glow */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', top: '-10%', left: '30%',
          width: 600, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,77,0,0.15) 0%, transparent 65%)',
          filter: 'blur(80px)', pointerEvents: 'none',
        }}
      />

      <div style={{
        position: 'relative', zIndex: 2,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '80px',
        maxWidth: 1300,
        margin: '0 auto',
        alignItems: 'center',
      }}>

        {/* ── LEFT: heading + info ── */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 20, fontFamily: SANS }}
          >
            (CONTACT US)
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: COND,
              fontSize: 'clamp(3.5rem, 7vw, 7rem)',
              fontWeight: 900,
              color: '#e8e6e0',
              lineHeight: 0.88,
              letterSpacing: '-0.01em',
              textTransform: 'uppercase',
              margin: '0 0 32px 0',
            }}
          >
            LET'S WORK<br />TOGETHER
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ fontFamily: SANS, fontSize: '1rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, marginBottom: 40, maxWidth: 400 }}
          >
            Have a project in mind? We'd love to hear about it. Let's create something great together!
          </motion.p>

          {/* Contact details */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,77,0,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: '1rem' }}>✉️</span>
              </div>
              <a href="mailto:duneli.iuxoa@gmail.com" style={{ color: '#FF4D00', fontFamily: SANS, fontSize: '0.95rem', textDecoration: 'none', fontWeight: 600 }}>
                duneli.iuxoa@gmail.com
              </a>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,77,0,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: '1rem' }}>📞</span>
              </div>
              <span style={{ color: '#fff', fontFamily: SANS, fontSize: '0.95rem', fontWeight: 600 }}>+91 77468 19776</span>
            </div>
          </motion.div>
        </div>

        {/* ── RIGHT: Contact Form ── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 20,
            padding: '40px',
          }}
        >
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* Name + Email row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <input
                type="text" placeholder="Enter your name" required
                value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = 'rgba(255,77,0,0.6)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
              <input
                type="email" placeholder="Email" required
                value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = 'rgba(255,77,0,0.6)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
            </div>

            {/* Message */}
            <textarea
              placeholder="Message" required rows={5}
              value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
              style={{ ...inputStyle, resize: 'vertical', minHeight: 130 }}
              onFocus={e => e.target.style.borderColor = 'rgba(255,77,0,0.6)'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
            />

            {/* Bottom row: terms + button */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
              <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', fontFamily: SANS, lineHeight: 1.5, margin: 0, maxWidth: 220 }}>
                By submitting you agree to our{' '}
                <span style={{ color: '#FF4D00', cursor: 'pointer' }}>Terms of Service</span>{' '}and{' '}
                <span style={{ color: '#FF4D00', cursor: 'pointer' }}>Privacy Policy</span>
              </p>

              <button
                type="submit"
                disabled={status === 'sending'}
                style={{
                  padding: '14px 28px',
                  borderRadius: 999,
                  background: status === 'sending' ? 'rgba(255,77,0,0.5)' : '#FF4D00',
                  color: '#fff',
                  fontFamily: SANS,
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  border: 'none',
                  cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', gap: 8,
                  transition: 'transform 0.2s ease, background 0.2s ease',
                  flexShrink: 0,
                }}
                onMouseEnter={e => { if (status !== 'sending') e.currentTarget.style.transform = 'scale(1.04)'; }}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                {status === 'sending' ? 'Sending...' : 'SEND'}
                {status !== 'sending' && <span style={{ fontSize: '1rem' }}>↗</span>}
              </button>
            </div>

            {/* Status messages */}
            <AnimatePresence>
              {status === 'success' && (
                <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  style={{ color: '#4ade80', fontFamily: SANS, fontSize: '0.9rem', margin: 0, textAlign: 'center' }}>
                  ✅ Message sent! We'll get back to you soon.
                </motion.p>
              )}
              {status === 'error' && (
                <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  style={{ color: '#f87171', fontFamily: SANS, fontSize: '0.9rem', margin: 0, textAlign: 'center' }}>
                  ❌ Something went wrong. Please try again.
                </motion.p>
              )}
            </AnimatePresence>
          </form>

          {/* Prefer a call */}
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.85rem', fontFamily: SANS, marginTop: 20, marginBottom: 0 }}>
            Prefer to hop on a call?{' '}
            <a href="tel:+917746819776" style={{ color: '#FF4D00', fontWeight: 700, textDecoration: 'none' }}>Book a call</a>{' '}instead.
          </p>
        </motion.div>
      </div>

      {/* Top separator */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'rgba(255,255,255,0.06)' }} />
      {/* Bottom separator */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'rgba(255,255,255,0.06)' }} />
    </div>
  );
}

export default function ContactFooter() {
  const location = useLocation();
  const navigate = useNavigate();
  const isContactPage = location.pathname === '/contact';
  const isHomePage = location.pathname === '/';
  const hideLetsTalk = isContactPage || isHomePage;
  const links = [
    { label: "Home",     href: "#" },
    { label: "About",    href: "#" },
    { label: "Works",    href: "#" },
    { label: "Contact",  href: "#" },
    { label: "Blog",     href: "#" },
    { label: "404",      href: "#" },
    { label: "Waitlist", href: "#" },
  ];

  const socials = [
    { label: "X/Twitter",  href: "#" },
    { label: "Instagram",  href: "https://www.instagram.com/duneli.iuxoa?igsh=MWhtanI0eTZ0eGU3eA==", target: "_blank" },
    { label: "LinkedIn",   href: "#" },
    { label: "Behance",    href: "#" },
  ];

  return (
    <>
      {!hideLetsTalk && <LetsWorkTogether />}
      <footer
      style={{
        background: "#000",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        padding: "80px 80px 48px",
        fontFamily: SANS,
      }}
    >
      {/* Main grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: "64px",
          marginBottom: "64px",
          maxWidth: "1400px",
          margin: "0 auto 64px",
        }}
        className="footer-grid"
      >
        {/* Contact info */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: curveEase }}
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <div style={{ display: "flex", alignItems: "baseline", gap: "16px" }}>
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", flexShrink: 0 }}>
              (EMAIL)
            </span>
            <a
              href="mailto:duneli.iuxoa@gmail.com"
              style={{ color: "#FF4D00", fontWeight: 700, fontSize: "1.6rem", textDecoration: "none", fontFamily: SANS }}
            >
              duneli.iuxoa@gmail.com
            </a>
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: "16px" }}>
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", flexShrink: 0 }}>
              (PHONE)
            </span>
            <p style={{ color: "#fff", fontWeight: 700, fontSize: "1.6rem", margin: 0, fontFamily: SANS }}>
            +91 77468 19776
            </p>
          </div>
        </motion.div>

        {/* Links */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: curveEase }}
        >
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.85rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "16px" }}>
            (Links)
          </p>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  style={{
                    color: "rgba(200,200,200,0.7)",
                    fontSize: "1.4rem",
                    textDecoration: "none",
                    fontFamily: SANS,
                    position: "relative",
                    display: "inline-block",
                    transition: "color 0.25s ease",
                    paddingBottom: "3px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#fff";
                    const line = e.currentTarget.querySelector('.orange-line');
                    if (line) {
                      line.style.transition = 'none';
                      line.style.transformOrigin = 'left';
                      line.style.transform = 'scaleX(0)';
                      line.getBoundingClientRect(); // force reflow
                      line.style.transition = 'transform 0.45s cubic-bezier(0.76,0,0.24,1)';
                      line.style.transform = 'scaleX(1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(200,200,200,0.7)";
                    const line = e.currentTarget.querySelector('.orange-line');
                    if (line) {
                      line.style.transition = 'transform 0.45s cubic-bezier(0.76,0,0.24,1)';
                      line.style.transformOrigin = 'right';
                      line.style.transform = 'scaleX(0)';
                    }
                  }}
                >
                  {link.label}
                  <span
                    className="orange-line"
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: "100%",
                      height: "2px",
                      background: "#FF4D00",
                      transform: "scaleX(0)",
                      transformOrigin: "right",
                      display: "block",
                    }}
                  />
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Legal */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: curveEase }}
        >
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.85rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "16px" }}>
            (Legal)
          </p>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
            {[
              { label: "Privacy Policy", path: "/privacy-policy" },
              { label: "Terms of Service", path: "/terms-of-service" },
            ].map((item) => (
              <li key={item.label}>
                <button
                  onClick={() => navigate(item.path)}
                  style={{
                    color: "rgba(200,200,200,0.7)",
                    fontSize: "1.4rem",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: SANS,
                    position: "relative",
                    display: "inline-block",
                    transition: "color 0.25s ease",
                    paddingBottom: "3px",
                    padding: 0,
                    textAlign: "left",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(200,200,200,0.7)"; }}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3, ease: curveEase }}
        >
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.85rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "16px" }}>
            (Socials)
          </p>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target={social.target || "_self"}
                  rel="noopener noreferrer"
                  style={{
                    color: "rgba(200,200,200,0.7)",
                    fontSize: "1.4rem",
                    textDecoration: "none",
                    fontFamily: SANS,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    position: "relative",
                    paddingBottom: "3px",
                    transition: "color 0.25s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#fff";
                    const line = e.currentTarget.querySelector('.orange-line');
                    if (line) {
                      line.style.transition = 'none';
                      line.style.transformOrigin = 'left';
                      line.style.transform = 'scaleX(0)';
                      line.getBoundingClientRect(); // force reflow
                      line.style.transition = 'transform 0.45s cubic-bezier(0.76,0,0.24,1)';
                      line.style.transform = 'scaleX(1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(200,200,200,0.7)";
                    const line = e.currentTarget.querySelector('.orange-line');
                    if (line) {
                      line.style.transition = 'transform 0.45s cubic-bezier(0.76,0,0.24,1)';
                      line.style.transformOrigin = 'right';
                      line.style.transform = 'scaleX(0)';
                    }
                  }}
                >
                  {social.label}
                  <ArrowUpRight size={12} style={{ color: "rgba(255,255,255,0.3)" }} />
                  <span
                    className="orange-line"
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: "100%",
                      height: "2px",
                      background: "#FF4D00",
                      transform: "scaleX(0)",
                      transformOrigin: "right",
                      display: "block",
                    }}
                  />
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          paddingTop: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        className="footer-bottom-bar"
      >
        <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.75rem", margin: 0, fontFamily: SANS }}>
          © {new Date().getFullYear()} All rights reserved.
        </p>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {[
            { label: 'Privacy Policy', path: '/privacy-policy' },
            { label: 'Terms of Service', path: '/terms-of-service' },
          ].map(item => (
            <button key={item.label} onClick={() => navigate(item.path)}
              style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.2s', padding: 0, fontFamily: SANS }}
              onMouseEnter={e => e.currentTarget.style.color = '#FF4D00'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}
            >{item.label}</button>
          ))}
        </div>
      </div>
    </footer>
    </>
  );
}

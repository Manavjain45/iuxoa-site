import React from 'react';
import { Twitter, Linkedin, Instagram, Github, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();
  return (
    <footer style={{ background: '#0a0a0a', color: '#fff', fontFamily: "'Inter', sans-serif" }} className="relative overflow-hidden">

      {/* Decorative accent line */}
      <div style={{ height: 2, background: 'linear-gradient(90deg, transparent, #FF4D2D 40%, #FF4D2D 60%, transparent)' }} />

      {/* Glowing blob */}
      <div style={{
        position: 'absolute', bottom: '-80px', right: '-80px',
        width: 350, height: 350, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,77,45,0.08) 0%, transparent 70%)',
        filter: 'blur(40px)', pointerEvents: 'none',
      }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid md:grid-cols-12 gap-12 mb-16">

          {/* Brand */}
          <div className="md:col-span-5">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '2rem', fontWeight: 900, letterSpacing: '-0.03em', textTransform: 'uppercase' }}>
                iuxoa
              </span>
              <sup style={{ fontSize: '0.6rem', color: '#FF4D2D', fontWeight: 300 }}>®</sup>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, maxWidth: '320px', fontSize: '0.92rem' }}>
              We build games, apps, and digital experiences that feel alive — with code, creativity, and collaboration.
            </p>
            {/* Email pill */}
            <a
              href="mailto:hello@iuxoa.com"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                marginTop: '1.5rem', padding: '0.6rem 1.2rem',
                border: '1px solid rgba(255,77,45,0.4)', borderRadius: '100px',
                color: '#FF4D2D', fontSize: '0.82rem', fontWeight: 600,
                letterSpacing: '0.05em', textDecoration: 'none',
                transition: 'background 0.3s, color 0.3s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#FF4D2D'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#FF4D2D'; }}
            >
              hello@iuxoa.com <ArrowUpRight size={14} />
            </a>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h4 style={{ fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '1.2rem', fontWeight: 600 }}>Navigation</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {['Home', 'Works', 'About', 'Contact'].map(link => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500, transition: 'color 0.2s', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#FF4D2D'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
                  >
                    <span style={{ color: '#FF4D2D', fontSize: '0.5rem' }}>◆</span> {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 style={{ fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '1.2rem', fontWeight: 600 }}>Legal</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { label: 'Privacy Policy', path: '/privacy-policy' },
                { label: 'Terms of Service', path: '/terms-of-service' },
              ].map(item => (
                <li key={item.label}>
                  <button
                    onClick={() => navigate(item.path)}
                    style={{ color: 'rgba(255,255,255,0.55)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.95rem', fontWeight: 500, transition: 'color 0.2s', display: 'flex', alignItems: 'center', gap: '0.4rem', padding: 0, fontFamily: "'Inter', sans-serif" }}
                    onMouseEnter={e => e.currentTarget.style.color = '#FF4D2D'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
                  >
                    <span style={{ color: '#FF4D2D', fontSize: '0.5rem' }}>◆</span> {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div className="md:col-span-4">
            <h4 style={{ fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '1.2rem', fontWeight: 600 }}>Follow Us</h4>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {[
                { icon: <Twitter size={16} />, href: '#', label: 'Twitter' },
                { icon: <Linkedin size={16} />, href: '#', label: 'LinkedIn' },
                { icon: <Instagram size={16} />, href: 'https://www.instagram.com/duneli.iuxoa?igsh=MWhtanI0eTZ0eGU3eA==', label: 'Instagram' },
                { icon: <Github size={16} />, href: '#', label: 'Github' },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.label}
                  style={{
                    width: 42, height: 42, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(255,255,255,0.6)', textDecoration: 'none',
                    transition: 'background 0.3s, border-color 0.3s, color 0.3s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#FF4D2D'; e.currentTarget.style.borderColor = '#FF4D2D'; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
                >
                  {s.icon}
                </a>
              ))}
            </div>

            {/* Location tag */}
            <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem' }}>
              <span style={{ color: '#FF4D2D' }}>◎</span> Ludhiana, Punjab, India
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '1.5rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
          <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.8rem' }}>
            © 2026 <span style={{ color: '#FF4D2D' }}>iuxoa</span>. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {[
              { label: 'Privacy Policy', path: '/privacy-policy' },
              { label: 'Terms of Service', path: '/terms-of-service' },
            ].map(item => (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.2s', padding: 0 }}
                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

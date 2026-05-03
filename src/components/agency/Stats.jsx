import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

function CountUp({ target, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const stats = [
  { value: 10,  suffix: '+',  label: 'Projects completed',        desc: 'Shipped across games, apps & sites' },
  { value: 2,   suffix: '+',  label: 'Years of experience',       desc: 'Building digital products' },
  { value: 98,  suffix: '%',  label: 'Customer satisfaction',     desc: 'Clients love what we deliver' },
  { value: 12,  suffix: '',   label: 'Team members',              desc: 'Passionate builders & creators' },
];

export default function Stats() {
  return (
    <section style={{ background: '#0d0d0d', padding: '5rem 0', position: 'relative', overflow: 'hidden' }}>

      {/* top accent line */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,77,45,0.5) 50%, transparent)' }} />

      {/* glow blob */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,77,45,0.06) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              style={{
                padding: '2.5rem 2rem',
                borderLeft: i === 0 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                borderRight: '1px solid rgba(255,255,255,0.06)',
                textAlign: 'center',
                position: 'relative',
              }}
            >
              {/* Number */}
              <div style={{
                fontFamily: "'Barlow Condensed', 'Inter', sans-serif",
                fontSize: 'clamp(3rem, 6vw, 5rem)',
                fontWeight: 800,
                lineHeight: 1,
                color: '#FF4D2D',
                letterSpacing: '-0.02em',
                marginBottom: '0.5rem',
                textShadow: '0 0 40px rgba(255,77,45,0.3)',
              }}>
                <CountUp target={stat.value} suffix={stat.suffix} />
              </div>

              {/* Label */}
              <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.4rem' }}>
                {stat.label}
              </div>

              {/* Desc */}
              <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', lineHeight: 1.5 }}>
                {stat.desc}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* bottom accent line */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,77,45,0.5) 50%, transparent)' }} />
    </section>
  );
}

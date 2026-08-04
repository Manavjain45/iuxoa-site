import React, { useState } from 'react';
import ayushImg from '../../assets/team/Ayush Mahanta.jpg';
import manavImg from '../../assets/team/Manav Jain.jpeg';
import sarikaImg from '../../assets/team/Sarika Ruhil.jpg';
import { motion, AnimatePresence } from 'framer-motion';
import { RevealCardContainer, IdentityCardBody } from '../ui/animated-profile-card';
import { Github, Twitter, Linkedin } from 'lucide-react';
import {
  SharedBgStyles, CrazyGrid, FloatingOrbs, ParticleCanvas,
  LaserBeams, GhostText, Crosshair, CornerMarks, NoiseOverlay, HudLabel,
} from './SharedBackground';

const SANS = "'Inter', 'Helvetica Neue', Arial, sans-serif";

const testimonials = [
  {
    name: 'Ayush Mahanta', role: 'Data Analyst · Full Stack · Researcher', place: 'Ludhiana, India',
    about: 'Data-driven builder passionate about research and full-stack development. Core member of IUXOA since Jan 2025.',
    avatar: ayushImg,
    quoteStrong: 'Working with IUXOA felt personal.',
    quoteFade: " The research behind every decision was visible — they didn't just build, they understood why it needed to exist.",
    image: 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=900&q=80',
    accent: '#3b82f6',
    socials: [{ id:'gh', url:'#', label:'GitHub', icon:<Github size={18}/> }, { id:'tw', url:'#', label:'Twitter', icon:<Twitter size={18}/> }],
  },
  {
    name: 'Manav Jain', role: 'Frontend Dev · Graphics Designer · Marketing', place: 'Ludhiana, India',
    about: 'Creative frontend developer and designer. Brings brands to life through bold visuals and sharp marketing instincts.',
    avatar: manavImg,
    quoteStrong: "They don't copy, they create.",
    quoteFade: ' Every solution felt genuinely original — built for the gap, not the trend. A team that actually listens.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=900&q=80',
    accent: '#a855f7',
    socials: [{ id:'li', url:'#', label:'LinkedIn', icon:<Linkedin size={18}/> }, { id:'tw', url:'#', label:'Twitter', icon:<Twitter size={18}/> }],
  },
  {
    name: 'Sarika Ruhil', role: 'Full Stack Developer', place: 'Ludhiana, India',
    about: 'Full stack developer with a passion for building robust, scalable web applications. Core member of IUXOA since Jan 2026.',
    avatar: sarikaImg,
    quoteStrong: 'Rare to find a team this honest.',
    quoteFade: ' Working with IUXOA felt like collaborating with people who care about filling real gaps, not recycling ideas.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&q=80',
    accent: '#22c55e',
    socials: [{ id:'gh', url:'#', label:'GitHub', icon:<Github size={18}/> }, { id:'li', url:'#', label:'LinkedIn', icon:<Linkedin size={18}/> }],
  },
];

export default function NakulaTestimonial() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const goTo = (i) => { setDir(i > active ? 1 : -1); setActive(i); };
  const t = testimonials[active];

  return (
    <section style={{
      background: '#080808', fontFamily: SANS, padding: '64px 80px',
      position: 'relative', overflow: 'hidden',
    }}>
      <SharedBgStyles/>

      {/* ══ SHARED BACKGROUND LAYERS ══ */}
      <CrazyGrid id="nakula"/>
      <GhostText word1="TRUST" word2="PEOPLE" color1="rgba(255,77,0,0.048)" color2="rgba(123,97,255,0.038)"/>
      <FloatingOrbs orbs={[
        { top:'0%',  left:'0%',  w:520, h:520, color:'rgba(255,77,0,0.11)',   blur:90,  anim:'orbF1 10s ease-in-out infinite' },
        { top:'30%', left:'38%', w:460, h:460, color:`${t.accent}28`,          blur:85,  anim:'orbF2 13s ease-in-out infinite' },
        { top:'60%', left:'65%', w:380, h:380, color:'rgba(0,212,255,0.08)',   blur:75,  anim:'orbF3 9s ease-in-out infinite' },
        { top:'5%',  left:'65%', w:340, h:340, color:'rgba(0,255,148,0.07)',   blur:65,  anim:'orbF1 12s ease-in-out infinite reverse' },
        { top:'70%', left:'10%', w:280, h:280, color:'rgba(239,68,68,0.07)',   blur:65,  anim:'orbF2 8s ease-in-out infinite reverse' },
      ]}/>
      <ParticleCanvas colors={['#FF4D00','#7B61FF','#00D4FF','#00FF94','#ffffff']} count={65}/>
      <LaserBeams/>
      <NoiseOverlay/>

      {/* Crosshairs */}
      <Crosshair x="6%"  y="12%" color="#FF4D00" size={24} delay="0s"/>
      <Crosshair x="88%" y="18%" color="#7B61FF" size={18} delay=".7s"/>
      <Crosshair x="52%" y="6%"  color="#00D4FF" size={14} delay="1.4s"/>
      <Crosshair x="78%" y="88%" color="#00FF94" size={20} delay=".3s"/>
      <Crosshair x="20%" y="92%" color="#FF4D00" size={12} delay="2s"/>

      <CornerMarks/>
      <HudLabel left={24}  bottom={20} text="TESTIMONIALS.SYS / FEATURED / LIVE"/>
      <HudLabel right={32} top={20}    text="00 / FEATURED VOICES"/>

      {/* ══ CONTENT ══ */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 44%', gap: '3rem',
        alignItems: 'center', maxWidth: '1300px', margin: '0 auto',
        position: 'relative', zIndex: 5,
      }}>
        {/* LEFT */}
        <div>
          <AnimatePresence mode="wait">
            <motion.div key={active}
              initial={{ opacity:0, x:dir*50 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:dir*-50 }}
              transition={{ duration:.5, ease:[0.22,1,0.36,1] }}
            >
              <div style={{ fontSize:'2.4rem', color:'#FF4D00', lineHeight:1, marginBottom:'0.75rem', fontFamily:'Georgia,serif', userSelect:'none' }}>"</div>
              <h2 style={{ fontFamily:SANS, fontSize:'clamp(1.5rem,2.6vw,2.6rem)', fontWeight:800, lineHeight:1.18, letterSpacing:'-.03em', margin:'0 0 1.5rem' }}>
                <span style={{ color:'#fff' }}>{t.quoteStrong}</span>
                <span style={{ color:'rgba(255,255,255,0.22)' }}>{t.quoteFade}</span>
              </h2>
              <div style={{ width:'100%', height:'1px', background:'rgba(255,255,255,0.07)', marginBottom:'1.25rem' }}/>
              <RevealCardContainer accent={t.accent} textOnAccent="#fff" mutedOnAccent="rgba(255,255,255,0.65)"
                style={{ width:'100%', background:'#111' }}
                base={<IdentityCardBody fullName={t.name} place={t.place} about={t.about} avatarUrl={t.avatar} avatarText={t.name.charAt(0)} scheme="plain" displayAvatar={false} socials={t.socials} cardCss={{ background:'#111' }}/>}
                overlay={<IdentityCardBody fullName={t.name} place={t.role} about={t.about} avatarUrl={t.avatar} avatarText={t.name.charAt(0)} scheme="accented" displayAvatar={true} socials={t.socials} cardCss={{ backgroundColor:t.accent }}/>}
              />
            </motion.div>
          </AnimatePresence>
          <div style={{ display:'flex', alignItems:'center', gap:'.6rem', marginTop:'1.25rem' }}>
            {testimonials.map((_,i)=>(
              <button key={i} onClick={()=>goTo(i)} style={{ width:i===active?36:8, height:8, borderRadius:999, background:i===active?'#FF4D00':'rgba(255,255,255,0.18)', border:'none', cursor:'pointer', padding:0, transition:'all .35s ease' }}/>
            ))}
            <span style={{ color:'rgba(255,255,255,0.2)', fontSize:'.78rem', marginLeft:'.5rem' }}>
              {String(active+1).padStart(2,'0')} / {String(testimonials.length).padStart(2,'0')}
            </span>
          </div>
        </div>

        {/* RIGHT */}
        <AnimatePresence mode="wait">
          <motion.div key={active+'-img'}
            initial={{ opacity:0, scale:.96, x:dir*30 }} animate={{ opacity:1, scale:1, x:0 }} exit={{ opacity:0, scale:.96, x:dir*-30 }}
            transition={{ duration:.55, ease:[0.22,1,0.36,1] }}
            style={{ borderRadius:'14px', overflow:'hidden', aspectRatio:'4/3', border:`1px solid ${t.accent}30`, position:'relative', width:'100%' }}
          >
            <img src={t.image} alt="Project" style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}/>
            <div style={{ position:'absolute', inset:0, background:`linear-gradient(135deg,${t.accent}20 0%,transparent 60%)` }}/>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

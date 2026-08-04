import React, { useRef, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { GlowCard } from '@/components/ui/spotlight-card';
import manjeetImg    from '@/assets/team/Dr. Manjeet singh.jpg';
import rohhanImg     from '@/assets/team/Rohhan gupta.jpg';
import anilImg       from '@/assets/team/Anil Sharma.jpg';
import kumudImg      from '@/assets/team/Dr. Kumud Sachdeva.jpg';
import siddharthImg  from '@/assets/team/Siddharth ROut.jpg';

const MONO = "'JetBrains Mono','Fira Code',monospace";
const SANS = "'Inter','Helvetica Neue',Arial,sans-serif";

/* ─── All Feedback Data ─── */
const allFeedback = [
  {
    name: 'Dr. Manjeet Singh Ph.D.',
    role: 'Academician · ABET, NBA, NAAC, IEEE, IQAC, GATE',
    company: 'Teacher',
    avatar: manjeetImg,
    quote: "Ayush stands out as a highly driven and innovation-oriented individual. He has contributed to 25+ patent filings, multiple research papers, journals, and book chapters. His work showcases not only creativity but also discipline and consistency in research and innovation.",
    glowColor: 'orange', accent: '#FF4D2D', tag: 'RESEARCH', stars: 5,
  },
  {
    name: 'Dr. Rohhan Gupta',
    role: 'Associate Professor',
    company: 'Chandigarh University',
    avatar: rohhanImg,
    quote: "Ayush was one of the most innovation-driven students in my Emerging and Disruptive Technologies course. He contributed to 15+ patent filings and multiple peer-reviewed research papers. He has the mindset of a young researcher with strong innovation potential.",
    glowColor: 'blue', accent: '#3b82f6', tag: 'MENTOR', stars: 5,
  },
  {
    name: 'Anil Sharma',
    role: 'Assistant Professor',
    company: 'Chandigarh University',
    avatar: anilImg,
    quote: "Ayush was one of the most proactive students in my course. He contributed significantly to multiple patent filings and research papers. His leadership, initiative, and ability to translate ideas into structured execution reflect both technical maturity and organizational strength.",
    glowColor: 'green', accent: '#22c55e', tag: 'ACADEMICS', stars: 5,
  },
  {
    name: 'Dr. Kumud Sachdeva',
    role: 'Associate Professor · 25+ Publications',
    company: 'Chandigarh University',
    avatar: kumudImg,
    quote: "Ayush actively assisted me in research-related work — book chapters, research papers, review articles, patents, and technical projects. His dedication to learning, research collaboration, and innovation makes him a promising young technologist and researcher.",
    glowColor: 'purple', accent: '#a855f7', tag: 'RESEARCH', stars: 5,
  },
  {
    name: 'Dr. Anjana Sharma',
    role: 'Mentor',
    company: 'Engineering Physics',
    avatar: null,
    quote: "Ayush demonstrated strong conceptual understanding and analytical thinking in my Engineering Physics course. He contributed to multiple patent filings, research papers, and book chapters. His structured thinking and innovation-oriented mindset distinguish him as a promising young technologist.",
    glowColor: 'red', accent: '#ef4444', tag: 'PHYSICS', stars: 5,
  },
  {
    name: 'Siddharth Rout',
    role: 'Microsoft Excel MVP · Power BI Expert',
    company: '9 POINT Design',
    avatar: siddharthImg,
    quote: "Ayush was one of the standout trainees in my Power BI and Data Analytics course. He quickly grasped complex data analytics concepts and showcased excellent skills in Power BI. His ability to create insightful and visually appealing dashboards is commendable.",
    glowColor: 'blue', accent: '#3b82f6', tag: 'DATA & BI', stars: 5,
  },
];

const row1 = allFeedback.slice(0, 3);
const row2 = allFeedback.slice(3, 6);

/* ══════════════════════════════════════════
   BG 1 — Live Particle Canvas
   ══════════════════════════════════════════ */
function ParticleCanvas() {
  const ref = useRef(null);
  const raf = useRef(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, pts = [];
    const colors = ['#FF4D2D','#a855f7','#3b82f6','#22c55e','#ef4444','#ffffff'];
    const resize = () => { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);
    for (let i = 0; i < 80; i++) pts.push({
      x:Math.random()*W, y:Math.random()*H,
      vx:(Math.random()-.5)*.35, vy:(Math.random()-.5)*.35,
      r:Math.random()*1.6+.3,
      color:colors[Math.floor(Math.random()*colors.length)],
      a:Math.random()*.45+.08,
    });
    const draw = () => {
      ctx.clearRect(0,0,W,H);
      for (let i=0;i<pts.length;i++) for (let j=i+1;j<pts.length;j++) {
        const dx=pts[i].x-pts[j].x, dy=pts[i].y-pts[j].y, d=Math.hypot(dx,dy);
        if (d<110) { ctx.beginPath(); ctx.moveTo(pts[i].x,pts[i].y); ctx.lineTo(pts[j].x,pts[j].y); ctx.strokeStyle=`rgba(255,255,255,${.035*(1-d/110)})`; ctx.lineWidth=.4; ctx.stroke(); }
      }
      pts.forEach(p => {
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle=p.color+Math.round(p.a*255).toString(16).padStart(2,'0'); ctx.fill();
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<0)p.x=W; if(p.x>W)p.x=0; if(p.y<0)p.y=H; if(p.y>H)p.y=0;
      });
      raf.current=requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf.current); window.removeEventListener('resize',resize); };
  }, []);
  return <canvas ref={ref} style={{ position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none',zIndex:1 }}/>;
}

/* ══════════════════════════════════════════
   BG 2 — Crazy Multi-layer Grid + diagonals
   ══════════════════════════════════════════ */
function CrazyGrid() {
  return (
    <div style={{ position:'absolute',inset:0,zIndex:0,pointerEvents:'none',overflow:'hidden' }}>
      <svg style={{ position:'absolute',inset:0,width:'100%',height:'100%' }}>
        <defs>
          <pattern id="tMicro" width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M28 0L0 0 0 28" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth=".4"/>
          </pattern>
          <pattern id="tMid" width="112" height="112" patternUnits="userSpaceOnUse">
            <rect width="112" height="112" fill="url(#tMicro)"/>
            <path d="M112 0L0 0 0 112" fill="none" stroke="rgba(255,255,255,0.075)" strokeWidth=".7"/>
          </pattern>
          <pattern id="tMacro" width="448" height="448" patternUnits="userSpaceOnUse">
            <rect width="448" height="448" fill="url(#tMid)"/>
            <path d="M448 0L0 0 0 448" fill="none" stroke="rgba(255,255,255,0.11)" strokeWidth="1"/>
          </pattern>
          <radialGradient id="tRadFade" cx="50%" cy="50%" r="65%">
            <stop offset="0%" stopColor="white" stopOpacity="1"/>
            <stop offset="100%" stopColor="white" stopOpacity="0"/>
          </radialGradient>
          <mask id="tMaskFade">
            <rect width="100%" height="100%" fill="url(#tRadFade)"/>
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="url(#tMacro)" mask="url(#tMaskFade)"/>
        {/* full-width diagonals */}
        <line x1="0" y1="0"    x2="100%" y2="100%" stroke="rgba(255,77,45,0.055)"  strokeWidth="1"/>
        <line x1="100%" y1="0" x2="0"    y2="100%" stroke="rgba(168,85,247,0.055)" strokeWidth="1"/>
        <line x1="0" y1="50%"  x2="100%" y2="0"    stroke="rgba(59,130,246,0.04)"  strokeWidth=".8"/>
        <line x1="0" y1="50%"  x2="100%" y2="100%" stroke="rgba(34,197,94,0.04)"   strokeWidth=".8"/>
        {/* concentric rings centered on heading */}
        {[180,340,500,660,820].map((r,i)=>(
          <circle key={i} cx="50%" cy="32%" r={r} fill="none"
            stroke={['#FF4D2D','#a855f7','#3b82f6','#22c55e','#ef4444'][i]}
            strokeWidth=".6" strokeDasharray={i%2===0?'5 7':'none'} opacity=".06"/>
        ))}
      </svg>
    </div>
  );
}

/* ══════════════════════════════════════════
   BG 3 — Floating Color Orbs
   ══════════════════════════════════════════ */
function FloatingOrbs() {
  return (
    <div style={{ position:'absolute',inset:0,zIndex:1,pointerEvents:'none' }}>
      {[
        { top:'0%',   left:'0%',   w:600, h:600, color:'rgba(255,77,45,0.09)',   blur:100, anim:'orbFloat1 9s ease-in-out infinite' },
        { top:'30%',  left:'40%',  w:500, h:500, color:'rgba(168,85,247,0.08)',  blur:90,  anim:'orbFloat2 12s ease-in-out infinite' },
        { top:'55%',  left:'70%',  w:450, h:450, color:'rgba(59,130,246,0.07)',  blur:80,  anim:'orbFloat3 8s ease-in-out infinite' },
        { top:'10%',  left:'70%',  w:380, h:380, color:'rgba(34,197,94,0.07)',   blur:70,  anim:'orbFloat1 11s ease-in-out infinite reverse' },
        { top:'70%',  left:'15%',  w:320, h:320, color:'rgba(239,68,68,0.07)',   blur:70,  anim:'orbFloat2 7s ease-in-out infinite reverse' },
      ].map((o,i)=>(
        <div key={i} style={{
          position:'absolute', top:o.top, left:o.left,
          width:o.w, height:o.h, borderRadius:'50%',
          background:`radial-gradient(circle,${o.color} 0%,transparent 70%)`,
          filter:`blur(${o.blur}px)`,
          animation:o.anim,
        }}/>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════
   BG 4 — Animated horizontal laser beams
   ══════════════════════════════════════════ */
function LaserBeams() {
  return (
    <div style={{ position:'absolute',inset:0,zIndex:2,pointerEvents:'none',overflow:'hidden' }}>
      {[
        { top:'18%', color:'#FF4D2D', dur:'6s',  delay:'0s',  opacity:.3 },
        { top:'45%', color:'#a855f7', dur:'9s',  delay:'1.5s',opacity:.25},
        { top:'72%', color:'#22c55e', dur:'7s',  delay:'3s',  opacity:.25},
        { top:'88%', color:'#3b82f6', dur:'11s', delay:'0.5s',opacity:.2 },
      ].map((b,i)=>(
        <div key={i} style={{
          position:'absolute', top:b.top, left:0, width:'100%', height:'1px',
          background:`linear-gradient(to right,transparent,${b.color},transparent)`,
          opacity:b.opacity,
          animation:`laserSweep ${b.dur} linear infinite`,
          animationDelay:b.delay,
          boxShadow:`0 0 10px 2px ${b.color}44`,
        }}/>
      ))}
      {/* vertical sweep */}
      <div style={{
        position:'absolute', top:0, bottom:0, width:'2px',
        background:'linear-gradient(to bottom,transparent,#FF4D2D 40%,#a855f7 60%,transparent)',
        opacity:.4, animation:'vertSweep 8s linear infinite',
        boxShadow:'0 0 20px 5px rgba(255,77,45,0.2)',
      }}/>
    </div>
  );
}

/* ══════════════════════════════════════════
   BG 5 — Ghost text watermark
   ══════════════════════════════════════════ */
function GhostText() {
  return (
    <div style={{ position:'absolute',inset:0,zIndex:1,pointerEvents:'none',overflow:'hidden' }}>
      <div style={{
        position:'absolute', top:'-6%', left:'-2%',
        fontFamily:SANS, fontSize:'clamp(12rem,18vw,22rem)',
        fontWeight:900, color:'transparent',
        WebkitTextStroke:'1px rgba(255,77,45,0.055)',
        letterSpacing:'-0.06em', lineHeight:1,
        userSelect:'none', whiteSpace:'nowrap',
        animation:'ghostDrift1 14s ease-in-out infinite',
      }}>WORDS</div>
      <div style={{
        position:'absolute', bottom:'-8%', right:'-3%',
        fontFamily:SANS, fontSize:'clamp(10rem,15vw,19rem)',
        fontWeight:900, color:'transparent',
        WebkitTextStroke:'1px rgba(168,85,247,0.05)',
        letterSpacing:'-0.06em', lineHeight:1,
        userSelect:'none', whiteSpace:'nowrap',
        animation:'ghostDrift2 16s ease-in-out infinite',
      }}>TRUST</div>
    </div>
  );
}

/* ══════════════════════════════════════════
   BG 6 — Pulsing crosshairs
   ══════════════════════════════════════════ */
function Crosshair({ x, y, color, size=22, delay='0s' }) {
  return (
    <div style={{
      position:'absolute', left:x, top:y, zIndex:2,
      transform:'translate(-50%,-50%)', pointerEvents:'none',
      animation:`crossPulse 2.5s ease-in-out infinite`, animationDelay:delay,
    }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <line x1={size/2} y1={0}        x2={size/2}   y2={size/2-4} stroke={color} strokeWidth="1"/>
        <line x1={size/2} y1={size/2+4} x2={size/2}   y2={size}     stroke={color} strokeWidth="1"/>
        <line x1={0}      y1={size/2}   x2={size/2-4} y2={size/2}   stroke={color} strokeWidth="1"/>
        <line x1={size/2+4} y1={size/2} x2={size}     y2={size/2}   stroke={color} strokeWidth="1"/>
        <circle cx={size/2} cy={size/2} r={2.5} fill="none" stroke={color} strokeWidth="1"/>
      </svg>
    </div>
  );
}

/* ══════════════════════════════════════════
   BG 7 — Noise overlay
   ══════════════════════════════════════════ */
function NoiseOverlay() {
  return (
    <div style={{
      position:'absolute', inset:'-20px', zIndex:5, pointerEvents:'none',
      backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      backgroundSize:'180px 180px',
      opacity:.025,
      animation:'noiseShift .15s steps(1) infinite',
      mixBlendMode:'overlay',
    }}/>
  );
}

/* ─── Stars ─── */
function Stars({ count=5, color='#FF4D2D', size=15 }) {
  return (
    <div style={{ display:'flex', gap:4 }}>
      {Array.from({length:count}).map((_,i)=>(
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={color}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  );
}

/* ─── Single Feedback Card ─── */
function FeedbackCard({ t, index, inView }) {
  return (
    <motion.div
      initial={{ opacity:0, y:40 }}
      animate={inView ? { opacity:1, y:0 } : {}}
      transition={{ duration:.6, delay:.1+index*.08 }}
      style={{ minWidth:340, maxWidth:370, flexShrink:0 }}
    >
      <GlowCard glowColor={t.glowColor} customSize className="w-full"
        style={{ borderRadius:20, display:'flex', flexDirection:'column', padding:'22px 22px 20px' }}>
        <div style={{ display:'flex', flexDirection:'column', height:'100%' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12 }}>
            <Stars color={t.accent} count={t.stars} size={13}/>
            <span style={{ padding:'4px 12px', border:`1px solid ${t.accent}45`, borderRadius:999, color:t.accent, fontSize:'.58rem', letterSpacing:'.14em', fontWeight:700, background:`${t.accent}12`, whiteSpace:'nowrap' }}>
              {t.tag}
            </span>
          </div>
          <div style={{ width:28, height:2, borderRadius:999, background:t.accent, opacity:.55, marginBottom:14 }}/>
          <p style={{ color:'rgba(255,255,255,0.78)', fontSize:'.88rem', lineHeight:1.6, fontStyle:'italic', fontFamily:"'Georgia',serif", flexGrow:1, margin:'0 0 18px' }}>
            "{t.quote}"
          </p>
          <div style={{ display:'flex', alignItems:'center', gap:12, paddingTop:14, borderTop:'1px solid rgba(255,255,255,0.07)' }}>
            <div style={{ position:'relative', flexShrink:0 }}>
              {t.avatar ? (
                <img src={t.avatar} alt={t.name} style={{ width:38, height:38, borderRadius:'50%', objectFit:'cover', border:`2px solid ${t.accent}50`, display:'block' }}/>
              ) : (
                <div style={{ width:38, height:38, borderRadius:'50%', background:`${t.accent}22`, border:`2px solid ${t.accent}50`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'.95rem', fontWeight:700, color:t.accent }}>
                  {t.name.split(' ').map(w=>w[0]).slice(0,2).join('')}
                </div>
              )}
              <div style={{ position:'absolute', bottom:1, right:1, width:10, height:10, borderRadius:'50%', background:t.accent, border:'2px solid #0a0a0a' }}/>
            </div>
            <div>
              <p style={{ color:'#fff', fontWeight:700, fontSize:'.85rem', margin:0, letterSpacing:'-.01em' }}>{t.name}</p>
              <p style={{ color:'rgba(255,255,255,0.35)', fontSize:'.72rem', margin:'3px 0 0' }}>{t.role} · {t.company}</p>
            </div>
          </div>
        </div>
      </GlowCard>
    </motion.div>
  );
}

/* ─── Marquee Row ─── */
function MarqueeRow({ items, direction='left', speed=40, inView }) {
  // Repeat 4x so there's always enough content to fill screen with no gap
  const repeated = [...items, ...items, ...items, ...items];
  const dur = items.length * speed;
  const anim = direction==='left'
    ? `marquee-left ${dur}s linear infinite`
    : `marquee-right ${dur}s linear infinite`;
  return (
    <div style={{ overflow:'hidden', position:'relative', width:'100%' }}>
      <div style={{ position:'absolute',inset:0,zIndex:2,pointerEvents:'none', background:'linear-gradient(90deg,#050505 0%,transparent 8%,transparent 92%,#050505 100%)' }}/>
      <div
        style={{ display:'flex', gap:18, width:'max-content', animation:anim }}
        onMouseEnter={e=>e.currentTarget.style.animationPlayState='paused'}
        onMouseLeave={e=>e.currentTarget.style.animationPlayState='running'}
      >
        {repeated.map((t,i)=><FeedbackCard key={`${t.name}-${i}`} t={t} index={i} inView={inView}/>)}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════ */
export default function Testimonial() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once:true, margin:'-80px' });

  return (
    <section ref={ref} style={{
      background:'#050505', padding:'72px 0 80px',
      fontFamily:SANS, position:'relative', overflow:'hidden',
    }}>
      <style>{`
        @keyframes marquee-left  { 0%{transform:translateX(0)}    100%{transform:translateX(-25%)} }
        @keyframes marquee-right { 0%{transform:translateX(-25%)} 100%{transform:translateX(0)}    }
        @keyframes pulse-dot     { 0%,100%{opacity:1} 50%{opacity:.4} }
        @keyframes laserSweep    { 0%{transform:translateX(-120%)} 100%{transform:translateX(120vw)} }
        @keyframes vertSweep     { 0%{left:-2%} 100%{left:102%} }
        @keyframes orbFloat1     { 0%,100%{transform:translateY(0px) scale(1)} 50%{transform:translateY(-30px) scale(1.05)} }
        @keyframes orbFloat2     { 0%,100%{transform:translateY(0px) scale(1)} 50%{transform:translateY(25px) scale(0.97)} }
        @keyframes orbFloat3     { 0%,100%{transform:translateY(0px) scale(1)} 50%{transform:translateY(-18px) scale(1.03)} }
        @keyframes ghostDrift1   { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-18px)} }
        @keyframes ghostDrift2   { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(14px)} }
        @keyframes crossPulse    { 0%,100%{opacity:.3;transform:translate(-50%,-50%) scale(1)} 50%{opacity:.8;transform:translate(-50%,-50%) scale(1.3)} }
        @keyframes noiseShift    { 0%{transform:translate(0,0)} 20%{transform:translate(-2px,1px)} 40%{transform:translate(1px,-2px)} 60%{transform:translate(-1px,2px)} 80%{transform:translate(2px,-1px)} 100%{transform:translate(0,0)} }
        @keyframes cornerPulse   { 0%,100%{opacity:.3} 50%{opacity:.7} }
      `}</style>

      {/* ══ BACKGROUND LAYERS ══ */}
      <CrazyGrid/>
      <GhostText/>
      <FloatingOrbs/>
      <ParticleCanvas/>
      <LaserBeams/>
      <NoiseOverlay/>

      {/* Crosshairs */}
      <Crosshair x="8%"  y="15%" color="#FF4D2D" size={26} delay="0s"/>
      <Crosshair x="90%" y="20%" color="#a855f7"  size={20} delay=".7s"/>
      <Crosshair x="55%" y="8%"  color="#3b82f6"  size={16} delay="1.4s"/>
      <Crosshair x="75%" y="85%" color="#22c55e"  size={22} delay=".3s"/>
      <Crosshair x="18%" y="90%" color="#ef4444"  size={14} delay="2s"/>
      <Crosshair x="42%" y="50%" color="#FF4D2D"  size={12} delay="1s"/>

      {/* Corner marks */}
      {[
        { style:{top:20,left:20},              color:'rgba(255,77,45,0.5)',  rot:'none' },
        { style:{top:20,right:20},             color:'rgba(168,85,247,0.5)', rot:'scaleX(-1)' },
        { style:{bottom:20,left:20},           color:'rgba(59,130,246,0.5)', rot:'scaleY(-1)' },
        { style:{bottom:20,right:20},          color:'rgba(34,197,94,0.5)',  rot:'scale(-1)' },
      ].map((c,i)=>(
        <div key={i} style={{ position:'absolute',...c.style, width:20, height:20, transform:c.rot!=='none'?c.rot:undefined, zIndex:3, animation:`cornerPulse 3s ease-in-out infinite`, animationDelay:`${i*.6}s` }}>
          <div style={{ position:'absolute',top:0,left:0,width:'100%',height:2,background:c.color }}/>
          <div style={{ position:'absolute',top:0,left:0,width:2,height:'100%',background:c.color }}/>
        </div>
      ))}

      {/* HUD labels */}
      <div style={{ position:'absolute',bottom:24,left:28,zIndex:6,fontFamily:MONO,fontSize:'.6rem',color:'rgba(255,255,255,0.18)',letterSpacing:'.14em' }}>
        TESTIMONIALS.SYS / {allFeedback.length} RECORDS / LIVE
      </div>
      <div style={{ position:'absolute',top:24,right:32,zIndex:6,fontFamily:MONO,fontSize:'.6rem',color:'rgba(255,255,255,0.18)',letterSpacing:'.14em' }}>
        02 / SOCIAL PROOF
      </div>

      {/* ══ HEADER ══ */}
      <div style={{ maxWidth:1160, margin:'0 auto', padding:'0 40px', position:'relative', zIndex:6, marginBottom:40 }}>
        <motion.div initial={{ opacity:0, y:32 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:.75 }}>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:12 }}>
            <div style={{ width:28, height:1, background:'#FF4D2D', opacity:.7 }}/>
            <span style={{ color:'rgba(255,255,255,0.35)', fontSize:'.68rem', letterSpacing:'.22em', textTransform:'uppercase', fontWeight:500 }}>
              Testimonials
            </span>
          </div>
          <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', flexWrap:'wrap', gap:20 }}>
            <h2 style={{ color:'#fff', fontSize:'clamp(1.8rem,4.2vw,3rem)', fontWeight:800, letterSpacing:'-.035em', lineHeight:1.08, margin:0 }}>
              Words from<br/>
              <span style={{ background:'linear-gradient(90deg,rgba(255,255,255,0.22) 0%,rgba(255,255,255,0.08) 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
                those we've worked with
              </span>
            </h2>
            <div style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 22px', border:'1px solid rgba(255,255,255,0.08)', borderRadius:999, background:'rgba(255,255,255,0.03)', flexShrink:0 }}>
              <div style={{ width:8, height:8, borderRadius:'50%', background:'#22c55e', boxShadow:'0 0 8px #22c55e', animation:'pulse-dot 2s ease-in-out infinite' }}/>
              <span style={{ color:'rgba(255,255,255,0.5)', fontSize:'.78rem', fontWeight:500 }}>
                {allFeedback.length} recommendations
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ══ MARQUEE ROWS ══ */}
      <div style={{ display:'flex', flexDirection:'column', gap:18, position:'relative', zIndex:6 }}>
        <MarqueeRow items={row1} direction="left"  speed={18} inView={inView}/>
        <MarqueeRow items={row2} direction="right" speed={20} inView={inView}/>
      </div>

      {/* Bottom hint */}
      <motion.div
        initial={{ opacity:0 }}
        animate={inView?{opacity:1}:{}}
        transition={{ duration:.6, delay:.8 }}
        style={{ textAlign:'center', marginTop:28, color:'rgba(255,255,255,0.18)', fontSize:'.72rem', letterSpacing:'.15em', textTransform:'uppercase', fontWeight:500, position:'relative', zIndex:6 }}
      >
        hover to pause · scroll to explore
      </motion.div>
    </section>
  );
}

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import StepCard from "./StepCard";

const SANS = "'Inter', system-ui, -apple-system, sans-serif";
const MONO = "'JetBrains Mono','Fira Code',monospace";

const steps = [
  { number:"1", title:"Find the\nGap",        description:"We scan the universe for what's missing — problems unsolved, ideas unexplored, and spaces no one has dared to fill yet.",                                               accent:"#FF4D00", icon:"⊕" },
  { number:"2", title:"Fill the\nVoid",        description:"Once the gap is found, we move. We build original solutions — games, apps, and research — crafted from scratch, never copied.",                                     accent:"#7B61FF", icon:"◈" },
  { number:"3", title:"Research\n& Validate",  description:"Every idea is backed by deep research. We test, question, and refine until what we create is not just new — but meaningful and proven.",                             accent:"#00D4FF", icon:"◎" },
  { number:"4", title:"Ship &\nRepeat",        description:"We launch with purpose and keep pushing forward — always onto the next gap, the next frontier, the next thing the world doesn't have yet.",                          accent:"#00FF94", icon:"⟳" },
];

/* ── Smooth Grid Background ── */
function SmoothGrid() {
  return (
    <div style={{ position:"absolute", inset:0, zIndex:0, pointerEvents:"none" }}>
      {/* Grid lines */}
      <div style={{
        position:"absolute", inset:0,
        backgroundImage:"linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
        backgroundSize:"60px 60px",
      }}/>
      {/* Vignette */}
      <div style={{
        position:"absolute", inset:0,
        background:"radial-gradient(ellipse 90% 90% at 50% 50%, transparent 25%, #050505 100%)",
      }}/>
      {/* Glowing dots */}
      <div style={{
        position:"absolute", inset:0,
        backgroundImage:"radial-gradient(circle, rgba(255,255,255,0.14) 1px, transparent 1px)",
        backgroundSize:"60px 60px",
        maskImage:"radial-gradient(ellipse 60% 60% at 40% 50%, black 0%, transparent 100%)",
      }}/>
    </div>
  );
}

/* ══════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════ */
export default function ProcessSection() {
  const containerRef  = useRef(null);
  const headingRef    = useRef(null);
  const headingInView = useInView(headingRef, { once:true, margin:"0px 0px -100px 0px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start","end end"],
  });

  const cardsX   = useTransform(scrollYProgress, [0,1], ["18%","-28%"]);
  const headingY = useTransform(scrollYProgress, [0,0.15], ["0%","-8%"]);
  const bgScale  = useTransform(scrollYProgress, [0,1], [1, 1.06]);

  return (
    <div ref={containerRef} style={{ height:"250vh", position:"relative", background:"#050505" }}>
      <div style={{
        position:"sticky", top:0, height:"100vh", overflow:"hidden",
        display:"flex", flexDirection:"row", alignItems:"stretch",
        background:"#050505",
      }}>

        {/* ── Smooth background ── */}
        <motion.div style={{
          position:"absolute", inset:0,
          scale:bgScale, transformOrigin:"center", zIndex:0,
          background:"#050505",
        }}/>
        <SmoothGrid/>

        {/* Soft orange glow — left */}
        <motion.div
          animate={{ opacity:[0.4,0.75,0.4], scale:[1,1.1,1] }}
          transition={{ duration:10, repeat:Infinity, ease:"easeInOut" }}
          style={{ position:"absolute", top:"10%", left:"-5%",
            width:550, height:550, borderRadius:"50%",
            background:"radial-gradient(circle, rgba(255,77,0,0.15) 0%, transparent 65%)",
            filter:"blur(80px)", pointerEvents:"none", zIndex:1,
          }}
        />
        {/* Soft purple glow — right */}
        <motion.div
          animate={{ opacity:[0.3,0.6,0.3] }}
          transition={{ duration:14, repeat:Infinity, ease:"easeInOut", delay:5 }}
          style={{ position:"absolute", bottom:"5%", right:"-5%",
            width:500, height:500, borderRadius:"50%",
            background:"radial-gradient(circle, rgba(90,60,255,0.12) 0%, transparent 65%)",
            filter:"blur(80px)", pointerEvents:"none", zIndex:1,
          }}
        />

        {/* ─── LEFT — Heading ─── */}
        <div ref={headingRef} style={{
          width:"38%", flexShrink:0, display:"flex", flexDirection:"column",
          justifyContent:"center", padding:"80px 48px 80px 32px",
          position:"relative", zIndex:6,
        }}>
          <motion.div style={{ y:headingY }}>

            <motion.div
              initial={{ opacity:0, x:-20 }}
              animate={headingInView ? { opacity:1, x:0 } : {}}
              transition={{ duration:0.6, ease:[0.22,1,0.36,1] }}
              style={{
                display:"inline-flex", alignItems:"center", gap:8,
                marginBottom:24, padding:"6px 14px",
                border:"1px solid rgba(255,77,0,0.45)", borderRadius:2,
              }}
            >
              <motion.span
                animate={{ opacity:[1,0.3,1] }}
                transition={{ duration:1.2, repeat:Infinity }}
                style={{ width:6, height:6, borderRadius:"50%", background:"#FF4D00", display:"block" }}
              />
              <span style={{ fontFamily:MONO, fontSize:"0.7rem", letterSpacing:"0.2em", color:"rgba(255,255,255,0.5)", textTransform:"uppercase" }}>
                PROCESS
              </span>
            </motion.div>

            {["HOW","WE"].map((word, i) => (
              <div key={word} style={{ overflow:"hidden" }}>
                <motion.div
                  initial={{ y:"100%" }}
                  animate={headingInView ? { y:"0%" } : { y:"100%" }}
                  transition={{ duration:1.1, delay:i*0.06, ease:[0.22,1,0.36,1] }}
                  style={{
                    fontFamily:SANS, fontSize:"clamp(4rem,8vw,9.5rem)",
                    fontWeight:900, color:"#fff",
                    lineHeight:0.88, letterSpacing:"-0.04em", textTransform:"uppercase",
                  }}
                >{word}</motion.div>
              </div>
            ))}
            <div style={{ overflow:"hidden" }}>
              <motion.div
                initial={{ y:"100%" }}
                animate={headingInView ? { y:"0%" } : { y:"100%" }}
                transition={{ duration:1.1, delay:0.12, ease:[0.22,1,0.36,1] }}
                style={{
                  fontFamily:SANS, fontSize:"clamp(4rem,8vw,9.5rem)",
                  fontWeight:900, lineHeight:0.88, letterSpacing:"-0.04em",
                  textTransform:"uppercase",
                  WebkitTextStroke:"2px rgba(255,255,255,0.55)",
                  color:"transparent",
                }}
              >WORK</motion.div>
            </div>

            <motion.div
              initial={{ opacity:0 }}
              animate={headingInView ? { opacity:1 } : {}}
              transition={{ delay:0.8, duration:0.6 }}
              style={{ display:"flex", gap:10, marginTop:32, alignItems:"center" }}
            >
              {steps.map((s, i) => (
                <div key={i} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
                  <motion.div
                    animate={{ boxShadow:i===0 ? [`0 0 0px ${s.accent}`,`0 0 10px ${s.accent}`,`0 0 0px ${s.accent}`] : "none" }}
                    transition={{ duration:2, repeat:Infinity }}
                    style={{
                      width:i===0?28:8, height:8, borderRadius:4,
                      background:i===0 ? s.accent : "rgba(255,255,255,0.15)",
                    }}
                  />
                  <span style={{ fontFamily:MONO, fontSize:"0.55rem", color:"rgba(255,255,255,0.3)" }}>0{s.number}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* ─── RIGHT — Cards ─── */}
        <div style={{ flex:1, overflow:"hidden", display:"flex", alignItems:"center", position:"relative", zIndex:6 }}>
          <motion.div style={{
            x:cardsX, display:"flex", flexDirection:"row", gap:"0px",
            alignItems:"stretch", position:"absolute",
            left:0, top:"50%", translateY:"-50%", willChange:"transform",
          }}>
            {steps.map((step, i) => (
              <StepCard key={i} {...step} index={i} total={steps.length} scrollProgress={scrollYProgress}/>
            ))}
          </motion.div>
        </div>

      </div>
    </div>
  );
}

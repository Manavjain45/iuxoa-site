import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const SANS = "'Inter', 'Helvetica Neue', Arial, sans-serif";

const SERVICES = [
  { number:"01", title:"Web Design & Development", description:"Pixel-perfect, performance-first websites built with modern frameworks. From concept to launch, we craft digital experiences that convert visitors into customers.", tags:["Responsive Design","Interaction Design","CMS Integration","SEO Optimization"], image:"https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80", accent:"#FF4D00" },
  { number:"02", title:"Games",                    description:"Immersive, high-performance games built from the ground up — from concept and mechanics to full launch across mobile, web, and desktop platforms.",                tags:["Unity","Unreal Engine","WebGL","Mobile Gaming"],                         image:"https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800&q=80", accent:"#FF4D00" },
  { number:"03", title:"Apps",                     description:"Native and cross-platform applications with seamless UX — built for speed, scale, and real-world usability that users keep coming back to.",                        tags:["React Native","Flutter","iOS / Android","Web Apps"],                      image:"https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80", accent:"#FF4D00" },
  { number:"04", title:"Research Paper",           description:"Rigorous, publication-ready research papers backed by data analysis, domain expertise, and academic precision — driving insights that matter.",                     tags:["Data Analysis","Machine Learning","Academic Writing","Publication"],      image:"https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80", accent:"#FF4D00" },
];

/* ── Cursor preview ── */
function CursorPreview({ image, visible, mousePos }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity:0, scale:.82, rotate:-4 }} animate={{ opacity:1, scale:1, rotate:-2 }} exit={{ opacity:0, scale:.82, rotate:-4 }}
          transition={{ duration:.28, ease:[0.22,1,0.36,1] }}
          style={{ position:"fixed", left:mousePos.x+28, top:mousePos.y-90, width:260, height:175, borderRadius:16, overflow:"hidden", pointerEvents:"none", zIndex:999, boxShadow:"0 24px 64px rgba(0,0,0,0.7),0 0 0 1px rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.1)" }}
        >
          <img src={image} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg,rgba(255,77,0,0.18) 0%,transparent 60%)" }}/>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Service row ── */
function ServiceRow({ number, title, description, tags, image, accent, isHovered, onHover, onLeave, index, mousePos }) {
  const rowRef = useRef(null);
  const inView = useInView(rowRef, { once:true, margin:"0px 0px -80px 0px" });
  const delay  = index * 0.12;

  return (
    <div ref={rowRef} style={{ position:"relative" }}>
      <div style={{ position:"relative", height:"1px", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, background:"rgba(255,255,255,0.07)" }}/>
        <motion.div
          initial={{ scaleX:0 }} animate={inView?{scaleX:1}:{scaleX:0}}
          transition={{ duration:1.5, delay, ease:[0.22,1,0.36,1] }}
          style={{ position:"absolute", inset:0, background:isHovered?"linear-gradient(90deg,#FF4D00,rgba(255,77,0,0.3))":"rgba(255,255,255,0.15)", transformOrigin:"left center", transition:"background .4s ease" }}
        />
      </div>

      <motion.div
        onMouseEnter={onHover} onMouseLeave={onLeave}
        animate={{ backgroundColor:isHovered?"rgba(255,77,0,0.04)":"rgba(0,0,0,0)" }}
        transition={{ duration:.3 }}
        style={{ cursor:"none", fontFamily:SANS, position:"relative", overflow:"hidden" }}
      >
        <AnimatePresence>
          {isHovered && (
            <motion.div initial={{ opacity:0, x:-40 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-40 }} transition={{ duration:.35 }}
              style={{ position:"absolute", left:0, top:0, bottom:0, width:3, background:"linear-gradient(to bottom,#FF4D00,transparent)", borderRadius:999 }}
            />
          )}
        </AnimatePresence>

        <div style={{ padding:"0 80px" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"36px 0" }}>
            <motion.div initial={{ opacity:0, x:-30 }} animate={inView?{opacity:1,x:0}:{}} transition={{ duration:1, delay:delay+.3, ease:[0.22,1,0.36,1] }} style={{ minWidth:80, flexShrink:0 }}>
              <motion.span animate={{ scale:isHovered?1.3:1 }} transition={{ duration:.3, ease:[0.22,1,0.36,1] }}
                style={{ fontWeight:300, fontSize:"clamp(1.8rem,3vw,3.5rem)", letterSpacing:".05em", display:"inline-block", color:"#FF4D00", textShadow:isHovered?"0 0 30px rgba(255,77,0,0.7)":"none", transition:"text-shadow .3s ease" }}
              >{number}.</motion.span>
            </motion.div>

            <div style={{ flex:1, display:"flex", justifyContent:"center", padding:"0 40px" }}>
              <AnimatePresence>
                {isHovered && (
                  <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:10 }} transition={{ duration:.3 }}
                    style={{ display:"flex", flexWrap:"wrap", gap:8, justifyContent:"center" }}
                  >
                    {tags.map((tag, i)=>(
                      <motion.span key={tag} initial={{ opacity:0, scale:.85 }} animate={{ opacity:1, scale:1 }} transition={{ delay:i*.06, duration:.25 }}
                        style={{ padding:"6px 16px", fontSize:".72rem", letterSpacing:".1em", textTransform:"uppercase", color:"rgba(255,255,255,0.55)", border:"1px solid rgba(255,77,0,0.3)", borderRadius:999, background:"rgba(255,77,0,0.08)", fontWeight:500 }}
                      >{tag}</motion.span>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.h3 initial={{ opacity:0, x:30 }} animate={inView?{opacity:1,x:0}:{}} transition={{ duration:1, delay:delay+.4, ease:[0.22,1,0.36,1] }}
              style={{ color:isHovered?"#fff":"rgba(255,255,255,0.82)", fontWeight:700, fontSize:"clamp(2.2rem,4.2vw,5rem)", letterSpacing:"-.025em", margin:0, textAlign:"right", flexShrink:0, maxWidth:"60%", transition:"color .3s ease,text-shadow .3s ease", textShadow:isHovered?"0 0 60px rgba(255,77,0,0.25)":"none", lineHeight:1.05 }}
            >{title}</motion.h3>
          </div>

          <AnimatePresence>
            {isHovered && (
              <motion.div initial={{ height:0, opacity:0 }} animate={{ height:"auto", opacity:1 }} exit={{ height:0, opacity:0 }} transition={{ duration:.4, ease:[0.22,1,0.36,1] }} style={{ overflow:"hidden" }}>
                <div style={{ paddingBottom:40, paddingLeft:80 }}>
                  <motion.p initial={{ y:16, opacity:0 }} animate={{ y:0, opacity:1 }} transition={{ delay:.1, duration:.4 }}
                    style={{ color:"rgba(255,255,255,0.4)", fontSize:"clamp(1rem,1.4vw,1.25rem)", lineHeight:1.7, margin:0, maxWidth:520 }}
                  >{description}</motion.p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
      <CursorPreview image={image} visible={isHovered} mousePos={mousePos}/>
    </div>
  );
}

function BottomLine() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once:true });
  return (
    <div ref={ref} style={{ position:"relative", height:"1px", overflow:"hidden" }}>
      <div style={{ position:"absolute", inset:0, background:"rgba(255,255,255,0.07)" }}/>
      <motion.div initial={{ scaleX:0 }} animate={inView?{scaleX:1}:{scaleX:0}}
        transition={{ duration:1.5, delay:SERVICES.length*.12, ease:[0.22,1,0.36,1] }}
        style={{ position:"absolute", inset:0, background:"rgba(255,255,255,0.15)", transformOrigin:"left center" }}
      />
    </div>
  );
}

export default function HowWeHelp() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [mousePos, setMousePos]         = useState({ x:0, y:0 });
  const headingRef    = useRef(null);
  const headingInView = useInView(headingRef, { once:true, margin:"0px 0px -60px 0px" });

  useEffect(() => {
    const move = (e) => setMousePos({ x:e.clientX, y:e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <section style={{ background:"#080808", fontFamily:SANS, paddingBottom:80, position:"relative", overflow:"hidden" }}>

      {/* ── Subtle grid ── */}
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", zIndex:0,
        backgroundImage:"linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
        backgroundSize:"60px 60px",
      }}/>
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", zIndex:0,
        background:"radial-gradient(ellipse 90% 80% at 50% 50%, transparent 30%, #080808 100%)",
      }}/>
      {/* Glowing dots at intersections */}
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", zIndex:0,
        backgroundImage:"radial-gradient(circle, rgba(255,255,255,0.13) 1px, transparent 1px)",
        backgroundSize:"60px 60px",
        maskImage:"radial-gradient(ellipse 70% 60% at 50% 40%, black 0%, transparent 100%)",
      }}/>
      {/* Orange top glow */}
      <motion.div
        animate={{ opacity:[0.5,0.85,0.5], scale:[1,1.1,1] }}
        transition={{ duration:8, repeat:Infinity, ease:"easeInOut" }}
        style={{ position:"absolute", top:"-10%", left:"50%", transform:"translateX(-50%)",
          width:700, height:350, borderRadius:"50%",
          background:"radial-gradient(circle, rgba(255,77,0,0.18) 0%, transparent 65%)",
          filter:"blur(80px)", pointerEvents:"none", zIndex:0,
        }}
      />
      {/* Purple bottom-right glow */}
      <motion.div
        animate={{ opacity:[0.3,0.6,0.3] }}
        transition={{ duration:12, repeat:Infinity, ease:"easeInOut", delay:4 }}
        style={{ position:"absolute", bottom:"-5%", right:"-5%",
          width:500, height:500, borderRadius:"50%",
          background:"radial-gradient(circle, rgba(90,60,255,0.12) 0%, transparent 65%)",
          filter:"blur(80px)", pointerEvents:"none", zIndex:0,
        }}
      />

      {/* ── HEADING ── */}
      <div ref={headingRef} style={{ padding:"72px 80px 40px", position:"relative", zIndex:5 }}>
        <motion.div initial={{ opacity:0, y:12 }} animate={headingInView?{opacity:1,y:0}:{}} transition={{ duration:.7 }}
          style={{ display:"flex", alignItems:"center", gap:10, marginBottom:20 }}
        >
          <div style={{ width:28, height:1, background:"#FF4D00", opacity:.7 }}/>
          <span style={{ color:"rgba(255,255,255,0.35)", fontSize:".7rem", letterSpacing:".22em", textTransform:"uppercase", fontWeight:500 }}>Services</span>
        </motion.div>

        <motion.div initial={{ opacity:0, y:40 }} animate={headingInView?{opacity:1,y:0}:{}} transition={{ duration:1.1, delay:.15, ease:[0.22,1,0.36,1] }}
          style={{ display:"flex", alignItems:"baseline", gap:16, flexWrap:"wrap" }}
        >
          <h2 style={{ color:"#fff", fontWeight:900, fontSize:"clamp(2.4rem,7vw,7.5rem)", letterSpacing:"-.04em", textTransform:"uppercase", margin:0, lineHeight:.95 }}>How We</h2>
          <h2 style={{ fontWeight:900, fontSize:"clamp(2.4rem,7vw,7.5rem)", letterSpacing:"-.04em", textTransform:"uppercase", margin:0, lineHeight:.95, background:"linear-gradient(90deg,#FF4D00 0%,#ff8a50 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>Can Help</h2>
        </motion.div>

        <motion.p initial={{ opacity:0, y:20 }} animate={headingInView?{opacity:1,y:0}:{}} transition={{ duration:.8, delay:.35 }}
          style={{ color:"rgba(255,255,255,0.28)", fontSize:"clamp(.9rem,1.3vw,1.1rem)", marginTop:20, marginBottom:0, maxWidth:480, lineHeight:1.6 }}
        >Hover each service to explore. We build things that last.</motion.p>
      </div>

      {/* ── SERVICE ROWS ── */}
      <div style={{ position:"relative", zIndex:5 }}>
        {SERVICES.map((service, index)=>(
          <ServiceRow key={index} {...service} index={index}
            isHovered={hoveredIndex===index}
            onHover={()=>setHoveredIndex(index)}
            onLeave={()=>setHoveredIndex(null)}
            mousePos={mousePos}
          />
        ))}
        <BottomLine/>
      </div>

      <motion.div initial={{ opacity:0 }} animate={headingInView?{opacity:1}:{}} transition={{ delay:1 }}
        style={{ padding:"32px 80px 0", display:"flex", alignItems:"center", gap:10, position:"relative", zIndex:5 }}
      >
        <span style={{ color:"rgba(255,255,255,0.15)", fontSize:".72rem", letterSpacing:".18em", textTransform:"uppercase" }}>{SERVICES.length} services available</span>
        <div style={{ flex:1, height:1, background:"rgba(255,255,255,0.06)" }}/>
        <span style={{ color:"#FF4D00", fontSize:".72rem", letterSpacing:".18em", textTransform:"uppercase" }}>EST. 2023</span>
      </motion.div>
    </section>
  );
}

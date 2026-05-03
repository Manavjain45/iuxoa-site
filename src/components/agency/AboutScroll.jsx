import React, { useRef, useEffect } from 'react'
import { motion, useTransform, useMotionValue } from 'framer-motion'

const SANS = "'Inter', 'Helvetica Neue', Arial, sans-serif"

const sentence =
  'We combine creativity, technology, and teamwork to build games, apps, and digital experiences that inspire and perform.'
const allWords = sentence.split(' ')
const total = allWords.length

// Single word — animates grey → white as scroll progress passes through it
function AnimatedWord({ word, index, progress }) {
  const start = index / total
  const end = Math.min((index + 1.5) / total, 1)

  const color = useTransform(
    progress,
    [start, end],
    ['rgba(255,255,255,0.12)', 'rgba(255,255,255,1)']
  )

  return (
    <motion.span style={{ color, display: 'inline-block', marginRight: '0.22em' }}>
      {word}
    </motion.span>
  )
}

export default function AboutScroll() {
  const outerRef = useRef(null)
  const progress = useMotionValue(0)

  useEffect(() => {
    const update = () => {
      const el = outerRef.current
      if (!el) return
      const rect       = el.getBoundingClientRect()
      const sectionTop = window.scrollY + rect.top
      const sectionH   = el.offsetHeight
      const vh         = window.innerHeight
      const scrolled   = window.scrollY - sectionTop
      const range      = sectionH - vh
      const p          = Math.min(Math.max(scrolled / range, 0), 1)
      progress.set(p)
    }

    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [progress])

  return (
    // Outer: 500vh — scroll budget while panel is pinned
    <div ref={outerRef} id="about-scroll" className="about-outer" style={{ height: '500vh', position: 'relative' }}>

      {/* Sticky panel — locked to viewport, NEVER moves while scrolling */}
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        width: '100%',
        background: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 5,
      }}>

        {/* Inner layout: (ABOUT) label + big animated sentence */}
        <div style={{
          fontFamily: SANS,
          width: '100%',
          maxWidth: '1300px',
          padding: '0 80px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '40px',
        }}>

          {/* (ABOUT) label */}
          <div style={{ flexShrink: 0, width: '80px', paddingTop: '10px' }}>
            <p style={{
              fontSize: '0.7rem',
              color: 'rgba(255,255,255,0.35)',
              letterSpacing: '0.12em',
              fontWeight: 400,
              whiteSpace: 'nowrap',
              margin: 0,
            }}>
              (ABOUT)
            </p>
          </div>

          {/* Animated sentence */}
          <div style={{ flex: 1 }}>
            <p style={{
              fontWeight: 700,
              lineHeight: 1.2,
              fontSize: 'clamp(2.2rem, 4.5vw, 5rem)',
              letterSpacing: '-0.03em',
              margin: 0,
            }}>
              {allWords.map((word, i) => (
                <AnimatedWord key={i} word={word} index={i} progress={progress} />
              ))}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

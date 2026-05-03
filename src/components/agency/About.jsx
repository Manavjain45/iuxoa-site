import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Zap, TrendingUp } from 'lucide-react';

const stats = [
  { icon: Users, value: '50+', label: 'Global Clients' },
  { icon: Award, value: '10+', label: 'Projects Delivered' },
  { icon: Zap, value: '12', label: 'Team Members' },
  { icon: TrendingUp, value: '98%', label: 'Client Satisfaction' },
];

export default function About() {
  return (
    <section id="about" className="relative py-32 px-6 lg:px-12 overflow-hidden text-white" style={{ background: '#080808' }}>

      {/* GRID LINES */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      {/* GRID VIGNETTE */}
      <div className="absolute inset-0 z-[1] pointer-events-none" style={{
        background: 'radial-gradient(ellipse 90% 90% at 50% 50%, transparent 25%, #080808 100%)',
      }} />

      {/* GLOWING DOTS AT GRID INTERSECTIONS */}
      <div className="absolute inset-0 z-[1] pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 0%, transparent 100%)',
      }} />

      {/* ORANGE GLOW — top right */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], x: [0, 25, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute z-[1] pointer-events-none"
        style={{
          top: '-8%', right: '-4%',
          width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,77,45,0.2) 0%, transparent 65%)',
          filter: 'blur(70px)',
        }}
      />

      {/* PURPLE GLOW — bottom left */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], x: [0, -20, 0], y: [0, 20, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        className="absolute z-[1] pointer-events-none"
        style={{
          bottom: '-5%', left: '-5%',
          width: 560, height: 560, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(90,60,255,0.13) 0%, transparent 65%)',
          filter: 'blur(80px)',
        }}
      />

      {/* CENTER BREATHING GLOW */}
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute z-[1] pointer-events-none"
        style={{
          top: '30%', left: '20%',
          width: 550, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,77,45,0.06) 0%, transparent 70%)',
          filter: 'blur(90px)',
        }}
      />

      <div className="relative z-[2] max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
            About iuxoa
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <p className="text-gray-400 text-lg leading-relaxed">
                We are a creative digital studio focused on delivering
                world-class design and development solutions. Our team thrives
                on pushing boundaries and crafting experiences that are both
                beautiful and functional.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed">
                Every project is an opportunity to innovate, collaborate, and
                transform ideas into digital realities that drive meaningful
                results.
              </p>
            </div>
            <div className="space-y-6">
              <p className="text-gray-400 text-lg leading-relaxed">
                Founded with a vision to merge artistry with technology, iuxoa
                has grown into a trusted partner for brands seeking to elevate
                their digital presence.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed">
                From startups to established enterprises, we bring clarity,
                vision, and excellence to every engagement.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-gray-800">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <stat.icon size={32} className="mx-auto mb-4 text-[#FF4D2D]" />
              <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
              <div className="text-gray-500 text-sm md:text-base">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
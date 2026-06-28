'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'

const cardsData = [
  {
    num: '01',
    title: 'High-Fidelity UI',
    desc: 'Crafting fluid, responsive interfaces using modern frameworks, physics-based micro-interactions, and pixel-perfect design.',
    glow: 'rgba(230, 51, 41, 0.45)' // Red
  },
  {
    num: '02',
    title: 'Scalable Systems',
    desc: 'Architecting robust backends, real-time communication layers, and highly optimized database schemas.',
    glow: 'rgba(37, 99, 235, 0.45)' // Blue
  },
  {
    num: '03',
    title: 'Creative Coding',
    desc: 'Building memorable experiences with WebGL, canvas rendering, custom shaders, and interactive animations.',
    glow: 'rgba(245, 158, 11, 0.45)' // Amber
  }
]

export function LiquidGlassShowcase() {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  return (
    <div style={{
      position: 'relative',
      padding: '120px 0 20px 0',
      background: '#090909',
      overflow: 'hidden',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      {/* Liquid Gooey Blob Background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 1,
        opacity: 0.8
      }}>
        {/* SVG Filter for Liquid/Gooey effect */}
        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
          <defs>
            <filter id="liquid-goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="40" result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 45 -18"
                result="goo"
              />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>

        {/* Floating Blobs Container with the filter applied */}
        <div className="liquid-blobs-container" style={{
          filter: 'url(#liquid-goo)',
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0
        }}>
          {/* Blob 1 (Red) */}
          <motion.div
            animate={{
              x: [0, 180, -100, 0],
              y: [0, -120, 80, 0],
              scale: [1, 1.25, 0.9, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              position: 'absolute',
              width: '380px',
              height: '380px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(230,51,41,0.28) 0%, rgba(230,51,41,0) 70%)',
              top: '15%',
              left: '10%',
            }}
          />

          {/* Blob 2 (Blue) */}
          <motion.div
            animate={{
              x: [0, -150, 120, 0],
              y: [0, 100, -140, 0],
              scale: [1, 0.9, 1.3, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              position: 'absolute',
              width: '420px',
              height: '420px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(37,99,235,0.22) 0%, rgba(37,99,235,0) 70%)',
              bottom: '10%',
              right: '15%',
            }}
          />

          {/* Blob 3 (Amber/Orange) */}
          <motion.div
            animate={{
              x: [0, 100, -120, 0],
              y: [0, 130, -90, 0],
              scale: [1, 1.2, 0.85, 1],
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              position: 'absolute',
              width: '350px',
              height: '350px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(245,158,11,0.18) 0%, rgba(245,158,11,0) 75%)',
              top: '40%',
              left: '45%',
            }}
          />
        </div>
      </div>

      {/* Content Container */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        maxWidth: '1240px',
        width: '100%',
        padding: '0 24px',
        textAlign: 'center'
      }}>
        {/* Subtle decorative line & label */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <span style={{ width: 12, height: 1, backgroundColor: 'var(--accent)' }} />
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            textTransform: 'uppercase',
            color: 'var(--accent)',
            letterSpacing: '0.15em'
          }}>
            Interactive Lab
          </span>
          <span style={{ width: 12, height: 1, backgroundColor: 'var(--accent)' }} />
        </div>

        {/* Heading */}
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(32px, 5vw, 64px)',
          fontWeight: 900,
          textTransform: 'uppercase',
          color: '#ffffff',
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          marginBottom: 60,
        }}>
          Elevating digital<br />
          <span style={{
            backgroundImage: 'linear-gradient(90deg, #ffffff, var(--accent))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>craftsmanship</span>
        </h3>

        {/* Glassmorphic Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 32,
          width: '100%'
        }}>
          {cardsData.map((card, i) => {
            const isHovered = hoveredIndex === i
            return (
              <motion.div
                key={i}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                whileHover={{ y: -6, transition: { duration: 0.3, ease: 'easeOut' } }}
                style={{
                  position: 'relative',
                  borderRadius: 16,
                  padding: '40px 32px',
                  textAlign: 'left',
                  background: 'rgba(255, 255, 255, 0.015)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(18px)',
                  WebkitBackdropFilter: 'blur(18px)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'border-color 0.4s ease, box-shadow 0.4s ease'
                }}
                animate={{
                  borderColor: isHovered ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.05)',
                  boxShadow: isHovered 
                    ? `0 12px 40px -10px rgba(0, 0, 0, 0.6), inset 0 0 20px 0 rgba(255, 255, 255, 0.02)` 
                    : `0 4px 20px -10px rgba(0, 0, 0, 0.8), inset 0 0 0 0 rgba(255, 255, 255, 0)`
                }}
              >
                {/* Internal Glow Effect on Hover */}
                <motion.div
                  animate={{
                    opacity: isHovered ? 1 : 0
                  }}
                  transition={{ duration: 0.4 }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: `radial-gradient(circle at 50% 120%, ${card.glow} 0%, transparent 65%)`,
                    pointerEvents: 'none',
                    zIndex: 0
                  }}
                />

                {/* Card Number */}
                <span style={{
                  display: 'block',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 13,
                  color: 'var(--accent)',
                  fontWeight: 600,
                  marginBottom: 20,
                  position: 'relative',
                  zIndex: 2
                }}>
                  // {card.num}
                </span>

                {/* Card Title */}
                <h4 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 24,
                  fontWeight: 800,
                  color: '#ffffff',
                  textTransform: 'uppercase',
                  marginBottom: 16,
                  position: 'relative',
                  zIndex: 2,
                  letterSpacing: '-0.01em'
                }}>
                  {card.title}
                </h4>

                {/* Card Description */}
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 15,
                  color: '#a0a0a0',
                  lineHeight: 1.6,
                  margin: 0,
                  position: 'relative',
                  zIndex: 2
                }}>
                  {card.desc}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .liquid-blobs-container {
            filter: none !important;
          }
        }
      `}</style>
    </div>
  )
}

'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const items = [
    { num: '01', label: 'Work',     href: '#work' },
    { num: '02', label: 'About',    href: '#about' },
    { num: '03', label: 'Skills',   href: '#skills' },
    { num: '04', label: 'Contact',  href: '#contact' },
  ]

  const overlayVariants = {
    initial: { x: '100%' },
    animate: { x: 0, transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] } },
    exit: { x: '100%', transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1] } }
  }

  const listVariants = {
    animate: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } }
  }

  const itemVariants = {
    initial: { y: 60, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } }
  }

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '28px clamp(20px, 4vw, 40px)',
        zIndex: 1000,
        background: 'transparent'  /* transparent to show the grid background */
      }}>
        {/* Left: hamburger MENU */}
        <button 
          onClick={() => setOpen(true)} 
          className="cursor-hover"
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'none', border: 'none', cursor: 'none',
            fontFamily: 'var(--font-body)', fontSize: 13,
            fontWeight: 500, letterSpacing: '0.1em',
            textTransform: 'uppercase', color: 'var(--text-black)',
            outline: 'none'
          }}
        >
          <span style={{ fontSize: 18, lineHeight: 1 }}>≡</span>
          MENU
        </button>

        {/* Right: AD. monogram */}
        <a 
          href="#" 
          className="cursor-hover"
          style={{
            fontFamily: 'var(--font-body)', fontSize: 20,
            fontWeight: 700, color: 'var(--text-black)',
            textDecoration: 'none', letterSpacing: '-0.01em'
          }}
        >
          AD<span style={{ color: 'var(--accent-red)' }}>.</span>
        </a>
      </header>

      {/* Full-screen navigation overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            variants={overlayVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{
              position: 'fixed', inset: 0,
              background: '#ffffff', zIndex: 9998,
              display: 'flex', flexDirection: 'column',
              justifyContent: 'center', padding: '0 clamp(30px, 8vw, 80px)',
              borderLeft: '1px solid var(--border)'
            }}
          >
            {/* Overlay grid lines (decoration match) */}
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.45,
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Cpath d='M20 16v8M16 20h8' stroke='%23dc3c32' stroke-width='1.2' stroke-opacity='0.13'/%3E%3C/svg%3E\")"
            }} />

            {/* Close button — top right */}
            <button 
              onClick={() => setOpen(false)} 
              className="cursor-hover"
              style={{
                position: 'absolute', top: 28, right: 'clamp(20px, 4vw, 40px)',
                background: 'none', border: 'none', cursor: 'none',
                fontFamily: 'var(--font-body)', fontSize: 13,
                fontWeight: 500, letterSpacing: '0.1em',
                textTransform: 'uppercase', color: 'var(--text-black)',
                outline: 'none'
              }}
            >
              CLOSE ✕
            </button>

            {/* Navigation links */}
            <motion.nav variants={listVariants} style={{ display: 'flex', flexDirection: 'column', zIndex: 1 }}>
              {items.map(({ num, label, href }) => (
                <div key={label} style={{ overflow: 'hidden' }}>
                  <motion.a 
                    variants={itemVariants}
                    href={href} 
                    onClick={() => setOpen(false)} 
                    className="cursor-hover"
                    style={{
                      display: 'flex', alignItems: 'baseline', gap: 24,
                      textDecoration: 'none', color: 'var(--text-black)',
                      borderBottom: '1px solid var(--border)',
                      padding: '24px 0',
                    }}
                    onMouseEnter={(e) => {
                      const txt = e.currentTarget.querySelector('.nav-label')
                      if (txt) txt.style.color = 'var(--accent-red)'
                    }}
                    onMouseLeave={(e) => {
                      const txt = e.currentTarget.querySelector('.nav-label')
                      if (txt) txt.style.color = 'var(--text-black)'
                    }}
                  >
                    <span style={{ 
                      fontFamily: 'var(--font-body)', 
                      fontSize: 12, 
                      color: 'var(--text-dim)', 
                      minWidth: 28 
                    }}>
                      {num}
                    </span>
                    <span 
                      className="nav-label"
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(44px, 7vw, 76px)',
                        fontWeight: 900, 
                        textTransform: 'uppercase',
                        lineHeight: 1,
                        transition: 'color 0.2s ease'
                      }}
                    >
                      {label}
                    </span>
                  </motion.a>
                </div>
              ))}
            </motion.nav>

            {/* Social links bottom */}
            <div style={{ 
              position: 'absolute', 
              bottom: 48, 
              left: 'clamp(30px, 8vw, 80px)', 
              display: 'flex', 
              gap: 32,
              zIndex: 1
            }}>
              {[
                ['GitHub', 'https://github.com/92-avadh'], 
                ['LinkedIn', 'https://www.linkedin.com/in/avadh-dhameliya-3560893a2'], 
                ['Email', 'mailto:dhameliyaavadh592@gmail.com']
              ].map(([name, href]) => (
                <a 
                  key={name} 
                  href={href} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-hover"
                  style={{ 
                    fontFamily: 'var(--font-body)', 
                    fontSize: 12, 
                    color: 'var(--text-muted)', 
                    textDecoration: 'none', 
                    letterSpacing: '0.05em',
                    borderBottom: '1px solid transparent',
                    paddingBottom: 2,
                    transition: 'border-color 0.2s ease, color 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--text-black)'
                    e.currentTarget.style.color = 'var(--text-black)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'transparent'
                    e.currentTarget.style.color = 'var(--text-muted)'
                  }}
                >
                  {name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
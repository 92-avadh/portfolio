'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import { navItems, socials, site } from '@/data/site'
import { EASE_EXPO } from '@/lib/motion'
import { useCursor } from '@/components/providers/CursorProvider'

/**
 * Navbar
 * ------
 * Fixed transparent bar: magnetic "MENU" trigger (left) + AD monogram (right).
 * Opens a full-screen overlay with a split layout:
 *   Left side — branding text, tagline, and social links.
 *   Right side — large navigation links.
 */
export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { setHover } = useCursor()

  // Lock body scroll while the overlay is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Scroll-aware bar background.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const overlay = {
    initial: { clipPath: 'inset(0 0 0 100%)' },
    animate: { clipPath: 'inset(0 0 0 0%)', transition: { duration: 0.8, ease: EASE_EXPO } },
    exit: { clipPath: 'inset(0 0 0 100%)', transition: { duration: 0.6, ease: EASE_EXPO } },
  }

  const leftContent = {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE_EXPO, delay: 0.4 } },
    exit: { opacity: 0, x: -30, transition: { duration: 0.3 } },
  }

  const list = { animate: { transition: { staggerChildren: 0.07, delayChildren: 0.25 } } }
  const item = {
    initial: { y: '110%' },
    animate: { y: 0, transition: { duration: 0.6, ease: EASE_EXPO } },
    exit: { y: '110%', transition: { duration: 0.3, ease: EASE_EXPO } },
  }

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE_EXPO, delay: 0.2 }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '24px clamp(20px, 4vw, 48px)',
          background: scrolled ? 'var(--bg-elev)' : 'transparent',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(10px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
          transition: 'background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease',
        }}
      >
        <a
          href="#home"
          onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
          style={{
            fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 900,
            color: 'var(--text)', textDecoration: 'none', letterSpacing: '-0.02em',
          }}
        >
          {site.monogram}<span style={{ color: 'var(--accent)' }}>.</span>
        </a>

        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <ThemeToggle setHover={setHover} />
          <NavButton onClick={() => setOpen(true)} setHover={setHover} label="OPEN MENU">
            <span style={{ fontSize: 18, lineHeight: 1 }}>≡</span> MENU
          </NavButton>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            variants={overlay} initial="initial" animate="animate" exit="exit"
            style={{
              position: 'fixed', inset: 0, background: 'var(--bg)', color: 'var(--text)', zIndex: 9998,
              display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
              overflowY: 'auto',
            }}
          >
            {/* Grid background decoration */}
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.35,
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='28'%3E%3Cpath d='M14 10v8M10 14h8' stroke='%23dc3c32' stroke-width='1.1' stroke-opacity='0.13'/%3E%3C/svg%3E\")",
              backgroundSize: '28px 28px',
            }} />

            {/* Top controls in overlay */}
            <div style={{ position: 'absolute', top: 24, right: 'clamp(20px, 4vw, 48px)', display: 'flex', alignItems: 'center', gap: 20, zIndex: 10 }}>
              <ThemeToggle setHover={setHover} />
              <CloseButton onClick={() => setOpen(false)} setHover={setHover} />
            </div>

            {/* LEFT SIDE — Branding, tagline, socials */}
            <motion.div
              className="nav-left-col"
              variants={leftContent}
              initial="initial" animate="animate" exit="exit"
              style={{
                flex: '1 1 45%',
                minWidth: 320,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: 'clamp(80px, 10vh, 120px) clamp(30px, 6vw, 80px)',
                borderRight: '1px solid var(--border)',
                position: 'relative',
                zIndex: 1,
              }}
            >
              {/* Large monogram */}
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(80px, 12vw, 160px)',
                fontWeight: 900,
                lineHeight: 0.85,
                color: 'var(--text)',
                letterSpacing: '-0.04em',
                marginBottom: 32,
              }}>
                {site.monogram}<span style={{ color: 'var(--accent)' }}>.</span>
              </div>

              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(16px, 2vw, 22px)',
                fontWeight: 400,
                color: 'var(--text-muted)',
                lineHeight: 1.6,
                maxWidth: 380,
                marginBottom: 16,
              }}>
                {site.role}
              </p>

              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(14px, 1.5vw, 16px)',
                fontWeight: 400,
                color: 'var(--text-dim)',
                lineHeight: 1.7,
                maxWidth: 380,
                marginBottom: 48,
              }}>
                {site.tagline}
              </p>

              {/* Availability badge */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                marginBottom: 48,
              }}>
                <span style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: 'var(--accent)',
                  animation: 'pulse-dot 1.6s ease-in-out infinite',
                }} />
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 13,
                  color: 'var(--text-muted)',
                  letterSpacing: '0.02em',
                }}>
                  {site.availability}
                </span>
                <style>{`@keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.7)} }`}</style>
              </div>

              {/* Social links */}
              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                {socials.map(({ label, href }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    onMouseEnter={(e) => {
                      setHover(true)
                      e.currentTarget.style.borderColor = 'var(--accent)'
                      e.currentTarget.style.color = 'var(--accent)'
                    }}
                    onMouseLeave={(e) => {
                      setHover(false)
                      e.currentTarget.style.borderColor = 'transparent'
                      e.currentTarget.style.color = 'var(--text-muted)'
                    }}
                    style={{
                      fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-muted)',
                      textDecoration: 'none', letterSpacing: '0.08em', textTransform: 'uppercase',
                      paddingBottom: 2, borderBottom: '1px solid transparent',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* RIGHT SIDE — Navigation links */}
            <div
              className="nav-right-col"
              style={{
                flex: '1 1 55%',
                minWidth: 320,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: 'clamp(80px, 10vh, 120px) clamp(30px, 6vw, 80px)',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <motion.nav variants={list} style={{ display: 'flex', flexDirection: 'column' }}>
                {navItems.map(({ num, label, href }) => (
                  <div key={label} style={{ overflow: 'hidden', borderBottom: '1px solid var(--border)' }}>
                    <motion.a
                      variants={item}
                      href={href} onClick={() => setOpen(false)}
                      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
                      style={{ display: 'flex', alignItems: 'baseline', gap: 24, padding: '28px 0', textDecoration: 'none' }}
                    >
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-dim)', minWidth: 28 }}>{num}</span>
                      <span className="nav-label" style={{
                        fontFamily: 'var(--font-display)', fontSize: 'clamp(52px, 9vw, 100px)',
                        fontWeight: 900, textTransform: 'uppercase', lineHeight: 1, color: 'var(--text)',
                        transition: 'color 0.2s ease, transform 0.3s ease', display: 'inline-block',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.transform = 'translateX(14px)' }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.transform = 'translateX(0)' }}
                      >
                        {label}
                      </span>
                    </motion.a>
                  </div>
                ))}
              </motion.nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <style>{`
        @media (max-width: 768px) {
          .nav-right-col { order: 1 !important; border-bottom: 1px solid var(--border); }
          .nav-left-col { order: 2 !important; border-right: none !important; }
        }
      `}</style>
    </>
  )
}

function ThemeToggle({ setHover }) {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div style={{ width: 60, height: 20 }} />
    )
  }

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label="Toggle theme"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        background: 'none',
        border: '1px solid var(--border)',
        borderRadius: 999,
        padding: '4px 12px',
        cursor: 'none',
        fontFamily: 'var(--font-body)',
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: 'var(--text)',
        outline: 'none',
        transition: 'all 0.2s ease',
      }}
    >
      <span style={{ fontSize: 13, lineHeight: 1 }}>{isDark ? '☀️' : '🌙'}</span>
      <span>{isDark ? 'LIGHT' : 'DARK'}</span>
    </button>
  )
}

function NavButton({ children, onClick, setHover, label }) {
  return (
    <button
      onClick={onClick} aria-label={label}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none',
        cursor: 'none', fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 500,
        letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text)', outline: 'none',
      }}
    >
      {children}
    </button>
  )
}

function CloseButton({ onClick, setHover }) {
  return (
    <button
      onClick={onClick} aria-label="Close menu"
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        background: 'none', border: 'none', cursor: 'none', fontFamily: 'var(--font-body)',
        fontSize: 13, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase',
        color: 'var(--text)', outline: 'none', zIndex: 10,
      }}
    >
      CLOSE ✕
    </button>
  )
}

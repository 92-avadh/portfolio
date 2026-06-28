'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { site } from '@/data/site'
import { marqueeSkills } from '@/data/skills'
import { GreetingCycle } from '@/components/sections/GreetingCycle'
import { Marquee } from '@/components/ui/Marquee'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { WebGLCanvas } from '@/components/ui/WebGLCanvas'
import { useCursor } from '@/components/providers/CursorProvider'
import { prefersReducedMotion, GSAP_EASE_EXPO } from '@/lib/motion'
import { TransparentMemoji } from '@/components/ui/TransparentMemoji'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { Reveal } from '@/components/ui/Reveal'

import { Counter } from '@/components/ui/Counter'
import { stats } from '@/data/stats'

const heroStats = stats

/**
 * HeroSection
 * -----------
 * Fully redesigned layout:
 * - Two-column design: left-aligned Name on the left (8 cols), Memoji waving on the right (4 cols) (perfectly vertically centered side-by-side).
 * - Interactive hover blob: Triggers custom 'text-hover' cursor class for difference blend mode color flipping.
 * - Static Infinite grid background: Denser red cross pattern that is static.
 * - Scroll Reveal: Only shows greeting, name, and memoji initially; scrolls down to reveal role, tagline, CTAs and skills.
 */
export function HeroSection() {
  const metaRef = useRef(null)
  const { setHover } = useCursor()

  const [scrolled, setScrolled] = useState(false)

  // Split name strings into chars
  const line1 = site.firstName.split('')
  const line2 = site.lastName.split('')

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // run on mount

    if (prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      gsap.from('[data-hero-char]', {
        yPercent: 120, opacity: 0, duration: 1, ease: GSAP_EASE_EXPO,
        stagger: 0.03, delay: 0.4,
      })
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      ctx.revert()
    }
  }, [])

  return (
    <section id="home" className="section-grid" style={{
      minHeight: '100vh', position: 'relative', background: 'var(--bg)',
      paddingTop: '120px', paddingBottom: 0, overflow: 'hidden',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
    }}>
      {/* WebGL accent — drifts behind the name */}
      <WebGLCanvas density={0.9} style={{ opacity: 0.5 }} />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: 1340, width: '100%', margin: '0 auto', padding: '0 clamp(20px, 5vw, 60px)' }}>
        
        {/* ROW 1: Name and Memoji Side-by-Side (Vertically Centered) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Name (8 columns for plenty of width) */}
          <div className="col-span-1 lg:col-span-8 flex flex-col items-start text-left">
            {/* Greeting */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
              <GreetingCycle />
              <span style={{ width: 24, height: 1, background: 'var(--border)' }} />
            </div>

            {/* THE NAME with Hover Trigger */}
            <h1 
              onMouseEnter={() => setHover('text-hover')}
              onMouseLeave={() => setHover(false)}
              style={{ margin: '0 0 8px 0', width: '100%', lineHeight: 0.82, cursor: 'none' }}
            >
              <NameLine chars={line1} offset={false} />
              <NameLine chars={line2} offset={true} />
            </h1>
          </div>

          {/* Right Column: Memoji Waving (4 columns) */}
          <div className="col-span-1 lg:col-span-4 flex justify-center items-center relative">
            <div style={{
              position: 'absolute',
              width: '120%',
              height: '120%',
              background: 'radial-gradient(circle, var(--accent-soft) 0%, transparent 65%)',
              pointerEvents: 'none',
              zIndex: -1,
            }} />
            <TransparentMemoji src="/memoji.png" style={{ width: '100%', maxWidth: 380, height: 'auto' }} />
          </div>

        </div>

        {/* ROW 2: Meta Details (Fades in below the Name) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" style={{ marginTop: 'clamp(56px, 8vw, 110px)' }}>
          <div className="col-span-1 lg:col-span-8 flex flex-col items-start text-left">
            
            <div 
              ref={metaRef} 
              style={{ 
                width: '100%',
                opacity: 1,
                pointerEvents: 'auto',
              }}
            >
              {/* Role & Location */}
              <ScrollReveal
                baseOpacity={0}
                enableBlur={true}
                baseRotation={3}
                blurStrength={10}
                as="h2"
                style={{ margin: '0 0 6px 0' }}
                textStyle={{
                  fontSize: 'clamp(24px, 3.2vw, 36px)',
                  fontWeight: 800,
                  color: 'var(--text)',
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                }}
              >
                {site.role}
              </ScrollReveal>
              
              <ScrollReveal
                baseOpacity={0}
                enableBlur={true}
                baseRotation={3}
                blurStrength={10}
                as="p"
                style={{ margin: '0 0 16px 0' }}
                textStyle={{
                  fontSize: 'clamp(15px, 2vw, 19px)',
                  fontWeight: 500,
                  color: 'var(--text-muted)',
                }}
              >
                {site.location}
              </ScrollReveal>

              {/* Availability */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 32 }}>
                <span style={{
                  width: 9,
                  height: 9,
                  borderRadius: '50%',
                  background: 'var(--accent)',
                  animation: 'pulse-dot 1.6s ease-in-out infinite',
                }} />
                <ScrollReveal
                  baseOpacity={0}
                  enableBlur={true}
                  baseRotation={3}
                  blurStrength={10}
                  as="span"
                  style={{ display: 'inline-block', margin: 0 }}
                  textStyle={{
                    fontSize: 'clamp(14px, 1.8vw, 17px)',
                    fontWeight: 500,
                    color: 'var(--text-muted)',
                  }}
                >
                  {site.availability}
                </ScrollReveal>
                <style>{`@keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.7)} }`}</style>
              </div>

              {/* Tagline & Intro */}
              <ScrollReveal
                baseOpacity={0}
                enableBlur={true}
                baseRotation={3}
                blurStrength={10}
                as="p"
                style={{ margin: '0 0 20px 0', maxWidth: 580 }}
                textStyle={{
                  fontSize: 16,
                  color: 'var(--text-muted)',
                  lineHeight: 1.7,
                }}
              >
                {site.tagline}
              </ScrollReveal>




              {/* CTAs */}
              <div style={{ display: 'flex', gap: 36, flexWrap: 'wrap' }}>
                <CtaLink href="#work" setHover={setHover} label="VIEW WORK ↗" cursorLabel="VIEW" />
                <CtaLink href="#contact" setHover={setHover} label="LET'S TALK →" cursorLabel="TALK" />
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Full-bleed skills marquee — Red band */}
      <div style={{ 
        marginTop: 64,
        opacity: scrolled ? 1 : 0,
        transform: scrolled ? 'translateY(0)' : 'translateY(24px)',
        pointerEvents: scrolled ? 'auto' : 'none',
        transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        transitionDelay: '0.1s',
      }}>
        <Marquee items={marqueeSkills} theme="red" />
      </div>

      {/* Manifesto statement — below the marquee */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        maxWidth: 1340,
        width: '100%',
        margin: '0 auto',
        padding: 'clamp(48px, 8vw, 80px) clamp(20px, 5vw, 60px) 0',
      }}>
        <Reveal y={30}>
          <h2 style={{
            margin: 0,
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(36px, 6.5vw, 90px)',
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            color: 'var(--text)',
          }}>
            {'CRAFTING '}
            <span style={{ color: 'var(--accent)' }}>SCALABLE</span>
            {' FULL-STACK SOLUTIONS, '}
            <span style={{ color: 'var(--accent)' }}>ENGINEERED</span>
            {' TO DELIVER '}
            <span style={{ color: 'var(--accent)' }}>HIGH-PERFORMANCE</span>
            {' PRODUCTS AND MOVE '}
            <span style={{ color: 'var(--accent)' }}>PEOPLE</span>
            {' CLOSER TO THEIR '}
            <span style={{ color: 'var(--accent)' }}>GOALS</span>
          </h2>
        </Reveal>

        {/* Counting numbers row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '40px 32px',
          marginTop: 'clamp(48px, 6vw, 80px)',
          paddingBottom: 'clamp(40px, 6vw, 60px)',
          borderTop: '1px solid var(--border)',
          paddingTop: 'clamp(32px, 4vw, 48px)',
        }}>
          {heroStats.map((s, i) => (
            <div key={s.label}>
              <Counter
                value={s.value}
                suffix={s.suffix}
                duration={2 + i * 0.3}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(48px, 7vw, 80px)',
                  fontWeight: 900,
                  lineHeight: 1,
                  color: 'var(--text)',
                  display: 'block',
                  letterSpacing: '-0.02em',
                }}
              />
              <p style={{
                fontSize: 12,
                marginTop: 12,
                color: 'var(--text-muted)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
              }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const NameLine = ({ chars, offset }) => (
  <div style={{
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(32px, 8.5vw, 145px)', // Tightly sized to fit side-by-side
    fontWeight: 900,
    textTransform: 'uppercase',
    letterSpacing: '-0.03em',
    lineHeight: 0.82,
    display: 'block',
    textAlign: 'left',
    whiteSpace: 'nowrap', // Prevents wrapping letters to a third line
    paddingLeft: offset ? 'clamp(15px, 6vw, 130px)' : 0,
  }}>
    {chars.map((c, i) => {
      const isRed = c.toUpperCase() === 'A' || c.toUpperCase() === 'H'
      const charColor = isRed ? 'var(--accent)' : 'var(--text)'

      return (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top' }}>
          <span data-hero-char style={{
            display: 'inline-block',
            color: charColor,
            willChange: 'transform',
          }}>
            {c}
          </span>
        </span>
      )
    })}
  </div>
)

function CtaLink({ href, label, setHover, cursorLabel }) {
  return (
    <MagneticButton
      href={href} strength={0.25} cursorLabel={cursorLabel}
      onMouseEnter={() => setHover(false)} // label state takes over
      style={{
        fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 500,
        letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text)',
        textDecoration: 'none', borderBottom: '1px solid var(--text)', paddingBottom: 4,
      }}
    >
      {label}
    </MagneticButton>
  )
}

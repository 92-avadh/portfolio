'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { skillZones } from '@/data/skills'
import { Section } from '@/components/ui/Section'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { SplitHeading } from '@/components/ui/Reveal'
import { useCursor } from '@/components/providers/CursorProvider'
import { EASE_EXPO } from '@/lib/motion'
import TextType from '@/components/ui/TextType'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const zoneDescriptions = {
  '01': "Designing fluid, highly responsive user interfaces using modern framework design principles, clean layouts, and physics-based animations.",
  '02': "Architecting high-concurrency systems, RESTful microservices, WebSocket-driven servers, and secure authentication pipelines.",
  '03': "Structuring performance-tuned SQL and NoSQL databases, transactional pipelines, relational models, and caching configurations.",
  '04': "Developing autonomous automation routines, web crawlers, data harvesting systems, and SEO & GEO optimization strategies."
}

/**
 * SkillsSection
 * -------------
 * Tabbed "skill zones" matching thecodeman's "Showing zone X of N" pattern.
 * Switch on hover (desktop) / click (touch). Active zone highlights and its
 * tech tags crossfade in. Fixes the old static-panel + hover-bug design.
 */
export function SkillsSection() {
  const wrapRef = useRef(null)
  const [active, setActive] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const { setHover } = useCursor()
  const zone = skillZones[active]

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (!isMobile) return

    const ctx = gsap.context(() => {
      const tabEls = gsap.utils.toArray('.skill-tab')
      tabEls.forEach((tab, i) => {
        ScrollTrigger.create({
          trigger: tab,
          start: 'top 55%',
          end: 'bottom 55%',
          onToggle: (self) => {
            if (self.isActive) {
              setActive(i)
            }
          },
        })
      })
    }, wrapRef)

    return () => ctx.revert()
  }, [isMobile])

  return (
    <Section id="skills" theme="light">
      <SectionLabel index="04">Skills</SectionLabel>

      <SplitHeading
        as="h2" className="display" split="words" accentIndices={[1]}
        style={{ fontSize: 'clamp(52px, 8vw, 120px)', marginTop: 40 }}
      >
        {'Technical arsenal'}
      </SplitHeading>

      {/* Live zone indicator */}
      <p style={{
        marginTop: 40, fontSize: 14, color: 'var(--text-muted)',
        fontFamily: 'var(--font-body)',
      }}>
        Showing zone{' '}
        <span style={{ color: 'var(--accent)', fontWeight: 600 }}>
          {active + 1} of {skillZones.length}
        </span>
        : <strong style={{ color: 'var(--text)', fontWeight: 600 }}>{zone.title}</strong>.
      </p>

      {/* Zone tabs */}
      <div ref={wrapRef} style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 0, marginTop: 48, borderTop: '1px solid var(--border)',
      }}>
        {skillZones.map((z, i) => {
          const isActive = i === active
          return (
            <button
              key={z.num}
              className="skill-tab"
              onMouseEnter={() => !isMobile && setActive(i)}
              onClick={() => setActive(i)}
              onPointerEnter={() => setHover(true)}
              onPointerLeave={() => setHover(false)}
              style={{
                textAlign: 'left', padding: '28px 20px',
                borderBottom: '1px solid var(--border)',
                borderRight: i < skillZones.length - 1 ? '1px solid var(--border)' : 'none',
                background: isActive ? 'var(--accent-soft)' : 'transparent',
                borderLeft: isActive ? '2px solid var(--accent)' : '2px solid transparent',
                cursor: 'none', transition: 'background 0.3s ease, border-color 0.3s ease, opacity 0.4s cubic-bezier(0.76, 0, 0.24, 1)',
                opacity: isMobile ? (isActive ? 1 : 0.3) : 1,
              }}
            >
              <span style={{
                fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--text-dim)',
                letterSpacing: '0.15em', display: 'block', marginBottom: 12,
              }}>
                {z.num} /
              </span>
              <span style={{
                fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3vw, 34px)',
                fontWeight: 900, textTransform: 'uppercase', color: isActive ? 'var(--accent)' : 'var(--text)',
                transition: 'color 0.3s ease', display: 'block', lineHeight: 1,
              }}>
                {z.title}
              </span>
            </button>
          )
        })}
      </div>

      {/* Active zone tags (crossfade) */}
      <div style={{
        marginTop: 40, padding: '32px 0', borderBottom: '1px solid var(--border)',
        position: 'relative',
      }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={zone.num}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: EASE_EXPO }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '12px 20px' }}
          >
            {zone.tags.map((tag) => (
              <span key={tag} style={{
                fontFamily: 'var(--font-body)', fontSize: 16, color: 'var(--text-muted)',
                padding: '6px 16px', border: '1px solid var(--border)', borderRadius: 999,
              }}>
                {tag}
              </span>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Active zone description with Scramble effect */}
      <div style={{ marginTop: 32, maxWidth: 680, minHeight: 90, paddingBottom: 40 }}>
        <div style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(15px, 2.2vw, 18px)',
          lineHeight: 1.7,
          color: 'var(--text-muted)',
        }}>
          <TextType
            text={zoneDescriptions[zone.num]}
            typingSpeed={15}
            pauseDuration={2000}
            showCursor={true}
            cursorCharacter="|"
            loop={false}
          />
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .skill-tab {
            border-right: none !important;
          }
        }
      `}</style>
    </Section>
  )
}

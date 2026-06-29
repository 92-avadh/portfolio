'use client'
import { useState, useEffect, useRef } from 'react'
import { experience } from '@/data/experience'
import { Section } from '@/components/ui/Section'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { SplitHeading } from '@/components/ui/Reveal'
import { Reveal } from '@/components/ui/Reveal'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * ExperienceSection
 * -----------------
 * Vertical timeline: period (left) + title/org/description (right), newest
 * first. Entries reveal on scroll.
 */
export function ExperienceSection() {
  const wrapRef = useRef(null)
  const [active, setActive] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (!isMobile) return

    const ctx = gsap.context(() => {
      const rowEls = gsap.utils.toArray('.experience-row')
      rowEls.forEach((row, i) => {
        ScrollTrigger.create({
          trigger: row,
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
    <Section id="experience" theme="light">
      <SectionLabel index="05">Experience</SectionLabel>

      <SplitHeading
        as="h2" className="display" split="words" accentIndices={[1]}
        style={{ fontSize: 'clamp(52px, 8vw, 120px)', marginTop: 40 }}
      >
        {'The journey'}
      </SplitHeading>

      <div ref={wrapRef} style={{ marginTop: 64 }}>
        {experience.map((item, i) => {
          const isActive = active === i
          return (
            <Reveal key={i} delay={i * 0.05}>
              <div className="experience-row" style={{
                display: 'grid', gridTemplateColumns: '160px 1fr', gap: 40,
                padding: '36px 0', borderBottom: '1px solid var(--border)',
                borderTop: i === 0 ? '1px solid var(--border)' : 'none',
                alignItems: 'start',
                opacity: isMobile ? (isActive ? 1 : 0.3) : 1,
                transition: 'opacity 0.4s cubic-bezier(0.76, 0, 0.24, 1)',
              }}>
              <div>
                <p style={{
                  fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-muted)',
                  letterSpacing: '0.02em',
                }}>
                  {item.period}
                </p>
                <span style={{
                  display: 'inline-block', marginTop: 10, fontSize: 10, fontWeight: 600,
                  letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)',
                  padding: '3px 10px', border: '1px solid var(--accent)', borderRadius: 999,
                }}>
                  {item.tag}
                </span>
              </div>

              <div>
                <h3 style={{
                  fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 3vw, 32px)',
                  fontWeight: 800, textTransform: 'uppercase', color: 'var(--text)',
                  lineHeight: 1.1, letterSpacing: '-0.01em', marginBottom: 6,
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontSize: 13, color: 'var(--text-muted)', marginBottom: 12,
                  letterSpacing: '0.05em', textTransform: 'uppercase',
                }}>
                  {item.org}
                </p>
                <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: 560 }}>
                  {item.description}
                </p>
              </div>
              </div>
            </Reveal>
          )
        })}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .experience-row {
            grid-template-columns: 1fr !important; gap: 16px !important;
          }
        }
      `}</style>
    </Section>
  )
}

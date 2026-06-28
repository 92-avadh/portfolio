'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, AnimatePresence } from 'framer-motion'
import { Section } from '@/components/ui/Section'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { SplitHeading } from '@/components/ui/Reveal'
import { prefersReducedMotion, EASE_EXPO } from '@/lib/motion'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  { n: '01', lead: 'First I', emph: 'listen', text: 'every project starts with understanding the real problem, the user, and what success actually looks like.' },
  { n: '02', lead: 'Then I', emph: 'design', text: 'mapping the system, the data flow, and the interface into something that feels inevitable.' },
  { n: '03', lead: 'Next I', emph: 'build', text: 'turning the plan into clean, performant code across the full stack, from database to pixel.' },
  { n: '04', lead: 'Then I', emph: 'ship', text: 'deploying, monitoring, and sweating the details so it holds up under real load.' },
  { n: '05', lead: 'And I', emph: 'iterate', text: 'because a live product is never finished. I keep it fast, secure, and growing.' },
]

export function ProcessSection() {
  const wrapRef = useRef(null)
  const counterRef = useRef(null)
  const [active, setActive] = useState(1)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      const stepEls = gsap.utils.toArray('.process-step')
      stepEls.forEach((step, i) => {
        const nextStep = stepEls[i + 1]
        ScrollTrigger.create({
          trigger: step,
          start: 'top 50%',
          end: nextStep ? 'bottom+=24px 50%' : 'bottom 50%',
          onToggle: (self) => {
            if (self.isActive) {
              setActive(i + 1)
            }
          },
        })
      })
    }, wrapRef)
    return () => ctx.revert()
  }, [])

  return (
    <Section id="process" theme="light" style={{ paddingTop: '40px', paddingBottom: 'clamp(100px, 14vw, 180px)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.8fr', gap: 80 }} ref={wrapRef}>
        {/* Sticky counter + heading + description */}
        <div style={{ position: 'sticky', top: 120, alignSelf: 'start' }}>
          <SectionLabel index="03">How I work</SectionLabel>
          <SplitHeading
            as="h2" className="display" split="words" accentIndices={[1]}
            style={{ fontSize: 'clamp(44px, 6vw, 80px)', marginTop: 32 }}
          >
            {'The process'}
          </SplitHeading>

          <div ref={counterRef} style={{
            marginTop: 36, fontFamily: 'var(--font-display)',
            fontSize: 'clamp(80px, 10vw, 140px)', fontWeight: 900, lineHeight: 1,
            letterSpacing: '-0.03em', display: 'flex', alignItems: 'baseline',
          }}>
            <span style={{ color: 'var(--accent)' }}>
              {`_${String(active).padStart(2, '0')}`}
            </span>
            <span style={{ color: 'var(--text-dim)', fontSize: '0.5em' }}>/05</span>
          </div>

          {/* Active step description text under the number */}
          <div style={{ minHeight: '160px', marginTop: 24, maxWidth: '340px' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
              >
                <h4 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '24px',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  color: 'var(--text)',
                  marginBottom: 10,
                  letterSpacing: '0.05em'
                }}>
                  {steps[active - 1]?.lead} <span style={{ color: 'var(--accent)' }}>{steps[active - 1]?.emph}</span>
                </h4>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '16px',
                  color: 'var(--text-muted)',
                  lineHeight: 1.6,
                  margin: 0
                }}>
                  {steps[active - 1]?.text}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {steps.map((s, idx) => {
            const isActive = active === (idx + 1)
            return (
              <div key={s.n} className="process-step" style={{
                padding: '40px 0',
                borderBottom: '1px solid var(--border)',
                opacity: isActive ? 1 : 0.2,
                transition: 'opacity 0.4s cubic-bezier(0.76, 0, 0.24, 1)',
              }}>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(36px, 5vw, 68px)',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  color: isActive ? 'var(--accent)' : 'var(--text)',
                  transition: 'color 0.4s cubic-bezier(0.76, 0, 0.24, 1)',
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 20
                }}>
                  <span style={{
                    fontSize: '0.45em',
                    color: isActive ? 'var(--accent)' : 'var(--text-dim)',
                    fontFamily: 'var(--font-mono)',
                    transition: 'color 0.4s cubic-bezier(0.76, 0, 0.24, 1)',
                  }}>
                    {s.n}
                  </span>
                  {s.emph}
                </h3>
              </div>
            )
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          div[style*='grid-template-columns'] {
            grid-template-columns: 1fr !important; gap: 48px !important;
          }
          :global(.process-section-sticky) { position: static !important; }
        }
      `}</style>
    </Section>
  )
}

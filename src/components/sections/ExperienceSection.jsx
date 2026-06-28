'use client'
import { experience } from '@/data/experience'
import { Section } from '@/components/ui/Section'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { SplitHeading } from '@/components/ui/Reveal'
import { Reveal } from '@/components/ui/Reveal'

/**
 * ExperienceSection
 * -----------------
 * Vertical timeline: period (left) + title/org/description (right), newest
 * first. Entries reveal on scroll.
 */
export function ExperienceSection() {
  return (
    <Section id="experience" theme="light">
      <SectionLabel index="05">Experience</SectionLabel>

      <SplitHeading
        as="h2" className="display" split="words" accentIndices={[1]}
        style={{ fontSize: 'clamp(52px, 8vw, 120px)', marginTop: 40 }}
      >
        {'The journey'}
      </SplitHeading>

      <div style={{ marginTop: 64 }}>
        {experience.map((item, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <div className="experience-row" style={{
              display: 'grid', gridTemplateColumns: '160px 1fr', gap: 40,
              padding: '36px 0', borderBottom: '1px solid var(--border)',
              borderTop: i === 0 ? '1px solid var(--border)' : 'none',
              alignItems: 'start',
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
        ))}
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

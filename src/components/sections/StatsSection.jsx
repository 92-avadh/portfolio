'use client'
import { stats } from '@/data/stats'
import { Section } from '@/components/ui/Section'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Counter } from '@/components/ui/Counter'
import { Reveal } from '@/components/ui/Reveal'

/**
 * StatsSection
 * ------------
 * Animated counters band. Each number counts up on scroll-in.
 */
export function StatsSection() {
  return (
    <Section id="stats" theme="light" grid style={{ padding: 'clamp(70px, 9vw, 120px) clamp(20px, 5vw, 60px)' }}>
      <SectionLabel index="—">By the numbers</SectionLabel>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '48px 40px', marginTop: 56,
      }}>
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <div>
              <Counter
                value={s.value}
                suffix={s.suffix}
                style={{
                  fontFamily: 'var(--font-display)', fontSize: 'clamp(56px, 8vw, 96px)',
                  fontWeight: 900, lineHeight: 1, color: 'var(--text)', display: 'block', letterSpacing: '-0.02em',
                }}
              />
              <p style={{
                fontSize: 12, marginTop: 12, color: 'var(--text-muted)',
                letterSpacing: '0.1em', textTransform: 'uppercase',
              }}>
                {s.label}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

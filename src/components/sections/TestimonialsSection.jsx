'use client'
import { testimonials } from '@/data/testimonials'
import { Section } from '@/components/ui/Section'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { SplitHeading } from '@/components/ui/Reveal'
import { Reveal } from '@/components/ui/Reveal'
import { useCursor } from '@/components/providers/CursorProvider'

/**
 * TestimonialsSection
 * -------------------
 * Quote cards in a responsive grid. Each card has a large accent quotation
 * mark, the quote, and an attribution block.
 */
export function TestimonialsSection() {
  const { setHover } = useCursor()

  return (
    <Section id="testimonials" theme="light">
      <SectionLabel index="06">Testimonials</SectionLabel>

      <SplitHeading
        as="h2" className="display" split="words" accentIndices={[1]}
        style={{ fontSize: 'clamp(52px, 8vw, 120px)', marginTop: 40 }}
      >
        {'Kind words'}
      </SplitHeading>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
        gap: 32, marginTop: 64,
      }}>
        {testimonials.map((t, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <figure
              onMouseEnter={(e) => {
                setHover(true)
                e.currentTarget.style.borderColor = 'var(--accent)'
                e.currentTarget.style.transform = 'translateY(-4px)'
              }}
              onMouseLeave={(e) => {
                setHover(false)
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
              style={{
                height: '100%', padding: '40px 32px', background: 'var(--bg-elev)',
                border: '1px solid var(--border)', position: 'relative',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                transition: 'border-color 0.3s ease, transform 0.4s ease',
              }}
            >
              <span style={{
                position: 'absolute', top: 16, right: 28,
                fontFamily: 'var(--font-display)', fontSize: 80, lineHeight: 1,
                color: 'var(--accent)', opacity: 0.18,
              }}>
                &rdquo;
              </span>

              <blockquote style={{
                fontSize: 16, lineHeight: 1.7, color: 'var(--text)',
                fontFamily: 'var(--font-body)', marginBottom: 28, position: 'relative', zIndex: 1,
              }}>
                {t.quote}
              </blockquote>

              <figcaption>
                <p style={{
                  fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800,
                  textTransform: 'uppercase', color: 'var(--text)', letterSpacing: '-0.01em',
                }}>
                  {t.name}
                </p>
                <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4, letterSpacing: '0.05em' }}>
                  {t.role}
                </p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

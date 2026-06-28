'use client'
import { Section } from '@/components/ui/Section'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { SplitHeading } from '@/components/ui/Reveal'
import ScrollStack, { ScrollStackItem } from '@/components/ui/ScrollStack'

const stackCards = [
  {
    title: 'Clean & Scalable Code',
    desc: 'I architect codebases with scalability in mind. From decoupled modular frontends to highly optimized database schemas, clean code ensures ease of iteration and zero technical debt.',
    color: '#e63329', // Accent Red
    index: '01'
  },
  {
    title: 'Modern Frontend Excellence',
    desc: 'Crafting pixel-perfect, accessible, and high-fidelity user experiences using Next.js, Framer Motion, and GSAP. Physics-based micro-interactions and smooth transitions bring interfaces to life.',
    color: '#2563eb', // Blue
    index: '02'
  },
  {
    title: 'Robust Backend Systems',
    desc: 'Designing fast, scalable backend services in Node.js and Python. Focusing on optimized RESTful APIs, low-latency WebSockets, background job queues, and robust authentication pipelines.',
    color: '#16a34a', // Green
    index: '03'
  },
  {
    title: 'Performance & Optimization',
    desc: 'A page load delay is lost value. I audit query plans, configure Redis caching, profile system latency, and fine-tune rendering lifecycles to achieve blisteringly fast speeds.',
    color: '#f59e0b', // Yellow
    index: '04'
  }
]

/**
 * ScrollStackSection
 * ------------------
 * Renders the interactive ScrollStack component showing core engineering principles.
 * Uses the self-contained ScrollStack scroller (not window scroll) to avoid
 * Lenis conflicts with the global page smooth scroll.
 */
export default function ScrollStackSection() {
  return (
    <Section id="principles" theme="light" style={{ paddingBottom: '20px' }}>
      <SectionLabel index="02">Philosophy</SectionLabel>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end" style={{ marginBottom: 48 }}>
        <div className="col-span-1 lg:col-span-8">
          <SplitHeading
            as="h2"
            className="display"
            split="words"
            accentIndices={[1]}
            style={{ fontSize: 'clamp(44px, 6.5vw, 80px)' }}
          >
            {'Core engineering principles'}
          </SplitHeading>
        </div>
        <div className="col-span-1 lg:col-span-4 text-left lg:text-right">
          <p style={{
            fontSize: 14,
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-body)',
            lineHeight: 1.6,
            maxWidth: 320,
            display: 'inline-block'
          }}>
            Scroll down to see how I build, stack, and deliver high-quality digital products.
          </p>
        </div>
      </div>

      {/* Self-contained scroll container with fixed viewport height */}
      <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
        <ScrollStack
          itemDistance={120}
          itemScale={0.04}
          itemStackDistance={35}
          baseScale={0.88}
          stackPosition="25%"
          scaleEndPosition="12%"
          blurAmount={1.5}
        >
          {stackCards.map((card, i) => (
            <ScrollStackItem key={i}>
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 12,
                      color: card.color,
                      fontWeight: 600,
                      letterSpacing: '0.1em'
                    }}>
                      PRINCIPLE {card.index}
                    </span>
                    <span style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: card.color
                    }} />
                  </div>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(28px, 4vw, 42px)',
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    color: 'var(--text)',
                    lineHeight: 1,
                    marginBottom: 16
                  }}>
                    {card.title}
                  </h3>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'clamp(14px, 1.8vw, 16px)',
                    lineHeight: 1.6,
                    color: 'var(--text-muted)'
                  }}>
                    {card.desc}
                  </p>
                </div>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </Section>
  )
}

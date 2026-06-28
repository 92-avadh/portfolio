'use client'
import { projects } from '@/data/projects'
import { Section } from '@/components/ui/Section'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { SplitHeading } from '@/components/ui/Reveal'
import { ProjectCard } from '@/components/work/ProjectCard'
import { WebGLCanvas } from '@/components/ui/WebGLCanvas'
import { LiquidGlassShowcase } from '@/components/sections/LiquidGlassShowcase'

/**
 * WorkSection (DARK)
 * ------------------
 * The immersive showcase. Near-black canvas, WebGL particle accent, big
 * split-text heading, and a responsive grid of thecodeman-style ProjectCards.
 * Each card links to /work/[slug].
 */
export function WorkSection() {
  return (
    <Section id="work" theme="dark" style={{ padding: 'clamp(100px, 14vw, 180px) 0' }}>
      <WebGLCanvas density={1.1} style={{ opacity: 0.4 }} />

      <div style={{ padding: '0 clamp(20px, 5vw, 60px)' }}>
        <SectionLabel index="02">Selected Work</SectionLabel>

        <SplitHeading
          as="h2"
          className="display"
          split="words"
          accentIndices={[1]}
          style={{
            fontSize: 'clamp(52px, 10vw, 140px)', marginTop: 40, marginBottom: 80,
            maxWidth: 900,
          }}
        >
          {'Selected work'}
        </SplitHeading>
      </div>

      {/* Project grid */}
      <div style={{
        padding: '0 clamp(20px, 5vw, 60px)',
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
        gap: 'clamp(40px, 6vw, 80px)',
      }}>
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>

      {/* Liquid Glass Showcase Section */}
      <div style={{ width: '100%', marginTop: 80 }}>
        <LiquidGlassShowcase />
      </div>
    </Section>
  )
}

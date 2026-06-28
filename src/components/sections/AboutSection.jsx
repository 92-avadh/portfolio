'use client'
import { Section } from '@/components/ui/Section'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { SplitHeading } from '@/components/ui/Reveal'
import FlowingMenu from '@/components/ui/FlowingMenu'

const menuItems = [
  {
    link: '#work',
    text: 'Full-Stack Development',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop',
  },
  {
    link: '#work',
    text: 'Frontend Interfaces',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&h=400&fit=crop',
  },
  {
    link: '#work',
    text: 'Backend Systems',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop',
  },
  {
    link: '#work',
    text: 'Database Architecture',
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600&h=400&fit=crop',
  },
  {
    link: '#work',
    text: 'API & System Integration',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop',
  },
  {
    link: '#work',
    text: 'SEO & GEO',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
  },
]

/**
 * AboutSection
 * ------------
 * Replaced with the FlowingMenu component from React Bits.
 * Features edge-detecting hover with marquee text overlay and image previews.
 */
export function AboutSection() {
  return (
    <Section id="about" theme="dark">
      <SectionLabel index="01">About</SectionLabel>

      <SplitHeading
        as="h2"
        className="display"
        split="words"
        accentIndices={[2]}
        style={{ fontSize: 'clamp(44px, 6vw, 80px)', marginBottom: 48 }}
      >
        {'What I do best'}
      </SplitHeading>

      {/* Full-bleed: the animated red hover background spans edge-to-edge of the
          viewport while the menu labels stay centered. Only the background goes
          full width — section heading/label remain in the content container. */}
      <div style={{
        height: 'clamp(550px, 70vh, 850px)',
        position: 'relative',
        overflow: 'hidden',
        width: '100vw',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
      }}>
        <FlowingMenu
          items={menuItems}
          speed={12}
          textColor="#ffffff"
          bgColor="var(--bg)"
          marqueeBgColor="#dc2626"
          marqueeTextColor="#ffffff"
          borderColor="rgba(255,255,255,0.12)"
        />
      </div>
    </Section>
  )
}

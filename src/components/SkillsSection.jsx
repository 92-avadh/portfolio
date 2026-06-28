'use client'
import { useState } from 'react'

const panels = [
  { num: '01', title: 'INTERFACES', tags: 'React · Next.js · Tailwind CSS · HTML/CSS' },
  { num: '02', title: 'SYSTEMS',    tags: 'Node.js · Express.js · REST APIs · JWT/OAuth' },
  { num: '03', title: 'DATA',       tags: 'MongoDB · Mongoose · Data Modeling' },
  { num: '04', title: 'AUTOMATION', tags: 'Python · Webhooks · SEO & GEO' },
]

export default function SkillsSection() {
  return (
    <section 
      id="skills" 
      style={{ 
        padding: 'clamp(80px, 10vw, 140px) clamp(20px, 5vw, 60px)',
        maxWidth: '1240px',
        margin: '0 auto'
      }}
    >
      <style>{`
        .skills-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          margin-top: 60px;
        }
        @media (max-width: 768px) {
          .skills-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }
      `}</style>

      {/* Section label */}
      <p className="label-mono" style={{ marginBottom: 16 }}>03 / SKILLS</p>

      {/* Section heading */}
      <h2 className="section-heading" style={{
        fontFamily: "var(--font-display)",
        fontSize: 'clamp(48px, 8vw, 96px)',
        fontWeight: 900, 
        textTransform: 'uppercase',
        color: 'var(--text-black)', 
        lineHeight: 0.9,
        letterSpacing: '-0.02em',
        margin: 0
      }}>
        TECHNICAL<br />
        <span style={{ color: 'var(--accent-red)' }}>ARSENAL</span>
      </h2>

      {/* 2x2 panels */}
      <div className="skills-grid">
        {panels.map((panel, idx) => (
          <SkillPanel key={idx} {...panel} />
        ))}
      </div>
    </section>
  )
}

function SkillPanel({ num, title, tags }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(false || true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '32px 0',
        borderBottom: '1px solid var(--border)',
        cursor: 'none',
        transition: 'border-color 0.25s ease'
      }}
    >
      {/* Panel Number */}
      <span style={{
        fontFamily: 'var(--font-body)',
        fontSize: '11px',
        fontWeight: 500,
        color: 'var(--text-dim)',
        letterSpacing: '0.1em',
        display: 'block',
        marginBottom: 8
      }}>
        {num} /
      </span>

      {/* Panel Title */}
      <h3 style={{
        fontFamily: "var(--font-display)",
        fontSize: 'clamp(24px, 3.5vw, 36px)',
        fontWeight: 900,
        textTransform: 'uppercase',
        color: hovered ? 'var(--accent-red)' : 'var(--text-black)',
        transition: 'color 0.25s ease',
        marginBottom: 12,
        lineHeight: 1
      }}>
        {title}
      </h3>

      {/* Panel Tags */}
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: '13px',
        color: 'var(--text-muted)',
        lineHeight: 1.6
      }}>
        {tags}
      </p>
    </div>
  )
}

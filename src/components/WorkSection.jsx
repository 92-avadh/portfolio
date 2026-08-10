'use client'
import { useState } from 'react'

const projects = [
  {
    title: 'Hanumante Exports',
    description: 'A global trading and supply chain platform optimizing export-import workflows and logistics tracking.',
    tags: ['Next.js', 'Node.js', 'Express.js','Astro JS', 'React', 'MongoDB', 'Maps API'],
    href: 'https://hanumanteexports.com'
  },
  {
    title: 'Tesca Visa Consultancy',
    description: 'An interactive visa application and tracking portal providing real-time status updates and document checklist management.',
    tags: ['Next.js', 'MERN Stack', 'RESTful APIs', 'Tailwind', 'Astro JS'],
    href: 'https://tescavisa.com'
  },
  {
    title: 'Tesca Spoken English',
    description: 'A comprehensive English learning and institute management platform built on the MERN stack.',
    tags: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'MERN Stack'],
    href: 'https://tesca.co'
  },
  {
    title: 'Management Dashboard',
    description: 'A comprehensive administrative panel for managing users, operations, and business performance metrics.',
    tags: ['React', 'REST APIs', 'SQL / NoSQL', 'Data Analytics'],
    href: 'https://github.com/cricetclub267-spec/box-booking-management'
  }
]

export default function WorkSection() {
  return (
    <section 
      id="work" 
      style={{ 
        padding: 'clamp(80px, 10vw, 140px) clamp(20px, 5vw, 60px)',
        maxWidth: '1240px',
        margin: '0 auto'
      }}
    >
      {/* Section label */}
      <p className="label-mono" style={{ marginBottom: 16 }}>01 / SELECTED WORK</p>

      {/* Section heading */}
      <h2 className="section-heading" style={{
        fontFamily: "var(--font-display)",
        fontSize: 'clamp(48px, 8vw, 96px)',
        fontWeight: 900, 
        textTransform: 'uppercase',
        color: 'var(--text-black)', 
        marginBottom: 60, 
        lineHeight: 0.9,
        letterSpacing: '-0.02em'
      }}>
        SELECTED<br />
        <span style={{ color: 'var(--accent-red)' }}>WORK</span>
      </h2>

      {/* Project rows separated by border lines */}
      <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid var(--border)' }}>
        {projects.map((project, i) => (
          <ProjectRow key={i} {...project} index={i + 1} />
        ))}
      </div>
    </section>
  )
}

function ProjectRow({ index, title, description, tags, href }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="project-row"
      style={{
        display: 'grid',
        gridTemplateColumns: '60px 1.2fr 1fr auto',
        alignItems: 'start',
        gap: '32px',
        padding: '32px 16px',
        borderBottom: '1px solid var(--border)',
        transition: 'background 0.25s ease',
        background: hovered ? '#f5f5f5' : 'transparent',
        cursor: 'none'
      }}
    >
      <style>{`
        @media (max-width: 992px) {
          .project-row {
            grid-template-columns: 40px 1fr !important;
            gap: 20px !important;
          }
          .project-desc-col {
            grid-column: 2 / span 1 !important;
          }
          .project-link-col {
            grid-column: 2 / span 1 !important;
            justify-self: start !important;
            margin-top: 8px !important;
          }
        }
      `}</style>

      {/* Number */}
      <span style={{ 
        fontFamily: 'var(--font-body)', 
        fontSize: 12, 
        color: 'var(--text-dim)', 
        paddingTop: 4 
      }}>
        0{index}
      </span>

      {/* Title & Tags */}
      <div>
        <h3 style={{
          fontFamily: "var(--font-display)",
          fontSize: 'clamp(22px, 3vw, 32px)',
          fontWeight: 700, 
          textTransform: 'uppercase',
          color: hovered ? 'var(--accent-red)' : 'var(--text-black)',
          transition: 'color 0.25s ease', 
          marginBottom: 8,
          lineHeight: 1.15
        }}>
          {title}
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 12px' }}>
          {tags.map(tag => (
            <span key={tag} style={{
              fontFamily: 'var(--font-body)', 
              fontSize: 11,
              color: 'var(--text-dim)', 
              letterSpacing: '0.06em'
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Description */}
      <p className="project-desc-col" style={{ 
        fontSize: 14, 
        color: 'var(--text-muted)', 
        lineHeight: 1.6 
      }}>
        {description}
      </p>

      {/* Link */}
      <a 
        href={href} 
        target="_blank" 
        rel="noreferrer" 
        className="project-link-col cursor-hover"
        style={{
          fontFamily: 'var(--font-body)', 
          fontSize: 12, 
          fontWeight: 500,
          letterSpacing: '0.1em', 
          textTransform: 'uppercase',
          color: 'var(--text-black)', 
          textDecoration: 'none',
          borderBottom: '1px solid var(--text-black)',
          paddingBottom: 2, 
          whiteSpace: 'nowrap',
          justifySelf: 'end',
          alignSelf: 'start',
          marginTop: 4,
          transition: 'color 0.2s ease, border-color 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--accent-red)'
          e.currentTarget.style.color = 'var(--accent-red)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--text-black)'
          e.currentTarget.style.color = 'var(--text-black)'
        }}
      >
        GitHub ↗
      </a>
    </div>
  )
}

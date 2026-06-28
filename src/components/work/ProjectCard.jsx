'use client'
import Link from 'next/link'
import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useMagnetic } from '@/lib/useMagnetic'
import { useCursor } from '@/components/providers/CursorProvider'

/**
 * ProjectCard
 * -----------
 * thecodeman-style project card:
 *  - full-bleed gradient cover with project accent colour
 *  - "VIEW CASE" label slides up on hover
 *  - huge project name (bottom-left, shifts up on hover)
 *  - category label + tech tags
 *  - image zoom + scrim darken on hover; whole card is magnetic
 *  - cursor reads "VIEW" while hovering
 *
 * Cover art is an elegant gradient placeholder keyed to the project accent
 * until real screenshots are supplied in /public/projects/<slug>/.
 */
export function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const { x, y, onMove, onLeave } = useMagnetic(0.08)
  const { setLabel, setHover } = useCursor()

  const handleEnter = () => {
    if (project.noLink) return
    setLabel(project.externalUrl ? 'VISIT' : 'VIEW')
  }
  const handleLeave = () => { setLabel(null); onLeave() }

  const cardContent = (
    <>
      <div className="card-media" style={{
        position: 'relative', width: '100%', aspectRatio: '16 / 10',
        overflow: 'hidden', borderRadius: 2,
        background: `linear-gradient(135deg, ${project.accent}33, ${project.accent}0a 60%, #0a0a0a)`,
        border: '1px solid #232323',
      }}>
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="project-image-img"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : (
          /* Placeholder cover — monogram + category */
          <PlaceholderCover project={project} />
        )}

        {/* Scrim */}
        <div className="card-scrim" style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(10,10,10,0) 40%, rgba(10,10,10,0.85))',
          opacity: 0.9, transition: 'opacity 0.5s ease',
        }} />

        {/* Category label */}
        <div style={{
          position: 'absolute', top: 24, left: 28, right: 28,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span className="label-mono" style={{ color: 'rgba(255,255,255,0.6)' }}>
            {project.category}
          </span>
          <span className="label-mono" style={{ color: 'rgba(255,255,255,0.4)' }}>
            {project.year}
          </span>
        </div>

        {/* VIEW CASE label */}
        {!project.noLink && (
          <div className="view-case" style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -40%)',
            fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600,
            letterSpacing: '0.2em', textTransform: 'uppercase', color: '#fff',
            padding: '12px 22px', border: '1px solid rgba(255,255,255,0.5)',
            borderRadius: 999, background: 'rgba(255,255,255,0.06)',
            backdropFilter: 'blur(6px)', opacity: 0,
            transition: 'opacity 0.4s ease, transform 0.5s cubic-bezier(0.76,0,0.24,1)',
          }}>
            {project.externalUrl ? 'Visit Site ↗' : 'View Case ↗'}
          </div>
        )}
      </div>

      {/* Title block */}
      <div style={{ marginTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24 }}>
        <div>
          <h3 className="card-title" style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(30px, 4vw, 52px)',
            fontWeight: 900, textTransform: 'uppercase', lineHeight: 1, color: 'var(--text)',
            letterSpacing: '-0.02em', transition: 'color 0.3s ease',
          }}>
            {project.title}
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 14px', marginTop: 14 }}>
            {project.tags.slice(0, 4).map((tag) => (
              <span key={tag} style={{
                fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.05em',
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
        {!project.noLink && (
          <span className="card-arrow" style={{
            fontSize: 22, color: 'var(--text-dim)', transition: 'color 0.3s ease, transform 0.3s ease',
          }}>↗</span>
        )}
      </div>

      <style>{`
        .card-media { transition: transform 0.6s cubic-bezier(0.76,0,0.24,1); }
        .project-image-img { transition: transform 0.8s cubic-bezier(0.76,0,0.24,1); }
        .project-card:hover .project-image-img { transform: scale(1.04); }
        ${!project.noLink ? `
        .project-card:hover .card-media { transform: scale(1.012); }
        .project-card:hover .card-scrim { opacity: 1; }
        .project-card:hover .view-case { opacity: 1; transform: translate(-50%, -50%); }
        .project-card:hover .card-title { color: var(--accent); }
        .project-card:hover .card-arrow { color: var(--accent); transform: translate(4px, -4px); }
        ` : ''}
      `}</style>
    </>
  )

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: (index % 2) * 0.1, ease: [0.76, 0, 0.24, 1] }}
      onMouseMove={onMove} onMouseEnter={handleEnter} onMouseLeave={handleLeave}
      style={{ x, y }}
    >
      {project.noLink ? (
        <div
          className="project-card"
          ref={ref}
          style={{
            display: 'block', textDecoration: 'none', color: 'inherit',
            '--accent': project.accent,
            cursor: 'default'
          }}
        >
          {cardContent}
        </div>
      ) : project.externalUrl ? (
        <a
          href={project.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="project-card"
          ref={ref}
          style={{
            display: 'block', textDecoration: 'none', color: 'inherit',
            '--accent': project.accent,
          }}
        >
          {cardContent}
        </a>
      ) : (
        <Link
          href={`/work/${project.slug}`}
          className="project-card"
          ref={ref}
          style={{
            display: 'block', textDecoration: 'none', color: 'inherit',
            '--accent': project.accent,
          }}
        >
          {cardContent}
        </Link>
      )}
    </motion.article>
  )
}

// Decorative gradient cover with the project monogram until real art exists.
function PlaceholderCover({ project }) {
  const initials = project.title.split(' ').slice(0, 2).map((w) => w[0]).join('')
  return (
    <div style={{
      position: 'absolute', inset: 0, display: 'flex',
      alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
    }}>
      <div className="ph-glow" style={{
        position: 'absolute', width: '60%', aspectRatio: '1', borderRadius: '50%',
        background: `radial-gradient(circle, ${project.accent}40 0%, transparent 70%)`,
        filter: 'blur(30px)', transition: 'transform 0.8s ease',
      }} />
      <span style={{
        position: 'relative', fontFamily: 'var(--font-display)',
        fontSize: 'clamp(80px, 12vw, 160px)', fontWeight: 900, color: 'rgba(255,255,255,0.08)',
        letterSpacing: '-0.04em', transition: 'transform 0.8s ease',
      }} className="ph-mono">
        {initials}
      </span>
      <style>{`
        .project-card:hover .ph-mono { transform: scale(1.06); }
        .project-card:hover .ph-glow { transform: scale(1.2); }
      `}</style>
    </div>
  )
}

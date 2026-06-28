'use client'
import { useEffect, useState } from 'react'
import { socials, site } from '@/data/site'
import { useCursor } from '@/components/providers/CursorProvider'

/**
 * Footer
 * ------
 * Monogram + tagline (left), live local time (center), socials + back-to-top
 * (right). A giant "LET'S TALK" link anchors the bottom for impact.
 */
export function Footer() {
  const [time, setTime] = useState('')
  const { setHover } = useCursor()

  useEffect(() => {
    const update = () =>
      setTime(new Date().toLocaleTimeString('en-IN', {
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
        timeZone: 'Asia/Kolkata',
      }))
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <footer className="section-grid" style={{
      borderTop: '1px solid var(--border)',
      padding: '60px clamp(20px, 5vw, 60px) 40px',
      maxWidth: '100%', background: 'var(--bg)',
    }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Top row */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
          flexWrap: 'wrap', gap: 32, paddingBottom: 48, borderBottom: '1px solid var(--border)',
        }}>
          <div>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 900, color: 'var(--text)' }}>
              {site.monogram}<span style={{ color: 'var(--accent)' }}>.</span>
            </span>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 6 }}>
              {site.role} · {site.intro}
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <p className="label-mono" style={{ marginBottom: 6, color: 'var(--text-dim)' }}>Surat, IN · Now</p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--text)', letterSpacing: '0.05em' }}>
              {time || '--:--:--'}
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end' }}>
            {socials.map(({ label, href }) => (
              <a key={label} href={href} target={href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer"
                onMouseEnter={(e) => {
                  setHover(true)
                  e.currentTarget.style.borderColor = 'var(--text)'
                  e.currentTarget.style.color = 'var(--text)'
                }}
                onMouseLeave={(e) => {
                  setHover(false)
                  e.currentTarget.style.borderColor = 'transparent'
                  e.currentTarget.style.color = 'var(--text-muted)'
                }}
                style={{
                  fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-muted)',
                  textDecoration: 'none', letterSpacing: '0.05em', paddingBottom: 2,
                  borderBottom: '1px solid transparent', transition: 'all 0.2s ease',
                }}
              >
                {label} ↗
              </a>
            ))}
          </div>
        </div>

        {/* Giant CTA */}
        <a href="#contact"
          onMouseEnter={(e) => {
            setHover(true)
            e.currentTarget.style.color = 'var(--accent)'
          }}
          onMouseLeave={(e) => {
            setHover(false)
            e.currentTarget.style.color = 'var(--text)'
          }}
          style={{
            display: 'block', textAlign: 'center', padding: '40px 0 20px',
            textDecoration: 'none', fontFamily: 'var(--font-display)',
            fontSize: 'clamp(56px, 16vw, 200px)', fontWeight: 900, textTransform: 'uppercase',
            lineHeight: 0.9, letterSpacing: '-0.03em', color: 'var(--text)', transition: 'color 0.3s ease',
          }}
        >
          Let&apos;s talk
        </a>

        {/* Bottom bar */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 12, paddingTop: 24, borderTop: '1px solid var(--border)',
        }}>
          <p style={{ fontSize: 12, color: 'var(--text-dim)' }}>
            © {site.year} {site.name}. All rights reserved.
          </p>
          <a href="#home"
            onMouseEnter={(e) => {
              setHover(true)
              e.currentTarget.style.borderColor = 'var(--text)'
              e.currentTarget.style.color = 'var(--text)'
            }}
            onMouseLeave={(e) => {
              setHover(false)
              e.currentTarget.style.borderColor = 'transparent'
              e.currentTarget.style.color = 'var(--text-muted)'
            }}
            style={{
              fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-muted)',
              textDecoration: 'none', letterSpacing: '0.05em', textTransform: 'uppercase',
              borderBottom: '1px solid transparent', transition: 'all 0.2s ease',
            }}
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  )
}

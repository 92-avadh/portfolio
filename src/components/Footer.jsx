'use client'

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '32px clamp(20px, 5vw, 60px)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      maxWidth: '1240px',
      margin: '0 auto',
      flexWrap: 'wrap',
      gap: '16px'
    }}>
      <div>
        <span style={{ 
          fontFamily: 'var(--font-body)', 
          fontSize: 14, 
          fontWeight: 700, 
          color: 'var(--text-black)' 
        }}>
          AD<span style={{ color: 'var(--accent-red)' }}>.</span>
        </span>
        <p style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 4, fontFamily: 'var(--font-body)' }}>
          Full-Stack Developer · MERN &amp; Next.js
        </p>
      </div>
      <p style={{ 
        fontSize: 12, 
        color: 'var(--text-dim)', 
        fontFamily: 'var(--font-body)',
        margin: 0
      }}>
        &copy; 2026 Avadh Dhameliya
      </p>
    </footer>
  )
}

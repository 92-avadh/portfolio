'use client'

export default function AboutSection() {
  return (
    <section 
      id="about" 
      style={{ 
        padding: 'clamp(80px, 10vw, 140px) clamp(20px, 5vw, 60px)',
        maxWidth: '1240px',
        margin: '0 auto'
      }}
    >
      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: start;
        }
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }
      `}</style>

      <p className="label-mono" style={{ marginBottom: 16 }}>02 / ABOUT</p>

      <div className="about-grid">
        {/* Left — big heading */}
        <h2 className="section-heading" style={{
          fontFamily: "var(--font-display)",
          fontSize: 'clamp(40px, 6vw, 72px)',
          fontWeight: 900, 
          textTransform: 'uppercase',
          color: 'var(--text-black)', 
          lineHeight: 0.95, 
          letterSpacing: '-0.02em',
          margin: 0
        }}>
          REAL<br />
          PROBLEMS.<br />
          <span style={{ color: 'var(--accent-red)' }}>REAL</span><br />
          SOLUTIONS.
        </h2>

        {/* Right — body text */}
        <div>
          <p style={{ 
            fontSize: 16, 
            color: 'var(--text-muted)', 
            lineHeight: 1.8, 
            marginBottom: 20,
            fontFamily: 'var(--font-body)'
          }}>
            I&apos;m <strong style={{ color: 'var(--text-black)', fontWeight: 600 }}>Avadh Dhameliya</strong>, a full-stack developer
            who builds products end to end — from interface to database to deployment.
          </p>
          <p style={{ 
            fontSize: 16, 
            color: 'var(--text-muted)', 
            lineHeight: 1.8, 
            marginBottom: 20,
            fontFamily: 'var(--font-body)'
          }}>
            Currently pursuing my Bachelor of Computer Application (BCA) at SDJ International College, Surat, graduating in 2026.
            I don&apos;t just build prototypes; I ship real, high-performance web systems.
          </p>
          <p style={{ 
            fontSize: 13, 
            fontWeight: 500, 
            letterSpacing: '0.06em', 
            color: 'var(--text-dim)', 
            textTransform: 'uppercase',
            fontFamily: 'var(--font-body)',
            marginTop: 32
          }}>
            Based in Surat, Gujarat · Working Worldwide
          </p>
        </div>
      </div>
    </section>
  )
}

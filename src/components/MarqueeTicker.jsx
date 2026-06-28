'use client'

const skills = [
  'MERN Stack', 'Next.js', 'Node.js', 'Express', 'MongoDB', 
  'Python', 'REST APIs', 'SEO & GEO', 'Automation'
]

export default function MarqueeTicker() {
  // Duplicate array three times to guarantee seamless scrolling overflow width
  const items = [...skills, ...skills, ...skills]

  return (
    <div className="ticker-wrap">
      <style>{`
        .ticker-wrap {
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          padding: 14px 0;
          overflow: hidden;
          background: #ffffff;
          margin: 60px 0;
          width: 100vw;
          position: relative;
          left: 50%;
          right: 50%;
          margin-left: -50vw;
          margin-right: -50vw;
        }
        .ticker-track {
          display: flex;
          width: max-content;
          animation: ticker-scroll 22s linear infinite;
          will-change: transform;
        }
        .ticker-track:hover {
          animation-play-state: paused;
        }
        @keyframes ticker-scroll {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .ticker-item {
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--text-muted);
          padding: 0 28px;
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 28px;
        }
        .ticker-dot {
          color: var(--accent-red);
          font-weight: bold;
        }
      `}</style>
      <div className="ticker-track">
        {items.map((skill, idx) => (
          <div key={idx} className="ticker-item">
            <span>{skill}</span>
            <span className="ticker-dot">·</span>
          </div>
        ))}
      </div>
    </div>
  )
}

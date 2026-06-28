'use client'

/**
 * SectionLabel
 * ------------
 * The "01 / SELECTED WORK" style mono label that tops each section.
 * Pairs a number/index with a label, separated by a thin rule.
 */
export function SectionLabel({ index, children, style, className = '' }) {
  return (
    <div className={`section-label ${className}`} style={style}>
      <style>{`
        .section-label {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--text-muted);
        }
        .section-label .dash {
          width: 32px;
          height: 1px;
          background: var(--border);
        }
      `}</style>
      <span style={{ color: 'var(--accent)' }}>{index}</span>
      <span className="dash" />
      <span>{children}</span>
    </div>
  )
}

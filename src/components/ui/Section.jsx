'use client'

/**
 * Section
 * -------
 * Themed section wrapper. Applies the light/dark theme class so CSS vars flip
 * for that section's subtree, plus optional grid backdrop + consistent gutters.
 *
 * - `theme`: 'light' (default) | 'dark'
 * - `grid`: show the + grid backdrop
 * - `id`: anchor id
 */
export function Section({ id, theme = 'light', grid = false, className = '', style, children }) {
  const classes = [
    theme === 'dark' ? 'theme-dark' : '',
    grid ? 'section-grid' : '',
    className,
  ].filter(Boolean).join(' ')

  return (
    <section
      id={id}
      className={classes}
      style={{
        background: 'var(--bg)',
        color: 'var(--text)',
        padding: 'clamp(90px, 12vw, 160px) clamp(20px, 5vw, 60px)',
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}
    >
      <div style={{ maxWidth: 1240, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </section>
  )
}

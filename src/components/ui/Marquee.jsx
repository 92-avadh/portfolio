'use client'
import { useEffect, useRef, useId } from 'react'

/**
 * Marquee
 * -------
 * Full-bleed infinite ticker. Scrolls right-to-left continuously and loops
 * seamlessly (content duplicated, track translated a precise -50%).
 *
 * - `items`: array of strings
 * - `separator`: string shown between items (default '·' in accent)
 * - `speed`: animation duration in seconds
 * - `variant`: 'mono' (small uppercase labels) | 'display' (big display text)
 * - `fullBleed`: when true the strip spans the viewport edge-to-edge
 * - `theme`: 'default' | 'red' — red gives a bold red background with white text
 */
export function Marquee({
  items,
  separator = '·',
  speed = 26,
  variant = 'mono',
  fullBleed = true,
  theme = 'default',
  className = '',
}) {
  // Stable ID that doesn't change between SSR and client hydration.
  // React's useId() can differ between server and client in Next.js, breaking
  // the CSS class matching and causing the animation to not apply.
  const reactId = useId()
  const idRef = useRef(null)
  if (!idRef.current) {
    // Generate a stable hash once — only on first render
    idRef.current = 'mq-' + reactId.replace(/:/g, '').slice(0, 8)
  }
  const id = idRef.current

  // Duplicate the content exactly once. Translating the track by a precise
  // -50% then advances by exactly one copy, so the loop is perfectly seamless
  // (no rounding drift, no visible jump or reset).
  const loop = [...items, ...items]
  const isDisplay = variant === 'display'
  const isRed = theme === 'red'

  // Theme-driven colors
  const textColor = isRed
    ? '#ffffff'
    : isDisplay ? 'var(--text)' : 'var(--text-muted)'
  const dotColor = isRed ? 'rgba(255,255,255,0.5)' : 'var(--accent)'
  const wrapBg = isRed ? '#dc2626' : 'var(--bg)'
  const wrapBorder = isRed ? 'none' : '1px solid var(--border)'

  // Inject styles into document.head via useEffect so they survive
  // hydration mismatches and apply reliably even when the component
  // is conditionally rendered.
  useEffect(() => {
    const styleId = `style-${id}`
    // Prevent duplicate style injection
    if (document.getElementById(styleId)) return

    const styleEl = document.createElement('style')
    styleEl.id = styleId
    styleEl.textContent = `
      .${id}-track {
        display: flex;
        width: max-content;
        animation: ${id}-scroll ${speed}s linear infinite;
        will-change: transform;
      }
      @keyframes ${id}-scroll {
        from { transform: translate3d(0, 0, 0); }
        to   { transform: translate3d(-50%, 0, 0); }
      }
      .${id}-item {
        display: flex;
        align-items: center;
        gap: ${isDisplay ? '0.5em' : '1.75rem'};
        padding: 0 ${isDisplay ? '0.4em' : '1.75rem'};
        white-space: nowrap;
      }
      .${id}-text {
        font-family: ${isDisplay ? 'var(--font-display)' : 'var(--font-body)'};
        font-size: ${isDisplay ? 'clamp(40px, 9vw, 120px)' : '13px'};
        font-weight: ${isDisplay ? '800' : '600'};
        letter-spacing: ${isDisplay ? '-0.02em' : '0.16em'};
        text-transform: uppercase;
        color: ${textColor};
        line-height: 1;
      }
      .${id}-dot {
        color: ${dotColor};
        font-weight: bold;
        font-size: ${isDisplay ? '0.5em' : '1em'};
        opacity: ${isDisplay ? '0.7' : '1'};
      }
      .${id}-wrap {
        width: 100vw;
        position: relative;
        left: 50%;
        right: 50%;
        margin-left: -50vw;
        margin-right: -50vw;
        overflow: hidden;
        padding: ${isDisplay ? '18px 0' : '16px 0'};
        border-top: ${wrapBorder};
        border-bottom: ${wrapBorder};
        background: ${wrapBg};
      }
      @media (prefers-reduced-motion: reduce) {
        .${id}-track { animation: none; }
      }
    `
    document.head.appendChild(styleEl)

    return () => {
      document.head.removeChild(styleEl)
    }
  }, [id, speed, isDisplay, isRed, textColor, dotColor, wrapBorder, wrapBg])

  const strip = (
    <div className={`${id}-track`}>
      {loop.map((item, idx) => (
        <span key={idx} className={`${id}-item`}>
          <span className={`${id}-text`}>{item}</span>
          <span className={`${id}-dot`}>{separator}</span>
        </span>
      ))}
    </div>
  )

  if (!fullBleed) {
    return <div className={className} style={{ overflow: 'hidden' }}>{strip}</div>
  }

  return (
    <div className={`${id}-wrap ${className}`}>
      {strip}
    </div>
  )
}

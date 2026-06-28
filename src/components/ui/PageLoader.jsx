'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

/**
 * PageLoader
 * ----------
 * Cinematic boot sequence on first load of a session:
 *   "INITIALIZING_SYSTEM" boot line → AD monogram → counter 0–100 → wipe out.
 * Skipped on repeat loads (sessionStorage gate).
 */
export function PageLoader() {
  const loaderRef = useRef(null)
  const monogramRef = useRef(null)
  const lineRef = useRef(null)
  const counterRef = useRef(null)
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const loaded = sessionStorage.getItem('portfolio-loaded')
    if (loaded) {
      loaderRef.current?.remove()
      return
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      loaderRef.current?.remove()
      sessionStorage.setItem('portfolio-loaded', 'true')
      return
    }

    // Boot line + monogram fade in.
    const tl = gsap.timeline()
    tl.from(lineRef.current, { opacity: 0, duration: 0.3, ease: 'power2.out' })
      .from(monogramRef.current, { opacity: 0, y: 8, duration: 0.4, ease: 'power2.out' }, '-=0.1')

    // Count up 0 → 100 over ~1.2s.
    const counter = { val: 0 }
    tl.to(counter, {
      val: 100,
      duration: 1.2,
      ease: 'power2.inOut',
      onUpdate: () => setPct(Math.round(counter.val)),
    }, 0)

    // Hold, then wipe out.
    tl.to([lineRef.current, counterRef.current], {
      opacity: 0, duration: 0.3, delay: 0.2,
    })
      .to(monogramRef.current, { opacity: 0, scale: 1.1, duration: 0.3 }, '-=0.1')
      .to(loaderRef.current, {
        scaleY: 0,
        duration: 0.9,
        ease: 'power4.inOut',
        transformOrigin: 'top center',
        onComplete: () => {
          sessionStorage.setItem('portfolio-loaded', 'true')
          loaderRef.current?.remove()
        },
      }, '-=0.1')

    return () => { tl.kill() }
  }, [])

  return (
    <div
      ref={loaderRef}
      style={{
        position: 'fixed', inset: 0, background: '#0a0a0a', zIndex: 9999,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        fontFamily: 'var(--font-body)',
      }}
    >
      <div ref={monogramRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <span style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(56px, 12vw, 140px)',
          fontWeight: 900, color: '#f5f5f5', lineHeight: 1, letterSpacing: '-0.02em',
        }}>
          AD<span style={{ color: '#ff3b30' }}>.</span>
        </span>
      </div>

      <div ref={lineRef} style={{
        marginTop: 28, fontSize: 11, letterSpacing: '0.3em',
        color: '#565656', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <span style={{
          display: 'inline-block', width: 7, height: 7, borderRadius: '50%',
          background: '#ff3b30', animation: 'loader-blink 1s steps(1) infinite',
        }} />
        INITIALIZING_SYSTEM
        <style>{`@keyframes loader-blink { 50% { opacity: 0.2 } }`}</style>
      </div>

      <div ref={counterRef} style={{
        position: 'absolute', bottom: 40, right: 48,
        fontFamily: 'var(--font-mono)', fontSize: 12, color: '#565656',
      }}>
        {String(pct).padStart(3, '0')}%
      </div>
    </div>
  )
}

'use client'
import { useEffect, useRef } from 'react'
import { useCursor } from '@/components/providers/CursorProvider'

/**
 * CustomCursor
 * ------------
 * Two-layer cursor:
 *   - dot:   tiny core, snaps to pointer, mix-blend-mode: difference
 *   - ring:  lerped outline that grows on hover and morphs into a filled red
 *            disc carrying a context label ("VIEW" / "CASE" / "DRAG" / "OPEN")
 *            when a component requests one via the CursorProvider.
 *
 * Touch devices fall back to the native cursor (handled in globals.css).
 */
export function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const { state } = useCursor()

  const pos = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canHover = window.matchMedia('(hover: hover)').matches
    if (!canHover) return

    document.body.classList.add('has-custom-cursor')

    let hasMoved = false

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
      }
      if (!hasMoved) {
        hasMoved = true
        if (dotRef.current) dotRef.current.style.opacity = '1'
        if (ringRef.current) ringRef.current.style.opacity = '1'
      }
    }
    window.addEventListener('mousemove', onMove)

    let raf
    const loop = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.16
      ring.current.y += (pos.current.y - ring.current.y) * 0.16
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0)`
      }
      raf = requestAnimationFrame(loop)
    }
    loop()

    // Hide native cursor while leaving the viewport.
    const onLeave = () => {
      if (ringRef.current) ringRef.current.style.opacity = '0'
      if (dotRef.current) dotRef.current.style.opacity = '0'
    }
    const onEnter = () => {
      if (hasMoved) {
        if (ringRef.current) ringRef.current.style.opacity = '1'
        if (dotRef.current) dotRef.current.style.opacity = '1'
      }
    }
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      document.body.classList.remove('has-custom-cursor')
    }
  }, [])

  // React to cursor context state (hover / label) by toggling classes.
  const label = state && state.label ? state.label : null
  const ringClass = `cursor-ring${label ? ' is-label' : state === 'text-hover' ? ' is-text-hover' : state === 'hover' ? ' is-hover' : ''}`

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{
          opacity: state === 'text-hover' ? 0 : undefined,
          transition: 'opacity 0.15s ease',
        }}
      />
      <div ref={ringRef} className={ringClass}>
        <span className="cursor-label-text">{label}</span>
      </div>
    </>
  )
}

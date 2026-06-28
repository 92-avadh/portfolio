'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '@/lib/motion'

/**
 * Counter
 * -------
 * Counts up from 0 to `value` exactly once, the first time it scrolls into
 * view. Uses GSAP ScrollTrigger (more reliable with Lenis smooth scroll and
 * elements inside containers with overflow:hidden/clip). Supports decimals,
 * prefix, and suffix. Respects reduced-motion (renders final value immediately).
 *
 * `start` is an optional gate: while it is explicitly `false` the counter
 * stays at 0 and does not observe; once it is anything else the observer is
 * armed and fires a single time when the element becomes visible.
 */
export function Counter({ value, decimals = 0, prefix = '', suffix = '', duration = 1.6, style, className, start = true }) {
  const ref = useRef(null)
  const hasRun = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el || hasRun.current) return

    const format = (n) =>
      `${prefix}${n.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}${suffix}`

    // Gate closed → hold at zero until the parent opens it.
    if (start === false) {
      el.textContent = format(0)
      return
    }

    hasRun.current = true

    // Reduced-motion: show final value immediately
    if (prefersReducedMotion()) {
      el.textContent = format(value)
      return
    }

    // Use GSAP ScrollTrigger instead of raw IntersectionObserver.
    // ScrollTrigger integrates with Lenis smooth scroll and works correctly
    // even when elements are inside containers with overflow:hidden/clip.
    const ctx = gsap.context(() => {
      const obj = { val: 0 }
      gsap.to(obj, {
        val: value,
        duration,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true, // Only fire once
        },
        onUpdate: () => {
          el.textContent = format(obj.val)
        },
      })
    })

    return () => {
      ctx.revert()
    }
  }, [value, decimals, prefix, suffix, duration, start])

  return (
    <span ref={ref} className={className} style={style}>
      {`${prefix}0${suffix}`}
    </span>
  )
}

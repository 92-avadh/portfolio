'use client'
import { useMotionValue, useSpring } from 'framer-motion'
import { prefersReducedMotion } from '@/lib/motion'

/**
 * useMagnetic
 * -----------
 * Spring-tracks pointer offset and returns motion values + handlers for a
 * "magnetic" element that gently follows the cursor. Used by MagneticButton.
 *
 * @param {number} strength  how far the element drifts toward the cursor (px)
 * @returns {{ x, y, onMove, onLeave }}
 */
export function useMagnetic(strength = 0.35) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 250, damping: 18, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 250, damping: 18, mass: 0.4 })

  const onMove = (e) => {
    if (prefersReducedMotion()) return
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const relX = e.clientX - (rect.left + rect.width / 2)
    const relY = e.clientY - (rect.top + rect.height / 2)
    x.set(relX * strength)
    y.set(relY * strength)
  }

  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  return { x: springX, y: springY, onMove, onLeave }
}

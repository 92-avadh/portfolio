// Shared motion primitives used across the site.
// GSAP easings + Framer Motion variants — single source of truth.

// The signature "expo out" curve both reference sites lean on.
export const EASE_EXPO = [0.76, 0, 0.24, 1]
export const EASE_OUT_QUART = [0.215, 0.61, 0.355, 1]
export const EASE_IN_OUT = [0.65, 0, 0.35, 1]

/* ---------- Framer Motion variants ---------- */

// Slide-up + fade reveal for section bodies.
export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_EXPO },
  },
}

export const staggerParent = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
}

export const staggerChild = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_EXPO },
  },
}

/* ---------- GSAP easing strings ---------- */
export const GSAP_EASE_EXPO = 'power4.out'
export const GSAP_EASE_POWER3 = 'power3.out'

/* ---------- Reduced-motion guard ---------- */
export function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

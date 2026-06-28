'use client'
import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * MotionProvider
 * --------------
 * Registers GSAP plugins exactly once at the app root and normalises global
 * motion setup. Keeps individual components from re-registering ScrollTrigger.
 */
export function MotionProvider({ children }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    ScrollTrigger.config({ ignoreMobileResize: true })
  }, [])

  return <>{children}</>
}

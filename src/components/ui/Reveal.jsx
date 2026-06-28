'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import { prefersReducedMotion, GSAP_EASE_EXPO } from '@/lib/motion'

gsap.registerPlugin(ScrollTrigger)

/**
 * Reveal
 * ------
 * Fades + slides children up when scrolled into view, once.
 * Respects prefers-reduced-motion (renders instantly).
 */
export function Reveal({ children, delay = 0, y = 40, className = '', as: Tag = 'div', style }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion()) {
      gsap.set(el, { opacity: 1, y: 0 })
      return
    }
    gsap.set(el, { opacity: 0, y })
    const tween = gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      delay,
      ease: GSAP_EASE_EXPO,
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    })
    return () => {
      tween.scrollTrigger && tween.scrollTrigger.kill()
      tween.kill()
    }
  }, [delay, y])

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  )
}

/**
 * SplitHeading
 * ------------
 * Splits a heading into characters/words (split-type) and staggers them up
 * on scroll — the signature reveal both reference sites use.
 *
 * Props:
 * - `split`: 'chars' | 'words' (default 'chars')
 * - `accentIndices`: array of word indices to colour in the accent.
 */
export function SplitHeading({
  children,
  as: Tag = 'h2',
  split = 'chars',
  accentIndices = [],
  className = '',
  style,
  delay = 0,
}) {
  const ref = useRef(null)

  // Capture the raw text node so accent colouring survives the split.
  const nodes = Array.isArray(children) ? children : [children]

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion()) return

    const splitInstance = new SplitType(el, {
      types: split === 'words' ? 'words' : 'chars,words',
      tagName: 'span',
    })

    const targets = split === 'words' ? splitInstance.words : splitInstance.chars
    gsap.set(targets, { opacity: 0, yPercent: 100 })
    const tween = gsap.to(targets, {
      opacity: 1,
      yPercent: 0,
      duration: 0.8,
      ease: GSAP_EASE_EXPO,
      stagger: split === 'words' ? 0.08 : 0.025,
      delay,
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    })

    return () => {
      tween.scrollTrigger && tween.scrollTrigger.kill()
      tween.kill()
      splitInstance.revert()
    }
  }, [split, delay])

  return (
    <Tag ref={ref} className={`split-heading ${className}`} style={style}>
      {nodes.map((node, i) => {
        if (typeof node !== 'string') return node
        const words = node.split(/(\s+)/)
        return words.map((word, wi) => {
          // Track real word index (skip pure-whitespace tokens).
          if (/^\s+$/.test(word)) return word
          return (
            <span
              key={`${i}-${wi}`}
              style={{ color: accentIndices.includes(wi) ? 'var(--accent)' : 'inherit', display: 'inline-block' }}
            >
              {word}
            </span>
          )
        })
      })}
    </Tag>
  )
}

'use client'
import { useEffect, useRef, useState, useCallback } from 'react'

/**
 * ScrambleStatement
 * -----------------
 * A bold, full-width manifesto-style text block with a gorgeous, slow
 * text-scramble reveal effect. Resolves from left to right.
 *
 * Features:
 * - Specific words highlighted in red (accent color).
 * - Random scramble characters are only uppercase letters (A-Z).
 * - Original spaces are preserved and never scrambled.
 * - Triggered automatically via IntersectionObserver when scrolled into view,
 *   or controlled manually via the `start` prop.
 * - Speeds and steps are optimized to be highly visible and pleasing to the user.
 */
export default function ScrambleStatement({
  segments = [],
  revealSpeed = 40,      // ms between updates (slower = more visible)
  resolveCount = 2,      // how many characters to resolve per step (controls duration)
  start = true           // optional trigger
}) {
  // Reassemble the full plain text and map characters to their segment formats
  const fullText = segments.map(s => s.text).join('')
  const textLength = fullText.length

  const glyphs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const randomGlyph = () => glyphs[Math.floor(Math.random() * glyphs.length)]

  // ── States ──
  const [revealIndex, setRevealIndex] = useState(0)
  const [scrambleTick, setScrambleTick] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)

  const timerRef = useRef(null)
  const containerRef = useRef(null)

  // ── Start the reveal ──
  const startReveal = useCallback(() => {
    if (hasStarted) return
    setHasStarted(true)
    setRevealIndex(0)
  }, [hasStarted])

  // ── Trigger via IntersectionObserver ──
  useEffect(() => {
    if (!start) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startReveal()
          }
        })
      },
      { threshold: 0.1 }
    )
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [start, startReveal])

  // ── Trigger if start prop changes to true ──
  useEffect(() => {
    if (start) {
      startReveal()
    }
  }, [start, startReveal])

  // ── Scramble loop ──
  useEffect(() => {
    if (!hasStarted) return

    timerRef.current = setInterval(() => {
      setRevealIndex((prev) => {
        if (prev >= textLength) {
          clearInterval(timerRef.current)
          return textLength
        }
        return prev + resolveCount
      })
      // Increment tick to force randomizing the active scramble characters
      setScrambleTick((t) => t + 1)
    }, revealSpeed)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [hasStarted, textLength, revealSpeed, resolveCount])

  // Helper to split segments back into spans for rendering with correct styling
  let charGlobalIndex = 0

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(36px, 6.5vw, 90px)',
          fontWeight: 900,
          textTransform: 'uppercase',
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
          color: 'var(--text)',
        }}
      >
        {segments.map((seg, segIdx) => {
          const chars = seg.text.split('')
          return (
            <span
              key={segIdx}
              style={{
                color: seg.accent ? 'var(--accent)' : 'inherit',
              }}
            >
              {chars.map((origChar, charIdx) => {
                const globalIdx = charGlobalIndex
                charGlobalIndex++

                // If resolved, show original char
                if (globalIdx < revealIndex) {
                  return origChar
                }

                // If space, preserve it
                if (origChar === ' ') {
                  return ' '
                }

                // Otherwise, show cycling scramble uppercase character
                return (
                  <span
                    key={`${globalIdx}-${scrambleTick}`}
                    style={{
                      color: 'var(--accent)',
                      opacity: 0.65,
                      fontFamily: 'monospace',
                    }}
                  >
                    {randomGlyph()}
                  </span>
                )
              })}
            </span>
          )
        })}
      </div>
    </div>
  )
}

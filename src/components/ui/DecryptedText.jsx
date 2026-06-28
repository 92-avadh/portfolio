'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import './DecryptedText.css'

/**
 * DecryptedText
 * -------------
 * A text scramble / decoder animation.
 *
 * Modes:
 * 1. Standard — scrambles on hover or view, then settles into the original text.
 * 2. Persistent — first reveals the full text (left-to-right), then continuously
 *    scrambles a few random characters in red, infinitely.
 *
 * Props:
 * - persistentScramble  : enables mode 2
 * - persistentCount     : how many characters to keep scrambling (default 6)
 * - persistentSpeed     : ms between persistent glyph swaps (default 80)
 */
export default function DecryptedText({
  text,
  speed = 40,
  maxIterations = 10,
  sequential = true,
  revealDirection = 'start', // 'start' | 'end' | 'center'
  animateOn = 'hover',       // 'hover' | 'view'
  persistentScramble = false,
  persistentCount = 6,
  persistentSpeed = 80,
  className = '',
  parentClassName = '',
  encryptedClassName = '',
  decryptedClassName = '',
  ...props
}) {
  // --- character-level state for the persistent mode ---
  const [chars, setChars] = useState(() => text.split(''))
  const [scrambledIndices, setScrambledIndices] = useState(new Set())

  // --- simple string state for the non-persistent (legacy) mode ---
  const [displayText, setDisplayText] = useState(text)

  const [isAnimating, setIsAnimating] = useState(false)
  const [revealed, setRevealed] = useState(false)

  const intervalRef = useRef(null)
  const persistentRef = useRef(null)
  const triggerRef = useRef(null)

  const glyphs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const randomGlyph = () => glyphs[Math.floor(Math.random() * glyphs.length)]

  // ── Pick N random non-space indices ──
  const pickRandomIndices = useCallback((count) => {
    const candidates = []
    for (let i = 0; i < text.length; i++) {
      if (text[i] !== ' ') candidates.push(i)
    }
    // Shuffle and pick
    for (let i = candidates.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [candidates[i], candidates[j]] = [candidates[j], candidates[i]]
    }
    return new Set(candidates.slice(0, Math.min(count, candidates.length)))
  }, [text])

  // ── Start the infinite persistent scramble ──
  const startPersistent = useCallback(() => {
    if (persistentRef.current) clearInterval(persistentRef.current)

    // Pick which indices to scramble
    let activeIndices = pickRandomIndices(persistentCount)
    setScrambledIndices(activeIndices)
    let tickCount = 0

    persistentRef.current = setInterval(() => {
      tickCount++

      // Every ~30 ticks, re-pick which indices are scrambled for variety
      if (tickCount % 30 === 0) {
        activeIndices = pickRandomIndices(persistentCount)
        setScrambledIndices(activeIndices)
      }

      setChars(() => {
        return text.split('').map((original, i) => {
          if (activeIndices.has(i)) return randomGlyph()
          return original
        })
      })
    }, persistentSpeed)
  }, [text, persistentCount, persistentSpeed, pickRandomIndices])

  // ── Initial reveal scramble (shared by both modes) ──
  const scramble = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setIsAnimating(true)
    setRevealed(false)

    let iteration = 0
    const textLen = text.length

    intervalRef.current = setInterval(() => {
      const newChars = text.split('').map((char, index) => {
        if (char === ' ') return ' '

        let shouldReveal = false

        if (sequential) {
          if (revealDirection === 'start') {
            shouldReveal = index < iteration
          } else if (revealDirection === 'end') {
            shouldReveal = index >= textLen - iteration
          } else if (revealDirection === 'center') {
            const mid = Math.floor(textLen / 2)
            const dist = Math.abs(index - mid)
            shouldReveal = dist < iteration
          }
        } else {
          shouldReveal = iteration >= maxIterations
        }

        if (shouldReveal) return char
        return randomGlyph()
      })

      if (persistentScramble) {
        setChars(newChars)
      } else {
        setDisplayText(newChars.join(''))
      }

      const done = sequential
        ? iteration >= textLen
        : iteration >= maxIterations

      if (done) {
        clearInterval(intervalRef.current)
        setIsAnimating(false)
        setRevealed(true)

        if (persistentScramble) {
          setChars(text.split(''))
          // Small delay then start persistent scramble
          setTimeout(() => startPersistent(), 300)
        } else {
          setDisplayText(text)
        }
      }

      iteration += 1
    }, speed)
  }, [text, speed, maxIterations, sequential, revealDirection, persistentScramble, startPersistent])

  // ── Trigger on viewport entry ──
  useEffect(() => {
    if (animateOn === 'view') {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              scramble()
            }
          })
        },
        { threshold: 0.1 }
      )
      if (triggerRef.current) observer.observe(triggerRef.current)
      return () => observer.disconnect()
    }
  }, [text, animateOn, scramble])

  // ── Trigger scramble when text value changes ──
  useEffect(() => {
    scramble()
  }, [text])

  // ── Cleanup on unmount ──
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (persistentRef.current) clearInterval(persistentRef.current)
    }
  }, [])

  const handleMouseEnter = () => {
    if (animateOn === 'hover' && !isAnimating) {
      scramble()
    }
  }

  // ── Persistent mode render (char-level control) ──
  if (persistentScramble) {
    return (
      <span
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        className={parentClassName}
        style={{ display: 'inline', cursor: 'default' }}
        {...props}
      >
        {chars.map((char, index) => {
          const isOriginal = char === text[index]
          const isScrambling = revealed && scrambledIndices.has(index) && !isOriginal
          return (
            <span
              key={index}
              className={`${className} ${
                isOriginal ? decryptedClassName : encryptedClassName
              }`}
              style={isScrambling ? {
                color: 'var(--accent)',
                fontFamily: 'monospace',
                opacity: 0.9,
              } : undefined}
            >
              {char}
            </span>
          )
        })}
      </span>
    )
  }

  // ── Standard mode render (legacy) ──
  return (
    <span
      ref={triggerRef}
      onMouseEnter={handleMouseEnter}
      className={parentClassName}
      style={{ display: 'inline-block', cursor: 'default' }}
      {...props}
    >
      {displayText.split('').map((char, index) => {
        const isOriginal = char === text[index]
        return (
          <span
            key={index}
            className={`${className} ${
              isOriginal ? decryptedClassName : encryptedClassName
            }`}
          >
            {char}
          </span>
        )
      })}
    </span>
  )
}

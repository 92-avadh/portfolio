'use client'
import { useState, useEffect } from 'react'
import { site } from '@/data/site'
import { AnimatePresence, motion } from 'framer-motion'
import { EASE_EXPO } from '@/lib/motion'

/**
 * GreetingCycle
 * -------------
 * Cycles through multilingual greetings with a masked vertical slide,
 * matching thecodeman's hero greeting. Each word slides up + out as the
 * next slides up + in.
 */
export function GreetingCycle() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % site.greetings.length)
    }, 2400)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{
      position: 'relative', height: '1.4em', overflow: 'hidden',
      display: 'inline-block', minWidth: '6ch',
    }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: '110%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-110%', opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE_EXPO }}
          style={{
            display: 'inline-block', fontFamily: 'var(--font-body)',
            fontSize: 13, fontWeight: 500, letterSpacing: '0.22em',
            color: 'var(--text)', whiteSpace: 'nowrap',
          }}
        >
          {site.greetings[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

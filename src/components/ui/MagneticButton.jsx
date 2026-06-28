'use client'
import { motion } from 'framer-motion'
import { useMagnetic } from '@/lib/useMagnetic'
import { useCursor } from '@/components/providers/CursorProvider'

/**
 * MagneticButton
 * --------------
 * Wraps any clickable content. The element springs toward the cursor on hover.
 * Renders an <a> when `href` is given, otherwise a <button>.
 *
 * - `cursorLabel`: optional context label pushed to the custom cursor ("VIEW").
 * - `cursorHover`: when true (default) the cursor enlarges on hover.
 */
export function MagneticButton({
  children,
  href,
  onClick,
  strength = 0.35,
  cursorLabel,
  cursorHover = true,
  className = '',
  style,
  ...rest
}) {
  const { x, y, onMove, onLeave } = useMagnetic(strength)
  const { setHover, setLabel } = useCursor()

  const handleEnter = () => {
    if (cursorLabel) setLabel(cursorLabel)
    else if (cursorHover) setHover(true)
  }
  const handleLeave = () => {
    if (cursorLabel) setLabel(null)
    else if (cursorHover) setHover(false)
    onLeave()
  }

  const commonProps = {
    onMouseMove: onMove,
    onMouseEnter: handleEnter,
    onMouseLeave: handleLeave,
    className,
    style,
    ...rest,
  }

  const motionStyle = { display: 'inline-flex', x, y, willChange: 'transform' }

  if (href) {
    return (
      <motion.a href={href} style={{ ...motionStyle, ...style }} {...commonProps}>
        {children}
      </motion.a>
    )
  }
  return (
    <motion.button onClick={onClick} style={{ ...motionStyle, ...style }} {...commonProps}>
      {children}
    </motion.button>
  )
}

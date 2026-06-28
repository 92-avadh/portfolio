'use client'
import { createContext, useContext, useState, useCallback, useRef } from 'react'

/**
 * CursorProvider
 * --------------
 * A tiny context store so any component can tell the custom cursor what to
 * show while it's hovered. Mirrors thecodeman's context-label cursor
 * ("VIEW", "CASE", "DRAG", "OPEN").
 *
 * State: 'idle' | 'hover' | { label: 'VIEW' }
 * - 'idle'    → default ring
 * - 'hover'   → enlarged ring (buttons/links)
 * - { label } → filled red disc with a text label (cards, galleries)
 */

const CursorContext = createContext(null)

export function CursorProvider({ children }) {
  const [state, setState] = useState(null) // null = idle
  const hoverCount = useRef(0)

  const setHover = useCallback((on) => {
    if (on) hoverCount.current += 1
    else hoverCount.current -= 1
    if (hoverCount.current < 0) hoverCount.current = 0
    
    if (on) {
      setState((s) => (s && s.label ? s : typeof on === 'string' ? on : 'hover'))
    } else {
      setState((s) => (s && s.label ? s : hoverCount.current > 0 ? 'hover' : null))
    }
  }, [])

  const setLabel = useCallback((label) => {
    setState(label ? { label } : hoverCount.current > 0 ? 'hover' : null)
  }, [])

  return (
    <CursorContext.Provider value={{ state, setHover, setLabel }}>
      {children}
    </CursorContext.Provider>
  )
}

export function useCursor() {
  const ctx = useContext(CursorContext)
  if (!ctx) {
    // Safe no-op fallback if used outside provider.
    return { state: null, setHover: () => {}, setLabel: () => {} }
  }
  return ctx
}

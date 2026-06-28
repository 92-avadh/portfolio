'use client'
import { useState, useEffect } from 'react'

const greetings = ['HELLO', 'NAMASTE', 'BONJOUR', 'HOLA', 'KEM CHO', 'سلام']

export default function GreetingCycle() {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => { 
        setIndex(i => (i + 1) % greetings.length)
        setVisible(true) 
      }, 300)
    }, 2200)
    return () => clearInterval(interval)
  }, [])

  return (
    <span style={{
      fontFamily: 'var(--font-body)', 
      fontSize: 13, 
      fontWeight: 500,
      letterSpacing: '0.2em', 
      color: '#1a1a1a',
      opacity: visible ? 1 : 0,
      transition: 'opacity 0.3s ease',
      display: 'inline-block'
    }}>
      {greetings[index]}
    </span>
  )
}

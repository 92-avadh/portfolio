'use client'
import { useEffect, useRef, useState } from 'react'

export function TransparentMemoji({ src, className = '', style = {} }) {
  const canvasRef = useRef(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const img = new Image()
    img.src = src
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      
      const ctx = canvas.getContext('2d')
      canvas.width = img.width
      canvas.height = img.height
      
      ctx.drawImage(img, 0, 0)
      
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imgData.data
      
      // Read background key color from top-left pixel
      const bgR = data[0]
      const bgG = data[1]
      const bgB = data[2]
      
      // Set a robust tolerance for color distance matching
      const tolerance = 90
      
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i]
        const g = data[i + 1]
        const b = data[i + 2]
        
        // Distance to sampled key color
        const diffR = r - bgR
        const diffG = g - bgG
        const diffB = b - bgB
        const dist = Math.sqrt(diffR * diffR + diffG * diffG + diffB * diffB)
        
        // Green chroma key check (catches any green variants or spills)
        const isGreenScreen = g > 75 && g > r * 1.15 && g > b * 1.15
        
        if (dist < tolerance || isGreenScreen) {
          data[i + 3] = 0 // Fully transparent
        }
      }
      
      ctx.putImageData(imgData, 0, 0)
      setLoaded(true)
    }
  }, [src])

  return (
    <div style={{ position: 'relative', width: '100%', height: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {!loaded && (
        <div style={{
          width: '100%',
          aspectRatio: '1024/702',
          background: 'rgba(0,0,0,0.05)',
          borderRadius: 24,
          animation: 'pulse-skeleton 1.5s infinite ease-in-out',
        }}>
          <style>{`@keyframes pulse-skeleton { 0%,100% { opacity:0.6 } 50% { opacity:0.3 } }`}</style>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className={className}
        style={{
          ...style,
          display: loaded ? 'block' : 'none',
          maxWidth: '100%',
          height: 'auto',
        }}
      />
    </div>
  )
}

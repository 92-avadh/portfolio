'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { prefersReducedMotion } from '@/lib/motion'

/**
 * WebGLCanvas
 * -----------
 * Lightweight Three.js accent layer: a drifting field of points + a subtle
 * reactive glow. Perf-bounded — DPR capped at 1.5, renderer paused when the
 * canvas scrolls off-screen, and entirely skipped on reduced-motion.
 *
 * Props:
 * - `density`: particle count multiplier (default 1)
 * - `interactive`: whether particles react to pointer (default true)
 */
export function WebGLCanvas({ density = 1, interactive = true, className = '', style }) {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return
    if (prefersReducedMotion()) return

    let width = mount.clientWidth
    let height = mount.clientHeight

    // --- Scene ---
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100)
    camera.position.z = 18

    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
      renderer.setSize(width, height)
      mount.appendChild(renderer.domElement)
    } catch {
      return
    }

    // --- Particle field ---
    const count = Math.floor(140 * density)
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40
      positions[i * 3 + 1] = (Math.random() - 0.5) * 24
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.08,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    const points = new THREE.Points(geometry, material)
    scene.add(points)

    // --- Pointer ---
    const pointer = { x: 0, y: 0 }
    const onPointerMove = (e) => {
      const rect = mount.getBoundingClientRect()
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      pointer.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
    }
    if (interactive) window.addEventListener('mousemove', onPointerMove)

    // --- Resize ---
    const onResize = () => {
      width = mount.clientWidth
      height = mount.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }
    window.addEventListener('resize', onResize)

    // --- Visibility: pause rAF when off-screen ---
    let visible = true
    const io = new IntersectionObserver(
      ([entry]) => { visible = entry.isIntersecting },
      { threshold: 0 }
    )
    io.observe(mount)

    const clock = new THREE.Clock()
    let frame
    const animate = () => {
      frame = requestAnimationFrame(animate)
      if (!visible) return
      const t = clock.getElapsedTime()
      points.rotation.y = t * 0.03 + pointer.x * 0.3
      points.rotation.x = t * 0.015 + pointer.y * 0.2
      material.opacity = 0.45 + Math.sin(t * 0.6) * 0.12
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(frame)
      io.disconnect()
      window.removeEventListener('resize', onResize)
      if (interactive) window.removeEventListener('mousemove', onPointerMove)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [density, interactive])

  return (
    <div
      ref={mountRef}
      className={className}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, ...style }}
      aria-hidden="true"
    />
  )
}

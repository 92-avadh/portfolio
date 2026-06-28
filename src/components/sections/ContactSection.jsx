'use client'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { site } from '@/data/site'
import { Section } from '@/components/ui/Section'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { SplitHeading } from '@/components/ui/Reveal'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { useCursor } from '@/components/providers/CursorProvider'
import { EASE_OUT_QUART } from '@/lib/motion'

const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY

// Custom dropdown for the inline sentence form.
function InlineDropdown({ options, value, onChange, name }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const { setHover } = useCursor()

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <span ref={ref} style={{ display: 'inline-block', position: 'relative' }}>
      <input type="hidden" name={name} value={value} />
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
        style={{
          background: 'transparent', border: 'none', borderBottom: '1.5px solid var(--text)',
          color: 'var(--accent)', cursor: 'none', padding: '2px 8px',
          display: 'inline-flex', alignItems: 'center', gap: 6,
          fontSize: 'inherit', fontFamily: 'var(--font-body)', outline: 'none',
        }}
      >
        {value}
        <span style={{
          fontSize: 10, color: 'var(--text-muted)', display: 'inline-block',
          transition: 'transform 0.3s ease', transform: open ? 'rotate(180deg)' : 'none',
        }}>▼</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.2, ease: EASE_OUT_QUART }}
            style={{
              position: 'absolute', top: 'calc(100% + 8px)', left: 0, minWidth: 220,
              background: 'var(--bg)', border: '1px solid var(--border)', padding: '6px 0',
              boxShadow: '0 10px 35px rgba(0,0,0,0.08)', zIndex: 100,
            }}
          >
            {options.map((opt) => {
              const active = opt === value
              return (
                <button key={opt} type="button"
                  onClick={() => { onChange(opt); setOpen(false) }}
                  onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
                  style={{
                    display: 'block', width: '100%', textAlign: 'left', background: active ? 'var(--accent-soft)' : 'transparent',
                    border: 'none', padding: '10px 16px', cursor: 'none', fontFamily: 'var(--font-body)', fontSize: 14,
                    color: active ? 'var(--accent)' : 'var(--text)', transition: 'all 0.2s ease',
                  }}
                >
                  {opt}
                </button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  )
}

export function ContactSection() {
  const [status, setStatus] = useState('idle')
  const [purpose, setPurpose] = useState('Full-Time Role')
  const { setHover } = useCursor()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!ACCESS_KEY) {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
      return
    }
    setStatus('submitting')
    const fd = new FormData(e.target)
    fd.append('access_key', ACCESS_KEY)
    fd.append('subject', '[Portfolio Contact] New message')
    fd.append('message', [
      `Name: ${fd.get('name')}`,
      `Location: ${fd.get('location')}`,
      `About: ${fd.get('purpose')}`,
      `Email: ${fd.get('email')}`,
      `Message: ${fd.get('user_message')}`,
    ].join('\n'))

    try {
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: fd })
      const data = await res.json()
      if (data.success) {
        setStatus('success'); e.target.reset(); setPurpose('Full-Time Role')
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        setStatus('error'); setTimeout(() => setStatus('idle'), 4000)
      }
    } catch {
      setStatus('error'); setTimeout(() => setStatus('idle'), 4000)
    }
  }

  return (
    <Section id="contact" theme="light">
      <SectionLabel index="07">Contact</SectionLabel>

      <SplitHeading
        as="h2" className="display" split="words" accentIndices={[1]}
        style={{ fontSize: 'clamp(52px, 7vw, 110px)', marginTop: 40, marginBottom: 60 }}
      >
        {"Let's build something"}
      </SplitHeading>

      <div style={{ maxWidth: 780 }}>
        <form onSubmit={handleSubmit}>
          <p style={{
            fontSize: 'clamp(18px, 2.6vw, 26px)', fontWeight: 300, lineHeight: 2.2,
            color: 'var(--text)', fontFamily: 'var(--font-body)', marginBottom: 40,
          }}>
            Hey, Avadh! My name is{' '}
            <input required name="name" placeholder="[John Doe]" className="inline-input" style={{ width: 'clamp(150px, 20vw, 240px)' }} />
            {' '}and I am from{' '}
            <input required name="location" placeholder="[Your Location]" className="inline-input" style={{ width: 'clamp(150px, 20vw, 240px)' }} />.
            <br />
            Let&apos;s connect about{' '}
            <InlineDropdown name="purpose"
              options={['Full-Time Role', 'Freelance Project', 'Collab / Idea', 'Just Saying Hi']}
              value={purpose} onChange={setPurpose}
            />.
            <br />
            We can talk in more detail at{' '}
            <input required type="email" name="email" placeholder="[your email]" className="inline-input" style={{ width: 'clamp(200px, 25vw, 320px)' }} />.
            <br />
            In short,{' '}
            <input required name="user_message" placeholder="[type message here]" className="inline-input" style={{ width: 'clamp(240px, 35vw, 480px)' }} />.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
            <MagneticButton
              type="submit" disabled={status === 'submitting' || status === 'success'}
              strength={0.2}
              onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
              style={{
                fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 500,
                letterSpacing: '0.14em', textTransform: 'uppercase', background: 'none',
                border: 'none', color: 'var(--text)', borderBottom: '1px solid var(--text)',
                paddingBottom: 4, cursor: 'none', outline: 'none',
                transition: 'color 0.2s ease, border-color 0.2s ease',
              }}
            >
              {status === 'idle' && 'Send Message →'}
              {status === 'submitting' && 'Sending...'}
              {status === 'success' && 'Message Sent ✓'}
              {status === 'error' && 'Error — Try Again ↗'}
            </MagneticButton>

            {status === 'submitting' && <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Please wait...</span>}
            {status === 'success' && <span style={{ fontSize: 11, color: '#16a34a' }}>Thank you! I&apos;ll reply soon.</span>}
            {status === 'error' && <span style={{ fontSize: 11, color: '#e63329' }}>Submission failed. Check connection or email me directly.</span>}
          </div>
        </form>

        <p style={{ marginTop: 32, fontSize: 13, color: 'var(--text-muted)' }}>
          Or write me at{' '}
          <a href={`mailto:${site.email}`}
            onMouseEnter={(e) => {
              setHover(true)
              e.currentTarget.style.borderColor = 'var(--accent)'
            }}
            onMouseLeave={(e) => {
              setHover(false)
              e.currentTarget.style.borderColor = 'transparent'
            }}
            style={{ color: 'var(--accent)', textDecoration: 'none', borderBottom: '1px solid transparent', transition: 'border-color 0.2s' }}
          >
            {site.email}
          </a>
        </p>
      </div>
    </Section>
  )
}

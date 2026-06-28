'use client'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Custom Radix-style Dropdown for the inline form sentence
function InlineDropdown({ options, value, onChange, name }) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={containerRef} style={{
      display: 'inline-block',
      position: 'relative',
      zIndex: 10
    }}>
      <input type="hidden" name={name} value={value} />
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-hover"
        style={{
          background: 'transparent',
          border: 'none',
          borderBottom: '1.5px solid var(--text-black)',
          color: 'var(--accent-red)', // Red text for dropdown triggers
          cursor: 'none',
          padding: '2px 8px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: 'inherit',
          fontWeight: 400,
          outline: 'none',
          fontFamily: 'var(--font-body)',
        }}
      >
        {value}
        <span style={{ 
          fontSize: '10px', 
          transition: 'transform 0.3s cubic-bezier(0.76, 0, 0.24, 1)', 
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          display: 'inline-block',
          color: 'var(--text-muted)'
        }}>
          ▼
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.215, 0.610, 0.355, 1] }}
            style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              left: 0,
              minWidth: '220px',
              background: '#ffffff', // Pure white background
              border: '1px solid var(--border)',
              borderRadius: '2px', // Zero rounded corners
              padding: '6px 0',
              boxShadow: '0 10px 35px rgba(0,0,0,0.08)',
              zIndex: 100
            }}
          >
            {options.map((option) => {
              const isActive = option === value
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    onChange(option)
                    setIsOpen(false)
                  }}
                  className="cursor-hover"
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    background: 'transparent',
                    border: 'none',
                    padding: '10px 16px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    color: isActive ? 'var(--accent-red)' : 'var(--text-black)',
                    backgroundColor: isActive ? '#f5f5f5' : 'transparent',
                    cursor: 'none',
                    transition: 'background 0.2s ease, color 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.target.style.background = '#f5f5f5'
                      e.target.style.color = 'var(--accent-red)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.target.style.background = 'transparent'
                      e.target.style.color = 'var(--text-black)'
                    }
                  }}
                >
                  {option}
                </button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ContactSection() {
  const [status, setStatus] = useState('idle') // 'idle', 'submitting', 'success', 'error'
  const [purpose, setPurpose] = useState('Full-Time Role')
  const formRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')

    const formData = new FormData(e.target)
    formData.append('access_key', '8e6e1d99-6646-4ba5-a38c-117c1e8ea073')
    formData.append('subject', '[Portfolio Contact] Interactive Form Submission')

    const name = formData.get('name')
    const location = formData.get('location')
    const purposeVal = formData.get('purpose')
    const email = formData.get('email')
    const userMessage = formData.get('user_message')

    const fullMessage = `
Name: ${name}
Location: ${location}
Connecting About: ${purposeVal}
Email Address: ${email}
Short Message: ${userMessage}
    `
    formData.append('message', fullMessage)

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (data.success) {
        setStatus('success')
        e.target.reset()
        setPurpose('Full-Time Role')
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 4000)
      }
    } catch (error) {
      console.error('Error submitting form', error)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  return (
    <section 
      id="contact" 
      style={{ 
        padding: 'clamp(80px, 10vw, 140px) clamp(20px, 5vw, 60px)',
        maxWidth: '1240px',
        margin: '0 auto'
      }}
    >
      <p className="label-mono" style={{ marginBottom: 16 }}>04 / CONTACT</p>

      <h2 style={{
        fontFamily: "var(--font-display)",
        fontSize: 'clamp(48px, 7vw, 88px)',
        fontWeight: 900, 
        textTransform: 'uppercase',
        color: 'var(--text-black)', 
        marginBottom: 60, 
        lineHeight: 0.9,
        margin: 0
      }}>
        LET&apos;S BUILD<br />
        <span style={{ color: 'var(--accent-red)' }}>SOMETHING.</span>
      </h2>

      {/* Inline sentence form */}
      <div style={{ maxWidth: 780 }}>
        <form ref={formRef} onSubmit={handleSubmit}>
          <p style={{ 
            fontSize: 'clamp(18px, 2.8vw, 26px)', 
            fontWeight: 300, 
            lineHeight: 2.2, 
            color: 'var(--text-black)',
            fontFamily: 'var(--font-body)',
            marginBottom: 40
          }}>
            Hey, Avadh! My name is{' '}
            <input 
              required
              name="name"
              placeholder="[John Doe]" 
              className="inline-input cursor-hover" 
              style={{ width: 'clamp(150px, 20vw, 240px)' }}
            />
            {' '}and I am from{' '}
            <input 
              required
              name="location"
              placeholder="[Your Location]" 
              className="inline-input cursor-hover" 
              style={{ width: 'clamp(150px, 20vw, 240px)' }}
            />.
            <br />
            Let&apos;s connect about{' '}
            <InlineDropdown 
              name="purpose"
              options={[
                'Full-Time Role',
                'Freelance Project',
                'Collab / Idea',
                'Just Saying Hi'
              ]}
              value={purpose}
              onChange={setPurpose}
            />.
            <br />
            We can talk in more detail at{' '}
            <input 
              required
              type="email" 
              name="email"
              placeholder="[your email address]" 
              className="inline-input cursor-hover" 
              style={{ width: 'clamp(200px, 25vw, 320px)' }}
            />.
            <br />
            In short,{' '}
            <input 
              required
              name="user_message"
              placeholder="[type message here]" 
              className="inline-input cursor-hover" 
              style={{ width: 'clamp(240px, 35vw, 480px)' }}
            />.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
            <button 
              type="submit" 
              disabled={status === 'submitting' || status === 'success'}
              className="cursor-hover"
              style={{
                fontFamily: 'var(--font-body)', 
                fontSize: 13, 
                fontWeight: 500,
                letterSpacing: '0.12em', 
                textTransform: 'uppercase',
                background: 'none', 
                border: 'none', 
                color: 'var(--text-black)',
                borderBottom: '1px solid var(--text-black)', 
                paddingBottom: 4,
                cursor: 'none',
                outline: 'none',
                transition: 'color 0.2s ease, border-color 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-red)'
                e.currentTarget.style.color = 'var(--accent-red)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--text-black)'
                e.currentTarget.style.color = 'var(--text-black)'
              }}
            >
              {status === 'idle' && 'Send Message →'}
              {status === 'submitting' && 'Sending Message...'}
              {status === 'success' && 'Message Sent Successfully ✓'}
              {status === 'error' && 'Error — Try Again ↗'}
            </button>

            {status === 'submitting' && (
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>
                Please wait...
              </span>
            )}
            {status === 'success' && (
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#81c784' }}>
                Thank you! Avadh will get back to you soon.
              </span>
            )}
            {status === 'error' && (
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#e57373' }}>
                Submission failed. Please check connection.
              </span>
            )}
          </div>
        </form>

        <p style={{ marginTop: 32, fontSize: 13, color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>
          Or just write me at{' '}
          <a 
            href="mailto:dhameliyaavadh592@gmail.com" 
            className="cursor-hover"
            style={{ 
              color: 'var(--accent-red)', 
              textDecoration: 'none',
              borderBottom: '1px solid transparent',
              transition: 'border-color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--accent-red)'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
          >
            dhameliyaavadh592@gmail.com
          </a>
        </p>
      </div>
    </section>
  )
}

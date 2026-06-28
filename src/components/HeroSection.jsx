'use client'
import GreetingCycle from './GreetingCycle'
import MarqueeTicker from './MarqueeTicker'

export default function HeroSection() {
  const line1Chars = ['A', 'V', 'A', 'D', 'H']
  
  const line2Chars = [
    { letter: 'D', isRed: false },
    { letter: 'H', isRed: true },
    { letter: 'A', isRed: false },
    { letter: 'M', isRed: false },
    { letter: 'E', isRed: false },
    { letter: 'L', isRed: false },
    { letter: 'I', isRed: false },
    { letter: 'Y', isRed: false },
    { letter: 'A', isRed: true },
  ]

  return (
    <section 
      id="home" 
      style={{ 
        paddingTop: '160px', 
        paddingLeft: 'clamp(20px, 3vw, 40px)', 
        paddingRight: 'clamp(20px, 3vw, 40px)',
        paddingBottom: '0', 
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* Greeting cycle above name */}
      <div style={{ textAlign: 'center', marginBottom: 16 }}>
        <GreetingCycle />
      </div>

      {/* Subtitle above name */}
      <p style={{
        textAlign: 'center', 
        fontSize: 11, 
        fontWeight: 500,
        letterSpacing: '0.15em', 
        textTransform: 'uppercase',
        color: '#6b6b6b', 
        marginBottom: 24, 
        fontFamily: 'var(--font-body)'
      }}>
        Full-Stack Developer · Surat, Gujarat
      </p>

      {/* THE NAME — massive, architectural display */}
      <h1 style={{ lineHeight: 0.85, margin: 0, userSelect: 'none', textAlign: 'center' }}>
        {/* Line 1: AVADH — left aligned display container */}
        <div style={{
          fontFamily: "var(--font-display)",
          fontSize: 'clamp(80px, 15vw, 210px)',
          fontWeight: 900,
          textTransform: 'uppercase',
          color: 'var(--text-black)',
          letterSpacing: '-0.02em',
          display: 'block',
          textAlign: 'left',
          maxWidth: '1200px',
          margin: '0 auto',
          overflow: 'hidden'
        }}>
          {line1Chars.map((char, index) => (
            <span 
              key={index} 
              className="hero-char" 
              style={{ 
                display: 'inline-block',
                willChange: 'transform'
              }}
            >
              {char}
            </span>
          ))}
        </div>

        {/* Line 2: DHAMELIYA — right offset, some letters red */}
        <div style={{
          fontFamily: "var(--font-display)",
          fontSize: 'clamp(80px, 15vw, 210px)',
          fontWeight: 900,
          textTransform: 'uppercase',
          letterSpacing: '-0.02em',
          display: 'block',
          textAlign: 'left',
          maxWidth: '1200px',
          margin: '0 auto',
          paddingLeft: 'clamp(40px, 15vw, 280px)', /* offset to the right */
          marginTop: '-0.05em',
          overflow: 'hidden'
        }}>
          {line2Chars.map((item, index) => (
            <span 
              key={index} 
              className="hero-char" 
              style={{ 
                display: 'inline-block',
                color: item.isRed ? 'var(--accent-red)' : 'var(--text-black)',
                willChange: 'transform'
              }}
            >
              {item.letter}
            </span>
          ))}
        </div>
      </h1>

      {/* Body text below name */}
      <div style={{ maxWidth: 500, margin: '40px auto 0', textAlign: 'center', padding: '0 24px' }}>
        <p style={{ fontSize: 15, color: '#6b6b6b', lineHeight: 1.7, marginBottom: 8 }}>
          I design it, build it, ship it, then keep the whole thing running.
        </p>
        <p style={{ fontSize: 13, fontWeight: 500, letterSpacing: '0.06em', color: '#aaaaaa', textTransform: 'uppercase' }}>
          MERN Stack · Next.js · Node.js · Python
        </p>
      </div>

      {/* CTAs */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 40, marginTop: 40, paddingBottom: 20 }}>
        <a 
          href="#work" 
          className="cursor-hover"
          style={{
            fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 500,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'var(--text-black)', textDecoration: 'none',
            borderBottom: '1px solid var(--text-black)', paddingBottom: 4,
            transition: 'border-color 0.2s ease, color 0.2s ease'
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
          VIEW WORK ↗
        </a>
        <a 
          href="#contact" 
          className="cursor-hover"
          style={{
            fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 500,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'var(--text-black)', textDecoration: 'none',
            borderBottom: '1px solid var(--text-black)', paddingBottom: 4,
            transition: 'border-color 0.2s ease, color 0.2s ease'
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
          LET&apos;S TALK →
        </a>
      </div>

      {/* Marquee Ticker */}
      <MarqueeTicker />
    </section>
  )
}

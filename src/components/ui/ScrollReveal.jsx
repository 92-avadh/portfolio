import { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ScrollReveal.css';

gsap.registerPlugin(ScrollTrigger);

const ScrollReveal = ({ 
  children, 
  scrollContainerRef, 
  enableBlur = true, 
  baseOpacity = 0.1, 
  baseRotation = 3, 
  blurStrength = 4, 
  containerClassName = '', 
  textClassName = '', 
  rotationEnd = 'bottom bottom', 
  wordAnimationEnd = 'bottom bottom',
  as = 'div',
  style = {},
  textStyle = {}
}) => {
  const containerRef = useRef(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className="word" key={index}>
          {word}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;

    // Transform Rotation Tween
    const t1 = gsap.fromTo(
      el,
      { transformOrigin: '0% 50%', rotate: baseRotation },
      {
        ease: 'none',
        rotate: 0,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: 'top bottom',
          end: rotationEnd,
          scrub: true
        }
      }
    );

    const wordElements = el.querySelectorAll('.word');

    // Opacity Reveal Tween
    const t2 = gsap.fromTo(
      wordElements,
      { opacity: baseOpacity, willChange: 'opacity' },
      {
        ease: 'none',
        opacity: 1,
        stagger: 0.05,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: 'top bottom-=20%',
          end: wordAnimationEnd,
          scrub: true
        }
      }
    );

    let t3;
    if (enableBlur) {
      // Blur Reveal Tween
      t3 = gsap.fromTo(
        wordElements,
        { filter: `blur(${blurStrength}px)` },
        {
          ease: 'none',
          filter: 'blur(0px)',
          stagger: 0.05,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: 'top bottom-=20%',
            end: wordAnimationEnd,
            scrub: true
          }
        }
      );
    }

    return () => {
      if (t1.scrollTrigger) t1.scrollTrigger.kill();
      if (t2.scrollTrigger) t2.scrollTrigger.kill();
      if (t3 && t3.scrollTrigger) t3.scrollTrigger.kill();
      t1.kill();
      t2.kill();
      if (t3) t3.kill();
    };
  }, [scrollContainerRef, enableBlur, baseRotation, baseOpacity, rotationEnd, wordAnimationEnd, blurStrength]);

  const Tag = as;

  return (
    <Tag ref={containerRef} className={`scroll-reveal ${containerClassName}`} style={style}>
      <span className={`scroll-reveal-text ${textClassName}`} style={{ display: 'block', ...textStyle }}>{splitText}</span>
    </Tag>
  );
};

export default ScrollReveal;

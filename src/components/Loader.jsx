import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const Loader = ({ onComplete }) => {
  const container = useRef();

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(container.current, {
          yPercent: -100,
          duration: 1.2,
          ease: 'power4.inOut',
          onComplete,
        });
      },
    });

    tl.from('.loader-tag', { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out', delay: 0.3 })
      .from('.loader-name-1', { y: 60, opacity: 0, duration: 0.9, ease: 'power3.out' }, '-=0.3')
      .from('.loader-name-2', { y: 60, opacity: 0, duration: 0.9, ease: 'power3.out' }, '-=0.7')
      .from('.loader-line', { scaleX: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
      .from('.loader-sub', { y: 15, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.5')
      .to('.loader-content', { opacity: 0, y: -15, duration: 0.6, delay: 1.5, ease: 'power3.in' });

  }, { scope: container });

  return (
    <div
      ref={container}
      style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh',
        background: '#030303', zIndex: 9999,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      {/* Corner accent lines */}
      {[
        { top: 32, left: 32, borderTop: '1.5px solid', borderLeft: '1.5px solid' },
        { top: 32, right: 32, borderTop: '1.5px solid', borderRight: '1.5px solid' },
        { bottom: 32, left: 32, borderBottom: '1.5px solid', borderLeft: '1.5px solid' },
        { bottom: 32, right: 32, borderBottom: '1.5px solid', borderRight: '1.5px solid' },
      ].map((s, i) => (
        <div key={i} style={{
          position: 'absolute', width: 28, height: 28,
          borderColor: 'rgba(212,175,55,0.5)', opacity: 0.7,
          ...s
        }} />
      ))}

      <div className="loader-content" style={{ textAlign: 'center' }}>
        {/* Tag */}
        <div className="loader-tag" style={{
          display: 'inline-block',
          fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.3em',
          textTransform: 'uppercase', color: 'var(--gold-1)',
          marginBottom: '2rem', opacity: 0.85
        }}>
          Portfolio
        </div>

        {/* Name */}
        <div style={{ overflow: 'hidden', marginBottom: '0.5rem' }}>
          <h1
            className="loader-name-1"
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(4rem, 12vw, 9rem)',
              fontWeight: 700, lineHeight: 1,
              color: '#ffffff', letterSpacing: '-0.02em',
              margin: 0
            }}
          >
            Het
          </h1>
        </div>
        <div style={{ overflow: 'hidden', marginBottom: '2.5rem' }}>
          <h1
            className="loader-name-2"
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(4rem, 12vw, 9rem)',
              fontWeight: 700, lineHeight: 1,
              fontStyle: 'italic',
              background: 'var(--gold-gradient-text)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.02em',
              margin: 0
            }}
          >
            Rathod.
          </h1>
        </div>

        {/* Divider */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
          <div
            className="loader-line"
            style={{
              width: 120, height: 1,
              background: 'linear-gradient(90deg, transparent, var(--gold-1), transparent)',
              transformOrigin: 'center'
            }}
          />
          <p
            className="loader-sub"
            style={{
              fontSize: '0.8rem', color: 'var(--text-secondary)',
              letterSpacing: '0.25em', textTransform: 'uppercase', opacity: 0
            }}
          >
            Full Stack Developer
          </p>
          <div
            className="loader-line"
            style={{
              width: 120, height: 1,
              background: 'linear-gradient(90deg, transparent, var(--gold-1), transparent)',
              transformOrigin: 'center'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Loader;

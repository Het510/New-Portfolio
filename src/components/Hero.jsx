import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { Link } from 'react-router-dom';
import { personalInfo } from '../data/portfolioData';

const PROFILE_PHOTO = 'https://res.cloudinary.com/dsrczav6p/image/upload/q_auto/f_auto/v1776466870/Professional_headshot_with_confident_smile_fsjmr9.png';

const ROLES = [
  'Full Stack Developer',
  'UI/UX Enthusiast',
  'Open Source Contributor',
  'Problem Solver',
];

const Hero = () => {
  const container = useRef();
  const [currentRole, setCurrentRole] = useState(0);
  const [displayed, setDisplayed]     = useState('');
  const [isDeleting, setIsDeleting]   = useState(false);
  const [charIdx, setCharIdx]         = useState(0);

  // Typing animation
  useEffect(() => {
    const role = ROLES[currentRole];
    let timeout;
    if (!isDeleting && charIdx <= role.length) {
      setDisplayed(role.slice(0, charIdx));
      timeout = setTimeout(() => setCharIdx(i => i + 1), 80);
    } else if (!isDeleting && charIdx > role.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && charIdx >= 0) {
      setDisplayed(role.slice(0, charIdx));
      timeout = setTimeout(() => setCharIdx(i => i - 1), 40);
    } else if (isDeleting && charIdx < 0) {
      setIsDeleting(false);
      setCurrentRole(r => (r + 1) % ROLES.length);
      setCharIdx(0);
    }
    return () => clearTimeout(timeout);
  }, [charIdx, isDeleting, currentRole]);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from('.hero-greeting',   { y: 30, opacity: 0, duration: 0.7, ease: 'power3.out', delay: 0.2 })
      .from('.hero-name',       { y: 40, opacity: 0, duration: 1,   ease: 'power3.out' }, '-=0.4')
      .from('.hero-role-line',  { y: 20, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
      .from('.hero-bio',        { y: 20, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4')
      .from('.hero-actions',    { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
      .from('.hero-image-wrap', { scale: 0.9, opacity: 0, duration: 1.1, ease: 'power3.out' }, '-=0.9');

    // Parallax on scroll
    gsap.to('.hero-image-wrap', {
      y: 50, ease: 'none',
      scrollTrigger: {
        trigger: container.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5,
      }
    });
  }, { scope: container });

  return (
    <div
      ref={container}
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '80px',
        position: 'relative',
      }}
    >
      <div className="container" style={{ width: '100%' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '4rem',
          alignItems: 'center',
        }}>

          {/* ── Left: Text ── */}
          <div>
            {/* Available for work badge */}
            <div className="hero-greeting" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
              background: 'rgba(139,92,246,0.08)',
              border: '1px solid rgba(139,92,246,0.25)',
              borderRadius: '50px', padding: '0.4rem 1.1rem',
              fontSize: '0.75rem', fontWeight: 600,
              color: 'var(--violet-1)',
              textTransform: 'uppercase', letterSpacing: '0.15em',
              marginBottom: '2rem',
            }}>
              <span className="glow-dot" />
              Available for Work
            </div>

            {/* Name */}
            <h1 className="hero-name" style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(3.2rem, 8vw, 6rem)',
              fontWeight: 800,
              lineHeight: 1.0,
              marginBottom: '1.5rem',
              letterSpacing: '-0.02em',
            }}>
              Het{' '}
              <span style={{
                fontStyle: 'italic',
                background: 'var(--gold-gradient-text)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                display: 'block',
              }}>
                Rathod.
              </span>
            </h1>

            {/* Typing role */}
            <div className="hero-role-line" style={{
              fontSize: '1.05rem',
              color: 'var(--text-secondary)',
              marginBottom: '1.5rem',
              minHeight: '1.8rem',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              fontFamily: 'Inter, sans-serif',
            }}>
              <span style={{ color: 'var(--violet-1)', fontWeight: 600 }}>// </span>
              <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{displayed}</span>
              <span style={{
                display: 'inline-block', width: '2px', height: '1.1em',
                background: 'var(--violet-1)',
                animation: 'typing-cursor 1s infinite',
                marginLeft: '1px', verticalAlign: 'middle',
              }} />
            </div>

            {/* Bio */}
            <p className="hero-bio" style={{
              fontSize: '1rem', color: 'var(--text-secondary)',
              lineHeight: 1.8, maxWidth: '460px', marginBottom: '2.5rem',
            }}>
              {personalInfo.intro}
            </p>

            {/* CTA Buttons — use Router Links for page routing */}
            <div className="hero-actions" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/projects" className="btn btn-primary">
                View Projects
              </Link>
              <Link to="/contact" className="btn btn-outline">
                Get In Touch
              </Link>
            </div>
          </div>

          {/* ── Right: Profile Photo ── */}
          <div className="hero-image-wrap" style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
            {/* Outer ring */}
            <div style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '420px', height: '420px', borderRadius: '50%',
              border: '1px solid rgba(139,92,246,0.1)',
              zIndex: 0, pointerEvents: 'none',
            }} />
            {/* Spinning dashed ring */}
            <div style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '360px', height: '360px', borderRadius: '50%',
              border: '1px dashed rgba(103,232,249,0.12)',
              animation: 'spin 25s linear infinite',
              zIndex: 0, pointerEvents: 'none',
            }} />

            {/* Photo frame */}
            <div style={{
              position: 'relative', zIndex: 1,
              width: '300px', height: '380px',
              borderRadius: '24px',
              overflow: 'hidden',
              border: '1px solid rgba(139,92,246,0.2)',
              boxShadow: '0 30px 80px rgba(0,0,0,0.6), 0 0 60px rgba(124,58,237,0.15), 0 0 120px rgba(34,211,238,0.06)',
            }}>
              <img
                src={PROFILE_PHOTO}
                alt="Het Rathod"
                style={{
                  width: '100%', height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'top center',
                  filter: 'contrast(1.04) brightness(0.97)',
                  display: 'block',
                }}
              />
              {/* Bottom gradient fade */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                height: '35%',
                background: 'linear-gradient(to top, rgba(4,4,13,0.75), transparent)',
                pointerEvents: 'none',
              }} />
              {/* Subtle violet shimmer on right edge */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(135deg, transparent 70%, rgba(124,58,237,0.08))',
                pointerEvents: 'none',
              }} />
            </div>
          </div>

        </div>

        {/* Scroll indicator */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          position: 'absolute', bottom: '2.5rem', left: '50%',
          transform: 'translateX(-50%)',
          gap: '0.5rem', opacity: 0.35,
          pointerEvents: 'none',
        }}>
          <div style={{
            fontSize: '0.65rem', letterSpacing: '0.25em',
            textTransform: 'uppercase', color: 'var(--text-secondary)',
          }}>
            Scroll
          </div>
          <div style={{
            width: '1px', height: '40px',
            background: 'linear-gradient(to bottom, var(--violet-1), transparent)',
          }} />
        </div>
      </div>

      <style>{`
        @keyframes typing-cursor {
          0%, 100% { opacity: 0; }
          50%       { opacity: 1; }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default Hero;

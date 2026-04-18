import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { hackathons } from '../data/portfolioData';
import { ExternalLink, Video, Trophy } from 'lucide-react';

const Hackathons = () => {
  const container = useRef();

  useEffect(() => {
    const t = setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => clearTimeout(t);
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: container.current, start: 'top bottom', once: true }
    });
    tl.from('.hack-label, .hack-heading', {
      y: 25, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out'
    }).from('.hackathon-item', {
      x: -30, opacity: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out'
    }, '-=0.4');
  }, { scope: container });

  return (
    <div ref={container} className="container section" id="hackathons-inner">
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <div className="hack-label section-label" style={{ justifyContent: 'center' }}>Competitions</div>
        <h2 className="hack-heading section-heading" style={{ margin: '1rem auto 0' }}>
          Hackathon <span className="italic-gold">Experience.</span>
        </h2>
      </div>

      {/* List */}
      <div className="hackathon-list" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '900px', margin: '0 auto' }}>
        {hackathons.map((hackathon, idx) => (
          <div
            key={hackathon.name}
            className="hackathon-item glass-card"
            style={{ padding: '2rem', position: 'relative', overflow: 'hidden' }}
          >
            {/* Number */}
            <div style={{
              position: 'absolute', top: '1.5rem', right: '2rem',
              fontFamily: 'Playfair Display, serif',
              fontSize: '4rem', fontWeight: 800,
              color: 'rgba(212, 175, 55, 0.05)',
              lineHeight: 1, userSelect: 'none'
            }}>
              {String(idx + 1).padStart(2, '0')}
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
              {/* Icon */}
              <div style={{
                width: '48px', height: '48px', borderRadius: '12px', flexShrink: 0,
                background: 'rgba(212, 175, 55, 0.08)',
                border: '1px solid rgba(212, 175, 55, 0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--gold-1)'
              }}>
                <Trophy size={22} />
              </div>

              {/* Content */}
              <div style={{ flex: 1, minWidth: '200px' }}>
                <h3 style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '1.3rem', fontWeight: 700,
                  color: 'var(--text-primary)', marginBottom: '1rem'
                }}>
                  {hackathon.name}
                </h3>

                <div style={{ marginBottom: '0.75rem' }}>
                  <div style={{
                    fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase',
                    letterSpacing: '0.15em', color: 'var(--gold-1)', marginBottom: '0.4rem'
                  }}>
                    Problem Statement
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                    {hackathon.problem}
                  </p>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{
                    fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase',
                    letterSpacing: '0.15em', color: 'var(--gold-1)', marginBottom: '0.4rem'
                  }}>
                    Outcome
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                    {hackathon.outcome}
                  </p>
                </div>

                {/* Links */}
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  {hackathon.repo && hackathon.repo !== '#' && (
                    <a
                      href={hackathon.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex', alignItems: 'center', gap: '0.4rem',
                        padding: '0.4rem 1rem', borderRadius: '6px', fontSize: '0.8rem',
                        background: 'rgba(212,175,55,0.08)',
                        border: '1px solid rgba(212,175,55,0.15)',
                        color: 'var(--gold-1)', fontWeight: 500,
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(212,175,55,0.15)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'rgba(212,175,55,0.08)'}
                    >
                      <ExternalLink size={13} /> Repository
                    </a>
                  )}
                  {hackathon.demo && hackathon.demo !== '#' && (
                    <a
                      href={hackathon.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex', alignItems: 'center', gap: '0.4rem',
                        padding: '0.4rem 1rem', borderRadius: '6px', fontSize: '0.8rem',
                        border: '1px solid rgba(255,255,255,0.06)',
                        color: 'var(--text-secondary)', fontWeight: 500,
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = 'var(--border-gold)';
                        e.currentTarget.style.color = 'var(--gold-1)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                        e.currentTarget.style.color = 'var(--text-secondary)';
                      }}
                    >
                      <Video size={13} /> Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hackathons;

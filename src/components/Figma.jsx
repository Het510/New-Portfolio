import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { figmaDesigns } from '../data/portfolioData';
import { ExternalLink } from 'lucide-react';

// Figma brand icon (not in lucide-react v1)
const FigmaIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 24c2.208 0 4-1.792 4-4v-4H8c-2.208 0-4 1.792-4 4s1.792 4 4 4zm0-8H4a4 4 0 010-8h4v8zm0-14C5.792 2 4 3.792 4 6s1.792 4 4 4h4V6c0-2.208-1.792-4-4-4zm8 0h-4v8h4c2.208 0 4-1.792 4-4s-1.792-4-4-4zm0 10c-2.208 0-4 1.792-4 4s1.792 4 4 4 4-1.792 4-4-1.792-4-4-4z"/>
  </svg>
);

const Figma = () => {
  const container = useRef();

  useGSAP(() => {
    gsap.from('.figma-label, .figma-heading', {
      scrollTrigger: { trigger: container.current, start: 'top 80%' },
      y: 25, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out'
    });
    gsap.from('.figma-card', {
      scrollTrigger: { trigger: '.figma-grid', start: 'top 80%' },
      y: 40, opacity: 0, scale: 0.97, duration: 0.7, stagger: 0.15, ease: 'power3.out'
    });
  }, { scope: container });

  return (
    <div ref={container} className="container section" id="figma-inner">
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <div className="figma-label section-label" style={{ justifyContent: 'center' }}>UI/UX Design</div>
        <h2 className="figma-heading section-heading" style={{ margin: '1rem auto 0' }}>
          Figma <span className="italic-gold">Designs.</span>
        </h2>
      </div>

      <div className="figma-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '1.5rem'
      }}>
        {figmaDesigns.map((design) => (
          <div
            key={design.title}
            className="figma-card glass-card"
            style={{ padding: 0, overflow: 'hidden', cursor: 'pointer' }}
          >
            {/* Image */}
            <div style={{ width: '100%', aspectRatio: '16/9', overflow: 'hidden', position: 'relative' }}>
              <img
                src={design.image}
                alt={design.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
                onMouseEnter={e => e.target.style.transform = 'scale(1.06)'}
                onMouseLeave={e => e.target.style.transform = 'scale(1)'}
              />
              {/* Overlay */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, rgba(10,10,10,0.7))' }} />
            </div>

            {/* Footer */}
            <div style={{
              padding: '1.25rem 1.5rem',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: '34px', height: '34px', borderRadius: '8px',
                  background: 'rgba(242, 78, 30, 0.1)',
                  border: '1px solid rgba(242, 78, 30, 0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#f24e1e'
                }}>
                  <FigmaIcon size={16} />
                </div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {design.title}
                </h3>
              </div>
              <a
                href={design.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.3rem',
                  padding: '0.4rem 0.9rem', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 500,
                  background: 'rgba(212,175,55,0.06)',
                  border: '1px solid rgba(212,175,55,0.15)',
                  color: 'var(--gold-1)', transition: 'all 0.2s ease', flexShrink: 0
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(212,175,55,0.12)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(212,175,55,0.06)'}
              >
                <ExternalLink size={12} /> View in Figma
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Figma;

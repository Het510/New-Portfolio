import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { achievements } from '../data/portfolioData';
import { Star } from 'lucide-react';

const Achievements = () => {
  const container = useRef();

  useGSAP(() => {
    gsap.from('.ach-label, .ach-heading', {
      scrollTrigger: { trigger: container.current, start: 'top 80%' },
      y: 25, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out'
    });
    gsap.from('.ach-item', {
      scrollTrigger: { trigger: '.ach-list', start: 'top 80%' },
      x: -20, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out'
    });
  }, { scope: container });

  return (
    <div ref={container} className="container section" id="achievements-inner">
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <div className="ach-label section-label" style={{ justifyContent: 'center' }}>Recognition</div>
        <h2 className="ach-heading section-heading" style={{ margin: '1rem auto 0' }}>
          Milestones &amp; <span className="italic-gold">Achievements.</span>
        </h2>
      </div>

      <div className="ach-list" style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {achievements.map((achievement, idx) => (
          <div
            key={idx}
            className="ach-item"
            style={{
              display: 'flex', alignItems: 'center', gap: '1.25rem',
              padding: '1.25rem 1.75rem',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: '12px',
              transition: 'all 0.3s ease',
              cursor: 'default'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(212,175,55,0.04)';
              e.currentTarget.style.borderColor = 'rgba(212,175,55,0.15)';
              e.currentTarget.style.transform = 'translateX(6px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
              e.currentTarget.style.transform = 'translateX(0)';
            }}
          >
            {/* Icon */}
            <div style={{
              width: '40px', height: '40px', borderRadius: '10px', flexShrink: 0,
              background: 'rgba(212, 175, 55, 0.08)',
              border: '1px solid rgba(212, 175, 55, 0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--gold-1)'
            }}>
              <Star size={18} />
            </div>

            {/* Number */}
            <span style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '0.9rem', fontWeight: 700,
              color: 'rgba(212,175,55,0.3)',
              minWidth: '28px'
            }}>
              {String(idx + 1).padStart(2, '0')}
            </span>

            {/* Text */}
            <p style={{
              fontSize: '0.95rem', color: 'var(--text-secondary)',
              lineHeight: 1.5, fontWeight: 400
            }}>
              {achievement}
            </p>

            {/* Arrow */}
            <div style={{ marginLeft: 'auto', color: 'rgba(212,175,55,0.2)', fontSize: '1.2rem', flexShrink: 0 }}>→</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;

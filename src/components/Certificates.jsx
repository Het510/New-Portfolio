import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { certificates } from '../data/portfolioData';
import { Award, X, ExternalLink, ZoomIn } from 'lucide-react';

/* ── Fullscreen certificate popup modal ── */
const CertModal = ({ cert, onClose }) => {
  if (!cert) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(11,15,20,0.92)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1.5rem',
        animation: 'fadeInModal 0.25s ease',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: 'relative',
          maxWidth: '900px', width: '100%',
          borderRadius: '20px',
          overflow: 'hidden',
          border: '1px solid rgba(20,184,166,0.25)',
          boxShadow: '0 30px 80px rgba(0,0,0,0.7), 0 0 60px rgba(20,184,166,0.1)',
          animation: 'scaleInModal 0.3s cubic-bezier(0.34,1.56,0.64,1)',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '1rem', right: '1rem', zIndex: 10,
            background: 'rgba(11,15,20,0.85)',
            border: '1px solid rgba(20,184,166,0.25)',
            borderRadius: '50%', width: '38px', height: '38px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: '#e8f4f3',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(20,184,166,0.2)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(11,15,20,0.85)'}
        >
          <X size={18} />
        </button>

        {/* Full certificate image */}
        <img
          src={cert.image}
          alt={cert.title}
          style={{ width: '100%', display: 'block', maxHeight: '85vh', objectFit: 'contain', background: '#fff' }}
        />

        {/* Caption bar */}
        <div style={{
          padding: '1.25rem 1.5rem',
          background: 'rgba(14,20,32,0.98)',
          borderTop: '1px solid rgba(20,184,166,0.15)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div>
            <div style={{ fontWeight: 700, color: '#e8f4f3', fontSize: '1rem' }}>{cert.title}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--violet-1)', marginTop: '0.2rem' }}>
              Issued by {cert.org} · {cert.date}
            </div>
          </div>
          <a
            href={cert.image}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              padding: '0.5rem 1rem', borderRadius: '50px',
              background: 'rgba(20,184,166,0.1)',
              border: '1px solid rgba(20,184,166,0.3)',
              color: 'var(--violet-1)', fontSize: '0.8rem', fontWeight: 500,
              textDecoration: 'none', transition: 'all 0.2s ease',
              flexShrink: 0,
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(20,184,166,0.2)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(20,184,166,0.1)'}
          >
            <ExternalLink size={13} /> Open Full
          </a>
        </div>
      </div>

      <style>{`
        @keyframes fadeInModal  { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleInModal { from { transform: scale(0.92); opacity: 0; } to { transform: scale(1); opacity: 1; } }
      `}</style>
    </div>
  );
};

/* ── Main Certificates section ── */
const Certificates = () => {
  const container = useRef();
  const [selected, setSelected] = useState(null);

  // Force ScrollTrigger to recalculate on route change
  useEffect(() => {
    const timer = setTimeout(() => ScrollTrigger.refresh(), 100);
    return () => clearTimeout(timer);
  }, []);

  useGSAP(() => {
    // Use 'top bottom' so animation fires as soon as ANY part enters viewport
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: 'top bottom',
        once: true,
      }
    });
    tl.fromTo('.cert-label, .cert-heading',
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' }
    ).fromTo('.cert-card',
      { y: 35, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: 'power3.out' },
      '-=0.3'
    );
  }, { scope: container });

  return (
    <>
      <div ref={container} className="container section" id="certificates-inner">

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="cert-label section-label" style={{ justifyContent: 'center' }}>Credentials</div>
          <h2 className="cert-heading section-heading" style={{ margin: '1rem auto 0' }}>
            My <span className="italic-gold">Certifications.</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.75rem', fontSize: '0.95rem' }}>
            Click any card to view the full certificate
          </p>
        </div>

        {/* Cards grid */}
        <div className="cert-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.75rem',
        }}>
          {certificates.map((cert) => (
            <div
              key={cert.title}
              className="cert-card"
              onClick={() => setSelected(cert)}
              style={{
                borderRadius: '18px',
                overflow: 'hidden',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(20,184,166,0.14)',
                cursor: 'pointer',
                transition: 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)',
                position: 'relative',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget;
                el.style.transform = 'translateY(-8px)';
                el.style.borderColor = 'rgba(20,184,166,0.35)';
                el.style.boxShadow = '0 20px 50px rgba(13,148,136,0.2), 0 0 40px rgba(13,148,136,0.08)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget;
                el.style.transform = 'none';
                el.style.borderColor = 'rgba(20,184,166,0.14)';
                el.style.boxShadow = 'none';
              }}
            >
              {/* Thumbnail */}
              <div style={{
                position: 'relative', height: '200px', overflow: 'hidden',
                background: '#f0f0f0',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <img
                  src={cert.image}
                  alt={cert.title}
                  style={{
                    width: '100%', height: '100%',
                    objectFit: 'contain',
                    objectPosition: 'center',
                    transition: 'transform 0.5s ease',
                    padding: '6px',
                  }}
                />
                {/* Subtle edge vignette only */}
                <div style={{
                  position: 'absolute', inset: 0,
                  boxShadow: 'inset 0 -30px 30px -10px rgba(11,15,20,0.55)',
                  pointerEvents: 'none',
                }} />
                {/* Zoom hint icon */}
                <div style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  opacity: 0, transition: 'opacity 0.3s ease',
                }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '0'}
                  className="cert-zoom-hint"
                >
                  <div style={{
                    background: 'rgba(14,20,32,0.7)',
                    borderRadius: '50%', width: '48px', height: '48px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--violet-1)', border: '1px solid rgba(20,184,166,0.4)',
                  }}>
                    <ZoomIn size={20} />
                  </div>
                </div>
                {/* Org badge */}
                <div style={{
                  position: 'absolute', top: '0.75rem', right: '0.75rem',
                  background: 'rgba(11,15,20,0.88)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(20,184,166,0.25)',
                  borderRadius: '6px', padding: '0.25rem 0.7rem',
                  fontSize: '0.68rem', color: 'var(--violet-1)', fontWeight: 600,
                  textTransform: 'uppercase', letterSpacing: '0.08em',
                }}>
                  {cert.org}
                </div>
              </div>

              {/* Card body */}
              <div style={{ padding: '1.25rem 1.4rem' }}>
                {/* Icon + title row */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem', marginBottom: '0.75rem' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '10px', flexShrink: 0,
                    background: 'rgba(20,184,166,0.08)',
                    border: '1px solid rgba(20,184,166,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--violet-1)',
                  }}>
                    <Award size={18} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      fontSize: '0.95rem', fontWeight: 700,
                      color: 'var(--text-primary)', lineHeight: 1.3,
                      fontFamily: 'Inter, sans-serif',
                    }}>
                      {cert.title}
                    </h3>
                    <p style={{ fontSize: '0.75rem', color: 'var(--violet-1)', marginTop: '0.2rem', fontWeight: 500 }}>
                      {cert.org} · {cert.date}
                    </p>
                  </div>
                </div>
                {/* Description */}
                <p style={{
                  fontSize: '0.82rem', color: 'var(--text-secondary)',
                  lineHeight: 1.65,
                }}>
                  {cert.description}
                </p>
                {/* View button */}
                <div style={{
                  marginTop: '1rem',
                  display: 'flex', alignItems: 'center', gap: '0.4rem',
                  color: 'var(--violet-1)', fontSize: '0.78rem', fontWeight: 600,
                }}>
                  <ZoomIn size={13} /> Click to view certificate
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Hover trick to show zoom hint */}
        <style>{`
          .cert-card:hover .cert-zoom-hint { opacity: 1 !important; }
        `}</style>
      </div>

      {/* Popup modal */}
      <CertModal cert={selected} onClose={() => setSelected(null)} />
    </>
  );
};

export default Certificates;

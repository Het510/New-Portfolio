import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

const ResumeViewer = () => {
  const container = useRef();

  useGSAP(() => {
    gsap.from('.resume-card', {
      y: 20, opacity: 0, duration: 0.6, ease: 'power3.out'
    });
  }, { scope: container });

  return (
    <div ref={container} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ padding: '2rem', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}>
            <ArrowLeft size={18} /> Back to Portfolio
          </Link>
          <h2 style={{ fontFamily: 'Syne', margin: 0 }}>Resume Viewer</h2>
          <div style={{ width: '130px' }}></div> {/* Spacer for center alignment */}
        </div>
      </header>

      <main style={{ flex: 1, padding: '2rem', background: 'var(--bg-primary)' }}>
        <div className="container resume-card" style={{ height: 'calc(100vh - 160px)', display: 'flex', flexDirection: 'column' }}>
          <div 
            style={{ 
              width: '100%', 
              height: '100%', 
              background: 'var(--glass-bg)', 
              borderRadius: '16px', 
              border: '1px solid var(--glass-border)',
              overflow: 'hidden',
              boxShadow: 'var(--glow-shadow)'
            }}
          >
            {/* The PDF is embedded here without auto-download. The toolbar=0 prevents some download options in some browsers. */}
            <iframe 
              src={`${personalInfo.resumeLink}#toolbar=0`} 
              title="Resume"
              width="100%" 
              height="100%" 
              style={{ border: 'none' }}
            >
              <p>Your browser does not support PDFs.</p>
            </iframe>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResumeViewer;

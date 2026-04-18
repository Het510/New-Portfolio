import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { projects } from '../data/portfolioData';
import { ExternalLink, ArrowUpRight } from 'lucide-react';

// GitHub inline SVG
const GitHubIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

// Category pill colors
const categoryStyle = {
  Clone: { bg: 'rgba(99,102,241,0.12)', color: '#818cf8', border: 'rgba(99,102,241,0.25)' },
  'Full Stack': { bg: 'rgba(16,185,129,0.12)', color: '#34d399', border: 'rgba(16,185,129,0.25)' },
  Frontend: { bg: 'rgba(245,158,11,0.12)', color: '#fbbf24', border: 'rgba(245,158,11,0.25)' },
  Game: { bg: 'rgba(239,68,68,0.12)', color: '#f87171', border: 'rgba(239,68,68,0.25)' },
};

const ProjectCard = ({ project, index }) => {
  const [hovered, setHovered] = useState(false);
  const cat = categoryStyle[project.category] || categoryStyle['Clone'];

  return (
    <div
      className="project-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: `1px solid ${hovered ? `${project.accent}30` : 'rgba(255,255,255,0.06)'}`,
        borderRadius: '20px',
        overflow: 'hidden',
        transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: hovered
          ? `0 24px 70px rgba(0,0,0,0.5), 0 0 0 1px ${project.accent}22, 0 0 40px ${project.accent}11`
          : '0 4px 24px rgba(0,0,0,0.2)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Visual Header — real screenshot thumbnail */}
      <div style={{
        position: 'relative',
        height: '210px',
        overflow: 'hidden',
        flexShrink: 0,
        background: `linear-gradient(135deg, ${project.color}ee, ${project.color}88)`,
      }}>
        {project.thumbnail ? (
          <>
            <img
              src={project.thumbnail}
              alt={`${project.title} preview`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'top center',
                transition: 'transform 0.5s ease',
                transform: hovered ? 'scale(1.06)' : 'scale(1)',
                display: 'block',
              }}
            />
            {/* Gradient overlay so text/buttons remain readable */}
            <div style={{
              position: 'absolute', inset: 0,
              background: `linear-gradient(to bottom, transparent 40%, rgba(9,9,15,0.85) 100%)`,
              pointerEvents: 'none',
            }} />
            {/* Subtle accent tint on hover */}
            <div style={{
              position: 'absolute', inset: 0,
              background: `${project.accent}0a`,
              opacity: hovered ? 1 : 0,
              transition: 'opacity 0.35s ease',
              pointerEvents: 'none',
            }} />
          </>
        ) : (
          <>
            {/* Fallback: decorative gradient */}
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }} />
            <div style={{
              position: 'absolute', top: '-30px', right: '-30px',
              width: '140px', height: '140px', borderRadius: '50%',
              background: `radial-gradient(circle, ${project.accent}30, transparent 70%)`,
            }} />
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: '80px',
              background: 'linear-gradient(to bottom, transparent, rgba(10,10,10,0.9))',
            }} />
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontSize: '3rem', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))' }}>
                {project.emoji}
              </span>
            </div>
          </>
        )}

        {/* Number badge */}
        <div style={{
          position: 'absolute', top: '1rem', left: '1rem',
          fontFamily: 'Playfair Display, serif',
          fontSize: '0.7rem', fontWeight: 700,
          color: 'rgba(255,255,255,0.5)',
          letterSpacing: '0.15em',
          textShadow: '0 1px 4px rgba(0,0,0,0.8)',
        }}>
          {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
        </div>

        {/* Category pill */}
        <div style={{
          position: 'absolute', top: '1rem', right: '1rem',
          padding: '0.3rem 0.75rem', borderRadius: '50px',
          background: cat.bg, border: `1px solid ${cat.border}`,
          fontSize: '0.68rem', fontWeight: 600, color: cat.color,
          letterSpacing: '0.06em', textTransform: 'uppercase',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}>
          {project.category}
        </div>

        {/* Live arrow on hover */}
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          onClick={e => e.stopPropagation()}
          style={{
            position: 'absolute', bottom: '1rem', right: '1rem',
            width: '38px', height: '38px', borderRadius: '50%',
            background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)',
            border: `1px solid ${project.accent}60`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: project.accent,
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'scale(1) rotate(0deg)' : 'scale(0.7) rotate(-45deg)',
            transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
            textDecoration: 'none',
          }}
        >
          <ArrowUpRight size={16} />
        </a>
      </div>

      {/* Content */}
      <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Tech chips */}
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.9rem' }}>
          {project.tech.map(t => (
            <span key={t} style={{
              fontSize: '0.68rem', padding: '0.2rem 0.6rem',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '4px', color: 'var(--text-muted)',
              fontFamily: 'Inter, sans-serif', fontWeight: 500,
              letterSpacing: '0.04em',
            }}>{t}</span>
          ))}
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '1.25rem', fontWeight: 700,
          color: 'var(--text-primary)',
          marginBottom: '0.65rem',
          lineHeight: 1.2,
        }}>
          {project.title}
        </h3>

        {/* Description */}
        <p style={{
          color: 'var(--text-secondary)', fontSize: '0.875rem',
          lineHeight: 1.75, flexGrow: 1, marginBottom: '1.5rem',
        }}>
          {project.description}
        </p>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: 'auto' }}>
          {/* GitHub */}
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: '0.5rem', padding: '0.65rem 1rem',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '10px',
              fontSize: '0.8rem', fontWeight: 600,
              color: 'var(--text-secondary)',
              transition: 'all 0.25s ease',
              textDecoration: 'none',
              fontFamily: 'Inter, sans-serif',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
              e.currentTarget.style.color = 'var(--text-primary)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
              e.currentTarget.style.color = 'var(--text-secondary)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
            }}
          >
            <GitHubIcon size={15} /> GitHub
          </a>

          {/* Live Demo */}
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: '0.5rem', padding: '0.65rem 1rem',
              background: `linear-gradient(135deg, ${project.accent}22, ${project.accent}11)`,
              border: `1px solid ${project.accent}40`,
              borderRadius: '10px',
              fontSize: '0.8rem', fontWeight: 600,
              color: project.accent,
              transition: 'all 0.25s ease',
              textDecoration: 'none',
              fontFamily: 'Inter, sans-serif',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = `linear-gradient(135deg, ${project.accent}35, ${project.accent}20)`;
              e.currentTarget.style.borderColor = `${project.accent}70`;
              e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = `linear-gradient(135deg, ${project.accent}22, ${project.accent}11)`;
              e.currentTarget.style.borderColor = `${project.accent}40`;
              e.currentTarget.style.transform = 'none';
            }}
          >
            <ExternalLink size={14} /> Live Demo
          </a>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const container = useRef();
  const gridRef = useRef();

  useEffect(() => {
    const t = setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => clearTimeout(t);
  }, []);

  useGSAP(() => {
    gsap.from('.proj-label, .proj-heading, .proj-sub', {
      scrollTrigger: { trigger: container.current, start: 'top bottom', once: true },
      y: 25, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out'
    });
  }, { scope: container });

  useGSAP(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('.project-card');
    gsap.fromTo(cards,
      { opacity: 0, y: 40, scale: 0.95 },
      {
        scrollTrigger: { trigger: gridRef.current, start: 'top bottom', once: true },
        opacity: 1, y: 0, scale: 1,
        duration: 0.6, stagger: 0.12, ease: 'power3.out'
      }
    );
  }, { scope: container });

  return (
    <div ref={container} className="container section" id="projects-inner">
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <div className="proj-label section-label" style={{ justifyContent: 'center' }}>Portfolio</div>
        <h2 className="proj-heading section-heading" style={{ margin: '1rem auto 0' }}>
          Things I've <span className="italic-gold">Built.</span>
        </h2>
        <p className="proj-sub" style={{
          color: 'var(--text-secondary)', maxWidth: '500px',
          margin: '1.25rem auto 0', fontSize: '0.95rem', lineHeight: 1.7,
        }}>
          A collection of pixel-perfect clones and projects — each one a deep dive into a real product's design language and engineering.
        </p>
      </div>

      {/* Project Grid */}
      <div ref={gridRef} style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
        gap: '1.75rem',
      }}>
        {projects.map((project, idx) => (
          <ProjectCard key={project.title} project={project} index={idx} />
        ))}
      </div>

      {/* Bottom CTA */}
      <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
        <a
          href="https://github.com/Het510/CLONE-PROJECTS"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
            padding: '0.85rem 2rem',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '50px',
            fontSize: '0.875rem', fontWeight: 500,
            color: 'var(--text-secondary)',
            transition: 'all 0.3s ease',
            textDecoration: 'none',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'var(--border-gold)';
            e.currentTarget.style.color = 'var(--gold-1)';
            e.currentTarget.style.background = 'rgba(212,175,55,0.04)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
            e.currentTarget.style.color = 'var(--text-secondary)';
            e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
          }}
        >
          <GitHubIcon size={16} />
          View All on GitHub
          <ArrowUpRight size={14} />
        </a>
      </div>
    </div>
  );
};

export default Projects;

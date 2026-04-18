import React from 'react';
import { personalInfo } from '../data/portfolioData';
import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

// Inline brand SVGs
const GithubIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);
const LinkedinIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);
const TwitterIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
  </svg>
);
const YoutubeIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const navCols = [
  {
    title: 'Navigation',
    links: [
      { label: 'Home', href: '#home' },
      { label: 'About', href: '#about' },
      { label: 'Skills', href: '#skills' },
      { label: 'Projects', href: '#projects' },
    ]
  },
  {
    title: 'More',
    links: [
      { label: 'Hackathons', href: '#hackathons' },
      { label: 'Certificates', href: '#certificates' },
      { label: 'Achievements', href: '#achievements' },
      { label: 'Contact', href: '#contact' },
    ]
  }
];

const socials = [
  { icon: <GithubIcon size={18} />, href: personalInfo.socials.github, label: 'GitHub' },
  { icon: <LinkedinIcon size={18} />, href: personalInfo.socials.linkedin, label: 'LinkedIn' },
  { icon: <TwitterIcon size={18} />, href: personalInfo.socials.twitter, label: 'Twitter' },
  { icon: <YoutubeIcon size={18} />, href: personalInfo.socials.youtube, label: 'YouTube' },
];

const Footer = () => {
  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  };

  return (
    <footer style={{
      background: 'rgba(5,5,5,0.95)',
      borderTop: '1px solid rgba(255,255,255,0.04)',
      padding: '5rem 0 2.5rem'
    }}>
      <div className="container">
        {/* Top grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '3rem',
          marginBottom: '4rem'
        }}>
          {/* Brand col */}
          <div style={{ gridColumn: 'span 1' }}>
            <a
              href="#home"
              onClick={e => { e.preventDefault(); scrollTo('#home'); }}
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '1.8rem', fontWeight: 700,
                display: 'inline-block', marginBottom: '1rem'
              }}
            >
              Het<span style={{
                fontStyle: 'italic',
                background: 'var(--gold-gradient-text)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>.</span>
            </a>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.8, marginBottom: '1.5rem', maxWidth: '220px' }}>
              Full Stack Developer crafting immersive digital experiences.
            </p>
            {/* Socials */}
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              {socials.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.label}
                  style={{
                    width: '36px', height: '36px', borderRadius: '8px',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--text-secondary)', fontSize: '0.85rem',
                    transition: 'all 0.25s ease'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--border-gold)';
                    e.currentTarget.style.color = 'var(--gold-1)';
                    e.currentTarget.style.background = 'rgba(212,175,55,0.06)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border-subtle)';
                    e.currentTarget.style.color = 'var(--text-secondary)';
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav cols */}
          {navCols.map(col => (
            <div key={col.title}>
              <h4 style={{
                fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase',
                letterSpacing: '0.2em', color: 'var(--text-muted)', marginBottom: '1.25rem',
                fontFamily: 'Inter, sans-serif'
              }}>
                {col.title}
              </h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {col.links.map(link => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={e => { e.preventDefault(); scrollTo(link.href); }}
                      style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', transition: 'color 0.2s ease' }}
                      onMouseEnter={e => e.target.style.color = 'var(--gold-1)'}
                      onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* CTA col */}
          <div>
            <h4 style={{
              fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase',
              letterSpacing: '0.2em', color: 'var(--text-muted)', marginBottom: '1.25rem',
              fontFamily: 'Inter, sans-serif'
            }}>
              Quick Actions
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a
                href={personalInfo.resumeLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                  fontSize: '0.875rem', color: 'var(--violet-1)',
                  background: 'rgba(139,92,246,0.06)',
                  border: '1px solid rgba(139,92,246,0.2)',
                  borderRadius: '8px', padding: '0.6rem 1rem',
                  transition: 'all 0.2s ease', fontWeight: 500,
                  textDecoration: 'none'
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(139,92,246,0.15)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(139,92,246,0.06)'}
              >
                <ExternalLink size={13} /> View Resume
              </a>
              <a
                href={personalInfo.socials.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                  fontSize: '0.875rem', color: 'var(--text-secondary)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '8px', padding: '0.6rem 1rem',
                  transition: 'all 0.2s ease', fontWeight: 500
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--border-gold)';
                  e.currentTarget.style.color = 'var(--gold-1)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }}
              >
                <ExternalLink size={13} /> LeetCode Profile
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)', marginBottom: '2rem' }} />

        {/* Bottom row */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '1rem'
        }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} Het Rathod. All rights reserved.
          </p>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Built with <span style={{ color: 'var(--gold-1)' }}>React</span> &amp; GSAP
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

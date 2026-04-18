import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { personalInfo } from '../data/portfolioData';

const navLinks = [
  { name: 'Home',         path: '/'             },
  { name: 'About',        path: '/about'        },
  { name: 'Skills',       path: '/skills'       },
  { name: 'Projects',     path: '/projects'     },
  { name: 'Hackathons',   path: '/hackathons'   },
  { name: 'Certificates', path: '/certificates' },
  { name: 'Contact',      path: '/contact'      },
];

const Navbar = () => {
  const [isOpen, setIsOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mobileMenuRef           = useRef();
  const location                = useLocation();

  // Scroll-based background blur
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  // Mobile menu animation
  useGSAP(() => {
    if (!mobileMenuRef.current) return;
    if (isOpen) {
      gsap.to(mobileMenuRef.current, { y: 0, opacity: 1, duration: 0.35, display: 'flex', ease: 'power3.out' });
      gsap.fromTo('.mobile-nav-item',
        { y: -12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, stagger: 0.055, delay: 0.07, ease: 'power3.out' }
      );
    } else {
      gsap.to(mobileMenuRef.current, { y: -8, opacity: 0, duration: 0.22, display: 'none', ease: 'power3.in' });
    }
  }, { dependencies: [isOpen] });

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname === path;
  };

  return (
    <nav
      id="main-navbar"
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%',
        zIndex: 1000,
        background: scrolled ? 'rgba(4,4,13,0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(28px) saturate(1.4)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(28px) saturate(1.4)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(139,92,246,0.12)' : 'none',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <div
        className="container"
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '76px' }}
      >
        {/* Logo — image */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="https://res.cloudinary.com/dsrczav6p/image/upload/q_auto,f_auto,e_make_transparent:10/v1776467361/Gemini_Generated_Image_jj44ijj44ijj44ij_qz0gf8.png"
            alt="Het Rathod Logo"
            style={{
              height: '42px',
              width: 'auto',
              objectFit: 'contain',
              transition: 'opacity 0.25s ease, transform 0.3s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.8'; e.currentTarget.style.transform = 'scale(1.05)'; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1';   e.currentTarget.style.transform = 'scale(1)'; }}
          />
        </Link>

        {/* Desktop Nav */}
        <ul className="desktop-only" style={{ display: 'flex', gap: '0.15rem', alignItems: 'center' }}>
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <li key={link.name}>
                <Link
                  to={link.path}
                  style={{
                    padding: '0.45rem 0.9rem',
                    fontSize: '0.84rem',
                    fontWeight: active ? 600 : 400,
                    fontFamily: 'Inter, sans-serif',
                    color: active ? 'var(--violet-1)' : 'var(--text-secondary)',
                    borderRadius: '8px',
                    transition: 'all 0.22s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    position: 'relative',
                  }}
                  onMouseEnter={e => { if (!active) e.currentTarget.style.color = 'var(--text-primary)'; }}
                  onMouseLeave={e => { if (!active) e.currentTarget.style.color = 'var(--text-secondary)'; }}
                >
                  {link.name}
                  {active && (
                    <span style={{
                      position: 'absolute', bottom: '1px',
                      left: '50%', transform: 'translateX(-50%)',
                      width: '5px', height: '5px', borderRadius: '50%',
                      background: 'linear-gradient(135deg, var(--violet-1), var(--cyan-1))',
                      display: 'block',
                    }} />
                  )}
                </Link>
              </li>
            );
          })}
          <li style={{ marginLeft: '0.5rem' }}>
            <a
              href={personalInfo.resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '0.45rem 1.15rem',
                borderRadius: '50px',
                border: '1px solid var(--border-violet)',
                color: 'var(--violet-1)',
                fontSize: '0.84rem',
                fontWeight: 500,
                fontFamily: 'Inter, sans-serif',
                transition: 'all 0.25s ease',
                display: 'inline-block',
                textDecoration: 'none',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(124,58,237,0.12)';
                e.currentTarget.style.boxShadow  = '0 0 16px rgba(124,58,237,0.2)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.boxShadow  = 'none';
              }}
            >
              Resume ↗
            </a>
          </li>
        </ul>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="mobile-toggle"
          aria-label="Toggle menu"
          style={{
            background: 'none', border: 'none',
            color: 'var(--text-primary)', cursor: 'pointer',
            padding: '0.5rem', display: 'none',
          }}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        ref={mobileMenuRef}
        style={{
          position: 'absolute', top: '76px', left: 0, width: '100%',
          background: 'rgba(4,4,13,0.97)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          borderBottom: '1px solid rgba(139,92,246,0.1)',
          padding: '1.25rem 0 1.5rem',
          flexDirection: 'column', alignItems: 'center',
          gap: '0.35rem', display: 'none', opacity: 0,
          transform: 'translateY(-10px)',
        }}
      >
        {navLinks.map(link => (
          <Link
            key={link.name}
            to={link.path}
            className="mobile-nav-item"
            style={{
              fontSize: '0.97rem',
              padding: '0.7rem 2rem',
              borderRadius: '10px',
              color: isActive(link.path) ? 'var(--violet-1)' : 'var(--text-secondary)',
              fontWeight: isActive(link.path) ? 600 : 400,
              width: '100%', textAlign: 'center',
              transition: 'all 0.2s ease',
              display: 'block',
            }}
          >
            {link.name}
          </Link>
        ))}
        <a
          href={personalInfo.resumeLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mobile-nav-item"
          style={{
            marginTop: '0.5rem',
            padding: '0.7rem 2rem',
            border: '1px solid var(--border-violet)',
            borderRadius: '50px',
            color: 'var(--violet-1)',
            fontSize: '0.9rem', fontWeight: 500,
            display: 'inline-block',
            textDecoration: 'none',
          }}
        >
          View Resume ↗
        </a>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-only    { display: none !important; }
          .mobile-toggle   { display: block !important; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;

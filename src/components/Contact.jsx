import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Send, Mail, MessageSquare, User, Phone } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

/* ── Inline brand SVGs ── */
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

const socials = [
  { icon: <GithubIcon size={18} />,   label: 'GitHub',   href: personalInfo.socials.github },
  { icon: <LinkedinIcon size={18} />, label: 'LinkedIn', href: personalInfo.socials.linkedin },
  { icon: <TwitterIcon size={18} />,  label: 'Twitter',  href: personalInfo.socials.twitter },
];

/* Contact info items */
const contactItems = [
  {
    icon: <Mail size={18} />,
    label: 'Email',
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
  },
  {
    icon: <Phone size={18} />,
    label: 'Phone',
    value: personalInfo.phone,
    href: `tel:${personalInfo.phone.replace(/\s/g, '')}`,
  },
];

const Contact = () => {
  const container = useRef();
  const [name, setName]       = useState('');
  const [email, setEmail]     = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent]       = useState(false);

  useEffect(() => {
    const t = setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => clearTimeout(t);
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: container.current, start: 'top bottom', once: true }
    });
    tl.from('.contact-label, .contact-heading', {
      y: 25, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out'
    }).from('.contact-left', {
      x: -40, opacity: 0, duration: 0.8, ease: 'power3.out'
    }, '-=0.4').from('.contact-right', {
      x: 40, opacity: 0, duration: 0.8, ease: 'power3.out'
    }, '<');
  }, { scope: container });

  /* ── Mailto submit — opens Gmail/mail client with pre-filled message ── */
  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body    = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 6000);
  };

  return (
    <div ref={container} className="container section" id="contact-inner">

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <div className="contact-label section-label" style={{ justifyContent: 'center' }}>Say Hello</div>
        <h2 className="contact-heading section-heading" style={{ margin: '1rem auto 0' }}>
          Get In <span className="italic-gold">Touch.</span>
        </h2>
        <p style={{
          color: 'var(--text-secondary)', maxWidth: '480px', margin: '1.25rem auto 0',
          fontSize: '0.95rem', lineHeight: 1.7
        }}>
          Have a project in mind or just want to chat? I'm always open to new opportunities and conversations.
        </p>
      </div>

      {/* Two Columns */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '3rem',
        maxWidth: '920px',
        margin: '0 auto',
      }}>

        {/* ── Left: Contact Info ── */}
        <div className="contact-left">
          <h3 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '1.4rem', fontWeight: 700,
            color: 'var(--text-primary)', marginBottom: '1rem',
          }}>
            Let's build something<br />
            <span style={{ fontStyle: 'italic', color: 'var(--violet-1)' }}>great together.</span>
          </h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '2rem', fontSize: '0.9rem' }}>
            I'm currently available for freelance work. Whether it's a full-stack app, a UI redesign, or a quick consultation — I'd love to hear about your project.
          </p>

          {/* Email + Phone cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
            {contactItems.map(item => (
              <a
                key={item.label}
                href={item.href}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.85rem',
                  padding: '0.9rem 1.25rem',
                  background: 'rgba(20,184,166,0.05)',
                  border: '1px solid rgba(20,184,166,0.14)',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(20,184,166,0.35)';
                  e.currentTarget.style.background  = 'rgba(20,184,166,0.1)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(20,184,166,0.14)';
                  e.currentTarget.style.background  = 'rgba(20,184,166,0.05)';
                }}
              >
                <div style={{
                  width: '36px', height: '36px', borderRadius: '9px', flexShrink: 0,
                  background: 'rgba(20,184,166,0.1)',
                  border: '1px solid rgba(20,184,166,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--violet-1)',
                }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '0.1rem' }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                    {item.value}
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Social links */}
          <div style={{ display: 'flex', gap: '0.6rem' }}>
            {socials.map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                title={s.label}
                style={{
                  width: '44px', height: '44px', borderRadius: '10px',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--text-secondary)', transition: 'all 0.25s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(20,184,166,0.4)';
                  e.currentTarget.style.color       = 'var(--violet-1)';
                  e.currentTarget.style.background  = 'rgba(20,184,166,0.08)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  e.currentTarget.style.color       = 'var(--text-secondary)';
                  e.currentTarget.style.background  = 'transparent';
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* ── Right: Form ── */}
        <div className="contact-right glass-card" style={{ padding: '2rem' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

            {/* Name */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                <User size={12} /> Name
              </label>
              <input
                type="text"
                required
                placeholder="Your full name"
                value={name}
                onChange={e => setName(e.target.value)}
                style={{ marginBottom: 0 }}
              />
            </div>

            {/* Email */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                <Mail size={12} /> Email
              </label>
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ marginBottom: 0 }}
              />
            </div>

            {/* Message */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                <MessageSquare size={12} /> Message
              </label>
              <textarea
                rows={5}
                required
                placeholder="Tell me about your project..."
                value={message}
                onChange={e => setMessage(e.target.value)}
                style={{ marginBottom: 0, resize: 'vertical' }}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn btn-primary"
              style={{ marginTop: '0.5rem', width: '100%', justifyContent: 'center' }}
            >
              <Send size={16} /> Send Message
            </button>

            {/* Confirmation */}
            {sent && (
              <div style={{
                padding: '0.75rem 1rem', borderRadius: '8px', fontSize: '0.875rem',
                background: 'rgba(20,184,166,0.08)',
                border: '1px solid rgba(20,184,166,0.25)',
                color: 'var(--violet-1)', textAlign: 'center',
              }}>
                ✓ Your mail client opened! Message pre-filled for <strong>hetrathod49@gmail.com</strong>
              </div>
            )}

            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textAlign: 'center' }}>
              Clicking "Send" opens your mail client with the message pre-filled.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;

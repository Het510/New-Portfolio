import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { LoaderCircle, Mail, MapPin, MessageSquare, Phone, Send, User } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

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
  { icon: <GithubIcon size={18} />, label: 'GitHub', href: personalInfo.socials.github },
  { icon: <LinkedinIcon size={18} />, label: 'LinkedIn', href: personalInfo.socials.linkedin },
  { icon: <TwitterIcon size={18} />, label: 'Twitter', href: personalInfo.socials.twitter },
];

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
  {
    icon: <MapPin size={18} />,
    label: 'Location',
    value: personalInfo.location,
    href: 'https://maps.google.com/?q=Gandhinagar,Gujrat',
  },
];

const initialForm = {
  name: '',
  email: '',
  message: '',
};

const Contact = () => {
  const container = useRef();
  const [formData, setFormData] = useState(initialForm);
  const [status, setStatus] = useState('idle');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    const t = setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => clearTimeout(t);
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: container.current, start: 'top bottom', once: true },
    });

    tl.from('.contact-label, .contact-heading', {
      y: 25,
      opacity: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power3.out',
    })
      .from('.contact-left', {
        x: -40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.4')
      .from('.contact-right', {
        x: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      }, '<');
  }, { scope: container });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('loading');
    setFeedback('');

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${personalInfo.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `Portfolio Contact from ${formData.name}`,
          _template: 'table',
          _captcha: 'false',
          _replyto: formData.email,
        }),
      });

      const result = await response.json();

      if (!response.ok || result.success === 'false') {
        throw new Error(result.message || 'Unable to send your message right now.');
      }

      setStatus('success');
      setFeedback(`Message sent successfully to ${personalInfo.email}.`);
      setFormData(initialForm);
    } catch (error) {
      setStatus('error');
      setFeedback(error.message || 'Something went wrong while sending the message.');
    }
  };

  return (
    <div ref={container} className="container section" id="contact-inner">
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <div className="contact-label section-label" style={{ justifyContent: 'center' }}>Say Hello</div>
        <h2 className="contact-heading section-heading" style={{ margin: '1rem auto 0' }}>
          Get In <span className="italic-gold">Touch.</span>
        </h2>
        <p
          style={{
            color: 'var(--text-secondary)',
            maxWidth: '480px',
            margin: '1.25rem auto 0',
            fontSize: '0.95rem',
            lineHeight: 1.7,
          }}
        >
          Have a project in mind or just want to chat? I'm always open to new opportunities and conversations.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '3rem',
          maxWidth: '980px',
          margin: '0 auto',
        }}
      >
        <div className="contact-left">
          <h3
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '1.4rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: '1rem',
            }}
          >
            Let's build something
            <br />
            <span style={{ fontStyle: 'italic', color: 'var(--violet-1)' }}>great together.</span>
          </h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '2rem', fontSize: '0.9rem' }}>
            I'm currently available for freelance work. Whether it's a full-stack app, a UI redesign, or a quick consultation,
            I'd love to hear about your project.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
            {contactItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.label === 'Location' ? '_blank' : undefined}
                rel={item.label === 'Location' ? 'noopener noreferrer' : undefined}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                  padding: '0.9rem 1.25rem',
                  background: 'rgba(20,184,166,0.05)',
                  border: '1px solid rgba(20,184,166,0.14)',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(20,184,166,0.35)';
                  e.currentTarget.style.background = 'rgba(20,184,166,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(20,184,166,0.14)';
                  e.currentTarget.style.background = 'rgba(20,184,166,0.05)';
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '9px',
                    flexShrink: 0,
                    background: 'rgba(20,184,166,0.1)',
                    border: '1px solid rgba(20,184,166,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--violet-1)',
                  }}
                >
                  {item.icon}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: 'var(--text-muted)',
                      marginBottom: '0.1rem',
                    }}
                  >
                    {item.label}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                    {item.value}
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '0.6rem' }}>
            {socials.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                title={item.label}
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-secondary)',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(20,184,166,0.4)';
                  e.currentTarget.style.color = 'var(--violet-1)';
                  e.currentTarget.style.background = 'rgba(20,184,166,0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="contact-right glass-card" style={{ padding: '2rem' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'var(--text-secondary)',
                  marginBottom: '0.4rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                <User size={12} /> Name
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="Your full name"
                value={formData.name}
                onChange={handleChange}
                style={{ marginBottom: 0 }}
              />
            </div>

            <div>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'var(--text-secondary)',
                  marginBottom: '0.4rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                <Mail size={12} /> Email
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                style={{ marginBottom: 0 }}
              />
            </div>

            <div>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'var(--text-secondary)',
                  marginBottom: '0.4rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                <MessageSquare size={12} /> Message
              </label>
              <textarea
                rows={5}
                name="message"
                required
                placeholder="Tell me about your project..."
                value={formData.message}
                onChange={handleChange}
                style={{ marginBottom: 0, resize: 'vertical' }}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={status === 'loading'}
              style={{ marginTop: '0.5rem', width: '100%', justifyContent: 'center', opacity: status === 'loading' ? 0.85 : 1 }}
            >
              {status === 'loading' ? <LoaderCircle size={16} className="contact-spinner" /> : <Send size={16} />}
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </button>

            {feedback && (
              <div
                style={{
                  padding: '0.85rem 1rem',
                  borderRadius: '10px',
                  fontSize: '0.875rem',
                  background: status === 'success' ? 'rgba(20,184,166,0.08)' : 'rgba(239,68,68,0.08)',
                  border: status === 'success' ? '1px solid rgba(20,184,166,0.25)' : '1px solid rgba(239,68,68,0.25)',
                  color: status === 'success' ? 'var(--violet-1)' : '#fca5a5',
                  textAlign: 'center',
                }}
              >
                {feedback}
              </div>
            )}

            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textAlign: 'center' }}>
              Form submissions are delivered to {personalInfo.email}.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;

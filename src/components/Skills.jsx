import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Tech stack icons — using devicons CDN
const techStack = [
  { name: 'React', icon: 'https://cdn.simpleicons.org/react/61DAFB' },
  { name: 'JavaScript', icon: 'https://cdn.simpleicons.org/javascript/F7DF1E' },
  { name: 'TypeScript', icon: 'https://cdn.simpleicons.org/typescript/3178C6' },
  { name: 'Node.js', icon: 'https://cdn.simpleicons.org/nodedotjs/339933' },
  { name: 'MongoDB', icon: 'https://cdn.simpleicons.org/mongodb/47A248' },
  { name: 'Express', icon: 'https://cdn.simpleicons.org/express/ffffff' },
  { name: 'HTML5', icon: 'https://cdn.simpleicons.org/html5/E34F26' },
  { name: 'CSS3', icon: 'https://cdn.simpleicons.org/css/1572B6' },
  { name: 'Git', icon: 'https://cdn.simpleicons.org/git/F05032' },
  { name: 'Figma', icon: 'https://cdn.simpleicons.org/figma/F24E1E' },
  { name: 'Vite', icon: 'https://cdn.simpleicons.org/vite/646CFF' },
  { name: 'MySQL', icon: 'https://cdn.simpleicons.org/mysql/4479A1' },
  { name: 'Postman', icon: 'https://cdn.simpleicons.org/postman/FF6C37' },
  { name: 'VS Code', icon: 'https://cdn.simpleicons.org/vscodium/007ACC' },
  { name: 'GitHub', icon: 'https://cdn.simpleicons.org/github/ffffff' },
  { name: 'TailwindCSS', icon: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
];

const skillCategories = [
  {
    title: 'Frontend',
    icon: '⬡',
    color: 'rgba(97, 218, 251, 0.15)',
    borderColor: 'rgba(97, 218, 251, 0.2)',
    skills: ['React', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'TailwindCSS', 'Vite'],
  },
  {
    title: 'Backend',
    icon: '⬡',
    color: 'rgba(71, 162, 72, 0.1)',
    borderColor: 'rgba(71, 162, 72, 0.2)',
    skills: ['Node.js', 'Express', 'MongoDB', 'MySQL'],
  },
  {
    title: 'Tools & Design',
    icon: '⬡',
    color: 'rgba(242, 78, 30, 0.1)',
    borderColor: 'rgba(242, 78, 30, 0.2)',
    skills: ['Git', 'GitHub', 'Figma', 'VS Code', 'Postman'],
  },
];

const TechBadge = ({ name, icon }) => (
  <div style={{
    display: 'flex', alignItems: 'center', gap: '0.5rem',
    padding: '0.5rem 1rem',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: '8px',
    fontSize: '0.8rem', fontWeight: 500,
    color: 'var(--text-secondary)',
    transition: 'all 0.2s ease',
    cursor: 'default',
    flexShrink: 0,
  }}
    onMouseEnter={e => {
      e.currentTarget.style.borderColor = 'var(--border-gold)';
      e.currentTarget.style.color = 'var(--text-primary)';
      e.currentTarget.style.background = 'rgba(212,175,55,0.05)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
      e.currentTarget.style.color = 'var(--text-secondary)';
      e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
    }}
  >
    <img src={icon} alt={name} width="16" height="16" style={{ objectFit: 'contain' }} />
    {name}
  </div>
);

const Skills = () => {
  const container = useRef();
  const marqueeRef1 = useRef();
  const marqueeRef2 = useRef();

  useEffect(() => {
    const t = setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => clearTimeout(t);
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: container.current, start: 'top bottom', once: true }
    });
    tl.from('.skills-label, .skills-heading', {
      y: 25, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out'
    }).from('.skill-cat-card', {
      y: 40, opacity: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out'
    }, '-=0.4');

    // Marquee animations
    if (marqueeRef1.current) {
      gsap.to(marqueeRef1.current, {
        x: '-50%', duration: 30, repeat: -1, ease: 'none'
      });
    }
    if (marqueeRef2.current) {
      gsap.to(marqueeRef2.current, {
        x: '0%', duration: 25, repeat: -1, ease: 'none', startAt: { x: '-50%' }
      });
    }
  }, { scope: container });

  const half = Math.ceil(techStack.length / 2);
  const row1 = [...techStack.slice(0, half), ...techStack.slice(0, half)];
  const row2 = [...techStack.slice(half), ...techStack.slice(half)];

  return (
    <div ref={container} className="section" id="skills-inner">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="skills-label section-label" style={{ justifyContent: 'center' }}>Technical Skills</div>
          <h2 className="skills-heading section-heading" style={{ margin: '1rem auto 0' }}>
            My Tech <span className="italic-gold">Stack.</span>
          </h2>
        </div>

        {/* Category Cards */}
        <div className="skills-cats" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginBottom: '4rem'
        }}>
          {skillCategories.map(cat => (
            <div key={cat.title} className="skill-cat-card glass-card" style={{ padding: '1.75rem' }}>
              <h3 style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '1.2rem', fontWeight: 600, marginBottom: '1.5rem',
                color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem'
              }}>
                <span style={{
                  width: '8px', height: '8px', borderRadius: '50%',
                  background: 'var(--gold-gradient)', display: 'inline-block'
                }} />
                {cat.title}
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                {cat.skills.map(skill => {
                  const tech = techStack.find(t => t.name === skill);
                  return tech ? (
                    <div key={skill} style={{
                      display: 'flex', alignItems: 'center', gap: '0.4rem',
                      padding: '0.35rem 0.85rem',
                      background: cat.color,
                      border: `1px solid ${cat.borderColor}`,
                      borderRadius: '6px',
                      fontSize: '0.78rem', color: 'var(--text-secondary)',
                      transition: 'all 0.2s ease'
                    }}
                      onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; }}
                    >
                      <img src={tech.icon} alt={skill} width="14" height="14" style={{ objectFit: 'contain' }} />
                      {skill}
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Rows */}
      <div style={{ overflow: 'hidden', padding: '0.75rem 0', position: 'relative' }}>
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: '80px',
          background: 'linear-gradient(to right, var(--bg-primary), transparent)',
          zIndex: 1, pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: '80px',
          background: 'linear-gradient(to left, var(--bg-primary), transparent)',
          zIndex: 1, pointerEvents: 'none'
        }} />
        <div ref={marqueeRef1} style={{ display: 'flex', gap: '0.75rem', width: 'max-content' }}>
          {row1.map((t, i) => <TechBadge key={i} name={t.name} icon={t.icon} />)}
        </div>
      </div>

      <div style={{ overflow: 'hidden', padding: '0.75rem 0', position: 'relative', marginTop: '0.5rem' }}>
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: '80px',
          background: 'linear-gradient(to right, var(--bg-primary), transparent)',
          zIndex: 1, pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: '80px',
          background: 'linear-gradient(to left, var(--bg-primary), transparent)',
          zIndex: 1, pointerEvents: 'none'
        }} />
        <div ref={marqueeRef2} style={{ display: 'flex', gap: '0.75rem', width: 'max-content' }}>
          {row2.map((t, i) => <TechBadge key={i} name={t.name} icon={t.icon} />)}
        </div>
      </div>
    </div>
  );
};

export default Skills;

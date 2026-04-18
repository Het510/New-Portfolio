import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { personalInfo } from '../data/portfolioData';

const GithubIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

const TwitterIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
  </svg>
);

const YoutubeIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const LeetcodeIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125 2.513 5.277 5.277 0 0 0 1.062 2.362 5.33 5.33 0 0 0 2.107 1.659 5.232 5.232 0 0 0 2.502.261 5.293 5.293 0 0 0 2.399-1.02L17.3 12.016c.4-.383.626-.921.626-1.48a2.127 2.127 0 0 0-.626-1.479L13.483 5.23l-1.042 1.066 3.731 3.744a.65.65 0 0 1 .184.456c0 .178-.069.349-.184.456L8.847 18.275a3.836 3.836 0 0 1-2.73 1.109 3.81 3.81 0 0 1-2.697-1.11 3.824 3.824 0 0 1-1.115-2.695 3.805 3.805 0 0 1 1.135-2.711l3.774-4.041 5.305-5.688a2.809 2.809 0 0 1 2.012-.835 2.83 2.83 0 0 1 1.992.835L22.613 9.3l-1.066 1.042-4.223-4.256-3.841-3.843a1.411 1.411 0 0 0-.965-.411v-.022zM21.5 14.857L11.835 24l-1.066-1.041 9.664-9.143z" />
  </svg>
);

const stats = [
  { value: '10+', label: 'Projects Built', tone: 'teal' },
  { value: '10+', label: 'Tools and Tech', tone: 'cyan' },
  { value: '2+', label: 'Years Building', tone: 'gold' },
];

const focusAreas = ['Full Stack Builds', 'UI Motion', 'Hackathons', 'Creative Frontend'];
const signalLines = ['React + Node', 'Motion Systems', 'Pixel Precision', 'Rapid Shipping'];

const socialLinks = [
  { label: 'GitHub', icon: <GithubIcon />, href: personalInfo.socials.github, tone: 'teal' },
  { label: 'LinkedIn', icon: <LinkedinIcon />, href: personalInfo.socials.linkedin, tone: 'cyan' },
  { label: 'YouTube', icon: <YoutubeIcon />, href: personalInfo.socials.youtube, tone: 'gold' },
  { label: 'LeetCode', icon: <LeetcodeIcon />, href: personalInfo.socials.leetcode, tone: 'gold' },
  { label: 'Twitter', icon: <TwitterIcon />, href: personalInfo.socials.twitter, tone: 'neutral' },
];

const About = () => {
  const container = useRef();

  useEffect(() => {
    const t = setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => clearTimeout(t);
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: container.current, start: 'top bottom', once: true },
    });

    tl.from('.about-label', { y: 20, opacity: 0, duration: 0.5, ease: 'power3.out' })
      .from('.about-heading', { y: 25, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.3')
      .from('.about-bio p', { y: 15, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' }, '-=0.4')
      .from('.about-socials-btn', { scale: 0.94, opacity: 0, duration: 0.45, stagger: 0.08, ease: 'back.out(2)' }, '-=0.25')
      .from('.about-spotlight', { x: 40, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.45')
      .from('.about-stat', { y: 24, opacity: 0, scale: 0.94, duration: 0.55, stagger: 0.08, ease: 'back.out(1.4)' }, '-=0.35')
      .from('.about-chip', { y: 12, opacity: 0, duration: 0.35, stagger: 0.04, ease: 'power2.out' }, '-=0.3');
  }, { scope: container });

  return (
    <div ref={container} className="container section" id="about-inner">
      <div style={{ marginBottom: '0.75rem' }}>
        <div className="about-label section-label">About Me</div>
      </div>

      <h2 className="about-heading section-heading about-heading-limit">
        Crafting Digital <span className="italic-violet">Experiences.</span>
      </h2>

      <div className="about-layout">
        <div className="about-copy">
          <div className="about-bio">
            <p>
              I'm{' '}
              <strong className="about-name-highlight">
                Het Rathod
              </strong>
              , a passionate Full Stack Developer from India who loves building beautiful,
              performant web applications that make a real impact.
            </p>
            <p>
              My journey started with curiosity about how things work on the web. Today I specialize
              in crafting seamless user experiences with React, Node.js, and modern web technologies,
              plus pixel-perfect UI clones that sharpen my eye for detail.
            </p>
            <p>
              When I'm not coding, I participate in hackathons, contribute to open source, and explore
              the latest in UI/UX design. I believe great software is a perfect blend of{' '}
              <span className="about-emphasis">logic and artistry</span>.
            </p>
          </div>

          <div className="about-socials-row">
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`about-socials-btn about-socials-btn-${item.tone}`}
              >
                {item.icon}
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div className="about-spotlight glass-card">
          <div className="about-spotlight-orb" />
          <div className="about-spotlight-gridlines" />
          <div className="about-spotlight-rings">
            <span />
            <span />
            <span />
          </div>

          <div className="about-spotlight-top">
            <div>
              <div className="about-spotlight-kicker">Creative Developer Mode</div>
              <h3 className="about-spotlight-title">Designing interfaces with energy, rhythm, and edge.</h3>
            </div>
            <div className="about-availability-pill">Open to freelance work</div>
          </div>

          <div className="about-spotlight-grid">
            {stats.map((stat) => (
              <div key={stat.label} className={`about-stat about-stat-${stat.tone}`}>
                <div className="about-stat-value">{stat.value}</div>
                <div className="about-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="about-quote-card">
            <div className="about-quote-mark">"</div>
            <p>
              I like products that feel fast, clear, and a little unforgettable.
            </p>
          </div>

          <div className="about-signal-board">
            <div className="about-signal-board-copy">
              <span className="about-signal-label">Visual Pulse</span>
              <strong>Turning blank space into brand presence.</strong>
            </div>
            <div className="about-signal-wave">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>

          <div className="about-focus">
            <div className="about-focus-label">Current Focus</div>
            <div className="about-focus-chips">
              {focusAreas.map((item) => (
                <span key={item} className="about-chip">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="about-signal-ticker">
            {signalLines.map((item) => (
              <span key={item} className="about-signal-pill">
                {item}
              </span>
            ))}
          </div>

          <div className="about-footer-line">
            <span>{personalInfo.location}</span>
            <span>Building from India for global clients</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

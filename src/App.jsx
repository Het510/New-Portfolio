import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import Background from './components/Background';
import Loader from './components/Loader';
import Footer from './components/Footer';

import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Hackathons from './components/Hackathons';
import Contact from './components/Contact';
import ResumeViewer from './components/ResumeViewer';
import Achievements from './components/Achievements';

gsap.registerPlugin(ScrollTrigger);

export let lenisInstance = null;

/* ─────────────────────────────────────────────
   Individual section pages (each has its own route)
───────────────────────────────────────────── */
const PageWrapper = ({ children, showFooter = false }) => (
  <>
    <main style={{ paddingTop: '76px', minHeight: '100vh' }}>
      {children}
    </main>
    {showFooter && <Footer />}
  </>
);

/* Home — shows all sections stacked (the default experience) */
const HomePage = () => (
  <PageWrapper showFooter>
    <section id="home"><Hero /></section>
    <section id="about"><About /></section>
    <section id="skills"><Skills /></section>
    <section id="projects"><Projects /></section>
    <section id="certificates"><Certificates /></section>
    <section id="hackathons"><Hackathons /></section>
    <section id="achievements"><Achievements /></section>
    <section id="contact"><Contact /></section>
  </PageWrapper>
);

/* Stand-alone section pages */
const AboutPage        = () => <PageWrapper showFooter><About /></PageWrapper>;
const SkillsPage       = () => <PageWrapper showFooter><Skills /></PageWrapper>;
const ProjectsPage     = () => <PageWrapper showFooter><Projects /></PageWrapper>;
const CertificatesPage = () => <PageWrapper showFooter><Certificates /></PageWrapper>;
const HackathonsPage   = () => <PageWrapper showFooter><Hackathons /></PageWrapper>;
const ContactPage      = () => <PageWrapper showFooter><Contact /></PageWrapper>;

/* ─────────────────────────────────────────────
   Lenis smooth scroll — reinit on route change
───────────────────────────────────────────── */
function LenisProvider() {
  const location = useLocation();

  useEffect(() => {
    const scrollToHashTarget = () => {
      if (!location.hash) {
        window.scrollTo(0, 0);
        return;
      }

      const el = document.querySelector(location.hash);
      if (!el) return;

      const navOffset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo({ top, behavior: 'smooth' });
    };

    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      smoothTouch: false,
      touchMultiplier: 2,
      wheelMultiplier: 1,
    });

    lenisInstance = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });

    const hashTimer = window.setTimeout(scrollToHashTarget, 160);

    return () => {
      window.clearTimeout(hashTimer);
      lenisInstance = null;
      lenis.destroy();
      gsap.ticker.remove((time) => { lenis.raf(time * 1000); });
    };
  }, [location.pathname, location.hash]);

  return null;
}

/* ─────────────────────────────────────────────
   Root App
───────────────────────────────────────────── */
function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : '';
  }, [loading]);

  return (
    <>
      <Background />

      {loading && <Loader onComplete={() => setLoading(false)} />}

      {!loading && (
        <>
          <LenisProvider />
          <Navbar />
          <div style={{ opacity: 0, animation: 'fadeInPage 0.8s ease 0.1s forwards' }}>
            <Routes>
              {/* Home — all sections */}
              <Route path="/"             element={<HomePage />} />

              {/* Individual section pages */}
              <Route path="/about"        element={<AboutPage />} />
              <Route path="/skills"       element={<SkillsPage />} />
              <Route path="/projects"     element={<ProjectsPage />} />
              <Route path="/certificates" element={<CertificatesPage />} />
              <Route path="/hackathons"   element={<HackathonsPage />} />
              <Route path="/contact"      element={<ContactPage />} />

              {/* Resume viewer */}
              <Route path="/resume"       element={<ResumeViewer />} />
            </Routes>
          </div>
        </>
      )}

      <style>{`
        @keyframes fadeInPage {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </>
  );
}

export default App;

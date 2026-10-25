import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { SceneContainer } from './components/3d/SceneContainer';
import { TargetingCursor } from './components/hud/TargetingCursor';
import { LiveTelemetryBar } from './components/hud/LiveTelemetryBar';
import { HeroSection } from './components/sections/HeroSection';
import { IntroSection } from './components/sections/IntroSection';
import { CapabilitiesSection } from './components/sections/CapabilitiesSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { JourneyTimeline } from './components/sections/JourneyTimeline';
import { ContactSection } from './components/sections/ContactSection';
import { useWebglSupport } from './hooks/useWebglSupport';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });

  const isWebglSupported = useWebglSupport();
  const prefersReducedMotion = usePrefersReducedMotion();

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Track normalized mouse coordinates (-1 to 1)
  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
    });

    const handleScroll = () => {
      const totalScrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScrollable > 0) {
        setScrollProgress(window.scrollY / totalScrollable);
      }
    };

    // Intercept in-page anchor redirects
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (anchor) {
        const targetId = anchor.getAttribute('href');
        if (targetId && targetId !== '#') {
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            e.preventDefault();
            lenis.scrollTo(targetEl, { offset: -70, duration: 1.1 });
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('click', handleAnchorClick);

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleAnchorClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [prefersReducedMotion]);

  return (
    <div className="relative min-h-screen bg-dark-950 text-slate-100 overflow-hidden selection:bg-lime selection:text-dark-950 font-inter">
      {/* Precision Ambient Glow Cursor */}
      <TargetingCursor />

      {/* Fixed Ambient 3D Neural Canvas with Subtle Depth */}
      {isWebglSupported ? (
        <SceneContainer
          mousePos={mousePos}
          scrollProgress={scrollProgress}
          prefersReducedMotion={prefersReducedMotion}
          isMobile={isMobile}
        />
      ) : (
        <div className="fixed inset-0 ambient-grid-bg opacity-30 pointer-events-none" />
      )}

      {/* Top Glass Navigation Bar */}
      <LiveTelemetryBar scrollProgress={scrollProgress} />

      {/* Main Flow Matching the Requested Layout */}
      <main className="relative z-10 flex flex-col space-y-24 sm:space-y-32">
        {/* 1. Hero with giant PORTFOLIO, developer portrait in suit & smooth entrance */}
        <HeroSection />

        {/* 2. Intro Section with second developer photo, giant INTRO, word-by-word reveal & roaming ticker */}
        <IntroSection />

        {/* 3. WHAT WE CAN DO accordion section with neon lime hover animations */}
        <CapabilitiesSection />

        {/* 4. SELECTED work section with alternating mockups, numbers, descriptions & live demo CTAs */}
        <ProjectsSection />

        {/* 5. Experience & Education Timeline */}
        <JourneyTimeline />

        {/* 6. Get in Touch with 3D wireframe globe, contact form & giant JAY THAKRE brand footer */}
        <ContactSection />
      </main>
    </div>
  );
}

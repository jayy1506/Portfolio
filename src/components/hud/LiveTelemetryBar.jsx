import React, { useState, useEffect } from 'react';
import { profileData } from '../../data/profile';
import { FileText, ArrowUpRight, Sparkles } from 'lucide-react';

export function LiveTelemetryBar({ scrollProgress = 0 }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollPercent = Math.min(100, Math.max(0, Math.round(scrollProgress * 100)));

  return (
    <>
      {/* Top Fixed Executive Glass Navigation Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 px-4 md:px-8 py-3.5 flex items-center justify-between text-xs transition-all duration-300 ${
          scrolled
            ? 'backdrop-blur-xl bg-dark-950/80 border-b border-white/[0.08] shadow-2xl'
            : 'backdrop-blur-md bg-dark-950/40 border-b border-transparent'
        }`}
      >
        {/* Left: Professional Brand Signature */}
        <a href="#hero" className="flex items-center space-x-3 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan to-indigo flex items-center justify-center text-dark-950 font-bold font-mono text-sm shadow-[0_0_15px_rgba(56,189,248,0.4)] group-hover:scale-105 transition-transform">
            JT
          </div>
          <div className="flex flex-col">
            <span className="font-rajdhani font-bold text-sm tracking-wide text-white group-hover:text-cyan transition-colors">
              JAY THAKRE
            </span>
            <span className="text-[10px] font-mono text-hud-dim tracking-wider">
              AI & ML // FULL-STACK
            </span>
          </div>
        </a>

        {/* Center: Clean Modern Navigation Links */}
        <nav className="hidden md:flex items-center space-x-7 text-xs font-mono font-medium tracking-wider text-slate-300">
          <a href="#hero" className="hover:text-lime transition-colors">
            HOME
          </a>
          <a href="#intro" className="hover:text-lime transition-colors">
            ABOUT
          </a>
          <a href="#capabilities" className="hover:text-lime transition-colors">
            SERVICES
          </a>
          <a href="#projects" className="hover:text-lime transition-colors">
            PROJECTS
          </a>
          <a href="#journey" className="hover:text-lime transition-colors">
            EXPERIENCE
          </a>
          <a href="#contact" className="hover:text-lime transition-colors">
            CONTACT
          </a>
        </nav>

        {/* Right: Internship Status & Resume CTA */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="hidden lg:flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>OPEN FOR INTERNSHIPS</span>
          </div>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-white/10 hover:border-cyan/50 bg-white/[0.04] hover:bg-cyan/10 text-slate-200 hover:text-cyan text-xs font-mono transition-all"
          >
            <FileText size={13} />
            <span className="hidden sm:inline">RESUME</span>
          </a>

          <a
            href="#contact"
            className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan to-indigo text-dark-950 font-rajdhani font-bold text-xs tracking-wider shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:shadow-[0_0_25px_rgba(56,189,248,0.5)] transition-all"
          >
            GET IN TOUCH
          </a>
        </div>
      </header>

      {/* Ultra-Slim Fixed Top Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-transparent pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-cyan via-indigo to-emerald-400 transition-all duration-100"
          style={{ width: `${scrollPercent}%` }}
        />
      </div>

      {/* Floating Bottom Telemetry Pill */}
      <div className="fixed bottom-4 right-4 z-30 pointer-events-none">
        <div className="px-3 py-1.5 rounded-full bg-dark-950/80 border border-white/10 backdrop-blur-md text-[11px] font-mono text-slate-400 flex items-center space-x-2 shadow-xl">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
          <span>AIHER WARDHA</span>
          <span className="text-white/20">|</span>
          <span className="text-cyan font-semibold">{scrollPercent}% SCROLLED</span>
        </div>
      </div>
    </>
  );
}

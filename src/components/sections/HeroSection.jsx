import React from 'react';
import { ArrowDownRight, ArrowUpRight, Mail, FileText, Sparkles } from 'lucide-react';
import { profileData } from '../../data/profile';
import jayHeroImg from '../../assets/jay-hero-cutout-transparent.png';

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-between px-4 sm:px-8 text-center pt-24 pb-8 overflow-hidden"
      aria-label="Hero Section"
    >
      {/* Top Header Group */}
      <div className="z-10 flex flex-col items-center max-w-4xl mx-auto pt-6">
        {/* Giant Hero Title: PORTFOLIO */}
        <h1 className="text-6xl sm:text-8xl md:text-9xl font-rajdhani font-black tracking-tight text-white uppercase drop-shadow-[0_10px_40px_rgba(255,255,255,0.12)]">
          PORTFOLIO
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base md:text-lg font-mono text-slate-300 tracking-widest uppercase mt-2">
          AI & FULL-STACK DEVELOPER
        </p>

        {/* Pill Action Button */}
        <div className="flex items-center space-x-3 mt-4">
          <a
            href="#contact"
            className="px-6 py-2 rounded-full border border-white/25 bg-white/[0.05] hover:bg-white text-white hover:text-dark-950 font-rajdhani font-bold text-xs tracking-widest uppercase transition-all duration-300 shadow-lg hover:shadow-cyan/20 cursor-pointer flex items-center space-x-1.5"
          >
            <span>CONTACT</span>
            <ArrowUpRight size={14} />
          </a>

          <a
            href={profileData.socials.resumePdf}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 rounded-full border border-white/10 hover:border-lime bg-dark-950/60 text-slate-300 hover:text-lime font-mono text-xs tracking-wider transition-all duration-300 flex items-center space-x-1.5"
          >
            <FileText size={13} />
            <span>RESUME</span>
          </a>
        </div>
      </div>

      {/* Centerpiece: Developer Portrait in Suit (Isolated Cutout with Ambient Glow) */}
      <div className="relative z-10 w-full max-w-sm sm:max-w-md mx-auto flex items-end justify-center mt-4 mb-0">
        {/* Soft Ambient Radial Underglow behind portrait */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-cyan/20 blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-lime/10 blur-2xl pointer-events-none -z-10" />

        {/* Isolated Cutout Container */}
        <div className="relative group flex items-end justify-center">
          <img
            src={jayHeroImg}
            alt="Jay Thakre - Developer Portrait"
            className="w-auto h-auto max-h-[58vh] sm:max-h-[64vh] object-contain transition-transform duration-700 ease-out group-hover:scale-105 drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)] filter contrast-105"
            loading="eager"
          />

          {/* Bottom Gradient Fade blending into dark background */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-dark-950 via-dark-950/70 to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Floating Scroll Down Cue */}
      <a
        href="#intro"
        className="z-10 flex flex-col items-center text-[11px] font-mono text-slate-400 hover:text-lime transition-colors space-y-1 mb-2 group cursor-pointer"
      >
        <span className="tracking-widest uppercase text-[10px]">SCROLL TO EXPLORE</span>
        <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-lime animate-bounce" />
        </div>
      </a>
    </section>
  );
}

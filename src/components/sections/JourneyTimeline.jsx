import React, { useRef, useEffect, useState } from 'react';
import { profileData } from '../../data/profile';
import {
  GraduationCap,
  Briefcase,
  Award,
  ShieldCheck,
  Calendar,
  MapPin,
  Sparkles,
  Building,
  CheckCircle2,
  ArrowUpRight
} from 'lucide-react';

export function JourneyTimeline() {
  const containerRef = useRef(null);
  const [activeTab, setActiveTab] = useState('experience');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const totalDist = rect.height;
      const current = windowHeight - rect.top;
      const progress = Math.min(1, Math.max(0, current / (totalDist + windowHeight * 0.5)));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const tabs = [
    { id: 'experience', label: 'EXPERIENCE & INTERNSHIPS', icon: Briefcase },
    { id: 'education', label: 'EDUCATION & RESEARCH', icon: GraduationCap },
    { id: 'leadership', label: 'LEADERSHIP & ROLES', icon: Award },
    { id: 'certifications', label: 'CERTIFICATIONS', icon: ShieldCheck }
  ];

  return (
    <section
      id="journey"
      ref={containerRef}
      className="relative min-h-screen py-24 px-4 sm:px-8 max-w-6xl mx-auto overflow-hidden"
    >
      {/* Background Watermark: CAREER */}
      <div className="absolute right-0 top-12 text-[14vw] font-rajdhani font-black text-white/[0.02] select-none pointer-events-none tracking-tighter">
        CAREER
      </div>

      {/* Section Header: Matches Theme with Rajdhani + Italic Serif Accent */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6 relative z-10">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-lime mb-2">
            <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
            <span>CHRONOLOGY // TRACK RECORD & RECOGNITION</span>
          </div>
          <h2 className="text-5xl sm:text-7xl font-rajdhani font-black text-white tracking-tight uppercase">
            CAREER <span className="font-light italic text-slate-400">journey</span>
          </h2>
        </div>

        <p className="text-xs sm:text-sm font-inter text-slate-400 max-w-sm leading-relaxed">
          Documented industrial AI training with Intel/AICTE, clinical hospital workflows, published IEEE Xplore research, and university leadership.
        </p>
      </div>

      {/* Modern Rounded Pill Tab Selector with Lime Active Highlights */}
      <div className="flex flex-wrap items-center gap-3 mb-16 relative z-10">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs font-rajdhani font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'bg-lime text-dark-950 shadow-[0_0_20px_rgba(204,255,0,0.4)] scale-105'
                  : 'bg-dark-900/60 border border-white/10 text-slate-400 hover:text-white hover:border-white/25 hover:bg-white/[0.03]'
              }`}
            >
              <Icon size={14} className={isActive ? 'text-dark-950' : 'text-slate-400'} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Experience & Internships */}
      {activeTab === 'experience' && (
        <div className="relative pl-6 sm:pl-10 border-l-2 border-white/10 ml-2 sm:ml-6 space-y-12 relative z-10">
          {/* Animated Neon Lime Timeline Progress Rail */}
          <div
            className="absolute top-0 -left-[2px] w-[2px] bg-gradient-to-b from-lime via-cyan to-lime shadow-[0_0_12px_#ccff00] transition-all duration-300"
            style={{ height: `${Math.max(15, scrollProgress * 100)}%` }}
          />

          {profileData.experience.map((item, idx) => (
            <div key={idx} className="relative group">
              {/* Glowing Timeline Marker Node */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-2 w-6 h-6 rounded-full border-2 border-lime text-lime bg-dark-950 flex items-center justify-center shadow-[0_0_14px_rgba(204,255,0,0.5)]">
                <div className="w-2 h-2 rounded-full bg-lime animate-pulse" />
              </div>

              {/* Glass Showcase Card */}
              <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 hover:border-lime/40 transition-all duration-500 shadow-2xl group-hover:shadow-[0_0_30px_rgba(204,255,0,0.08)]">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold text-slate-500">
                      0{idx + 1} //
                    </span>
                    <span className="px-3 py-1 rounded-full bg-lime/10 border border-lime/30 text-[11px] font-mono text-lime font-bold">
                      {item.badge}
                    </span>
                  </div>

                  <div className="flex items-center space-x-4 text-xs font-mono text-slate-400">
                    <span className="flex items-center space-x-1.5 text-slate-300">
                      <Calendar size={13} className="text-lime" />
                      <span>{item.period}</span>
                    </span>
                    <span className="flex items-center space-x-1.5">
                      <MapPin size={13} className="text-cyan" />
                      <span>{item.location}</span>
                    </span>
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl font-rajdhani font-black text-white uppercase tracking-tight mb-1 group-hover:text-lime transition-colors">
                  {item.role}
                </h3>

                <p className="text-xs font-mono text-cyan mb-4 flex items-center space-x-2">
                  <Building size={14} />
                  <span>{item.organization}</span>
                </p>

                <ul className="space-y-2.5 text-sm font-inter text-slate-300">
                  {item.highlights.map((h, hIdx) => (
                    <li key={hIdx} className="flex items-start space-x-2.5">
                      <span className="text-lime font-mono font-bold mt-0.5">&gt;</span>
                      <span className="leading-relaxed">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Education & Research */}
      {activeTab === 'education' && (
        <div className="relative pl-6 sm:pl-10 border-l-2 border-white/10 ml-2 sm:ml-6 space-y-12 relative z-10">
          <div
            className="absolute top-0 -left-[2px] w-[2px] bg-gradient-to-b from-cyan via-lime to-cyan shadow-[0_0_12px_#38bdf8] transition-all duration-300"
            style={{ height: `${Math.max(25, scrollProgress * 100)}%` }}
          />

          {profileData.education.map((item, idx) => (
            <div key={idx} className="relative group">
              <div className="absolute -left-[31px] sm:-left-[47px] top-2 w-6 h-6 rounded-full border-2 border-cyan text-cyan bg-dark-950 flex items-center justify-center shadow-[0_0_14px_rgba(56,189,248,0.5)]">
                <div className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
              </div>

              <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 hover:border-cyan/40 transition-all duration-500 shadow-2xl">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold text-slate-500">
                      0{idx + 1} //
                    </span>
                    <span className="px-3 py-1 rounded-full bg-cyan/10 border border-cyan/30 text-[11px] font-mono text-cyan font-bold">
                      CGPA: {item.cgpa} / 10
                    </span>
                  </div>

                  <div className="flex items-center space-x-4 text-xs font-mono text-slate-400">
                    <span className="flex items-center space-x-1.5 text-slate-300">
                      <Calendar size={13} className="text-cyan" />
                      <span>{item.period}</span>
                    </span>
                    <span className="flex items-center space-x-1.5">
                      <MapPin size={13} className="text-lime" />
                      <span>{item.location}</span>
                    </span>
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl font-rajdhani font-black text-white uppercase tracking-tight mb-1 group-hover:text-cyan transition-colors">
                  {item.degree}
                </h3>

                <p className="text-xs font-mono text-slate-300 mb-4">{item.institution}</p>

                {/* Research Milestone Pill */}
                <div className="mb-5 inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-lime/10 border border-lime/30 text-lime text-xs font-mono">
                  <Sparkles size={14} className="text-lime animate-pulse" />
                  <span className="font-semibold">Research Publication: Co-Author of an IEEE Xplore Conference Paper</span>
                </div>

                <ul className="space-y-2.5 text-sm font-inter text-slate-300">
                  {item.highlights.map((highlight, hIdx) => (
                    <li key={hIdx} className="flex items-start space-x-2.5">
                      <span className="text-cyan font-mono font-bold mt-0.5">&gt;</span>
                      <span className="leading-relaxed">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Leadership & Campus Activities */}
      {activeTab === 'leadership' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          {profileData.leadership.map((item, idx) => (
            <div
              key={idx}
              className="glass-panel p-6 sm:p-7 rounded-2xl border border-white/10 hover:border-lime/40 transition-all duration-300 shadow-2xl flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono tracking-wider text-lime font-bold px-3 py-1 rounded-full bg-lime/10 border border-lime/30">
                    CAMPUS LEADERSHIP
                  </span>
                  <span className="text-xs font-mono text-slate-500">0{idx + 1}</span>
                </div>

                <h4 className="text-2xl font-rajdhani font-black text-white uppercase tracking-tight mb-1 group-hover:text-lime transition-colors">
                  {item.role}
                </h4>

                <p className="text-xs font-mono text-cyan mb-3">{item.organization}</p>
                <p className="text-xs sm:text-sm font-inter text-slate-300 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Certifications */}
      {activeTab === 'certifications' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 relative z-10">
          {profileData.certifications.map((cert, idx) => (
            <div
              key={idx}
              className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-lime/40 transition-all duration-300 shadow-2xl flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/10 text-slate-300 uppercase">
                    {cert.category}
                  </span>
                  <span className="text-xs font-mono text-slate-500 font-bold">{cert.year}</span>
                </div>

                <h4 className="text-lg font-rajdhani font-bold text-white mb-2 group-hover:text-lime transition-colors leading-snug">
                  {cert.title}
                </h4>
              </div>

              <div className="pt-3 border-t border-white/[0.08] mt-4 flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="flex items-center space-x-1.5">
                  <CheckCircle2 size={13} className="text-lime" />
                  <span className="text-slate-200">{cert.issuer}</span>
                </span>
                <span className="text-lime font-bold">VERIFIED</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

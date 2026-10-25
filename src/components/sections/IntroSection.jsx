import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Terminal, Code2 } from 'lucide-react';
import jayIntroImg from '../../assets/jay-intro-cutout-transparent.png';

export function IntroSection() {
  const introWords = [
    "Hey,", "I'm", "Jay", "Thakre.", "An", "enthusiastic", "AI", "full-stack", "developer",
    "who", "loves", "to", "build", "state-of-the-art", "web", "and", "mobile", "applications.",
    "I", "love", "turning", "concepts", "into", "scalable", "products", "using", "tech", "stack",
    "like", "React,", "FastAPI,", "Node.js,", "and", "artificial", "intelligence", "technologies.",
    "I", "always", "strive", "to", "keep", "my", "code", "clean", "and", "design", "great",
    "user", "experience", "along", "with", "learning", "new", "technologies", "like", "LLMs,",
    "RAG,", "and", "applied", "machine", "learning."
  ];

  const [visibleCount, setVisibleCount] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    let interval;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount(0);
          let count = 0;
          interval = setInterval(() => {
            count += 1;
            setVisibleCount(count);
            if (count >= introWords.length) {
              clearInterval(interval);
            }
          }, 45); // reveals word by word in ~2.5 seconds
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      if (interval) clearInterval(interval);
    };
  }, []);

  const marqueeRow1 = [
    "JavaScript", "TypeScript", "Tailwind CSS", "Bootstrap", "Material UI", "HTML5",
    "React.js", "Python", "FastAPI", "Node.js", "Express.js", "LangChain", "ChromaDB"
  ];

  const marqueeRow2 = [
    "PostgreSQL", "MongoDB", "Google Gemini", "Docker", "Git", "GitHub",
    "Postman", "VS Code", "CI/CD", "AWS S3", "Redis", "XGBoost", "Flutter"
  ];

  return (
    <section
      id="intro"
      ref={sectionRef}
      className="relative min-h-screen py-24 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col justify-center overflow-hidden"
    >
      {/* Background Giant Text: INTRO */}
      <div className="absolute right-0 top-1/4 -translate-y-1/2 text-[15vw] font-rajdhani font-black text-white/[0.03] select-none pointer-events-none tracking-tighter">
        INTRO
      </div>

      {/* Main 2-Column Grid: Developer Standing Image + Word-By-Word Writing */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
        {/* Left Column: Full-Body Standing Developer Portrait (Isolated Cutout) */}
        <div className="md:col-span-5 flex justify-center md:justify-end">
          <div className="relative group max-w-sm flex flex-col items-center">
            {/* Ambient Backlight Halo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-80 rounded-full bg-cyan/15 blur-3xl pointer-events-none -z-10" />
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-48 h-20 rounded-full bg-lime/10 blur-2xl pointer-events-none -z-10" />

            {/* Cutout Image */}
            <div className="relative flex items-end justify-center">
              <img
                src={jayIntroImg}
                alt="Jay Thakre - Full Stack Developer"
                className="w-auto h-auto max-h-[500px] object-contain transition-transform duration-700 ease-out group-hover:scale-105 drop-shadow-[0_20px_40px_rgba(0,0,0,0.85)] filter contrast-105"
                loading="lazy"
              />
            </div>
            
            {/* Ground Shadow & Floating Info Tag */}
            <div className="w-full mt-2 p-3 rounded-xl bg-dark-950/80 backdrop-blur-md border border-white/10 text-xs font-mono flex items-center justify-between shadow-xl">
              <span className="text-slate-300">JAY THAKRE</span>
              <span className="text-lime font-bold">B.TECH AI & ML</span>
            </div>
          </div>
        </div>

        {/* Right Column: Giant INTRO Header & Word-by-Word Typing Card */}
        <div className="md:col-span-7 flex flex-col justify-center space-y-6">
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-lime">
            <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
            <span>BIOGRAPHY // PROFILE BRIEFING</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-rajdhani font-black text-white tracking-tight uppercase">
            ABOUT ME
          </h2>

          {/* Word-by-Word Animated Intro Card */}
          <div className="glass-panel ambient-grid-bg p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl">
            <p className="text-base sm:text-lg md:text-xl font-inter text-slate-200 leading-relaxed font-normal">
              {introWords.map((word, index) => {
                const isRevealed = index < visibleCount;
                const isHighlight =
                  word.includes("Jay") ||
                  word.includes("Thakre") ||
                  word.includes("React") ||
                  word.includes("FastAPI") ||
                  word.includes("Node.js") ||
                  word.includes("LLMs") ||
                  word.includes("RAG") ||
                  word.includes("AI");

                return (
                  <span
                    key={index}
                    className={`inline-block mr-1.5 transition-all duration-300 ${
                      isRevealed
                        ? isHighlight
                          ? 'text-lime font-semibold'
                          : 'text-slate-100 opacity-100'
                        : 'opacity-15 blur-[2px]'
                    }`}
                  >
                    {word}
                  </span>
                );
              })}
            </p>

            {/* Quick Metrics Bar below Intro */}
            <div className="grid grid-cols-3 gap-3 pt-6 mt-6 border-t border-white/10 font-mono text-center">
              <div>
                <div className="text-2xl font-bold font-rajdhani text-white">7.96</div>
                <div className="text-[10px] text-slate-400 uppercase">CGPA (AIHER)</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-rajdhani text-lime">1</div>
                <div className="text-[10px] text-slate-400 uppercase">IEEE Publication</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-rajdhani text-cyan">7+</div>
                <div className="text-[10px] text-slate-400 uppercase">Systems Built</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Roaming Tech Stack Ticker (Marquee) */}
      <div className="w-full overflow-hidden py-4 border-y border-white/[0.08] bg-dark-950/60 backdrop-blur-md space-y-3">
        {/* Track 1: Roaming Left */}
        <div className="animate-marquee-left">
          {[...marqueeRow1, ...marqueeRow1].map((tech, idx) => (
            <span
              key={idx}
              className="inline-flex items-center space-x-2 text-xs font-mono text-slate-400 hover:text-lime transition-colors px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] mx-1.5 select-none"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-lime/60" />
              <span>{tech}</span>
            </span>
          ))}
        </div>

        {/* Track 2: Roaming Right */}
        <div className="animate-marquee-right">
          {[...marqueeRow2, ...marqueeRow2].map((tech, idx) => (
            <span
              key={idx}
              className="inline-flex items-center space-x-2 text-xs font-mono text-slate-400 hover:text-cyan transition-colors px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] mx-1.5 select-none"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan/60" />
              <span>{tech}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

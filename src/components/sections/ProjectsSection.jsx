import React, { useState } from 'react';
import { projectsData } from '../../data/projects';
import { ProjectModal } from '../ui/ProjectModal';
import { ArrowUpRight, Radio, Sparkles, Smartphone, Layers, CheckCircle2 } from 'lucide-react';
import { GithubIcon } from '../ui/Icons';

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'live' | 'mobile'

  const liveProjects = projectsData.filter((p) => p.hasLiveDemo && p.liveDemoUrl);
  const mobileProjects = projectsData.filter((p) => !p.hasLiveDemo);

  const filteredProjects =
    activeFilter === 'live'
      ? liveProjects
      : activeFilter === 'mobile'
      ? mobileProjects
      : projectsData;

  return (
    <section id="projects" className="relative min-h-screen py-24 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Section Header: SELECTED work */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-lime mb-2">
            <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
            <span>CASE STUDIES // REPOSITORIES & PRODUCTION DEPLOYMENTS</span>
          </div>
          <h2 className="text-5xl sm:text-7xl font-rajdhani font-black text-white tracking-tight uppercase">
            SELECTED <span className="font-light italic text-slate-400">work</span>
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <p className="text-xs sm:text-sm font-inter text-slate-400 max-w-xs leading-relaxed">
            Production-grade fullstack web applications, low-latency applied AI systems, and cross-platform mobile architectures.
          </p>
          <a
            href="https://github.com/jayy1506"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full bg-lime text-dark-950 font-rajdhani font-bold text-xs tracking-wider uppercase hover:scale-105 transition-transform"
          >
            <span>GITHUB ↗</span>
          </a>
        </div>
      </div>

      {/* Live Deployments Quick-Launch HUD Bar */}
      <div className="mb-12 p-4 sm:p-5 rounded-2xl glass-panel border border-lime/30 bg-lime/[0.02] shadow-[0_0_30px_rgba(204,255,0,0.06)]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-lime"></span>
            </span>
            <div>
              <div className="text-xs font-mono font-bold text-lime uppercase tracking-wider flex items-center gap-2">
                <span>4 Live Deployed Production Applications</span>
                <span className="hidden sm:inline text-[10px] px-2 py-0.5 rounded-full bg-lime/10 text-lime border border-lime/20">
                  READY TO TEST
                </span>
              </div>
              <p className="text-[11px] font-inter text-slate-400">
                Click any link to launch and interact with the live hosted web apps in real-time.
              </p>
            </div>
          </div>

          {/* Quick Launch Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {liveProjects.map((p) => (
              <a
                key={p.id}
                href={p.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-dark-900/90 border border-white/10 hover:border-lime text-slate-200 hover:text-white transition-all text-xs font-mono"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-lime group-hover:scale-125 transition-transform" />
                <span className="font-semibold">{p.title.split(' ')[0]}</span>
                <ArrowUpRight size={13} className="text-lime group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Filter Tabs Bar */}
      <div className="flex flex-wrap items-center gap-3 mb-12">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-4 py-2 rounded-full font-rajdhani font-bold text-xs uppercase tracking-wider transition-all flex items-center space-x-2 ${
            activeFilter === 'all'
              ? 'bg-white text-dark-950 shadow-lg scale-105'
              : 'bg-dark-900/60 border border-white/10 text-slate-400 hover:text-white hover:border-white/20'
          }`}
        >
          <Layers size={14} />
          <span>ALL PROJECTS ({projectsData.length})</span>
        </button>

        <button
          onClick={() => setActiveFilter('live')}
          className={`px-4 py-2 rounded-full font-rajdhani font-bold text-xs uppercase tracking-wider transition-all flex items-center space-x-2 ${
            activeFilter === 'live'
              ? 'bg-lime text-dark-950 shadow-[0_0_20px_rgba(204,255,0,0.4)] scale-105'
              : 'bg-dark-900/60 border border-lime/30 text-lime hover:bg-lime/10'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
          <span>LIVE DEMOS ONLY ({liveProjects.length})</span>
        </button>

        <button
          onClick={() => setActiveFilter('mobile')}
          className={`px-4 py-2 rounded-full font-rajdhani font-bold text-xs uppercase tracking-wider transition-all flex items-center space-x-2 ${
            activeFilter === 'mobile'
              ? 'bg-cyan text-dark-950 shadow-[0_0_20px_rgba(56,189,248,0.4)] scale-105'
              : 'bg-dark-900/60 border border-white/10 text-slate-400 hover:text-white hover:border-white/20'
          }`}
        >
          <Smartphone size={14} />
          <span>MOBILE & EMBEDDED ({mobileProjects.length})</span>
        </button>
      </div>

      {/* Alternating Project Showcase Rows (Mirrors Instagram Reel Style) */}
      <div className="space-y-20 lg:space-y-28">
        {filteredProjects.map((project, index) => {
          const isEven = index % 2 === 1;

          return (
            <div
              key={project.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                isEven ? 'lg:grid-flow-dense' : ''
              }`}
            >
              {/* Mockup Display Box */}
              <div
                onClick={() => setSelectedProject(project)}
                className={`lg:col-span-7 group relative rounded-2xl overflow-hidden glass-panel border border-white/10 hover:border-lime/40 shadow-2xl cursor-pointer transition-colors ${
                  isEven ? 'lg:col-start-6' : ''
                }`}
              >
                <div className="relative aspect-video w-full overflow-hidden bg-dark-950">
                  <img
                    src={project.image || "/project-rag-router.jpg"}
                    alt={project.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Subtle glass reflection overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-transparent to-transparent opacity-50 group-hover:opacity-30 transition-opacity" />
                  
                  {/* Top status indicator badge */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {project.hasLiveDemo ? (
                      <div className="px-3 py-1 rounded-full bg-dark-950/90 backdrop-blur-md border border-lime/50 text-[11px] font-mono text-lime flex items-center space-x-1.5 shadow-[0_0_12px_rgba(204,255,0,0.3)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
                        <span className="font-bold tracking-wide">ONLINE LIVE DEMO</span>
                      </div>
                    ) : (
                      <div className="px-3 py-1 rounded-full bg-dark-950/80 backdrop-blur-md border border-white/15 text-[11px] font-mono text-slate-300 flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
                        <span>{project.status || 'SYSTEM ARCHITECTURE'}</span>
                      </div>
                    )}

                    <div className="hidden sm:inline-flex px-2.5 py-1 rounded-full bg-dark-950/70 backdrop-blur-md border border-white/10 text-[10px] font-mono text-slate-400">
                      {project.badge}
                    </div>
                  </div>

                  {/* Quick hover launch hint */}
                  <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-dark-950/80 backdrop-blur-md border border-white/15 text-[11px] font-mono text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-1">
                    <span>Inspect Specs</span>
                    <ArrowUpRight size={13} className="text-lime" />
                  </div>
                </div>
              </div>

              {/* Project Details Column */}
              <div
                className={`lg:col-span-5 flex flex-col justify-center space-y-4 ${
                  isEven ? 'lg:col-start-1' : ''
                }`}
              >
                {/* Number index & Category */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-mono font-bold text-slate-500 tracking-wider">
                    {project.number || `0${index + 1}`} // {project.category}
                  </span>
                  {project.hasLiveDemo && (
                    <span className="text-[10px] font-mono text-lime border border-lime/30 px-2 py-0.5 rounded-full bg-lime/10">
                      DEPLOYED
                    </span>
                  )}
                </div>

                <h3
                  onClick={() => setSelectedProject(project)}
                  className="text-3xl sm:text-4xl font-rajdhani font-black text-white uppercase tracking-tight hover:text-lime transition-colors cursor-pointer"
                >
                  {project.title}
                </h3>

                <p className="text-xs font-mono text-slate-400">
                  {project.subtitle}
                </p>

                <p className="text-sm font-inter text-slate-300 leading-relaxed">
                  {project.description}
                </p>

                {/* Metrics Chips */}
                {project.metrics && (
                  <div className="grid grid-cols-3 gap-2 py-2 font-mono">
                    {project.metrics.map((m, mIdx) => (
                      <div key={mIdx} className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06] text-center">
                        <div className="text-[9px] text-slate-400 uppercase truncate">{m.label}</div>
                        <div className="text-xs font-bold text-lime font-rajdhani mt-0.5">{m.value}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech stack tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.techStack.slice(0, 5).map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-white/[0.04] text-slate-400 border border-white/[0.06]"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 5 && (
                    <span className="px-1.5 py-0.5 rounded-md text-[10px] font-mono text-slate-500">
                      +{project.techStack.length - 5}
                    </span>
                  )}
                </div>

                {/* Action Buttons: Live Demo (lime) & GitHub (outline) & Modal */}
                <div className="flex items-center flex-wrap gap-3 pt-3">
                  {project.liveDemoUrl && (
                    <a
                      href={project.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-full bg-lime hover:bg-lime-dark text-dark-950 font-rajdhani font-bold text-xs tracking-wider uppercase flex items-center space-x-1.5 shadow-[0_0_20px_rgba(204,255,0,0.35)] hover:scale-105 transition-all"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-dark-950 animate-pulse" />
                      <span>LIVE DEMO ↗</span>
                    </a>
                  )}

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-full border border-white/20 hover:border-white text-slate-200 hover:text-white font-mono text-xs tracking-wider flex items-center space-x-1.5 hover:bg-white/[0.05] transition-all"
                    >
                      <GithubIcon size={13} />
                      <span>CODE</span>
                    </a>
                  )}

                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-xs font-mono text-slate-400 hover:text-cyan transition-colors ml-auto underline underline-offset-4 cursor-pointer"
                  >
                    Tech Specs ↗
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Technical Dossier Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}

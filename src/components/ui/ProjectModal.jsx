import React, { useEffect } from 'react';
import { ExternalLink, X, Cpu, ShieldCheck, Layers, Code2 } from 'lucide-react';
import { GithubIcon } from './Icons';

export function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-dark-900 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl glass-panel ambient-grid-bg text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-start justify-between border-b border-white/[0.08] pb-4 mb-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-cyan mb-1">
              <span className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
              <span>PROJECT DOSSIER // {project.badge}</span>
            </div>
            <h2 id="modal-title" className="text-2xl sm:text-3xl font-rajdhani font-bold text-white tracking-wide">
              {project.title}
            </h2>
            <p className="text-sm font-mono text-indigo mt-0.5">{project.subtitle}</p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border border-white/10 text-slate-400 hover:border-white/30 hover:text-white hover:bg-white/[0.05] transition-colors cursor-pointer"
            aria-label="Close Project Dossier"
          >
            <X size={20} />
          </button>
        </div>

        {/* Detailed Description */}
        <div className="space-y-4 mb-6 text-sm text-slate-300 leading-relaxed">
          <p>{project.longDescription || project.description}</p>
        </div>

        {/* Diagnostic Metrics Matrix */}
        {project.metrics && (
          <div className="grid grid-cols-3 gap-3 mb-6 p-4 rounded-xl bg-dark-950/70 border border-white/[0.06] font-mono">
            {project.metrics.map((metric, i) => (
              <div key={i} className="text-center">
                <div className="text-[10px] text-slate-400 tracking-wider uppercase mb-1">{metric.label}</div>
                <div className="text-lg font-bold text-cyan font-rajdhani">{metric.value}</div>
              </div>
            ))}
          </div>
        )}

        {/* Tech Stack Pills */}
        <div className="mb-8">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2.5 flex items-center space-x-1.5">
            <Cpu size={14} className="text-cyan" />
            <span>Integrated Architecture & Technologies:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech, i) => (
              <span
                key={i}
                className="px-2.5 py-1 text-xs font-mono rounded-md bg-white/[0.04] border border-white/[0.08] text-slate-200 tracking-wide"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Link CTAs */}
        <div className="flex items-center space-x-3 pt-4 border-t border-white/[0.08]">
          {project.liveDemoUrl && (
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-lime hover:bg-lime-dark text-dark-950 transition-all text-xs font-mono font-bold tracking-wider shadow-[0_0_20px_rgba(204,255,0,0.4)] hover:scale-105"
            >
              <ExternalLink size={16} />
              <span>LAUNCH LIVE DEMO ↗</span>
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2.5 rounded-lg border border-white/15 bg-white/[0.05] text-slate-200 hover:border-white hover:text-white hover:bg-white/[0.1] transition-all text-xs font-mono font-semibold tracking-wider"
            >
              <GithubIcon size={16} />
              <span>SOURCE REPO</span>
            </a>
          )}
          {!project.githubUrl && !project.liveDemoUrl && (
            <div className="text-xs font-mono text-indigo flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-indigo/10 border border-indigo/30">
              <ShieldCheck size={16} />
              <span>HARDWARE / LAB DEMO PROTOTYPE</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

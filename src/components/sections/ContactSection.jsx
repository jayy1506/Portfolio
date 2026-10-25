import React, { useState } from 'react';
import { profileData } from '../../data/profile';
import { Mail, Send, CheckCircle2, Phone, MapPin, Copy, Check, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';

export function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.socials.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;

    const subject = `Portfolio Inquiry from ${formData.name || 'Visitor'}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${profileData.socials.email}&su=${encodedSubject}&body=${encodedBody}`;

    const win = window.open(gmailUrl, '_blank');
    if (!win || win.closed || typeof win.closed === 'undefined') {
      window.location.href = `mailto:${profileData.socials.email}?subject=${encodedSubject}&body=${encodedBody}`;
    }

    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <section id="contact" className="relative min-h-screen pt-24 pb-12 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col justify-between overflow-hidden">
      {/* 3D Wireframe Globe Element in Background (Mirrors Screenshot 5) */}
      <div className="absolute inset-0 flex items-center justify-center opacity-25 pointer-events-none -z-10">
        <svg viewBox="0 0 800 800" className="w-[650px] h-[650px] animate-spin-slow">
          <circle cx="400" cy="400" r="300" fill="none" stroke="#ccff00" strokeWidth="0.8" strokeDasharray="4 6" />
          <circle cx="400" cy="400" r="240" fill="none" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="3 5" />
          <ellipse cx="400" cy="400" rx="300" ry="120" fill="none" stroke="#ffffff" strokeWidth="0.6" strokeOpacity="0.4" />
          <ellipse cx="400" cy="400" rx="300" ry="60" fill="none" stroke="#ccff00" strokeWidth="0.6" strokeOpacity="0.3" />
          <ellipse cx="400" cy="400" rx="120" ry="300" fill="none" stroke="#818cf8" strokeWidth="0.6" strokeOpacity="0.3" />
          <ellipse cx="400" cy="400" rx="60" ry="300" fill="none" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.2" />
        </svg>
      </div>

      {/* Top Banner: Connect with me & email (Screenshot 4) */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-8 mb-12 border-b border-white/[0.08] gap-4">
        <div>
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1">
            CONNECT WITH ME
          </span>
          <a
            href={`mailto:${profileData.socials.email}`}
            className="text-lg sm:text-2xl font-mono text-white hover:text-lime transition-colors"
          >
            {profileData.socials.email}
          </a>
        </div>

        <div className="flex flex-col sm:items-end">
          <span className="text-sm font-rajdhani font-bold text-white tracking-wide">
            Let's build something extraordinary
          </span>
          <span className="text-xs font-mono text-slate-400">
            Open for SDE and AI/ML internship opportunities
          </span>
        </div>
      </div>

      {/* Main Grid: Info + Get in touch Form (Screenshot 5) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start mb-20">
        {/* Left Column: Direct info */}
        <div className="md:col-span-5 space-y-6">
          <h2 className="text-5xl sm:text-7xl font-rajdhani font-black text-white tracking-tight uppercase">
            GET IN <span className="text-lime">TOUCH</span>
          </h2>
          <p className="text-sm font-inter text-slate-300 leading-relaxed max-w-sm">
            Whether you have a specific software engineering role, an AI/ML research collaboration, or just want to connect.
          </p>

          <div className="space-y-3 font-mono text-xs pt-2">
            <div className="flex items-center space-x-3 text-slate-300">
              <Phone size={15} className="text-lime" />
              <span>{profileData.socials.phone}</span>
            </div>
            <div className="flex items-center space-x-3 text-slate-300">
              <MapPin size={15} className="text-cyan" />
              <span>AIHER, Wardha, Maharashtra, India</span>
            </div>
          </div>
        </div>

        {/* Right Column: Clean Form (Screenshot 5) */}
        <div className="md:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your full name"
                  className="w-full bg-dark-950/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-lime transition-all font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Your email address"
                  className="w-full bg-dark-950/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-lime transition-all font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                Message *
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Write something..."
                className="w-full bg-dark-950/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-lime transition-all font-mono resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-full bg-white hover:bg-lime text-dark-950 font-rajdhani font-bold tracking-wider text-sm uppercase transition-all duration-300 shadow-xl cursor-pointer flex items-center justify-center space-x-2"
            >
              {sent ? (
                <>
                  <CheckCircle2 size={16} />
                  <span>MESSAGE DISPATCHED</span>
                </>
              ) : (
                <span>SEND MESSAGE</span>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Footer Navigation Bar (Screenshot 4) */}
      <div className="pt-8 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-6 text-xs font-mono text-slate-400">
        <nav className="flex items-center space-x-6">
          <a href="#hero" className="hover:text-white transition-colors">Home</a>
          <a href="#intro" className="hover:text-white transition-colors">About</a>
          <a href="#capabilities" className="hover:text-white transition-colors">Services</a>
          <a href="#projects" className="hover:text-white transition-colors">Projects</a>
        </nav>

        <div className="flex items-center space-x-6">
          <a href={profileData.socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-lime transition-colors">Github</a>
          <a href={profileData.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-lime transition-colors">LinkedIn</a>
          <a href={`mailto:${profileData.socials.email}`} className="hover:text-lime transition-colors">Email</a>
        </div>
      </div>

      {/* Giant Signature Typography Footer (Screenshot 4: LEESHARK Style) */}
      <div className="relative w-full pt-16 pb-4 overflow-hidden text-center">
        {/* Soft Ambient Lime Glow underneath */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-28 bg-lime/20 blur-3xl pointer-events-none -z-10 rounded-full" />

        <h2 className="text-[14vw] font-rajdhani font-black tracking-tighter text-white uppercase select-none leading-none drop-shadow-[0_15px_30px_rgba(204,255,0,0.15)]">
          JAY THAKRE
        </h2>

        <div className="flex items-center justify-between pt-6 text-[10px] font-mono text-slate-500">
          <span>© 2026 Jay Thakre. All rights reserved.</span>
          <span>Designed & Built with React 19 + Three.js</span>
        </div>
      </div>
    </section>
  );
}

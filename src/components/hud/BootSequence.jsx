import React, { useState, useEffect } from 'react';

const BOOT_LOGS = [
  "INITIALIZING SYSTEMS…",
  "CORE DIAGNOSTIC: ARC REACTOR CHARGE 100%",
  "NEURAL TENSOR ARRAYS: READY",
  "CALIBRATING SPIDER-WEB MATRIX TENSION…",
  "CONNECTING AIHER FET AI/ML REPOSITORIES…",
  "STARK//PARKER FUSED INTERFACE READY."
];

export function BootSequence({ onComplete }) {
  const [logIndex, setLogIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  // Auto progression under 2.6 seconds
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 45);

    const logInterval = setInterval(() => {
      setLogIndex((prev) => (prev < BOOT_LOGS.length - 1 ? prev + 1 : prev));
    }, 380);

    const exitTimer = setTimeout(() => {
      triggerExit();
    }, 2500);

    return () => {
      clearInterval(progressInterval);
      clearInterval(logInterval);
      clearTimeout(exitTimer);
    };
  }, []);

  const triggerExit = () => {
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 500);
  };

  // Keyboard escape or click bypass
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        triggerExit();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div
      onClick={triggerExit}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void text-web-white font-mono cursor-pointer transition-opacity duration-500 ${
        isExiting ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100'
      }`}
      role="dialog"
      aria-label="System Initializing"
    >
      {/* Background Web HUD Radar grid */}
      <div className="absolute inset-0 web-pattern-bg opacity-30 pointer-events-none" />

      {/* Central Rotating HUD Ring Progress Indicator */}
      <div className="relative w-44 h-44 flex items-center justify-center mb-8">
        <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 120 120">
          {/* Background circle */}
          <circle
            cx="60"
            cy="60"
            r="50"
            fill="none"
            stroke="#0b101d"
            strokeWidth="5"
          />
          {/* Cyan outer progress ring */}
          <circle
            cx="60"
            cy="60"
            r="50"
            fill="none"
            stroke="#4fd8ff"
            strokeWidth="5"
            strokeDasharray="314"
            strokeDashoffset={314 - (314 * progress) / 100}
            strokeLinecap="round"
            className="transition-all duration-75"
          />
          {/* Inner gold ticks ring */}
          <circle
            cx="60"
            cy="60"
            r="42"
            fill="none"
            stroke="#f5b83d"
            strokeWidth="2"
            strokeDasharray="6 8"
            className="animate-spin-slow origin-center"
          />
          {/* Crimson core pulse */}
          <circle
            cx="60"
            cy="60"
            r="16"
            fill="#e5243b"
            className="animate-ping opacity-25"
          />
        </svg>

        {/* Center Percentage Display */}
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-2xl font-bold font-rajdhani text-web-white tracking-wider">
            {progress}%
          </span>
          <span className="text-[10px] text-cyan tracking-widest uppercase">
            ARC-CORE
          </span>
        </div>
      </div>

      {/* Terminal Telemetry Log Readout */}
      <div className="max-w-md w-full px-6 flex flex-col space-y-1.5 text-xs text-left">
        <div className="flex items-center space-x-2 text-cyan font-semibold border-b border-cyan/20 pb-1 mb-2">
          <span className="inline-block w-2 h-2 rounded-full bg-cyan animate-pulse" />
          <span>STARK//PARKER TELEMETRY BOOT SEQUENCE</span>
        </div>

        {BOOT_LOGS.slice(0, logIndex + 1).map((log, idx) => (
          <div
            key={idx}
            className={`transition-all duration-300 flex items-center space-x-2 ${
              idx === logIndex ? 'text-gold font-medium' : 'text-hud-dim opacity-75'
            }`}
          >
            <span className="text-crimson text-[10px]">&gt;&gt;</span>
            <span className="tracking-wide">{log}</span>
          </div>
        ))}
      </div>

      {/* Skip Button Notice */}
      <div className="absolute bottom-10 flex items-center space-x-2 text-[11px] text-hud-dim tracking-widest uppercase border border-white/10 px-4 py-1.5 rounded-full hover:border-gold hover:text-gold transition-colors">
        <span>CLICK OR PRESS ESC TO SKIP</span>
        <span className="text-crimson">⚡</span>
      </div>
    </div>
  );
}

import React, { useEffect, useState, useRef } from 'react';

export function TargetingCursor() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsMobile(true);
      return;
    }

    const onMouseMove = (e) => {
      setIsVisible(true);
      const x = e.clientX;
      const y = e.clientY;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }

      const target = e.target;
      const clickable = target.closest('a, button, [role="button"], input, textarea, select, .cursor-pointer');
      setIsPointer(Boolean(clickable));
    };

    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  if (isMobile || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      {/* Precision Core Dot */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full transition-transform duration-75 ${
          isPointer ? 'bg-cyan scale-125 shadow-[0_0_12px_#38bdf8]' : 'bg-slate-200 shadow-[0_0_8px_rgba(255,255,255,0.8)]'
        }`}
      />

      {/* Smooth Ambient Ring Halo */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 -ml-4 -mt-4 w-8 h-8 rounded-full border transition-all duration-200 ${
          isPointer
            ? 'scale-150 border-cyan/70 bg-cyan/10 shadow-[0_0_20px_rgba(56,189,248,0.3)]'
            : 'scale-100 border-white/25 bg-white/[0.02]'
        }`}
      />
    </div>
  );
}

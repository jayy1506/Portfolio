import React, { useRef, useState } from 'react';

export function MagneticButton({
  children,
  onClick,
  href,
  className = "",
  variant = "cyan", // "cyan" | "gold" | "crimson"
  type = "button",
  ...props
}) {
  const btnRef = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isShimmering, setIsShimmering] = useState(false);

  const handleMouseMove = (e) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const pullStrength = 0.35;
    const x = (e.clientX - centerX) * pullStrength;
    const y = (e.clientY - centerY) * pullStrength;

    setOffset({ x, y });
  };

  const handleMouseEnter = () => {
    setIsShimmering(true);
    setTimeout(() => setIsShimmering(false), 800);
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  const colorVariants = {
    cyan: "border-cyan/50 text-cyan bg-cyan/10 hover:bg-cyan/25 hover:border-cyan hover:shadow-[0_0_20px_rgba(79,216,255,0.4)]",
    gold: "border-gold/50 text-gold bg-gold/10 hover:bg-gold/25 hover:border-gold hover:shadow-[0_0_20px_rgba(245,184,61,0.4)]",
    crimson: "border-crimson/50 text-crimson bg-crimson/10 hover:bg-crimson/25 hover:border-crimson hover:shadow-[0_0_20px_rgba(229,36,59,0.4)]"
  };

  const commonClasses = `
    relative inline-flex items-center justify-center font-rajdhani font-semibold tracking-wider uppercase
    px-6 py-3 border rounded transition-all duration-200 cursor-pointer overflow-hidden group
    ${colorVariants[variant] || colorVariants.cyan}
    ${isShimmering ? 'spider-sense-active' : ''}
    ${className}
  `;

  const content = (
    <>
      {/* Corner bracket accents */}
      <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-current" />
      <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-current" />

      {/* Button Children */}
      <span className="relative z-10 flex items-center space-x-2 group-hover:scale-105 transition-transform">
        {children}
      </span>
    </>
  );

  const style = {
    transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
    transition: offset.x === 0 ? 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' : 'transform 0.1s ease-out'
  };

  if (href) {
    return (
      <a
        ref={btnRef}
        href={href}
        style={style}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={commonClasses}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={btnRef}
      type={type}
      onClick={onClick}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={commonClasses}
      {...props}
    >
      {content}
    </button>
  );
}

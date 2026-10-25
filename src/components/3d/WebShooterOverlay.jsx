import React, { useEffect, useRef } from 'react';
import { playWebThwipSound } from '../../utils/sound';

export function WebShooterOverlay() {
  const canvasRef = useRef(null);
  const websRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const handleClick = (e) => {
      // Don't trigger if clicked directly in an input/textarea
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      playWebThwipSound();

      const targetX = e.clientX;
      const targetY = e.clientY;

      // Choose origin: closest bottom corner wrist shooter
      const originX = targetX < window.innerWidth / 2 ? 0 : window.innerWidth;
      const originY = window.innerHeight;

      // Generate organic spider-silk strand segments
      const segments = 14;
      const points = [];
      for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        const x = originX + (targetX - originX) * t;
        const y = originY + (targetY - originY) * t;
        const jitter = (Math.random() - 0.5) * 8;
        points.push({ x: x + jitter, y: y + jitter });
      }

      websRef.current.push({
        origin: { x: originX, y: originY },
        target: { x: targetX, y: targetY },
        points,
        createdAt: performance.now(),
        duration: 900,
        ripples: [
          { r: 0, maxR: 45, color: '#ff0f3b' },
          { r: 0, maxR: 70, color: '#f5b83d' },
          { r: 0, maxR: 95, color: '#ffffff' }
        ]
      });
    };

    window.addEventListener('click', handleClick);

    let animationId;
    const render = (now) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      websRef.current = websRef.current.filter((web) => {
        const elapsed = now - web.createdAt;
        const progress = elapsed / web.duration;
        if (progress >= 1) return false;

        const alpha = Math.max(0, 1 - progress);

        // 1. Draw Multi-Layered Red & White Web Silk Line
        ctx.save();

        const drawFrac = Math.min(1, elapsed / 90);
        const maxIndex = Math.floor(web.points.length * drawFrac);

        // Outer Crimson Aura
        ctx.beginPath();
        ctx.moveTo(web.origin.x, web.origin.y);
        for (let i = 1; i < maxIndex; i++) {
          ctx.lineTo(web.points[i].x, web.points[i].y);
        }
        if (drawFrac >= 1) ctx.lineTo(web.target.x, web.target.y);
        ctx.strokeStyle = `rgba(255, 15, 59, ${alpha * 0.9})`;
        ctx.lineWidth = 4.5;
        ctx.shadowColor = '#ff0f3b';
        ctx.shadowBlur = 18;
        ctx.stroke();

        // Inner Pure White Filament Core
        ctx.beginPath();
        ctx.moveTo(web.origin.x, web.origin.y);
        for (let i = 1; i < maxIndex; i++) {
          ctx.lineTo(web.points[i].x, web.points[i].y);
        }
        if (drawFrac >= 1) ctx.lineTo(web.target.x, web.target.y);
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.lineWidth = 1.8;
        ctx.shadowColor = '#ffffff';
        ctx.shadowBlur = 8;
        ctx.stroke();

        ctx.restore();

        // 2. Web Impact Shockwaves
        if (drawFrac >= 0.7) {
          web.ripples.forEach((ripple, rIdx) => {
            const rippleFrac = Math.min(1, (elapsed - 60) / (web.duration - 60));
            if (rippleFrac > 0) {
              const currentR = ripple.maxR * rippleFrac;
              const rippleAlpha = (1 - rippleFrac) * alpha;

              ctx.save();
              ctx.beginPath();
              ctx.arc(web.target.x, web.target.y, currentR, 0, Math.PI * 2);
              ctx.strokeStyle = ripple.color === '#ff0f3b'
                ? `rgba(255, 15, 59, ${rippleAlpha})`
                : ripple.color === '#f5b83d'
                ? `rgba(245, 184, 61, ${rippleAlpha})`
                : `rgba(255, 255, 255, ${rippleAlpha * 0.8})`;
              ctx.lineWidth = 2;
              ctx.shadowColor = ripple.color;
              ctx.shadowBlur = 12;
              ctx.stroke();

              // Spider-Web radial micro-sparks on impact
              if (rIdx === 0 && rippleFrac < 0.6) {
                for (let a = 0; a < 8; a++) {
                  const angle = (a / 8) * Math.PI * 2;
                  const sparkDist = currentR * 0.85;
                  ctx.fillStyle = `rgba(255, 255, 255, ${rippleAlpha * 0.95})`;
                  ctx.fillRect(
                    web.target.x + Math.cos(angle) * sparkDist - 1.5,
                    web.target.y + Math.sin(angle) * sparkDist - 1.5,
                    3,
                    3
                  );
                }
              }
              ctx.restore();
            }
          });
        }

        return true;
      });

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      aria-hidden="true"
    />
  );
}

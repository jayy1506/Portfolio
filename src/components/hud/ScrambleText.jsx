import React, { useEffect, useState, useRef } from 'react';

const GLYPHS = "0123456789ABCDEF<>_[]{}#*!$%&+-=";

export function ScrambleText({ text, className = "", trigger = true }) {
  const [displayText, setDisplayText] = useState(text);
  const elementRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!trigger || hasAnimated.current) return;

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) {
              return text[index];
            }
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
        hasAnimated.current = true;
      }
      iteration += 1 / 2;
    }, 30);

    return () => clearInterval(interval);
  }, [text, trigger]);

  return (
    <span ref={elementRef} className={className}>
      {displayText}
    </span>
  );
}

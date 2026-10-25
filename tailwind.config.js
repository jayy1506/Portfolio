/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          950: "#06080e",
          900: "#0b0f19",
          850: "#101626",
          800: "#172033",
          card: "rgba(12, 17, 29, 0.75)",
          border: "rgba(255, 255, 255, 0.08)",
        },
        void: "#06080e",
        "void-light": "#0b0f19",
        "void-card": "rgba(12, 17, 29, 0.8)",
        cyan: {
          DEFAULT: "#38bdf8",
          glow: "rgba(56, 189, 248, 0.45)",
          dim: "#0284c7",
          light: "#7dd3fc"
        },
        indigo: {
          DEFAULT: "#818cf8",
          glow: "rgba(129, 140, 248, 0.4)",
          dim: "#4f46e5"
        },
        emerald: {
          DEFAULT: "#34d399",
          glow: "rgba(52, 211, 153, 0.4)",
          dim: "#059669"
        },
        amber: {
          DEFAULT: "#fbbf24",
          glow: "rgba(251, 191, 36, 0.4)",
          dim: "#d97706"
        },
        lime: {
          DEFAULT: "#ccff00",
          glow: "rgba(204, 255, 0, 0.45)",
          dark: "#a3cc00"
        },
        gold: {
          DEFAULT: "#38bdf8",
          glow: "rgba(56, 189, 248, 0.45)",
          dim: "#0284c7"
        },
        crimson: {
          DEFAULT: "#818cf8",
          glow: "rgba(129, 140, 248, 0.4)",
          dim: "#4f46e5"
        },
        "web-white": "#f8fafc",
        "hud-dim": "rgba(241, 245, 249, 0.65)",
        "hud-border": "rgba(255, 255, 255, 0.1)"
      },
      fontFamily: {
        rajdhani: ["Rajdhani", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "Courier New", "monospace"],
      },
      boxShadow: {
        'glow-cyan': '0 0 25px rgba(56, 189, 248, 0.35)',
        'glow-indigo': '0 0 25px rgba(129, 140, 248, 0.35)',
        'glow-emerald': '0 0 25px rgba(52, 211, 153, 0.35)',
        'glass-panel': '0 8px 32px rgba(0, 0, 0, 0.6), inset 0 0 0 1px rgba(255, 255, 255, 0.08)',
        'glass-hover': '0 16px 40px rgba(0, 0, 0, 0.7), inset 0 0 0 1px rgba(56, 189, 248, 0.3)',
        'hud-panel': '0 8px 32px rgba(0, 0, 0, 0.6), inset 0 0 0 1px rgba(255, 255, 255, 0.08)',
        'hud-hover': '0 16px 40px rgba(0, 0, 0, 0.7), inset 0 0 0 1px rgba(56, 189, 248, 0.3)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 30s linear infinite',
        'spin-reverse': 'spinReverse 24s linear infinite',
      },
      keyframes: {
        spinReverse: {
          'from': { transform: 'rotate(360deg)' },
          'to': { transform: 'rotate(0deg)' },
        }
      }
    },
  },
  plugins: [],
}

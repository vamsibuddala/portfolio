/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#090d16',
          surface: '#0f172a',
          card: 'rgba(15, 23, 42, 0.75)',
          border: 'rgba(148, 163, 184, 0.14)',
          cyan: '#38bdf8',
          cyanGlow: 'rgba(56, 189, 248, 0.25)',
          violet: '#6366f1',
          violetGlow: 'rgba(99, 102, 241, 0.25)',
          pink: '#ec4899',
          accent: '#2563eb',
          text: '#f8fafc',
          muted: '#94a3b8',
        },
        corporate: {
          bg: '#090d16',
          surface: '#0f172a',
          card: '#1e293b',
          border: 'rgba(148, 163, 184, 0.14)',
          blue: '#2563eb',
          indigo: '#4f46e5',
          sky: '#0ea5e9',
          emerald: '#10b981',
          slate: '#64748b',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'JetBrains Mono', 'monospace']
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -5px rgba(0, 242, 254, 0.4)',
        'glow-violet': '0 0 25px -5px rgba(168, 85, 247, 0.4)',
        'glow-mixed': '0 0 35px -5px rgba(0, 242, 254, 0.3), 0 0 35px -5px rgba(168, 85, 247, 0.3)',
        'glass': '0 10px 30px -10px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
        'glass-hover': '0 20px 40px -15px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
        'card-rim': 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 10px 25px -5px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
        'spin-slow': 'spin 18s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        }
      }
    },
  },
  plugins: [],
}

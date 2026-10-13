/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#010f27',
          900: '#021a3d',
          800: '#06285a',
          700: '#0a3677',
          600: '#124a9c',
        },
        brand: {
          DEFAULT: '#38b6ff',
          soft: '#8fd6ff',
          deep: '#1d8fd6',
        },
        glow: '#22d3ee',
        ink: '#e8f1ff',
      },
      fontFamily: {
        display: ['Sora', 'system-ui', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 40px -8px rgba(56,182,255,0.55)',
        'glow-sm': '0 0 22px -6px rgba(56,182,255,0.6)',
      },
      keyframes: {
        pulseNode: {
          '0%, 100%': { opacity: '0.35', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.6)' },
        },
        drift: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        spinSlow: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        pulseNode: 'pulseNode 3.2s ease-in-out infinite',
        drift: 'drift 6s ease-in-out infinite',
        spinSlow: 'spinSlow 70s linear infinite',
        spinSlowReverse: 'spinSlow 100s linear infinite reverse',
      },
    },
  },
  plugins: [],
}

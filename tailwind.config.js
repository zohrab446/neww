/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Cormorant Garamond', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        mystic: {
          50: '#fdf8f0',
          100: '#f5e6d3',
          200: '#e8d0a8',
          300: '#d4b478',
          400: '#c19a4e',
          500: '#a67c30',
          600: '#8a6220',
          700: '#6e4d18',
          800: '#523810',
          900: '#362408',
          950: '#1c1304',
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'spin-slower': 'spin 14s linear infinite reverse',
        'smoke-1': 'smokeRise 7s ease-out infinite',
        'smoke-2': 'smokeRise 9s ease-out infinite 1s',
        'smoke-3': 'smokeRise 11s ease-out infinite 2s',
        'smoke-4': 'smokeRise 8s ease-out infinite 0.5s',
      },
      keyframes: {
        smokeRise: {
          '0%': {
            transform: 'translateY(0) scale(1)',
            opacity: '0.6',
          },
          '50%': {
            opacity: '0.3',
          },
          '100%': {
            transform: 'translateY(-120px) scale(1.8)',
            opacity: '0',
          },
        },
      },
    },
  },
  plugins: [],
};

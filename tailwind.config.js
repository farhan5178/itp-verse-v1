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
        dark: {
          900: '#09090b', // zinc-950
          800: '#18181b', // zinc-900
          700: '#27272a', // zinc-800
          600: '#3f3f46', // zinc-700
          text: '#f4f4f5', // zinc-100
          muted: '#a1a1aa', // zinc-400
        },
        brand: {
          purple: '#8b5cf6', // violet-500
          blue: '#3b82f6', // blue-500
          cyan: '#06b6d4', // cyan-500
          emerald: '#10b981', // emerald-500
        }
      },
      fontFamily: {
        sans: ['Google Sans Flex', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(139, 92, 246, 0.2), 0 0 10px rgba(139, 92, 246, 0.2)' },
          '100%': { boxShadow: '0 0 15px rgba(139, 92, 246, 0.6), 0 0 25px rgba(139, 92, 246, 0.4)' },
        }
      }
    },
  },
  plugins: [],
}

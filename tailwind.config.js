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
        primary: '#0097B2',
        secondary: '#004B59',
        tertiary: '#E6F5F7',
        neutral: {
          slate: '#545F61',
          500: '#545F61',
        },
        dark: {
          900: '#061317', // deep navy dark
          850: '#091B20',
          800: '#0D242B', // card bg dark
          750: '#122D36',
          700: '#1A3944', // borders dark
          text: '#e6f5f7',
          muted: '#84989d',
        },
        brand: {
          primary: '#0097B2',
          secondary: '#004B59',
          tertiary: '#E6F5F7',
          neutral: '#545F61',
          teal: '#0097B2',
          navyTeal: '#004B59',
          purple: '#0097B2',
          blue: '#004B59',
          cyan: '#0097B2',
          emerald: '#10b981',
        }
      },
      fontFamily: {
        sans: ['Source Sans 3', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        headline: ['Hanken Grotesk', 'sans-serif'],
        label: ['Hanken Grotesk', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(0, 151, 178, 0.2), 0 0 10px rgba(0, 151, 178, 0.2)' },
          '100%': { boxShadow: '0 0 15px rgba(0, 151, 178, 0.6), 0 0 25px rgba(0, 151, 178, 0.4)' },
        }
      }
    },
  },
  plugins: [],
}

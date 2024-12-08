/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        'xs': '480px',
      },
      colors: {
        error: {
          default: '#F87171',
        },
        success: {
          default: '#34D399',
        },
        dark: {
          default: '#1A1A1A',
          darkest: '#262626',
          50: '#8C8C8C',
          80: '#484848',
          10: '#E8E8E8',
        },
        primary: {
          default: '#FFB354',
          dark: '#B27D3B',
          darkest: '#664822',
        },
        secondary: {
          default: '#4436CA',
          dark: '#30268D',
          darkest: '#1B1651',
          5: '#F6F5FC',
          30: '#C7C3EF'
        }
      }
    },
  },
  plugins: [],
}


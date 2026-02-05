/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Verde Inglés (Deep Forest/British Racing Green)
        primary: {
          50: '#f1f5f2',
          100: '#e2ebe5',
          200: '#c5d7cb',
          300: '#a8c3b1',
          400: '#8bb097',
          500: '#6e9c7d',
          600: '#567d62',
          700: '#415e4a',
          800: '#2b3f31',
          900: '#162019',
          950: '#0b100c',
        },
        // Dorado (Refined Gold/Champagne)
        accent: {
          50: '#faf8f1',
          100: '#f5f1e3',
          200: '#ebe3c7',
          300: '#e1d5ab',
          400: '#d7c78f',
          500: '#cdb973',
          600: '#c5a059', // Main Gold
          700: '#9e8047',
          800: '#776035',
          900: '#504023',
          950: '#282012',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

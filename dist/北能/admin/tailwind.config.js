/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#6B46C1',
          DEFAULT: '#9333EA',
          dark: '#7C3AED',
        },
        background: {
          primary: '#0A0A0B',
          secondary: '#18181B',
          tertiary: '#27272A',
          card: '#1F1F23',
        },
        border: {
          light: '#3F3F46',
          DEFAULT: '#27272A',
          dark: '#18181B',
        },
      },
    },
  },
  plugins: [],
}
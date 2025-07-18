/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // Important!,
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5', // Indigo
        secondary: '#F59E0B', // Amber
        surface: '#F3F4F6',  // Light gray
        darkSurface: '#1F2937', // Dark gray
        darkCard: '#374151',
      },
    },
  },
  plugins: [],
}
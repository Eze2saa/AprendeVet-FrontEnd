/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
    screens: {
      'sm': '768px',
      'md': '1024px',
      'lg': '1280px',
      'xl': '1366px',
      '2xl': '1536px'
    },
  },
  plugins: [],
}

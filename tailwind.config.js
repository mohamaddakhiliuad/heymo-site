/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
      },
      colors: {
        cream: "#fef6ee",
        brown: "#5b4636",
        beige: "#fff8f2",
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

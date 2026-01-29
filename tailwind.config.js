/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#E11D48", // Vibrant Red
        accent: "#F43F5E",
        "dark-matte": "#0F0F0F",
        "dark-charcoal": "#1A1A1A",
        // Checkout page colors
        "background-light": "#f8f6f6",
        "background-dark": "#121212",
        "oxblood": "#a12b2b",
        "charcoal-interactive": "#1a1a1a",
      },
      fontFamily: {
        display: ["Montserrat", "sans-serif"],
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
}


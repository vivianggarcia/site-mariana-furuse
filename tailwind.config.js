/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./src/**/*.{html,js}"],
  theme: {
    extend: {
      screens: {
        nav: "1260px",
      },
      colors: {
        verde: {
          DEFAULT: "#66857b",
          50: "#f3f6f5",
          100: "#e2eae7",
          200: "#c5d5cf",
          300: "#a0bab0",
          400: "#7a9c8f",
          500: "#66857b",
          600: "#526c63",
          700: "#43574f",
          800: "#374642",
          900: "#2f3b38",
          950: "#1a2321",
        },
        bege: {
          DEFAULT: "#e4ded0",
          50: "#fbfaf7",
          100: "#f6f3ed",
          200: "#e4ded0",
          300: "#d5cbb5",
          400: "#c2b294",
          500: "#b9aa8d",
          600: "#a08d6e",
          700: "#82735a",
          800: "#6b5f4c",
          900: "#584e40",
        },
        tinta: "#3a3733",
      },
      fontFamily: {
        display: ["Fraunces", "ui-serif", "Georgia", "serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1280px",
      },
      boxShadow: {
        soft: "0 20px 45px -20px rgba(58, 55, 51, 0.25)",
        card: "0 10px 30px -12px rgba(58, 55, 51, 0.18)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};

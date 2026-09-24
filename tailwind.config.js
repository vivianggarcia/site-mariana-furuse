/** @type {import('tailwindcss').Config} */
// Paleta e tipografia seguem o manual de identidade visual da Dra. Mariana Furuse:
//   Verde  #66857b  (primária)
//   Bege   #e4ded0
//   Areia  #b9aa8d
//   Primária: Antigua  → fallback web: Jost (light)
//   Secundária: Acumin Variable Concept → fallback web: Archivo
module.exports = {
  content: ["./*.html", "./assets/js/**/*.js", "./src/**/*.{html,js}"],
  theme: {
    extend: {
      screens: {
        nav: "1100px",
      },
      colors: {
        verde: {
          DEFAULT: "#66857b",
          50: "#f1f4f2",
          100: "#dfe7e3",
          200: "#c2d1cb",
          300: "#9fb5ad",
          400: "#809d93",
          500: "#66857b",
          600: "#57736a",
          700: "#4a6259",
          800: "#3c4f48",
          900: "#2f3e39",
        },
        bege: {
          DEFAULT: "#e4ded0",
          50: "#f6f4ee",
          100: "#eeeae1",
          200: "#e4ded0",
          300: "#d3cab5",
        },
        areia: {
          DEFAULT: "#b9aa8d",
          600: "#8f8166",
          700: "#6f644f",
        },
        tinta: "#2f3e39",
      },
      fontFamily: {
        display: ["Antigua", "Jost", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["acumin-variable", "Acumin Variable Concept", "Archivo", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1240px",
      },
      letterSpacing: {
        label: "0.28em",
      },
    },
  },
  plugins: [],
};

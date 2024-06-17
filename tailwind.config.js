/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors:{
        "verde-oscuro": "#183D3D",
        "verde-medio":"#5C8374",
        "verde-claro":"#93B1A6",
      }
    },
  },
  plugins: [
    require('tailwindcss-animated'),
  ],
}

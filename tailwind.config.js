/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "main-theme": "#132539",
        "secondary-theme": "#c98f2b"
      }
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
  ],
}


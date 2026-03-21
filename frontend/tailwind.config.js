/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkbg: "#111827",
        darkcard: "#1F2937",
        accent: "#5865F2",
        softgray: "#F8F9FA"
      },
      animation: {
        fadeIn: "fadeIn 0.6s ease-out forwards",
        spinSlow: "spin 1s linear infinite"
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      }
    },
  },
  plugins: [],
}

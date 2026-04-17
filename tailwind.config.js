/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0d0d12",
        accent: "#6366f1",
        glass: "rgba(255,255,255,0.03)",
        "glass-border": "rgba(255,255,255,0.08)",
        "text-primary": "#f8fafc",
        "text-secondary": "#94a3b8",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Space Grotesk", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
}
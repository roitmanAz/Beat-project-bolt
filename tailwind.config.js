/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Orbitron", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["Space Mono", "monospace"],
      },
      colors: {
        "cyan-mid": "#0098b8",
        "cyan-bright": "#00c8e8",
        "cyan-glow": "#00e5ff",
      },
      boxShadow: {
        "neon-sm": "0 0 8px rgba(0,200,232,.45), 0 0 20px rgba(0,200,232,.15)",
      },
    },
  },
  plugins: [],
};

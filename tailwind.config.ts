import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0a0a0b",
          900: "#111113",
          800: "#1a1a1e",
          700: "#25252b",
          600: "#34343c",
        },
        gold: {
          300: "#f8d98a",
          400: "#f5c451",
          500: "#e8a920",
          600: "#c98a0a",
        },
        ember: "#e2571f",
        your: {
          black: "#111111",
          orange: "#FF6B35",
          cream: "#FFF8F0",
          "light-orange": "#FFB085",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(232, 169, 32, 0.45)",
      },
    },
  },
  plugins: [],
};

export default config;

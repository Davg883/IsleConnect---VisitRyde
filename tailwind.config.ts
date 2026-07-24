import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0B0F19",
          900: "#111827",
          800: "#1A2333",
        },
        gold: {
          DEFAULT: "#D4AF37",
          soft: "#C5A880",
        },
        cream: "#F4F1EA",
        mutedwarm: "#B5B2AA",
        tide: {
          DEFAULT: "#2E9CA6",
          deep: "#1B6E76",
        },
      },
      fontFamily: {
        display: ["'Playfair Display'", "Georgia", "serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 32px rgba(212, 175, 55, 0.35)",
        "glow-sm": "0 0 18px rgba(212, 175, 55, 0.25)",
      },
      keyframes: {
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "spin-slow": "spin-slow 9s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;

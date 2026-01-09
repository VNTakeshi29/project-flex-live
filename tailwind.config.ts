import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#07070b",
        panel: "rgba(16, 18, 28, 0.6)",
        panelStrong: "rgba(16, 18, 28, 0.82)",
        neon: {
          cyan: "#46f3ff",
          pink: "#ff4fd8",
          purple: "#8b5cff"
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-space)", "system-ui", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 24px rgba(70, 243, 255, 0.25)",
        soft: "0 12px 40px rgba(0, 0, 0, 0.45)"
      },
      keyframes: {
        drift: {
          "0%": { transform: "translate3d(0,0,0) rotate(0deg)" },
          "50%": { transform: "translate3d(-4%, -2%, 0) rotate(1deg)" },
          "100%": { transform: "translate3d(0,0,0) rotate(0deg)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" }
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" }
        },
        ripple: {
          "0%": { transform: "scale(0)", opacity: "0.6" },
          "100%": { transform: "scale(2.5)", opacity: "0" }
        }
      },
      animation: {
        drift: "drift 18s ease-in-out infinite",
        shimmer: "shimmer 2.4s linear infinite",
        float: "float 6s ease-in-out infinite",
        pulseSoft: "pulseSoft 2.4s ease-in-out infinite",
        ripple: "ripple 600ms ease-out"
      }
    }
  },
  plugins: []
};

export default config;


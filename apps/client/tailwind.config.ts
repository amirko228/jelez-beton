import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        graphite: "#1a1a2e",
        "graphite-light": "#16213e",
        accent: "#e94560",
        "accent-dark": "#c81e45",
        gold: "#f5a623",
        slate: {
          850: "#1e293b"
        }
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Inter", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;

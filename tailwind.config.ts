import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#0B0F14",
          card: "#111827",
          border: "#1F2937",
          primary: "#00E676",
          hover: "#00C853",
          muted: "#9CA3AF",
        },
      },
    },
  },
  plugins: [],
};

export default config;
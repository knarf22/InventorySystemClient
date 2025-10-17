import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        jakarta: ["'Plus Jakarta Sans'", "sans-serif"],
      },
      colors: {
        primary: "#7C3AED",
        secondary: "#A78BFA",
        sidebar: "#1E1B4B",
        sidebarHover: "#312E81",
        background: "#F3F4F6",
        text: "#E5E7EB",
        muted: "#9CA3AF",
      },
    },
  },
  plugins: [],
};

export default config;

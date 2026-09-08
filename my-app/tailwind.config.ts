import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#C2C5AA",
        "bg-2": "#B6AD90",
        surface: "#F5F3EE",
        "surface-2": "#EDE9E0",
        "surface-3": "#A4AC86",
        line: "rgba(51,61,41,0.15)",
        brand: {
          DEFAULT: "#936639",
          light: "#A68A64",
          dark: "#582F0E",
        },
        wa: "#656D4A",
      },
      fontFamily: {
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        head: ["var(--font-head)", "var(--font-body)", "sans-serif"],
      },
      maxWidth: {
        container: "1240px",
      },
      boxShadow: {
        card: "0 18px 50px -18px rgba(0,0,0,.7)",
      },
    },
  },
  plugins: [],
};

export default config;

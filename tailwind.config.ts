import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(15, 14, 14)",
        highlight: "rgb(255, 217, 142)",
        "black-45": "rgba(16, 16, 16, 0.4)",
        "white-50": "rgba(255, 255, 255, 0.5)",
        "black-10": "rgba(15, 14, 14, 0.1)",
      },
      fontFamily: {
        satoshi: ["Satoshi", "sans-serif"],
      },
      letterSpacing: {
        tight: "-0.03em",
        tighter: "-0.01em",
        wide: "0.02em",
        wider: "0.03em",
      },
    },
  },
  plugins: [],
};

export default config;

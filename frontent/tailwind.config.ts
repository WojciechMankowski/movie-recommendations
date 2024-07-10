import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "primary-color": "#FFD700",
        "secondary-color": "#C71585",
        "accent-color": "#ADD8E6",
        "light-accent-color": "#F5F5F5",
        "blackt-accent-color": "#1A1A1A",
      },
    },
  },
  plugins: [require('daisyui'),],
};
export default config;

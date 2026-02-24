import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "sky-blue": "#00EAFF",
        "sys-success": "#10B981",
        "sys-warning": "#F59E0B",
        "sys-error": "#EF4444",
      },
      fontFamily: {
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      backgroundImage: {
        "sky-glow": "radial-gradient(circle at center, rgba(0, 234, 255, 0.15) 0%, rgba(255, 255, 255, 0) 70%)",
      },
      boxShadow: {
        "glass-shadow": "0 8px 32px 0 rgba(0, 234, 255, 0.1), 0 4px 16px 0 rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
};

export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Satoshi from Fontshare — body + UI
        sans: ["'Satoshi'", "ui-sans-serif", "system-ui"],
        // Zodiak from Fontshare — editorial display headings
        display: ["'Zodiak'", "Georgia", "serif"],
        // JetBrains Mono via next/font CSS variable — code + labels
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular"],
      },
      screens: {
        xs: "375px",
      },
    },
  },
  plugins: [],
};

export default config;

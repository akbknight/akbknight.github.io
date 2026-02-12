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
                background: "#0a0a0a", // Obsidian
                foreground: "#e5e7eb", // Silver
                primary: {
                    DEFAULT: "#6366f1", // Indigo
                    foreground: "#ffffff",
                },
                secondary: {
                    DEFAULT: "#1f2937", // Gray 800
                    foreground: "#9ca3af", // Muted Gray
                },
                accent: {
                    DEFAULT: "rgba(255, 255, 255, 0.1)", // Frosted glass border
                },
            },
            fontFamily: {
                sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui"],
                mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular"],
            },
            backgroundImage: {
                "glass-gradient":
                    "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)",
            },
        },
    },
    plugins: [],
};
export default config;

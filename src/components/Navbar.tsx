"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/ThemeProvider";

const NAV_ITEMS = [
  { name: "Work", path: "/" },
  { name: "Life", path: "/life" },
];

// AK monogram SVG logo
const AKLogo = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Akshay Kumar"
    role="img"
  >
    <rect width="28" height="28" rx="6" fill="var(--accent)" />
    {/* A */}
    <path
      d="M5 21L8.5 9H10L13.5 21H12L11.2 18H7.2L6.5 21H5ZM7.6 16.8H10.8L9.2 11.2L7.6 16.8Z"
      fill="#09090B"
      fontSize="13"
      fontWeight="700"
    />
    {/* K */}
    <path
      d="M15 9H16.5V14.2L20.5 9H22.3L18.5 14L22.5 21H20.7L17.5 15.5L16.5 16.7V21H15V9Z"
      fill="#09090B"
    />
  </svg>
);

export const Navbar = () => {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();

  return (
    <div className="fixed top-5 inset-x-0 max-w-fit mx-auto z-[100]">
      <div
        className="flex items-center gap-1 px-2 py-1.5 rounded-full border backdrop-blur-xl"
        style={{
          background: "rgba(9,9,11,0.75)",
          borderColor: "rgba(255,255,255,0.1)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
        }}
      >
        {/* Logo */}
        <Link href="/" aria-label="Home" className="p-1 mr-1">
          <AKLogo />
        </Link>

        {/* Divider */}
        <div className="w-px h-4 mx-0.5" style={{ background: "rgba(255,255,255,0.12)" }} />

        {/* Nav links */}
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                "relative px-4 py-2 rounded-full text-[13px] font-medium transition-colors duration-200",
                isActive ? "text-[var(--text)]" : "text-[var(--text-muted)] hover:text-[var(--text-2)]"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="navbar-pill"
                  className="absolute inset-0 rounded-full"
                  style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.06)" }}
                  transition={{ type: "spring", stiffness: 320, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item.name}</span>
            </Link>
          );
        })}

        {/* Divider + theme toggle */}
        <div className="w-px h-4 mx-0.5" style={{ background: "rgba(255,255,255,0.12)" }} />
        <button
          onClick={toggle}
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          className="p-2.5 rounded-full text-[var(--text-muted)] hover:text-[var(--text)] transition-colors duration-200"
        >
          {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};

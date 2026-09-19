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
    <g stroke="#09090B" fill="none" strokeWidth="2.8">
      <path d="M5 23 L13 5 L13 23" strokeLinecap="square" strokeLinejoin="miter" />
      <line x1="8" y1="16" x2="13" y2="16" strokeLinecap="butt" />
      <path d="M24 5 L13 13 L24 23" strokeLinecap="square" strokeLinejoin="miter" />
    </g>
  </svg>
);

export const Navbar = () => {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();

  return (
    <div className="fixed top-5 inset-x-0 max-w-fit mx-auto z-[100]">
      <div
        className="flex items-center gap-1 px-2 py-1.5 rounded-full border border-zinc-200/90 dark:border-white/10 bg-white/85 dark:bg-zinc-950/80 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-black/40"
      >
        {/* Logo */}
        <Link href="/" aria-label="Home" className="p-1 mr-1">
          <AKLogo />
        </Link>

        {/* Divider */}
        <div className="w-px h-4 mx-0.5 bg-zinc-200 dark:bg-white/10" />

        {/* Nav links */}
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                "relative px-4 py-2 rounded-full text-[13px] font-medium transition-colors duration-200",
                isActive
                  ? "text-zinc-900 dark:text-white font-semibold"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="navbar-pill"
                  className="absolute inset-0 rounded-full bg-zinc-100 dark:bg-white/[0.08] border border-zinc-200/80 dark:border-white/[0.06]"
                  transition={{ type: "spring", stiffness: 320, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item.name}</span>
            </Link>
          );
        })}

        {/* Divider + theme toggle */}
        <div className="w-px h-4 mx-0.5 bg-zinc-200 dark:bg-white/10" />
        <button
          onClick={toggle}
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          className="p-2.5 rounded-full text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors duration-200 cursor-pointer"
        >
          {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-sky-600" />}
        </button>
      </div>
    </div>
  );
};

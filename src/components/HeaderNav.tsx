"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, FileText, Menu, X, ArrowUpRight, Sparkles } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { Mascot } from "@/components/Mascot";

const NAV_LINKS = [
  { name: "Selected Work", href: "#work" },
  { name: "Experience", href: "#experience" },
  { name: "Writing", href: "#writing" },
  { name: "Contact", href: "#contact" },
  { name: "Life", href: "/life" },
];

interface HeaderNavProps {
  onOpenResume: () => void;
  mascotChoice: "wolf" | "knight";
  onToggleMascot: (choice: "wolf" | "knight") => void;
}

export const HeaderNav = ({
  onOpenResume,
  mascotChoice,
  onToggleMascot,
}: HeaderNavProps) => {
  const { theme, toggle } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mascotMenuOpen, setMascotMenuOpen] = useState(false);
  const mascotMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Close menus on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        mascotMenuRef.current &&
        !mascotMenuRef.current.contains(e.target as Node)
      ) {
        setMascotMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        setMascotMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 dark:bg-[#070709]/80 border-b border-zinc-200/80 dark:border-white/[0.08] transition-colors duration-200">
      {/* Skip to Content for Keyboard Accessibility */}
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-4 z-[100] px-3 py-1.5 rounded-md bg-sky-600 text-white text-xs font-medium shadow-md outline-none ring-2 ring-sky-400"
      >
        Skip to main content
      </a>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Identity Mark & Name */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-zinc-900 dark:text-white font-semibold text-sm tracking-tight group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded-lg p-1 -ml-1"
            aria-label="Akshay Kumar home"
          >
            <span className="w-7 h-7 rounded-lg bg-sky-500/10 dark:bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-600 dark:text-sky-400 font-mono-code text-xs font-bold transition-transform group-hover:scale-105">
              AK
            </span>
            <div className="flex flex-col">
              <span className="leading-tight group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                Akshay Kumar
              </span>
              <span className="text-[10px] font-mono-code font-normal text-zinc-600 dark:text-zinc-300 leading-none">
                Washington, DC
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav
          aria-label="Main navigation"
          className="hidden md:flex items-center gap-1 text-xs font-medium text-zinc-600 dark:text-zinc-300"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-3 py-1.5 rounded-md hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/[0.05] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right: Controls (Mascot Companion, Resume CTA, Theme Toggle, Mobile Menu) */}
        <div className="flex items-center gap-2">
          {/* Mascot Companion Mini Control */}
          <div className="relative" ref={mascotMenuRef}>
            <button
              type="button"
              onClick={() => setMascotMenuOpen((v) => !v)}
              className="flex items-center gap-1.5 p-1 rounded-xl border border-zinc-200/80 dark:border-white/[0.08] bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900/60 dark:hover:bg-zinc-800/80 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
              aria-label={`Mascot companion: ${mascotChoice === "wolf" ? "Chibi Wolf" : "Knight"}. Click to toggle choice.`}
              aria-expanded={mascotMenuOpen}
              title="Click to interact with mascot companion"
            >
              <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center bg-zinc-200/50 dark:bg-zinc-800/80 pointer-events-none">
                <Mascot
                  key={mascotChoice}
                  directions={
                    mascotChoice === "wolf"
                      ? "/mascots/wolf-directions.webp"
                      : "/mascots/knight-directions.webp"
                  }
                  reactions={
                    mascotChoice === "wolf"
                      ? "/mascots/wolf-reactions.webp"
                      : "/mascots/knight-reactions.webp"
                  }
                  size={36}
                  label={mascotChoice === "wolf" ? "Wolf mascot" : "Knight mascot"}
                />
              </div>
              <span className="text-[11px] font-mono-code text-zinc-600 dark:text-zinc-300 pr-1.5 hidden sm:inline">
                {mascotChoice === "wolf" ? "🐺" : "⚔️"}
              </span>
            </button>

            {/* Mascot Choice Dropdown Popover */}
            <AnimatePresence>
              {mascotMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-48 rounded-xl border border-zinc-200 dark:border-white/[0.1] bg-white dark:bg-[#0E0E14] shadow-lg p-2 z-50"
                  role="dialog"
                  aria-label="Select mascot companion"
                >
                  <p className="text-[10px] font-mono-code text-zinc-600 dark:text-zinc-300 px-2 py-1 uppercase tracking-wider">
                    Companion Sprite
                  </p>
                  <div className="flex flex-col gap-1 mt-1">
                    <button
                      type="button"
                      onClick={() => {
                        onToggleMascot("wolf");
                        setMascotMenuOpen(false);
                      }}
                      className={`flex items-center justify-between w-full px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors text-left cursor-pointer ${
                        mascotChoice === "wolf"
                          ? "bg-sky-500/10 text-sky-700 dark:text-sky-300 font-semibold"
                          : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/[0.05]"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>🐺</span>
                        <span>Chibi Wolf</span>
                      </span>
                      {mascotChoice === "wolf" && (
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        onToggleMascot("knight");
                        setMascotMenuOpen(false);
                      }}
                      className={`flex items-center justify-between w-full px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors text-left cursor-pointer ${
                        mascotChoice === "knight"
                          ? "bg-sky-500/10 text-sky-700 dark:text-sky-300 font-semibold"
                          : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/[0.05]"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>⚔️</span>
                        <span>Noble Knight</span>
                      </span>
                      {mascotChoice === "knight" && (
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Interactive Résumé CTA */}
          <button
            type="button"
            onClick={onOpenResume}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-white/[0.1] bg-zinc-100 hover:bg-zinc-200 dark:bg-white/[0.06] dark:hover:bg-white/[0.1] text-zinc-900 dark:text-white text-xs font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
            aria-label="Open interactive curriculum vitae and resume"
          >
            <FileText className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
            <span className="hidden sm:inline">Résumé</span>
          </button>

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggle}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className="p-2 rounded-lg border border-zinc-200 dark:border-white/[0.1] bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900/60 dark:hover:bg-zinc-800/80 text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
            title="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-sky-600" />
            )}
          </button>

          {/* Mobile Hamburger Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
            className="md:hidden p-2 rounded-lg border border-zinc-200 dark:border-white/[0.1] bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900/60 dark:hover:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
          >
            {mobileMenuOpen ? (
              <X className="w-4 h-4" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Accessible Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-zinc-200 dark:border-white/[0.08] bg-white/95 dark:bg-[#070709]/95 backdrop-blur-md px-6 py-4 space-y-3"
          >
            <nav aria-label="Mobile navigation" className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-white/[0.06] transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            <div className="pt-3 border-t border-zinc-200 dark:border-white/[0.06] flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-medium transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>View Résumé</span>
              </button>

              <a
                href="mailto:ak8335a@american.edu"
                className="text-xs font-mono-code text-zinc-500 dark:text-zinc-400 hover:text-sky-600 dark:hover:text-sky-400"
              >
                ak8335a@american.edu
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

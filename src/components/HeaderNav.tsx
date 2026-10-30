"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, FileText, Menu, X } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { Mascot } from "@/components/Mascot";

const NAV_LINKS = [
  { name: "Selected Work", href: "/#work" },
  { name: "Experience", href: "/#experience" },
  { name: "Writing", href: "/#writing" },
  { name: "Contact", href: "/#contact" },
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
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleToggleMascot = () => {
    onToggleMascot(mascotChoice === "wolf" ? "knight" : "wolf");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 dark:bg-[#090A0F]/90 backdrop-blur-md border-b border-zinc-200/80 dark:border-white/[0.08] transition-colors duration-200">
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
              <span className="text-[10px] font-mono-code font-normal text-zinc-500 dark:text-zinc-400 leading-none">
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

        {/* Right: Controls (Companion Mark, Resume CTA, Theme Toggle, Mobile Menu) */}
        <div className="flex items-center gap-2">
          {/* Subtle Companion Mark Toggle */}
          <button
            type="button"
            onClick={handleToggleMascot}
            className="flex items-center gap-1.5 p-1 rounded-xl border border-zinc-200 dark:border-white/[0.08] bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900/60 dark:hover:bg-zinc-800/80 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
            aria-label={`Toggle companion crest: currently ${mascotChoice === "wolf" ? "Wolf" : "Knight"}. Click to switch.`}
            title={`Companion crest: ${mascotChoice === "wolf" ? "Wolf (click for Knight)" : "Knight (click for Wolf)"}`}
          >
            <div className="w-7 h-7 rounded-lg overflow-hidden flex items-center justify-center bg-zinc-200/50 dark:bg-zinc-800/80 pointer-events-none">
              <Mascot
                key={mascotChoice}
                asArtwork={true}
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
                size={30}
                label={mascotChoice === "wolf" ? "Wolf companion" : "Knight companion"}
              />
            </div>
            <span className="text-[10px] font-mono-code text-zinc-500 dark:text-zinc-400 pr-1 hidden sm:inline">
              {mascotChoice === "wolf" ? "🐺" : "⚔️"}
            </span>
          </button>

          {/* Interactive Résumé CTA */}
          <button
            type="button"
            onClick={onOpenResume}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-white/[0.1] bg-zinc-100 hover:bg-zinc-200 dark:bg-white/[0.06] dark:hover:bg-white/[0.1] text-zinc-900 dark:text-white text-xs font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
            aria-label="View résumé"
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
            transition={{ duration: 0.18 }}
            className="md:hidden border-t border-zinc-200 dark:border-white/[0.08] bg-white/98 dark:bg-[#090A0F]/98 backdrop-blur-md px-6 py-4 space-y-3"
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

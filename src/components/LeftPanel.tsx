"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, BookOpen, Sun, Moon, FileText } from "lucide-react";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { useTheme } from "@/components/ThemeProvider";
import { Mascot } from "@/components/Mascot";

const NAV_SECTIONS = [
  { id: "hero", label: "00 · Overview" },
  { id: "about", label: "01 · Background & Focus" },
  { id: "experience", label: "02 · Track Record" },
  { id: "projects", label: "03 · Featured Systems" },
  { id: "writing", label: "04 · Technical Write-ups & Methodology" },
  { id: "contact", label: "05 · Contact & Hiring" },
];

const SOCIALS = [
  {
    href: "https://github.com/akbknight",
    label: "GitHub Profile",
    icon: <Github className="w-4 h-4" />,
  },
  {
    href: "https://www.linkedin.com/in/akshaykumardl/",
    label: "LinkedIn Profile",
    icon: <Linkedin className="w-4 h-4" />,
  },
  {
    href: "mailto:ak8335a@american.edu",
    label: "Email Contact",
    icon: <Mail className="w-4 h-4" />,
  },
  {
    href: "/life",
    label: "Essays & Photography",
    icon: <BookOpen className="w-4 h-4" />,
    internal: true,
  },
  {
    href: "/assets/Akshay_Resume.pdf",
    label: "View Résumé",
    icon: <FileText className="w-4 h-4" />,
  },
];

interface LeftPanelProps {
  onOpenResume?: () => void;
}

export const LeftPanel = ({ onOpenResume }: LeftPanelProps) => {
  const activeId = useScrollSpy(NAV_SECTIONS.map((s) => s.id));
  const { theme, toggle } = useTheme();
  const [mascotChoice, setMascotChoice] = useState<"wolf" | "knight">("wolf");

  return (
    <div className="flex flex-col justify-between min-h-full gap-8">
      {/* Header Profile Block */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Mascot & Availability Bar */}
          <div className="flex items-center gap-3.5 mb-5">
            <div className="relative group flex-shrink-0">
              <div className="p-1 rounded-2xl bg-zinc-100/90 dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-white/[0.08] shadow-sm transition-all">
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
                  size={84}
                  label={mascotChoice === "wolf" ? "Chibi Wolf Mascot" : "Knight Mascot"}
                  className="transition-transform group-hover:scale-105"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5 flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-zinc-200 dark:border-white/[0.08] bg-zinc-100/70 dark:bg-white/[0.03] w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                  <span className="text-[11px] font-mono-code font-medium text-zinc-700 dark:text-zinc-300">
                    Washington, DC
                  </span>
                </div>

                {/* Quick Theme Toggle */}
                <button
                  type="button"
                  onClick={toggle}
                  aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-mono-code border border-zinc-200 dark:border-white/[0.1] bg-zinc-100/80 dark:bg-zinc-800/80 text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white transition-all shadow-xs cursor-pointer"
                  title="Toggle Dark / Light theme"
                >
                  {theme === "dark" ? (
                    <>
                      <Sun className="w-3.5 h-3.5 text-amber-400" />
                      <span className="text-[10px]">Light</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-3.5 h-3.5 text-sky-600" />
                      <span className="text-[10px]">Dark</span>
                    </>
                  )}
                </button>
              </div>

              {/* Mascot selector toggle */}
              <div className="inline-flex items-center gap-1 text-[10px] font-mono-code text-zinc-500 dark:text-zinc-400">
                <span className="text-zinc-400 dark:text-zinc-500">Mascot:</span>
                <button
                  type="button"
                  onClick={() => setMascotChoice("wolf")}
                  className={`px-1.5 py-0.5 rounded transition-colors cursor-pointer ${
                    mascotChoice === "wolf"
                      ? "bg-sky-500/15 text-sky-700 dark:text-sky-300 font-semibold border border-sky-500/30"
                      : "hover:text-zinc-700 dark:hover:text-zinc-200"
                  }`}
                  aria-label="Switch to Chibi Wolf mascot"
                >
                  🐺 Wolf
                </button>
                <span className="text-zinc-300 dark:text-zinc-700">/</span>
                <button
                  type="button"
                  onClick={() => setMascotChoice("knight")}
                  className={`px-1.5 py-0.5 rounded transition-colors cursor-pointer ${
                    mascotChoice === "knight"
                      ? "bg-sky-500/15 text-sky-700 dark:text-sky-300 font-semibold border border-sky-500/30"
                      : "hover:text-zinc-700 dark:hover:text-zinc-200"
                  }`}
                  aria-label="Switch to Knight mascot"
                >
                  🛡️ Knight
                </button>
              </div>
            </div>
          </div>

          <h1
            className="font-bold tracking-tight text-zinc-900 dark:text-white"
            style={{
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
            }}
          >
            <span className="inline-block whitespace-nowrap">Akshay</span>{" "}
            <span className="inline-block whitespace-nowrap">Kumar</span>
          </h1>

          <h2 className="text-sm font-medium mt-1.5 text-zinc-700 dark:text-zinc-300 tracking-tight">
            Analytics Engineer &amp; Operations Analyst
          </h2>
          <p className="text-xs font-mono-code text-zinc-500 dark:text-zinc-400 mt-0.5">
            Business Intelligence · Data Analytics · Operations
          </p>

          <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-sm mt-3">
            Building reliable data pipelines, operational forecasting models, and decision-support dashboards that translate complex public and enterprise data into leadership decisions.
          </p>

          {/* Quick Resume Link */}
          {onOpenResume && (
            <div className="mt-5">
              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-white/[0.05] dark:hover:bg-white/[0.1] text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-white/10 text-xs font-medium transition-all duration-150 group cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                <span>Interactive résumé (PDF)</span>
              </button>
            </div>
          )}
        </motion.div>

        {/* Semantic Navigation with Strict Spring Physics */}
        <nav className="mt-10 hidden lg:block" aria-label="Primary page navigation">
          <ul className="space-y-1.5">
            {NAV_SECTIONS.map((sec) => {
              const isActive = activeId === sec.id;
              return (
                <li key={sec.id}>
                  <a
                    href={`#${sec.id}`}
                    className={`group flex items-center gap-3 px-3 py-1.5 rounded-lg transition-all duration-150 text-xs font-mono-code uppercase tracking-wider ${
                      isActive
                        ? "bg-sky-500/10 dark:bg-sky-500/15 text-sky-700 dark:text-sky-300 font-semibold border border-sky-500/30 shadow-xs"
                        : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-zinc-100/70 dark:hover:bg-white/[0.04] border border-transparent"
                    }`}
                  >
                    <span
                      className={`h-[1.5px] rounded-full transition-all duration-200 ${
                        isActive
                          ? "w-5 bg-sky-600 dark:bg-sky-400"
                          : "w-2 bg-zinc-300 group-hover:w-3.5 group-hover:bg-zinc-500 dark:bg-zinc-600 dark:group-hover:bg-zinc-400"
                      }`}
                    />
                    <span>{sec.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Social & Contact Bar */}
      <div className="flex items-center gap-2 mt-10 lg:mt-0 pt-6 border-t border-zinc-200 dark:border-white/[0.06]">
        {SOCIALS.map((soc) =>
          soc.internal ? (
            <a
              key={soc.label}
              href={soc.href}
              aria-label={soc.label}
              className="w-9 h-9 flex items-center justify-center rounded-lg text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800/60 transition-colors border border-transparent hover:border-zinc-300 dark:hover:border-zinc-700/60"
            >
              {soc.icon}
            </a>
          ) : soc.label === "View Résumé" && onOpenResume ? (
            <button
              key={soc.label}
              onClick={onOpenResume}
              aria-label="Open interactive résumé modal"
              className="w-9 h-9 flex items-center justify-center rounded-lg text-zinc-500 hover:text-sky-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-sky-400 dark:hover:bg-zinc-800/60 transition-colors border border-transparent hover:border-zinc-300 dark:hover:border-zinc-700/60 cursor-pointer"
            >
              {soc.icon}
            </button>
          ) : (
            <a
              key={soc.label}
              href={soc.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={soc.label}
              className="w-9 h-9 flex items-center justify-center rounded-lg text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800/60 transition-colors border border-transparent hover:border-zinc-300 dark:hover:border-zinc-700/60"
            >
              {soc.icon}
            </a>
          )
        )}

        {/* Theme Toggle Button */}
        <button
          onClick={toggle}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          className="w-9 h-9 flex items-center justify-center rounded-lg text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800/60 transition-colors border border-transparent hover:border-zinc-300 dark:hover:border-zinc-700/60 ml-auto cursor-pointer"
        >
          {theme === "dark" ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-sky-600" />
          )}
        </button>
      </div>
    </div>
  );
};

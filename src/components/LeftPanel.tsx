"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, BookOpen, Sun, Moon, FileText } from "lucide-react";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { useTheme } from "@/components/ThemeProvider";

const NAV_SECTIONS = [
  { id: "hero", label: "00 · Overview" },
  { id: "about", label: "01 · About & Focus" },
  { id: "experience", label: "02 · Verified Track Record" },
  { id: "architecture", label: "03 · Systems Architecture" },
  { id: "projects", label: "04 · Flagship Projects" },
  { id: "writing", label: "05 · Publications & Notes" },
  { id: "contact", label: "06 · Contact & Connect" },
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

  return (
    <div className="flex flex-col justify-between h-full">
      {/* Header Profile Block */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Identity & Status */}
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-sky-600/20 dark:border-sky-500/20 bg-sky-500/10 dark:bg-sky-500/5 mb-4">
            <span className="w-2 h-2 rounded-full bg-sky-600 dark:bg-sky-400 animate-pulse shadow-[0_0_8px_#38bdf8]" />
            <span className="text-[11px] font-mono-code font-medium text-sky-700 dark:text-sky-400 uppercase tracking-wider">
              Available for Strategic Roles
            </span>
          </div>

          <h1
            className="font-bold tracking-tight text-zinc-900 dark:text-white"
            style={{
              fontSize: "clamp(2rem, 4.5vw, 2.85rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
            }}
          >
            Akshay Kumar
          </h1>

          <h2 className="text-base font-medium mt-2 text-zinc-700 dark:text-zinc-300 tracking-tight">
            Analytics Engineer &amp; MBA Candidate
          </h2>

          {/* Metric-Driven Mission Statement */}
          <p className="text-sm mt-4 text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-sm">
            Former <span className="text-zinc-900 dark:text-zinc-200 font-medium">U.S. Department of State</span> programmer &amp; Kogod STEM MBA candidate. Engineering high-throughput data pipelines, forensic software audits, and automated intelligence systems.
          </p>

          {/* Executive Badges */}
          <div className="flex flex-wrap gap-1.5 mt-5">
            <span className="text-[10px] font-mono-code uppercase px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-900/80 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800">
              Ex-U.S. State Dept
            </span>
            <span className="text-[10px] font-mono-code uppercase px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-900/80 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800">
              Kogod MBA &apos;27
            </span>
            <span className="text-[10px] font-mono-code uppercase px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-900/80 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800">
              DataOps &amp; Audit
            </span>
          </div>

          {/* Direct Sidebar Quick Resume Button */}
          {onOpenResume && (
            <div className="mt-6">
              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-sky-50 dark:bg-sky-500/10 hover:bg-sky-100 dark:hover:bg-sky-500/20 text-sky-700 dark:text-sky-400 border border-sky-200 dark:border-sky-500/30 text-xs font-mono-code font-medium transition-all duration-150 group cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Interactive Résumé</span>
                <span className="text-[9px] uppercase px-1 rounded bg-sky-200/60 dark:bg-sky-500/20 text-sky-800 dark:text-sky-300 group-hover:bg-sky-200">
                  PDF View
                </span>
              </button>
            </div>
          )}
        </motion.div>

        {/* Semantic Navigation with Strict Spring Physics */}
        <nav className="mt-10 hidden lg:block" aria-label="Primary page navigation">
          <ul className="space-y-1">
            {NAV_SECTIONS.map((sec) => {
              const isActive = activeId === sec.id;
              return (
                <li key={sec.id}>
                  <a
                    href={`#${sec.id}`}
                    className={`group flex items-center gap-3.5 py-1.5 transition-colors duration-150 ${
                      isActive
                        ? "text-sky-600 dark:text-sky-400 font-semibold"
                        : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                    }`}
                  >
                    <span
                      className={`h-[1px] transition-all duration-200 ${
                        isActive
                          ? "w-8 bg-sky-600 dark:bg-sky-400"
                          : "w-3 bg-zinc-300 group-hover:w-5 group-hover:bg-zinc-500 dark:bg-zinc-600 dark:group-hover:w-5 dark:group-hover:bg-zinc-400"
                      }`}
                    />
                    <span className="text-xs font-mono-code uppercase tracking-widest">
                      {sec.label}
                    </span>
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
            <Link
              key={soc.label}
              href={soc.href}
              aria-label={soc.label}
              className="w-9 h-9 flex items-center justify-center rounded-lg text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800/60 transition-colors border border-transparent hover:border-zinc-300 dark:hover:border-zinc-700/60"
            >
              {soc.icon}
            </Link>
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

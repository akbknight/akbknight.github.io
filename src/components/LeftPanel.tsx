"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, BookOpen, Sun, Moon, FileText, ArrowUpRight } from "lucide-react";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { useTheme } from "@/components/ThemeProvider";

const NAV_SECTIONS = [
  { id: "about", label: "01 · About" },
  { id: "experience", label: "02 · Experience" },
  { id: "architecture", label: "03 · Data Architecture" },
  { id: "projects", label: "04 · Flagship Projects" },
  { id: "writing", label: "05 · Publications & Notes" },
  { id: "contact", label: "06 · Contact" },
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
    href: "https://www.linkedin.com/in/akshaykumardl/",
    label: "View Résumé",
    icon: <FileText className="w-4 h-4" />,
  },
];

export const LeftPanel = () => {
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
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-sky-500/20 bg-sky-500/5 mb-4">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse shadow-[0_0_8px_#38bdf8]" />
            <span className="text-[11px] font-mono-code font-medium text-sky-400 uppercase tracking-wider">
              Available for Strategic Roles
            </span>
          </div>

          <h1
            className="font-bold tracking-tight text-white"
            style={{
              fontSize: "clamp(2rem, 4.5vw, 2.85rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
            }}
          >
            Akshay Kumar
          </h1>

          <h2 className="text-base font-medium mt-2 text-zinc-300 tracking-tight">
            Analytics Engineer &amp; MBA Candidate
          </h2>

          {/* Metric-Driven Punchy Mission Statement */}
          <p className="text-sm mt-4 text-zinc-400 leading-relaxed max-w-sm">
            Former <span className="text-zinc-200 font-medium">U.S. Department of State</span> programmer &amp; Kogod MBA. Engineering high-throughput data pipelines, forensic software audits, and automated intelligence systems.
          </p>

          {/* Executive Badges */}
          <div className="flex flex-wrap gap-1.5 mt-5">
            <span className="text-[10px] font-mono-code uppercase px-2 py-1 rounded bg-zinc-900/80 text-zinc-300 border border-zinc-800">
              Ex-U.S. State Dept
            </span>
            <span className="text-[10px] font-mono-code uppercase px-2 py-1 rounded bg-zinc-900/80 text-zinc-300 border border-zinc-800">
              Kogod MBA &apos;26
            </span>
            <span className="text-[10px] font-mono-code uppercase px-2 py-1 rounded bg-zinc-900/80 text-zinc-300 border border-zinc-800">
              DataOps &amp; Audit
            </span>
          </div>
        </motion.div>

        {/* Semantic Navigation with Strict Spring Physics */}
        <nav className="mt-12 hidden lg:block" aria-label="Primary page navigation">
          <ul className="space-y-1">
            {NAV_SECTIONS.map((sec, i) => {
              const isActive = activeId === sec.id;
              return (
                <li key={sec.id}>
                  <a
                    href={`#${sec.id}`}
                    className={`group flex items-center gap-3.5 py-1.5 transition-colors duration-150 ${
                      isActive ? "text-sky-400 font-semibold" : "text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    <span
                      className={`h-[1px] transition-all duration-200 ${
                        isActive ? "w-8 bg-sky-400" : "w-3 bg-zinc-600 group-hover:w-5 group-hover:bg-zinc-400"
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
      <div className="flex items-center gap-2 mt-10 lg:mt-0 pt-6 border-t border-white/[0.06]">
        {SOCIALS.map((soc) =>
          soc.internal ? (
            <Link
              key={soc.label}
              href={soc.href}
              aria-label={soc.label}
              className="w-9 h-9 flex items-center justify-center rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-colors border border-transparent hover:border-zinc-700/60"
            >
              {soc.icon}
            </Link>
          ) : (
            <a
              key={soc.label}
              href={soc.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={soc.label}
              className="w-9 h-9 flex items-center justify-center rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-colors border border-transparent hover:border-zinc-700/60"
            >
              {soc.icon}
            </a>
          )
        )}

        <button
          onClick={toggle}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          className="w-9 h-9 flex items-center justify-center rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-colors border border-transparent hover:border-zinc-700/60 ml-auto"
        >
          {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-sky-400" />}
        </button>
      </div>
    </div>
  );
};

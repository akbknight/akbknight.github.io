"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, BookOpen, Sun, Moon, FileText } from "lucide-react";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { useTheme } from "@/components/ThemeProvider";

const NAV_SECTIONS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "writing", label: "Writing" },
  { id: "contact", label: "Contact" },
  { id: "photography", label: "Photography" },
];

const SOCIALS = [
  {
    href: "https://github.com/akbknight",
    label: "GitHub",
    icon: <Github className="w-[18px] h-[18px]" />,
  },
  {
    href: "https://www.linkedin.com/in/akshaykumardl/",
    label: "LinkedIn",
    icon: <Linkedin className="w-[18px] h-[18px]" />,
  },
  {
    href: "mailto:ak8335a@american.edu",
    label: "Email",
    icon: <Mail className="w-[18px] h-[18px]" />,
  },
  {
    href: "/life",
    label: "Writing & Photography",
    icon: <BookOpen className="w-[18px] h-[18px]" />,
    internal: true,
  },
  {
    href: "https://www.linkedin.com/in/akshaykumardl/",
    label: "View résumé on LinkedIn",
    icon: <FileText className="w-[18px] h-[18px]" />,
  },
];

const ROTATING_WORDS = [
  "data pipelines",
  "AI tools",
  "analytics dashboards",
  "web applications",
];

export const LeftPanel = () => {
  const activeId = useScrollSpy(NAV_SECTIONS.map((s) => s.id));
  const { theme, toggle } = useTheme();
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setWordIndex((i) => (i + 1) % ROTATING_WORDS.length);
    }, 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex flex-col justify-between h-full">
      {/* Hero block */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Name */}
          <h1
            className="font-bold tracking-tight"
            style={{
              fontSize: "clamp(1.9rem, 4.5vw, 2.75rem)",
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              color: "var(--text)",
            }}
          >
            Akshay Kumar
          </h1>

          <h2
            className="text-base font-medium mt-2 mb-5"
            style={{ color: "var(--text-2)", letterSpacing: "-0.01em" }}
          >
            Software Engineer &amp; MBA Candidate
          </h2>

          {/* Animated rotating words — two lines, no layout shift */}
          <div className="text-sm mb-5 leading-relaxed" style={{ color: "var(--text-muted)" }}>
            <div className="flex items-center gap-1.5">
              <span>I build</span>
              <span
                style={{
                  position: "relative",
                  display: "inline-block",
                  width: "160px",
                  height: "1.3em",
                  overflow: "hidden",
                  verticalAlign: "bottom",
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={wordIndex}
                    initial={{ opacity: 0, y: "100%" }}
                    animate={{ opacity: 1, y: "0%" }}
                    exit={{ opacity: 0, y: "-100%" }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    style={{
                      position: "absolute",
                      left: 0,
                      bottom: 0,
                      fontWeight: 500,
                      whiteSpace: "nowrap",
                      color: "var(--accent)",
                    }}
                  >
                    {ROTATING_WORDS[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </div>
            <div>— and write about what I find.</div>
          </div>

          {/* Credentials strip */}
          <div className="flex flex-wrap gap-1.5">
            {["U.S. State Dept", "Kogod MBA", "AU Researcher"].map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono tracking-widest uppercase px-2 py-1 rounded-sm"
                style={{
                  color: "var(--text-muted)",
                  border: "1px solid var(--border)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Scrollspy nav — desktop only */}
        <nav className="mt-12 hidden lg:block" aria-label="Page sections">
          <ul className="space-y-0.5">
            {NAV_SECTIONS.map((section, i) => {
              const isActive = activeId === section.id;
              return (
                <motion.li
                  key={section.id}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.4 }}
                >
                  <a
                    href={`#${section.id}`}
                    className="group flex items-center gap-4 py-2 transition-all duration-250"
                  >
                    <span
                      style={{
                        display: "block",
                        height: "1px",
                        width: isActive ? "3rem" : "1.5rem",
                        background: isActive ? "var(--text)" : "var(--text-muted)",
                        transition: "all 0.3s ease",
                      }}
                    />
                    <span
                      className="text-[11px] font-mono uppercase tracking-[0.14em]"
                      style={{
                        color: isActive ? "var(--text)" : "var(--text-muted)",
                        transition: "color 0.3s ease",
                      }}
                    >
                      {section.label}
                    </span>
                  </a>
                </motion.li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Social links + theme toggle */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55, duration: 0.5 }}
        className="flex items-center flex-wrap gap-0.5 mt-10 lg:mt-0"
      >
        {SOCIALS.map(({ href, label, icon, internal }) => {
          const cls =
            "min-w-[44px] min-h-[44px] flex items-center justify-center rounded-md transition-all duration-200 hover:bg-white/[0.05]";
          const style = { color: "var(--text-muted)" };
          return internal ? (
            <Link
              key={label}
              href={href}
              aria-label={label}
              className={cls}
              style={style}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}
            >
              {icon}
            </Link>
          ) : (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className={cls}
              style={style}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}
            >
              {icon}
            </a>
          );
        })}

        {/* Theme toggle */}
        <button
          onClick={toggle}
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-md transition-all duration-200 hover:bg-white/[0.05]"
          style={{ color: "var(--text-muted)" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}
        >
          {theme === "dark" ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
        </button>
      </motion.div>
    </div>
  );
};

"use client";

import { motion } from "framer-motion";
import { FileText, Linkedin, Github, Mail, ArrowDown } from "lucide-react";

interface HeroSectionProps {
  onOpenResume: () => void;
}

const EVIDENCE = [
  {
    metric: "+30%",
    label: "Daily Visa Throughput",
    org: "U.S. Department of State",
    badge: "Ambassador Commendation",
    detail:
      "Built seasonal demand forecasting dashboard that guided consular staffing decisions across diplomatic posts in India, supporting a 30% increase in daily visa processing.",
  },
  {
    metric: "12M Records",
    label: "Court & Bankruptcy Data",
    org: "Capital One (AIS Info)",
    badge: "99.6% Accuracy",
    detail:
      "Engineered automated Java pipelines processing public court records across 94 federal districts with sub-second retrieval for commercial loan screening.",
  },
  {
    metric: "99.7%",
    label: "Infrastructure Compatibility",
    org: "MS Star Computers",
    badge: "350+ Workstations",
    detail:
      "Administered regional IT infrastructure across 8 regional centers with a 99.7% first-time compatibility rate, saving 15+ weekly reporting hours via Python automation.",
  },
];

export const HeroSection = ({ onOpenResume }: HeroSectionProps) => {
  return (
    <section id="overview" className="pt-8 pb-16 sm:pb-24 border-b border-zinc-200/80 dark:border-white/[0.08]">
      {/* Target Role & Availability Badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-sky-500/25 bg-sky-500/10 text-sky-800 dark:text-sky-300 text-xs font-mono-code font-medium mb-6"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
        <span>Targeting BI, Data Analytics &amp; Operations Roles · Available June 1, 2027</span>
      </motion.div>

      {/* Main Headline */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.05 }}
        className="space-y-4 max-w-3xl"
      >
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white leading-[1.15] text-balance">
          Building reliable data pipelines and predictive models for high-stakes operations.
        </h1>

        <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal pt-1 text-pretty">
          Analytics engineer and Kogod STEM MBA candidate with 7+ years of software engineering background. Formerly built decision dashboards at the U.S. Department of State (Ambassador Commended) and high-throughput court-record pipelines for Capital One.
        </p>
      </motion.div>

      {/* Action CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, delay: 0.12 }}
        className="flex flex-wrap items-center gap-3 pt-6 pb-12"
      >
        <a
          href="#work"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-medium text-sm transition-all shadow-sm active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
        >
          <span>Explore selected work</span>
          <ArrowDown className="w-3.5 h-3.5" />
        </a>

        <button
          type="button"
          onClick={onOpenResume}
          aria-label="View résumé"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-sm font-medium transition-all active:scale-[0.98] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
        >
          <FileText className="w-4 h-4 text-sky-600 dark:text-sky-400" />
          <span>View résumé</span>
        </button>

        <div className="flex items-center gap-1 sm:ml-2">
          <a
            href="https://www.linkedin.com/in/akshaykumardl/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="p-2.5 rounded-lg text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/[0.06] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
          >
            <Linkedin className="w-4 h-4 text-sky-600 dark:text-sky-400" />
          </a>
          <a
            href="https://github.com/akbknight"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="p-2.5 rounded-lg text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/[0.06] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="mailto:ak8335a@american.edu"
            aria-label="Email Akshay Kumar"
            className="p-2.5 rounded-lg text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/[0.06] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
          >
            <Mail className="w-4 h-4 text-sky-600 dark:text-sky-400" />
          </a>
        </div>
      </motion.div>

      {/* 3 Concrete Evidence Proof Points */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.18 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {EVIDENCE.map((item, idx) => (
          <div
            key={idx}
            className="apple-glass-card p-5 sm:p-6 rounded-2xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-mono-code font-semibold px-2 py-0.5 rounded-md bg-sky-500/10 text-sky-700 dark:text-sky-400 border border-sky-500/20">
                  {item.badge}
                </span>
                <span className="text-[11px] font-mono-code text-zinc-600 dark:text-zinc-300">
                  {item.org}
                </span>
              </div>
              <div className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white mb-2">
                {item.metric}
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
                {item.detail}
              </p>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

"use client";

import { motion } from "framer-motion";
import { FileText, Linkedin } from "lucide-react";

interface HeroSectionProps {
  onOpenResume: () => void;
}

const EVIDENCE = [
  {
    metric: "+30%",
    label: "Daily Visa Throughput",
    org: "U.S. Department of State",
    badge: "Ambassador Commendation",
    detail: "Built seasonal demand forecasting dashboard that guided consular staffing decisions and supported a 30% increase in daily visa processing.",
  },
  {
    metric: "12M Records",
    label: "Court & Bankruptcy Data",
    org: "Capital One (AIS Info)",
    badge: "99.6% Accuracy",
    detail: "Built automated Java pipelines classifying public court records across 94 federal districts with sub-second retrieval for commercial loan screening.",
  },
  {
    metric: "$550B+ Mapped",
    label: "IRS Form 990 Grants",
    org: "Public Data Pipeline",
    badge: "9.7M+ Filings",
    detail: "Engineered streaming SAX parser ingesting 9.7M+ IRS XML records into a DuckDB columnar relational warehouse with sub-second analytical queries.",
  },
];

export const HeroSection = ({ onOpenResume }: HeroSectionProps) => {
  return (
    <section id="hero" className="relative pt-2 pb-4">
      {/* Target Role & Status Badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/20 bg-sky-500/10 text-sky-800 dark:text-sky-300 text-xs font-mono-code font-medium mb-4"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
        <span>Targeting BI, Data Analytics &amp; Operations Roles · Available June 1, 2027</span>
      </motion.div>

      {/* Hero Headline & Direct Value Proposition */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-3"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-bold tracking-tight text-zinc-900 dark:text-white leading-[1.15] text-balance">
          Building reliable data pipelines and predictive models for high-stakes operations.
        </h2>

        <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed max-w-2xl pt-1 font-normal">
          7+ years of software and analytics experience connecting high-volume government, banking, and public data to executive decisions. Former U.S. Department of State business analyst (Ambassador Commended) and Kogod STEM MBA candidate at American University graduating May 2027.
        </p>
      </motion.div>

      {/* Action CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-wrap items-center gap-3 pt-5 pb-7"
      >
        <a
          href="#projects"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-medium text-xs sm:text-sm transition-colors shadow-sm"
        >
          <span>Explore Featured Projects</span>
          <span className="text-xs">↓</span>
        </a>

        <button
          onClick={onOpenResume}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs sm:text-sm font-medium transition-colors cursor-pointer"
        >
          <FileText className="w-4 h-4 text-sky-600 dark:text-sky-400" />
          <span>View Interactive Résumé</span>
        </button>

        <a
          href="https://www.linkedin.com/in/akshaykumardl/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-2.5 text-xs text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
        >
          <Linkedin className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
          <span>LinkedIn ↗</span>
        </a>
      </motion.div>

      {/* 3 Concrete Evidence Proof Points */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
        className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1"
      >
        {EVIDENCE.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl border border-zinc-200/90 dark:border-white/[0.08] bg-zinc-50/60 dark:bg-[#0D0D13] shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-1 mb-2">
                <span className="text-[10px] font-mono-code font-semibold px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-700 dark:text-sky-400 border border-sky-500/20">
                  {item.badge}
                </span>
                <span className="text-[10px] font-mono-code text-zinc-500 dark:text-zinc-400">
                  {item.org}
                </span>
              </div>
              <div className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white mb-1">
                {item.metric}
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                {item.detail}
              </p>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

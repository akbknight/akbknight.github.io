"use client";

import { motion } from "framer-motion";
import {
  FileText,
  Linkedin,
  Download,
  ArrowUpRight,
  ShieldCheck,
  Building2,
  Landmark,
  TrendingUp,
} from "lucide-react";
import { SpotlightCard } from "@/components/SpotlightCard";
import { MagneticWrapper } from "@/components/MagneticWrapper";

interface HeroSectionProps {
  onOpenResume: () => void;
}

const METRICS = [
  {
    value: "$550B+",
    label: "Capital Mapped",
    detail: "9.7M+ IRS 990 XML records analyzed with zero API dependencies",
    icon: <TrendingUp className="w-4 h-4 text-sky-600 dark:text-sky-400" />,
  },
  {
    value: "10+",
    label: "U.S. Embassies",
    detail: "Diplomatic vetting platform deployed across South Asia, Europe & Africa",
    icon: <Landmark className="w-4 h-4 text-sky-600 dark:text-sky-400" />,
  },
  {
    value: "4 Major",
    label: "Banks Licensed",
    detail: "Platform adopted by Wells Fargo, JP Morgan, Chase & Capital One",
    icon: <Building2 className="w-4 h-4 text-sky-600 dark:text-sky-400" />,
  },
  {
    value: "4,426",
    label: "Tests Audited",
    detail: "Forensic code reconstruction across 62 archives with CI/CD DataOps",
    icon: <ShieldCheck className="w-4 h-4 text-sky-600 dark:text-sky-400" />,
  },
];

export const HeroSection = ({ onOpenResume }: HeroSectionProps) => {
  return (
    <section id="hero" className="relative pt-2 pb-6">
      {/* Ambient background glow */}
      <div
        className="absolute -top-12 -left-8 w-72 h-72 bg-sky-500/10 dark:bg-sky-500/10 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute top-20 right-0 w-80 h-80 bg-indigo-500/5 dark:bg-indigo-500/5 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Live Telemetry Status Pill */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-600/20 dark:border-sky-500/25 bg-sky-500/10 dark:bg-sky-950/20 backdrop-blur-sm mb-6"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-500 dark:bg-sky-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-600 dark:bg-sky-400" />
        </span>
        <span className="text-[11px] font-mono-code font-medium text-sky-700 dark:text-sky-300 uppercase tracking-wider">
          Available for Strategic Roles · Washington, D.C. · Kogod MBA &apos;27
        </span>
      </motion.div>

      {/* Hero Headline & Positioning */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-3"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white leading-[1.1]">
          Analytics Engineering,{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-sky-500 to-indigo-600 dark:from-sky-400 dark:via-sky-300 dark:to-indigo-300">
            Forensic Audits
          </span>{" "}
          &amp; Strategic DataOps.
        </h1>

        <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed max-w-2xl pt-1">
          7+ years turning mission-critical government, financial-services, and enterprise data into high-stakes leadership decisions. Former <span className="text-zinc-900 dark:text-white font-medium">U.S. Department of State</span> programmer and current <span className="text-zinc-900 dark:text-white font-medium">American University Kogod MBA candidate</span> (STEM, Business Analytics &amp; AI).
        </p>
      </motion.div>

      {/* Frictionless Dual Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-wrap items-center gap-3 pt-6 pb-8"
      >
        {/* Primary CTA: Open Interactive Resume Modal */}
        <MagneticWrapper strength={0.25}>
          <button
            onClick={onOpenResume}
            className="group relative inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white dark:bg-sky-400 dark:hover:bg-sky-300 dark:text-[#050507] text-xs sm:text-sm font-semibold tracking-tight transition-all duration-150 shadow-[0_2px_12px_rgba(2,132,199,0.3)] dark:shadow-[0_0_24px_rgba(56,189,248,0.35)] cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            <span>View Interactive Résumé</span>
            <span className="text-[10px] font-mono-code font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-black/15 dark:bg-black/20 ml-0.5">
              Modal + PDF
            </span>
          </button>
        </MagneticWrapper>

        {/* Secondary CTA: Direct LinkedIn Connection */}
        <MagneticWrapper strength={0.25}>
          <a
            href="https://www.linkedin.com/in/akshaykumardl/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-zinc-50 text-zinc-900 border border-zinc-300 shadow-sm dark:bg-zinc-900/90 dark:hover:bg-zinc-800 dark:text-zinc-100 dark:border-white/[0.14] text-xs sm:text-sm font-medium transition-all duration-150 group"
          >
            <Linkedin className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            <span>Connect on LinkedIn</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-sky-600 dark:group-hover:text-sky-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </MagneticWrapper>

        {/* Fast PDF direct download */}
        <a
          href="/assets/Akshay_Resume.pdf"
          download="Akshay_Kumar_Resume.pdf"
          className="inline-flex items-center gap-1.5 px-3.5 py-3 rounded-xl text-xs text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
          title="Direct PDF download"
        >
          <Download className="w-3.5 h-3.5" />
          <span className="hidden sm:inline font-mono-code text-[11px]">Download PDF (369 KB)</span>
        </a>
      </motion.div>

      {/* Executive Metrics Bento Matrix */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-2"
      >
        {METRICS.map((m, idx) => (
          <SpotlightCard
            key={idx}
            className="p-3.5 rounded-xl border border-zinc-200/80 dark:border-white/[0.08] bg-white dark:bg-[#0E0E14] shadow-sm dark:shadow-none hover:border-sky-500/40 dark:hover:border-sky-500/30 transition-all duration-150"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-mono-code text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                {m.label}
              </span>
              {m.icon}
            </div>
            <div className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-white mb-1">
              {m.value}
            </div>
            <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-tight">
              {m.detail}
            </p>
          </SpotlightCard>
        ))}
      </motion.div>
    </section>
  );
};

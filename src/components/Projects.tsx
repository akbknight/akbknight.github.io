"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, ShieldAlert, Cpu, BarChart2, TrendingUp, Sparkles, Database, Layers } from "lucide-react";
import { SpotlightCard } from "@/components/SpotlightCard";
import { MagneticWrapper } from "@/components/MagneticWrapper";

interface Project {
  title: string;
  badge?: string;
  category: "Forensics & Security" | "Data Pipelines & AI" | "Macroeconomics" | "Enterprise Systems";
  description: string;
  tech: string[];
  metrics: string[];
  github: string | null;
  live: string | null;
  featured?: boolean;
}

const PROJECTS: Project[] = [
  {
    title: "IRS 990 Philanthropic Grant Miner & 3D Spatial Engine",
    badge: "$550B+ Capital Mapped",
    category: "Data Pipelines & AI",
    description:
      "Enterprise data engineering and visual intelligence system mapping $550.2B across 9.7M+ IRS Form 990 records. Features hardware-accelerated 3D WebGL global capital flow arcs (Globe.gl/Three.js), econometric log-log outlier detection matrices (Plotly.js), and D3 TopoJSON national choropleths with zero-API latency.",
    tech: ["Python", "Globe.gl (Three.js)", "Plotly.js", "D3 TopoJSON", "DuckDB"],
    metrics: ["9.7M+ XML Records", "$550B+ Capital Mapped", "3D WebGL Capital Arcs", "Log-Log Outlier Matrix"],
    github: "https://github.com/akbknight/irs990-grant-dashboard",
    live: "https://akbknight.github.io/irs990-grant-dashboard/",
    featured: true,
  },
  {
    title: "AI Strategic Briefing Generator",
    badge: "Autonomous Intelligence",
    category: "Data Pipelines & AI",
    description:
      "Autonomous 6-stage analytics pipeline with Three.js particle wave canvas: Raw CSV ingestion → schema inference → statistical profiling → anomaly detection (Z-score & CUSUM) → Holt-Winters forecasting → Claude AI narrative synthesis into executive-ready briefs.",
    tech: ["Three.js", "Python", "Claude API", "statsmodels", "Chart.js"],
    metrics: ["6-Stage Pipeline", "Zero Configuration", "Interactive Z-Score Slider", "Three.js 3D Canvas"],
    github: "https://github.com/akbknight/ai-strategic-briefing",
    live: "https://akbknight.github.io/ai-strategic-briefing/",
    featured: true,
  },
  {
    title: "US Retail Demand Forecast Engine",
    badge: "Econometric Modeling",
    category: "Macroeconomics",
    description:
      "18-month forward predictive demand model for U.S. Retail & Food Services Sales using Holt-Winters triple exponential smoothing on Federal Reserve (FRED) time-series data. Features Three.js constellation canvas, 80% & 95% predictive confidence intervals, and Real-Time Econometric Tuning Studio.",
    tech: ["Three.js", "Python", "statsmodels", "Pandas", "FRED API", "Chart.js"],
    metrics: ["135 Months FRED Data", "18-Month Horizon", "Interactive Hyperparameters", "Three.js Canvas"],
    github: "https://github.com/akbknight/us-retail-sales-forecast",
    live: "https://akbknight.github.io/us-retail-sales-forecast/",
    featured: true,
  },
  {
    title: "Diplomatic Resource & Scheduling Optimizer",
    badge: "Diplomatic Systems",
    category: "Enterprise Systems",
    description:
      "Greedy constraint-satisfaction scheduling engine built to resolve complex multi-departmental constraints: 180 high-priority meeting requests across 20 secure rooms and 150 cleared personnel. Features Three.js 3D kinetic lattice and interactive stress test simulation.",
    tech: ["Three.js", "JavaScript", "Greedy Algorithm", "Chart.js"],
    metrics: ["180 Meeting Matrix", "150 Personnel Cleared", "Three.js 3D Lattice", "Stress Test Simulation"],
    github: "https://github.com/akbknight/scheduling-optimizer",
    live: "https://akbknight.github.io/scheduling-optimizer/",
    featured: true,
  },
  {
    title: "Economic Anomaly Detection Monitor",
    category: "Macroeconomics",
    description:
      "Three-algorithm statistical anomaly monitoring system (Z-Score, IQR, CUSUM) applied across 26 years of Federal Reserve macroeconomic indicators. Pinpoints shock regimes including the 2008 GFC, 2020 COVID deflation, and 2021–22 inflation spikes.",
    tech: ["Python", "scipy", "Pandas", "Chart.js"],
    metrics: ["26 Years FRED Data", "3 Detection Algorithms"],
    github: "https://github.com/akbknight/anomaly-detection-monitor",
    live: "https://akbknight.github.io/anomaly-detection-monitor/",
  },
  {
    title: "Data Pipeline Validation Framework",
    category: "Enterprise Systems",
    description:
      "Automated integrity verification framework executing 7 discrete check categories (completeness, referential integrity, schema drift, distribution boundaries) across 15 enterprise sources and 12,000+ financial records.",
    tech: ["Python", "Pandas", "HTML", "Chart.js"],
    metrics: ["7 Check Categories", "12K+ Records Validated", "Automated Health Scoring"],
    github: "https://github.com/akbknight/data-pipeline-validator",
    live: "https://akbknight.github.io/data-pipeline-validator/",
  },
  {
    title: "Crisis to Care Triage Platform",
    category: "Data Pipelines & AI",
    description:
      "Digital intervention platform connecting first-generation university students in acute distress with campus resources. Uses Gemini AI for multi-dimensional triage across mental health, emergency housing, and food insecurity.",
    tech: ["React", "TypeScript", "Vite", "Gemini API"],
    metrics: ["Automated Triage", "Campus Resource Routing"],
    github: "https://github.com/akbknight/crisis-to-care",
    live: "https://akbknight.github.io/crisis-to-care/",
  },
  {
    title: "SaltPepper for Windows: AI Cost Optimizer",
    category: "Data Pipelines & AI",
    description:
      "Local intelligence router: leverages local Gemma2 / Ollama models for routine tasks and conditionally routes high-complexity operations to Claude Code API. Delivers 40–70% token cost reduction.",
    tech: ["Python", "Ollama", "Claude API", "CLI"],
    metrics: ["40–70% Cost Reduction", "Local LLM Fallback"],
    github: "https://github.com/akbknight/saltpepper-win",
    live: "https://akbknight.github.io/saltpepper-win/",
  },
  {
    title: "Kogod MBA Admissions Funnel Analytics",
    category: "Enterprise Systems",
    description:
      "Interactive admissions analytics portal for Kogod MBA leadership: YoY conversion funnel tracking across domestic and international applicant pools. Powered by DuckDB and Plotly.",
    tech: ["Python", "Streamlit", "DuckDB", "Plotly"],
    metrics: ["YoY Funnel Analysis", "Deposit Pacing Telemetry"],
    github: "https://github.com/akbknight/admissions_funnel_dashboard",
    live: "https://admissionsfunneldashboard-8pbzttpynneixaywcls7rx.streamlit.app/",
  },
  {
    title: "Signals>Noise: AT&T Enterprise AI Strategy",
    category: "Enterprise Systems",
    description:
      "MBA team capstone project proposing 'Shape Your Solution' — an AI diagnostic pre-RFP tool for AT&T's $18.8B B2B segment. Covers financial modeling, architectural integration, and change management.",
    tech: ["JavaScript", "Chart.js", "Lucide", "Vite"],
    metrics: ["$18.8B Segment Analysis", "Pre-RFP Architecture"],
    github: "https://github.com/akbknight/Team--Signals-Noise-Project-",
    live: "https://akbknight.github.io/Team--Signals-Noise-Project-/",
  },
  {
    title: "Macroeconomic Scenario Simulator",
    category: "Macroeconomics",
    description:
      "Interactive 'what-if' econometric simulation: manipulate Federal Reserve discount rates, CPI inflation, and unemployment metrics to model GDP growth and recession probabilities using embedded FRED data.",
    tech: ["JavaScript", "Chart.js", "HTML5"],
    metrics: ["3 Preset Scenarios", "Real-Time Probability Estimation"],
    github: "https://github.com/akbknight/economic-scenario-analysis",
    live: "https://akbknight.github.io/economic-scenario-analysis/",
  },
];

export const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Forensics & Security", "Data Pipelines & AI", "Macroeconomics", "Enterprise Systems"];
  const featured = PROJECTS.filter((p) => p.featured);
  const secondary = PROJECTS.filter((p) => !p.featured && (selectedCategory === "All" || p.category === selectedCategory));

  return (
    <section id="projects" className="pt-2">
      <div className="mb-6">
        <span className="section-label">04 · Flagship Live Applications</span>
        <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white mt-1">
          Interactive Data Systems &amp; Visual Engines
        </h3>
        <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
          Click any card to launch the live deployed application in a new tab. Equipped with Three.js 3D WebGL, interactive econometric simulators, and real-time telemetry.
        </p>
      </div>

      {/* Flagship Bento Grid (Top 4 Visual Applications) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {featured.map((p) => (
          <SpotlightCard
            key={p.title}
            onClick={() => {
              if (p.live) window.open(p.live, "_blank", "noopener,noreferrer");
            }}
            className="p-5 flex flex-col justify-between group relative border border-zinc-200/80 dark:border-white/[0.08] bg-white dark:bg-[#0E0E14] shadow-sm dark:shadow-none hover:border-sky-500/50 dark:hover:border-sky-500/40 cursor-pointer transition-all duration-300 hover:scale-[1.012] hover:shadow-xl hover:shadow-sky-500/10"
          >
            <div>
              {/* Badge & Category Header */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-mono-code font-semibold px-2 py-0.5 rounded bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                  {p.badge}
                </span>
                <span className="text-[10px] font-mono-code text-zinc-500 dark:text-zinc-400">
                  {p.category}
                </span>
              </div>

              {/* Title with hover color */}
              <h4 className="text-base font-bold text-zinc-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors flex items-center justify-between gap-2">
                <span>{p.title}</span>
                <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-sky-600 dark:text-sky-400 shrink-0" />
              </h4>

              {/* Description */}
              <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-2.5 leading-relaxed">
                {p.description}
              </p>

              {/* Impact Metrics Grid */}
              <div className="grid grid-cols-2 gap-1.5 mt-4 pt-3 border-t border-zinc-100 dark:border-white/[0.06]">
                {p.metrics.map((m) => (
                  <div key={m} className="text-[10px] font-mono-code text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-sky-500 dark:bg-sky-400" />
                    <span>{m}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Tech Stack & Action Links */}
            <div className="mt-5 pt-3 border-t border-zinc-100 dark:border-white/[0.06] flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {p.tech.slice(0, 3).map((t) => (
                  <span key={t} className="tech-pill">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2">
                {p.github && (
                  <MagneticWrapper strength={0.25}>
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`View ${p.title} source code on GitHub`}
                      className="p-1.5 rounded text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800 transition-colors inline-flex"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  </MagneticWrapper>
                )}
                {p.live && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono-code font-semibold uppercase tracking-wider text-sky-700 dark:text-sky-300 bg-sky-500/10 border border-sky-500/20 px-2 py-0.5 rounded-full group-hover:bg-sky-600 group-hover:text-white dark:group-hover:bg-sky-400 dark:group-hover:text-zinc-950 transition-colors">
                    Live Demo ↗
                  </span>
                )}
              </div>
            </div>
          </SpotlightCard>
        ))}
      </div>

      {/* DEDICATED SECTION: FORENSIC AUDITS & COMMAND-LINE SYSTEMS (DEMOTED DEBORAH) */}
      <div className="mb-10 p-5 rounded-xl border border-zinc-200/80 dark:border-white/[0.08] bg-zinc-50/70 dark:bg-[#0A0A10]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <h4 className="text-xs font-mono-code font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
              Forensic &amp; Cryptographic Systems Audits · Command-Line Tool
            </h4>
          </div>
          <a
            href="https://github.com/akbknight/deborah-research-assistant-audit"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono-code text-sky-600 dark:text-sky-400 hover:underline font-medium"
          >
            <span>GitHub Repository</span>
            <Github className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="space-y-2">
          <h5 className="text-sm font-bold text-zinc-900 dark:text-white">
            Deborah Research Assistant: Complete Forensic Audit &amp; Reconstruction
          </h5>
          <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
            Cryptographic post-mortem and forensic reconstruction across 62 legacy archives (43 unique SHA-256 digests) and 4,426 test cases. Uncovered critical time-of-check to time-of-use DNS-rebinding SSRF vulnerabilities, cross-platform NTFS file-lock collisions, and upstream Cloudflare 403 blocks. Built automated Continuous DataOps via GitHub Actions.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-zinc-200/70 dark:bg-white/[0.05] text-zinc-800 dark:text-zinc-300 border border-zinc-300 dark:border-white/10">
              62 Archives Audited
            </span>
            <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-zinc-200/70 dark:bg-white/[0.05] text-zinc-800 dark:text-zinc-300 border border-zinc-300 dark:border-white/10">
              4,426 Tests Verified
            </span>
            <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-zinc-200/70 dark:bg-white/[0.05] text-zinc-800 dark:text-zinc-300 border border-zinc-300 dark:border-white/10">
              SHA-256 Digest Verification
            </span>
            <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-zinc-200/70 dark:bg-white/[0.05] text-zinc-800 dark:text-zinc-300 border border-zinc-300 dark:border-white/10">
              Automated CI/CD Workflows
            </span>
          </div>
        </div>
      </div>

      {/* Secondary Project Directory Header & Filter */}
      <div className="pt-4 border-t border-zinc-200 dark:border-white/[0.08]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <h4 className="text-sm font-bold text-zinc-800 dark:text-zinc-200 uppercase font-mono-code tracking-wider">
            Engineering Archive &amp; Tooling
          </h4>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-[10px] font-mono-code px-2 py-1 rounded transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-sky-50 text-sky-700 border border-sky-300 dark:bg-sky-500/20 dark:text-sky-400 dark:border-sky-500/30"
                    : "bg-zinc-100 dark:bg-zinc-900/60 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 border border-zinc-200 dark:border-zinc-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dense Archive List */}
        <div className="space-y-3">
          {secondary.map((p) => (
            <SpotlightCard
              key={p.title}
              className="p-3.5 rounded-lg border border-zinc-200/80 dark:border-white/[0.06] bg-white dark:bg-[#0E0E14] shadow-xs dark:shadow-none flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono-code text-zinc-500 dark:text-zinc-400">{p.category}</span>
                  <span className="text-zinc-400 dark:text-zinc-600">·</span>
                  <h5 className="text-xs font-semibold text-zinc-900 dark:text-white hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                    {p.title}
                  </h5>
                </div>
                <p className="text-[11px] text-zinc-600 dark:text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                  {p.description}
                </p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {p.tech.map((t) => (
                    <span key={t} className="text-[9px] font-mono-code text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-800">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                {p.github && (
                  <MagneticWrapper strength={0.25}>
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`GitHub repo for ${p.title}`}
                      className="p-1.5 rounded text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800 transition-colors inline-flex"
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  </MagneticWrapper>
                )}
                {p.live && (
                  <MagneticWrapper strength={0.25}>
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Live site for ${p.title}`}
                      className="p-1.5 rounded text-zinc-500 hover:text-sky-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-sky-400 dark:hover:bg-zinc-800 transition-colors inline-flex"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </MagneticWrapper>
                )}
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
};

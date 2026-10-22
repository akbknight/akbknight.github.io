"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Database,
  ShieldCheck,
  Cpu,
  BarChart3,
  CheckCircle2,
  Lock,
  GitBranch,
  Layers,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface PipelineStage {
  id: string;
  step: string;
  title: string;
  shortDesc: string;
  icon: typeof Database;
  colorLight: string;
  colorDark: string;
  borderLight: string;
  borderDark: string;
  inputs: string[];
  invariants: string[];
  outputs: string[];
  techStack: string[];
}

const STAGES: PipelineStage[] = [
  {
    id: "ingestion",
    step: "Stage 01",
    title: "Multi-Source Ingestion",
    shortDesc: "Streaming ingestion from IRS S3 buckets, St. Louis FRED, and federal court repositories.",
    icon: Database,
    colorLight: "text-sky-600",
    colorDark: "dark:text-sky-400",
    borderLight: "border-sky-500/20",
    borderDark: "dark:border-sky-500/30",
    inputs: [
      "IRS Form 990 XML Filings (9.7M+ records)",
      "FRED Macroeconomic Time Series (RSXFS, 320 mos)",
      "Federal Court PACER Filings (94 districts)",
      "Consular Operations & Asset Telemetry",
    ],
    invariants: [
      "Streaming iterparse memory bounds (< 256MB RSS)",
      "Non-destructive raw payload caching",
      "Zero-API-key fallback paths",
    ],
    outputs: ["Standardized JSON-L streams", "Partitioned DuckDB tables", "FRED raw observations"],
    techStack: ["Python 3.12", "iterparse", "FRED API", "AWS S3 / HTTP"],
  },
  {
    id: "validation",
    step: "Stage 02",
    title: "Entity Resolution & Audit",
    shortDesc: "Cryptographic SHA-256 fingerprinting, deterministic EIN matching, and 7-point quality gates.",
    icon: ShieldCheck,
    colorLight: "text-indigo-600",
    colorDark: "dark:text-indigo-400",
    borderLight: "border-indigo-500/20",
    borderDark: "dark:border-indigo-500/30",
    inputs: [
      "Raw schema trees & XML attributes",
      "IRS Master Business File (BMF)",
      "94 Federal District Court Registries",
    ],
    invariants: [
      "100% Deterministic EIN resolution",
      "Schedule A/B/I accounting balance checks",
      "SHA-256 tamper-evident cryptographic hash",
    ],
    outputs: ["Verified relational entities", "Audit exception matrices", "Sanitized transaction logs"],
    techStack: ["SHA-256", "7 Invariant Gates", "DuckDB", "Regex Tokenizers"],
  },
  {
    id: "engine",
    step: "Stage 03",
    title: "Statistical & OLAP Engine",
    shortDesc: "In-memory DuckDB queries, Holt-Winters exponential smoothing, and CUSUM regime detection.",
    icon: Cpu,
    colorLight: "text-amber-600",
    colorDark: "dark:text-amber-400",
    borderLight: "border-amber-500/20",
    borderDark: "dark:border-amber-500/30",
    inputs: [
      "Cleaned monthly sales time-series (FRED)",
      "Normalized $550B+ grant disbursement tables",
      "Meeting & resource capacity matrices",
    ],
    invariants: [
      "Walk-forward holdout validation (~2.0% MAPE)",
      "80% & 95% predictive confidence intervals",
      "CUSUM drift & 3-sigma Z-Score boundaries",
    ],
    outputs: ["18-month forward point forecasts", "Regime-shift event logs", "Optimized room schedules"],
    techStack: ["statsmodels", "DuckDB In-Memory", "CUSUM / IQR", "Greedy CSP"],
  },
  {
    id: "delivery",
    step: "Stage 04",
    title: "Multi-Format Delivery",
    shortDesc: "Hardware-accelerated 3D WebGL spatial visualizers, executive PDF dossiers, and CI/CD reports.",
    icon: BarChart3,
    colorLight: "text-emerald-600",
    colorDark: "dark:text-emerald-400",
    borderLight: "border-emerald-500/20",
    borderDark: "dark:border-emerald-500/30",
    inputs: [
      "Forecast series & confidence bounds",
      "Geocoded capital allocation coordinates",
      "Forensic audit verification logs",
    ],
    invariants: [
      "Sub-second browser rendering & touch response",
      "Zero client-side API secret leakage",
      "Deterministic PDF/Excel byte generation",
    ],
    outputs: [
      "Interactive 3D WebGL Spatial Arcs (Three.js)",
      "Executive PDF Dossiers (ReportLab)",
      "Interactive Client Portals (GitHub Pages)",
    ],
    techStack: ["Three.js / Globe.gl", "ReportLab", "openpyxl", "Next.js / Tailwind"],
  },
];

export const ArchitectureDiagram = () => {
  const [activeStageId, setActiveStageId] = useState<string>("ingestion");
  const activeStage = STAGES.find((s) => s.id === activeStageId) || STAGES[0];

  return (
    <section id="architecture" className="pt-2">
      <div className="mb-6">
        <span className="section-label">03 · Systems Architecture</span>
        <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white mt-1">
          Forensic DataOps &amp; Pipeline Architecture
        </h3>
        <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 max-w-2xl leading-relaxed">
          Standardized 4-stage data engineering lifecycle engineered for federal diplomacy, capital market analytics, and forensic codebase audits. Click any stage to inspect its verifiable inputs, architectural invariants, and delivered outputs.
        </p>
      </div>

      <div className="card-surface p-5 sm:p-6 rounded-xl border border-zinc-200/90 dark:border-white/[0.08] bg-white dark:bg-[#0C0C11] shadow-xs">
        {/* Editorial Hairline Vector Pipeline Ribbon (Desktop) */}
        <div className="hidden lg:block mb-6 relative">
          <svg className="w-full h-12 overflow-visible" viewBox="0 0 800 48" fill="none" preserveAspectRatio="none">
            {/* Background connecting track */}
            <path
              d="M 100 24 L 700 24"
              stroke="currentColor"
              strokeWidth="2"
              className="text-zinc-200 dark:text-white/[0.08]"
              strokeDasharray="4 4"
            />
            {/* Active connecting segment */}
            <path
              d="M 100 24 L 700 24"
              stroke="url(#pipelineGradient)"
              strokeWidth="2"
              strokeLinecap="round"
              className="opacity-60"
            />
            <defs>
              <linearGradient id="pipelineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0284c7" />
                <stop offset="33%" stopColor="#6366f1" />
                <stop offset="66%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>

            {/* Stage Milestone Nodes */}
            {[100, 300, 500, 700].map((cx, idx) => {
              const stage = STAGES[idx];
              const isSelected = activeStageId === stage.id;
              return (
                <g
                  key={stage.id}
                  className="cursor-pointer transition-transform duration-150"
                  onClick={() => setActiveStageId(stage.id)}
                >
                  <circle
                    cx={cx}
                    cy={24}
                    r={isSelected ? 16 : 12}
                    className={`transition-all duration-200 ${
                      isSelected
                        ? "fill-white dark:fill-[#0C0C11] stroke-sky-500 dark:stroke-sky-400 stroke-2"
                        : "fill-zinc-100 dark:fill-zinc-900 stroke-zinc-300 dark:stroke-zinc-700 stroke-1"
                    }`}
                  />
                  <text
                    x={cx}
                    y={28}
                    textAnchor="middle"
                    className={`text-[10px] font-mono-code font-bold ${
                      isSelected
                        ? "fill-sky-600 dark:fill-sky-400"
                        : "fill-zinc-600 dark:fill-zinc-400"
                    }`}
                  >
                    0{idx + 1}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Responsive Stage Selection Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 relative">
          {STAGES.map((stage) => {
            const isSelected = activeStageId === stage.id;
            const Icon = stage.icon;

            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => setActiveStageId(stage.id)}
                className={`hairline-frame group text-left flex flex-col justify-between p-4 rounded-xl transition-all duration-150 cursor-pointer border relative overflow-hidden ${
                  isSelected
                    ? "bg-zinc-50 dark:bg-zinc-900/90 border-sky-500/50 dark:border-sky-400/50 shadow-sm"
                    : "bg-zinc-50/50 dark:bg-zinc-900/30 border-zinc-200/80 dark:border-white/[0.06] hover:border-zinc-300 dark:hover:border-white/[0.12] hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
                }`}
                aria-pressed={isSelected}
              >
                <span className="hairline-caliper caliper-tl" aria-hidden="true" />
                <span className="hairline-caliper caliper-tr" aria-hidden="true" />
                <span className="hairline-caliper caliper-bl" aria-hidden="true" />
                <span className="hairline-caliper caliper-br" aria-hidden="true" />
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <div
                      className={`p-2 rounded-lg ${
                        isSelected
                          ? "bg-sky-500/15 text-sky-700 dark:text-sky-300"
                          : "bg-zinc-200/60 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono-code text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-semibold">
                      {stage.step}
                    </span>
                  </div>

                  <h4 className="text-xs font-semibold text-zinc-900 dark:text-white tracking-tight">
                    {stage.title}
                  </h4>
                  <p className="text-[11px] text-zinc-600 dark:text-zinc-400 mt-1.5 leading-relaxed line-clamp-2">
                    {stage.shortDesc}
                  </p>
                </div>

                <div className="mt-3.5 pt-2.5 border-t border-zinc-200/80 dark:border-white/[0.06] flex items-center justify-between text-[10px] font-mono-code">
                  <span className="text-zinc-500 dark:text-zinc-400">
                    {stage.techStack.slice(0, 2).join(" · ")}
                  </span>
                  <span
                    className={`transition-colors font-medium ${
                      isSelected
                        ? "text-sky-600 dark:text-sky-400"
                        : "text-zinc-400 dark:text-zinc-600"
                    }`}
                  >
                    {isSelected ? "Inspecting →" : "Inspect"}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Stage Forensic Detail Box */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStage.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 p-4 sm:p-5 rounded-xl border border-zinc-200 dark:border-white/[0.08] bg-zinc-50/80 dark:bg-zinc-900/60 hairline-frame relative group overflow-hidden"
          >
            <span className="hairline-caliper caliper-tl" aria-hidden="true" />
            <span className="hairline-caliper caliper-tr" aria-hidden="true" />
            <span className="hairline-caliper caliper-bl" aria-hidden="true" />
            <span className="hairline-caliper caliper-br" aria-hidden="true" />
            <span className="hairline-caliper-tag" aria-hidden="true">CONTRACT VERIFIED</span>
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-zinc-200 dark:border-white/[0.06]">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono-code uppercase font-semibold text-sky-600 dark:text-sky-400">
                  {activeStage.step} Architecture Contract
                </span>
                <span className="text-zinc-400 dark:text-zinc-600">/</span>
                <span className="text-xs font-semibold text-zinc-900 dark:text-white">
                  {activeStage.title}
                </span>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                {activeStage.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[9px] font-mono-code px-2 py-0.5 rounded bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              {/* Inputs */}
              <div>
                <span className="text-[10px] font-mono-code uppercase font-medium text-zinc-500 dark:text-zinc-400 block mb-2">
                  Ingress / Data Inputs
                </span>
                <ul className="space-y-1.5 text-zinc-700 dark:text-zinc-300 text-[11px]">
                  {activeStage.inputs.map((inp, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-zinc-400 mt-0.5">›</span>
                      <span>{inp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Invariants & Audit Gates */}
              <div>
                <span className="text-[10px] font-mono-code uppercase font-medium text-emerald-600 dark:text-emerald-400 block mb-2 flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  Verifiable Invariants &amp; Gates
                </span>
                <ul className="space-y-1.5 text-zinc-700 dark:text-zinc-300 text-[11px]">
                  {activeStage.invariants.map((inv, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{inv}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Delivery Artifacts */}
              <div>
                <span className="text-[10px] font-mono-code uppercase font-medium text-sky-600 dark:text-sky-400 block mb-2 flex items-center gap-1">
                  <Layers className="w-3 h-3" />
                  Egress / Shipped Artifacts
                </span>
                <ul className="space-y-1.5 text-zinc-700 dark:text-zinc-300 text-[11px]">
                  {activeStage.outputs.map((out, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <ArrowRight className="w-3 h-3 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
                      <span>{out}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Pipeline Telemetry Footer */}
        <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-white/[0.06] flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono-code text-zinc-500 dark:text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Continuous DataOps Pipeline · Zero API Ingestion Delay</span>
          </div>
          <span className="text-zinc-400 dark:text-zinc-600">Deterministic · Cryptographically Audited</span>
        </div>
      </div>
    </section>
  );
};

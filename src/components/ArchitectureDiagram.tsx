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
import { HairlinePipelineFigure } from "@/components/HairlinePipelineFigure";

export interface PipelineStage {
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

export const STAGES: PipelineStage[] = [
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
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);
  const [hoveredStageIndex, setHoveredStageIndex] = useState<number | null>(null);

  const activeStage = STAGES[activeStageIndex] || STAGES[0];

  return (
    <section id="architecture" className="scroll-mt-24 space-y-6">
      {/* Section Header */}
      <div>
        <span className="section-label">03 · Systems Architecture</span>
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-white mt-1">
          Forensic DataOps &amp; Pipeline Architecture
        </h3>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1.5 max-w-2xl leading-relaxed">
          Standardized 4-stage data engineering lifecycle engineered for federal diplomacy, capital market analytics, and forensic codebase audits. The isometric Hairline figure illustrates the four physical data strata; hover or select any layer to inspect its inputs, transformations, and verified outputs.
        </p>
      </div>

      {/* Main Integrated Architecture Card */}
      <div className="card-surface p-4 sm:p-6 rounded-2xl border border-zinc-200/90 dark:border-white/[0.08] bg-white dark:bg-[#0C0C11] shadow-xs">
        {/* Responsive Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* Left Column (5 Cols): Compact Hairline Figure */}
          <div className="lg:col-span-5 flex flex-col gap-2">
            <HairlinePipelineFigure
              activeStageIndex={activeStageIndex}
              hoveredStageIndex={hoveredStageIndex}
              onSelectStage={(idx) => setActiveStageIndex(idx)}
              onHoverStage={(idx) => setHoveredStageIndex(idx)}
            />
          </div>

          {/* Right Column (7 Cols): Interactive Stage Breakdown */}
          <div className="lg:col-span-7 flex flex-col gap-4">

            {/* 4 Interactive Stage Selector Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2" role="tablist" aria-label="Pipeline Stages">
              {STAGES.map((s, idx) => {
                const isSelected = activeStageIndex === idx;
                const isHovered = hoveredStageIndex === idx;
                const Icon = s.icon;
                return (
                  <button
                    key={s.id}
                    role="tab"
                    id={`stage-tab-${idx}`}
                    aria-selected={isSelected}
                    aria-controls={`stage-panel-${idx}`}
                    onClick={() => setActiveStageIndex(idx)}
                    onMouseEnter={() => setHoveredStageIndex(idx)}
                    onMouseLeave={() => setHoveredStageIndex(null)}
                    onFocus={() => setHoveredStageIndex(idx)}
                    onBlur={() => setHoveredStageIndex(null)}
                    className={`p-2.5 rounded-xl border text-left transition-all duration-150 cursor-pointer ${
                      isSelected
                        ? "border-sky-500 bg-sky-500/10 dark:bg-sky-500/15 text-zinc-900 dark:text-white shadow-sm ring-1 ring-sky-500/30"
                        : isHovered
                        ? "border-zinc-300 dark:border-white/20 bg-zinc-100/70 dark:bg-zinc-800/60 text-zinc-900 dark:text-white"
                        : "border-zinc-200/70 dark:border-white/[0.06] bg-zinc-50/50 dark:bg-white/[0.02] text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-[10px] font-mono-code font-semibold text-sky-600 dark:text-sky-400">
                        {s.step}
                      </span>
                      <Icon className={`w-3 h-3 ${isSelected ? "text-sky-500" : "text-zinc-400 dark:text-zinc-500"}`} />
                    </div>
                    <span className="text-[11px] sm:text-xs font-semibold block leading-tight line-clamp-2 min-h-[1.75rem]">
                      {s.title}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Stage Detailed Inspector Panel */}
            <div
              id={`stage-panel-${activeStageIndex}`}
              role="tabpanel"
              aria-labelledby={`stage-tab-${activeStageIndex}`}
              className="p-4 sm:p-5 rounded-xl border border-zinc-200/80 dark:border-white/[0.08] bg-zinc-50/60 dark:bg-[#0E0E14] shadow-sm space-y-4"
            >
              {/* Stage Headline */}
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-zinc-200/60 dark:border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400">
                    <activeStage.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-white tracking-tight">
                      {activeStage.step}: {activeStage.title}
                    </h4>
                    <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-0.5 leading-relaxed">
                      {activeStage.shortDesc}
                    </p>
                  </div>
                </div>
              </div>

              {/* 3 Pillars Grid: Inputs, Transformations & Quality Gates, Verified Outputs */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* Inputs */}
                <div className="p-3 rounded-lg bg-white dark:bg-white/[0.02] border border-zinc-200/60 dark:border-white/[0.04] flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] font-mono-code uppercase tracking-wider font-semibold text-zinc-500 dark:text-zinc-400 mb-2 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                      Inputs &amp; Feeds
                    </div>
                    <ul className="space-y-1.5">
                      {activeStage.inputs.map((inp) => (
                        <li key={inp} className="flex items-start gap-1.5 text-[11px] text-zinc-700 dark:text-zinc-300 leading-snug">
                          <span className="text-sky-500 font-bold shrink-0 mt-0.5">•</span>
                          <span>{inp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Transformations & Quality Gates */}
                <div className="p-3 rounded-lg bg-white dark:bg-white/[0.02] border border-zinc-200/60 dark:border-white/[0.04] flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] font-mono-code uppercase tracking-wider font-semibold text-indigo-500 dark:text-indigo-400 mb-2 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                      Quality Invariants
                    </div>
                    <ul className="space-y-1.5">
                      {activeStage.invariants.map((inv) => (
                        <li key={inv} className="flex items-start gap-1.5 text-[11px] text-zinc-700 dark:text-zinc-300 leading-snug">
                          <span className="text-indigo-500 font-bold shrink-0 mt-0.5">•</span>
                          <span>{inv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Verified Outputs */}
                <div className="p-3 rounded-lg bg-white dark:bg-white/[0.02] border border-zinc-200/60 dark:border-white/[0.04] flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] font-mono-code uppercase tracking-wider font-semibold text-emerald-600 dark:text-emerald-400 mb-2 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Verified Outputs
                    </div>
                    <ul className="space-y-1.5">
                      {activeStage.outputs.map((out) => (
                        <li key={out} className="flex items-start gap-1.5 text-[11px] text-zinc-700 dark:text-zinc-300 leading-snug">
                          <span className="text-emerald-500 font-bold shrink-0 mt-0.5">•</span>
                          <span>{out}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Tech Stack Footer */}
              <div className="pt-2.5 border-t border-zinc-200/60 dark:border-white/[0.06] flex items-center justify-between flex-wrap gap-2">
                <span className="text-[10px] font-mono-code text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Operational Toolchain:
                </span>
                <div className="flex flex-wrap gap-1">
                  {activeStage.techStack.map((tech) => (
                    <span key={tech} className="tech-pill text-[10px]">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

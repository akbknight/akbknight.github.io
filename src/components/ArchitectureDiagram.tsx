"use client";

import { motion } from "framer-motion";
import { Database, ShieldCheck, Cpu, BarChart3, ArrowRight } from "lucide-react";

export const ArchitectureDiagram = () => {
  return (
    <section id="architecture" className="pt-2">
      <div className="mb-6">
        <span className="section-label">03 · Systems Architecture</span>
        <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white mt-1">
          Forensic DataOps &amp; Pipeline Architecture
        </h3>
        <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
          Standardized end-to-end framework applied across federal logistics, philanthropic mining, and forensic codebase audits.
        </p>
      </div>

      <div className="card-surface p-5 rounded-xl border border-zinc-200/90 dark:border-white/[0.08] bg-white dark:bg-[#0C0C11] shadow-sm dark:shadow-none">
        {/* Responsive Grid Diagram */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
          {/* Step 1 */}
          <div className="flex flex-col justify-between p-3.5 rounded-lg bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800">
            <div>
              <div className="flex items-center justify-between text-sky-600 dark:text-sky-400 mb-2">
                <Database className="w-5 h-5" />
                <span className="text-[10px] font-mono-code text-zinc-500 uppercase">Stage 01</span>
              </div>
              <h4 className="text-xs font-semibold text-zinc-900 dark:text-white">Multi-Source Ingestion</h4>
              <p className="text-[11px] text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
                9.7M+ Form 990 XML records, FRED macro APIs, and State Dept scheduling pipelines.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-zinc-200 dark:border-zinc-800/80 flex flex-wrap gap-1">
              <span className="text-[9px] font-mono-code px-1.5 py-0.5 rounded bg-zinc-200/80 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">IRS XML</span>
              <span className="text-[9px] font-mono-code px-1.5 py-0.5 rounded bg-zinc-200/80 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">FRED</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col justify-between p-3.5 rounded-lg bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800">
            <div>
              <div className="flex items-center justify-between text-indigo-600 dark:text-indigo-400 mb-2">
                <ShieldCheck className="w-5 h-5" />
                <span className="text-[10px] font-mono-code text-zinc-500 uppercase">Stage 02</span>
              </div>
              <h4 className="text-xs font-semibold text-zinc-900 dark:text-white">Forensic &amp; AST Audit</h4>
              <p className="text-[11px] text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
                SHA-256 cryptographic verification, AST dependency analysis, and SSRF/permission checks.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-zinc-200 dark:border-zinc-800/80 flex flex-wrap gap-1">
              <span className="text-[9px] font-mono-code px-1.5 py-0.5 rounded bg-zinc-200/80 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">SHA-256</span>
              <span className="text-[9px] font-mono-code px-1.5 py-0.5 rounded bg-zinc-200/80 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">AST Diff</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col justify-between p-3.5 rounded-lg bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800">
            <div>
              <div className="flex items-center justify-between text-amber-600 dark:text-amber-400 mb-2">
                <Cpu className="w-5 h-5" />
                <span className="text-[10px] font-mono-code text-zinc-500 uppercase">Stage 03</span>
              </div>
              <h4 className="text-xs font-semibold text-zinc-900 dark:text-white">Statistical Engine</h4>
              <p className="text-[11px] text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
                Holt-Winters forecasting, CUSUM anomaly monitoring, and greedy constraint optimization.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-zinc-200 dark:border-zinc-800/80 flex flex-wrap gap-1">
              <span className="text-[9px] font-mono-code px-1.5 py-0.5 rounded bg-zinc-200/80 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">DuckDB</span>
              <span className="text-[9px] font-mono-code px-1.5 py-0.5 rounded bg-zinc-200/80 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">Pandas</span>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex flex-col justify-between p-3.5 rounded-lg bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800">
            <div>
              <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400 mb-2">
                <BarChart3 className="w-5 h-5" />
                <span className="text-[10px] font-mono-code text-zinc-500 uppercase">Stage 04</span>
              </div>
              <h4 className="text-xs font-semibold text-zinc-900 dark:text-white">Executive Delivery</h4>
              <p className="text-[11px] text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
                Interactive dashboards, C-suite policy briefings, and automated CI/CD reports.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-zinc-200 dark:border-zinc-800/80 flex flex-wrap gap-1">
              <span className="text-[9px] font-mono-code px-1.5 py-0.5 rounded bg-zinc-200/80 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">Streamlit</span>
              <span className="text-[9px] font-mono-code px-1.5 py-0.5 rounded bg-zinc-200/80 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">Next.js</span>
            </div>
          </div>
        </div>

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

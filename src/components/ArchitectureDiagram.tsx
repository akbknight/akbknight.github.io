"use client";

import { motion } from "framer-motion";
import { Database, ShieldCheck, Cpu, BarChart3, ArrowRight } from "lucide-react";

export const ArchitectureDiagram = () => {
  return (
    <section id="architecture" className="pt-2">
      <div className="mb-6">
        <span className="section-label">03 · Systems Architecture</span>
        <h3 className="text-xl font-bold tracking-tight text-white mt-1">
          Forensic DataOps &amp; Pipeline Architecture
        </h3>
        <p className="text-xs text-zinc-400 mt-1">
          Standardized end-to-end framework applied across federal logistics, philanthropic mining, and forensic codebase audits.
        </p>
      </div>

      <div className="card-surface p-5 rounded-xl border border-white/[0.08] bg-[#0c0c11]">
        {/* Responsive Grid Diagram */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
          {/* Step 1 */}
          <div className="flex flex-col justify-between p-3.5 rounded-lg bg-zinc-900/60 border border-zinc-800">
            <div>
              <div className="flex items-center justify-between text-sky-400 mb-2">
                <Database className="w-5 h-5" />
                <span className="text-[10px] font-mono-code text-zinc-500 uppercase">Stage 01</span>
              </div>
              <h4 className="text-xs font-semibold text-white">Multi-Source Ingestion</h4>
              <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
                9.7M+ Form 990 XML records, FRED macro APIs, and State Dept scheduling pipelines.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-zinc-800/80 flex flex-wrap gap-1">
              <span className="text-[9px] font-mono-code px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300">IRS XML</span>
              <span className="text-[9px] font-mono-code px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300">FRED</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col justify-between p-3.5 rounded-lg bg-zinc-900/60 border border-zinc-800">
            <div>
              <div className="flex items-center justify-between text-indigo-400 mb-2">
                <ShieldCheck className="w-5 h-5" />
                <span className="text-[10px] font-mono-code text-zinc-500 uppercase">Stage 02</span>
              </div>
              <h4 className="text-xs font-semibold text-white">Forensic &amp; AST Audit</h4>
              <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
                SHA-256 cryptographic verification, AST dependency analysis, and SSRF/permission checks.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-zinc-800/80 flex flex-wrap gap-1">
              <span className="text-[9px] font-mono-code px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300">SHA-256</span>
              <span className="text-[9px] font-mono-code px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300">AST Diff</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col justify-between p-3.5 rounded-lg bg-zinc-900/60 border border-zinc-800">
            <div>
              <div className="flex items-center justify-between text-amber-400 mb-2">
                <Cpu className="w-5 h-5" />
                <span className="text-[10px] font-mono-code text-zinc-500 uppercase">Stage 03</span>
              </div>
              <h4 className="text-xs font-semibold text-white">Statistical Validation</h4>
              <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
                Z-Score &amp; CUSUM anomaly detection, Holt-Winters exponential smoothing, and unit test rigs.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-zinc-800/80 flex flex-wrap gap-1">
              <span className="text-[9px] font-mono-code px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300">CUSUM</span>
              <span className="text-[9px] font-mono-code px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300">4,426 Tests</span>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex flex-col justify-between p-3.5 rounded-lg bg-zinc-900/60 border border-zinc-800">
            <div>
              <div className="flex items-center justify-between text-emerald-400 mb-2">
                <BarChart3 className="w-5 h-5" />
                <span className="text-[10px] font-mono-code text-zinc-500 uppercase">Stage 04</span>
              </div>
              <h4 className="text-xs font-semibold text-white">Continuous DataOps</h4>
              <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
                Automated GitHub Actions CI/CD, executive PDF/HTML report compilation, and real-time dashboards.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-zinc-800/80 flex flex-wrap gap-1">
              <span className="text-[9px] font-mono-code px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300">CI/CD</span>
              <span className="text-[9px] font-mono-code px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300">Dashboards</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

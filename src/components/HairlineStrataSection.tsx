"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";
import { Layers, ExternalLink, Play, Sparkles, CheckCircle2 } from "lucide-react";

export const HairlineStrataSection = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const iframeSrc = mounted ? `/hairline-strata.html?theme=${theme === "dark" ? "dark" : "light"}` : "/hairline-strata.html";

  return (
    <section id="strata" className="scroll-mt-24 space-y-6">
      {/* Section Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono-code uppercase tracking-wider text-sky-600 dark:text-sky-400 font-semibold flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" />
            03 · Interactive Geometry
          </span>
          <span className="text-[10px] font-mono-code px-2 py-0.5 rounded-full bg-sky-50 dark:bg-sky-500/10 text-sky-700 dark:text-sky-300 border border-sky-500/20">
            Hairline Engine · @lucasmarkes/hairline
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Data Pipeline Strata: Physical Layer Architecture
        </h2>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
          An authentic Hairline isometric line figure representing my 4-stage data-engineering pipeline. As the pointer approaches, the data strata separate along the vertical axis on a physical spring, exposing intermediate audit guides and stage telemetry.
        </p>
      </div>

      {/* Interactive Hairline Stage Card */}
      <div className="relative rounded-2xl border border-zinc-200/80 dark:border-white/[0.08] bg-zinc-50/70 dark:bg-zinc-900/40 backdrop-blur-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all">
        {/* Top Control Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-200/60 dark:border-white/[0.06] flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono-code font-medium text-zinc-700 dark:text-zinc-300">
              Interactive Canvas (Pointer, Touch &amp; Keyboard Accessible)
            </span>
          </div>
          <a
            href="/hairline-strata.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono-code font-medium text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 transition-colors"
          >
            <span>Open Standalone Studio</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Embedded Validated Hairline Frame */}
        <div className="relative w-full rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#08090a]">
          <iframe
            src={iframeSrc}
            title="Hairline Strata Interactive Line Figure"
            className="w-full h-[380px] sm:h-[420px] md:h-[460px] border-0 select-none"
            loading="lazy"
          />
        </div>

        {/* 4 Pipeline Strata Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-5">
          <div className="p-3 rounded-lg bg-zinc-100/60 dark:bg-zinc-800/40 border border-zinc-200/50 dark:border-white/[0.04]">
            <span className="text-[10px] font-mono-code font-semibold text-sky-600 dark:text-sky-400">01 · INGEST</span>
            <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 mt-1">Multi-Source Feeds</h4>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 leading-snug">
              9.7M+ IRS Form 990 XMLs, FRED RSXFS, and PACER court records.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-zinc-100/60 dark:bg-zinc-800/40 border border-zinc-200/50 dark:border-white/[0.04]">
            <span className="text-[10px] font-mono-code font-semibold text-indigo-600 dark:text-indigo-400">02 · SANITIZE</span>
            <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 mt-1">Quality Gateways</h4>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 leading-snug">
              SHA-256 fingerprinting, 7-point assertion suite, and deduplication.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-zinc-100/60 dark:bg-zinc-800/40 border border-zinc-200/50 dark:border-white/[0.04]">
            <span className="text-[10px] font-mono-code font-semibold text-amber-600 dark:text-amber-400">03 · MODEL</span>
            <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 mt-1">Econometric Engine</h4>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 leading-snug">
              Holt-Winters ETS(A,A,A) smoothing and CUSUM regime detection.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-zinc-100/60 dark:bg-zinc-800/40 border border-zinc-200/50 dark:border-white/[0.04]">
            <span className="text-[10px] font-mono-code font-semibold text-emerald-600 dark:text-emerald-400">04 · DELIVER</span>
            <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 mt-1">Executive Surfaces</h4>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 leading-snug">
              3D WebGL spatial intelligence, real-time monitors, and audit reports.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HairlineStrataSection;

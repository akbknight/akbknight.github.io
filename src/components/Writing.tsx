"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink, FileCode, BookMarked, ArrowUpRight } from "lucide-react";

export const Writing = () => {
  return (
    <section id="writing">
      <p className="section-label mb-6">05 · Technical Write-ups &amp; Methodology Reports</p>

      <div className="space-y-4">
        {/* Technical Write-up 1: Econometric Forecasting */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4 }}
          className="card-surface group rounded-xl border border-zinc-200/80 dark:border-white/[0.08] bg-white dark:bg-[#0E0E14] p-5 shadow-xs dark:shadow-none transition-all duration-200 hover:border-sky-500/40 dark:hover:border-sky-500/30"
        >
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-md bg-sky-500/10 text-sky-600 dark:text-sky-400">
                <FileCode className="w-4 h-4" />
              </span>
              <div>
                <span className="text-[10px] font-mono-code font-semibold px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-700 dark:text-sky-400 border border-sky-500/20 mr-2">
                  Project Technical Report
                </span>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors inline">
                  Econometric Demand Forecasting Methodology (FRED Time-Series)
                </h3>
              </div>
            </div>
            <a
              href="https://github.com/akbknight/us-retail-sales-forecast/blob/main/docs/methodology.md"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Econometric Demand Forecasting Methodology Write-up"
              className="text-zinc-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors shrink-0"
            >
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          <p className="text-[12px] text-zinc-600 dark:text-zinc-300 leading-relaxed mb-3">
            Engineering write-up specifying state-space ETS(A,A,A) models, joint parameter estimation via maximum likelihood (L-BFGS-B), analytical prediction interval derivation, and walk-forward holdout validation (~2.0% MAPE) for U.S. macroeconomic indicators.
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-zinc-100 dark:bg-white/[0.04] text-zinc-600 dark:text-zinc-400">
              statsmodels
            </span>
            <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-zinc-100 dark:bg-white/[0.04] text-zinc-600 dark:text-zinc-400">
              State-Space ETS
            </span>
            <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-zinc-100 dark:bg-white/[0.04] text-zinc-600 dark:text-zinc-400">
              FRED RSXFS
            </span>
            <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-zinc-100 dark:bg-white/[0.04] text-zinc-600 dark:text-zinc-400">
              Walk-Forward Backtest
            </span>
          </div>
        </motion.div>

        {/* Technical Write-up 2: IRS Form 990 Architecture */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: 0.08 }}
          className="card-surface group rounded-xl border border-zinc-200/80 dark:border-white/[0.08] bg-white dark:bg-[#0E0E14] p-5 shadow-xs dark:shadow-none transition-all duration-200 hover:border-sky-500/40 dark:hover:border-sky-500/30"
        >
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-md bg-sky-500/10 text-sky-600 dark:text-sky-400">
                <BookMarked className="w-4 h-4" />
              </span>
              <div>
                <span className="text-[10px] font-mono-code font-semibold px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-700 dark:text-sky-400 border border-sky-500/20 mr-2">
                  System Architecture Dossier
                </span>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors inline">
                  IRS Form 990 Ingestion Architecture &amp; Data Governance Contract
                </h3>
              </div>
            </div>
            <a
              href="https://github.com/akbknight/form990-grant-miner/blob/main/docs/architecture.md"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View IRS 990 Ingestion Architecture Dossier"
              className="text-zinc-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors shrink-0"
            >
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          <p className="text-[12px] text-zinc-600 dark:text-zinc-300 leading-relaxed mb-3">
            System engineering dossier detailing in-memory streaming XML parsing of 9.7M+ filings, anti-double-counting invariants for DAF pass-through capital, and multi-year donor-recipient longitudinal relationship ledgers.
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-zinc-100 dark:bg-white/[0.04] text-zinc-600 dark:text-zinc-400">
              DataOps Architecture
            </span>
            <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-zinc-100 dark:bg-white/[0.04] text-zinc-600 dark:text-zinc-400">
              In-Memory XML Streaming
            </span>
            <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-zinc-100 dark:bg-white/[0.04] text-zinc-600 dark:text-zinc-400">
              DAF Invariants
            </span>
            <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-zinc-100 dark:bg-white/[0.04] text-zinc-600 dark:text-zinc-400">
              PostgreSQL / DuckDB
            </span>
          </div>
        </motion.div>

        {/* Photography & Personal Essays Link */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.4, delay: 0.14 }}
          className="mt-2"
        >
          <Link
            href="/life"
            prefetch={false}
            className="card-surface group flex items-center justify-between rounded-xl border border-zinc-200/80 dark:border-white/[0.08] bg-white dark:bg-[#0E0E14] px-5 py-3.5 shadow-xs dark:shadow-none transition-all duration-200 hover:border-sky-500/40 dark:hover:border-sky-500/30"
          >
            <div>
              <p className="text-[13px] font-medium text-zinc-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors duration-200">
                Creative Writing &amp; Photography
              </p>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                Pexels Contributor · Personal Essays · Beyond the Terminal
              </p>
            </div>
            <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-sky-600 dark:group-hover:text-sky-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

"use client";

import { motion } from "framer-motion";
import { FileCode, BookMarked, ArrowUpRight } from "lucide-react";

const WRITEUPS = [
  {
    type: "Methodology Specification",
    title: "Econometric Demand Forecasting Methodology (FRED Time-Series)",
    description:
      "Engineering write-up specifying state-space ETS(A,A,A) models, joint parameter estimation via maximum likelihood (L-BFGS-B), analytical prediction interval derivation, and walk-forward holdout validation (~2.0% MAPE) for U.S. macroeconomic indicators.",
    url: "https://github.com/akbknight/us-retail-sales-forecast/blob/main/docs/methodology.md",
    tags: ["statsmodels", "State-Space ETS", "FRED RSXFS", "Walk-Forward Validation"],
    source: "us-retail-sales-forecast",
  },
  {
    type: "Data Architecture Specification",
    title: "IRS Form 990 In-Memory Streaming Parser & DuckDB Schema Design",
    description:
      "Detailed architectural specification covering event-driven SAX parsing of multi-gigabyte IRS 990 XML tax filings, memory footprint bounds, and relational star-schema modeling in DuckDB for sub-second OLAP aggregations.",
    url: "https://github.com/akbknight/form990-grant-miner/blob/main/docs/architecture.md",
    tags: ["Python SAX", "DuckDB Columnar", "Memory Bounds", "Star Schema"],
    source: "form990-grant-miner",
  },
];

export const Writing = () => {
  return (
    <section id="writing" className="py-16 sm:py-24 border-b border-zinc-200/80 dark:border-white/[0.08]">
      <div className="mb-12">
        <p className="section-label mb-3">03 · Technical Write-ups &amp; Methodology</p>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
          System Documentation &amp; Research Notes
        </h2>
        <p className="mt-2 text-sm sm:text-base text-zinc-600 dark:text-zinc-300 max-w-xl">
          Detailed engineering write-ups on algorithmic choices, statistical validation, and data pipeline design.
        </p>
      </div>

      <div className="space-y-4">
        {WRITEUPS.map((item, idx) => (
          <div
            key={idx}
            className="apple-glass-card p-6 sm:p-7 rounded-2xl transition-all group"
          >
            <div className="flex items-start justify-between gap-4 mb-2">
              <div className="space-y-1">
                <span className="text-[10px] font-mono-code font-semibold px-2 py-0.5 rounded bg-sky-500/10 text-sky-700 dark:text-sky-400 border border-sky-500/20">
                  {item.type}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors pt-1">
                  {item.title}
                </h3>
              </div>

              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Read ${item.title}`}
                className="p-2 rounded-lg text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/[0.06] transition-colors shrink-0"
              >
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal mb-4">
              {item.description}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-zinc-100 dark:border-white/[0.04]">
              <div className="flex flex-wrap gap-1.5">
                {item.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] font-mono-code px-2 py-0.5 rounded bg-zinc-100 dark:bg-white/[0.04] text-zinc-600 dark:text-zinc-400"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono-code text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1"
              >
                <span>Read Full Specification</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { Github, ExternalLink, Maximize2, X, BookOpen, Database, ArrowUpRight, CheckCircle2, ChevronDown, AlertCircle } from "lucide-react";
import { ProjectPipelineFigure } from "@/components/ProjectPipelineFigure";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";

interface FeaturedProject {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  question: string;
  evidence: string;
  result: string;
  recommendation: string;
  limitation: string;
  summary: string;
  tradeoff?: string;
  problem: string;
  contribution: string;
  keyTakeaway: string;
  tech: string[];
  github: string;
  live: string;
  fullReport?: { label: string; url: string };
  reproducibleScript?: { label: string; url: string };
  caseStudy?: { label: string; url: string };
  image?: string;
  imageLight?: string;
  imageAlt?: string;
  hasHairlineFigure?: boolean;
}

interface ArchiveProject {
  title: string;
  category: string;
  summary: string;
  contribution: string;
  tech: string[];
  github: string | null;
  live: string | null;
}

const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    id: "irs990",
    number: "01",
    title: "IRS 990 Philanthropic Grant Research & Spatial Explorer",
    subtitle: "Evaluating predictive regression against empirical medians on 93,672 public Form 990 records",
    category: "Public Data Engineering & Predictive Modeling Evaluation",
    keyTakeaway: "Foundation-specific historical medians outperformed 7 regression architectures on validation error; recommended dashboard strictly for research rather than automated prediction.",
    question:
      "Can foundation identity, category, and location predict next-year positive individual grant amounts better than simple historical medians?",
    evidence:
      "Local standardized modeling partition of 93,672 raw Form 990 Schedule I grant records (93,638 positive records, 2019–2021; Train 2019: 49,547 · Val 2020: 23,583 · Test 2021: 20,508; 2,435 duplicate-looking rows preserved pending verification; SHA-256: de37e5a1004a97527695e72c54db822306ac66b3590300775167e1c54c6c5a68; 10,310,923 bytes). Extracted from AWS Open Data S3 archives (s3://irs-form-990/) via master_pipeline.py; upstream 18-digit return ObjectIds and S3 archive ZIP checksums were not retained in CSV export columns and remain unresolved lineage. Chronologically evaluated 7 regression architectures (OLS log, Ridge raw/log, Random Forest log, Extra Trees log, HistGradientBoosting log/MAE) against Foundation Median and Global Median baselines.",
    result:
      "The foundation-specific historical median achieved the lowest validation MAE ($72,462), outperforming all regression models (Log OLS: $72,635; Log Ridge: $72,985; HistGradientBoosting MAE: $74,352; HistGradientBoosting log: $74,624; Random Forest: $75,826). On the held-out 2021 test set (20,508 rows), the foundation median reduced MAE by 6.9% ($6,351 per award) vs a global median, but absolute test MAE remained $86,013 (R² ≈ 0.022) against a $10,000 median grant. On unseen foundations (31.7% of test), MAE degraded to $94,058 (R² = -0.025). Separately, the dashboard includes an institutional scaling matrix with a log-linear OLS baseline (β ≈ 0.83, R² ≈ 0.28) across 30+ curated entities.",
    recommendation:
      "Predictive budgeting is not recommended on these tested features and data due to high out-of-sample error ($86,013 MAE against a $10,000 median grant) and a 31.7% cold-start foundation rate. The platform is engineered for descriptive historical analysis, institutional concentration mapping, and geographic discovery.",
    limitation:
      "Findings apply strictly to the local 2019–2021 export (not the full IRS population). Features exclude narrative text, multi-year asset histories, and recipient balance sheets. The scatter trendline is an aggregate institutional descriptive baseline, not an individual transaction predictor, and does not compute studentized residuals to establish formal statistical outliers.",
    summary:
      "Evaluated seven regression models and two baselines on 93,638 positive grant awards. Foundation-specific historical medians beat every tested regressor on validation error, but held-out MAE ($86,013) remained too high for budget forecasting. Recommended using the tool for historical research and concentration analysis rather than automated grant prediction.",
    tradeoff:
      "Local DuckDB enables sub-second analytical queries without server hosting costs, but executes within local client memory—limiting concurrent multi-user write workflows compared to centralized cloud warehouses.",
    problem:
      "Public IRS Form 990 tax filings are distributed as multi-gigabyte unindexed XML archives without relational structure or geographic coordinates, making cross-foundation capital tracking prohibitively difficult for researchers and grant analysts.",
    contribution:
      "Engineered an in-memory streaming SAX parser in Python to process multi-gigabyte XML archives without disk spill. Normalized relational schemas in DuckDB and built an interactive dashboard with 3D WebGL capital flow arcs and state choropleths.",
    tech: ["Python", "DuckDB", "Three.js / Globe.gl", "D3 TopoJSON", "AWS S3 Open Data"],
    image: "/projects/irs990.png",
    imageLight: "/projects/irs990-light.png",
    imageAlt: "IRS 990 Grant Miner live dashboard showing 3D WebGL capital flow arcs and U.S. choropleth",
    github: "https://github.com/akbknight/irs990-grant-dashboard",
    live: "https://akbknight.github.io/irs990-grant-dashboard/",
    fullReport: {
      label: "Regression Modeling Audit",
      url: "https://github.com/akbknight/irs990-grant-dashboard/blob/main/reports/regression_modeling_audit.md",
    },
    reproducibleScript: {
      label: "evaluate_models.py",
      url: "https://github.com/akbknight/irs990-grant-dashboard/blob/main/scripts/evaluate_models.py",
    },
    hasHairlineFigure: true,
  },
  {
    id: "retail-forecast",
    number: "02",
    title: "U.S. Retail Demand Forecasting Engine",
    subtitle: "Evaluating the original historical holdout and a retrospective 4-origin suite with a 12-month horizon against simple drift baselines", 
    category: "Econometric Modeling & Time-Series Evaluation",
    keyTakeaway: "Nonseasonal Holt achieved lowest mean MAE across four origins with a 12-month horizon (1.515% Mean MAPE), closely followed by Additive ETS (1.519%) and Drift (1.539%), differing by approximately 0.0245 percentage points; Simple Drift (1.250% MAPE) led the original historical holdout.",
    question:
      "Does a complex seasonal state-space exponential smoothing architecture (ETS) consistently outperform simpler econometric baselines on monthly retail sales demand across multiple forecast origins?",
    evidence:
      "FRED monthly US Advance Retail Sales series (RSXFS, 320 monthly observations, January 2000–August 2026, seasonally adjusted). Evaluated 8 candidate forecasting approaches on both the original historical holdout window (Sep 2025–Aug 2026) and a retrospective 4-origin evaluation suite with a 12-month horizon (Origins: Sep 2022–Aug 2023, Sep 2023–Aug 2024, Sep 2024–Aug 2025, Sep 2025–Aug 2026), alongside an 18-month forward operational projection horizon.",
    result:
      "On the pre-holdout validation window, Nonseasonal Holt achieved the lowest error ($7.318B MAE, 1.21% MAPE) and was selected on validation error; on the subsequent original historical holdout window (Sep 2025–Aug 2026), Simple Drift performed slightly better (1.250% MAPE, $7.974B MAE vs. 1.256% MAPE, $8.017B MAE for Holt). Across four origins with a 12-month horizon (2022–2026), Nonseasonal Holt achieved the lowest mean MAE ($9.078B Mean MAE, 1.515% Mean MAPE), followed closely by Additive Seasonal ETS (1.519% Mean MAPE) and Simple Drift (1.539% Mean MAPE). The top three specifications differ by approximately 0.0245 percentage points over 48 evaluated months. Recomputing the separately saved production pipeline output (forecast_data.json) against held-out actuals verified the stored 1.2294% MAPE ($7.830B MAE, $9.928B RMSE).",
    recommendation:
      "Adopt parsimonious nonseasonal baselines (Simple Drift or Nonseasonal Holt) as the primary evaluation standard for seasonally adjusted retail series before assuming seasonal complexity is beneficial across multiple origins. Treat multi-origin analysis as a retrospective robustness comparison across four historical 12-month horizons; the original historical holdout (Sep 2025–Aug 2026), having been repeatedly inspected during benchmarking and validation, cannot serve as untouched out-of-sample evidence for future model iterations, which require genuinely new data releases.",
    limitation:
      "Findings apply to the seasonally adjusted FRED RSXFS aggregate series. Sudden macroeconomic policy shifts or disaggregated category shocks may introduce non-linearities not captured by unconditioned univariate smoothing.",
    summary:
      "Evaluated an 18-month forward projection engine and benchmarked eight approaches across a locked holdout and a 4-horizon multi-origin suite using 320 monthly observations. Nonseasonal Holt and simple drift proved most resilient across multiple macroeconomic regimes.",
    tradeoff:
      "Holt-Winters captures annual seasonality and baseline trends, but cannot predict sudden macroeconomic regime shifts or exogenous supply disruptions without dedicated regression covariates.",
    problem:
      "Retail inventory planners and operations teams need reliable medium-term demand forecasts that account for macroeconomic trends, seasonality, and historical shocks rather than static linear extrapolations.",
    contribution:
      "Formulated state-space ETS(A,A,A) and Holt-Winters exponential smoothing models in Python using statsmodels on Federal Reserve FRED data. Integrated locked fixed-origin holdout evaluation and built an interactive browser backtesting studio.",
    tech: ["Python", "statsmodels", "Pandas", "FRED API", "Chart.js"],
    image: "/projects/retail-forecast.png",
    imageLight: "/projects/retail-forecast-light.png",
    imageAlt: "U.S. Retail Demand Forecasting Engine showing 18-month projected sales and confidence intervals",
    github: "https://github.com/akbknight/us-retail-sales-forecast",
    live: "https://akbknight.github.io/us-retail-sales-forecast/",
    fullReport: {
      label: "Baseline Benchmark Report",
      url: "https://github.com/akbknight/us-retail-sales-forecast/blob/main/reports/baseline_benchmarks.md",
    },
    reproducibleScript: {
      label: "forecast_compare.py",
      url: "https://github.com/akbknight/us-retail-sales-forecast/blob/main/scripts/forecast_compare.py",
    },
  },
  {
    id: "scheduling-optimizer",
    number: "03",
    title: "Consular Facility & Resource Scheduling Simulator",
    subtitle: "Benchmarking priority-greedy constraint scheduling against queue-arrival baselines with strict clearance enforcement",
    category: "Operations Research & Algorithmic Evaluation",
    keyTakeaway: "Enforcing strict attendee validation (rejecting unknown IDs, non-finite values, and deficits) eliminated all 61 violations on Seed 42 (0 defects across 5 seeds); Priority-Greedy achieved +5.8% priority points over arrival order.",
    question:
      "How does a priority-aware greedy constraint satisfaction heuristic perform when attendee-level security clearance constraints are strictly enforced, and does its priority advantage hold across multi-instance evaluations?",
    evidence:
      "Deterministic synthetic consular facility instances (180 meeting requests, 20 rooms, 150 personnel across a 40-hour work week) evaluated on both Seed 42 and a 5-instance benchmark suite (Seeds: 42, 100, 2026, 31415, 88888). Evaluated strict attendee clearance enforcement (quarantining unknown IDs, invalid/non-finite values, and clearance deficits) against unconstrained, Arrival-Order (FCFS), and Shortest-Duration heuristics.",
    result:
      "Under unconstrained scheduling, Priority-Greedy placed 107 meetings on Seed 42 but generated 61 attendee clearance violations (averaging 59.6 deficits per instance across 5 seeds). Enabling strict attendee clearance reduced violations to EXACTLY 0 across all 5 seeds, placing 66 meetings on Seed 42 (delta = 41 placements) and averaging 70.2 meetings across seeds (delta = 42.6 placements, with +5.8% priority points over arrival order). The 42.6 placement difference is the net outcome of cascading room/slot contention shifts when deficit requests are queued, distinct from the measured count of 59.6 clearance deficits. Zero room-capacity, room-clearance, or schedule-overlap violations occurred across all runs (~3–5 ms client-side).",
    recommendation:
      "Deploy strict attendee validation (rejecting unknown IDs and malformed clearances) at intake. Prioritize meeting requests via weighted priority scoring to maximize high-classification diplomatic outcomes under facility and security constraints.",
    limitation:
      "The benchmark is evaluated on synthetic consular scheduling distributions and does not reflect real-time cancellation volatility, variable attendee transit times, or ad-hoc VIP overrides. Enforcing strict attendee clearance reduces fill rate from 62.7% to 39.0%, identifying personnel clearance deficits as a primary operational bottleneck.",
    summary:
      "Benchmarked priority-greedy scheduling with strict attendee clearance enforcement across a 5-instance evaluation suite. Eliminated all 61 clearance violations while maintaining a +5.8% priority point advantage over first-come baselines.",
    tradeoff:
      "The greedy constraint heuristic computes allocations in under 2 seconds, but does not guarantee global optimality in heavily over-subscribed edge cases where full constraint backtracking would be required.",
    problem:
      "Independent consular sections and diplomatic facilities share limited high-security rooms and personnel, leading to double-booking, sub-optimal capacity allocation, and manual triage delays during high-demand surge periods.",
    contribution:
      "Architected a priority-weighted greedy heuristic implemented as a single shared module (src/js/algorithm.js) loaded directly by the browser UI and verified via Node.js parity harnesses (14 edge-case tests, 8 parity tests) and Headless Chrome browser smoke testing (100% pass). Visualized real-time schedule timetables and 3D room occupancy layouts in the browser.",
    tech: ["JavaScript", "Heuristics", "Constraint Satisfaction", "Three.js", "Chart.js"],
    image: "/projects/scheduling-optimizer.png",
    imageLight: "/projects/scheduling-optimizer-light.png",
    imageAlt: "Consular Resource and Scheduling Optimizer showing 3D room occupancy matrix",
    github: "https://github.com/akbknight/scheduling-optimizer",
    live: "https://akbknight.github.io/scheduling-optimizer/",
    fullReport: {
      label: "Scheduling Benchmark Audit",
      url: "https://github.com/akbknight/scheduling-optimizer/blob/master/reports/benchmark_audit.md",
    },
    reproducibleScript: {
      label: "benchmark_scheduler.cjs",
      url: "https://github.com/akbknight/scheduling-optimizer/blob/master/scripts/benchmark_scheduler.cjs",
    },
  },
];

const ARCHIVE_PROJECTS: ArchiveProject[] = [
  {
    title: "Deborah Organization Research Assistant",
    category: "Data Pipelines & Security Audit",
    summary:
      "Entity resolution and public filings research assistant ingesting IRS Form 990 data to generate multi-format financial reports (PDF, Excel, HTML, JSON) without requiring paid API keys.",
    contribution:
      "Conducted a security audit across legacy versions, eliminating SSRF DNS-rebinding vulnerabilities and adding automated CI/CD validation.",
    tech: ["Python", "Flask", "ReportLab", "openpyxl", "ProPublica API"],
    github: "https://github.com/akbknight/deborah-research-assistant-audit",
    live: "https://akbknight.github.io/deborah-research-assistant-audit/",
  },
  {
    title: "Master Resume Engineer",
    category: "CLI Engineering & Schema Testing",
    summary:
      "Automated resume compilation tool enforcing structural invariants, STAR-quantified bullet formatting, and single-source-of-truth YAML editing.",
    contribution:
      "Built AST parsing and automated schema validation tests to ensure deterministic output compilation.",
    tech: ["Python", "AST Parsing", "YAML", "ReportLab"],
    github: "https://github.com/akbknight/master-resume-engineer",
    live: "https://akbknight.github.io/master-resume-engineer/",
  },
  {
    title: "Economic Scenario Analysis Simulator",
    category: "Macroeconomic Simulation & Policy Analysis",
    summary:
      "Interactive macroeconomic policy simulation modeling Federal Reserve rate levers, CPI inflation, and unemployment to project 12-month forward retail sales and stress index using FRED benchmark series (2000–2024).",
    contribution:
      "Architected dual-engine exploration coupling stylized Taylor/Okun heuristics with an illustrative empirical prototype propagating OLS parameter variance and conditional-mean confidence intervals (±1.96·SE).",
    tech: ["JavaScript", "Chart.js", "FRED API", "Econometrics", "Puppeteer"],
    github: "https://github.com/akbknight/economic-scenario-analysis",
    live: "https://akbknight.github.io/economic-scenario-analysis/",
  },
];

export const Projects = () => {
  const { theme } = useTheme();
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string; title: string } | null>(null);
  const [expandedAudits, setExpandedAudits] = useState<Record<string, boolean>>({});
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const modalCloseBtnRef = useRef<HTMLButtonElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const toggleAudit = (id: string) => {
    setExpandedAudits((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const closeLightbox = useCallback(() => {
    setLightboxImage(null);
    setTimeout(() => {
      triggerRef.current?.focus();
    }, 50);
  }, []);

  // Accessible Lightbox Dialog: Focus Trap, Escape Key, and Scroll Lock
  useEffect(() => {
    if (!lightboxImage) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      modalCloseBtnRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeLightbox();
        return;
      }
      if (e.key === "Tab" && modalRef.current) {
        const focusables = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxImage, closeLightbox]);

  const openLightbox = (img: { src: string; alt: string; title: string }, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setLightboxImage(img);
  };

  return (
    <section id="work" className="py-16 sm:py-20 border-b border-zinc-200/80 dark:border-white/[0.08]">
      {/* Section Header */}
      <div className="mb-12 sm:mb-16">
        <p className="section-label mb-3">01 · Selected Systems &amp; Evidence</p>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Featured Engineering &amp; Analytics Projects
        </h2>
        <p className="mt-2 text-sm sm:text-base text-zinc-600 dark:text-zinc-300 max-w-2xl text-pretty">
          Three representative systems connecting unindexed public records, econometric forecasting, and operations research to measurable outcomes.
        </p>
      </div>

      {/* Flagship Projects: Visual First with Progressive Disclosure */}
      <div className="space-y-16 sm:space-y-24">
        {FEATURED_PROJECTS.map((proj) => {
          const isAuditOpen = !!expandedAudits[proj.id];

          return (
            <article
              key={proj.id}
              id={`project-${proj.id}`}
              className="card-surface rounded-2xl p-6 sm:p-8 lg:p-10 space-y-6"
            >
              {/* Project Header */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-mono-code font-semibold px-2.5 py-1 rounded-md bg-sky-500/10 text-sky-700 dark:text-sky-400 border border-sky-500/20">
                    {proj.category}
                  </span>
                  <span className="text-xs font-mono-code text-zinc-500 dark:text-zinc-400">
                    Project {proj.number} of 03
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white pt-1">
                  {proj.title}
                </h3>

                <p className="text-sm sm:text-base font-medium text-zinc-600 dark:text-zinc-300 leading-snug">
                  {proj.subtitle}
                </p>

                {/* Key Takeaway Callout */}
                <div className="pt-2">
                  <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 bg-zinc-100/70 dark:bg-white/[0.03] border-l-2 border-sky-500 px-3.5 py-2 rounded-r-lg leading-relaxed">
                    <strong className="text-zinc-900 dark:text-white font-semibold">Key Outcome: </strong>
                    {proj.keyTakeaway}
                  </p>
                </div>
              </div>

              {/* Primary Visual Presentation: Large, Unobscured Preview */}
              {proj.hasHairlineFigure ? (
                <div className="space-y-4 pt-1">
                  {proj.image && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono-code text-zinc-500 dark:text-zinc-400">
                        <span>Research Workbench Interface Preview</span>
                        <button
                          type="button"
                          onClick={(e) =>
                            openLightbox(
                              {
                                src: theme === "light" && proj.imageLight ? proj.imageLight : proj.image!,
                                alt: proj.imageAlt!,
                                title: proj.title,
                              },
                              e.currentTarget
                            )
                          }
                          className="inline-flex items-center gap-1.5 text-sky-600 dark:text-sky-400 hover:underline cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded p-1"
                          aria-label={`Enlarge preview for ${proj.title}`}
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                          <span>Click to enlarge preview</span>
                        </button>
                      </div>

                      <div
                        className="group relative w-full rounded-xl overflow-hidden border border-zinc-200/80 dark:border-white/[0.08] bg-zinc-100 dark:bg-zinc-950 cursor-pointer shadow-xs"
                        onClick={(e) => {
                          const btn = e.currentTarget.parentElement?.querySelector("button");
                          if (btn) {
                            openLightbox(
                              {
                                src: theme === "light" && proj.imageLight ? proj.imageLight : proj.image!,
                                alt: proj.imageAlt!,
                                title: proj.title,
                              },
                              btn
                            );
                          }
                        }}
                      >
                        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] max-h-[420px]">
                          {proj.imageLight && (
                            <Image
                              src={proj.imageLight}
                              alt={proj.imageAlt ?? proj.title}
                              fill
                              className="object-cover object-top transition-transform duration-200 group-hover:scale-[1.008] dark:hidden block"
                              sizes="(max-width: 1024px) 100vw, 980px"
                            />
                          )}
                          <Image
                            src={proj.image}
                            alt={proj.imageAlt ?? proj.title}
                            fill
                            className={`object-cover object-top transition-transform duration-200 group-hover:scale-[1.008] ${proj.imageLight ? "hidden dark:block" : ""}`}
                            sizes="(max-width: 1024px) 100vw, 980px"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Pipeline Architecture Stage Inspector */}
                  <div className="space-y-2 pt-2">
                    <h4 className="text-xs font-mono-code uppercase tracking-wider font-semibold text-zinc-500 dark:text-zinc-400">
                      System Architecture &amp; Data Pipeline Stages
                    </h4>
                    <ProjectPipelineFigure />
                  </div>
                </div>
              ) : proj.image ? (
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between text-xs font-mono-code text-zinc-500 dark:text-zinc-400">
                    <span>Operational Interface Preview</span>
                    <button
                      type="button"
                      onClick={(e) =>
                        openLightbox(
                          {
                            src: theme === "light" && proj.imageLight ? proj.imageLight : proj.image!,
                            alt: proj.imageAlt!,
                            title: proj.title,
                          },
                          e.currentTarget
                        )
                      }
                      className="inline-flex items-center gap-1.5 text-sky-600 dark:text-sky-400 hover:underline cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded p-1"
                      aria-label={`Enlarge diagram for ${proj.title}`}
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Click to enlarge preview</span>
                    </button>
                  </div>

                  <div
                    className="group relative w-full rounded-xl overflow-hidden border border-zinc-200/80 dark:border-white/[0.08] bg-zinc-100 dark:bg-zinc-950 cursor-pointer shadow-xs"
                    onClick={(e) => {
                      const btn = e.currentTarget.parentElement?.querySelector("button");
                      if (btn) {
                        openLightbox(
                          {
                            src: theme === "light" && proj.imageLight ? proj.imageLight : proj.image!,
                            alt: proj.imageAlt!,
                            title: proj.title,
                          },
                          btn
                        );
                      }
                    }}
                  >
                    <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] max-h-[420px]">
                      {proj.imageLight && (
                        <Image
                          src={proj.imageLight}
                          alt={proj.imageAlt ?? proj.title}
                          fill
                          className="object-cover object-top transition-transform duration-200 group-hover:scale-[1.008] dark:hidden block"
                          sizes="(max-width: 1024px) 100vw, 980px"
                        />
                      )}
                      <Image
                        src={proj.image}
                        alt={proj.imageAlt ?? proj.title}
                        fill
                        className={`object-cover object-top transition-transform duration-200 group-hover:scale-[1.008] ${proj.imageLight ? "hidden dark:block" : ""}`}
                        sizes="(max-width: 1024px) 100vw, 980px"
                      />
                    </div>
                  </div>
                </div>
              ) : null}

              {/* Action Buttons & Tech Stack Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                {/* Tech Badges */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {proj.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] font-mono-code px-2.5 py-0.5 rounded-md bg-zinc-100 dark:bg-white/[0.05] text-zinc-700 dark:text-zinc-300 border border-zinc-200/70 dark:border-white/[0.06]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Direct Action Links */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <a
                    href={proj.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-medium transition-all shadow-xs active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                  >
                    <span>Launch Live System</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-medium transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                  >
                    <Github className="w-3 h-3" />
                    <span>Source Repo</span>
                  </a>

                  {proj.fullReport && (
                    <a
                      href={proj.fullReport.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-medium transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                    >
                      <BookOpen className="w-3 h-3 text-sky-600 dark:text-sky-400" />
                      <span>{proj.fullReport.label}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-60" />
                    </a>
                  )}

                  {proj.reproducibleScript && (
                    <a
                      href={proj.reproducibleScript.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-medium transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                    >
                      <Database className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                      <span>{proj.reproducibleScript.label}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-60" />
                    </a>
                  )}
                </div>
              </div>

              {/* Narrative Problem & Contribution Overview */}
              <div className="pt-2 border-t border-zinc-200/60 dark:border-white/[0.06] text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed space-y-2">
                <p>
                  <strong className="text-zinc-900 dark:text-white font-medium">Problem: </strong>
                  {proj.problem}
                </p>
                <p>
                  <strong className="text-zinc-900 dark:text-white font-medium">Contribution: </strong>
                  {proj.contribution}
                </p>
              </div>

              {/* Progressive Disclosure: Methodology & Empirical Framework Accordion */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => toggleAudit(proj.id)}
                  aria-expanded={isAuditOpen}
                  aria-controls={`audit-framework-${proj.id}`}
                  className="flex items-center justify-between w-full px-4 py-2.5 rounded-xl border border-zinc-200/80 dark:border-white/[0.08] bg-zinc-50/70 hover:bg-zinc-100 dark:bg-white/[0.02] dark:hover:bg-white/[0.04] text-xs font-mono-code text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                >
                  <span className="font-semibold uppercase tracking-wider flex items-center gap-2">
                    <span className="text-sky-600 dark:text-sky-400">❖</span>
                    <span>Methodology &amp; Empirical Framework (5-Point Audit)</span>
                  </span>
                  <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
                    <span>{isAuditOpen ? "Hide Framework" : "Inspect Details"}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isAuditOpen ? "rotate-180" : ""}`} />
                  </div>
                </button>

                <AnimatePresence>
                  {isAuditOpen && (
                    <motion.div
                      id={`audit-framework-${proj.id}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden mt-3"
                    >
                      <div className="rounded-xl bg-zinc-50/90 dark:bg-white/[0.02] border border-zinc-200/80 dark:border-white/[0.06] p-5 sm:p-6 space-y-4">
                        {/* 01. Question & 02. Evidence */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <span className="text-xs font-semibold text-zinc-900 dark:text-white flex items-center gap-1.5">
                              <span className="text-sky-600 dark:text-sky-400 font-mono-code text-[11px]">01</span> Question
                            </span>
                            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                              {proj.question}
                            </p>
                          </div>
                          <div className="space-y-1">
                            <span className="text-xs font-semibold text-zinc-900 dark:text-white flex items-center gap-1.5">
                              <span className="text-zinc-400 dark:text-zinc-500 font-mono-code text-[11px]">02</span> Evidence
                            </span>
                            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                              {proj.evidence}
                            </p>
                          </div>
                        </div>

                        {/* 03. Result */}
                        <div className="space-y-1 pt-2 border-t border-zinc-200/60 dark:border-white/[0.04]">
                          <span className="text-xs font-semibold text-zinc-900 dark:text-white flex items-center gap-1.5">
                            <span className="text-sky-600 dark:text-sky-400 font-mono-code text-[11px]">03</span> Result
                          </span>
                          <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                            {proj.result}
                          </p>
                        </div>

                        {/* 04. Recommendation */}
                        <div className="p-3.5 rounded-lg bg-emerald-500/5 dark:bg-emerald-500/[0.06] border border-emerald-500/20 space-y-1">
                          <div className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                            <span className="text-[11px] font-mono-code font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                              04 · Recommendation
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed font-medium">
                            {proj.recommendation}
                          </p>
                        </div>

                        {/* 05. Limitation */}
                        <div className="flex items-start gap-2 pt-1 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                          <span className="font-mono-code text-[10px] uppercase font-semibold text-amber-700 dark:text-amber-400/90 shrink-0 mt-0.5">
                            05 · Limitation:
                          </span>
                          <p className="text-xs text-zinc-600 dark:text-zinc-400">
                            {proj.limitation}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </article>
          );
        })}
      </div>

      {/* Project Archive Section */}
      <div className="mt-20 pt-12 border-t border-zinc-200/80 dark:border-white/[0.08]">
        <div className="mb-6">
          <p className="section-label mb-2">Secondary Portfolio &amp; Tooling</p>
          <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Project Archive &amp; Independent Audits
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ARCHIVE_PROJECTS.map((p, idx) => (
            <div
              key={idx}
              className="card-surface p-5 rounded-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span className="text-[10px] font-mono-code text-sky-600 dark:text-sky-400 font-medium">
                    {p.category}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-white mb-1.5">
                  {p.title}
                </h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed mb-3">
                  {p.summary}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1 mb-4">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono-code px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-white/[0.04] text-zinc-600 dark:text-zinc-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3 pt-2 border-t border-zinc-200 dark:border-white/[0.06]">
                  {p.live && (
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono-code text-sky-600 dark:text-sky-400 hover:underline inline-flex items-center gap-1"
                    >
                      <span>Live App</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  )}
                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono-code text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white inline-flex items-center gap-1"
                    >
                      <Github className="w-2.5 h-2.5" />
                      <span>Code</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Accessible Full-Screen Lightbox Dialog */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            key="lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.15 }}
            className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-md"
            onClick={closeLightbox}
          >
            <motion.div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-label={lightboxImage.title}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
              animate={shouldReduceMotion ? { opacity: 1, scale: 1, transition: { duration: 0.18, ease: [0.16, 1, 0.3, 1] } } : { opacity: 1, scale: 1 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, transition: { duration: 0.14 } }}
              className="relative max-w-5xl w-full rounded-2xl bg-white dark:bg-[#11131C] border border-zinc-200 dark:border-white/10 shadow-2xl overflow-hidden p-4 sm:p-6 text-zinc-900 dark:text-white"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Lightbox Header */}
              <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-white/10 mb-4">
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-white truncate max-w-[80%]">
                  {lightboxImage.title}
                </h3>
                <button
                  ref={modalCloseBtnRef}
                  type="button"
                  onClick={closeLightbox}
                  aria-label="Close enlarged preview (Escape)"
                  className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-white/10 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Lightbox Image */}
              <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-[75vh] rounded-xl overflow-hidden bg-zinc-100 dark:bg-black border border-zinc-200/80 dark:border-white/[0.08]">
                <Image
                  src={lightboxImage.src}
                  alt={lightboxImage.alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>

              <div className="pt-3 flex items-center justify-between text-xs font-mono-code text-zinc-500 dark:text-zinc-400">
                <span>{lightboxImage.alt}</span>
                <span>Press Esc to close</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

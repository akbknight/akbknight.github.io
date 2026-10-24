"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { Github, ExternalLink, Maximize2, X, BookOpen, Database, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { ProjectPipelineFigure } from "@/components/ProjectPipelineFigure";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

interface FeaturedProject {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  problem: string;
  contribution: string;
  result: string;
  tech: string[];
  github: string;
  live: string;
  caseStudy?: { label: string; url: string };
  image?: string;
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
    title: "IRS 990 Philanthropic Grant Miner & Spatial Engine",
    subtitle: "Streaming XML parser & DuckDB columnar warehouse for $550B+ in charitable capital flows",
    category: "Public Data Engineering & Spatial Analytics",
    problem:
      "Public IRS Form 990 tax filings are distributed as multi-gigabyte unindexed XML archives without relational structure or geographic coordinates, making cross-foundation capital tracking prohibitively difficult for researchers and grant analysts.",
    contribution:
      "Engineered an in-memory streaming SAX parser in Python to process multi-gigabyte XML archives without disk spill. Normalized relational schemas in DuckDB and built an interactive dashboard with 3D WebGL capital flow arcs and state choropleths.",
    result:
      "Standardized schemas in DuckDB enable sub-second OLAP query execution across 500,000+ standardized grant records with zero external runtime API costs or database hosting fees.",
    tech: ["Python", "DuckDB", "Three.js / Globe.gl", "D3 TopoJSON", "AWS S3 Open Data"],
    image: "/projects/irs990.png",
    imageAlt: "IRS 990 Grant Miner live dashboard showing 3D WebGL capital flow arcs and U.S. choropleth",
    github: "https://github.com/akbknight/irs990-grant-dashboard",
    live: "https://akbknight.github.io/irs990-grant-dashboard/",
    caseStudy: {
      label: "Architecture Case Study",
      url: "https://github.com/akbknight/form990-grant-miner/blob/main/docs/architecture.md",
    },
    hasHairlineFigure: true,
  },
  {
    id: "retail-forecast",
    number: "02",
    title: "U.S. Retail Demand Forecasting Engine",
    subtitle: "18-month forward retail sales projection with walk-forward holdout validation",
    category: "Econometric Modeling & Time-Series Statistics",
    problem:
      "Retail inventory planners and operations teams need reliable medium-term demand forecasts that account for macroeconomic trends, seasonality, and historical shocks rather than static linear extrapolations.",
    contribution:
      "Formulated state-space ETS(A,A,A) and Holt-Winters exponential smoothing models in Python using statsmodels on Federal Reserve FRED data. Integrated walk-forward holdout validation and built an interactive browser backtesting studio.",
    result:
      "Achieved ~2.0% Mean Absolute Percentage Error (MAPE) across 24-month walk-forward holdout backtesting, with analytical 80% and 95% prediction intervals evaluated against MAE ($10.8B) and RMSE ($13.2B) benchmark baselines.",
    tech: ["Python", "statsmodels", "Pandas", "FRED API", "Chart.js"],
    image: "/projects/retail-forecast.png",
    imageAlt: "U.S. Retail Demand Forecasting Engine showing 18-month projected sales and confidence intervals",
    github: "https://github.com/akbknight/us-retail-sales-forecast",
    live: "https://akbknight.github.io/us-retail-sales-forecast/",
    caseStudy: {
      label: "Forecasting Methodology Report",
      url: "https://github.com/akbknight/us-retail-sales-forecast/blob/main/docs/methodology.md",
    },
  },
  {
    id: "scheduling-optimizer",
    number: "03",
    title: "Consular Facility & Resource Scheduling Simulator",
    subtitle: "Greedy constraint-satisfaction engine for diplomatic facility booking",
    category: "Operations Research & Algorithmic Simulation",
    problem:
      "Independent algorithmic simulation evaluating multi-departmental conference room and security clearance scheduling for high-security diplomatic facilities. (Independent simulation inspired by operational challenges observed during consular service; not an official government deployment).",
    contribution:
      "Designed and implemented a priority-based greedy constraint-satisfaction scheduling engine in JavaScript allocating synthetic meeting requests across 20 secure conference rooms and 150 personnel with tiered security clearances.",
    result:
      "Allocates all 180 synthetic constraint sets with zero room double-bookings or security clearance violations in under 2 seconds during client-side benchmark execution.",
    tech: ["JavaScript", "Greedy CSP", "Three.js", "Chart.js"],
    image: "/projects/scheduling-optimizer.png",
    imageAlt: "Consular Resource and Scheduling Optimizer showing 3D room occupancy matrix",
    github: "https://github.com/akbknight/scheduling-optimizer",
    live: "https://akbknight.github.io/scheduling-optimizer/",
    caseStudy: {
      label: "Simulation Benchmarks & README",
      url: "https://github.com/akbknight/scheduling-optimizer#benchmark-results",
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
    title: "Consular Appointment Forecaster (Simulation)",
    category: "Operations Modeling",
    summary:
      "Synthetic simulation prototype modeling seasonal non-immigrant visa appointment demand across diplomatic posts using historical queue dynamics.",
    contribution:
      "Built interactive Streamlit simulation modeling daily appointment slot allocations and seasonal throughput limits.",
    tech: ["Python", "Streamlit", "Pandas", "Plotly"],
    github: "https://github.com/akbknight/consular-appointment-forecaster",
    live: "https://akbknight.github.io/consular-appointment-forecaster/",
  },
];

export const Projects = () => {
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string; title: string } | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const modalCloseBtnRef = useRef<HTMLButtonElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const closeLightbox = useCallback(() => {
    setLightboxImage(null);
    setTimeout(() => {
      triggerRef.current?.focus();
    }, 50);
  }, []);

  // Accessible Lightbox Dialog: Focus Trap, Escape Key, and Scroll Lock
  useEffect(() => {
    if (!lightboxImage) return;

    // Lock page scrolling
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Set initial focus to close button
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
    <section id="work" className="py-16 sm:py-24 border-b border-zinc-200/80 dark:border-white/[0.08]">
      {/* Section Header */}
      <div className="mb-12 sm:mb-16">
        <p className="section-label mb-3">01 · Selected Systems &amp; Evidence</p>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Featured Engineering &amp; Analytics Projects
        </h2>
        <p className="mt-2 text-sm sm:text-base text-zinc-600 dark:text-zinc-300 max-w-2xl">
          Three representative systems connecting unindexed public records, econometric forecasting, and operations research to measurable outcomes.
        </p>
      </div>

      {/* Flagship Projects: Spacious, Individual Compositions */}
      <div className="space-y-20 sm:space-y-28">
        {FEATURED_PROJECTS.map((proj) => (
          <article
            key={proj.id}
            id={`project-${proj.id}`}
            className="apple-glass-card rounded-3xl p-6 sm:p-10 lg:p-12 space-y-8"
          >
            {/* Project Header & Category */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-mono-code font-semibold px-2.5 py-1 rounded-md bg-sky-500/10 text-sky-700 dark:text-sky-400 border border-sky-500/20">
                  {proj.category}
                </span>
                <span className="text-xs font-mono-code text-zinc-400 dark:text-zinc-400">
                  Project {proj.number} of 03
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white pt-1">
                {proj.title}
              </h3>

              <p className="text-sm sm:text-base font-medium text-zinc-600 dark:text-zinc-300 leading-snug">
                {proj.subtitle}
              </p>
            </div>

            {/* Structured Narrative: Problem, Contribution, Supported Result */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="space-y-2 p-5 rounded-2xl bg-zinc-50/80 dark:bg-white/[0.02] border border-zinc-200/60 dark:border-white/[0.05]">
                <h4 className="text-xs font-mono-code uppercase tracking-wider font-semibold text-zinc-500 dark:text-zinc-400">
                  01 · The Problem
                </h4>
                <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  {proj.problem}
                </p>
              </div>

              <div className="space-y-2 p-5 rounded-2xl bg-zinc-50/80 dark:bg-white/[0.02] border border-zinc-200/60 dark:border-white/[0.05]">
                <h4 className="text-xs font-mono-code uppercase tracking-wider font-semibold text-sky-600 dark:text-sky-400">
                  02 · My Contribution
                </h4>
                <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  {proj.contribution}
                </p>
              </div>

              <div className="space-y-2 p-5 rounded-2xl bg-zinc-50/80 dark:bg-white/[0.02] border border-zinc-200/60 dark:border-white/[0.05]">
                <h4 className="text-xs font-mono-code uppercase tracking-wider font-semibold text-emerald-600 dark:text-emerald-400">
                  03 · Result
                </h4>
                <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  {proj.result}
                </p>
              </div>
            </div>

            {/* Dedicated Visual Presentation: Hairline Figure for Project 1; High-Res Diagrams for Projects 2 & 3 */}
            {proj.hasHairlineFigure ? (
              <div className="space-y-3 pt-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h4 className="text-xs font-mono-code uppercase tracking-wider font-semibold text-zinc-500 dark:text-zinc-400">
                    System Architecture &amp; Data Pipeline Stages
                  </h4>
                  {proj.image && (
                    <button
                      type="button"
                      onClick={(e) =>
                        openLightbox(
                          { src: proj.image!, alt: proj.imageAlt!, title: proj.title },
                          e.currentTarget
                        )
                      }
                      className="inline-flex items-center gap-1.5 text-xs text-sky-600 dark:text-sky-400 hover:underline font-mono-code cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded p-1"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>View Live HUD Screenshot</span>
                    </button>
                  )}
                </div>

                {/* Compact Apple-style Horizontal Pipeline Inspector */}
                <ProjectPipelineFigure />
              </div>
            ) : proj.image ? (
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-mono-code uppercase tracking-wider font-semibold text-zinc-500 dark:text-zinc-400">
                    Analytical Preview &amp; Output Diagram
                  </h4>
                  <button
                    type="button"
                    onClick={(e) =>
                      openLightbox(
                        { src: proj.image!, alt: proj.imageAlt!, title: proj.title },
                        e.currentTarget
                      )
                    }
                    className="inline-flex items-center gap-1.5 text-xs text-sky-600 dark:text-sky-400 hover:underline font-mono-code cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded p-1"
                    aria-label={`Enlarge diagram for ${proj.title}`}
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Click to enlarge diagram</span>
                  </button>
                </div>

                <div
                  className="group relative w-full rounded-2xl overflow-hidden border border-zinc-200/80 dark:border-white/[0.08] bg-zinc-950 cursor-pointer shadow-sm"
                  onClick={(e) => {
                    const btn = e.currentTarget.parentElement?.querySelector("button");
                    if (btn) openLightbox({ src: proj.image!, alt: proj.imageAlt!, title: proj.title }, btn);
                  }}
                >
                  <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] max-h-[380px]">
                    <Image
                      src={proj.image}
                      alt={proj.imageAlt ?? proj.title}
                      fill
                      className="object-cover object-center transition-transform duration-300 group-hover:scale-[1.01]"
                      sizes="(max-width: 1024px) 100vw, 980px"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-xs font-mono-code text-white bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded-md">
                      Click to expand full resolution
                    </span>
                  </div>
                </div>
              </div>
            ) : null}

            {/* Footer: Tech Stack Badges & Project Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-zinc-200/80 dark:border-white/[0.06]">
              {/* Tech Badges */}
              <div className="flex flex-wrap items-center gap-1.5">
                {proj.tech.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] font-mono-code px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-white/[0.04] text-zinc-700 dark:text-zinc-300 border border-zinc-200/60 dark:border-white/[0.06]"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Action Links */}
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={proj.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-medium transition-all shadow-xs active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                >
                  <span>Launch Live System</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <a
                  href={proj.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-zinc-300 dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-medium transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                </a>

                {proj.caseStudy && (
                  <a
                    href={proj.caseStudy.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-mono-code text-zinc-500 dark:text-zinc-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors p-1"
                  >
                    <span>{proj.caseStudy.label}</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
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
              className="p-5 rounded-2xl border border-zinc-200/80 dark:border-white/[0.08] bg-zinc-50/60 dark:bg-[#0A0A0F] flex flex-col justify-between"
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
              animate={shouldReduceMotion ? { opacity: 1, transition: { duration: 0 } } : { opacity: 1, scale: 1, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } }}
              exit={shouldReduceMotion ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, scale: 0.96, transition: { duration: 0.15 } }}
              className="relative max-w-5xl w-full rounded-2xl bg-zinc-950 border border-white/10 shadow-2xl overflow-hidden p-4 sm:p-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Lightbox Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <h3 className="text-sm font-medium text-white truncate max-w-[80%]">
                  {lightboxImage.title}
                </h3>
                <button
                  ref={modalCloseBtnRef}
                  type="button"
                  onClick={closeLightbox}
                  aria-label="Close enlarged preview (Escape)"
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Lightbox Image */}
              <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-[75vh] rounded-xl overflow-hidden bg-black">
                <Image
                  src={lightboxImage.src}
                  alt={lightboxImage.alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>

              <div className="pt-3 flex items-center justify-between text-xs font-mono-code text-zinc-400">
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

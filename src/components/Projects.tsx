"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Github, ExternalLink, Maximize2, X, BookOpen, Database } from "lucide-react";
import { SpotlightCard } from "@/components/SpotlightCard";
import { ProjectPipelineFigure } from "@/components/ProjectPipelineFigure";
import { AnimatePresence, motion } from "framer-motion";

interface FeaturedProject {
  title: string;
  projectType: string;
  tagline: string;
  explanation: string;
  contribution: string;
  results: string;
  sourceData?: { label: string; url: string };
  caseStudy?: { label: string; url: string };
  tech: string[];
  image: string;
  imageAlt: string;
  github: string;
  live: string;
}

interface ArchiveProject {
  title: string;
  projectType: string;
  category: "Data Pipelines" | "Macroeconomics" | "Enterprise Systems";
  summary: string;
  contribution: string;
  tech: string[];
  github: string | null;
  live: string | null;
}

const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    title: "IRS 990 Philanthropic Grant Miner & Spatial Engine",
    projectType: "Independent Project · Public Data Engineering",
    tagline: "Streaming parser and spatial intelligence for U.S. nonprofit grant flows",
    explanation:
      "Public IRS Form 990 tax filings are distributed as multi-gigabyte XML archives without relational structure or geographic coordinates. This system was built for researchers, grant analysts, and donors to trace charitable funding across foundations and U.S. nonprofits without commercial software licenses.",
    contribution:
      "Engineered an in-memory streaming SAX parser in Python to process multi-gigabyte XML dumps without disk spill. Designed normalized schemas in DuckDB and built an interactive dashboard with 3D WebGL capital flow arcs and state choropleths.",
    results:
      "Standardized relational schemas in DuckDB enable sub-second OLAP query execution across 500,000+ standardized grant records. Ingested 9.7M+ tax filings mapping $550.2B in charitable funding across 200,000+ nonprofit organizations with zero external runtime API costs.",
    sourceData: {
      label: "AWS Open Data IRS 990 Registry",
      url: "https://registry.opendata.aws/irs990/",
    },
    caseStudy: {
      label: "Architecture Case Study",
      url: "https://github.com/akbknight/form990-grant-miner/blob/main/docs/architecture.md",
    },
    tech: ["Python", "DuckDB", "Three.js / Globe.gl", "D3 TopoJSON", "Plotly.js"],
    image: "/projects/irs990.png",
    imageAlt: "IRS 990 Grant Miner live dashboard showing 3D WebGL capital flow arcs and U.S. choropleth",
    github: "https://github.com/akbknight/irs990-grant-dashboard",
    live: "https://akbknight.github.io/irs990-grant-dashboard/",
  },
  {
    title: "U.S. Retail Demand Forecasting Engine",
    projectType: "Independent Project · Econometric Forecasting",
    tagline: "18-month forward retail sales projection with holdout backtesting",
    explanation:
      "Retail inventory planners and operations teams need reliable medium-term demand forecasts that account for macroeconomic trends, seasonality, and historical shocks rather than static linear extrapolations.",
    contribution:
      "Formulated state-space ETS(A,A,A) and Holt-Winters exponential smoothing models in Python using statsmodels. Ingested 26+ years (320 months) of monthly retail sales data from the Federal Reserve Economic Data (FRED) API and built an interactive browser studio for walk-forward backtesting.",
    results:
      "Achieved ~2.0% Mean Absolute Percentage Error (MAPE) across 24-month walk-forward backtesting against actual Federal Reserve historical data, with analytical 80% and 95% prediction intervals evaluated alongside MAE and RMSE baselines.",
    sourceData: {
      label: "Federal Reserve FRED RSXFS Series",
      url: "https://fred.stlouisfed.org/series/RSXFS",
    },
    caseStudy: {
      label: "Forecasting Methodology Report",
      url: "https://github.com/akbknight/us-retail-sales-forecast/blob/main/docs/methodology.md",
    },
    tech: ["Python", "statsmodels", "Pandas", "FRED API", "Chart.js"],
    image: "/projects/retail-forecast.png",
    imageAlt: "U.S. Retail Demand Forecasting Engine showing 18-month projected sales and confidence intervals",
    github: "https://github.com/akbknight/us-retail-sales-forecast",
    live: "https://akbknight.github.io/us-retail-sales-forecast/",
  },
  {
    title: "Consular Facility & Resource Scheduling Simulator",
    projectType: "Independent Simulation · Operations Research",
    tagline: "Greedy constraint-satisfaction engine for diplomatic facility booking",
    explanation:
      "An independent algorithmic simulation evaluating multi-departmental conference room and security clearance scheduling for high-security diplomatic facilities. (Independent simulation inspired by operational challenges observed during consular service; not an official government deployment).",
    contribution:
      "Designed and implemented a priority-based greedy constraint-satisfaction scheduling engine in JavaScript allocating 180 synthetic meeting requests across 20 secure conference rooms and 150 personnel with tiered security clearances.",
    results:
      "Allocates 180 synthetic constraint sets with zero room double-bookings or security clearance violations in under 2 seconds during client-side benchmark execution.",
    caseStudy: {
      label: "Simulation Benchmarks & README",
      url: "https://github.com/akbknight/scheduling-optimizer#benchmark-results",
    },
    tech: ["JavaScript", "Greedy CSP", "Three.js", "Chart.js"],
    image: "/projects/scheduling-optimizer.png",
    imageAlt: "Consular Resource and Scheduling Optimizer showing 3D room occupancy matrix",
    github: "https://github.com/akbknight/scheduling-optimizer",
    live: "https://akbknight.github.io/scheduling-optimizer/",
  },
];

const ARCHIVE_PROJECTS: ArchiveProject[] = [
  {
    title: "Deborah Organization Research Assistant",
    projectType: "Independent Project",
    category: "Data Pipelines",
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
    projectType: "Independent Tool",
    category: "Data Pipelines",
    summary:
      "Automated resume compilation tool enforcing structural invariants, STAR-quantified bullet formatting, and single-source-of-truth YAML editing.",
    contribution:
      "Built AST parsing and automated schema validation tests to ensure deterministic output compilation.",
    tech: ["Python", "AST Parsing", "YAML", "ReportLab"],
    github: "https://github.com/akbknight/master-resume-engineer",
    live: "https://akbknight.github.io/master-resume-engineer/",
  },
  {
    title: "Economic Anomaly Detection Monitor",
    projectType: "Independent Project",
    category: "Macroeconomics",
    summary:
      "Three-algorithm statistical anomaly detection system (Z-Score, IQR, CUSUM) applied across 26 years of Federal Reserve macroeconomic indicators.",
    contribution:
      "Programmed statistical detection baselines in Python to identify historic shock periods including the 2008 GFC and 2020 pandemic downturn.",
    tech: ["Python", "scipy", "Pandas", "Chart.js"],
    github: "https://github.com/akbknight/anomaly-detection-monitor",
    live: "https://akbknight.github.io/anomaly-detection-monitor/",
  },
  {
    title: "Macroeconomic Policy Scenario Simulator",
    projectType: "Independent Project",
    category: "Macroeconomics",
    summary:
      "Interactive 'what-if' policy tool modeling how Federal Reserve interest rate, CPI, and unemployment adjustments impact GDP growth and recession probabilities.",
    contribution:
      "Implemented client-side econometric formulas and responsive chart visualizations tied to historical FRED series.",
    tech: ["JavaScript", "Chart.js", "HTML5"],
    github: "https://github.com/akbknight/economic-scenario-analysis",
    live: "https://akbknight.github.io/economic-scenario-analysis/",
  },
  {
    title: "ITEC-617 Digital Transformation Simulation Coach",
    projectType: "Academic Project · MBA Coursework",
    category: "Enterprise Systems",
    summary:
      "Autonomous C-suite evaluation simulation for MBA technology proposals, scoring 9 executive personas across 45 criteria grounded in 4 years of competition judge feedback.",
    contribution:
      "Structured evaluation scoring logic, weighted rubrics, and interactive web dashboard for student teams.",
    tech: ["JavaScript", "SVG", "Interactive Rubrics"],
    github: "https://github.com/akbknight/ITEC-617-Digital-Transformation-Project",
    live: "https://akbknight.github.io/ITEC-617-Digital-Transformation-Project/",
  },
  {
    title: "Data Pipeline Validation Framework",
    projectType: "Independent Tool",
    category: "Enterprise Systems",
    summary:
      "Data integrity test harness executing 7 validation categories (completeness, referential integrity, schema drift) across enterprise sources.",
    contribution:
      "Built automated dataset health scoring and summary visualization in Python.",
    tech: ["Python", "Pandas", "HTML", "Chart.js"],
    github: "https://github.com/akbknight/data-pipeline-validator",
    live: "https://akbknight.github.io/data-pipeline-validator/",
  },
  {
    title: "Tour & Travel Relational Management System",
    projectType: "Academic Project · B.Tech Coursework",
    category: "Enterprise Systems",
    summary:
      "Relational booking and customer itinerary management database engineered in Microsoft SQL Server Management Studio.",
    contribution:
      "Designed a 3NF normalized schema with 5 foreign key constraints and built a Python database explorer interface.",
    tech: ["Python", "MS SQL Server", "pyodbc", "Tkinter"],
    github: "https://github.com/akbknight/System-for-Tour-and-Travel-Management",
    live: "https://akbknight.github.io/System-for-Tour-and-Travel-Management/",
  },
  {
    title: "Weathery Node.js CLI Weather Tool",
    projectType: "Independent Tool",
    category: "Data Pipelines",
    summary:
      "Terminal weather utility integrating live OpenWeatherMap API data with formatted ASCII summaries and forecast cards.",
    contribution:
      "Developed CLI interface using Inquirer prompts and Chalk formatting.",
    tech: ["Node.js", "Inquirer", "Chalk", "Boxen"],
    github: "https://github.com/akbknight/weather-cli-nodejs",
    live: "https://akbknight.github.io/weather-cli-nodejs/",
  },
];

export const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [enlargedImage, setEnlargedImage] = useState<{ src: string; alt: string; title: string } | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && enlargedImage) {
        setEnlargedImage(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [enlargedImage]);

  const categories = ["All", "Data Pipelines", "Macroeconomics", "Enterprise Systems"];
  const filteredArchive = ARCHIVE_PROJECTS.filter(
    (p) => selectedCategory === "All" || p.category === selectedCategory
  );

  return (
    <section id="projects" className="pt-2">
      {/* Section Header */}
      <div className="mb-8">
        <span className="section-label">03 · Featured Projects</span>
        <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white mt-1">
          Three flagship data systems built for decision support.
        </h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 max-w-2xl leading-relaxed">
          Each system addresses a real-world data engineering, forecasting, or resource allocation challenge with verifiable results and working live interfaces.
        </p>
      </div>

      {/* ── Flagship Project 1: IRS 990 Grant Miner (Full-Width Showcase) ── */}
      {(() => {
        const p = FEATURED_PROJECTS[0];
        return (
          <SpotlightCard className="p-6 sm:p-8 rounded-2xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-[#0D0D13] shadow-sm mb-10">
            {/* Header & Badges */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span className="text-xs font-mono-code font-semibold px-2.5 py-0.5 rounded bg-sky-500/10 text-sky-700 dark:text-sky-400 border border-sky-500/20">
                {p.projectType}
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={p.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Launch IRS 990 Philanthropic Grant Miner live system"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white dark:bg-sky-400 dark:hover:bg-sky-300 dark:text-zinc-950 text-xs font-semibold tracking-tight transition-colors shadow-xs"
                >
                  <span>Launch Live System</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View IRS 990 source code on GitHub"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-mono-code transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>Source Code</span>
                </a>
              </div>
            </div>

            <h4 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white leading-snug">
              {p.title}
            </h4>
            <p className="text-xs font-mono-code text-sky-700 dark:text-sky-400 mt-1 mb-4">
              {p.tagline}
            </p>

            {/* Simplified 3-Column Structured Explanation */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5 p-4 rounded-xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200/60 dark:border-white/5 text-xs">
              <div>
                <p className="font-semibold text-zinc-900 dark:text-zinc-200 font-mono-code uppercase text-[11px] mb-1">
                  Problem &amp; Scope
                </p>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {p.explanation}
                </p>
              </div>
              <div>
                <p className="font-semibold text-zinc-900 dark:text-zinc-200 font-mono-code uppercase text-[11px] mb-1">
                  My Contribution
                </p>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {p.contribution}
                </p>
              </div>
              <div>
                <p className="font-semibold text-zinc-900 dark:text-zinc-200 font-mono-code uppercase text-[11px] mb-1">
                  Results
                </p>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-2">
                  {p.results}
                </p>
                {/* Method / Source Links */}
                <div className="flex flex-col gap-1 pt-1.5 border-t border-zinc-200/60 dark:border-white/5">
                  {p.sourceData && (
                    <a
                      href={p.sourceData.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-mono-code text-sky-600 dark:text-sky-400 hover:underline"
                    >
                      <Database className="w-3 h-3" />
                      <span>{p.sourceData.label} ↗</span>
                    </a>
                  )}
                  {p.caseStudy && (
                    <a
                      href={p.caseStudy.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-mono-code text-sky-600 dark:text-sky-400 hover:underline"
                    >
                      <BookOpen className="w-3 h-3" />
                      <span>{p.caseStudy.label} ↗</span>
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pt-2 border-t border-zinc-100 dark:border-white/5">
              <div className="flex flex-wrap gap-1">
                {p.tech.map((t) => (
                  <span key={t} className="tech-pill">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Visual Section: Unstretched Screenshot (with larger view option) + Pipeline Architecture Figure */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pt-1 items-start">
              {/* Output Preview with Natural Height and Enlarge Option */}
              <div className="rounded-xl border border-zinc-200/80 dark:border-zinc-800 overflow-hidden bg-zinc-100 dark:bg-[#07080B] flex flex-col">
                <div
                  className="relative aspect-[16/10] w-full overflow-hidden group cursor-pointer"
                  onClick={() => setEnlargedImage({ src: p.image, alt: p.imageAlt, title: p.title })}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setEnlargedImage({ src: p.image, alt: p.imageAlt, title: p.title });
                    }
                  }}
                  aria-label="Enlarge IRS 990 dashboard preview"
                >
                  <Image
                    src={p.image}
                    alt={p.imageAlt}
                    fill
                    loading="eager"
                    className="object-cover object-top transition-transform duration-200 group-hover:scale-[1.02]"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity px-2.5 py-1 rounded bg-black/80 text-white text-[11px] font-mono-code flex items-center gap-1.5 shadow-md">
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Click to view larger</span>
                    </span>
                  </div>
                </div>
                <div className="p-2.5 px-3 border-t border-zinc-200/80 dark:border-zinc-800 flex items-center justify-between text-[11px] text-zinc-600 dark:text-zinc-400 font-mono-code">
                  <span>Live Interface: 3D Arcs &amp; Recipient Ledger</span>
                  <button
                    type="button"
                    onClick={() => setEnlargedImage({ src: p.image, alt: p.imageAlt, title: p.title })}
                    className="text-sky-600 dark:text-sky-400 hover:underline cursor-pointer flex items-center gap-1 font-medium"
                  >
                    <span>View Larger</span>
                    <Maximize2 className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Reworked 2x2 Non-Overlapping Pipeline Architecture Schematic */}
              <div className="w-full">
                <ProjectPipelineFigure />
              </div>
            </div>
          </SpotlightCard>
        );
      })()}

      {/* ── Flagship Projects 2 & 3: Retail Demand Forecast & Scheduling Optimizer ── */}
      <div className="space-y-8 mb-12">
        {FEATURED_PROJECTS.slice(1).map((p) => (
          <SpotlightCard
            key={p.title}
            className="p-6 sm:p-8 rounded-2xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-[#0D0D13] shadow-sm"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Visual Screenshot Preview with Enlarge Option */}
              <div className="lg:col-span-5 rounded-xl border border-zinc-200/80 dark:border-zinc-800 overflow-hidden bg-zinc-100 dark:bg-[#07080B] flex flex-col">
                <div
                  className="relative aspect-[16/10] w-full overflow-hidden group cursor-pointer"
                  onClick={() => setEnlargedImage({ src: p.image, alt: p.imageAlt, title: p.title })}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setEnlargedImage({ src: p.image, alt: p.imageAlt, title: p.title });
                    }
                  }}
                  aria-label={`Enlarge preview for ${p.title}`}
                >
                  <Image
                    src={p.image}
                    alt={p.imageAlt}
                    fill
                    loading="eager"
                    className="object-cover object-top transition-transform duration-200 group-hover:scale-[1.02]"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity px-2.5 py-1 rounded bg-black/80 text-white text-[11px] font-mono-code flex items-center gap-1.5 shadow-md">
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Click to view larger</span>
                    </span>
                  </div>
                </div>
                <div className="p-2.5 px-3 border-t border-zinc-200/80 dark:border-zinc-800 flex items-center justify-between text-[11px] text-zinc-600 dark:text-zinc-400 font-mono-code">
                  <span className="truncate pr-2">{p.tagline}</span>
                  <button
                    type="button"
                    onClick={() => setEnlargedImage({ src: p.image, alt: p.imageAlt, title: p.title })}
                    className="text-sky-600 dark:text-sky-400 hover:underline cursor-pointer flex items-center gap-1 shrink-0 font-medium"
                  >
                    <span>View Larger</span>
                    <Maximize2 className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Right Column: Project Context, Contribution & Supported Results */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="mb-2">
                    <span className="text-xs font-mono-code font-semibold px-2.5 py-0.5 rounded bg-sky-500/10 text-sky-700 dark:text-sky-400 border border-sky-500/20">
                      {p.projectType}
                    </span>
                  </div>

                  <h4 className="text-xl font-bold text-zinc-900 dark:text-white leading-snug">
                    {p.title}
                  </h4>
                  <p className="text-xs font-mono-code text-sky-700 dark:text-sky-400 mt-1 mb-3">
                    {p.tagline}
                  </p>

                  <div className="space-y-2.5 text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed mb-4">
                    <p>
                      <strong className="text-zinc-900 dark:text-zinc-100 font-semibold font-mono-code">Problem &amp; scope: </strong>
                      {p.explanation}
                    </p>
                    <p>
                      <strong className="text-zinc-900 dark:text-zinc-100 font-semibold font-mono-code">My contribution: </strong>
                      {p.contribution}
                    </p>
                    <p>
                      <strong className="text-zinc-900 dark:text-zinc-100 font-semibold font-mono-code">Results: </strong>
                      {p.results}
                    </p>
                  </div>

                  {/* Supporting Methodology / Source Data Links */}
                  <div className="flex flex-wrap items-center gap-4 mb-4 pt-2 border-t border-zinc-100 dark:border-white/5">
                    {p.sourceData && (
                      <a
                        href={p.sourceData.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-mono-code text-sky-600 dark:text-sky-400 hover:underline"
                      >
                        <Database className="w-3 h-3" />
                        <span>{p.sourceData.label} ↗</span>
                      </a>
                    )}
                    {p.caseStudy && (
                      <a
                        href={p.caseStudy.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-mono-code text-sky-600 dark:text-sky-400 hover:underline"
                      >
                        <BookOpen className="w-3 h-3" />
                        <span>{p.caseStudy.label} ↗</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Bottom Actions & Tech */}
                <div className="pt-3 border-t border-zinc-100 dark:border-white/5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1">
                    {p.tech.map((t) => (
                      <span key={t} className="tech-pill">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Launch live system for ${p.title}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white dark:bg-sky-400 dark:hover:bg-sky-300 dark:text-zinc-950 text-xs font-semibold tracking-tight transition-colors shadow-xs"
                    >
                      <span>Launch Live System</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${p.title} source code on GitHub`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-mono-code transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Code</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </SpotlightCard>
        ))}
      </div>

      {/* ── Project Archive & Specialized Tooling ── */}
      <div className="pt-6 border-t border-zinc-200 dark:border-white/[0.08]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h4 className="text-base font-bold text-zinc-900 dark:text-white">
              Project Archive &amp; Specialized Tools
            </h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Filterable directory of audited utilities, macroeconomic models, and forensic tools.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-mono-code px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-sky-100 text-sky-800 border border-sky-300 dark:bg-sky-500/20 dark:text-sky-300 dark:border-sky-500/40 font-semibold"
                    : "bg-zinc-100 dark:bg-zinc-900/60 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 border border-zinc-200 dark:border-zinc-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Clean Archive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {filteredArchive.map((p) => (
            <div
              key={p.title}
              className="p-4 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#0D0D13] shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-[11px] font-mono-code text-zinc-500 dark:text-zinc-400">
                    {p.projectType} · {p.category}
                  </span>
                  <div className="flex items-center gap-2">
                    {p.github && (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View source code for ${p.title} on GitHub`}
                        className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {p.live && (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Launch live demo of ${p.title}`}
                        className="text-zinc-500 hover:text-sky-600 dark:text-zinc-400 dark:hover:text-sky-400 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

                <h5 className="text-sm font-semibold text-zinc-900 dark:text-white">
                  {p.title}
                </h5>

                <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-2 leading-relaxed">
                  {p.summary}
                </p>

                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1.5 leading-relaxed italic">
                  Contribution: {p.contribution}
                </p>
              </div>

              <div className="flex flex-wrap gap-1 mt-3 pt-3 border-t border-zinc-100 dark:border-white/5">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-mono-code text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800/60 px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-800"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── High-Fidelity Lightbox Preview Modal ── */}
      <AnimatePresence>
        {enlargedImage && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${enlargedImage.title} preview`}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
              onClick={() => setEnlargedImage(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.18 }}
              className="relative z-10 max-w-5xl w-full max-h-[92vh] flex flex-col rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-900/90 text-xs font-mono-code text-zinc-300">
                <span className="font-semibold text-white">{enlargedImage.title} · Live Interface Preview</span>
                <button
                  onClick={() => setEnlargedImage(null)}
                  className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close enlarged preview"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-3 overflow-auto max-h-[82vh] flex items-center justify-center bg-black/95">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={enlargedImage.src}
                  alt={enlargedImage.alt}
                  className="max-h-[76vh] w-auto max-w-full object-contain rounded-lg border border-white/10 shadow-lg"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

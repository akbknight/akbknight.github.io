"use client";

import { useState } from "react";
import Image from "next/image";
import { Github, ExternalLink } from "lucide-react";
import { SpotlightCard } from "@/components/SpotlightCard";
import { ProjectPipelineFigure } from "@/components/ProjectPipelineFigure";

interface FeaturedProject {
  title: string;
  badge: string;
  projectType: string;
  tagline: string;
  overview: string;
  contribution: string;
  evidence: string;
  metrics: string[];
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
    badge: "$550B+ Capital Mapped",
    projectType: "Independent Project · Public Data Engineering",
    tagline: "Large-Scale Public Data Engineering & 3D Spatial Intelligence",
    overview:
      "Ingests and normalizes 9.7M+ public IRS Form 990 tax records to track over $550 billion in charitable grants flowing between foundations and U.S. nonprofit organizations.",
    contribution:
      "Engineered an in-memory streaming SAX parser in Python to process multi-gigabyte XML dumps without disk spill. Modeled relational schemas into a DuckDB columnar warehouse and built an interactive dashboard with 3D WebGL capital arcs and state-level choropleths.",
    evidence:
      "Successfully processed 9.7M+ tax filings; achieves sub-second query latency across 500,000+ standardized grant records with zero external API dependencies.",
    metrics: [
      "9.7M+ XML Filings Processed",
      "$550B+ Charitable Funding",
      "Sub-Second DuckDB Queries",
      "Zero-API Client Runtime",
    ],
    tech: ["Python", "DuckDB", "Three.js / Globe.gl", "D3 TopoJSON", "Plotly.js"],
    image: "/projects/irs990.png",
    imageAlt: "IRS 990 Grant Miner live dashboard showing 3D WebGL capital flow arcs and U.S. choropleth",
    github: "https://github.com/akbknight/irs990-grant-dashboard",
    live: "https://akbknight.github.io/irs990-grant-dashboard/",
  },
  {
    title: "U.S. Retail Demand Forecasting Engine",
    badge: "Econometric Modeling",
    projectType: "Independent Project · Time-Series Forecasting",
    tagline: "18-Month Predictive Demand Forecasting on Federal Reserve Data",
    overview:
      "Generates 18-month forward predictive demand forecasts for U.S. Retail & Food Services Sales (RSXFS) to assist business inventory planning and macroeconomic scenario modeling.",
    contribution:
      "Developed Holt-Winters exponential smoothing and state-space ETS(A,A,A) models in Python and statsmodels using 26+ years (320 months) of monthly Federal Reserve (FRED) time-series data. Built an interactive browser-based tuning studio with walk-forward holdout backtesting.",
    evidence:
      "Achieved ~2.0% Mean Absolute Percentage Error (MAPE) across 24-month walk-forward backtesting against actual Federal Reserve historical data, evaluated alongside MAE and RMSE baselines.",
    metrics: [
      "320 Months FRED Data",
      "~2.0% Walk-Forward MAPE",
      "18-Month Forecast Horizon",
      "80% & 95% Confidence Bounds",
    ],
    tech: ["Python", "statsmodels", "Pandas", "FRED API", "Chart.js"],
    image: "/projects/retail-forecast.png",
    imageAlt: "U.S. Retail Demand Forecasting Engine showing 18-month projected sales and confidence intervals",
    github: "https://github.com/akbknight/us-retail-sales-forecast",
    live: "https://akbknight.github.io/us-retail-sales-forecast/",
  },
  {
    title: "Diplomatic Resource & Scheduling Optimizer",
    badge: "Operational Analytics",
    projectType: "Operational Project · Consular Operations Simulation",
    tagline: "Constraint-Satisfaction Engine for Diplomatic Facilities",
    overview:
      "Resolves complex multi-departmental conference room and security clearance scheduling conflicts for high-security diplomatic posts.",
    contribution:
      "Designed and implemented a greedy priority constraint-satisfaction scheduling engine allocating 180 high-priority meeting requests across 20 secure conference rooms and 150 cleared personnel. Included an interactive stress test simulating crisis surge loads.",
    evidence:
      "Directly addresses consular operational scheduling bottlenecks identified during U.S. Embassy service; allocates 180 constraint sets with zero room or security clearance conflicts in under 2 seconds.",
    metrics: [
      "180 Meeting Requests",
      "150 Cleared Personnel",
      "20 Secure Rooms",
      "Zero Double-Bookings",
    ],
    tech: ["JavaScript", "Greedy Algorithm", "Three.js", "Chart.js"],
    image: "/projects/scheduling-optimizer.png",
    imageAlt: "Diplomatic Resource and Scheduling Optimizer showing 3D room occupancy matrix",
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
      "Conducted a complete security audit across 62 legacy versions, eliminating SSRF DNS-rebinding vulnerabilities and adding automated CI/CD validation.",
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
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono-code font-semibold px-2.5 py-0.5 rounded bg-sky-500/10 text-sky-700 dark:text-sky-400 border border-sky-500/20">
                  {p.badge}
                </span>
                <span className="text-xs font-mono-code text-zinc-500 dark:text-zinc-400">
                  {p.projectType}
                </span>
              </div>
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

            {/* Structured Project Explanation (Plain English) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 rounded-xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200/60 dark:border-white/5 text-xs">
              <div>
                <p className="font-semibold text-zinc-900 dark:text-zinc-200 font-mono-code uppercase text-[11px] mb-1">
                  What It Does
                </p>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {p.overview}
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
                  Verified Evidence
                </p>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {p.evidence}
                </p>
              </div>
            </div>

            {/* Metrics & Tech Stack */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pt-3 border-t border-zinc-100 dark:border-white/5">
              <div className="flex flex-wrap gap-2">
                {p.metrics.map((m) => (
                  <span
                    key={m}
                    className="text-xs font-mono-code px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700/60"
                  >
                    ✓ {m}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-1">
                {p.tech.map((t) => (
                  <span key={t} className="tech-pill">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Dual Visual Evidence Area: Live Output Screenshot + Architecture Pipeline Schematic */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pt-2">
              {/* Output Preview */}
              <div className="rounded-xl border border-zinc-200/80 dark:border-zinc-800 overflow-hidden bg-zinc-100 dark:bg-[#07080B] flex flex-col justify-between">
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.imageAlt}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="p-3 border-t border-zinc-200/80 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-400 leading-normal font-mono-code">
                  Live System Interface: 3D WebGL capital arcs, state choropleth, and recipient ledger.
                </div>
              </div>

              {/* Reworked, Generous Pipeline Architecture Schematic */}
              <div className="w-full">
                <ProjectPipelineFigure />
              </div>
            </div>
          </SpotlightCard>
        );
      })()}

      {/* ── Flagship Projects 2 & 3: Retail Demand Forecast & Scheduling Optimizer ── */}
      <div className="space-y-8 mb-12">
        {FEATURED_PROJECTS.slice(1).map((p, idx) => (
          <SpotlightCard
            key={p.title}
            className="p-6 sm:p-8 rounded-2xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-[#0D0D13] shadow-sm"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Visual Screenshot Preview */}
              <div className="lg:col-span-5 rounded-xl border border-zinc-200/80 dark:border-zinc-800 overflow-hidden bg-zinc-100 dark:bg-[#07080B] flex flex-col justify-between">
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.imageAlt}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                </div>
                <div className="p-3 border-t border-zinc-200/80 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-400 leading-normal font-mono-code">
                  Rendered output: {p.tagline}
                </div>
              </div>

              {/* Right Column: Project Context, Contribution & Verified Results */}
              <div className="lg:col-span-7 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-mono-code font-semibold px-2.5 py-0.5 rounded bg-sky-500/10 text-sky-700 dark:text-sky-400 border border-sky-500/20">
                      {p.badge}
                    </span>
                    <span className="text-xs font-mono-code text-zinc-500 dark:text-zinc-400">
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
                      <strong className="text-zinc-900 dark:text-zinc-100 font-semibold font-mono-code">What it does: </strong>
                      {p.overview}
                    </p>
                    <p>
                      <strong className="text-zinc-900 dark:text-zinc-100 font-semibold font-mono-code">My contribution: </strong>
                      {p.contribution}
                    </p>
                    <p>
                      <strong className="text-zinc-900 dark:text-zinc-100 font-semibold font-mono-code">Evidence &amp; results: </strong>
                      {p.evidence}
                    </p>
                  </div>

                  {/* Metrics */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {p.metrics.map((m) => (
                      <span
                        key={m}
                        className="text-xs font-mono-code px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700/60"
                      >
                        ✓ {m}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions & Tech */}
                <div className="pt-4 border-t border-zinc-100 dark:border-white/5 flex flex-wrap items-center justify-between gap-3">
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
    </section>
  );
};

"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, Folder } from "lucide-react";

const FEATURED = [
  {
    title: "US Retail Sales Demand Forecast",
    description:
      "18-month forward forecast for US Retail & Food Services Sales using Holt-Winters triple exponential smoothing on Federal Reserve (FRED) data. Interactive dashboard with 80% and 95% predictive intervals, YoY growth analysis, and in-sample model diagnostics.",
    tech: ["Python", "statsmodels", "Pandas", "Chart.js"],
    impact: ["135 months of FRED data", "18-month horizon", "95% CI quantified"],
    github: "https://github.com/akbknight/us-retail-sales-forecast",
    live: "https://akbknight.github.io/us-retail-sales-forecast/",
  },
  {
    title: "IRS 990 Grant Dashboard",
    description:
      "End-to-end data pipeline mining 9.7M+ grant records from IRS Form 990 XML archives. Interactive dashboard mapping $550B+ in philanthropic giving across 2019–2024, classified by category and visualized with Chart.js.",
    tech: ["Python", "Pandas", "HTML", "Chart.js"],
    impact: ["9.7M+ records processed", "$550B+ mapped", "2019–2024 coverage"],
    github: "https://github.com/akbknight/irs990-grant-dashboard",
    live: "https://akbknight.github.io/irs990-grant-dashboard/",
  },
  {
    title: "MBA Admissions Funnel Dashboard",
    description:
      "Real-time Kogod MBA admissions analytics tracking YoY enrollment trends across programs, formats, and rounds. File-date-anchored funnel logic compares Fall 2026 vs Fall 2025 cohorts, with AU brand-styled Plotly charts and Streamlit UI.",
    tech: ["Python", "DuckDB", "Plotly", "Streamlit"],
    impact: ["YoY cohort comparison", "Program-level breakdown", "File-date anchored logic"],
    github: "https://github.com/akbknight/admissions_funnel_dashboard",
    live: null,
  },
];

const OTHER = [
  {
    title: "Economic Anomaly Detection Monitor",
    description:
      "Three-algorithm statistical monitoring system (Z-score, IQR, CUSUM) applied to Federal Reserve macroeconomic data. Detects COVID unemployment shock, 2008 GFC deflation, and 2021–22 inflation acceleration across 26 years of FRED data.",
    tech: ["Python", "scipy", "Pandas", "Chart.js"],
    github: "https://github.com/akbknight/anomaly-detection-monitor",
    live: "https://akbknight.github.io/anomaly-detection-monitor/",
  },
  {
    title: "Crisis to Care",
    description:
      "Platform connecting first-generation college students in crisis with care resources and AI-powered triage. Gemini-backed routing surfaces the right intervention — counseling, housing, food — based on the student's situation.",
    tech: ["React", "TypeScript", "Vite", "Gemini API"],
    github: "https://github.com/akbknight/crisis-to-care",
    live: "https://akbknight.github.io/crisis-to-care/",
  },
  {
    title: "Global Grants Analytics Dashboard",
    description:
      "Enterprise portal processing 217K+ rows of geospatial and financial grant data with AI-powered cleaning and interactive mapping. FastAPI backend with server-side filtering; React + Tailwind frontend.",
    tech: ["React", "FastAPI", "Python", "Pandas"],
    github: null,
    live: null,
  },
  {
    title: "MBA Hub App",
    description:
      "Full-stack productivity platform for MBA students: peer matching, study groups, rendezvous scheduling, and collaborative notes. Supabase auth gated to .edu email addresses.",
    tech: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS"],
    github: "https://github.com/akbknight/mba-hub-app",
    live: "https://mba-hub-app.vercel.app",
  },
  {
    title: "SaltPepper for Windows",
    description:
      "Intelligent Claude Code router that sends simple prompts to a local Ollama model and reserves API tokens for tasks that actually need them. Transparent cost-saving layer for Claude Code users.",
    tech: ["Python", "Claude API", "Ollama"],
    github: "https://github.com/akbknight/saltpepper-win",
    live: null,
  },
  {
    title: "ITEC-617 DT Simulation",
    description:
      "AI simulation helping MBA students prepare digital transformation presentations through nine distinct executive personas — each with realistic objections, decision criteria, and communication styles.",
    tech: ["Python", "Claude API", "Streamlit"],
    github: "https://github.com/akbknight/ITEC-617-Digital-Transformation-Project",
    live: null,
  },
  {
    title: "Egypt vs India Dashboard",
    description:
      "Comparative macroeconomic dashboard contrasting Egypt and India across GDP growth, population, trade, and civilization history. Built for a graduate economics course at Kogod.",
    tech: ["JavaScript", "Chart.js", "HTML/CSS"],
    github: "https://github.com/akbknight/egypt-vs-india-dashboard",
    live: "https://akbknight.github.io/egypt-vs-india-dashboard/",
  },
];

const FeaturedCard = ({
  project,
  index,
}: {
  project: (typeof FEATURED)[0];
  index: number;
}) => {
  const cardRef = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty("--mx", `${x}%`);
    card.style.setProperty("--my", `${y}%`);
  };

  return (
  <motion.article
    ref={cardRef}
    onMouseMove={handleMouseMove}
    initial={{ opacity: 0, y: 22 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.45, delay: index * 0.08 }}
    className="group relative rounded-xl border border-[var(--border)] p-6 transition-all duration-300 hover:border-white/[0.14] hover:bg-white/[0.025]"
  >
    {/* Cursor-following radial glow */}
    <div
      className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      style={{ background: "radial-gradient(350px circle at var(--mx, 50%) var(--my, 50%), rgba(232,160,32,0.05), transparent 70%)" }}
    />

    <div className="relative z-10">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-sm font-semibold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors duration-200 leading-tight pr-4">
          {project.title}
        </h3>
        <div className="flex items-center gap-3 shrink-0">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} on GitHub`}
              className="text-[var(--text-muted)] hover:text-[var(--text)] transition-colors duration-200"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.title} live`}
              className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors duration-200"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      <p className="text-[13px] text-[var(--text-muted)] leading-relaxed mb-3">
        {project.description}
      </p>

      {/* Impact chips */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.impact.map((r) => (
          <span
            key={r}
            className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full"
            style={{
              background: "var(--accent-dim)",
              color: "var(--accent)",
              border: "1px solid rgba(232,160,32,0.18)",
            }}
          >
            {r}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span
            key={t}
            className="text-[10px] font-mono text-[var(--text-2)] bg-[var(--bg-surface)] px-2 py-1 rounded-sm"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  </motion.article>
  );
};

const OtherCard = ({
  project,
  index,
}: {
  project: (typeof OTHER)[0];
  index: number;
}) => (
  <motion.article
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-30px" }}
    transition={{ duration: 0.4, delay: index * 0.06 }}
    className="group flex flex-col rounded-lg border border-[var(--border)] p-5 transition-all duration-300 hover:border-[var(--accent)]/25 hover:bg-white/[0.02]"
  >
    <div className="flex items-start justify-between mb-4">
      <Folder
        className="w-4 h-4 text-[var(--accent)]"
        aria-hidden="true"
      />
      <div className="flex items-center gap-2">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} on GitHub`}
            className="text-[var(--text-muted)] hover:text-[var(--text)] transition-colors duration-200"
          >
            <Github className="w-3.5 h-3.5" />
          </a>
        )}
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.title}`}
            className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors duration-200"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </div>

    <h4 className="text-[13px] font-semibold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors duration-200 mb-2">
      {project.title}
    </h4>

    <p className="text-[12px] text-[var(--text-muted)] leading-relaxed flex-1">
      {project.description}
    </p>

    <div className="flex flex-wrap gap-x-3 gap-y-1 mt-5">
      {project.tech.map((t) => (
        <span key={t} className="text-[10px] font-mono text-[var(--text-muted)]">
          {t}
        </span>
      ))}
    </div>
  </motion.article>
);

export const Projects = () => {
  return (
    <section id="projects">
      <p className="section-label mb-6">03 · Projects</p>

      {/* Featured */}
      <div className="space-y-4 mb-10">
        {FEATURED.map((proj, i) => (
          <FeaturedCard key={proj.title} project={proj} index={i} />
        ))}
      </div>

      {/* Other */}
      <p className="section-label mb-4" style={{ color: "var(--text-muted)" }}>
        Other noteworthy projects
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {OTHER.map((proj, i) => (
          <OtherCard key={proj.title} project={proj} index={i} />
        ))}
      </div>

      {/* GitHub link */}
      <div className="mt-8">
        <a
          href="https://github.com/akbknight"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--text-2)] hover:text-[var(--accent)] transition-colors duration-200 group"
        >
          View all on GitHub
          <svg
            className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 17L17 7M17 7H7M17 7v10"
            />
          </svg>
        </a>
      </div>
    </section>
  );
};

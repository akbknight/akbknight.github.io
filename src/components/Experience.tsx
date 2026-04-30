"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronDown } from "lucide-react";

const EXPERIENCES = [
  {
    period: "Nov 2025 – Present",
    role: "Research Assistant",
    company: "American University, Kogod School of Business",
    url: "https://www.american.edu/kogod/",
    context:
      "Kogod had no vendor-neutral analysis of AI tools shaping university admissions — leadership needed a clear-eyed strategic view before committing to any platform.",
    actions: [
      "Benchmarked 6+ enterprise admissions-AI platforms (Othot, UiPath, Element451, Kira Talent) against Kogod's real operational workflows",
      "Synthesized industry adoption trends into structured strategic deliverables for C-suite leadership",
      "Identified high-ROI integration points across recruitment, applicant screening, and enrollment stages",
    ],
    results: ["6 platforms benchmarked", "C-suite deliverables", "Active research"],
  },
  {
    period: "Nov 2022 – Sep 2025",
    role: "Computer Programmer",
    company: "U.S. Department of State",
    url: null,
    context:
      "Scheduling and complaint-tracking across 1,200+ diplomatic staff ran on fragile legacy systems with no automation — every workflow was manual and error-prone.",
    actions: [
      "Built a scheduling and analytics platform used daily by 1,200+ diplomatic personnel and support staff across State Dept posts",
      "Automated the end-to-end complaint-tracking workflow, eliminating 75% of manual processing overhead",
      "Led a cross-functional data standardization initiative aligning 200+ stakeholders across departments",
    ],
    results: ["1,200+ users served", "75% workload reduction", "200+ stakeholders aligned"],
  },
  {
    period: "Nov 2021 – Nov 2022",
    role: "Software Engineer",
    company: "AIS Info · Capital One",
    url: null,
    context:
      "Capital One's legal team was manually monitoring thousands of sources for bankruptcy filings — missing notification windows meant compliance exposure and significant business risk.",
    actions: [
      "Engineered a bankruptcy data aggregation platform that scraped, deduplicated, and normalized data from 3,000+ web sources",
      "Built an AI-driven classification and routing pipeline to automatically validate and triage legal notifications",
      "Reduced legal notification time from days to hours through fully automated end-to-end processing",
    ],
    results: ["3,000+ sources integrated", "50% faster notifications", "AI-driven validation"],
  },
  {
    period: "Jul 2018 – Nov 2021",
    role: "Software Application Developer",
    company: "MS Star Computers",
    url: null,
    context:
      "Client approval workflows ran entirely through spreadsheets and emails, creating bottlenecks, version-control issues, and poor visibility for 3+ enterprise accounts.",
    actions: [
      "Redesigned approval workflow systems from the ground up, cutting processing time by 40% across all clients",
      "Replaced ad-hoc spreadsheet systems with structured data collection tools purpose-built for each client's workflow",
      "Developed client-facing reporting materials that improved stakeholder communication and strengthened retention",
    ],
    results: ["40% faster processing", "3+ enterprise clients", "Structured data systems"],
  },
];

const ExperienceCard = ({
  exp,
  index,
}: {
  exp: (typeof EXPERIENCES)[0];
  index: number;
}) => {
  const [expanded, setExpanded] = useState(index === 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.42, delay: index * 0.07 }}
      className="group rounded-xl border border-[var(--border)] overflow-hidden transition-colors duration-200 hover:border-white/[0.12]"
    >
      {/* Header — click to expand / collapse */}
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full text-left px-5 py-4 flex items-start justify-between gap-3 hover:bg-white/[0.02] transition-colors duration-150"
        aria-expanded={expanded}
      >
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 mb-0.5">
            <h3 className="text-[13px] font-semibold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors duration-200 leading-tight">
              {exp.role}
            </h3>
            {exp.url && (
              <a
                href={exp.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${exp.company} website`}
                className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="inline w-3 h-3" aria-hidden="true" />
              </a>
            )}
          </div>
          <p className="text-[11px] font-medium text-[var(--text-2)]">{exp.company}</p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="text-[10px] font-mono text-[var(--text-muted)] hidden sm:block">
            {exp.period}
          </span>
          <ChevronDown
            className="w-3.5 h-3.5 text-[var(--text-muted)] transition-transform duration-250"
            style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
            aria-hidden="true"
          />
        </div>
      </button>

      {/* Period on mobile */}
      <p className="sm:hidden text-[10px] font-mono text-[var(--text-muted)] px-5 -mt-2 pb-3">
        {exp.period}
      </p>

      {/* Body — animated expand/collapse */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div className="px-5 pb-5 space-y-4 border-t border-[var(--border-subtle)]">

              {/* Context (Situation + Task) */}
              <p
                className="pt-4 text-[12px] leading-relaxed italic"
                style={{
                  color: "var(--text-muted)",
                  borderLeft: "2px solid var(--accent)",
                  paddingLeft: "12px",
                  opacity: 0.85,
                }}
              >
                {exp.context}
              </p>

              {/* Actions */}
              <ul className="space-y-2">
                {exp.actions.map((action, i) => (
                  <li
                    key={i}
                    className="flex gap-2 text-[12px] leading-relaxed"
                    style={{ color: "var(--text-2)" }}
                  >
                    <span
                      style={{
                        color: "var(--accent)",
                        opacity: 0.6,
                        marginTop: "1px",
                        flexShrink: 0,
                        fontFamily: "var(--font-mono)",
                        fontSize: "11px",
                      }}
                    >
                      →
                    </span>
                    <span>{action}</span>
                  </li>
                ))}
              </ul>

              {/* Results — metric chips */}
              <div className="flex flex-wrap gap-1.5">
                {exp.results.map((r) => (
                  <span
                    key={r}
                    className="text-[10px] font-mono font-medium px-2.5 py-1 rounded-full"
                    style={{
                      background: "var(--accent-dim)",
                      color: "var(--accent)",
                      border: "1px solid rgba(232,160,32,0.2)",
                    }}
                  >
                    {r}
                  </span>
                ))}
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const Experience = () => {
  return (
    <section id="experience">
      <p className="section-label mb-6">02 · Experience</p>

      <div className="space-y-2">
        {EXPERIENCES.map((exp, i) => (
          <ExperienceCard key={i} exp={exp} index={i} />
        ))}
      </div>

      <div className="mt-5">
        <a
          href="https://www.linkedin.com/in/akshaykumardl/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--text-2)] hover:text-[var(--accent)] transition-colors duration-200 group"
        >
          Full résumé on LinkedIn
          <svg
            className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </a>
      </div>
    </section>
  );
};

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronDown, FileText, ArrowUpRight } from "lucide-react";

interface ExperienceProps {
  onOpenResume?: () => void;
}

const EXPERIENCES = [
  {
    period: "Nov 2025 – Apr 2026",
    role: "Research Assistant (Part-Time)",
    company: "American University, Kogod School of Business",
    url: "https://www.american.edu/kogod/",
    context:
      "Kogod leadership needed strategic technology policy analysis across peer institutions and automated analytics across admissions recruitment cycles.",
    actions: [
      "Authored background materials and a strategic research brief on technology policy adoption across 20+ peer institutions, delivering findings and talking points directly to Kogod School senior leadership.",
      "Built a Python Streamlit dashboard automating admissions funnel tracking across applicants, admits, deferrals, and yields, replacing manual Excel pivot tables each recruitment cycle and expanding visibility to dynamic, multi-metric monitoring.",
      "Operations Leader for AU Analytics Club (50+ members): organized executive speaker events, coordinated meetings, and managed collaborative analytics projects.",
    ],
    results: ["20+ Peer Institutions Analyzed", "Streamlit Pipeline Deployed", "50+ Club Members Led"],
  },
  {
    period: "Nov 2022 – Sep 2025",
    role: "Computer Programmer · Diplomatic Systems & Consular Analytics",
    company: "U.S. Department of State",
    url: null,
    context:
      "Consular systems, diplomatic vetting, and visa revenue analytics across 10+ missions required automated cross-jurisdictional workflows and executive reporting.",
    actions: [
      "Supported U.S. government relations and global policy operations by leading rollout of a diplomatic vetting system across 10+ embassies in South Asia, Europe, and Africa, navigating complex policy and compliance requirements.",
      "Produced analytical reports on visa application volumes and fee revenue used directly by mission leadership to make operational decisions.",
      "Developed written guidance materials, training documentation, and briefings for consular staff, bringing non-technical stakeholders across 4 consulates to full operational readiness.",
      "Improved mission service quality by designing complaint-routing workflows that eliminated manual follow-up, reducing case resolution time by 75%.",
    ],
    results: ["10+ Embassies Deployed", "75% Workload Reduction", "4 Consulates Trained", "Fee Revenue Analytics"],
  },
  {
    period: "Nov 2021 – Nov 2022",
    role: "Software Engineer · Java Backend Developer",
    company: "AIS Info · Capital One",
    url: null,
    context:
      "Capital One needed automated aggregation and classification of bankruptcy filings and deceased-identity records from 3,000+ court and public data feeds.",
    actions: [
      "Built a financial research platform for Capital One aggregating bankruptcy filings and deceased-identity records from U.S. court and public sources, enabling analyst teams to conduct credit and compliance research at scale.",
      "Engineered automated validation, classification, and routing pipelines that cut legal notification latency by 50%.",
      "Supported new business development by producing data outputs and research reports that led Wells Fargo, JP Morgan, and Chase to independently license the platform for their own operations.",
    ],
    results: ["3,000+ Court Feeds", "Licensed by 4 Major Banks", "50% Latency Cut"],
  },
  {
    period: "Jul 2018 – Nov 2021",
    role: "Software Application Developer",
    company: "MS Star Computers Pvt Ltd",
    url: null,
    context:
      "Managed simultaneous software delivery for a government client and two private enterprises with strict deadlines and complex data requirements.",
    actions: [
      "Managed multiple client projects simultaneously for a government client and two private companies, balancing shifting priorities while meeting deadlines and maintaining quality of deliverables.",
      "Reduced administrative processing time for three institutions by 40% by building tailored workflow management solutions.",
      "Replaced ad-hoc spreadsheet systems with structured data collection tools purpose-built for each client's workflow.",
    ],
    results: ["40% Faster Processing", "3 Enterprise Clients", "Zero Escalations"],
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
      className="group rounded-xl border border-zinc-200 dark:border-white/[0.08] bg-white dark:bg-[#0E0E14] shadow-xs dark:shadow-none overflow-hidden transition-all duration-200 hover:border-zinc-300 dark:hover:border-white/[0.16]"
    >
      {/* Header — click to expand / collapse */}
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full text-left px-5 py-4 flex items-start justify-between gap-3 hover:bg-zinc-50/80 dark:hover:bg-white/[0.02] transition-colors duration-150 cursor-pointer"
        aria-expanded={expanded}
      >
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 mb-0.5">
            <h3 className="text-[13px] font-semibold text-zinc-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors duration-200 leading-tight">
              {exp.role}
            </h3>
            {exp.url && (
              <a
                href={exp.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${exp.company} website`}
                className="text-zinc-500 hover:text-sky-600 dark:text-zinc-400 dark:hover:text-sky-400 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="inline w-3 h-3" aria-hidden="true" />
              </a>
            )}
          </div>
          <p className="text-[11px] font-medium text-zinc-600 dark:text-zinc-300">{exp.company}</p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="text-[10px] font-mono-code text-zinc-500 dark:text-zinc-400 hidden sm:block">
            {exp.period}
          </span>
          <ChevronDown
            className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500 transition-transform duration-250"
            style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
            aria-hidden="true"
          />
        </div>
      </button>

      {/* Period on mobile */}
      <p className="sm:hidden text-[10px] font-mono-code text-zinc-500 dark:text-zinc-400 px-5 -mt-2 pb-3">
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
            <div className="px-5 pb-5 space-y-4 border-t border-zinc-100 dark:border-white/[0.06]">
              {/* Context (Situation + Task) */}
              <p
                className="pt-4 text-[12px] leading-relaxed italic text-zinc-600 dark:text-zinc-300 border-l-2 border-sky-600 dark:border-sky-400 pl-3"
              >
                {exp.context}
              </p>

              {/* Actions */}
              <ul className="space-y-2">
                {exp.actions.map((action, i) => (
                  <li
                    key={i}
                    className="flex gap-2 text-[12px] leading-relaxed text-zinc-700 dark:text-zinc-300"
                  >
                    <span className="text-sky-600 dark:text-sky-400 font-mono-code text-[11px] shrink-0 mt-0.5">
                      →
                    </span>
                    <span>{action}</span>
                  </li>
                ))}
              </ul>

              {/* Results — metric chips */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {exp.results.map((r) => (
                  <span
                    key={r}
                    className="text-[10px] font-mono-code font-medium px-2.5 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-200 dark:bg-sky-500/10 dark:text-sky-400 dark:border-sky-500/20"
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

export const Experience = ({ onOpenResume }: ExperienceProps) => {
  return (
    <section id="experience">
      <div className="flex items-center justify-between mb-6">
        <p className="section-label">02 · Verified Track Record</p>
        {onOpenResume && (
          <button
            onClick={onOpenResume}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono-code text-sky-600 dark:text-sky-400 hover:text-sky-500 dark:hover:text-sky-300 transition-colors cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Open PDF Résumé ↗</span>
          </button>
        )}
      </div>

      <div className="space-y-2.5">
        {EXPERIENCES.map((exp, i) => (
          <ExperienceCard key={i} exp={exp} index={i} />
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4 pt-2">
        {onOpenResume && (
          <button
            onClick={onOpenResume}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-900 border border-zinc-200 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] dark:text-white dark:border-white/10 text-xs font-medium transition-colors cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
            <span>View Complete Interactive Résumé</span>
          </button>
        )}

        <a
          href="https://www.linkedin.com/in/akshaykumardl/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-600 hover:text-sky-600 dark:text-zinc-400 dark:hover:text-sky-400 transition-colors duration-200 group"
        >
          <span>Full Career History on LinkedIn</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>
    </section>
  );
};

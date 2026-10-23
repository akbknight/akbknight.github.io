"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, ChevronDown, Award, Briefcase, GraduationCap } from "lucide-react";

interface ExperienceProps {
  onOpenResume?: () => void;
}

const EXPERIENCES = [
  {
    period: "Nov 2022 – Sep 2025",
    role: "Business Analyst (Ambassador Commendation)",
    company: "U.S. Department of State / U.S. Embassy",
    location: "New Delhi, India",
    type: "Full-Time Employment",
    summary:
      "Operational analytics, decision-support dashboards, and consular IT systems across diplomatic posts in India. Commended by the U.S. Ambassador for contributions to consular operations.",
    points: [
      "Supported a 30% increase in daily visa-request throughput by building a dashboard that exposed seasonal demand by visa type and guided consular staffing decisions.",
      "Replaced manual consular complaint tracking with Power Apps, Power Automate, and SharePoint workflows, consolidating service requests and cutting triage time by 65%.",
      "Streamlined American Citizen Services (ACS) reporting with automated workflows, reducing biweekly review cycles by 24%.",
      "Maintained consular IT technology assets across 4 locations, achieving 99.4% tracking accuracy against official registries.",
      "Deployed consular vetting software across U.S. diplomatic posts in India, configuring workflows and training staff for day-to-day operations.",
    ],
    highlight: "Ambassador Commendation",
  },
  {
    period: "Nov 2021 – Nov 2022",
    role: "Software Engineer (Capital One Delivery)",
    company: "AIS Info Source",
    location: "Gurugram, India",
    type: "Full-Time Employment",
    summary:
      "Automated Java pipelines and data products serving commercial loan screening and verification for Capital One.",
    points: [
      "Engineered automated Java pipelines processing 12M court records across 94 federal districts, achieving 99.6% classification accuracy and sub-second retrieval for Capital One.",
      "Ingested 85M+ deceased-person records into high-throughput verification databases, screening $350M+ in commercial loan applications with zero discrepancies.",
      "Integrated third-party APIs with RESTful endpoints, reducing verification latency by 40% and eliminating 30+ manual audit hours weekly.",
    ],
    highlight: "12M Records (99.6% Accuracy)",
  },
  {
    period: "Jul 2018 – Nov 2021",
    role: "Software Application Developer",
    company: "MS Star Computers",
    location: "New Delhi, India",
    type: "Full-Time Employment",
    summary:
      "Infrastructure administration and application engineering across regional education centers and enterprise clients.",
    points: [
      "Administered 350+ workstations and network infrastructure across 8 regional centers with a 99.7% first-time compatibility rate.",
      "Transitioned 3 K-12 schools online during COVID-19 by developing a centralized Flutter portal (98% adoption, 2,000+ daily active users).",
      "Automated administrative reporting using Python and VBA, saving 15+ staff hours weekly.",
    ],
    highlight: "350+ Workstations · 99.7% Uptime",
  },
];

const EDUCATION = [
  {
    period: "Aug 2025 – May 2027",
    degree: "Master of Business Administration (STEM-designated)",
    institution: "American University, Kogod School of Business",
    location: "Washington, DC",
    status: "Expected May 2027 · Available June 1, 2027",
    concentration: "Business Analytics & Artificial Intelligence",
    leadership: "Operations Leader, Analytics Club at AU",
    coursework: "Predictive Analytics, Database & Big Data, AI for Business Strategy, Managerial Statistics",
  },
  {
    period: "Aug 2014 – Jun 2018",
    degree: "Bachelor of Technology in Computer Science & Engineering",
    institution: "Maharishi Dayanand University",
    location: "Rohtak, India",
    status: "Conferred June 2018",
    concentration: "Algorithms, Distributed Systems & Database Architecture",
    leadership: null,
    coursework: "Data Structures, Database Management Systems, Computer Networks, Operating Systems",
  },
];

export const Experience = ({ onOpenResume }: ExperienceProps) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <section id="experience" className="py-16 sm:py-24 border-b border-zinc-200/80 dark:border-white/[0.08]">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 sm:mb-16">
        <div>
          <p className="section-label mb-3">02 · Career Track Record</p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Professional Experience &amp; Education
          </h2>
          <p className="mt-2 text-sm sm:text-base text-zinc-600 dark:text-zinc-300 max-w-xl">
            7+ years of engineering and analytical problem-solving connecting data architecture to business outcomes.
          </p>
        </div>

        {onOpenResume && (
          <button
            type="button"
            onClick={onOpenResume}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-zinc-300 dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs sm:text-sm font-medium transition-colors w-fit cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
          >
            <FileText className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
            <span>View Full PDF Résumé</span>
          </button>
        )}
      </div>

      {/* Professional Experience Timeline */}
      <div className="space-y-6">
        <h3 className="text-xs font-mono-code uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
          <Briefcase className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
          <span>Professional Roles (Verified Employment)</span>
        </h3>

        <div className="space-y-4">
          {EXPERIENCES.map((exp, idx) => {
            const isExpanded = expandedIndex === idx;
            return (
              <div
                key={idx}
                className="apple-glass-card rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                  aria-expanded={isExpanded}
                  className="w-full text-left p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-zinc-50/60 dark:hover:bg-white/[0.02] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                >
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">
                        {exp.role}
                      </span>
                      <span className="text-xs font-mono-code font-semibold px-2 py-0.5 rounded bg-sky-500/10 text-sky-700 dark:text-sky-400 border border-sky-500/20">
                        {exp.highlight}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm font-medium text-zinc-600 dark:text-zinc-300">
                      {exp.company} · {exp.location}
                    </p>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                    <span className="text-xs font-mono-code text-zinc-600 dark:text-zinc-300">
                      {exp.period}
                    </span>
                    <div
                      className={`p-1.5 rounded-lg border border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-300 transition-transform duration-200 ${
                        isExpanded ? "rotate-180 bg-zinc-100 dark:bg-white/10" : ""
                      }`}
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-6 pb-6 sm:px-7 sm:pb-7 pt-2 border-t border-zinc-100 dark:border-white/[0.04] space-y-4">
                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
                      {exp.summary}
                    </p>

                    <ul className="space-y-2.5">
                      {exp.points.map((pt, pIdx) => (
                        <li
                          key={pIdx}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-2 shrink-0" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Education Timeline */}
      <div className="mt-14 space-y-6">
        <h3 className="text-xs font-mono-code uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-sky-600 dark:text-sky-400" />
          <span>Academic Background &amp; Leadership</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {EDUCATION.map((edu, idx) => (
            <div
              key={idx}
              className="apple-glass-card p-6 rounded-2xl space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-zinc-200/60 dark:bg-white/[0.06] text-zinc-700 dark:text-zinc-300 font-medium">
                    {edu.status}
                  </span>
                  <span className="text-xs font-mono-code text-zinc-400 dark:text-zinc-400">
                    {edu.period}
                  </span>
                </div>

                <h4 className="text-base font-bold text-zinc-900 dark:text-white leading-snug">
                  {edu.degree}
                </h4>

                <p className="text-xs font-medium text-zinc-600 dark:text-zinc-300 mt-1">
                  {edu.institution} · {edu.location}
                </p>

                <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-2">
                  <strong className="text-zinc-800 dark:text-zinc-200">Focus:</strong> {edu.concentration}
                </p>

                {edu.leadership && (
                  <p className="text-xs text-sky-700 dark:text-sky-400 mt-1.5 font-medium">
                    ★ {edu.leadership}
                  </p>
                )}
              </div>

              <div className="pt-3 border-t border-zinc-200/60 dark:border-white/[0.06] text-[11px] font-mono-code text-zinc-600 dark:text-zinc-300">
                Coursework: {edu.coursework}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Download,
  Linkedin,
  Mail,
  Check,
  FileText,
  Eye,
  Copy,
  ExternalLink,
  Briefcase,
  GraduationCap,
  Award,
  Terminal,
} from "lucide-react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RESUME_PLAIN_TEXT = `AKSHAY KUMAR
Washington, DC | (202) 415-4366 | ak8335a@american.edu
linkedin.com/in/akshaykumardl | github.com/akbknight | akbknight.github.io

SUMMARY
MBA candidate at American University (May 2027) with 7+ years of software engineering experience in data integration and operational analytics. Built decision-support systems for the U.S. Department of State and banking-data products serving Capital One, connecting technical delivery to staffing capacity and customer verification.

EXPERIENCE
U.S. Department of State · New Delhi, India
Business Analyst · November 2022 – September 2025
• Received formal commendation from U.S. Ambassador for technical contributions to consular operations
• Supported a 30% increase in daily visa-request throughput by building a dashboard that exposed seasonal demand by visa type and guided consular staffing decisions
• Replaced manual consular complaint tracking with Power Apps, Power Automate, and SharePoint workflows, consolidating service requests and cutting triage time by 65%
• Streamlined American Citizen Services (ACS) reporting with automated workflows, reducing biweekly review cycles by 24%
• Managed $500K+ IT asset migration across 4 consular locations, achieving 99.4% tracking accuracy against official inventory registries
• Deployed consular vetting software across U.S. diplomatic posts in India, configuring workflows and training staff so participating teams could use the platform in day-to-day operations

AIS Info · Gurugram, India
Software Engineer (Capital One Delivery) · November 2021 – November 2022
• Engineered automated Java pipelines processing 12M court records across 94 U.S. federal districts, achieving 99.6% classification accuracy and sub-second retrieval for Capital One
• Ingested 85M+ deceased-person records into high-throughput verification databases, screening $350M+ in commercial and consumer loan applications with zero data discrepancies
• Integrated third-party APIs with RESTful endpoints, reducing verification latency by 40% and cutting manual audit overhead by 30+ hours weekly

MS Star Computers · New Delhi, India
Software Application Developer · July 2018 – November 2021
• Administered and maintained 350+ workstations and network infrastructure across 8 regional centers, ensuring 99.8% system uptime
• Moved classes online for 3 K-12 schools during COVID-19 by developing a centralized Flutter educational portal (98% adoption, 2,000+ daily student/faculty joins)
• Automated administrative reporting workflows using Python and VBA, saving 15+ staff hours weekly

EDUCATION
American University, Kogod School of Business · Washington, DC
Master of Business Administration (STEM-designated) · May 2027
Concentration: Business Analytics & Artificial Intelligence | GPA: 3.8/4.0
Leadership: Operations Leader, Analytics Club at AU
Coursework: Predictive Analytics, Database & Big Data, AI for Business Strategy

Maharishi Dayanand University · Rohtak, India
Bachelor of Technology, Computer Science and Engineering · August 2021
First Class with Distinction

PROJECTS
IRS 990 Philanthropic Grant Miner & 3D Spatial Engine (https://github.com/akbknight/irs990-grant-dashboard)
• Engineered end-to-end Python/ETL pipeline parsing 9.7M IRS Form 990 XML records ($550B+ charitable funding) with interactive 3D WebGL globe and real-time choropleth mapping

U.S. Retail Sales Forecast Engine (https://github.com/akbknight/us-retail-sales-forecast)
• Developed time-series forecasting models using Holt-Winters exponential smoothing on 10+ years of FRED macroeconomic data, achieving 3.4% MAPE across 12-month holdout evaluated via MAE and RMSE

SKILLS
Programming & Data: Python, SQL, Java, R, C/C++, MySQL, REST APIs, DuckDB, Pandas, NumPy
Analytics & Modeling: Power BI, Excel, Streamlit, statsmodels, Time-Series Forecasting, Forecast Evaluation (MAE, RMSE, MAPE)
Applications & Cloud: Flutter, Power Apps, Power Automate, SharePoint, AWS S3, Three.js / WebGL, Git / GitHub CI/CD`;

export const ResumeModal = ({ isOpen, onClose }: ResumeModalProps) => {
  const [activeTab, setActiveTab] = useState<"highlights" | "pdf" | "ats">("pdf");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  // Lock body scroll and register ESC key handler
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("ak8335a@american.edu");
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(RESUME_PLAIN_TEXT);
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Executive Curriculum Vitae of Akshay Kumar"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl bg-white dark:bg-[#0B0B10] border border-zinc-200 dark:border-white/[0.12] shadow-2xl shadow-black/20 dark:shadow-sky-950/30 overflow-hidden text-zinc-900 dark:text-zinc-100"
          >
            {/* Top Bar Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-4 border-b border-zinc-200 dark:border-white/[0.08] bg-zinc-50 dark:bg-[#07070A]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-600 dark:text-sky-400">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-zinc-900 dark:text-white tracking-tight flex items-center gap-2">
                    Akshay Kumar · Executive Résumé
                    <span className="text-[10px] font-mono-code font-medium px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-700 dark:text-sky-400 border border-sky-500/20">
                      Verified 2026–2027
                    </span>
                  </h2>
                  <p className="text-[11px] font-mono-code text-zinc-600 dark:text-zinc-400">
                    Washington, DC · American University Kogod MBA (STEM) · Ex-U.S. State Dept
                  </p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center gap-2">
                <a
                  href="/assets/Akshay_Resume.pdf"
                  download="Akshay_Kumar_Resume.pdf"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white dark:bg-sky-400 dark:hover:bg-sky-300 dark:text-[#050507] text-xs font-semibold tracking-tight transition-all duration-150 shadow-sm dark:shadow-[0_0_15px_rgba(56,189,248,0.35)]"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/akshaykumardl/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-300 dark:bg-zinc-800/80 dark:hover:bg-zinc-700/80 dark:text-zinc-200 dark:border-white/10 text-xs font-medium transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                  <span className="hidden sm:inline">LinkedIn</span>
                  <ExternalLink className="w-3 h-3 text-zinc-500 dark:text-zinc-400" />
                </a>

                <button
                  onClick={handleCopyEmail}
                  aria-label="Copy Akshay Kumar email address"
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border border-zinc-300 dark:bg-zinc-800/80 dark:hover:bg-zinc-700/80 dark:text-zinc-300 dark:border-white/10 text-xs font-medium transition-colors cursor-pointer"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">Copied</span>
                    </>
                  ) : (
                    <>
                      <Mail className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
                      <span className="hidden md:inline text-[11px]">Copy Email</span>
                    </>
                  )}
                </button>

                <button
                  onClick={onClose}
                  aria-label="Close résumé modal"
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800 transition-colors ml-1 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 px-6 pt-3 border-b border-zinc-200 dark:border-white/[0.06] bg-zinc-100/50 dark:bg-[#07070A]/50">
              <button
                onClick={() => setActiveTab("highlights")}
                className={`flex items-center gap-2 px-3 py-2 text-xs font-medium border-b-2 transition-colors cursor-pointer ${
                  activeTab === "highlights"
                    ? "border-sky-600 dark:border-sky-400 text-sky-700 dark:text-sky-400 font-semibold"
                    : "border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>Executive Breakdown</span>
              </button>

              <button
                onClick={() => setActiveTab("pdf")}
                className={`flex items-center gap-2 px-3 py-2 text-xs font-medium border-b-2 transition-colors cursor-pointer ${
                  activeTab === "pdf"
                    ? "border-sky-600 dark:border-sky-400 text-sky-700 dark:text-sky-400 font-semibold"
                    : "border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Original PDF Viewer</span>
              </button>

              <button
                onClick={() => setActiveTab("ats")}
                className={`flex items-center gap-2 px-3 py-2 text-xs font-medium border-b-2 transition-colors cursor-pointer ${
                  activeTab === "ats"
                    ? "border-sky-600 dark:border-sky-400 text-sky-700 dark:text-sky-400 font-semibold"
                    : "border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>ATS Plain Text</span>
              </button>
            </div>

            {/* Modal Body Content */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 custom-scrollbar">
              {/* TAB 1: HIGHLIGHTS */}
              {activeTab === "highlights" && (
                <div className="space-y-8 text-sm">
                  {/* Executive Summary */}
                  <div className="p-4 rounded-xl border border-sky-300 bg-sky-50 dark:border-sky-500/20 dark:bg-sky-950/15">
                    <h3 className="text-xs font-mono-code font-semibold uppercase tracking-wider text-sky-700 dark:text-sky-400 mb-2">
                      Professional Summary
                    </h3>
                    <p className="text-zinc-800 dark:text-zinc-200 leading-relaxed text-xs sm:text-sm">
                      MBA candidate at American University (May 2027) with 7+ years of software engineering experience in data integration and operational analytics. Built decision-support systems for the U.S. Department of State and banking-data products serving Capital One, connecting technical delivery to staffing capacity and customer verification.
                    </p>
                  </div>

                  {/* Experience Timeline */}
                  <div>
                    <h3 className="text-xs font-mono-code font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-4 flex items-center gap-2">
                      <Briefcase className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                      Professional Experience
                    </h3>

                    <div className="space-y-6">
                      {/* U.S. Department of State */}
                      <div className="p-4 rounded-xl border border-zinc-200 dark:border-white/[0.08] bg-zinc-50/60 dark:bg-white/[0.02]">
                        <div className="flex flex-wrap items-baseline justify-between gap-1 mb-1">
                          <h4 className="font-semibold text-zinc-900 dark:text-white text-sm flex items-center gap-2">
                            <span>Business Analyst</span>
                            <span className="text-[10px] font-mono-code font-medium px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                              Ambassador Commendation
                            </span>
                          </h4>
                          <span className="text-[11px] font-mono-code text-sky-700 dark:text-sky-400">
                            November 2022 – September 2025
                          </span>
                        </div>
                        <p className="text-xs text-zinc-600 dark:text-zinc-300 font-medium mb-3">
                          U.S. Department of State / U.S. Embassy · New Delhi, India
                        </p>
                        <ul className="space-y-2 text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed list-disc list-inside">
                          <li>
                            Received formal commendation from U.S. Ambassador for technical contributions to consular operations.
                          </li>
                          <li>
                            Supported a 30% increase in daily visa-request throughput by building a dashboard that exposed seasonal demand by visa type and guided consular staffing decisions.
                          </li>
                          <li>
                            Replaced manual consular complaint tracking with Power Apps, Power Automate, and SharePoint workflows, consolidating service requests and cutting triage time by 65%.
                          </li>
                          <li>
                            Streamlined American Citizen Services (ACS) reporting with automated workflows, reducing biweekly review cycles by 24%.
                          </li>
                          <li>
                            Managed $500K+ IT asset migration across 4 consular locations, achieving 99.4% tracking accuracy against official inventory registries.
                          </li>
                          <li>
                            Deployed consular vetting software across U.S. diplomatic posts in India, configuring workflows and training staff so participating teams could use the platform in day-to-day operations.
                          </li>
                        </ul>
                      </div>

                      {/* AIS Info */}
                      <div className="p-4 rounded-xl border border-zinc-200 dark:border-white/[0.08] bg-zinc-50/60 dark:bg-white/[0.02]">
                        <div className="flex flex-wrap items-baseline justify-between gap-1 mb-1">
                          <h4 className="font-semibold text-zinc-900 dark:text-white text-sm flex items-center gap-2">
                            <span>Software Engineer</span>
                            <span className="text-[10px] font-mono-code font-medium px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-700 dark:text-sky-400 border border-sky-500/20">
                              Capital One Delivery
                            </span>
                          </h4>
                          <span className="text-[11px] font-mono-code text-sky-700 dark:text-sky-400">
                            November 2021 – November 2022
                          </span>
                        </div>
                        <p className="text-xs text-zinc-600 dark:text-zinc-300 font-medium mb-3">
                          AIS Info · Gurugram, India
                        </p>
                        <ul className="space-y-2 text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed list-disc list-inside">
                          <li>
                            Engineered automated Java pipelines processing 12M court records across 94 U.S. federal districts, achieving 99.6% classification accuracy and sub-second retrieval for Capital One.
                          </li>
                          <li>
                            Ingested 85M+ deceased-person records into high-throughput verification databases, screening $350M+ in commercial and consumer loan applications with zero data discrepancies.
                          </li>
                          <li>
                            Integrated third-party APIs with RESTful endpoints, reducing verification latency by 40% and cutting manual audit overhead by 30+ hours weekly.
                          </li>
                        </ul>
                      </div>

                      {/* MS Star Computers */}
                      <div className="p-4 rounded-xl border border-zinc-200 dark:border-white/[0.08] bg-zinc-50/60 dark:bg-white/[0.02]">
                        <div className="flex flex-wrap items-baseline justify-between gap-1 mb-1">
                          <h4 className="font-semibold text-zinc-900 dark:text-white text-sm">
                            Software Application Developer
                          </h4>
                          <span className="text-[11px] font-mono-code text-sky-700 dark:text-sky-400">
                            July 2018 – November 2021
                          </span>
                        </div>
                        <p className="text-xs text-zinc-600 dark:text-zinc-300 font-medium mb-3">
                          MS Star Computers · New Delhi, India
                        </p>
                        <ul className="space-y-2 text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed list-disc list-inside">
                          <li>
                            Administered and maintained 350+ workstations and network infrastructure across 8 regional centers, ensuring 99.8% system uptime.
                          </li>
                          <li>
                            Moved classes online for 3 K-12 schools during COVID-19 by developing a centralized Flutter educational portal (98% adoption, 2,000+ daily student/faculty joins).
                          </li>
                          <li>
                            Automated administrative reporting workflows using Python and VBA, saving 15+ staff hours weekly.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Education */}
                  <div>
                    <h3 className="text-xs font-mono-code font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-4 flex items-center gap-2">
                      <GraduationCap className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                      Education
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl border border-zinc-200 dark:border-white/[0.08] bg-zinc-50/60 dark:bg-white/[0.02]">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h4 className="font-semibold text-zinc-900 dark:text-white text-sm">
                            American University, Kogod School of Business
                          </h4>
                          <span className="text-[10px] font-mono-code text-sky-700 dark:text-sky-400">
                            Expected May 2027
                          </span>
                        </div>
                        <p className="text-xs text-zinc-600 dark:text-zinc-300 mb-1 font-medium">
                          Washington, DC · Master of Business Administration (STEM-designated)
                        </p>
                        <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-1">
                          <strong>Concentration:</strong> Business Analytics &amp; Artificial Intelligence | <strong>GPA:</strong> 3.8/4.0
                        </p>
                        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                          <em>Leadership:</em> Operations Leader, Analytics Club at AU | <em>Coursework:</em> Predictive Analytics, Database &amp; Big Data, AI for Business Strategy
                        </p>
                      </div>

                      <div className="p-4 rounded-xl border border-zinc-200 dark:border-white/[0.08] bg-zinc-50/60 dark:bg-white/[0.02]">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h4 className="font-semibold text-zinc-900 dark:text-white text-sm">
                            Maharishi Dayanand University
                          </h4>
                          <span className="text-[10px] font-mono-code text-zinc-500 dark:text-zinc-400">
                            August 2021
                          </span>
                        </div>
                        <p className="text-xs text-zinc-600 dark:text-zinc-300 mb-1 font-medium">
                          Rohtak, India · Bachelor of Technology
                        </p>
                        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                          Computer Science and Engineering · <em>First Class with Distinction</em>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Highlighted Projects */}
                  <div>
                    <h3 className="text-xs font-mono-code font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-4 flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                      Featured Projects
                    </h3>
                    <div className="space-y-3">
                      <div className="p-4 rounded-xl border border-zinc-200 dark:border-white/[0.08] bg-zinc-50/60 dark:bg-white/[0.02]">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h4 className="font-semibold text-zinc-900 dark:text-white text-sm">
                            IRS 990 Philanthropic Grant Miner &amp; 3D Spatial Engine
                          </h4>
                          <a
                            href="https://akbknight.github.io/irs990-grant-dashboard/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] font-mono-code text-sky-600 dark:text-sky-400 hover:underline"
                          >
                            Live Engine ↗
                          </a>
                        </div>
                        <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
                          Engineered end-to-end Python/ETL pipeline parsing 9.7M IRS Form 990 XML records ($550B+ charitable funding) with interactive 3D WebGL globe and real-time choropleth mapping.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl border border-zinc-200 dark:border-white/[0.08] bg-zinc-50/60 dark:bg-white/[0.02]">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h4 className="font-semibold text-zinc-900 dark:text-white text-sm">
                            U.S. Retail Sales Forecast Engine
                          </h4>
                          <a
                            href="https://akbknight.github.io/us-retail-sales-forecast/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] font-mono-code text-sky-600 dark:text-sky-400 hover:underline"
                          >
                            Live Engine ↗
                          </a>
                        </div>
                        <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
                          Developed time-series forecasting models using Holt-Winters exponential smoothing on 10+ years of FRED macroeconomic data, achieving 3.4% MAPE across 12-month holdout evaluated via MAE and RMSE.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Skills */}
                  <div>
                    <h3 className="text-xs font-mono-code font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-4 flex items-center gap-2">
                      <Award className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                      Technical Skills &amp; Competencies
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-white/[0.08] bg-zinc-50/60 dark:bg-white/[0.02]">
                        <h4 className="text-xs font-semibold text-zinc-900 dark:text-white mb-2">Programming &amp; Data</h4>
                        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                          Python, SQL, Java, R, C/C++, MySQL, REST APIs, DuckDB, Pandas, NumPy
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-white/[0.08] bg-zinc-50/60 dark:bg-white/[0.02]">
                        <h4 className="text-xs font-semibold text-zinc-900 dark:text-white mb-2">Analytics &amp; Modeling</h4>
                        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                          Power BI, Excel, Streamlit, statsmodels, Time-Series Forecasting, Forecast Evaluation (MAE, RMSE, MAPE)
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-white/[0.08] bg-zinc-50/60 dark:bg-white/[0.02]">
                        <h4 className="text-xs font-semibold text-zinc-900 dark:text-white mb-2">Applications &amp; Cloud</h4>
                        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                          Flutter, Power Apps, Power Automate, SharePoint, AWS S3, Three.js / WebGL, Git / GitHub CI/CD
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: ORIGINAL PDF VIEWER */}
              {activeTab === "pdf" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-100 dark:bg-white/[0.03] border border-zinc-200 dark:border-white/[0.08] text-xs">
                    <span className="text-zinc-700 dark:text-zinc-300 font-mono-code">
                      File: Akshay_Resume.pdf · High-Resolution PDF
                    </span>
                    <a
                      href="/assets/Akshay_Resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 font-medium"
                    >
                      Open in Full Tab <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="w-full h-[65vh] rounded-xl overflow-hidden border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-zinc-900 shadow-inner">
                    <iframe
                      src="/assets/Akshay_Resume.pdf#toolbar=1&navpanes=0"
                      className="w-full h-full"
                      title="Akshay Kumar Resume Document"
                    />
                  </div>

                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 text-center font-mono-code">
                    PDF rendering not working on your mobile device?{" "}
                    <a
                      href="/assets/Akshay_Resume.pdf"
                      download="Akshay_Kumar_Resume.pdf"
                      className="text-sky-600 dark:text-sky-400 underline"
                    >
                      Tap here to download directly
                    </a>
                    .
                  </p>
                </div>
              )}

              {/* TAB 3: ATS PLAIN TEXT */}
              {activeTab === "ats" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 font-mono-code">
                      Pristine plain text formatted for seamless copy-pasting into Applicant Tracking Systems (ATS).
                    </p>
                    <button
                      onClick={handleCopyText}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-white dark:border-white/10 text-xs font-mono-code transition-colors cursor-pointer"
                    >
                      {copiedText ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                          <span className="text-emerald-600 dark:text-emerald-400 font-medium">Copied to Clipboard</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
                          <span>Copy Plain Text</span>
                        </>
                      )}
                    </button>
                  </div>

                  <pre className="p-4 rounded-xl bg-zinc-50 dark:bg-[#060609] border border-zinc-200 dark:border-white/[0.08] text-[11px] font-mono-code text-zinc-800 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap overflow-x-auto max-h-[60vh]">
                    {RESUME_PLAIN_TEXT}
                  </pre>
                </div>
              )}
            </div>

            {/* Bottom Footer Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-3 border-t border-zinc-200 dark:border-white/[0.08] bg-zinc-50 dark:bg-[#07070A] text-xs text-zinc-600 dark:text-zinc-400">
              <div className="flex items-center gap-4">
                <span>📍 Washington, DC</span>
                <span>✉️ ak8335a@american.edu</span>
                <span className="hidden sm:inline">📞 (202) 415-4366</span>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.linkedin.com/in/akshaykumardl/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 font-medium transition-colors"
                >
                  linkedin.com/in/akshaykumardl ↗
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

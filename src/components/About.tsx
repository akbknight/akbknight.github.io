"use client";

import { motion } from "framer-motion";

const SKILLS = [
  "Python",
  "SQL",
  "Java",
  "R",
  "C/C++",
  "Pandas",
  "NumPy",
  "DuckDB",
  "MySQL",
  "ETL Pipelines",
  "REST APIs",
  "Power BI",
  "Excel",
  "Streamlit",
  "statsmodels",
  "Time-Series Forecasting",
  "Forecast Evaluation (MAE/RMSE/MAPE)",
  "Flutter",
  "Power Apps",
  "Power Automate",
  "SharePoint",
  "AWS S3",
  "Three.js / WebGL",
  "Git / GitHub CI/CD",
];

export const About = () => {
  return (
    <section id="about">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.4 }}
      >
        <p className="section-label mb-5">01 · About &amp; Focus</p>

        <div className="space-y-4 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
          <p>
            I&apos;m an analytics engineer and STEM MBA candidate at{" "}
            <span className="text-zinc-900 dark:text-white font-semibold">
              American University&apos;s Kogod School of Business
            </span>{" "}
            (Washington, DC · Expected May 2027), concentrating in Business Analytics &amp; Artificial Intelligence (GPA: 3.8/4.0). I also serve as{" "}
            <span className="text-zinc-900 dark:text-white font-semibold">Operations Leader for the Analytics Club at AU</span>, bridging rigorous analytical modeling with high-impact operational delivery.
          </p>
          <p>
            Prior to business school, I served nearly three years as a{" "}
            <span className="text-zinc-900 dark:text-white font-semibold">Business Analyst</span> at the{" "}
            <span className="text-zinc-900 dark:text-white font-semibold">
              U.S. Department of State / U.S. Embassy
            </span>{" "}
            in New Delhi — receiving a <span className="text-sky-600 dark:text-sky-400 font-medium">formal commendation from the U.S. Ambassador</span>. I supported a 30% increase in daily visa-request throughput via seasonal demand dashboards, cut consular complaint triage by 65% through automated Power Platform workflows, streamlined American Citizen Services (ACS) reporting to reduce review cycles by 24%, and managed a $500K+ IT asset migration across 4 consular locations with 99.4% inventory tracking accuracy.
          </p>
          <p>
            At AIS Info, I delivered mission-critical verification data to{" "}
            <span className="text-zinc-900 dark:text-white font-semibold">Capital One</span> by engineering Java pipelines processing 12M court records across 94 federal districts (99.6% classification accuracy), and ingested 85M+ deceased-person records into high-throughput verification databases screening $350M+ in loans with zero discrepancies and sub-second retrieval.
          </p>
          <p>
            Earlier at MS Star Computers, I administered 350+ workstations across 8 regional centers with 99.8% uptime, and moved classes online for 3 K-12 schools during COVID-19 by developing a centralized Flutter educational portal (98% adoption, 2,000+ daily joins). Outside of enterprise systems, I&apos;m a{" "}
            <a
              href="/life"
              className="text-zinc-900 dark:text-white font-medium underline underline-offset-4 decoration-zinc-300 dark:decoration-white/20 hover:decoration-sky-500 hover:text-sky-600 dark:hover:text-sky-300 transition-all duration-150"
            >
              published author
            </a>{" "}
            and photographer.
          </p>
        </div>

        {/* Skills */}
        <div className="mt-8 flex flex-wrap gap-2">
          {SKILLS.map((skill) => (
            <span
              key={skill}
              className="text-[11px] font-mono-code text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-white/[0.08] bg-white dark:bg-[#0E0E14] shadow-xs dark:shadow-none px-2.5 py-1.5 rounded-lg hover:text-sky-600 dark:hover:text-sky-300 hover:border-sky-400/40 dark:hover:border-sky-500/30 transition-all duration-150"
            >
              {skill}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

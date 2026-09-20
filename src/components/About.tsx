"use client";

import { motion } from "framer-motion";

const SKILLS = [
  "Python",
  "SQL",
  "Java",
  "R",
  "pandas",
  "NumPy",
  "MySQL",
  "ETL Pipelines",
  "REST APIs",
  "Power BI",
  "Excel",
  "Streamlit",
  "statsmodels",
  "Time-Series Forecasting",
  "Forecast Evaluation",
  "Flutter",
  "Power Apps",
  "Power Automate",
  "SharePoint",
  "AWS S3",
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
            (Washington, DC · Expected May 2027), concentrating in Business Analytics &amp; Artificial Intelligence. I also serve as{" "}
            <span className="text-zinc-900 dark:text-white font-semibold">Operations Leader for the Analytics Club at AU</span>, connecting data systems to collaborative projects.
          </p>
          <p>
            Prior to business school, I spent three years as a computer programmer at the{" "}
            <span className="text-zinc-900 dark:text-white font-semibold">
              U.S. Department of State
            </span>{" "}
            in New Delhi — supporting a 30% increase in daily visa-request throughput with seasonal demand dashboards, consolidating consular service complaints into centralized Power Platform workflows, and deploying consular vetting software across U.S. diplomatic posts in India.
          </p>
          <p>
            Previously at AIS Info, I delivered verified bankruptcy data to{" "}
            <span className="text-zinc-900 dark:text-white font-semibold">Capital One</span> by engineering Java pipelines that classified fragmented U.S. court records across 94 federal districts, and built a commercial deceased-person verification database to support bank customer screening and loan underwriting.
          </p>
          <p>
            Earlier at MS Star Computers, I moved classes online for 3 schools serving grades 1–12 during COVID-19 by developing a centralized Flutter educational portal that eliminated fragmented communications. Outside of code, I&apos;m a{" "}
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

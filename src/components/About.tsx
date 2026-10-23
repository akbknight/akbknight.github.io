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
        <p className="section-label mb-5">01 · Background &amp; Focus</p>

        <div className="space-y-4 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
          <p>
            I am a STEM MBA candidate at{" "}
            <span className="text-zinc-900 dark:text-white font-semibold">
              American University&apos;s Kogod School of Business
            </span>{" "}
            in Washington, DC (graduating May 2027 · available full-time June 1, 2027), concentrating in Business Analytics &amp; Artificial Intelligence. I serve as{" "}
            <span className="text-zinc-900 dark:text-white font-semibold">Operations Leader for the Analytics Club at AU</span>, and I am targeting full-time roles in Business Intelligence, Data Analytics, and Operations Analytics.
          </p>
          <p>
            My background combines 7+ years of software engineering discipline with operational analytics. Before graduate school, I developed decision-support dashboards and automated service workflows at the{" "}
            <span className="text-zinc-900 dark:text-white font-semibold">
              U.S. Department of State
            </span>{" "}
            (earning a formal commendation from the U.S. Ambassador), engineered public record verification pipelines for{" "}
            <span className="text-zinc-900 dark:text-white font-semibold">Capital One</span>, and deployed multi-site educational systems across regional organizations.
          </p>
          <p>
            I focus on practical data problems: streaming public records into queryable columnar engines, modeling demand with time-series statistics, and building clear interfaces that help operations teams act on data. Outside analytics, I am a{" "}
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

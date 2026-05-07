"use client";

import { motion } from "framer-motion";

const SKILLS = [
  "Python",
  "TypeScript",
  "React",
  "Next.js",
  "SQL",
  "FastAPI",
  "Pandas",
  "DuckDB",
  "Plotly",
  "Streamlit",
  "Azure",
  "Power Apps",
  "Tailwind CSS",
  "Node.js",
  "Claude API",
  "statsmodels",
  "scipy",
  "Chart.js",
];

export const About = () => {
  return (
    <section id="about">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
      >
        <p className="section-label mb-5">01 · About</p>

        <div className="space-y-4 text-sm text-[var(--text-2)] leading-relaxed">
          <p>
            I&apos;m a software engineer and MBA candidate at{" "}
            <span className="text-[var(--text)] font-medium">
              American University&apos;s Kogod School of Business
            </span>
            , studying business analytics and strategy. Before school, I spent
            three years as a computer programmer at the{" "}
            <span className="text-[var(--text)] font-medium">
              U.S. Department of State
            </span>{" "}
            in New Delhi — building scheduling and analytics systems used by
            1,200+ diplomats and support staff.
          </p>
          <p>
            Before that, I built enterprise backend infrastructure for{" "}
            <span className="text-[var(--text)] font-medium">Capital One</span>{" "}
            through a fintech consultancy, aggregating data from 3,000+ sources
            and cutting legal notification time in half through automated
            validation pipelines.
          </p>
          <p>
            These days I work on data pipelines, interactive dashboards, and AI
            tooling — anything where engineering complexity meets real human
            stakes. Outside of code, I&apos;m a{" "}
            <a
              href="/life"
              className="text-[var(--text)] underline underline-offset-4 decoration-[var(--border)] hover:decoration-[var(--accent)] transition-all duration-200"
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
              className="text-[11px] font-mono text-[var(--text-2)] border border-[var(--border)] bg-[var(--bg-card)] px-2.5 py-1.5 rounded hover:text-[var(--accent)] hover:border-[var(--accent)]/30 transition-all duration-200"
            >
              {skill}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

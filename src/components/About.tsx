"use client";

import { motion } from "framer-motion";

const SKILLS = [
  "Python",
  "SQL",
  "Pandas",
  "DuckDB",
  "TypeScript",
  "React",
  "Next.js",
  "FastAPI",
  "Streamlit",
  "Power BI",
  "Tableau",
  "statsmodels",
  "scipy",
  "Azure Administrator Associate",
  "Red Hat RHCSA",
  "AWS S3",
  "Power Apps & Automate",
  "Chart.js",
  "GitHub Actions CI/CD",
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

        <div className="space-y-4 text-sm text-[var(--text-2)] leading-relaxed">
          <p>
            I&apos;m an analytics engineer and STEM MBA candidate at{" "}
            <span className="text-white font-medium">
              American University&apos;s Kogod School of Business
            </span>{" "}
            (Washington, DC · Expected May 2027), specializing in Business Analytics &amp; Artificial Intelligence. I also serve as{" "}
            <span className="text-white font-medium">Operations Leader for the Analytics Club at AU</span>, managing collaborative projects and executive speaker programs for 50+ members.
          </p>
          <p>
            Prior to business school, I spent three years as a computer programmer at the{" "}
            <span className="text-white font-medium">
              U.S. Department of State
            </span>{" "}
            in New Delhi — leading the cross-jurisdictional rollout of a diplomatic vetting system across 10+ embassies in South Asia, Europe, and Africa, while delivering consular fee-revenue and visa analytics directly to mission leadership.
          </p>
          <p>
            Before my government service, I built enterprise backend and financial research infrastructure for{" "}
            <span className="text-white font-medium">Capital One</span> through AIS Info, ingesting and normalizing court filings across 3,000+ public sources. The platform&apos;s high-throughput performance led{" "}
            <span className="text-white font-medium">Wells Fargo, JP Morgan, and Chase</span> to independently license the technology for their own compliance operations.
          </p>
          <p>
            Today, I focus on the intersection of high-throughput data engineering, econometric forecasting, and AI systems analysis. Outside of code, I&apos;m a{" "}
            <a
              href="/life"
              className="text-white underline underline-offset-4 decoration-white/20 hover:decoration-sky-400 hover:text-sky-300 transition-all duration-150"
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
              className="text-[11px] font-mono-code text-zinc-300 border border-white/[0.08] bg-[#09090E] px-2.5 py-1.5 rounded-lg hover:text-sky-300 hover:border-sky-500/30 transition-all duration-150"
            >
              {skill}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

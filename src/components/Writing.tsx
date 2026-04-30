"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

export const Writing = () => {
  return (
    <section id="writing">
      <p className="section-label mb-6">04 · Writing</p>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.45 }}
        className="group flex gap-6 rounded-xl border border-[var(--border)] p-6 transition-all duration-300 hover:border-white/12 hover:bg-white/[0.02]"
      >
        {/* Book cover */}
        <a
          href="https://www.amazon.com/dp/B0FCMZW2N1"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Dawn's Hunger on Amazon"
          className="shrink-0 relative"
        >
          <div className="w-[52px] h-[76px] rounded-sm bg-gradient-to-b from-red-950 to-[#0d0000] border-l-[3px] border-l-red-900/60 flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-300">
            <span
              className="text-[6.5px] font-serif text-red-200/80 text-center uppercase tracking-[0.2em] leading-tight px-1"
              style={{ writingMode: "vertical-rl", textOrientation: "mixed", transform: "rotate(180deg)" }}
            >
              Dawn&apos;s Hunger
            </span>
          </div>
          {/* Spine shadow */}
          <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-r from-black/40 to-transparent rounded-l-sm pointer-events-none" />
        </a>

        {/* Content */}
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors duration-200 mb-1">
            Dawn&apos;s Hunger
          </h3>
          <p className="text-[11px] font-mono text-[var(--text-muted)] italic mb-3">
            &ldquo;When desire crosses oceans, even touchless love burns.&rdquo;
          </p>
          <p className="text-[12px] text-[var(--text-muted)] leading-relaxed mb-4">
            A narrative exploration of urban isolation and the unseen forces that drive us.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="https://www.amazon.com/dp/B0FCMZW2N1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-medium text-[var(--text-2)] hover:text-[var(--accent)] transition-colors duration-200"
            >
              Amazon Kindle
              <ExternalLink className="w-3 h-3" aria-hidden="true" />
            </a>
            <a
              href="https://books.apple.com/us/book/dawns-hunger/id6746973914"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-medium text-[var(--text-2)] hover:text-[var(--accent)] transition-colors duration-200"
            >
              Apple Books
              <ExternalLink className="w-3 h-3" aria-hidden="true" />
            </a>
          </div>
        </div>
      </motion.div>

      {/* Photography teaser */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mt-4"
      >
        <Link
          href="/life"
          className="group flex items-center justify-between rounded-xl border border-[var(--border)] px-6 py-4 transition-all duration-300 hover:border-white/12 hover:bg-white/[0.02]"
        >
          <div>
            <p className="text-[13px] font-medium text-[var(--text)] group-hover:text-[var(--accent)] transition-colors duration-200">
              Photography &amp; more
            </p>
            <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
              Pexels contributor · Beyond the terminal
            </p>
          </div>
          <svg
            className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--accent)] group-hover:translate-x-1 transition-all duration-200 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </motion.div>
    </section>
  );
};

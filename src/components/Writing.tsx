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
        className="card-surface group flex gap-6 rounded-xl border border-zinc-200/80 dark:border-white/[0.08] bg-white dark:bg-[#0E0E14] p-6 shadow-xs dark:shadow-none transition-all duration-200 hover:border-sky-500/40 dark:hover:border-sky-500/30"
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
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors duration-200 mb-1">
            Dawn&apos;s Hunger
          </h3>
          <p className="text-[11px] font-mono-code text-zinc-500 dark:text-zinc-400 italic mb-3">
            &ldquo;When desire crosses oceans, even touchless love burns.&rdquo;
          </p>
          <p className="text-[12px] text-zinc-600 dark:text-zinc-300 leading-relaxed mb-4">
            A narrative exploration of urban isolation and the unseen forces that drive us.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="https://www.amazon.com/dp/B0FCMZW2N1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-medium text-zinc-700 dark:text-zinc-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-200"
            >
              Amazon Kindle
              <ExternalLink className="w-3 h-3" aria-hidden="true" />
            </a>
            <a
              href="https://books.apple.com/us/book/dawns-hunger/id6746973914"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-medium text-zinc-700 dark:text-zinc-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-200"
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
          prefetch={false}
          className="card-surface group flex items-center justify-between rounded-xl border border-zinc-200/80 dark:border-white/[0.08] bg-white dark:bg-[#0E0E14] px-6 py-4 shadow-xs dark:shadow-none transition-all duration-200 hover:border-sky-500/40 dark:hover:border-sky-500/30"
        >
          <div>
            <p className="text-[13px] font-medium text-zinc-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors duration-200">
              Photography &amp; more
            </p>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
              Pexels contributor · Beyond the terminal
            </p>
          </div>
          <svg
            className="w-4 h-4 text-zinc-400 dark:text-zinc-500 group-hover:text-sky-600 dark:group-hover:text-sky-400 group-hover:translate-x-1 transition-all duration-200 shrink-0"
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

"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, FileText, ArrowUpRight, Download } from "lucide-react";

interface ContactProps {
  onOpenResume?: () => void;
}

export const Contact = ({ onOpenResume }: ContactProps) => {
  return (
    <section id="contact" className="py-16 sm:py-24">
      <p className="section-label mb-3">05 · Contact &amp; Availability</p>

      <div className="apple-glass-card p-8 sm:p-12 rounded-3xl space-y-6">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Let&apos;s build together.
        </h2>

        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-2xl font-normal text-pretty">
          I am actively seeking full-time roles in Business Intelligence, Data Analytics, and Operations Analytics starting June 1, 2027, following graduation from American University&apos;s Kogod School of Business (STEM MBA). Whether you have an open role, an analytics challenge, or want to explore my data pipeline work, I would be glad to connect.
        </p>

        {/* Primary Contact Actions */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href="mailto:ak8335a@american.edu"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-500 px-6 py-3 rounded-xl shadow-xs transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
          >
            <Mail className="w-4 h-4" />
            <span>ak8335a@american.edu</span>
          </a>

          <a
            href="https://www.linkedin.com/in/akshaykumardl/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-900 border border-zinc-200 dark:bg-white/[0.05] dark:hover:bg-white/[0.1] dark:text-white dark:border-white/10 text-sm font-medium transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
          >
            <Linkedin className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            <span>LinkedIn</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
          </a>

          {onOpenResume && (
            <button
              type="button"
              onClick={onOpenResume}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-900 border border-zinc-200 dark:bg-white/[0.05] dark:hover:bg-white/[0.1] dark:text-white dark:border-white/10 text-sm font-medium transition-all active:scale-[0.98] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
            >
              <FileText className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              <span>Interactive Résumé</span>
            </button>
          )}
        </div>

        {/* Supporting Contact Metadata */}
        <div className="pt-6 border-t border-zinc-200/80 dark:border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-zinc-500 dark:text-zinc-400">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <a
              href="https://github.com/akbknight"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>github.com/akbknight</span>
            </a>
            <span className="text-zinc-300 dark:text-zinc-700">·</span>
            <span>Washington, DC</span>
          </div>

          <a
            href="/assets/Akshay_Resume.pdf"
            download="Akshay_Kumar_Resume.pdf"
            className="inline-flex items-center gap-1.5 font-mono-code text-[11px] text-sky-600 dark:text-sky-400 hover:underline"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Akshay_Resume.pdf</span>
          </a>
        </div>
      </div>
    </section>
  );
};

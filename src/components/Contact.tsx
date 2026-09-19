"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, FileText, ArrowUpRight, Download } from "lucide-react";
import { MagneticWrapper } from "@/components/MagneticWrapper";

interface ContactProps {
  onOpenResume?: () => void;
}

export const Contact = ({ onOpenResume }: ContactProps) => {
  return (
    <section id="contact">
      <p className="section-label mb-6">06 · Contact &amp; Connect</p>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.45 }}
        className="card-surface p-6 sm:p-8 rounded-2xl border border-zinc-200/80 dark:border-white/[0.08] bg-white dark:bg-[#08080D]/90 backdrop-blur-sm shadow-sm dark:shadow-none"
      >
        <h3
          className="font-bold text-zinc-900 dark:text-white mb-3"
          style={{ fontSize: "clamp(1.4rem, 3vw, 1.85rem)", letterSpacing: "-0.02em", lineHeight: 1.2 }}
        >
          Let&apos;s build something exceptional.
        </h3>

        <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-lg mb-8">
          Currently open to strategic roles, analytics engineering leadership, and high-impact advisory across government, fintech, and enterprise intelligence systems.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <MagneticWrapper>
            <a
              href="mailto:ak8335a@american.edu"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-white dark:text-[#050507] bg-sky-600 hover:bg-sky-500 dark:bg-sky-400 dark:hover:bg-sky-300 px-5 py-3 rounded-xl shadow-md dark:shadow-[0_0_20px_rgba(56,189,248,0.3)] transition-all duration-150"
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              <span>Initiate Conversation</span>
            </a>
          </MagneticWrapper>

          <a
            href="https://www.linkedin.com/in/akshaykumardl/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-900 border border-zinc-300 dark:bg-zinc-800/80 dark:hover:bg-zinc-700 dark:text-white dark:border-white/10 text-xs sm:text-sm font-medium transition-colors group"
          >
            <Linkedin className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            <span>Connect on LinkedIn</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-sky-600 dark:text-zinc-400 dark:group-hover:text-sky-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          {onOpenResume && (
            <button
              onClick={onOpenResume}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-300 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] dark:text-zinc-200 dark:border-white/10 text-xs sm:text-sm font-medium transition-colors cursor-pointer"
            >
              <FileText className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              <span>Interactive Résumé</span>
            </button>
          )}
        </div>

        <div className="pt-6 border-t border-zinc-200 dark:border-white/[0.06] flex flex-wrap items-center justify-between gap-4 text-xs text-zinc-600 dark:text-zinc-400">
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/akbknight"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors duration-150"
            >
              <Github className="w-3.5 h-3.5" aria-hidden="true" />
              github.com/akbknight
            </a>
            <a
              href="https://www.linkedin.com/in/akshaykumardl/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors duration-150"
            >
              <Linkedin className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" aria-hidden="true" />
              linkedin.com/in/akshaykumardl
            </a>
          </div>

          <a
            href="/assets/Akshay_Resume.pdf"
            download="Akshay_Kumar_Resume.pdf"
            className="inline-flex items-center gap-1.5 font-mono-code text-[11px] text-zinc-600 hover:text-sky-600 dark:text-zinc-400 dark:hover:text-sky-300 transition-colors"
          >
            <Download className="w-3 h-3" />
            <span>Akshay_Resume.pdf (369 KB)</span>
          </a>
        </div>
      </motion.div>
    </section>
  );
};

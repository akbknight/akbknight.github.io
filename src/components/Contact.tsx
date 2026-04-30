"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { MagneticWrapper } from "@/components/MagneticWrapper";

export const Contact = () => {
  return (
    <section id="contact">
      <p className="section-label mb-6">05 · Contact</p>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.45 }}
      >
        <h3
          className="font-bold text-[var(--text)] mb-4"
          style={{ fontSize: "clamp(1.4rem, 3vw, 1.85rem)", letterSpacing: "-0.02em", lineHeight: 1.2 }}
        >
          Get in touch
        </h3>

        <p className="text-sm text-[var(--text-2)] leading-relaxed max-w-md mb-8">
          Open to collaboration on data engineering, analytics, and AI projects. If you want to work together or just say hello, my inbox is open.
        </p>

        <MagneticWrapper>
          <a
            href="mailto:ak8335a@american.edu"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--bg)] bg-[var(--accent)] px-6 py-3 rounded-lg hover:opacity-90 active:scale-[0.98] transition-all duration-200"
          >
            <Mail className="w-4 h-4" aria-hidden="true" />
            Say hello
          </a>
        </MagneticWrapper>

        <div className="mt-10 flex items-center gap-5">
          <a
            href="https://github.com/akbknight"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--text)] transition-colors duration-200"
          >
            <Github className="w-3.5 h-3.5" aria-hidden="true" />
            akbknight
          </a>
          <a
            href="https://www.linkedin.com/in/akshaykumardl/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--text)] transition-colors duration-200"
          >
            <Linkedin className="w-3.5 h-3.5" aria-hidden="true" />
            akshaykumardl
          </a>
        </div>
      </motion.div>
    </section>
  );
};

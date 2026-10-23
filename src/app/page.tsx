"use client";

import { useState } from "react";
import { HeaderNav } from "@/components/HeaderNav";
import { HeroSection } from "@/components/HeroSection";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Writing } from "@/components/Writing";
import { PersonalGallery } from "@/components/PersonalGallery";
import { Contact } from "@/components/Contact";
import { ResumeModal } from "@/components/ResumeModal";

export default function Home() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [mascotChoice, setMascotChoice] = useState<"wolf" | "knight">("wolf");

  return (
    <div
      className="min-h-[100dvh] flex flex-col relative"
      style={{ background: "var(--bg)", color: "var(--text)" }}
    >
      {/* Compact Sticky Top Navigation Header with Integrated Mascot Companion */}
      <HeaderNav
        onOpenResume={() => setIsResumeOpen(true)}
        mascotChoice={mascotChoice}
        onToggleMascot={setMascotChoice}
      />

      {/* Main Spacious Editorial Content Container */}
      <main id="content" className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 00 · Hero Overview & Evidence */}
        <HeroSection onOpenResume={() => setIsResumeOpen(true)} />

        {/* 01 · Selected Systems & Evidence (Including Hairline Architecture) */}
        <Projects />

        {/* 02 · Career Track Record & Academic Background */}
        <Experience onOpenResume={() => setIsResumeOpen(true)} />

        {/* 03 · Technical Write-ups & Methodology */}
        <Writing />

        {/* 04 · Personal Dimension & Photography */}
        <PersonalGallery />

        {/* 05 · Contact & Hiring */}
        <Contact onOpenResume={() => setIsResumeOpen(true)} />

        {/* Quiet Editorial Footer */}
        <footer className="py-12 border-t border-zinc-200/80 dark:border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs font-mono-code text-zinc-600 dark:text-zinc-300">
            Architected &amp; engineered by Akshay Kumar · {new Date().getFullYear()}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono-code">
            <button
              type="button"
              onClick={() => setIsResumeOpen(true)}
              className="text-sky-600 dark:text-sky-400 hover:underline cursor-pointer"
            >
              Curriculum Vitae (PDF) ↗
            </button>
            <a
              href="https://github.com/akbknight/akbknight.github.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white transition-colors"
            >
              Source Code ↗
            </a>
            <a
              href="/life"
              className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white transition-colors"
            >
              Essays &amp; Journal ↗
            </a>
          </div>
        </footer>
      </main>

      {/* Interactive Résumé Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}

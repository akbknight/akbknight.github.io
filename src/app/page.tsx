"use client";

import { useState } from "react";
import { LeftPanel } from "@/components/LeftPanel";
import { HeroSection } from "@/components/HeroSection";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { Projects } from "@/components/Projects";
import { Writing } from "@/components/Writing";
import { PhotoLanes } from "@/components/PhotoLanes";
import { Contact } from "@/components/Contact";
import { ResumeModal } from "@/components/ResumeModal";

export default function Home() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <main
      className="min-h-[100dvh]"
      style={{ background: "var(--bg)", color: "var(--text)" }}
    >
      <div className="mx-auto max-w-screen-xl px-6 md:px-12 lg:px-20">
        <div className="lg:flex lg:gap-12 xl:gap-16">

          {/* ── Left: sticky sidebar with executive profile ──── */}
          <aside
            aria-label="Executive profile and site navigation"
            className="
              lg:sticky lg:top-0 lg:max-h-screen lg:overflow-hidden
              lg:w-[40%] xl:w-[38%]
              flex flex-col
              pt-16 pb-10 lg:py-24
            "
          >
            <LeftPanel onOpenResume={() => setIsResumeOpen(true)} />
          </aside>

          {/* ── Right: scrollable narrative & technical portfolio ── */}
          <div className="lg:w-[60%] xl:w-[62%] pt-6 lg:pt-20 pb-24 space-y-20">
            {/* Commanding Hero Section with verified metrics & dual CTAs */}
            <HeroSection onOpenResume={() => setIsResumeOpen(true)} />

            <About />
            <Experience onOpenResume={() => setIsResumeOpen(true)} />
            <ArchitectureDiagram />
            <Projects />
            <Writing />
            <Contact onOpenResume={() => setIsResumeOpen(true)} />

            {/* Accessible Executive Footer */}
            <footer
              className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-zinc-200 dark:border-white/[0.08]"
            >
              <p className="text-[11px] font-mono-code text-zinc-500 dark:text-zinc-400">
                Architected &amp; engineered by Akshay Kumar · {new Date().getFullYear()}
              </p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsResumeOpen(true)}
                  className="text-[11px] font-mono-code text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 transition-colors cursor-pointer"
                >
                  Curriculum Vitae (PDF) ↗
                </button>
                <a
                  href="https://github.com/akbknight/akbknight.github.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-mono-code text-zinc-500 hover:text-sky-600 dark:text-zinc-400 dark:hover:text-sky-400 transition-colors"
                >
                  Source Code ↗
                </a>
                <a
                  href="/life"
                  className="text-[11px] font-mono-code text-zinc-500 hover:text-sky-600 dark:text-zinc-400 dark:hover:text-sky-400 transition-colors"
                >
                  Photography &amp; Essays ↗
                </a>
              </div>
            </footer>
          </div>

        </div>
      </div>

      {/* ── Visual Breakout: Curated photography lanes ── */}
      <PhotoLanes />

      {/* ── High-Fidelity Interactive Resume Modal ── */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </main>
  );
}

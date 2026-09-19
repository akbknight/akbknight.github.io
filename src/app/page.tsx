"use client";

import { LeftPanel } from "@/components/LeftPanel";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { Projects } from "@/components/Projects";
import { Writing } from "@/components/Writing";
import { PhotoLanes } from "@/components/PhotoLanes";
import { Contact } from "@/components/Contact";

export default function Home() {
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
              lg:w-[42%] xl:w-[40%]
              flex flex-col
              pt-16 pb-10 lg:py-24
            "
          >
            <LeftPanel />
          </aside>

          {/* ── Right: scrollable narrative & technical portfolio ── */}
          <div className="lg:w-[58%] xl:w-[60%] pt-4 lg:pt-24 pb-24 space-y-24">
            <About />
            <Experience />
            <ArchitectureDiagram />
            <Projects />
            <Writing />
            <Contact />

            {/* Accessible Executive Footer */}
            <footer
              className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-white/[0.08]"
            >
              <p className="text-[11px] font-mono-code text-zinc-400">
                Architected &amp; built by Akshay Kumar · {new Date().getFullYear()}
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="https://github.com/akbknight/akbknight.github.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-mono-code text-zinc-400 hover:text-sky-400 transition-colors"
                >
                  Source Code ↗
                </a>
                <a
                  href="/life"
                  className="text-[11px] font-mono-code text-zinc-400 hover:text-sky-400 transition-colors"
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
    </main>
  );
}

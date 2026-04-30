"use client";

import { LeftPanel } from "@/components/LeftPanel";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Writing } from "@/components/Writing";
import { PhotoLanes } from "@/components/PhotoLanes";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <main
      className="min-h-screen"
      style={{ background: "var(--bg)", color: "var(--text)" }}
    >
      <div className="mx-auto max-w-screen-xl px-6 md:px-12 lg:px-20">
        <div className="lg:flex lg:gap-12 xl:gap-16">

          {/* ── Left: sticky sidebar (Brittany Chiang pattern) ──── */}
          <aside
            aria-label="Site navigation and introduction"
            className="
              lg:sticky lg:top-0 lg:max-h-screen lg:overflow-hidden
              lg:w-[44%] xl:w-[42%]
              flex flex-col
              pt-16 pb-10 lg:py-24
            "
          >
            <LeftPanel />
          </aside>

          {/* ── Right: scrollable content ─────────────────────── */}
          <div className="lg:w-[56%] xl:w-[58%] pt-4 lg:pt-24 pb-24 space-y-28">
            <About />
            <Experience />
            <Projects />
            <Writing />
            <Contact />

            {/* Footer */}
            <footer
              className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t"
              style={{ borderColor: "var(--border)" }}
            >
              <p className="text-[11px] font-mono" style={{ color: "var(--text-muted)" }}>
                Designed &amp; built by Akshay Kumar · {new Date().getFullYear()}
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="https://github.com/akbknight/akbknight.github.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-mono transition-colors duration-200"
                  style={{ color: "var(--text-muted)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}
                >
                  Source ↗
                </a>
                <a
                  href="/life"
                  className="text-[11px] font-mono transition-colors duration-200"
                  style={{ color: "var(--text-muted)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}
                >
                  {/* Easter egg: hidden in plain sight */}
                  <span title="🎉 You found the easter egg. DM me on LinkedIn.">The Life ·_·</span>
                </a>
              </div>
            </footer>
          </div>

        </div>
      </div>

      {/* ── Full-bleed photo lanes — breaks out of the column container ── */}
      <PhotoLanes />
    </main>
  );
}

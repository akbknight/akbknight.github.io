"use client";

import { useState } from "react";
import { HeaderNav } from "@/components/HeaderNav";
import { ResumeModal } from "@/components/ResumeModal";
import { AmbientCanvas } from "@/components/AmbientCanvas";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, ExternalLink, Camera } from "lucide-react";

const PHOTOS = [
  { id: 1449241, src: "https://images.pexels.com/photos/1449241/pexels-photo-1449241.jpeg", alt: "Architectural symmetry and linear light" },
  { id: 4086702, src: "https://images.pexels.com/photos/4086702/pexels-photo-4086702.jpeg", alt: "Urban high-angle geometry and streets" },
  { id: 4086698, src: "https://images.pexels.com/photos/4086698/pexels-photo-4086698.jpeg", alt: "Facade perspective study" },
  { id: 4086686, src: "https://images.pexels.com/photos/4086686/pexels-photo-4086686.jpeg", alt: "Minimalist structural perspective" },
  { id: 5156155, src: "https://images.pexels.com/photos/5156155/pexels-photo-5156155.jpeg", alt: "Atmospheric evening city lights" },
  { id: 5156154, src: "https://images.pexels.com/photos/5156154/pexels-photo-5156154.jpeg", alt: "Documentary street shadow" },
  { id: 9257002, src: "https://images.pexels.com/photos/9257002/pexels-photo-9257002.jpeg", alt: "Black and white architectural rhythm" },
  { id: 1176757, src: "https://images.pexels.com/photos/1176757/pexels-photo-1176757.jpeg", alt: "Natural landscape form and light" },
  { id: 1176707, src: "https://images.pexels.com/photos/1176707/pexels-photo-1176707.jpeg", alt: "Coastal atmospheric perspective" },
  { id: 1449239, src: "https://images.pexels.com/photos/1449239/pexels-photo-1449239.jpeg", alt: "Urban diagonal architectural grid" },
];

export default function LifePage() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [mascotChoice, setMascotChoice] = useState<"wolf" | "knight">("wolf");

  return (
    <div
      className="min-h-[100dvh] flex flex-col relative overflow-x-clip"
      style={{ background: "var(--bg)", color: "var(--text)" }}
    >
      {/* Living Atmospheric Canvas */}
      <AmbientCanvas />

      {/* Architectural Coordinate Grid & Dot Matrix */}
      <div className="apple-architectural-grid" aria-hidden="true" />
      <div className="apple-dot-matrix" aria-hidden="true" />

      {/* Top Aurora Bloom */}
      <div className="apple-aurora-top" aria-hidden="true" />

      {/* Unified Top Navigation */}
      <HeaderNav
        onOpenResume={() => setIsResumeOpen(true)}
        mascotChoice={mascotChoice}
        onToggleMascot={setMascotChoice}
      />

      <main className="relative z-10 flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-16 sm:mb-20"
        >
          <p className="section-label mb-3">04 · Personal Dimension</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white leading-tight">
            Beyond the Terminal
          </h1>
          <p className="mt-3 text-base text-zinc-600 dark:text-zinc-300 max-w-xl leading-relaxed">
            Exploration through narrative writing and visual practice. A quiet counterweight to analytics and systems engineering.
          </p>
        </motion.div>

        {/* Section 1: The Book */}
        <section className="mb-24 p-6 sm:p-10 rounded-2xl apple-glass-card border border-zinc-200/80 dark:border-white/[0.08]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Book Artwork Cover */}
            <div className="md:col-span-5 flex justify-center">
              <a
                href="https://www.amazon.com/dp/B0FCMZW2N1"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block w-48 sm:w-52 h-72 sm:h-80 shadow-2xl rounded-lg overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]"
                aria-label="Dawn's Hunger on Amazon"
              >
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center"
                  style={{ background: "linear-gradient(160deg, #3f0909 0%, #100202 100%)" }}
                >
                  <span
                    className="text-xl font-bold text-red-100 uppercase tracking-widest border-b border-red-900/60 pb-3 mb-3"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    Dawn&apos;s<br />Hunger
                  </span>
                  <span className="text-[11px] font-mono-code text-red-300/80 uppercase tracking-widest">
                    Akshay Kumar
                  </span>
                </div>
                {/* Book Spine Shadow */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-3 pointer-events-none"
                  style={{ background: "linear-gradient(to right, rgba(0,0,0,0.7), transparent)" }}
                />
              </a>
            </div>

            {/* Book Description & Links */}
            <div className="md:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono-code px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20">
                  Published Fiction
                </span>
                <span className="text-xs font-mono-code text-zinc-500 dark:text-zinc-400">
                  Novella
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
                Dawn&apos;s Hunger
              </h2>

              <p className="text-base italic text-sky-700 dark:text-sky-400 leading-relaxed font-serif">
                &ldquo;When desire crosses oceans, even touchless love burns.&rdquo;
              </p>

              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
                A narrative exploration of emotional connection across borders, urban isolation, and the internal forces that shape modern relationships.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="https://www.amazon.com/dp/B0FCMZW2N1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-100 dark:text-zinc-900 text-xs font-semibold transition-all shadow-xs"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Amazon Kindle</span>
                  <ExternalLink className="w-3 h-3 ml-0.5 opacity-60" />
                </a>

                <a
                  href="https://books.apple.com/us/book/dawns-hunger/id6746973914"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-zinc-300 dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-medium transition-colors"
                >
                  <span>Apple Books</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Photography Gallery */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-zinc-200/80 dark:border-white/[0.08] pb-6">
            <div>
              <p className="section-label mb-2">Visual Exploration</p>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                Selected Photography Studies
              </h2>
            </div>

            <a
              href="https://www.pexels.com/@akbknight/gallery/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono-code text-sky-600 dark:text-sky-400 hover:underline"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Full Pexels Profile ↗</span>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PHOTOS.map((photo) => (
              <div
                key={photo.id}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden border border-zinc-200/80 dark:border-white/[0.08] bg-zinc-950 shadow-xs"
              >
                <Image
                  src={`${photo.src}?auto=compress&cs=tinysrgb&w=800`}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <p className="text-xs font-medium text-white">{photo.alt}</p>
                  <a
                    href={`https://www.pexels.com/photo/${photo.id}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-mono-code text-sky-300 hover:underline mt-1"
                  >
                    View photo on Pexels ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quiet Editorial Footer */}
        <footer className="mt-24 pt-8 border-t border-zinc-200/80 dark:border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs font-mono-code text-zinc-600 dark:text-zinc-300">
            Architected &amp; engineered by Akshay Kumar · {new Date().getFullYear()}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono-code">
            <button
              type="button"
              onClick={() => setIsResumeOpen(true)}
              className="text-sky-600 dark:text-sky-400 hover:underline cursor-pointer"
            >
              View résumé ↗
            </button>
            <a
              href="/assets/Akshay_Resume.pdf"
              download="Akshay_Kumar_Resume.pdf"
              className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white transition-colors"
            >
              Download PDF ↗
            </a>
            <Link
              href="/#work"
              className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white transition-colors"
            >
              Selected Work ↗
            </Link>
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

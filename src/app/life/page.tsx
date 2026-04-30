"use client";

import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import Image from "next/image";

const PHOTOS = [
  "https://images.pexels.com/photos/1449241/pexels-photo-1449241.jpeg",
  "https://images.pexels.com/photos/4086702/pexels-photo-4086702.jpeg",
  "https://images.pexels.com/photos/4086698/pexels-photo-4086698.jpeg",
  "https://images.pexels.com/photos/4086686/pexels-photo-4086686.jpeg",
  "https://images.pexels.com/photos/5156155/pexels-photo-5156155.jpeg",
  "https://images.pexels.com/photos/5156154/pexels-photo-5156154.jpeg",
  "https://images.pexels.com/photos/9257002/pexels-photo-9257002.jpeg",
  "https://images.pexels.com/photos/1176757/pexels-photo-1176757.jpeg",
  "https://images.pexels.com/photos/1176707/pexels-photo-1176707.jpeg",
  "https://images.pexels.com/photos/1449239/pexels-photo-1449239.jpeg",
];

export default function LifePage() {
  return (
    <main
      className="min-h-screen"
      style={{ background: "var(--bg)", color: "var(--text)" }}
    >
      <Navbar />

      <div className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-24"
        >
          <p className="section-label mb-4">Beyond the code</p>
          <h1
            className="font-bold tracking-tight"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              color: "var(--text)",
            }}
          >
            Beyond the Terminal
          </h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>
            Exploration through lens and narrative. A glimpse into what happens when I close the editor.
          </p>
        </motion.div>

        {/* Section 1: The Book */}
        <section className="mb-28 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <a
              href="https://www.amazon.com/dp/B0FCMZW2N1"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block w-52 h-80"
              aria-label="Dawn's Hunger on Amazon"
            >
              {/* Book body */}
              <div
                className="absolute inset-0 rounded-md shadow-2xl flex flex-col items-center justify-center p-8 transition-transform duration-500 group-hover:scale-[1.03]"
                style={{ background: "linear-gradient(160deg, #4a0000 0%, #0d0000 100%)" }}
              >
                <span
                  className="text-lg font-bold text-red-100 text-center uppercase tracking-widest border-b border-red-900/40 pb-4 mb-4"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  Dawn&apos;s<br />Hunger
                </span>
                <span className="text-[10px] text-red-300/70 uppercase tracking-[0.25em]">
                  Akshay Kumar
                </span>
              </div>
              {/* Spine effect */}
              <div className="absolute left-0 top-0 bottom-0 w-3 rounded-l-md"
                style={{ background: "linear-gradient(to right, rgba(0,0,0,0.6), transparent)" }} />
              {/* Shine */}
              <div className="absolute top-0 right-0 bottom-0 w-8 rounded-r-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "linear-gradient(to left, rgba(255,255,255,0.05), transparent)" }} />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-px" style={{ background: "var(--accent)" }} />
              <span className="section-label">Recent Release</span>
            </div>

            <h2
              className="font-bold mb-4"
              style={{ fontSize: "clamp(1.4rem, 3vw, 1.9rem)", letterSpacing: "-0.02em", color: "var(--text)" }}
            >
              Dawn&apos;s Hunger
            </h2>

            <p className="text-base italic mb-4 leading-relaxed" style={{ color: "var(--accent)", fontFamily: "Georgia, serif" }}>
              &ldquo;When desire crosses oceans,<br />even touchless love burns.&rdquo;
            </p>

            <p className="text-sm leading-relaxed mb-8" style={{ color: "var(--text-2)" }}>
              A narrative exploration of urban isolation and the unseen forces that drive us. Available on Amazon Kindle and Apple Books.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://books.apple.com/us/book/dawns-hunger/id6746973914"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
              >
                Apple Books
              </a>
              <a
                href="https://www.amazon.com/dp/B0FCMZW2N1"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-lg text-sm font-bold transition-all duration-200"
                style={{ background: "#FF9900", color: "#000" }}
              >
                Amazon Kindle
              </a>
            </div>
          </motion.div>
        </section>

        {/* Section 2: Photography */}
        <section>
          <div className="flex items-center gap-3 mb-12 justify-center">
            <span className="w-12 h-px" style={{ background: "var(--border)" }} />
            <p className="section-label" style={{ color: "var(--text-muted)" }}>Visual Log</p>
            <span className="w-12 h-px" style={{ background: "var(--border)" }} />
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {PHOTOS.map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="break-inside-avoid"
              >
                <a
                  href="https://www.pexels.com/@akbknight/highlights/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block overflow-hidden rounded-sm"
                  aria-label="View on Pexels"
                >
                  <Image
                    src={`${src}?auto=compress&cs=tinysrgb&w=800`}
                    alt={`Photography by Akshay Kumar — image ${i + 1}`}
                    width={800}
                    height={1000}
                    loading="lazy"
                    className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-xs font-mono tracking-widest uppercase border border-white/30 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-sm">
                      Pexels
                    </span>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

"use client";

import { BentoGrid, BentoTile } from "@/components/BentoGrid";
import { SplitHero } from "@/components/SplitHero";
import { Navbar } from "@/components/Navbar";
import { CodeVisual } from "../components/CodeVisual";
import { Experience } from "@/components/Experience";
import { Contact } from "@/components/Contact";
import { motion } from "framer-motion";
import {
  Code2,
  Database,
  Globe,
  LayoutDashboard,
  Rocket,
  BookOpen,
} from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8 flex flex-col items-center relative overflow-hidden bg-[#0a0a0a]">
      <Navbar />

      {/* Background glow effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-900/10 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-7xl pt-24 pb-12">
        <SplitHero />

        <BentoGrid className="max-w-7xl mx-auto">
          {/* Tile 1: Code Visual (Kept as a technical showcase in the grid) */}
          <BentoTile
            title="Technical Core"
            description="Next.js 15, React Server Components, Tailwind v4. Clean, performant, and type-safe."
            header={<CodeVisual />}
            className="md:col-span-2 md:row-span-2 min-h-[300px]"
            icon={<Code2 className="h-4 w-4 text-neutral-500" />}
          />

          {/* Tile 2: Capital One (The Big Win) */}
          <BentoTile
            title="Bankruptcy Data Platform"
            description={
              <span className="text-sm">
                Reduced legal notification latency by <b>50%</b> via automated
                bankruptcy data validation. Aggregated 3,000+ data sources.
              </span>
            }
            header={
              <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800 items-center justify-center">
                <Database className="h-12 w-12 text-blue-500/50" />
              </div>
            }
            className="md:col-span-1"
            icon={<LayoutDashboard className="h-4 w-4 text-neutral-500" />}
          />

          {/* Tile 3: U.S. Embassy (The Scale) */}
          <BentoTile
            title="Diplomatic Operations Platform"
            description={
              <span className="text-sm">
                Deployed analytics architecture for <b>1,200+ users</b>. Automated complaint tracking to drive a <b>75% efficiency surge</b>.
              </span>
            }
            header={
              <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800 items-center justify-center">
                <Globe className="h-12 w-12 text-green-500/50" />
              </div>
            }
            className="md:col-span-1"
            icon={<Rocket className="h-4 w-4 text-neutral-500" />}
          />

          {/* Tile 4: Source Code */}
          <BentoTile
            title="Source Code: This Portfolio"
            description="The code behind this 'Digital Twin'. Built with Next.js 15, Tailwind v4, and Framer Motion."
            header={
              <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-neutral-900 border border-neutral-800 p-4 font-mono text-xs text-green-400 overflow-hidden relative group cursor-pointer" onClick={() => window.open('https://github.com/akbknight/akbknight.github.io', '_blank')}>
                <div className="absolute inset-0 bg-black/50 group-hover:bg-transparent transition-all z-10 flex items-center justify-center">
                  <span className="text-white opacity-0 group-hover:opacity-100 font-bold bg-black/80 px-2 py-1 rounded">View Repository</span>
                </div>
                <p>&gt; git clone akbknight.github.io</p>
                <p>&gt; npm install</p>
                <p className="text-blue-400">&gt; ready on localhost:3000</p>
              </div>
            }
            className="md:col-span-1"
            icon={<Code2 className="h-4 w-4 text-neutral-500" />}
          />

          {/* Tile 5: Author Persona (Teaser) */}
          <BentoTile
            title="The Creative Side"
            description="Brief view into Photography and Writing."
            header={
              <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-neutral-900 items-center justify-center">
                <BookOpen className="h-10 w-10 text-red-400/50" />
              </div>
            }
            className="md:col-span-1 cursor-pointer hover:border-red-500/30"
            icon={<BookOpen className="h-4 w-4 text-neutral-500" />}
            onClick={() => window.location.href = '/life'}
          />
        </BentoGrid>

        <Experience />
        <Contact />
      </div>

      <footer className="mt-20 text-neutral-600 text-sm">
        © {new Date().getFullYear()} Akshay Kumar. Built with Next.js 15 & Tailwind.
      </footer>
    </main>
  );
}

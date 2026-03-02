"use client";

import { SplitHero } from "@/components/SplitHero";
import { Navbar } from "@/components/Navbar";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { DeveloperAnalytics } from "@/components/DeveloperAnalytics";
import { Experience } from "@/components/Experience";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8 flex flex-col items-center relative overflow-hidden bg-[#0a0a0a]">
      <Navbar />

      {/* Background glow effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-900/10 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-7xl pt-24 pb-12 flex flex-col items-center gap-12">
        <SplitHero />

        <div className="w-full max-w-5xl">
          <ProjectsGrid />
          <DeveloperAnalytics />
          <Experience />
          <Contact />
        </div>
      </div>

      <footer className="mt-12 text-neutral-600 text-sm py-8 text-center w-full border-t border-white/5">
        © {new Date().getFullYear()} Akshay Kumar. Built with Next.js 15 & Tailwind.
      </footer>
    </main>
  );
}

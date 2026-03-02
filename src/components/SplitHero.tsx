"use client";

import { motion } from "framer-motion";
import { Cpu, ArrowDown } from "lucide-react";

export const SplitHero = () => {
    return (
        <div className="relative w-full min-h-[500px] flex flex-col justify-center items-center overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-blue-950/20 via-black/50 to-neutral-900/30 backdrop-blur-xl mb-12 text-center p-8 md:p-16 relative group">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="z-10 flex flex-col items-center max-w-3xl mx-auto"
            >
                <div className="flex items-center gap-2 mb-6">
                    <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
                        <Cpu className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-mono text-blue-300 tracking-wider">LEAD UI/UX & FRONTEND DEVELOPER</span>
                </div>

                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
                    Diplomatic-Grade <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Engineering.</span>
                </h1>

                <p className="text-lg md:text-xl text-neutral-400 mb-10 max-w-2xl leading-relaxed">
                    Building resilient, enterprise-scale platforms with modern technologies. Bridging the gap between complex backend architectures and premium user experiences.
                </p>

                <div className="flex flex-wrap justify-center gap-3 mb-12 text-xs font-mono text-blue-200/60">
                    <span className="px-3 py-1.5 rounded bg-blue-900/30 border border-blue-800/50 hover:bg-blue-900/50 transition-colors">REACT</span>
                    <span className="px-3 py-1.5 rounded bg-blue-900/30 border border-blue-800/50 hover:bg-blue-900/50 transition-colors">NEXT.JS 15</span>
                    <span className="px-3 py-1.5 rounded bg-blue-900/30 border border-blue-800/50 hover:bg-blue-900/50 transition-colors">PYTHON / FASTAPI</span>
                    <span className="px-3 py-1.5 rounded bg-blue-900/30 border border-blue-800/50 hover:bg-blue-900/50 transition-colors">TAILWIND CSS</span>
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-semibold text-lg transition-transform hover:shadow-lg hover:shadow-white/20"
                >
                    View My Projects
                    <ArrowDown className="w-5 h-5" />
                </motion.button>
            </motion.div>
        </div>
    );
};

"use client";

import { motion } from "framer-motion";
import { TrendingUp, Cpu, ArrowDown } from "lucide-react";

export const SplitHero = () => {
    return (
        <div className="relative w-full min-h-[500px] flex flex-col md:flex-row items-stretch justify-center overflow-hidden rounded-3xl border border-white/5 bg-black/50 backdrop-blur-xl mb-12 group">

            {/* LEFT SIDE: THE BUILDER */}
            <div className="flex-1 relative p-8 md:p-12 pb-24 md:pb-12 flex flex-col justify-center items-start border-b md:border-b-0 md:border-r border-white/5 bg-gradient-to-br from-blue-950/20 to-transparent">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>

                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="z-10"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
                            <Cpu className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-mono text-blue-300 tracking-wider">THE BUILDER</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                        Diplomatic-Grade <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Engineering.</span>
                    </h2>
                    <div className="flex flex-wrap gap-2 mt-4 text-xs font-mono text-blue-200/60">
                        <span className="px-2 py-1 rounded bg-blue-900/30 border border-blue-800/50">U.S. STATE DEPT</span>
                        <span className="px-2 py-1 rounded bg-blue-900/30 border border-blue-800/50">CAPITAL ONE</span>
                        <span className="px-2 py-1 rounded bg-blue-900/30 border border-blue-800/50">NEXT.JS 15</span>
                    </div>
                </motion.div>
            </div>

            {/* CENTER LINE / BRIDGE */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-center justify-center p-4">
                <div className="h-24 w-[1px] bg-gradient-to-b from-transparent via-white/50 to-transparent"></div>
                <div className="my-4 px-4 py-1 rounded-full bg-black/80 border border-white/10 backdrop-blur text-[10px] text-neutral-400 uppercase tracking-widest whitespace-nowrap">
                    Bridging the Gap
                </div>
                <div className="h-24 w-[1px] bg-gradient-to-b from-transparent via-white/50 to-transparent"></div>
            </div>

            {/* RIGHT SIDE: THE STRATEGIST */}
            <div className="flex-1 relative p-8 md:p-12 pb-24 md:pb-12 flex flex-col justify-center items-end text-right bg-gradient-to-bl from-amber-950/20 to-transparent">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="z-10 flex flex-col items-end"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-sm font-mono text-amber-300 tracking-wider">THE STRATEGIST</span>
                        <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
                            <TrendingUp className="w-5 h-5" />
                        </div>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                        Business <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-l from-amber-200 to-yellow-500">Intelligence.</span>
                    </h2>
                    <div className="flex flex-wrap gap-2 mt-4 text-xs font-mono text-amber-200/60 justify-end">
                        <span className="px-2 py-1 rounded bg-amber-900/30 border border-amber-800/50">MBA CANDIDATE</span>
                        <span className="px-2 py-1 rounded bg-amber-900/30 border border-amber-800/50">ANALYTICS @ AU</span>
                        <span className="px-2 py-1 rounded bg-amber-900/30 border border-amber-800/50">STRATEGY</span>
                    </div>
                </motion.div>
            </div>

            {/* CTA BUTTON */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 w-[80%] md:w-auto flex justify-center">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex justify-center items-center gap-2 w-full md:w-auto px-6 md:px-8 py-3 md:py-4 rounded-full bg-white text-black font-semibold text-sm md:text-base transition-transform hover:shadow-lg hover:shadow-white/20 whitespace-nowrap"
                >
                    View My Projects
                    <ArrowDown className="w-4 h-4" />
                </motion.button>
            </div>

        </div>
    );
};

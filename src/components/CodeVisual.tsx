"use client";

import { motion } from "framer-motion";

export const CodeVisual = () => {
    return (
        <div className="w-full h-full min-h-[200px] flex flex-col justify-center items-start p-6 bg-neutral-900/50 rounded-xl border border-neutral-800 font-mono text-sm relative overflow-hidden">
            {/* Animated Typing Effect Mock */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="z-10"
            >
                <div className="text-green-400 mb-2">
                    <span className="text-purple-400">const</span> akshay = {"{"}
                </div>
                <div className="pl-4 text-neutral-300">
                    role: <span className="text-yellow-300">"Senior Architect"</span>,
                </div>
                <div className="pl-4 text-neutral-300">
                    education: <span className="text-yellow-300">"MBA/MSBAAI Candidate"</span>,
                </div>
                <div className="pl-4 text-neutral-300">
                    stack: [
                    <span className="text-blue-300">"Python"</span>, <span className="text-blue-300">"R"</span>, <span className="text-blue-300">"Power BI"</span>,
                    <span className="text-blue-300">"SQL"</span>, <span className="text-blue-300">"Azure"</span>, <span className="text-blue-300">"AWS"</span>,
                    <span className="text-blue-300">"MERN Stack"</span>, <span className="text-blue-300">"Check GitHub for more..."</span>
                    ],
                </div>
                <div className="pl-4 text-neutral-300">
                    mission: <span className="text-yellow-300">"Diplomatic-Grade Systems"</span>
                </div>
                <div className="text-neutral-400">{"}"};</div>
            </motion.div>

            {/* Background decoration */}
            <div className="absolute top-0 right-0 p-4 opacity-20">
                <div className="h-20 w-20 rounded-full border border-primary/30 animate-pulse"></div>
            </div>
        </div>
    );
};

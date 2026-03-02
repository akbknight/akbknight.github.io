"use client";

import { motion } from "framer-motion";
import { Activity, Code, GitCommit, GitPullRequest, Terminal } from "lucide-react";

export const DeveloperAnalytics = () => {
    const stats = [
        { label: "Total Contributions", value: "850+", icon: <GitCommit className="w-4 h-4" /> },
        { label: "Current Streak", value: "14 Days", icon: <Activity className="w-4 h-4" /> },
        { label: "Repositories", value: "34", icon: <GitPullRequest className="w-4 h-4" /> },
    ];

    const languages = [
        { name: "Python", percentage: 45, color: "bg-blue-500" },
        { name: "React / JS", percentage: 35, color: "bg-yellow-400" },
        { name: "Java", percentage: 10, color: "bg-red-500" },
        { name: "SQL", percentage: 5, color: "bg-green-500" },
        { name: "C++", percentage: 5, color: "bg-indigo-500" },
    ];

    return (
        <section className="w-full py-16 border-t border-white/5 shrink-0">
            <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 flex items-center gap-3">
                    <Terminal className="w-8 h-8 text-neutral-500" />
                    Developer Analytics
                </h2>
                <p className="text-neutral-400 text-sm max-w-2xl">
                    A snapshot of my recent coding activity and primary technology footprint based on historical project data and resume highlights.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="p-6 rounded-2xl bg-neutral-900/40 border border-white/5 flex flex-col items-center justify-center text-center backdrop-blur-sm"
                    >
                        <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-300 mb-4">
                            {stat.icon}
                        </div>
                        <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                        <p className="text-xs text-neutral-500 uppercase tracking-widest">{stat.label}</p>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl bg-neutral-900/60 border border-white/5 backdrop-blur-sm"
            >
                <div className="flex items-center gap-2 mb-6 text-neutral-300">
                    <Code className="w-5 h-5" />
                    <h3 className="font-medium text-lg">Top Languages</h3>
                </div>

                <div className="space-y-5">
                    {languages.map((lang, index) => (
                        <div key={lang.name} className="flex flex-col gap-2">
                            <div className="flex justify-between items-center text-sm font-mono">
                                <span className="text-neutral-300">{lang.name}</span>
                                <span className="text-neutral-500">{lang.percentage}%</span>
                            </div>
                            <div className="h-2 w-full bg-neutral-800 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${lang.percentage}%` }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, delay: index * 0.1 }}
                                    className={`h-full rounded-full ${lang.color}`}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

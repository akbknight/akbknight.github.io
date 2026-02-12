"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";

const experiences = [
    {
        role: "Research Assistant",
        company: "American University, Kogod School of Business",
        location: "Washington, DC",
        date: "Nov 2025 – Present",
        description: [
            "Conducted research on AI adoption in university admissions by analyzing industry reports and synthesizing findings on tools such as Othot, UiPath, Element451, and Kira Talent to support data-driven strategic planning and automation initiatives.",
            "Produced comprehensive research deliverables for leadership, integrating AI-supported formatting, summarizing trends, case studies, and actionable insights to enhance operational efficiency and inform admissions strategy.",
        ],
    },
    {
        role: "Computer Programmer",
        company: "U.S. Department of State",
        location: "New Delhi, India",
        date: "Nov 2022 – Sep 2025",
        description: [
            "Deployed analytics-focused architecture systems business decision-making for 1,200+ users; automated complaint tracking to increase operational efficiency by 75% and optimized reporting workflows to reduce task time by 20%.",
            "Led cross-functional collaboration on predictive analytics and dashboard projects, applying statistical tools to clean and standardize large datasets, delivering actionable insights that supported business growth and strategic decision-making for 200+ stakeholders.",
        ],
    },
    {
        role: "Software Engineer (Java Backend Developer)",
        company: "AIS Info",
        location: "Gurugram, India",
        date: "Nov 2021 – Nov 2022",
        description: [
            "Built and deployed Capital One’s bankruptcy data platform, reducing legal notification time by 50% and strengthening risk visibility through automated data validation, AI-driven analysis, and robust compliance support.",
            "Aggregated and validated large datasets from 3,000+ web sources, improving record accuracy and compliance reporting, and collaborated with analysts and product teams to evaluate trends, structure problem statements, and present actionable insights into senior leadership for strategic planning.",
        ],
    },
    {
        role: "Software Application Developer",
        company: "MS Star Computers Pvt Ltd",
        location: "New Delhi, India",
        date: "July 2018 – Nov 2021",
        description: [
            "Analyzed performance metrics to identify inefficiencies, streamlining approval workflows and reducing processing time by 40%, while designing structured data collection and documentation processes to improve consistency, accuracy, and reporting reliability.",
            "Created client-ready materials summarizing actionable insights, user behavior trends, and system performance, supporting insight-driven product strategy decisions and effective communication with diverse stakeholders.",
        ],
    },
];

export const Experience = () => {
    return (
        <section className="w-full max-w-5xl mx-auto py-20 px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12 flex items-center gap-4"
            >
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    <Briefcase className="w-6 h-6 text-blue-400" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                    Professional Experience
                </h2>
            </motion.div>

            <div className="relative border-l border-white/10 ml-3 md:ml-6 space-y-12">
                {experiences.map((exp, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="relative pl-8 md:pl-12"
                    >
                        {/* Timeline Dot */}
                        <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-black" />

                        {/* Card */}
                        <div className="glass-card hover:bg-white/5 p-6 md:p-8 rounded-2xl transition-all duration-300 group">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                                <div>
                                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-blue-200 transition-colors">
                                        {exp.role}
                                    </h3>
                                    <div className="text-lg text-blue-400 font-medium mt-1">
                                        {exp.company}
                                    </div>
                                </div>
                                <div className="flex flex-col items-start md:items-end gap-1 text-sm text-neutral-400 font-mono">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        {exp.date}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4" />
                                        {exp.location}
                                    </div>
                                </div>
                            </div>

                            <ul className="space-y-4">
                                {exp.description.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-neutral-300 leading-relaxed">
                                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-500/50 shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

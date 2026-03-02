"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowRight } from "lucide-react";

interface ProjectCardProps {
    title: string;
    description: string;
    techStack: string[];
    liveLink?: string | null;
    githubLink?: string | null;
    customAction?: {
        label: string;
        href?: string;
        onClick?: () => void;
    };
    delay?: number;
}

export const ProjectCard = ({
    title,
    description,
    techStack,
    liveLink,
    githubLink,
    customAction,
    delay = 0,
}: ProjectCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm p-6 md:p-8 hover:bg-neutral-900/50 transition-colors"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Content Header */}
            <div className="flex flex-col gap-4 relative z-10">
                <h3 className="text-2xl font-bold text-white tracking-tight">
                    {title}
                </h3>
                <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
                    {description}
                </p>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-2 mt-2">
                    {techStack.map((tech) => (
                        <span
                            key={tech}
                            className="px-2.5 py-1 text-xs font-mono font-medium rounded-md bg-neutral-800/50 text-neutral-300 border border-white/5"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 mt-8 relative z-10">
                {liveLink && (
                    <a
                        href={liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors"
                    >
                        Live Demo
                        <ExternalLink className="w-4 h-4" />
                    </a>
                )}

                {githubLink && (
                    <a
                        href={githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors border border-white/5"
                    >
                        View Code
                        <Github className="w-4 h-4" />
                    </a>
                )}

                {!liveLink && customAction && (
                    <button
                        onClick={customAction.onClick ? customAction.onClick : () => customAction.href ? window.open(customAction.href, '_blank') : null}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white text-sm font-medium transition-colors border border-white/5"
                    >
                        {customAction.label}
                        <ArrowRight className="w-4 h-4" />
                    </button>
                )}
            </div>
        </motion.div>
    );
};

"use client";

import { ProjectCard } from "./ProjectCard";

const projectsData = [
    {
        title: "Crisis to Care",
        description: "A comprehensive web platform connecting users in crisis with immediate care resources and routing.",
        techStack: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
        liveLink: "https://akbknight.github.io/crisis-to-care/",
        githubLink: "https://github.com/akbknight/crisis-to-care",
    },
    {
        title: "Global Grants Analytics Dashboard",
        description: "A decoupled, enterprise-grade data portal processing 217K+ rows of geospatial and financial grant data. Features AI-powered data cleaning and interactive mapping.",
        techStack: ["React", "Tailwind CSS", "FastAPI", "Python", "Pandas"],
        githubLink: "https://github.com/akbknight/global-grants-dashboard",
    },
    {
        title: "Capital One Bankruptcy Data Platform",
        description: "Centralized enterprise backend system aggregating data from 3,000+ sources. Reduced legal notification times by 50% through automated data validation.",
        techStack: ["Java", "Spring Boot", "SQL", "REST APIs"],
        customAction: {
            label: "Architecture Details",
            onClick: () => {
                alert("Enterprise Architecture: Aggregating 3,000+ data sources using Spring Boot microservices and SQL databases optimized for high-throughput validations.");
            }
        }
    },
    {
        title: "U.S. State Dept. Shuttle & Inventory System",
        description: "Mission-critical scheduling and inventory architecture supporting 1,200+ users. Scaled operations and boosted departmental efficiency by 75%.",
        techStack: ["Azure", "Python", "Cloud Architecture", "Power Apps"],
        customAction: {
            label: "Architecture Details",
            onClick: () => {
                alert("Classified/Internal Implementation: Azure-backed cloud architecture scaling across 1,200+ diplomats and personnel worldwide.");
            }
        }
    }
];

export const ProjectsGrid = () => {
    return (
        <section id="projects" className="w-full py-16 scroll-mt-24">
            <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Featured Projects</h2>
                <div className="h-1 w-20 bg-blue-500 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                {projectsData.map((project, index) => (
                    <ProjectCard
                        key={project.title}
                        title={project.title}
                        description={project.description}
                        techStack={project.techStack}
                        liveLink={project.liveLink}
                        githubLink={project.githubLink}
                        customAction={project.customAction}
                        delay={index * 0.1}
                    />
                ))}
            </div>
        </section>
    );
};

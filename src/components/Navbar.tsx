"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Briefcase, Camera, Linkedin } from "lucide-react";

export const Navbar = () => {
    const pathname = usePathname();

    const navItems = [
        {
            name: "The Work",
            path: "/",
            icon: <Briefcase className="w-4 h-4" />,
        },
        {
            name: "The Life",
            path: "/life",
            icon: <Camera className="w-4 h-4" />,
        },
        {
            name: "LinkedIn",
            path: "https://www.linkedin.com/in/akshaykumardl/",
            icon: <Linkedin className="w-4 h-4" />,
        },
    ];

    return (
        <div className="fixed top-6 inset-x-0 max-w-fit mx-auto z-[100]">
            <div className="flex items-center gap-2 p-1.5 rounded-full border border-white/10 bg-black/50 backdrop-blur-md shadow-2xl">
                {navItems.map((item) => {
                    const isActive = pathname === item.path;
                    const isExternal = item.path.startsWith("http");

                    return (
                        <Link
                            key={item.path}
                            href={item.path}
                            target={isExternal ? "_blank" : undefined}
                            rel={isExternal ? "noopener noreferrer" : undefined}
                            className={cn(
                                "relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 flex items-center gap-2",
                                isActive
                                    ? "text-white"
                                    : "text-neutral-400 hover:text-neutral-200"
                            )}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="navbar-active"
                                    className="absolute inset-0 bg-white/10 rounded-full border border-white/5"
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 30,
                                    }}
                                />
                            )}
                            <span className="relative z-10 flex items-center gap-2">
                                {item.icon}
                                <span className="hidden sm:inline">{item.name}</span>
                            </span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

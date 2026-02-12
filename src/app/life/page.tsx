"use client";

import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import Image from "next/image";

export default function LifePage() {
    // ----------------------------------------------------------------------
    const photos = [
        "https://images.pexels.com/photos/1449241/pexels-photo-1449241.jpeg",
        "https://images.pexels.com/photos/4086702/pexels-photo-4086702.jpeg",
        "https://images.pexels.com/photos/4086698/pexels-photo-4086698.jpeg",
        "https://images.pexels.com/photos/4086686/pexels-photo-4086686.jpeg",
        "https://images.pexels.com/photos/5156155/pexels-photo-5156155.jpeg",
        "https://images.pexels.com/photos/5156154/pexels-photo-5156154.jpeg",
        "https://images.pexels.com/photos/9257002/pexels-photo-9257002.jpeg",
        "https://images.pexels.com/photos/1176757/pexels-photo-1176757.jpeg",
        "https://images.pexels.com/photos/1176707/pexels-photo-1176707.jpeg",
        "https://images.pexels.com/photos/1449239/pexels-photo-1449239.jpeg"
    ];

    return (
        <main className="min-h-screen bg-[#050505] text-neutral-200 selection:bg-purple-500/30">
            <Navbar />

            <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-24"
                >
                    <h1 className="text-4xl md:text-6xl font-serif text-neutral-100 mb-4 tracking-tight">
                        Beyond the Terminal
                    </h1>
                    <p className="text-neutral-500 max-w-lg mx-auto font-light">
                        Exploration through lens and narrative. A glimpse into the creative process.
                    </p>
                </motion.div>

                {/* Section 1: The Book */}
                <section className="mb-32 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative group perspective-1000"
                    >
                        {/* 3D Book Mockup */}
                        <a
                            href="https://www.amazon.com/dp/B0FCMZW2N1/ref=cm_sw_r_ffobk_cso_cp_mwn_dp_EGJP4Z4FBH3KV4R2E02F_7?previewDoh=1"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block relative w-64 h-96 mx-auto bg-red-900 rounded-lg shadow-2xl transform transition-transform duration-500 group-hover:rotate-y-12 group-hover:rotate-x-6 border-l-4 border-l-red-950 cursor-pointer"
                        >
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 border border-white/10 rounded-lg bg-gradient-to-br from-red-900 to-black">
                                <span className="text-3xl font-serif text-red-100 text-center uppercase tracking-widest border-b border-red-500/30 pb-4 mb-4">Dawn's<br />Hunger</span>
                                <span className="text-xs text-red-300 font-sans tracking-widest uppercase">Akshay Kumar</span>
                            </div>
                            {/* Book Spine Effect */}
                            <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-white/10 to-transparent pointer-events-none"></div>
                        </a>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center gap-2 mb-4 text-red-400 text-xs font-mono uppercase tracking-widest">
                            <span className="w-8 h-[1px] bg-red-500"></span>
                            Recent Release
                        </div>
                        <h2 className="text-3xl font-serif mb-6">Dawn's Hunger</h2>
                        <p className="text-neutral-400 leading-relaxed mb-6 font-light text-lg italic">
                            "When desire crosses oceans, even touchless love burns."
                        </p>
                        <p className="text-neutral-500 text-sm italic border-l-2 border-red-500/20 pl-4">
                            A narrative exploration of urban isolation and the unseen forces that drive us.
                        </p>

                        <div className="flex flex-wrap gap-4 mt-8">
                            <a
                                href="https://books.apple.com/us/book/dawns-hunger/id6746973914"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white hover:bg-neutral-800 transition-colors flex items-center gap-2 text-sm font-medium"
                            >
                                Apple Books
                            </a>
                            <a
                                href="https://www.amazon.com/dp/B0FCMZW2N1/ref=cm_sw_r_ffobk_cso_cp_mwn_dp_EGJP4Z4FBH3KV4R2E02F_7?previewDoh=1"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3 bg-[#FF9900] text-black border border-[#FF9900] rounded-lg hover:bg-[#FF9900]/90 transition-colors flex items-center gap-2 text-sm font-bold"
                            >
                                Amazon Kindle
                            </a>
                        </div>
                    </motion.div>
                </section>

                {/* Section 2: Photography */}
                <section>
                    <div className="flex items-center gap-2 mb-12 justify-center">
                        <span className="w-12 h-[1px] bg-neutral-800"></span>
                        <span className="text-neutral-500 text-xs uppercase tracking-widest">Visual Log</span>
                        <span className="w-12 h-[1px] bg-neutral-800"></span>
                    </div>

                    <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                        {photos.map((src, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="break-inside-avoid"
                            >
                                <a
                                    href="https://www.pexels.com/@akbknight/highlights/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block relative group overflow-hidden rounded-sm hover:shadow-2xl transition-all duration-500"
                                >
                                    <Image
                                        src={src}
                                        alt={`Gallery image ${i + 1}`}
                                        width={600}
                                        height={800}
                                        className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out transform group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-center justify-center">
                                        <span className="text-white text-sm font-light tracking-widest uppercase border border-white/30 px-4 py-2 bg-black/50 backdrop-blur-sm rounded">View on Pexels</span>
                                    </div>
                                </a>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>
        </main >
    );
}

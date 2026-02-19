"use client";

import { motion } from "framer-motion";
import { Send, Mail, User, MessageSquare, Linkedin } from "lucide-react";

export const Contact = () => {
    return (
        <section className="w-full max-w-4xl mx-auto py-20 px-6" id="contact">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
            >
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                    Let's Connect
                </h2>
                <p className="text-neutral-400 max-w-lg mx-auto">
                    Whether you have a question about my research, a potential project, or just want to say hi, I'll try my best to get back to you!
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="glass-card p-8 md:p-12 rounded-3xl relative overflow-hidden"
            >
                {/* Decorative background glow */}
                <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-blue-500/5 rotate-12 pointer-events-none" />

                <form
                    action="https://formspree.io/f/mqkenpzj" // Placeholder ID, user needs to replace
                    method="POST"
                    className="relative z-10 space-y-6"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name Input */}
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                                <User className="w-4 h-4 text-blue-400" />
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                required
                                placeholder="John Doe"
                                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                            />
                        </div>

                        {/* Email Input */}
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                                <Mail className="w-4 h-4 text-blue-400" />
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                required
                                placeholder="john@example.com"
                                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                            />
                        </div>
                    </div>

                    {/* Message Input */}
                    <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                            <MessageSquare className="w-4 h-4 text-blue-400" />
                            Message
                        </label>
                        <textarea
                            name="message"
                            id="message"
                            required
                            rows={4}
                            placeholder="Your message here..."
                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all resize-none"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-500/20"
                    >
                        <Send className="w-5 h-5" />
                        Send Message
                    </button>
                </form>

                <div className="mt-8 pt-8 border-t border-white/10 text-center">
                    <p className="text-neutral-400 mb-4 text-sm">Or connect with me professionally</p>
                    <a
                        href="https://www.linkedin.com/in/akshaykumardl/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-white bg-[#0077b5] hover:bg-[#0077b5]/90 px-6 py-3 rounded-xl font-medium transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                        <Linkedin className="w-5 h-5" />
                        Connect on LinkedIn
                    </a>
                </div>
            </motion.div>
        </section>
    );
};

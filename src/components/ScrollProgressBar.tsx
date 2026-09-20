"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[2px] z-[999999] origin-left pointer-events-none bg-gradient-to-r from-sky-500 via-amber-400 to-sky-400 opacity-90 shadow-[0_0_10px_rgba(56,189,248,0.4)]"
    />
  );
};

"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const DOT = 8;
const RING = 36;

export const CustomCursor = () => {
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);

  // Buttery spring physics
  const springCfg = { stiffness: 220, damping: 24, mass: 0.4 };
  const rx = useSpring(mx, springCfg);
  const ry = useSpring(my, springCfg);

  // Precise center alignments
  const dotX = useTransform(mx, (v) => v - DOT / 2);
  const dotY = useTransform(my, (v) => v - DOT / 2);
  const ringX = useTransform(rx, (v) => v - RING / 2);
  const ringY = useTransform(ry, (v) => v - RING / 2);

  const isTouch = useRef(false);

  useEffect(() => {
    setMounted(true);
    isTouch.current = window.matchMedia("(hover: none)").matches;
    if (isTouch.current) return;

    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    const attachHover = () => {
      document
        .querySelectorAll("a, button, [role='button'], input, textarea, select, label, .card-surface")
        .forEach((el) => {
          (el as HTMLElement).addEventListener("mouseenter", () => setActive(true));
          (el as HTMLElement).addEventListener("mouseleave", () => setActive(false));
        });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    document.documentElement.addEventListener("mouseenter", onMouseEnter);
    attachHover();
    const interval = setInterval(attachHover, 2000);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      document.documentElement.removeEventListener("mouseenter", onMouseEnter);
      clearInterval(interval);
    };
  }, [visible, mx, my]);

  // Avoid hydration mismatch and avoid rendering on touch devices
  if (!mounted || isTouch.current) {
    return null;
  }

  const baseStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    pointerEvents: "none",
    zIndex: 999999,
  };

  return (
    <>
      {/* Precision Core Dot */}
      <motion.div
        style={{ ...baseStyle, x: dotX, y: dotY, width: DOT, height: DOT }}
        animate={{
          borderRadius: "50%",
          backgroundColor: "var(--accent)",
          scale: active ? 1.6 : 1,
          opacity: visible ? 1 : 0,
        }}
        transition={{ scale: { duration: 0.12 }, opacity: { duration: 0.15 } }}
      />

      {/* Fluid Trailing Spring Ring */}
      <motion.div
        style={{ ...baseStyle, x: ringX, y: ringY, width: RING, height: RING }}
        animate={{
          borderRadius: "50%",
          border: "1.5px solid var(--accent)",
          backgroundColor: active ? "var(--accent-subtle)" : "transparent",
          scale: active ? 1.45 : 1,
          opacity: visible ? 0.75 : 0,
        }}
        transition={{ scale: { duration: 0.16 }, opacity: { duration: 0.15 } }}
      />
    </>
  );
};

"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const DOT = 8;
const RING = 32;

/**
 * Ambient Cursor Follower
 * Preserves the native OS cursor while providing a subtle, non-intrusive focus follower.
 * Uses event delegation on window to prevent memory leaks or listener accumulation.
 * Disabled completely on touch devices and for prefers-reduced-motion users.
 */
export const CustomCursor = () => {
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);

  // Smooth critically-damped spring follower
  const springCfg = { stiffness: 320, damping: 28, mass: 0.3 };
  const rx = useSpring(mx, springCfg);
  const ry = useSpring(my, springCfg);

  const ringX = useTransform(rx, (v) => v - RING / 2);
  const ringY = useTransform(ry, (v) => v - RING / 2);
  const dotX = useTransform(mx, (v) => v - DOT / 2);
  const dotY = useTransform(my, (v) => v - DOT / 2);

  useEffect(() => {
    // Check touch and reduced motion
    const isTouch = window.matchMedia("(hover: none)").matches || window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isTouch || prefersReducedMotion) {
      return;
    }

    setMounted(true);

    const onPointerMove = (e: PointerEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onPointerOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const isInteractive = Boolean(
        target?.closest?.("a, button, [role='button'], input, textarea, select, label, .interactive-card, .plate")
      );
      setActive(isInteractive);
    };

    const onWindowLeave = () => setVisible(false);
    const onWindowEnter = () => setVisible(true);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("mouseover", onPointerOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onWindowLeave);
    document.documentElement.addEventListener("mouseenter", onWindowEnter);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("mouseover", onPointerOver);
      document.documentElement.removeEventListener("mouseleave", onWindowLeave);
      document.documentElement.removeEventListener("mouseenter", onWindowEnter);
    };
  }, [visible, mx, my]);

  if (!mounted) {
    return null;
  }

  const baseStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    pointerEvents: "none",
    zIndex: 99999,
  };

  return (
    <>
      {/* Precision Core Dot */}
      <motion.div
        style={{ ...baseStyle, x: dotX, y: dotY, width: DOT, height: DOT }}
        animate={{
          borderRadius: "50%",
          backgroundColor: "var(--accent, #38bdf8)",
          scale: active ? 1.4 : 1,
          opacity: visible ? 0.75 : 0,
        }}
        transition={{ scale: { duration: 0.12 }, opacity: { duration: 0.15 } }}
      />

      {/* Ambient Spring Follower Ring */}
      <motion.div
        style={{ ...baseStyle, x: ringX, y: ringY, width: RING, height: RING }}
        animate={{
          borderRadius: "50%",
          border: "1px solid var(--accent, #38bdf8)",
          backgroundColor: active ? "rgba(56, 189, 248, 0.08)" : "transparent",
          scale: active ? 1.25 : 1,
          opacity: visible ? (active ? 0.9 : 0.45) : 0,
        }}
        transition={{ scale: { duration: 0.15 }, opacity: { duration: 0.15 } }}
      />
    </>
  );
};

export default CustomCursor;

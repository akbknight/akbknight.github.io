"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const DOT = 8;
const RING = 34;

export const CustomCursor = () => {
  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);

  const springCfg = { stiffness: 180, damping: 22, mass: 0.5 };
  const rx = useSpring(mx, springCfg);
  const ry = useSpring(my, springCfg);

  // Offset each element so the cursor point is at its center
  const dotX = useTransform(mx, (v) => v - DOT / 2);
  const dotY = useTransform(my, (v) => v - DOT / 2);
  const ringX = useTransform(rx, (v) => v - RING / 2);
  const ringY = useTransform(ry, (v) => v - RING / 2);

  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);
  const isTouch = useRef(false);

  useEffect(() => {
    isTouch.current = window.matchMedia("(hover: none)").matches;
    if (isTouch.current) return;

    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const attachHover = () => {
      document
        .querySelectorAll("a, button, [role='button'], input, textarea, select, label")
        .forEach((el) => {
          (el as HTMLElement).addEventListener("mouseenter", () => setActive(true));
          (el as HTMLElement).addEventListener("mouseleave", () => setActive(false));
        });
    };

    window.addEventListener("mousemove", onMove);
    attachHover();
    const t = setInterval(attachHover, 2000);

    return () => {
      window.removeEventListener("mousemove", onMove);
      clearInterval(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) {
    return null;
  }

  const base: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    pointerEvents: "none",
    zIndex: 9999,
  };

  return (
    <>
      {/* Dot — no lag, tracks precisely */}
      <motion.span
        style={{ ...base, x: dotX, y: dotY, width: DOT, height: DOT }}
        animate={{
          borderRadius: "50%",
          backgroundColor: "var(--accent)",
          scale: active ? 1.6 : 1,
          opacity: visible ? 1 : 0,
        }}
        transition={{ scale: { duration: 0.12 }, opacity: { duration: 0.2 } }}
      />

      {/* Ring — trails with spring physics */}
      <motion.span
        style={{ ...base, x: ringX, y: ringY, width: RING, height: RING }}
        animate={{
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.18)",
          scale: active ? 1.5 : 1,
          opacity: visible ? 0.7 : 0,
        }}
        transition={{ scale: { duration: 0.18 }, opacity: { duration: 0.2 } }}
      />
    </>
  );
};

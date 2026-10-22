"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Precision Hairline Viewfinder Reticle Cursor.
 * Features:
 * - 0.5px / 1px precision hairline ring with 4 orthogonal optical reticle ticks.
 * - Velocity-based fluid spring deformation.
 * - Respects prefers-reduced-motion and touch device standards.
 * - All animation executes in rAF with zero React re-renders.
 */
export const ViewfinderCursor = () => {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef  = useRef<HTMLDivElement>(null);

  // Raw mouse target
  const pos  = useRef({ x: -300, y: -300 });
  // Lerped ring position
  const curr = useRef({ x: -300, y: -300 });
  // Previous lerped position (for velocity)
  const prev = useRef({ x: -300, y: -300 });
  // Smoothed velocity
  const vel  = useRef({ x: 0, y: 0 });

  // Lerped visual values managed entirely in rAF
  const lRingSize    = useRef(26);
  const lRingOpacity = useRef(0);
  const lDotSize     = useRef(3);
  const lDotOpacity  = useRef(0);

  // State flags (written by event listeners, read by rAF)
  const hoverRef   = useRef(false);
  const clickRef   = useRef(false);
  const seenRef    = useRef(false);

  const rafRef = useRef<number>(0);
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    // Disable on touch devices or if reduced motion is requested
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setIsTouch(false);

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      seenRef.current = true;
    };
    const onDown = () => { clickRef.current = true; };
    const onUp   = () => { clickRef.current = false; };

    const attachHover = () => {
      document.querySelectorAll("a, button, [role='button'], input, .spotlight-card").forEach((raw) => {
        const el = raw as HTMLElement;
        el.addEventListener("mouseenter", () => { hoverRef.current = true; });
        el.addEventListener("mouseleave", () => { hoverRef.current = false; });
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown",  onDown);
    window.addEventListener("mouseup",    onUp);
    attachHover();
    const pollId = setInterval(attachHover, 2500);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      const seen    = seenRef.current;
      const isHover = hoverRef.current;
      const isClick = clickRef.current;

      // Lerp ring position toward mouse
      curr.current.x = lerp(curr.current.x, pos.current.x, 0.14);
      curr.current.y = lerp(curr.current.y, pos.current.y, 0.14);

      // Smooth velocity
      const rawVX = curr.current.x - prev.current.x;
      const rawVY = curr.current.y - prev.current.y;
      vel.current.x = lerp(vel.current.x, rawVX, 0.3);
      vel.current.y = lerp(vel.current.y, rawVY, 0.3);
      prev.current  = { x: curr.current.x, y: curr.current.y };

      // Velocity → subtle stretch
      const speed   = Math.sqrt(vel.current.x ** 2 + vel.current.y ** 2);
      const angle   = Math.atan2(vel.current.y, vel.current.x) * (180 / Math.PI);
      const stretch = Math.min(speed * 0.07, 0.45);
      const sx      = 1 + stretch;
      const sy      = Math.max(1 - stretch * 0.5, 0.65);

      // Lerp ring visual properties
      const targetSize    = isClick ? 18  : isHover ? 44  : 26;
      const targetOpacity = !seen   ? 0   : isClick ? 0.35 : isHover ? 0.85 : 0.45;
      lRingSize.current    = lerp(lRingSize.current,    targetSize,    0.22);
      lRingOpacity.current = lerp(lRingOpacity.current, targetOpacity, 0.18);

      // Lerp dot visual properties
      const targetDotSize    = isHover ? 4 : 2.5;
      const targetDotOpacity = !seen   ? 0 : 0.95;
      lDotSize.current    = lerp(lDotSize.current,    targetDotSize,    0.22);
      lDotOpacity.current = lerp(lDotOpacity.current, targetDotOpacity, 0.2);

      // Apply ring transform
      if (ringRef.current) {
        const r    = lRingSize.current;
        const half = r / 2;
        const cx   = curr.current.x;
        const cy   = curr.current.y;
        const el   = ringRef.current;
        el.style.width   = `${r}px`;
        el.style.height  = `${r}px`;
        el.style.opacity = `${lRingOpacity.current}`;
        el.style.transform =
          `translate(${cx - half}px, ${cy - half}px) rotate(${angle}deg) scaleX(${sx}) scaleY(${sy})`;
      }

      // Apply dot transform (precise, immediate tracking)
      if (dotRef.current) {
        const d    = lDotSize.current;
        const half = d / 2;
        const el   = dotRef.current;
        el.style.width   = `${d}px`;
        el.style.height  = `${d}px`;
        el.style.opacity = `${lDotOpacity.current}`;
        el.style.transform =
          `translate(${pos.current.x - half}px, ${pos.current.y - half}px)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup",   onUp);
      clearInterval(pollId);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (isTouch) return null;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          borderRadius: "50%",
          border: "1px solid var(--accent)",
          boxShadow: "0 0 6px var(--accent-subtle)",
          pointerEvents: "none",
          zIndex: 9998,
          willChange: "transform, width, height, opacity",
        }}
      >
        {/* Orthogonal Precision Optical Hairline Reticle Ticks */}
        <span style={{ position: "absolute", top: "-5px", left: "50%", width: "1px", height: "4px", background: "var(--accent)", transform: "translateX(-50%)" }} />
        <span style={{ position: "absolute", bottom: "-5px", left: "50%", width: "1px", height: "4px", background: "var(--accent)", transform: "translateX(-50%)" }} />
        <span style={{ position: "absolute", left: "-5px", top: "50%", height: "1px", width: "4px", background: "var(--accent)", transform: "translateY(-50%)" }} />
        <span style={{ position: "absolute", right: "-5px", top: "50%", height: "1px", width: "4px", background: "var(--accent)", transform: "translateY(-50%)" }} />
      </div>

      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          borderRadius: "50%",
          background: "var(--accent)",
          boxShadow: "0 0 4px var(--accent)",
          pointerEvents: "none",
          zIndex: 9999,
          willChange: "transform, width, height, opacity",
        }}
      />
    </>
  );
};

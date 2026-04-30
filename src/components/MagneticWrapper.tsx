"use client";

import { useRef } from "react";

interface Props {
  children: React.ReactNode;
  strength?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Wraps any element with a magnetic hover effect.
 * Element drifts toward the cursor within its bounds — no cursor ball.
 */
export const MagneticWrapper = ({
  children,
  strength = 0.28,
  className,
  style,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    el.style.transform = `translate(${x}px, ${y}px)`;
    el.style.transition = "transform 0.1s ease";
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0px, 0px)";
    el.style.transition = "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)";
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{ display: "inline-block", ...style }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

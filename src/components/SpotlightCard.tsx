"use client";

import React, { useRef } from "react";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}

export const SpotlightCard = ({
  children,
  className = "",
  spotlightColor,
  ...props
}: SpotlightCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`spotlight-card card-surface rounded-2xl relative overflow-hidden transition-all duration-300 ${className}`}
      style={
        spotlightColor
          ? ({ "--spotlight-color": spotlightColor, ...props.style } as React.CSSProperties)
          : props.style
      }
      {...props}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
};

"use client";

import React, { useRef } from "react";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  showCaliper?: boolean;
  caliperLabel?: string;
}

export const SpotlightCard = ({
  children,
  className = "",
  spotlightColor,
  showCaliper = true,
  caliperLabel,
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
      className={`spotlight-card hairline-frame card-surface group relative overflow-hidden transition-all duration-200 ${className}`}
      style={
        spotlightColor
          ? ({ "--spotlight-color": spotlightColor, ...props.style } as React.CSSProperties)
          : props.style
      }
      {...props}
    >
      {/* Precision 4-Corner Viewfinder Calipers (Hairline Interaction) */}
      {showCaliper && (
        <>
          <span
            className="hairline-caliper caliper-tl"
            aria-hidden="true"
          />
          <span
            className="hairline-caliper caliper-tr"
            aria-hidden="true"
          />
          <span
            className="hairline-caliper caliper-bl"
            aria-hidden="true"
          />
          <span
            className="hairline-caliper caliper-br"
            aria-hidden="true"
          />
          {caliperLabel && (
            <span
              className="hairline-caliper-tag"
              aria-hidden="true"
            >
              {caliperLabel}
            </span>
          )}
        </>
      )}

      <div className="relative z-10">{children}</div>
    </div>
  );
};

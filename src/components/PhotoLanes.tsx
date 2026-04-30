"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { usePexelsPhotos } from "@/hooks/usePexelsPhotos";
import { PexelsPhoto } from "@/lib/pexels";
import { MagneticWrapper } from "./MagneticWrapper";

// ─── @akbknight's own photos — used while the API fetch is in progress ─────────
// These are the actual photo IDs from pexels.com/@akbknight/gallery/
const placeholder = (id: number, color: string): Partial<PexelsPhoto> => ({
  id,
  src: {
    large: `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=800`,
  } as PexelsPhoto["src"],
  alt: "Photography by Akshay Kumar",
  url: `https://www.pexels.com/photo/${id}/`,
  avg_color: color,
});

const PLACEHOLDER_PHOTOS: Partial<PexelsPhoto>[] = [
  placeholder(5531421,  "#5a4a3a"),
  placeholder(5156157,  "#4a5a4a"),
  placeholder(5156156,  "#6b7a5a"),
  placeholder(5156155,  "#4a5a6a"),
  placeholder(5156154,  "#7a6b55"),
  placeholder(5156153,  "#5a6a5a"),
  placeholder(9257002,  "#3a3a4a"),
  placeholder(4086702,  "#4a3a2a"),
  placeholder(4086698,  "#2a2a3a"),
  placeholder(4086686,  "#3a4a5a"),
  placeholder(3709724,  "#5a4a6a"),
  placeholder(1449241,  "#6b6b7b"),
];

const PhotoCard = ({ photo }: { photo: Partial<PexelsPhoto> }) => {
  const imgSrc = photo.src?.large ?? photo.src?.medium ?? "";
  const pexelsUrl = photo.url ?? "https://www.pexels.com/@akbknight/gallery/";

  return (
    <a
      href={pexelsUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="View photo on Pexels"
      className="group relative block shrink-0 overflow-hidden rounded-sm"
      style={{
        width: "clamp(180px, 22vw, 320px)",
        aspectRatio: "3 / 4",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <Image
        src={imgSrc}
        alt={photo.alt ?? "Photography by Akshay Kumar"}
        fill
        className="object-cover grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100 transition-all duration-700 ease-out"
        sizes="(max-width: 768px) 180px, 320px"
        loading="lazy"
      />
      {/* Hover label */}
      <div className="absolute inset-0 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <span
          className="text-white text-[10px] font-mono uppercase tracking-widest px-3 py-1.5 rounded-sm"
          style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
        >
          📷 View on Pexels
        </span>
      </div>
      {/* avg_color bottom glow */}
      {photo.avg_color && (
        <div
          className="absolute bottom-0 left-0 right-0 h-16 opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"
          style={{ background: `linear-gradient(to top, ${photo.avg_color}, transparent)` }}
        />
      )}
    </a>
  );
};

export const PhotoLanes = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const lane1Ref = useRef<HTMLDivElement>(null);
  const lane2Ref = useRef<HTMLDivElement>(null);
  const lane3Ref = useRef<HTMLDivElement>(null);

  const { photos: apiPhotos, loading, views, totalPhotos } = usePexelsPhotos();

  const photos =
    apiPhotos.length >= 9
      ? apiPhotos
      : (PLACEHOLDER_PHOTOS as PexelsPhoto[]);

  // Split into 3 lanes
  const lane1 = photos.filter((_, i) => i % 3 === 0);
  const lane2 = photos.filter((_, i) => i % 3 === 1);
  const lane3 = photos.filter((_, i) => i % 3 === 2);

  // Duplicate for seamless overflow coverage
  const rep = (arr: PexelsPhoto[]) =>
    arr.length < 4 ? [...arr, ...arr, ...arr] : [...arr, ...arr];

  useEffect(() => {
    if (!photos.length) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const trigger = {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.8,
      };

      // Lane 1: moves left
      gsap.fromTo(lane1Ref.current, { xPercent: 0 }, { xPercent: -18, ease: "none", scrollTrigger: trigger });
      // Lane 2: moves right (opposite)
      gsap.fromTo(lane2Ref.current, { xPercent: -12 }, { xPercent: 8, ease: "none", scrollTrigger: trigger });
      // Lane 3: moves left (slower)
      gsap.fromTo(lane3Ref.current, { xPercent: -5 }, { xPercent: -22, ease: "none", scrollTrigger: trigger });
    }, sectionRef);

    return () => ctx.revert();
  }, [photos]);

  return (
    <section
      ref={sectionRef}
      id="photography"
      className="relative overflow-hidden"
      style={{ background: "var(--bg)", paddingBlock: "clamp(4rem, 8vw, 8rem)" }}
    >
      {/* Header */}
      <div
        className="relative z-10 px-6 md:px-12 lg:px-20 mb-12"
        style={{ maxWidth: "min(1280px, 100%)", marginInline: "auto" }}
      >
        <p className="section-label mb-4">04 · Photography</p>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <h2
            className="font-display font-bold"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              color: "var(--text)",
            }}
          >
            Moments I captured
          </h2>
          <div className="flex flex-col items-start sm:items-end gap-2">
            {/* Live stats from @akbknight's Pexels profile */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>
                {loading ? "Loading…" : (
                  <>
                    <span style={{ color: "var(--accent)", fontWeight: 600 }}>{views}</span>
                    {" views · "}
                    <span style={{ color: "var(--accent)", fontWeight: 600 }}>{totalPhotos}</span>
                    {" photos"}
                  </>
                )}
              </span>
            </div>
            <a
              href="https://www.pexels.com/@akbknight/gallery/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono"
              style={{ color: "var(--text-muted)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--accent)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}
            >
              View full gallery →
            </a>
          </div>
        </div>
      </div>

      {/* Photo lanes — 3 horizontal strips scrolling in opposite directions */}
      <div className="relative z-10 flex flex-col gap-4" style={{ overflow: "hidden" }}>
        {/* Lane 1 */}
        <div
          ref={lane1Ref}
          className="flex gap-3"
          style={{ width: "150%" }}
          aria-hidden="true"
        >
          {rep(lane1).map((photo, i) => (
            <PhotoCard key={`l1-${photo.id}-${i}`} photo={photo} />
          ))}
        </div>

        {/* Lane 2 — offset start for visual rhythm */}
        <div
          ref={lane2Ref}
          className="flex gap-3"
          style={{ width: "150%", marginLeft: "-8%" }}
          aria-hidden="true"
        >
          {rep(lane2).map((photo, i) => (
            <PhotoCard key={`l2-${photo.id}-${i}`} photo={photo} />
          ))}
        </div>

        {/* Lane 3 */}
        <div
          ref={lane3Ref}
          className="flex gap-3"
          style={{ width: "150%", marginLeft: "-4%" }}
          aria-hidden="true"
        >
          {rep(lane3).map((photo, i) => (
            <PhotoCard key={`l3-${photo.id}-${i}`} photo={photo} />
          ))}
        </div>
      </div>

      {/* CTA overlay at bottom */}
      <div className="relative z-10 mt-10 px-6 md:px-12 lg:px-20 flex justify-center">
        <MagneticWrapper>
          <a
            href="https://www.pexels.com/@akbknight/gallery/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium px-6 py-3 rounded-lg"
            style={{
              background: "var(--accent)",
              color: "var(--bg)",
              fontWeight: 600,
            }}
          >
            <span>View on Pexels</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
        </MagneticWrapper>
      </div>
    </section>
  );
};

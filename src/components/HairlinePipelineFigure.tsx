"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { ExternalLink } from "lucide-react";

interface HairlinePipelineFigureProps {
  activeStageIndex: number;
  hoveredStageIndex: number | null;
  onSelectStage: (index: number) => void;
  onHoverStage: (index: number | null) => void;
  className?: string;
}

// ──────────────────────────────────────────────────────────
// HAIRLINE ISOMETRIC LINE FIGURE MATHEMATICS
// Strictly obeys all 10 Hairline architectural rules
// ──────────────────────────────────────────────────────────

const W = 48, D = 34, TK = 5.2, R = 7, B = 1.3;
const Z_REST = [3, 12, 21, 30];
const STAGE_NAMES = ["01 · INGEST", "02 · SANITIZE", "03 · MODEL", "04 · DELIVER"];

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const rad = (d: number) => (d * Math.PI) / 180;
const r2 = (n: number) => Math.round(n * 100) / 100;
const poly = (pts: number[][]) => "M" + pts.map((p) => r2(p[0]) + " " + r2(p[1])).join("L") + "Z";
const openPath = (pts: number[][]) => (pts.length < 2 ? "" : "M" + pts.map((p) => r2(p[0]) + " " + r2(p[1])).join("L"));

interface Camera {
  az: number;
  k: number;
  S: number;
  ox: number;
  oy: number;
}

function createCam(azDeg: number, k: number, S: number): Camera {
  return { az: rad(azDeg), k, S, ox: 0, oy: 0 };
}

function proj(C: Camera) {
  const c = Math.cos(C.az), s = Math.sin(C.az), zf = Math.sqrt(1 - C.k * C.k);
  return (x: number, y: number, z: number): [number, number] => {
    const X = x * c - y * s, Y = x * s + y * c;
    return [C.ox + C.S * X, C.oy + C.S * (Y * C.k - z * zf)];
  };
}

function unproj(C: Camera, sx: number, sy: number, z: number): [number, number] {
  const c = Math.cos(C.az), s = Math.sin(C.az), zf = Math.sqrt(1 - C.k * C.k);
  const X = (sx - C.ox) / C.S, Y = ((sy - C.oy) / C.S + z * zf) / C.k;
  return [X * c + Y * s, -X * s + Y * c];
}

function fitCamera(C: Camera, pts: number[][], cx: number, cy: number) {
  C.ox = 0; C.oy = 0;
  const P = proj(C);
  let a = 1e9, b = -1e9, c = 1e9, d = -1e9;
  for (const p of pts) {
    const q = P(p[0], p[1], p[2]);
    if (q[0] < a) a = q[0]; if (q[0] > b) b = q[0];
    if (q[1] < c) c = q[1]; if (q[1] > d) d = q[1];
  }
  C.ox = cx - (a + b) / 2;
  C.oy = cy - (c + d) / 2;
}

interface RingSample {
  u: number;
  v: number;
  nu: number;
  nv: number;
}

function rrect(u0: number, v0: number, u1: number, v1: number, r: number, n = 4): RingSample[] {
  r = Math.max(0, Math.min(r, (u1 - u0) / 2, (v1 - v0) / 2));
  const out: RingSample[] = [];
  const corners = [
    [u1 - r, v1 - r, 0],
    [u0 + r, v1 - r, 90],
    [u0 + r, v0 + r, 180],
    [u1 - r, v0 + r, 270],
  ];
  for (const [cu, cv, a0] of corners) {
    for (let k = 0; k <= n; k++) {
      const a = rad(a0 + (90 * k) / n);
      const ca = Math.cos(a), sa = Math.sin(a);
      out.push({ u: cu + r * ca, v: cv + r * sa, nu: ca, nv: sa });
    }
  }
  return out;
}

function rings(x0: number, y0: number, x1: number, y1: number, r: number, b: number): [RingSample[], RingSample[]] {
  return [
    rrect(x0, y0, x1, y1, r),
    rrect(x0 + b, y0 + b, x1 - b, y1 - b, Math.max(0.3, r - b)),
  ];
}

function ringAt(P: (x: number, y: number, z: number) => [number, number], ring: RingSample[], z: number): [number, number][] {
  return ring.map((q) => P(q.u, q.v, z));
}

function hull(input: [number, number][]): [number, number][] {
  const pts = input.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cross = (o: [number, number], a: [number, number], b: [number, number]) =>
    (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lo: [number, number][] = [], up: [number, number][] = [];
  for (const p of pts) {
    while (lo.length > 1 && cross(lo[lo.length - 2], lo[lo.length - 1], p) <= 0) lo.pop();
    lo.push(p);
  }
  for (let i = pts.length - 1; i >= 0; i--) {
    const p = pts[i];
    while (up.length > 1 && cross(up[up.length - 2], up[up.length - 1], p) <= 0) up.pop();
    up.push(p);
  }
  lo.pop();
  up.pop();
  return lo.concat(up);
}

function run(ring: RingSample[], keep: (sample: RingSample) => boolean): RingSample[] {
  const n = ring.length;
  let s = -1;
  for (let i = 0; i < n; i++) {
    if (keep(ring[i]) && !keep(ring[(i + n - 1) % n])) {
      s = i;
      break;
    }
  }
  if (s < 0) return keep(ring[0]) ? ring.slice() : [];
  const out: RingSample[] = [];
  for (let k = 0; k < n && keep(ring[(s + k) % n]); k++) {
    out.push(ring[(s + k) % n]);
  }
  return out;
}

function prism(
  P: (x: number, y: number, z: number) => [number, number],
  front: (sample: RingSample) => boolean,
  ring: RingSample[],
  inner: RingSample[] | null,
  z0: number,
  z1: number
) {
  const top = ringAt(P, ring, z1);
  const bot = ringAt(P, ring, z0);
  return {
    sil: poly(hull(top.concat(bot))),
    crease: inner ? openPath(ringAt(P, run(inner, front), z1)) : "",
  };
}

function extremes(P: (x: number, y: number, z: number) => [number, number], ring: RingSample[]): RingSample[] {
  const pr = ring.map((q) => P(q.u, q.v, 0));
  let a = 0, b = 0, c = 0;
  pr.forEach((p, k) => {
    if (p[0] < pr[a][0]) a = k;
    if (p[0] > pr[b][0]) b = k;
    if (p[1] > pr[c][1]) c = k;
  });
  return [ring[a], ring[b], ring[c]];
}

interface Spring {
  x: number;
  v: number;
  t: number;
  k: number;
  c: number;
  m: number;
  eps: number;
}

function createSpring(x: number, k = 90, c = 17, m = 1, eps = 0.04): Spring {
  return { x, v: 0, t: x, k, c, m, eps };
}

function stepSpring(sp: Spring, dt: number, isReducedMotion: boolean): boolean {
  if (isReducedMotion) {
    sp.x = sp.t;
    sp.v = 0;
    return false;
  }
  const n = Math.max(1, Math.ceil(dt * 240)), h = dt / n;
  for (let i = 0; i < n; i++) {
    const a = (-sp.k * (sp.x - sp.t) - sp.c * sp.v) / sp.m;
    sp.v += a * h;
    sp.x += sp.v * h;
  }
  if (Math.abs(sp.x - sp.t) < sp.eps && Math.abs(sp.v) < sp.eps * 10) {
    sp.x = sp.t;
    sp.v = 0;
    return false;
  }
  return true;
}

export const HairlinePipelineFigure: React.FC<HairlinePipelineFigureProps> = ({
  activeStageIndex,
  hoveredStageIndex,
  onSelectStage,
  onHoverStage,
  className = "",
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [internalHover, setInternalHover] = useState<number | null>(null);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);

  // Dynamic reduced-motion preference tracking
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Effective highlight: hoveredStage takes precedence, fallback to activeStage
  const highlightedIndex = hoveredStageIndex !== null ? hoveredStageIndex : (internalHover !== null ? internalHover : activeStageIndex);

  // Geometric setup
  const camRef = useRef<Camera>(createCam(45, 0.5, 2.05));
  const springRef = useRef<Spring>(createSpring(18)); // default slight open
  const platesGeomRef = useRef<Array<{ ring: RingSample[]; inner: RingSample[]; ox: number; oy: number }>>([]);
  const baseRingsRef = useRef<[RingSample[], RingSample[]] | null>(null);

  // Initialize geometry once
  useEffect(() => {
    const C = camRef.current;
    const maxZ = Z_REST[3] + 52;
    fitCamera(
      C,
      [
        [-W - 10, -D - 10, -6],
        [W + 10, D + 10, -6],
        [W + 10, -D - 10, -6],
        [-W - 10, D + 10, -6],
        [-W, -D, maxZ],
        [W, D, maxZ],
      ],
      200,
      166
    );

    baseRingsRef.current = rings(-W - 6, -D - 6, W + 6, D + 6, R + 3, B + 0.4);

    const plates = [];
    for (let i = 0; i < 4; i++) {
      const ox = (i - 1.5) * 2;
      const oy = (1.5 - i) * 1.5;
      const [ring, inner] = rings(-W + ox, -D + oy, W + ox, D + oy, R, B);
      plates.push({ ring, inner, ox, oy });
    }
    platesGeomRef.current = plates;
  }, []);

  // Update spring target when active/hovered stage changes
  useEffect(() => {
    const sp = springRef.current;
    // When a stage is actively focused or hovered, separate clearly to 32
    sp.t = 28;
  }, [activeStageIndex, hoveredStageIndex, internalHover]);

  // SVG Paths State
  const [basePath, setBasePath] = useState<{ sil: string; crease: string }>({ sil: "", crease: "" });
  const [platesState, setPlatesState] = useState<Array<{ sil: string; crease: string; guides: string }>>([
    { sil: "", crease: "", guides: "" },
    { sil: "", crease: "", guides: "" },
    { sil: "", crease: "", guides: "" },
    { sil: "", crease: "", guides: "" },
  ]);

  // Animation Loop
  useEffect(() => {
    let rafId: number;
    let lastTime = performance.now();
    const C = camRef.current;
    const P = proj(C);
    const front = (sample: RingSample) => {
      const s = Math.sin(C.az), c = Math.cos(C.az);
      return sample.nu * s + sample.nv * c >= -1e-6;
    };

    const isReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Draw base plinth once
    if (baseRingsRef.current) {
      const [bR, bI] = baseRingsRef.current;
      setBasePath(prism(P, front, bR, bI, -6, 0));
    }

    const animate = (now: number) => {
      const dt = Math.min(0.05, Math.max(0, (now - lastTime) / 1000));
      lastTime = now;

      const moving = stepSpring(springRef.current, dt, isReducedMotion);
      const s = springRef.current.x;

      const newPlates = [];
      for (let i = 0; i < 4; i++) {
        const p = platesGeomRef.current[i];
        if (!p) continue;
        const z0 = Z_REST[i] + s * (i * 0.42 + 0.12);
        const z1 = z0 + TK;
        const pr = prism(P, front, p.ring, p.inner, z0, z1);

        let guidesD = "";
        if (s > 2) {
          const ex = extremes(P, p.ring);
          guidesD = [ex[0], ex[1], ex[2]]
            .map((pt) => {
              const pTop = P(pt.u, pt.v, z0);
              const pBot = P(pt.u, pt.v, 0);
              return `M${r2(pTop[0])},${r2(pTop[1])}L${r2(pBot[0])},${r2(pBot[1])}`;
            })
            .join("");
        }

        newPlates.push({ sil: pr.sil, crease: pr.crease, guides: guidesD });
      }

      setPlatesState(newPlates);

      // Continue animating if spring is still settling
      if (moving || Math.abs(springRef.current.x - springRef.current.t) > 0.05) {
        rafId = requestAnimationFrame(animate);
      }
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [activeStageIndex, hoveredStageIndex, internalHover]);

  // Pointer move handler
  const handlePointerMove = useCallback((e: React.PointerEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const sx = ((e.clientX - rect.left) / rect.width) * 400;
    const sy = ((e.clientY - rect.top) / rect.height) * 320;

    const C = camRef.current;
    const world = unproj(C, sx, sy, 0);

    const dist = Math.hypot(world[0], world[1]);
    const reach = 28 * 3.4;
    const factor = clamp(1 - dist / reach, 0, 1);
    springRef.current.t = Math.max(16, factor * 38);

    // Pick layer based on normalized vertical coordinate in world space
    const normY = clamp((world[1] + D) / (2 * D), 0, 1);
    const chosen = clamp(Math.floor(normY * 4), 0, 3);
    setInternalHover(chosen);
    onHoverStage(chosen);
  }, [onHoverStage]);

  const handlePointerLeave = useCallback(() => {
    springRef.current.t = 16; // soft rest pose
    setInternalHover(null);
    onHoverStage(null);
  }, [onHoverStage]);

  const handlePointerDown = useCallback((e: React.PointerEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const sx = ((e.clientX - rect.left) / rect.width) * 400;
    const sy = ((e.clientY - rect.top) / rect.height) * 320;

    const C = camRef.current;
    const world = unproj(C, sx, sy, 0);
    const normY = clamp((world[1] + D) / (2 * D), 0, 1);
    const chosen = clamp(Math.floor(normY * 4), 0, 3);
    setInternalHover(chosen);
    onSelectStage(chosen);
    springRef.current.t = 28;
  }, [onSelectStage]);

  const handleClick = useCallback(() => {
    if (highlightedIndex !== null) {
      onSelectStage(highlightedIndex);
    }
  }, [highlightedIndex, onSelectStage]);

  // Keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      const next = (activeStageIndex + 1) % 4;
      onSelectStage(next);
      springRef.current.t = 32;
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      const prev = (activeStageIndex + 3) % 4;
      onSelectStage(prev);
      springRef.current.t = 32;
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelectStage(activeStageIndex);
    }
  }, [activeStageIndex, onSelectStage]);

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      role="region"
      aria-label="Interactive 4-Stage Systems Architecture Physical Strata. Use Arrow keys to navigate stages, Enter to select."
      onKeyDown={handleKeyDown}
      className={`group relative flex flex-col rounded-xl border border-zinc-200/90 dark:border-white/[0.08] bg-zinc-50/70 dark:bg-[#0A0A10] p-3.5 sm:p-4 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/50 ${className}`}
    >
      {/* Top Header Telemetry Pill */}
      <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-zinc-200/60 dark:border-white/[0.06]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-mono-code font-semibold tracking-wider uppercase text-zinc-600 dark:text-zinc-300">
            Physical Data Strata
          </span>
        </div>

        {/* Dynamic stratum tag */}
        <span className="text-[10px] font-mono-code font-semibold px-2 py-0.5 rounded bg-sky-500/10 text-sky-700 dark:text-sky-400 border border-sky-500/20">
          {STAGE_NAMES[highlightedIndex] || "04 · DELIVER"}
        </span>
      </div>

      {/* SVG Canvas Container */}
      <div className="relative w-full aspect-[4/3] max-h-[260px] sm:max-h-[290px] flex items-center justify-center overflow-hidden rounded-lg bg-white/80 dark:bg-[#07070B] border border-zinc-200/60 dark:border-zinc-800/80 cursor-pointer select-none">
        <svg
          ref={svgRef}
          viewBox="0 0 400 320"
          className="w-full h-full object-contain"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          onClick={handleClick}
          style={{ touchAction: "none" }}
          aria-hidden="true"
        >
          {/* Base Plinth */}
          {basePath.sil && (
            <g className="hairline-base">
              <path
                d={basePath.sil}
                className="fill-white dark:fill-[#07070B] stroke-zinc-400/50 dark:stroke-zinc-700/60"
                strokeWidth="1.2"
              />
              {basePath.crease && (
                <path
                  d={basePath.crease}
                  fill="none"
                  className="stroke-zinc-300 dark:stroke-zinc-800"
                  strokeWidth="1"
                />
              )}
            </g>
          )}

          {/* 4 Interactive Strata Plates (Painted Back to Front: 0 to 3) */}
          {platesState.map((plate, idx) => {
            const isHighlighted = highlightedIndex === idx;
            return (
              <g
                key={idx}
                className={`hairline-plate transition-opacity duration-150 ${
                  isHighlighted ? "opacity-100" : "opacity-85 hover:opacity-100"
                }`}
              >
                {/* Vertical Drop Guides */}
                {plate.guides && (
                  <path
                    d={plate.guides}
                    fill="none"
                    stroke={isHighlighted ? "var(--accent-glow, #38bdf8)" : "currentColor"}
                    strokeOpacity={isHighlighted ? 0.7 : 0.25}
                    strokeWidth="0.8"
                    strokeDasharray="2 3"
                    className="transition-colors duration-150"
                  />
                )}

                {/* Solid Prism */}
                {plate.sil && (
                  <path
                    d={plate.sil}
                    className={`transition-all duration-150 ${
                      isHighlighted
                        ? "fill-white dark:fill-[#0c0d14] stroke-sky-500 dark:stroke-sky-400 stroke-[1.8] drop-shadow-[0_2px_8px_rgba(56,189,248,0.25)]"
                        : "fill-white dark:fill-[#08080C] stroke-zinc-400 dark:stroke-zinc-600 stroke-[1.2]"
                    }`}
                  />
                )}

                {/* Inner Crease */}
                {plate.crease && (
                  <path
                    d={plate.crease}
                    fill="none"
                    className={`transition-colors duration-150 ${
                      isHighlighted
                        ? "stroke-sky-400/60 dark:stroke-sky-400/50 stroke-[1]"
                        : "stroke-zinc-300 dark:stroke-zinc-800 stroke-[0.8]"
                    }`}
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* Subtle click-to-inspect helper tooltip */}
        <div className="absolute bottom-2 left-2 text-[9px] font-mono-code text-zinc-600 dark:text-zinc-400 bg-white/90 dark:bg-zinc-900/90 px-1.5 py-0.5 rounded border border-zinc-200/60 dark:border-white/[0.08] pointer-events-none">
          Click or touch stratum to inspect stage
        </div>
      </div>

      {/* Discrete Standalone Studio Verification Link */}
      <div className="flex items-center justify-between flex-wrap gap-2 pt-2.5 mt-2 border-t border-zinc-200/60 dark:border-white/[0.06] text-[10px] font-mono-code text-zinc-600 dark:text-zinc-400">
        <span>Hairline Engine · Isometric Line Geometry</span>
        <a
          href="/hairline-strata.html"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 hover:underline transition-colors ml-auto sm:ml-0"
        >
          <span>Standalone Studio ↗</span>
          <ExternalLink className="w-2.5 h-2.5" />
        </a>
      </div>
    </div>
  );
};

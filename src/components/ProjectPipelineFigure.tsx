"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

interface ProjectPipelineFigureProps {
  className?: string;
  activeStage?: number;
  onSelectStage?: (index: number) => void;
}

// ──────────────────────────────────────────────────────────
// COMPACT ISOMETRIC ARCHITECTURE SCHEMATIC
// For IRS 990 Grant Miner data engineering lifecycle
// ──────────────────────────────────────────────────────────

const W = 46, D = 32, TK = 5.2, R = 6.5, B = 1.3;
const Z_REST = [3, 12, 21, 30];
const STAGE_LABELS = [
  "01 · AWS S3 XML Stream",
  "02 · Entity Audit & EIN Resolution",
  "03 · DuckDB Columnar Warehouse",
  "04 · Interactive Intelligence HUD",
];

const STAGE_DETAILS = [
  {
    name: "01 · Ingestion",
    short: "S3 XML",
    full: "AWS S3 Streaming XML",
    desc: "In-memory streaming SAX parser ingesting 9.7M+ IRS Form 990 XML tax filings without disk spill.",
  },
  {
    name: "02 · Audit",
    short: "Entity Audit",
    full: "Entity Resolution & Audit",
    desc: "EIN deduplication, donor-recipient relationship matching, and DAF pass-through validation.",
  },
  {
    name: "03 · Warehouse",
    short: "DuckDB",
    full: "DuckDB Columnar Store",
    desc: "Standardized relational schemas with sub-second OLAP aggregations across $550B+ charitable capital.",
  },
  {
    name: "04 · Interface",
    short: "Live HUD",
    full: "Live Intelligence HUD",
    desc: "3D WebGL global capital flow arcs, TopoJSON choropleths, and log-log outlier matrices.",
  },
];

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
    a = Math.min(a, q[0]); b = Math.max(b, q[0]);
    c = Math.min(c, q[1]); d = Math.max(d, q[1]);
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

function rrect(x0: number, y0: number, x1: number, y1: number, r: number, nPerCorner = 8): RingSample[] {
  r = Math.min(r, (x1 - x0) / 2, (y1 - y0) / 2);
  const out: RingSample[] = [];
  const corners = [
    { cx: x1 - r, cy: y1 - r, a0: 0 },
    { cx: x0 + r, cy: y1 - r, a0: 90 },
    { cx: x0 + r, cy: y0 + r, a0: 180 },
    { cx: x1 - r, cy: y0 + r, a0: 270 },
  ];
  for (const c of corners) {
    for (let i = 0; i < nPerCorner; i++) {
      const th = rad(c.a0 + (i * 90) / nPerCorner);
      const nu = Math.cos(th), nv = Math.sin(th);
      out.push({ u: c.cx + r * nu, v: c.cy + r * nv, nu, nv });
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

function createSpring(x: number, k = 85, c = 16, m = 1, eps = 0.04): Spring {
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

export const ProjectPipelineFigure: React.FC<ProjectPipelineFigureProps> = ({
  className = "",
  activeStage: propActiveStage,
  onSelectStage,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [internalHover, setInternalHover] = useState<number | null>(null);
  const [internalSelected, setInternalSelected] = useState<number>(2); // Default to stage 03 (Warehouse)
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);

  const selectedIndex = propActiveStage !== undefined ? propActiveStage : internalSelected;
  const highlightedIndex = internalHover !== null ? internalHover : selectedIndex;

  const camRef = useRef<Camera>(createCam(45, 0.5, 2.15));
  const springRef = useRef<Spring>(createSpring(22)); // Clean resting separation
  const platesGeomRef = useRef<Array<{ ring: RingSample[]; inner: RingSample[]; ox: number; oy: number }>>([]);
  const baseRingsRef = useRef<[RingSample[], RingSample[]] | null>(null);

  // Dynamic reduced-motion tracking
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Initialize geometry
  useEffect(() => {
    const C = camRef.current;
    const maxZ = Z_REST[3] + 48;
    fitCamera(
      C,
      [
        [-W - 8, -D - 8, -5],
        [W + 8, D + 8, -5],
        [W + 8, -D - 8, -5],
        [-W - 8, D + 8, -5],
        [-W, -D, maxZ],
        [W, D, maxZ],
      ],
      190,
      155
    );

    baseRingsRef.current = rings(-W - 5, -D - 5, W + 5, D + 5, R + 2.5, B + 0.3);

    const plates = [];
    for (let i = 0; i < 4; i++) {
      const ox = (i - 1.5) * 1.5;
      const oy = (1.5 - i) * 1.2;
      const [ring, inner] = rings(-W + ox, -D + oy, W + ox, D + oy, R, B);
      plates.push({ ring, inner, ox, oy });
    }
    platesGeomRef.current = plates;
  }, []);

  // Update spring target
  useEffect(() => {
    springRef.current.t = 24;
  }, [selectedIndex, internalHover]);

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

    if (baseRingsRef.current) {
      const [bR, bI] = baseRingsRef.current;
      setBasePath(prism(P, front, bR, bI, -5, 0));
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
        const z0 = Z_REST[i] + s * (i * 0.38 + 0.12);
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

      if (moving || Math.abs(springRef.current.x - springRef.current.t) > 0.05) {
        rafId = requestAnimationFrame(animate);
      }
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [selectedIndex, internalHover, isReducedMotion]);

  const handlePointerDown = useCallback((e: React.PointerEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const sx = ((e.clientX - rect.left) / rect.width) * 380;
    const sy = ((e.clientY - rect.top) / rect.height) * 280;

    const C = camRef.current;
    const world = unproj(C, sx, sy, 0);
    const normY = clamp((world[1] + D) / (2 * D), 0, 1);
    const chosen = clamp(Math.floor(normY * 4), 0, 3);
    setInternalSelected(chosen);
    if (onSelectStage) onSelectStage(chosen);
    springRef.current.t = 28;
  }, [onSelectStage]);

  const handlePointerMove = useCallback((e: React.PointerEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const sx = ((e.clientX - rect.left) / rect.width) * 380;
    const sy = ((e.clientY - rect.top) / rect.height) * 280;

    const C = camRef.current;
    const world = unproj(C, sx, sy, 0);
    const dist = Math.hypot(world[0], world[1]);
    const reach = 26 * 3.4;
    const factor = clamp(1 - dist / reach, 0, 1);
    springRef.current.t = Math.max(18, factor * 32);

    const normY = clamp((world[1] + D) / (2 * D), 0, 1);
    const chosen = clamp(Math.floor(normY * 4), 0, 3);
    setInternalHover(chosen);
  }, []);

  const handlePointerLeave = useCallback(() => {
    springRef.current.t = 20;
    setInternalHover(null);
  }, []);

  const handleSelectTab = useCallback(
    (index: number) => {
      setInternalSelected(index);
      if (onSelectStage) onSelectStage(index);
      springRef.current.t = 28;
    },
    [onSelectStage]
  );

  const handleTabKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
      let targetIndex: number | null = null;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        targetIndex = (currentIndex + 1) % 4;
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        targetIndex = (currentIndex - 1 + 4) % 4;
      } else if (e.key === "Home") {
        e.preventDefault();
        targetIndex = 0;
      } else if (e.key === "End") {
        e.preventDefault();
        targetIndex = 3;
      }

      if (targetIndex !== null) {
        handleSelectTab(targetIndex);
        tabRefs.current[targetIndex]?.focus();
      }
    },
    [handleSelectTab]
  );

  return (
    <figure
      role="region"
      aria-label="Schematic diagram: 4-stage pipeline for IRS Form 990 data engineering"
      className={`relative flex flex-col rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-[#0B0C10] p-3 text-left ${className}`}
    >
      {/* Active layer readout */}
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-200/70 dark:border-zinc-800 text-[11px] font-mono-code">
        <span className="text-zinc-500 dark:text-zinc-400 font-medium">Architecture Schematic</span>
        <span className="text-sky-700 dark:text-sky-300 font-semibold px-2 py-0.5 rounded bg-sky-500/10 dark:bg-sky-500/20 border border-sky-500/30">
          {STAGE_LABELS[highlightedIndex]}
        </span>
      </div>

      {/* SVG Canvas Container — touch-action: pan-y preserves natural vertical scrolling */}
      <div className="relative w-full aspect-[4/3] max-h-[200px] flex items-center justify-center overflow-hidden rounded-lg bg-white/70 dark:bg-[#07080B] border border-zinc-200/60 dark:border-zinc-800/80">
        <svg
          ref={svgRef}
          viewBox="0 0 380 280"
          className="w-full h-full object-contain cursor-pointer select-none"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          style={{ touchAction: "pan-y" }}
          aria-hidden="true"
        >
          {/* Base Plinth */}
          {basePath.sil && (
            <g className="pipeline-base">
              <path
                d={basePath.sil}
                className="fill-zinc-100 dark:fill-[#0d0e14] stroke-zinc-400 dark:stroke-zinc-600"
                strokeWidth="1.2"
              />
              {basePath.crease && (
                <path
                  d={basePath.crease}
                  fill="none"
                  className="stroke-zinc-300 dark:stroke-zinc-700"
                  strokeWidth="0.9"
                />
              )}
            </g>
          )}

          {/* 4 Architectural Strata Plates with High-Contrast Rest-Pose Strokes */}
          {platesState.map((plate, idx) => {
            const isHighlighted = highlightedIndex === idx;
            return (
              <g
                key={idx}
                className="pipeline-plate transition-opacity duration-150"
              >
                {/* Vertical Drop Guides */}
                {plate.guides && (
                  <path
                    d={plate.guides}
                    fill="none"
                    stroke={isHighlighted ? "#0284c7" : "currentColor"}
                    strokeOpacity={isHighlighted ? 0.8 : 0.35}
                    strokeWidth="0.8"
                    strokeDasharray="2 2"
                    className="text-zinc-400 dark:text-zinc-500"
                  />
                )}

                {/* Solid Prism with Strong Dark-Mode Contrast */}
                {plate.sil && (
                  <path
                    d={plate.sil}
                    className={`transition-colors duration-150 ${
                      isHighlighted
                        ? "fill-sky-50 dark:fill-[#0c1424] stroke-sky-600 dark:stroke-sky-400 stroke-[2]"
                        : "fill-white dark:fill-[#12131a] stroke-zinc-400 dark:stroke-zinc-400 stroke-[1.4]"
                    }`}
                  />
                )}

                {/* Inner Crease Line */}
                {plate.crease && (
                  <path
                    d={plate.crease}
                    fill="none"
                    className={
                      isHighlighted
                        ? "stroke-sky-500 dark:stroke-sky-400 stroke-[1]"
                        : "stroke-zinc-300 dark:stroke-zinc-500 stroke-[0.9]"
                    }
                  />
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Accessible Interactive Tablist with Arrow/Home/End keyboard navigation */}
      <div
        role="tablist"
        aria-label="IRS 990 Pipeline Stages"
        className="grid grid-cols-4 gap-1 mt-2.5"
      >
        {STAGE_DETAILS.map((st, idx) => {
          const isSelected = selectedIndex === idx;
          return (
            <button
              key={idx}
              ref={(el) => {
                tabRefs.current[idx] = el;
              }}
              role="tab"
              id={`stage-tab-${idx}`}
              aria-selected={isSelected}
              aria-controls={`stage-panel-${idx}`}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => handleSelectTab(idx)}
              onKeyDown={(e) => handleTabKeyDown(e, idx)}
              onMouseEnter={() => setInternalHover(idx)}
              onMouseLeave={() => setInternalHover(null)}
              className={`text-center py-1 px-1 rounded text-[10px] font-mono-code transition-all cursor-pointer ${
                isSelected
                  ? "bg-sky-500/15 text-sky-700 dark:text-sky-300 font-semibold border border-sky-500/40 shadow-xs"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 border border-transparent hover:bg-zinc-100 dark:hover:bg-white/[0.04]"
              }`}
            >
              <span className="block truncate">{st.short}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Stage Tabpanel Detail */}
      <div
        id={`stage-panel-${selectedIndex}`}
        role="tabpanel"
        aria-labelledby={`stage-tab-${selectedIndex}`}
        tabIndex={0}
        className="mt-2 p-2 rounded-lg bg-zinc-100/70 dark:bg-white/[0.03] border border-zinc-200/60 dark:border-white/[0.05] text-[11px] focus:outline-none focus:ring-1 focus:ring-sky-500"
      >
        <div className="flex items-center justify-between gap-2 mb-0.5">
          <span className="font-semibold text-zinc-900 dark:text-zinc-100 font-mono-code">
            {STAGE_DETAILS[selectedIndex].full}
          </span>
          <span className="text-[9px] uppercase tracking-wider text-sky-700 dark:text-sky-400 font-mono-code bg-sky-500/10 px-1.5 py-0.5 rounded">
            Stage 0{selectedIndex + 1}/04
          </span>
        </div>
        <p className="text-zinc-600 dark:text-zinc-400 text-[11px] leading-relaxed">
          {STAGE_DETAILS[selectedIndex].desc}
        </p>
      </div>

      {/* Accessible, descriptive caption */}
      <figcaption className="mt-2 text-[10px] font-mono-code text-zinc-500 dark:text-zinc-400 leading-normal">
        Figure: Interactive 4-stage data pipeline for IRS Form 990 data engineering. Use arrow keys or click tabs to inspect each stage.
      </figcaption>
    </figure>
  );
};

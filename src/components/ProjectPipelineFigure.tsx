"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { ArrowUpRight, Database, Layers, Cpu, ShieldCheck } from "lucide-react";
import { useReducedMotion } from "framer-motion";

interface ProjectPipelineFigureProps {
  className?: string;
  activeStage?: number;
  onSelectStage?: (index: number) => void;
}

// ──────────────────────────────────────────────────────────
// APPLE-INSPIRED INTERACTIVE PIPELINE ARCHITECTURE INSPECTOR
// Compact isometric strata illustrating IRS 990 data engineering
// ──────────────────────────────────────────────────────────

const W = 46, D = 32, TK = 5.2, R = 6.5, B = 1.3;
const Z_REST = [3, 12, 21, 30];

const STAGE_DETAILS = [
  {
    step: "01",
    tab: "01 · Ingest",
    full: "AWS S3 Streaming XML Ingestion",
    role: "Streaming Parser",
    desc: "In-memory streaming SAX parser designed to stream and unpack public IRS Form 990 XML records from AWS S3 without writing intermediate files to disk.",
    specs: ["Python SAX Parser", "Zero Disk Spill", "Streaming XML Ingest"],
    icon: <Database className="w-3.5 h-3.5 text-sky-500" />,
  },
  {
    step: "02",
    tab: "02 · Audit",
    full: "EIN Entity Resolution & Deduplication",
    role: "Audit & Validation",
    desc: "Automated EIN normalization, tax year deduplication, and cross-foundation recipient entity resolution across nonprofit filings.",
    specs: ["EIN Normalization", "Organization Mapping", "Record Deduplication"],
    icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />,
  },
  {
    step: "03",
    tab: "03 · Store",
    full: "DuckDB Embedded Columnar Warehouse",
    role: "Analytical Storage",
    desc: "Normalized star schema in DuckDB enabling sub-second analytical SQL queries across 500,000+ standardized grant records with zero server hosting costs.",
    specs: ["DuckDB Embedded", "Star Schema", "Sub-Second SQL Queries"],
    icon: <Layers className="w-3.5 h-3.5 text-sky-400" />,
  },
  {
    step: "04",
    tab: "04 · Deliver",
    full: "Interactive Capital Flow Map & Choropleth",
    role: "Browser Visualization",
    desc: "Client-side 3D flow arcs (Three.js / Globe.gl) and D3 state-level choropleths allowing researchers to filter and inspect philanthropic flows interactively.",
    specs: ["Three.js / Globe.gl", "D3 TopoJSON", "Interactive Filtering"],
    icon: <Cpu className="w-3.5 h-3.5 text-amber-500" />,
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

function buildRing(rSamples: RingSample[], bevelR: number, zBase: number, zTop: number, isBevelTop: boolean) {
  const top: number[][] = [];
  const mid: number[][] = [];
  const bot: number[][] = [];

  for (const s of rSamples) {
    bot.push([s.u, s.v, zBase]);
    if (isBevelTop) {
      mid.push([s.u, s.v, zTop - bevelR]);
      top.push([s.u - s.nu * bevelR, s.v - s.nv * bevelR, zTop]);
    } else {
      mid.push([s.u, s.v, zTop]);
      top.push([s.u, s.v, zTop]);
    }
  }
  return { bot, mid, top };
}

function prismPaths(ring: { bot: number[][]; mid: number[][]; top: number[][] }, C: Camera) {
  const P = proj(C);
  const c = Math.cos(C.az), s = Math.sin(C.az);
  const zf = Math.sqrt(1 - C.k * C.k);
  const N = ring.bot.length;

  const topPts = ring.top.map((p) => P(p[0], p[1], p[2]));
  const midPts = ring.mid.map((p) => P(p[0], p[1], p[2]));
  const botPts = ring.bot.map((p) => P(p[0], p[1], p[2]));

  const silPts: [number, number][] = [];
  const creasePts: [number, number][] = [];

  for (let i = 0; i < N; i++) {
    const p = ring.mid[i];
    const dx = p[0], dy = p[1];
    const dot = (dx * s + dy * c) * zf;
    if (dot <= 0) {
      silPts.push(botPts[i]);
      silPts.push(midPts[i]);
    } else {
      creasePts.push(midPts[i]);
    }
  }

  return {
    sil: poly(topPts),
    crease: openPath(creasePts),
  };
}

export const ProjectPipelineFigure: React.FC<ProjectPipelineFigureProps> = ({
  className = "",
  activeStage,
  onSelectStage,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [internalSelected, setInternalSelected] = useState<number>(activeStage ?? 2);
  const [internalHover, setInternalHover] = useState<number | null>(null);
  const selectedIndex = activeStage !== undefined ? activeStage : internalSelected;
  const highlightedIndex = internalHover !== null ? internalHover : selectedIndex;

  const svgRef = useRef<SVGSVGElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Camera definition
  const camRef = useRef<Camera>(createCam(35, 0.58, 2.8));
  const springRef = useRef<{ z: number[]; v: number[]; t: number }>({
    z: [...Z_REST],
    v: [0, 0, 0, 0],
    t: 20,
  });

  const [platesState, setPlatesState] = useState<
    { sil: string; crease: string; guides: string }[]
  >([]);
  const [basePath, setBasePath] = useState<{ sil: string; crease: string }>({
    sil: "",
    crease: "",
  });

  // Fit camera once
  useEffect(() => {
    const C = camRef.current;
    const allPts: number[][] = [];
    const ringSamples = rrect(-W / 2, -D / 2, W / 2, D / 2, R);
    for (const s of ringSamples) {
      allPts.push([s.u, s.v, 0]);
      allPts.push([s.u, s.v, 50]);
    }
    fitCamera(C, allPts, 190, 140);

    const bRing = rrect(-W / 2 - 4, -D / 2 - 4, W / 2 + 4, D / 2 + 4, R + 2);
    const bMesh = buildRing(bRing, B, -3, 0, true);
    setBasePath(prismPaths(bMesh, C));
  }, []);

  // Animation Loop (requestAnimationFrame springs with reduced-motion and settling guard)
  useEffect(() => {
    const C = camRef.current;
    const ringSamples = rrect(-W / 2, -D / 2, W / 2, D / 2, R);

    const computePlates = (zValues: number[]) => {
      const P = proj(C);
      const newPlates = [];
      for (let i = 0; i < 4; i++) {
        const zBase = zValues[i];
        const zTop = zBase + TK;
        const pMesh = buildRing(ringSamples, B, zBase, zTop, true);
        const paths = prismPaths(pMesh, C);

        let guideStr = "";
        if (i === highlightedIndex) {
          const pBot = P(0, 0, zBase);
          const pFloor = P(0, 0, 0);
          guideStr = `M${r2(pBot[0])} ${r2(pBot[1])} L${r2(pFloor[0])} ${r2(pFloor[1])}`;
        }

        newPlates.push({
          sil: paths.sil,
          crease: paths.crease,
          guides: guideStr,
        });
      }
      return newPlates;
    };

    const targetZ = [...Z_REST];
    targetZ[highlightedIndex] += 10; // Lift active plate

    // 1. Reduced Motion: Immediately snap to target positions without scheduling any animation frames
    if (shouldReduceMotion) {
      springRef.current.z = [...targetZ];
      springRef.current.v = [0, 0, 0, 0];
      setPlatesState(computePlates(targetZ));
      return;
    }

    // 2. Normal Motion: Spring physics with automatic termination when settled
    let isMounted = true;

    const tick = () => {
      if (!isMounted) return;
      if (document.hidden) {
        animFrameRef.current = requestAnimationFrame(tick);
        return;
      }

      const sp = springRef.current;
      const k = 0.16, d = 0.82;
      let changed = false;

      for (let i = 0; i < 4; i++) {
        const diff = targetZ[i] - sp.z[i];
        sp.v[i] = sp.v[i] * d + diff * k;
        sp.z[i] += sp.v[i];
        if (Math.abs(diff) > 0.04 || Math.abs(sp.v[i]) > 0.04) {
          changed = true;
        }
      }

      if (changed || platesState.length === 0) {
        setPlatesState(computePlates(sp.z));
        animFrameRef.current = requestAnimationFrame(tick);
      } else {
        // Springs have settled! Snap to exact target positions and STOP scheduling RAF
        sp.z = [...targetZ];
        sp.v = [0, 0, 0, 0];
        setPlatesState(computePlates(targetZ));
        animFrameRef.current = null;
      }
    };

    animFrameRef.current = requestAnimationFrame(tick);

    return () => {
      isMounted = false;
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
    };
  }, [highlightedIndex, shouldReduceMotion]);

  // Pointer Interaction
  const handlePointerMove = useCallback((e: React.PointerEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const sx = ((e.clientX - rect.left) / rect.width) * 380;
    const sy = ((e.clientY - rect.top) / rect.height) * 280;

    const C = camRef.current;
    const world = unproj(C, sx, sy, 0);
    const normY = clamp((world[1] + D) / (2 * D), 0, 1);
    const chosen = clamp(Math.floor(normY * 4), 0, 3);
    setInternalHover(chosen);
  }, []);

  const handlePointerLeave = useCallback(() => {
    setInternalHover(null);
  }, []);

  const handleSelectTab = useCallback(
    (index: number) => {
      setInternalSelected(index);
      if (onSelectStage) onSelectStage(index);
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

  const cur = STAGE_DETAILS[selectedIndex];

  return (
    <figure
      aria-label="Interactive 4-Stage Architecture Pipeline"
      className={`w-full rounded-2xl border border-zinc-200/90 dark:border-white/[0.08] bg-white/70 dark:bg-[#0B0C14]/85 backdrop-blur-md p-4 sm:p-6 shadow-sm ${className}`}
    >
      {/* 2-Column Responsive Layout: Left 3D Strata Figure / Right Stage Explorer */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        
        {/* ── Left Column (md:col-span-5): Compact 3D Isometric Strata ── */}
        <div className="md:col-span-5 flex flex-col items-center">
          <div className="relative w-full max-w-[280px] aspect-[4/3] flex items-center justify-center rounded-xl bg-zinc-100/70 dark:bg-black/50 border border-zinc-200/70 dark:border-white/[0.06] overflow-hidden group">
            {/* Ambient Lighting Glow behind 3D plates */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-300"
              style={{
                background: "radial-gradient(circle at 50% 50%, var(--accent-glow) 0%, transparent 70%)",
                opacity: highlightedIndex !== null ? 0.45 : 0.2,
              }}
              aria-hidden="true"
            />

            {/* Active Layer Architecture Annotation */}
            <div className="absolute top-2.5 left-3 z-10 pointer-events-none flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/90 dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-white/10 text-[10px] font-mono-code text-zinc-800 dark:text-zinc-200 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
              <span>Layer {STAGE_DETAILS[highlightedIndex].step}: {STAGE_DETAILS[highlightedIndex].role}</span>
            </div>

            <svg
              ref={svgRef}
              data-testid="hairline-pipeline-svg"
              viewBox="0 0 380 280"
              className="w-full h-full object-contain cursor-pointer select-none"
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
                    className="fill-zinc-200/60 dark:fill-[#0d0e14] stroke-zinc-400/80 dark:stroke-zinc-600"
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

              {/* 4 Architectural Strata Plates */}
              {platesState.map((plate, idx) => {
                const isHighlighted = highlightedIndex === idx;
                return (
                  <g key={idx} className="pipeline-plate">
                    {/* Vertical Drop Guides */}
                    {plate.guides && (
                      <path
                        d={plate.guides}
                        fill="none"
                        stroke={isHighlighted ? "#0284c7" : "currentColor"}
                        strokeOpacity={isHighlighted ? 0.9 : 0.3}
                        strokeWidth="1"
                        strokeDasharray="2 2"
                        className="text-zinc-400 dark:text-zinc-500"
                      />
                    )}

                    {/* Solid Prism with Specular Highlight */}
                    {plate.sil && (
                      <path
                        d={plate.sil}
                        className={`transition-colors duration-150 ${
                          isHighlighted
                            ? "fill-sky-100 dark:fill-[#0c1830] stroke-sky-600 dark:stroke-sky-400 stroke-[2]"
                            : "fill-white dark:fill-[#12131c] stroke-zinc-400 dark:stroke-zinc-500 stroke-[1.2]"
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
                            ? "stroke-sky-500 dark:stroke-sky-300 stroke-[1.1]"
                            : "stroke-zinc-300 dark:stroke-zinc-600 stroke-[0.8]"
                        }
                      />
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          <span className="text-[10px] font-mono-code text-zinc-600 dark:text-zinc-400 mt-2 text-center">
            Interactive Architecture Strata · Hover or select stage
          </span>
        </div>

        {/* ── Right Column (md:col-span-7): Segmented Controller & Details ── */}
        <div className="md:col-span-7 flex flex-col justify-between space-y-3">
          
          {/* Segmented Stage Control */}
          <div
            role="tablist"
            aria-label="IRS 990 Pipeline Stages"
            className="flex items-center gap-1 p-1 rounded-xl bg-zinc-100 dark:bg-black/40 border border-zinc-200 dark:border-white/[0.06]"
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
                  className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-mono-code transition-all cursor-pointer text-center truncate ${
                    isSelected
                      ? "bg-white dark:bg-zinc-800 text-sky-700 dark:text-sky-300 font-semibold shadow-xs border border-zinc-200 dark:border-white/[0.08]"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                  }`}
                >
                  {st.tab}
                </button>
              );
            })}
          </div>

          {/* Active Stage Technical Breakdown */}
          <div
            id={`stage-panel-${selectedIndex}`}
            role="tabpanel"
            aria-labelledby={`stage-tab-${selectedIndex}`}
            tabIndex={0}
            className="p-4 rounded-xl bg-zinc-50/80 dark:bg-white/[0.02] border border-zinc-200/80 dark:border-white/[0.06] space-y-2.5 focus:outline-none focus:ring-1 focus:ring-sky-500"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded bg-sky-500/10 dark:bg-sky-500/20">
                  {cur.icon}
                </span>
                <span className="text-xs font-mono-code font-bold text-zinc-900 dark:text-white">
                  {cur.full}
                </span>
              </div>
              <span className="text-[10px] font-mono-code font-semibold px-2 py-0.5 rounded bg-sky-500/10 text-sky-700 dark:text-sky-400 border border-sky-500/20 shrink-0">
                Stage {cur.step}/04
              </span>
            </div>

            <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
              {cur.desc}
            </p>

            {/* Key Specs Chips */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {cur.specs.map((spec, sIdx) => (
                <span
                  key={sIdx}
                  className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-white dark:bg-white/[0.04] text-zinc-700 dark:text-zinc-300 border border-zinc-200/80 dark:border-white/[0.06]"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>

          {/* Clean Case Study Link */}
          <div className="flex items-center justify-between pt-1 text-[11px] font-mono-code text-zinc-500 dark:text-zinc-400">
            <span>Data lifecycle: Raw XML → Columnar Warehouse</span>
            <a
              href="https://github.com/akbknight/form990-grant-miner/blob/main/docs/architecture.md"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1"
            >
              <span>Architecture Docs</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>

        </div>
      </div>
    </figure>
  );
};

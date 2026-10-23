"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  colorType: "cyan" | "gold" | "indigo";
}

export const AmbientCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };
    resize();

    let mouseX = width / 2;
    let mouseY = height * 0.3;
    let curMouseX = mouseX;
    let curMouseY = mouseY;
    let mouseActive = false;

    // Detect theme & reduced motion preference
    const isDarkTheme = () => document.documentElement.classList.contains("dark");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Pipeline Data Nodes count scaled to screen size
    const isMobile = width < 768;
    const count = isMobile ? 22 : 44;
    const nodes: Node[] = [];

    const colorTypes: ("cyan" | "gold" | "indigo")[] = ["cyan", "cyan", "indigo", "gold"];

    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.6 + 1.0,
        baseAlpha: Math.random() * 0.4 + 0.25,
        colorType: colorTypes[Math.floor(Math.random() * colorTypes.length)],
      });
    }

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      mouseActive = true;
    };

    const onMouseLeave = () => {
      mouseActive = false;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
        mouseActive = true;
      }
    };

    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const isDark = isDarkTheme();

      // Smooth mouse interpolation (lerp)
      curMouseX += (mouseX - curMouseX) * 0.06;
      curMouseY += (mouseY - curMouseY) * 0.06;

      // Draw living interactive ambient spotlight aura
      if (mouseActive) {
        const auraRadius = isMobile ? 240 : 380;
        const auraGrad = ctx.createRadialGradient(
          curMouseX,
          curMouseY,
          0,
          curMouseX,
          curMouseY,
          auraRadius
        );

        if (isDark) {
          auraGrad.addColorStop(0, "rgba(56, 189, 248, 0.12)");
          auraGrad.addColorStop(0.35, "rgba(99, 102, 241, 0.06)");
          auraGrad.addColorStop(0.7, "rgba(245, 158, 11, 0.025)");
          auraGrad.addColorStop(1, "rgba(7, 8, 13, 0)");
        } else {
          auraGrad.addColorStop(0, "rgba(2, 132, 199, 0.09)");
          auraGrad.addColorStop(0.4, "rgba(99, 102, 241, 0.04)");
          auraGrad.addColorStop(0.75, "rgba(217, 119, 6, 0.02)");
          auraGrad.addColorStop(1, "rgba(247, 248, 250, 0)");
        }

        ctx.fillStyle = auraGrad;
        ctx.fillRect(0, 0, width, height);
      }

      // Render data nodes & constellation vector bridges
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        if (!prefersReducedMotion) {
          n.x += n.vx;
          n.y += n.vy;

          // Wrap edges
          if (n.x < 0) n.x = width;
          if (n.x > width) n.x = 0;
          if (n.y < 0) n.y = height;
          if (n.y > height) n.y = 0;

          // Subtle physical deflection near cursor
          if (mouseActive) {
            const dx = n.x - curMouseX;
            const dy = n.y - curMouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 150 && dist > 0) {
              const force = (150 - dist) / 150;
              n.x += (dx / dist) * force * 1.5;
              n.y += (dy / dist) * force * 1.5;
            }
          }
        }

        // Draw node
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);

        if (isDark) {
          if (n.colorType === "cyan") {
            ctx.fillStyle = `rgba(56, 189, 248, ${n.baseAlpha})`;
          } else if (n.colorType === "indigo") {
            ctx.fillStyle = `rgba(129, 140, 248, ${n.baseAlpha * 0.9})`;
          } else {
            ctx.fillStyle = `rgba(245, 158, 11, ${n.baseAlpha * 0.85})`;
          }
        } else {
          if (n.colorType === "cyan") {
            ctx.fillStyle = `rgba(2, 132, 199, ${n.baseAlpha * 0.75})`;
          } else if (n.colorType === "indigo") {
            ctx.fillStyle = `rgba(79, 70, 229, ${n.baseAlpha * 0.65})`;
          } else {
            ctx.fillStyle = `rgba(217, 119, 6, ${n.baseAlpha * 0.65})`;
          }
        }
        ctx.fill();

        // Connect nearby nodes with subtle hairline constellation lines
        const maxDist = isMobile ? 85 : 120;
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const cdx = n.x - n2.x;
          const cdy = n.y - n2.y;
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy);

          if (cdist < maxDist) {
            const lineAlpha = (1 - cdist / maxDist) * (isDark ? 0.12 : 0.07);
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = isDark
              ? `rgba(56, 189, 248, ${lineAlpha})`
              : `rgba(2, 132, 199, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      if (!prefersReducedMotion) {
        animId = requestAnimationFrame(render);
      }
    };

    // Pause when page is hidden to conserve battery
    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animId);
      } else if (!prefersReducedMotion) {
        animId = requestAnimationFrame(render);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    if (prefersReducedMotion) {
      // Single static render for reduced motion
      render();
    } else {
      animId = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
};

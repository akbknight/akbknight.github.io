"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  colorType: "cyan" | "gold";
}

export const AmbientCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let curMouseX = mouseX;
    let curMouseY = mouseY;
    let mouseActive = false;

    // Detect theme from document
    const isDarkTheme = () => document.documentElement.classList.contains("dark");

    // Particle count: scaled for performance
    const isMobile = width < 768;
    const count = isMobile ? 24 : 48;
    const particles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.5 + 0.8,
        baseAlpha: Math.random() * 0.4 + 0.15,
        colorType: Math.random() > 0.35 ? "cyan" : "gold",
      });
    }

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      mouseActive = true;
    };

    const onMouseLeave = () => {
      mouseActive = false;
    };

    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const isDark = isDarkTheme();

      // Smooth mouse interpolation (lerp)
      curMouseX += (mouseX - curMouseX) * 0.08;
      curMouseY += (mouseY - curMouseY) * 0.08;

      // Draw subtle interactive cursor aura
      if (mouseActive) {
        const auraGrad = ctx.createRadialGradient(
          curMouseX,
          curMouseY,
          0,
          curMouseX,
          curMouseY,
          320
        );
        if (isDark) {
          auraGrad.addColorStop(0, "rgba(56, 189, 248, 0.045)");
          auraGrad.addColorStop(0.5, "rgba(245, 158, 11, 0.018)");
          auraGrad.addColorStop(1, "rgba(5, 5, 7, 0)");
        } else {
          auraGrad.addColorStop(0, "rgba(2, 132, 199, 0.04)");
          auraGrad.addColorStop(0.5, "rgba(180, 83, 9, 0.015)");
          auraGrad.addColorStop(1, "rgba(251, 251, 253, 0)");
        }
        ctx.fillStyle = auraGrad;
        ctx.fillRect(0, 0, width, height);
      }

      // Update & render particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges gracefully
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Subtle repulsion from cursor
        if (mouseActive) {
          const dx = p.x - curMouseX;
          const dy = p.y - curMouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140 && dist > 0) {
            const force = (140 - dist) / 140;
            p.x += (dx / dist) * force * 1.2;
            p.y += (dy / dist) * force * 1.2;
          }
        }

        // Particle rendering
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

        if (isDark) {
          ctx.fillStyle =
            p.colorType === "cyan"
              ? `rgba(56, 189, 248, ${p.baseAlpha})`
              : `rgba(245, 158, 11, ${p.baseAlpha * 0.9})`;
        } else {
          ctx.fillStyle =
            p.colorType === "cyan"
              ? `rgba(2, 132, 199, ${p.baseAlpha * 0.7})`
              : `rgba(180, 83, 9, ${p.baseAlpha * 0.6})`;
        }
        ctx.fill();

        // Connect nearby particles with hairline constellations
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const cdx = p.x - p2.x;
          const cdy = p.y - p2.y;
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy);

          if (cdist < 100) {
            const lineAlpha = (1 - cdist / 100) * (isDark ? 0.08 : 0.04);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = isDark
              ? `rgba(56, 189, 248, ${lineAlpha})`
              : `rgba(2, 132, 199, ${lineAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    // Pause animation when tab not visible to conserve resources
    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animId);
      } else {
        animId = requestAnimationFrame(render);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-500"
      style={{ opacity: 0.85 }}
    />
  );
};

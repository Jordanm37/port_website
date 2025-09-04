import React, { useEffect, useRef, useMemo, useState } from "react";

export interface CanvasBackgroundProps {
  color: string;
  density?: number; // number of particles per 10k px^2
}

export const CanvasBackground: React.FC<CanvasBackgroundProps> = ({ color, density = 0.06 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  // Memoize expensive calculations and constants
  const constants = useMemo(
    () => ({
      lineDist: 100,
      lineDist2: 100 * 100, // Pre-calculate squared distance
      mouseInfluence: 80,
      mouseInfluence2: 80 * 80, // Pre-calculate squared influence
      friction: 0.995,
      mouseForce: 0.0007,
      maxConnections: 50,
      particleCheckCount: 8,
      velocityRange: 0.3,
      particleRadius: 1.1,
      connectionAlpha: 0.6,
      minDistance: 20,
    }),
    []
  );

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // AbortController for proper cleanup
    const abortController = new AbortController();

    // Narrowed, stable references for inner closures
    const canvasEl: HTMLCanvasElement = canvas;
    const ctxEl: CanvasRenderingContext2D = ctx;

    let width = 0;
    let height = 0;
    let dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

    type Particle = { x: number; y: number; vx: number; vy: number };
    let particles: Particle[] = [];
    let mouse = { x: -9999, y: -9999 };

    function resize() {
      width = canvasEl.clientWidth;
      height = canvasEl.clientHeight;
      canvasEl.width = Math.floor(width * dpr);
      canvasEl.height = Math.floor(height * dpr);
      ctxEl.setTransform(dpr, 0, 0, dpr, 0, 0);

      // seed particles based on area
      const target = Math.floor(((width * height) / 10000) * density);
      particles = [];
      for (let i = 0; i < target; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * constants.velocityRange,
          vy: (Math.random() - 0.5) * constants.velocityRange,
        });
      }
    }

    function draw() {
      // Check if still visible and not aborted
      if (!isVisible || abortController.signal.aborted) {
        return;
      }

      ctxEl.clearRect(0, 0, width, height);
      // faint background noise
      ctxEl.fillStyle = "rgba(0,0,0,0)";

      // update & draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        // mouse attraction
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const md2 = dx * dx + dy * dy;
        if (md2 < constants.mouseInfluence2) {
          const f =
            constants.mouseForce *
            (constants.mouseInfluence / Math.max(constants.minDistance, Math.sqrt(md2)));
          p.vx += dx * f;
          p.vy += dy * f;
        }

        p.x += p.vx;
        p.y += p.vy;
        // gentle friction
        p.vx *= constants.friction;
        p.vy *= constants.friction;

        // wrap
        if (p.x < 0) p.x += width;
        else if (p.x > width) p.x -= width;
        if (p.y < 0) p.y += height;
        else if (p.y > height) p.y -= height;

        // draw point
        ctxEl.beginPath();
        ctxEl.arc(p.x, p.y, constants.particleRadius, 0, Math.PI * 2);
        ctxEl.fillStyle = color;
        ctxEl.fill();
      }

      // draw connections - with performance optimization
      ctxEl.strokeStyle = color;
      ctxEl.globalAlpha = 0.5;
      const maxConnections = Math.min(particles.length, constants.maxConnections);
      let connectionsDrawn = 0;

      for (let i = 0; i < particles.length && connectionsDrawn < maxConnections; i++) {
        const p = particles[i];
        // Only check a subset of particles for each particle to reduce O(n²) complexity
        const checkCount = Math.min(constants.particleCheckCount, particles.length - i - 1);
        for (let k = 1; k <= checkCount; k++) {
          const j = i + k;
          if (j >= particles.length) break;

          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const d2 = dx * dx + dy * dy;

          if (d2 < constants.lineDist2) {
            const a = 1 - Math.sqrt(d2) / constants.lineDist;
            ctxEl.globalAlpha = Math.max(0, a * constants.connectionAlpha);
            ctxEl.beginPath();
            ctxEl.moveTo(p.x, p.y);
            ctxEl.lineTo(q.x, q.y);
            ctxEl.stroke();
            connectionsDrawn++;
            if (connectionsDrawn >= maxConnections) break;
          }
        }
      }
      ctxEl.globalAlpha = 1;

      if (!abortController.signal.aborted) {
        rafRef.current = requestAnimationFrame(draw);
      }
    }

    function onPointerMove(e: PointerEvent) {
      const rect = canvasEl.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }

    function onPointerLeave() {
      // Reset mouse position when pointer leaves the canvas area
      mouse.x = -9999;
      mouse.y = -9999;
    }

    const onResize = () => resize();

    // IntersectionObserver to pause animation when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(canvasEl);
    resize();

    if (!prefersReduced) {
      rafRef.current = requestAnimationFrame(draw);
      window.addEventListener("pointermove", onPointerMove, { signal: abortController.signal });
      window.addEventListener("pointerleave", onPointerLeave, { signal: abortController.signal });
    } else {
      // render a single static frame
      draw();
    }
    window.addEventListener("resize", onResize, { signal: abortController.signal });

    return () => {
      abortController.abort();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      observer.disconnect();
      // Event listeners are automatically removed via AbortController
    };
  }, [color, density, isVisible, constants]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
      aria-hidden="true"
    />
  );
};

export default CanvasBackground;

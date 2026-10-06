"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  r: number;
  base: number; // base opacity
  tw: number; // twinkle phase
  tws: number; // twinkle speed
  streak: boolean;
};

// Full-viewport starfield: twinkling stars + occasional thin streaks.
// Pauses when body.motion-paused is set; stops entirely under
// prefers-reduced-motion.
export function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let stars: Star[] = [];
    let raf = 0;
    let w = 0;
    let h = 0;
    let t = 0;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const build = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const n = Math.min(240, Math.floor((w * h) / 9000));
      stars = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.1 + 0.25,
        base: Math.random() * 0.5 + 0.18,
        tw: Math.random() * Math.PI * 2,
        tws: Math.random() * 0.012 + 0.004,
        streak: Math.random() < 0.06,
      }));
    };

    const draw = () => {
      const paused = document.body.classList.contains("motion-paused");
      if (!paused) t += 1;

      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        const a = s.base + Math.sin(t * s.tws + s.tw) * 0.16;
        if (a <= 0.02) continue;
        if (s.streak) {
          // thin warp streak, radiating roughly from upper-right
          const len = 26 + s.r * 30;
          const grad = ctx.createLinearGradient(
            s.x,
            s.y,
            s.x - len * 0.35,
            s.y + len
          );
          grad.addColorStop(0, `rgba(236,233,226,${a * 0.75})`);
          grad.addColorStop(1, "rgba(236,233,226,0)");
          ctx.strokeStyle = grad;
          ctx.lineWidth = s.r * 0.7;
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(s.x - len * 0.35, s.y + len);
          ctx.stroke();
        } else {
          ctx.fillStyle = `rgba(236,233,226,${a})`;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      raf = window.requestAnimationFrame(draw);
    };

    build();
    if (reduced) {
      // single static frame
      t = 8;
      const paused = false;
      void paused;
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        ctx.fillStyle = `rgba(236,233,226,${s.base + 0.1})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
    } else {
      raf = window.requestAnimationFrame(draw);
    }

    const onResize = () => build();
    window.addEventListener("resize", onResize);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas id="starfield" ref={ref} aria-hidden="true" />;
}

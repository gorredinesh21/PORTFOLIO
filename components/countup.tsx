"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animates every number inside a stat string ("40–50", "32×", "100%", "20")
 * from 0 up to its value when the element scrolls into view. Non-numeric
 * strings render as-is; reduced-motion users get the final value instantly.
 */
export function CountUp({ v, duration = 1100 }: { v: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [out, setOut] = useState(v);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const tokens = v.match(/\d+(?:\.\d+)?/g);
    if (!tokens) return; // "auto" etc. — static

    const render = (p: number) => {
      let i = 0;
      setOut(
        v.replace(/\d+(?:\.\d+)?/g, (m) => {
          const target = parseFloat(tokens[i++]);
          const decimals = m.includes(".") ? m.split(".")[1].length : 0;
          return (target * p).toFixed(decimals);
        }),
      );
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return; // keep initial final value

    let raf = 0;
    let started = false;
    const run = () => {
      const t0 = performance.now();
      const step = (now: number) => {
        const p = Math.min(1, (now - t0) / duration);
        const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
        render(eased);
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(
      (en) => {
        if (en[0].isIntersecting && !started) {
          started = true;
          run();
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, [v, duration]);

  return <span ref={ref}>{out}</span>;
}

"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Marquee band whose scroll speed reacts to how fast the user scrolls —
 * flick the page and the band picks up the energy, settle and it calms
 * back to its base rhythm. Reduced-motion keeps it static-slow.
 */
export function MarqueeBand({ children }: { children: ReactNode }) {
  const band = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = band.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--mq-dur", "80s");
      return;
    }

    let lastY = window.scrollY;
    let vel = 0;          // px/frame, smoothed
    let dur = 30;         // current animation duration (s)
    let raf = 0;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const dy = Math.abs(window.scrollY - lastY);
        lastY = window.scrollY;
        vel = vel * 0.7 + dy * 0.3;
        ticking = false;
      });
    };

    const loop = () => {
      const target = Math.max(7, Math.min(30, 30 - vel * 0.55));
      dur += (target - dur) * 0.06;
      el.style.setProperty("--mq-dur", `${dur.toFixed(2)}s`);
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="mq" ref={band} aria-hidden="true">
      <div className="mq-track">{children}</div>
    </div>
  );
}

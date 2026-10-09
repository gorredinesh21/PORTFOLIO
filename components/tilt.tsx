"use client";

import { useRef, type ReactNode } from "react";

/**
 * 3D tilt wrapper: the card leans toward the pointer (perspective transform)
 * with a soft light sheen that follows the cursor. Disabled on touch devices
 * and under prefers-reduced-motion — the card then renders flat, as before.
 */
export function Tilt({ children, max = 5 }: { children: ReactNode; max?: number }) {
  const wrap = useRef<HTMLDivElement>(null);
  const fine = useRef(true);

  const onMove = (e: React.PointerEvent) => {
    const el = wrap.current;
    if (!el || !fine.current) return;
    if (e.pointerType === "touch") return;
    const r = el.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width - 0.5;   // -0.5..0.5
    const ny = (e.clientY - r.top) / r.height - 0.5;
    const rx = -ny * max;
    const ry = nx * max;
    el.style.transition = "transform 0.12s ease-out";
    el.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateZ(6px)`;
    el.style.setProperty("--shx", `${((nx + 0.5) * 100).toFixed(1)}%`);
    el.style.setProperty("--shy", `${((ny + 0.5) * 100).toFixed(1)}%`);
    el.style.setProperty("--sho", "1");
  };

  const onLeave = () => {
    const el = wrap.current;
    if (!el) return;
    el.style.transition = "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)";
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)";
    el.style.setProperty("--sho", "0");
  };

  return (
    <div
      ref={wrap}
      className="tilt-wrap"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
      <span className="tilt-sheen" aria-hidden="true" />
    </div>
  );
}

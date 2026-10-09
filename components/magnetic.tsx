"use client";

import { useRef, type ReactNode } from "react";

/**
 * Magnetic hover: the wrapped pill drifts toward the pointer and springs
 * back on leave. Touch pointers and reduced-motion get plain behaviour.
 */
export function Magnetic({
  children,
  strength = 0.22,
  max = 8,
}: {
  children: ReactNode;
  strength?: number;
  max?: number;
}) {
  const wrap = useRef<HTMLSpanElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = wrap.current;
    if (!el || e.pointerType === "touch") return;
    const r = el.getBoundingClientRect();
    let dx = (e.clientX - (r.left + r.width / 2)) * strength;
    let dy = (e.clientY - (r.top + r.height / 2)) * strength;
    dx = Math.max(-max, Math.min(max, dx));
    dy = Math.max(-max, Math.min(max, dy));
    el.style.transition = "transform 0.18s ease-out";
    el.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px)`;
  };

  const onLeave = () => {
    const el = wrap.current;
    if (!el) return;
    el.style.transition = "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)";
    el.style.transform = "translate(0px, 0px)";
  };

  return (
    <span
      ref={wrap}
      className="magnet"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
    </span>
  );
}

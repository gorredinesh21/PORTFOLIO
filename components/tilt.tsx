"use client";

import { useRef } from "react";

/** Subtle 3D tilt wrapper — rotates children toward the cursor, springs back on leave. */
export function Tilt({
  children,
  max = 7,
}: {
  children: React.ReactNode;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * max}deg) rotateX(${-y * max}deg) translateZ(6px)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="h-full transition-transform duration-200 ease-out will-change-transform [transform-style:preserve-3d]"
    >
      {children}
    </div>
  );
}

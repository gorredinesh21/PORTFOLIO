"use client";

import { useRef } from "react";

/**
 * Lightweight CSS-3D hero scene: an animated perspective grid floor,
 * floating glass cubes and a mouse-parallax camera. Zero extra deps —
 * just transforms, so it stays cheap on any machine.
 */
export function Hero3D() {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--px", `${x * -14}deg`);
    el.style.setProperty("--py", `${y * 10}deg`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--px", "0deg");
    el.style.setProperty("--py", "0deg");
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden [perspective:1100px]"
      style={{ "--px": "0deg", "--py": "0deg" } as React.CSSProperties}
    >
      {/* Camera rig — everything inside rotates with the mouse */}
      <div
        className="absolute inset-0 transition-transform duration-300 ease-out [transform-style:preserve-3d]"
        style={{ transform: "rotateY(var(--px)) rotateX(var(--py))" }}
      >
        {/* Perspective grid floor */}
        <div
          className="absolute left-1/2 top-[58%] h-[130%] w-[190%] -translate-x-1/2 origin-top [transform:rotateX(64deg)]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(99,102,241,0.22) 1px, transparent 1px), linear-gradient(to bottom, rgba(99,102,241,0.22) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 20%, black 30%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at 50% 20%, black 30%, transparent 75%)",
            animation: "grid-scroll 9s linear infinite",
          }}
        />

        {/* Floating cube A (glass) */}
        <div className="absolute left-[58%] top-[16%] [transform-style:preserve-3d] [animation:float-a_7s_ease-in-out_infinite]">
          <div className="cube-42 [transform:rotateX(-18deg)_rotateY(32deg)]">
            {["front", "back", "right", "left", "top", "bottom"].map((f) => (
              <span key={f} className={`cube-face ${f}`} />
            ))}
          </div>
        </div>

        {/* Floating cube B (smaller, accent) */}
        <div className="absolute right-[20%] top-[38%] [transform-style:preserve-3d] [animation:float-b_9s_ease-in-out_infinite]">
          <div className="cube-28 [transform:rotateX(24deg)_rotateY(-38deg)]">
            {["front", "back", "right", "left", "top", "bottom"].map((f) => (
              <span key={f} className={`cube-face ${f}`} />
            ))}
          </div>
        </div>

        {/* Glow orb */}
        <div className="absolute right-[30%] top-[18%] h-24 w-24 rounded-full bg-gradient-to-br from-indigo-500/35 to-violet-500/10 blur-xl [animation:float-b_11s_ease-in-out_infinite]" />
      </div>

      <style>{`
        @keyframes grid-scroll { from { background-position: 0 0; } to { background-position: 0 44px; } }
        @keyframes float-a { 0%,100% { transform: translate3d(0,0,0); } 50% { transform: translate3d(10px,-16px,20px); } }
        @keyframes float-b { 0%,100% { transform: translate3d(0,0,0); } 50% { transform: translate3d(-12px,12px,16px); } }
        .cube-42 { position: relative; width: 42px; height: 42px; transform-style: preserve-3d; }
        .cube-28 { position: relative; width: 28px; height: 28px; transform-style: preserve-3d; }
        .cube-face {
          position: absolute; inset: 0;
          border: 1px solid rgba(129,140,248,0.55);
          background: linear-gradient(135deg, rgba(99,102,241,0.14), rgba(139,92,246,0.05));
          backdrop-filter: blur(1px);
        }
        .cube-42 .front  { transform: translateZ(21px); }
        .cube-42 .back   { transform: rotateY(180deg) translateZ(21px); }
        .cube-42 .right  { transform: rotateY(90deg) translateZ(21px); }
        .cube-42 .left   { transform: rotateY(-90deg) translateZ(21px); }
        .cube-42 .top    { transform: rotateX(90deg) translateZ(21px); }
        .cube-42 .bottom { transform: rotateX(-90deg) translateZ(21px); }
        .cube-28 .front  { transform: translateZ(14px); }
        .cube-28 .back   { transform: rotateY(180deg) translateZ(14px); }
        .cube-28 .right  { transform: rotateY(90deg) translateZ(14px); }
        .cube-28 .left   { transform: rotateY(-90deg) translateZ(14px); }
        .cube-28 .top    { transform: rotateX(90deg) translateZ(14px); }
        .cube-28 .bottom { transform: rotateX(-90deg) translateZ(14px); }
        @media (prefers-reduced-motion: reduce) {
          [class*="float-"], [class*="grid-scroll"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

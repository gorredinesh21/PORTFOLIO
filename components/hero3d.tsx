"use client";

import { useEffect, useRef } from "react";

/**
 * Zero-dependency 3D hero: a rotating wireframe torus knot (p=2, q=3) with a
 * scattered particle field, perspective-projected onto a 2D canvas. Graphite
 * ink strokes on the warm-ivory theme, a sparse set of vermilion accent points,
 * gentle pointer parallax. Pauses offscreen; draws one static frame under
 * prefers-reduced-motion.
 */
export function Hero3d() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const INK = "28, 25, 23";
    const ACC = "232, 71, 28";

    // torus knot curve: p=2, q=3
    const KNOT_P = 2, KNOT_Q = 3;
    const N = 640; // curve samples
    const curve: [number, number, number][] = [];
    for (let i = 0; i < N; i++) {
      const t = (i / N) * Math.PI * 2 * KNOT_Q;
      const r = 1.9 + 0.62 * Math.cos(KNOT_P * t / KNOT_Q);
      curve.push([
        r * Math.cos(t / KNOT_Q),
        r * Math.sin(t / KNOT_Q),
        0.62 * Math.sin(KNOT_P * t / KNOT_Q),
      ]);
    }
    // scattered particle field
    const P = 170;
    const dust: [number, number, number, number][] = []; // x,y,z,accent?
    for (let i = 0; i < P; i++) {
      dust.push([
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 7 - 1.5,
        Math.random() < 0.22 ? 1 : 0,
      ]);
    }

    let raf = 0;
    let visible = true;
    let t = 0;
    let mx = 0, my = 0, smx = 0, smy = 0;
    let w = 0, h = 0, dpr = 1;

    // drag-to-spin
    let dragging = false;
    let lastX = 0;
    let spin = 0;        // user-imparted rotation offset
    let spinVel = 0;     // rad/s, decays with friction
    canvas.style.cursor = "grab";
    const onDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      spinVel = 0;
      canvas.style.cursor = "grabbing";
      canvas.setPointerCapture(e.pointerId);
    };
    const onDrag = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      spin += dx * 0.008;
      spinVel = dx * 0.008 * 60; // approx rad/s at 60fps
    };
    const onUp = (e: PointerEvent) => {
      dragging = false;
      canvas.style.cursor = "grab";
      if (canvas.hasPointerCapture(e.pointerId)) canvas.releasePointerCapture(e.pointerId);
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
    };

    const project = (p: [number, number, number], rotY: number, rotX: number) => {
      // rotate Y then X, perspective divide
      const cy = Math.cos(rotY), sy = Math.sin(rotY);
      let x = p[0] * cy + p[2] * sy;
      let z = -p[0] * sy + p[2] * cy;
      const cx = Math.cos(rotX), sx = Math.sin(rotX);
      let y = p[1] * cx - z * sx;
      z = p[1] * sx + z * cx;
      const fov = 5.2;
      const s = fov / (fov + z);
      return { x: x * s, y: y * s, z, s };
    };

    const draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const cx = w * 0.64; // knot sits right-of-center, type reads left
      const cy = h * 0.46;
      const scale = Math.min(w, h) * 0.185;

      const rotY = t * 0.28 + spin + smx * 0.55;
      const rotX = 0.42 + smy * 0.3;

      // curve wireframe — three offset strands read as a woven graphite tube
      ctx.lineJoin = "round";
      for (const [dY, aMul] of [[0, 1], [0.07, 0.45], [-0.07, 0.45], [0.14, 0.3]] as const) {
        let prev = project(curve[0], rotY + dY, rotX);
        for (let i = 1; i <= N; i++) {
          const c = curve[i % N];
          const q = project(c, rotY + dY, rotX);
          const depth = (q.s + prev.s) / 2;
          const alpha =
            Math.max(0.3, Math.min(0.85, 1.0 - (q.z + prev.z) / 2 * 0.24)) * aMul;
          ctx.strokeStyle = `rgba(${INK}, ${alpha})`;
          ctx.lineWidth = Math.max(1.3, depth * 2.4);
          ctx.beginPath();
          ctx.moveTo(cx + prev.x * scale, cy + prev.y * scale);
          ctx.lineTo(cx + q.x * scale, cy + q.y * scale);
          ctx.stroke();
          prev = q;
        }
      }

      // sparse accent beads on the knot
      for (let i = 0; i < N; i += 16) {
        const q = project(curve[i], rotY, rotX);
        ctx.fillStyle = `rgba(${ACC}, ${Math.max(0.35, 0.95 - q.z * 0.15)})`;
        ctx.beginPath();
        ctx.arc(cx + q.x * scale, cy + q.y * scale, Math.max(2.2, q.s * 3.1), 0, Math.PI * 2);
        ctx.fill();
      }

      // dust field
      for (const d of dust) {
        const q = project([d[0], d[1], d[2]], rotY * 0.4, rotX * 0.5);
        const col = d[3] ? ACC : INK;
        ctx.fillStyle = `rgba(${col}, ${Math.max(0.05, 0.42 - q.z * 0.09)})`;
        ctx.beginPath();
        ctx.arc(
          w * 0.5 + q.x * (w * 0.09),
          h * 0.5 + q.y * (h * 0.11),
          Math.max(0.6, q.s * 1.2),
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
    };

    const tick = () => {
      if (!visible) { raf = requestAnimationFrame(tick); return; }
      t += 0.008;
      if (!dragging) {
        spin += spinVel / 60;
        spinVel *= 0.95; // friction
        if (Math.abs(spinVel) < 0.02) spinVel = 0;
      }
      smx += (mx - smx) * 0.04;
      smy += (my - smy) * 0.04;
      draw();
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      mx = e.clientX / window.innerWidth - 0.5;
      my = e.clientY / window.innerHeight - 0.5;
    };

    resize();
    if (reduce) {
      draw(); // single static frame
    } else {
      draw(); // instant first paint — animation continues on the next frame
      raf = requestAnimationFrame(tick);
      window.addEventListener("pointermove", onMove, { passive: true });
      canvas.addEventListener("pointerdown", onDown);
      canvas.addEventListener("pointermove", onDrag);
      canvas.addEventListener("pointerup", onUp);
      canvas.addEventListener("pointercancel", onUp);
    }
    window.addEventListener("resize", resize);
    const io = new IntersectionObserver((en) => { visible = en[0].isIntersecting; });
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onDrag);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      io.disconnect();
    };
  }, []);

  return <canvas id="hero3d" ref={ref} aria-hidden="true" />;
}

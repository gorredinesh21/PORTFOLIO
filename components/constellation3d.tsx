"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import type { Project } from "@/lib/data";

type Node = {
  p: Project;
  x: number; y: number; z: number;
  live: boolean;
  featured: boolean;
};

/**
 * Zero-dependency interactive 3D star map of every project. Nodes sit on a
 * sphere (golden-angle distribution), drift in slow orbit, connect to their
 * nearest neighbours, and answer the pointer: drag to orbit, hover a node to
 * spotlight it, click to open the project page. Vermilion = featured, ring =
 * live in production. Pauses offscreen; auto-orbit stops under
 * prefers-reduced-motion (drag still works — it is user-initiated).
 */
export function Constellation3d({ projects }: { projects: Project[] }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const router = useRouter();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const INK = "28, 25, 23";
    const ACC = "232, 71, 28";

    // ── deterministic node layout: golden-angle spiral on a sphere ──────────
    const rng = (i: number) => {
      const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
      return x - Math.floor(x);
    };
    const nodes: Node[] = projects.map((p, i) => {
      const t = (i + 0.5) / projects.length;
      const phi = Math.acos(1 - 2 * t);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const r = 2.1 + rng(i) * 0.55;
      return {
        p,
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.cos(phi) * 0.72, // slightly flattened — reads as a disc
        z: r * Math.sin(phi) * Math.sin(theta),
        live: !!p.liveUrl,
        featured: !!p.featured,
      };
    });

    // static topology: each node links to its 2 nearest neighbours
    const links: [number, number][] = [];
    for (let i = 0; i < nodes.length; i++) {
      const dists = nodes
        .map((n, j) => ({
          j,
          d: (n.x - nodes[i].x) ** 2 + (n.y - nodes[i].y) ** 2 + (n.z - nodes[i].z) ** 2,
        }))
        .filter((o) => o.j !== i)
        .sort((a, b) => a.d - b.d);
      for (const o of dists.slice(0, 2)) {
        const key = [Math.min(i, o.j), Math.max(i, o.j)] as [number, number];
        if (!links.some(([a, b]) => a === key[0] && b === key[1])) links.push(key);
      }
    }

    let raf = 0;
    let visible = true;
    let t = 0;
    let mx = 0, my = 0, smx = 0, smy = 0;
    let w = 0, h = 0, dpr = 1;
    let dragging = false, lastX = 0, spin = 0, spinVel = 0;
    let hover: number | null = null;
    let px = -1, py = -1; // pointer in canvas coords

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
    };

    const project = (n: Node, rotY: number, rotX: number) => {
      const cy = Math.cos(rotY), sy = Math.sin(rotY);
      let x = n.x * cy + n.z * sy;
      let z = -n.x * sy + n.z * cy;
      const cx = Math.cos(rotX), sx = Math.sin(rotX);
      let y = n.y * cx - z * sx;
      z = n.y * sx + z * cx;
      const fov = 6.2;
      const s = fov / (fov + z);
      return { x: x * s, y: y * s, z, s };
    };

    const draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2, cy = h / 2;
      const scale = Math.min(w, h) * 0.31;
      const rotY = t * 0.1 + spin + smx * 0.35;
      const rotX = 0.18 + smy * 0.22;

      const pts = nodes.map((n) => project(n, rotY, rotX));
      const at = (i: number) => ({
        x: cx + pts[i].x * scale,
        y: cy + pts[i].y * scale,
      });

      // links
      for (const [a, b] of links) {
        const A = at(a), B = at(b);
        const depth = (pts[a].s + pts[b].s) / 2;
        const alpha = Math.max(0.05, Math.min(0.34, 0.5 - ((pts[a].z + pts[b].z) / 2) * 0.1));
        ctx.strokeStyle = `rgba(${INK}, ${alpha * 0.85})`;
        ctx.lineWidth = Math.max(0.5, depth * 0.5);
        ctx.beginPath();
        ctx.moveTo(A.x, A.y);
        ctx.lineTo(B.x, B.y);
        ctx.stroke();
      }

      // nodes + labels
      ctx.textAlign = "center";
      const order = pts.map((p, i) => i).sort((a, b) => pts[b].z - pts[a].z); // far first
      for (const i of order) {
        const P = at(i);
        const node = nodes[i];
        const isHover = hover === i;
        const front = pts[i].z < 0.4;
        const baseA = Math.max(0.28, Math.min(1, 0.75 - pts[i].z * 0.16));

        if (node.featured) {
          ctx.beginPath();
          ctx.fillStyle = `rgba(${ACC}, ${isHover ? 1 : baseA})`;
          ctx.arc(P.x, P.y, (isHover ? 7.5 : 5.4) * pts[i].s, 0, Math.PI * 2);
          ctx.fill();
          // soft glow
          ctx.beginPath();
          ctx.fillStyle = `rgba(${ACC}, ${(isHover ? 0.22 : 0.12) * baseA})`;
          ctx.arc(P.x, P.y, 16 * pts[i].s, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.fillStyle = `rgba(${INK}, ${isHover ? 1 : baseA * 0.85})`;
          ctx.arc(P.x, P.y, (isHover ? 6 : 3.6) * pts[i].s, 0, Math.PI * 2);
          ctx.fill();
        }
        if (node.live) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${node.featured ? ACC : INK}, ${(isHover ? 0.95 : baseA) * 0.8})`;
          ctx.lineWidth = 1;
          ctx.arc(P.x, P.y, ((node.featured ? 11 : 8.4) + (isHover ? 2.5 : 0)) * pts[i].s, 0, Math.PI * 2);
          ctx.stroke();
        }

        // label: hovered always, others when front-facing
        if (isHover) {
          ctx.font = "700 12px var(--font-mono-code), monospace";
          ctx.fillStyle = `rgba(${INK}, 1)`;
          ctx.fillText(node.p.name.toUpperCase(), P.x, P.y - 15 * pts[i].s - 6);
          ctx.font = "400 10px var(--font-mono-code), monospace";
          ctx.fillStyle = `rgba(${node.featured ? ACC : "93, 89, 81"}, 1)`;
          ctx.fillText(
            (node.featured ? "featured · " : "") + node.p.category.toLowerCase(),
            P.x,
            P.y + 15 * pts[i].s + 12,
          );
        } else if (front) {
          ctx.font = "600 10px var(--font-mono-code), monospace";
          ctx.fillStyle = `rgba(${INK}, ${(0.72 - pts[i].z * 0.2).toFixed(2)})`;
          ctx.fillText(node.p.name.toUpperCase(), P.x, P.y - 9 * pts[i].s - 4);
        }
      }
    };

    const pick = () => {
      if (px < 0) { hover = null; return; }
      const cx = w / 2, cy = h / 2;
      const scale = Math.min(w, h) * 0.31;
      const rotY = t * 0.1 + spin + smx * 0.35;
      const rotX = 0.18 + smy * 0.22;
      let best: number | null = null;
      let bestD = 26;
      nodes.forEach((n, i) => {
        const P = project(n, rotY, rotX);
        const d = Math.hypot(cx + P.x * scale - px, cy + P.y * scale - py);
        if (d < bestD + (n.featured ? 8 : 0)) { bestD = d; best = i; }
      });
      hover = best;
    };

    const tick = () => {
      if (!visible) { raf = requestAnimationFrame(tick); return; }
      t += reduce ? 0 : 0.008;
      if (!dragging) {
        spin += spinVel / 60;
        spinVel *= 0.94;
        if (Math.abs(spinVel) < 0.02) spinVel = 0;
      }
      smx += (mx - smx) * 0.05;
      smy += (my - smy) * 0.05;
      pick();
      draw();
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      px = e.clientX - r.left;
      py = e.clientY - r.top;
      mx = px / r.width - 0.5;
      my = py / r.height - 0.5;
      canvas.style.cursor = hover !== null ? "pointer" : dragging ? "grabbing" : "grab";
    };
    const onLeave = () => { px = -1; py = -1; hover = null; mx = 0; my = 0; };
    const onDown = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      px = e.clientX - r.left;
      py = e.clientY - r.top;
      pick(); // hover must be fresh even if frames were throttled
      dragging = true;
      lastX = e.clientX;
      spinVel = 0;
      canvas.style.cursor = "grabbing";
      canvas.setPointerCapture(e.pointerId);
    };
    const onDragMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      spin += dx * 0.007;
      spinVel = dx * 0.007 * 60;
    };
    const onUp = (e: PointerEvent) => {
      const r2 = canvas.getBoundingClientRect();
      px = e.clientX - r2.left;
      py = e.clientY - r2.top;
      pick();
      const wasHover = hover;
      const moved = Math.abs(spinVel) > 0.25;
      dragging = false;
      canvas.style.cursor = hover !== null ? "pointer" : "grab";
      if (canvas.hasPointerCapture(e.pointerId)) canvas.releasePointerCapture(e.pointerId);
      if (!moved && wasHover !== null && nodes[wasHover]) {
        router.push(`/projects/${nodes[wasHover].p.slug}`);
      }
    };

    resize();
    const onHoverStatic = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      px = e.clientX - r.left; py = e.clientY - r.top;
      pick(); draw();
      canvas.style.cursor = hover !== null ? "pointer" : "grab";
    };
    if (reduce) {
      // static render, still pickable + draggable
      canvas.addEventListener("pointermove", onHoverStatic);
      draw();
    } else {
      draw(); // instant first paint — animation continues on the next frame
      raf = requestAnimationFrame(tick);
    }
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onDragMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    if (!coarse) canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", resize);
    const io = new IntersectionObserver((en) => { visible = en[0].isIntersecting; });
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onDragMove);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointermove", onHoverStatic);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      canvas.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", resize);
      io.disconnect();
    };
  }, [router]);

  return (
    <div className="constellation">
      <canvas ref={ref} aria-label="Interactive 3D map of all projects — drag to orbit, click a node to open it" />
      <p className="constellation-hint">drag to orbit · hover a node · click to open</p>
    </div>
  );
}

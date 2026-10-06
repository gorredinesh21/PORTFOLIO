"use client";

import { useEffect, useState } from "react";
import { navLinks, profile } from "@/lib/data";

export function Nav() {
  const [paused, setPaused] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("motion-paused", paused);
  }, [paused]);

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-border bg-[rgba(8,8,15,0.72)] backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="group flex items-baseline gap-2">
          <span className="font-display text-lg font-bold tracking-tight text-accent">
            {profile.monogram}.
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">
            {profile.shortName}
            <span className="text-muted-2"> — ships things</span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-5">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[0.83rem] text-muted transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            className="ftab !py-1.5 !px-3.5"
            aria-pressed={paused}
            title="Toggle all ambient animation"
          >
            {paused ? "▶ motion" : "❚❚ pause motion"}
          </button>
        </nav>

        <div className="flex lg:hidden items-center gap-3">
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            className="ftab !py-1.5 !px-3"
            aria-pressed={paused}
          >
            {paused ? "▶" : "❚❚"}
          </button>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="ftab !py-1.5 !px-3.5"
            aria-expanded={open}
          >
            {open ? "close" : "menu"}
          </button>
        </div>
      </div>

      {open && (
        <nav className="lg:hidden border-t border-border bg-[rgba(8,8,15,0.96)] px-4 py-3">
          <div className="grid grid-cols-2 gap-1">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm text-muted hover:bg-surface-strong hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

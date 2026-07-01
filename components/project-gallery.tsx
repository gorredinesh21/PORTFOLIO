"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ProjectCard } from "@/components/project-card";
import type { Domain } from "@/lib/data";
import { projects } from "@/lib/data";
import { cn } from "@/lib/utils";

const FILTERS: (Domain | "All")[] = [
  "All",
  "GenAI",
  "Full-Stack",
  "ML / DL",
  "Web3",
  "Systems",
];

export function ProjectGallery() {
  const [active, setActive] = useState<Domain | "All">("All");

  const filtered = useMemo(
    () =>
      active === "All"
        ? projects
        : projects.filter((p) => p.domain === active),
    [active]
  );

  const countFor = (f: Domain | "All") =>
    f === "All" ? projects.length : projects.filter((p) => p.domain === f).length;

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const isActive = active === f;
          return (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all",
                isActive
                  ? "border-transparent bg-gradient-to-r from-accent to-violet text-white shadow-[0_10px_24px_-14px_var(--accent-ring)]"
                  : "border-border bg-surface text-muted hover:border-border-strong hover:text-foreground"
              )}
            >
              {f}
              <span
                className={cn(
                  "rounded-full px-1.5 text-xs",
                  isActive ? "bg-white/20" : "bg-surface-2 text-muted-2"
                )}
              >
                {countFor(f)}
              </span>
            </button>
          );
        })}
      </div>

      <motion.div layout className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((p) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProjectCard project={p} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

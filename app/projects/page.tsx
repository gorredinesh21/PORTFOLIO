"use client";

import { useState } from "react";
import { categories, projects, type ProjectCategory } from "@/lib/data";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";

type Filter = "All" | ProjectCategory;

export default function ProjectsPage() {
  const [filter, setFilter] = useState<Filter>("All");
  const items =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <>
      <section className="page-hero">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 w-full">
          <p className="eyebrow mb-3">Projects</p>
          <h1 className="page-title">
            Everything <span className="grad">built & shipped</span>
          </h1>
          <p className="mt-4 max-w-2xl text-muted leading-relaxed">
            Each project gets its own page — the real interface, the one-line
            story, and a diagram of how it actually works. Most of these are
            live right now.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <div className="mb-8 flex flex-wrap gap-2.5" role="tablist">
              {(["All", ...categories] as Filter[]).map((c) => (
                <button
                  key={c}
                  type="button"
                  role="tab"
                  aria-selected={filter === c}
                  className={`ftab ${filter === c ? "on" : ""}`}
                  onClick={() => setFilter(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((p, i) => (
              <Reveal key={p.slug} delay={Math.min(i * 0.04, 0.28)}>
                <ProjectCard p={p} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

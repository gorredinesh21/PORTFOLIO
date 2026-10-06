"use client";

import { useState } from "react";
import { workbench, workbenchCategories, type WorkbenchCategory } from "@/lib/data";
import { Reveal } from "@/components/reveal";
import { SectionHead } from "@/components/work";
import { CodeBlock } from "@/components/code-block";

type Filter = "All" | WorkbenchCategory;

export function Workbench() {
  const [filter, setFilter] = useState<Filter>("All");
  const items =
    filter === "All" ? workbench : workbench.filter((w) => w.category === filter);

  return (
    <section id="workbench" className="section">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHead
          eyebrow="WORKBENCH"
          title="Live, clickable, maintained."
          lede="Everything here is deployed with a real interface — click a card to use it. Each expands to show the piece of code that does the interesting part."
        />

        <Reveal>
          <div className="mb-9 flex flex-wrap gap-2.5" role="tablist">
            {(["All", ...workbenchCategories] as Filter[]).map((c) => (
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

        {items.length === 0 && (
          <p className="text-muted text-sm py-8">
            Nothing in this lane right now — the systems work lives in Mini
            Projects below.
          </p>
        )}

        <div className="grid gap-5 sm:grid-cols-2">
          {items.map((w, i) => (
            <Reveal key={w.slug} delay={Math.min(i * 0.04, 0.24)}>
              <details className="card wb-card group">
                <summary className="flex flex-col gap-2.5 cursor-pointer list-none">
                  <div className="flex items-start justify-between gap-3">
                    <span className="eyebrow !text-[0.64rem]">{w.eyebrow}</span>
                    <span className="wb-arrow text-muted-2 font-display text-lg leading-none">
                      ↗
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold tracking-tight">
                    {w.title}
                  </h3>
                  <p className="text-[0.88rem] leading-relaxed text-muted">
                    {w.blurb}
                  </p>
                  <div className="mt-auto pt-3 flex flex-wrap items-center gap-2">
                    <span className="chip !text-accent !border-accent/30">
                      {w.category}
                    </span>
                  </div>
                  <div className="stackline">
                    {w.stack.join(" · ")}
                  </div>
                  <span className="text-[0.72rem] font-mono text-muted-2 group-open:hidden">
                    + show the code
                  </span>
                  <span className="hidden text-[0.72rem] font-mono text-accent group-open:inline">
                    − hide the code
                  </span>
                </summary>

                <div className="mt-4 flex flex-col gap-4">
                  <div className="links flex items-center gap-4">
                    <a
                      href={w.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[0.82rem] text-accent hover:underline"
                    >
                      open live ↗
                    </a>
                    <a
                      href={w.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[0.82rem] text-muted hover:text-foreground transition-colors"
                    >
                      source ↗
                    </a>
                  </div>
                  <CodeBlock sample={w.code} />
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

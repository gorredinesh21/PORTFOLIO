import { miniProjects } from "@/lib/data";
import { Reveal } from "@/components/reveal";
import { SectionHead } from "@/components/work";
import { HowItWorks } from "@/components/how-it-works";

export function MiniProjects() {
  return (
    <section id="mini" className="section">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHead
          eyebrow="MINI PROJECTS"
          title="The small ones, kept honestly."
          lede="Coursework, systems exercises and early builds — some with plain demo pages or no live link at all. They still get the same treatment: a real explanation and a diagram of how each one works."
        />

        <div className="flex flex-col">
          {miniProjects.map((m, i) => (
            <Reveal key={m.slug} delay={Math.min(i * 0.03, 0.2)}>
              <details className="mini-item">
                <summary>
                  <span className="caret font-display">›</span>
                  <span className="name font-display text-[1.06rem] font-semibold tracking-tight transition-colors">
                    {m.name}
                  </span>
                  <span className="hidden sm:block flex-1 truncate text-[0.85rem] text-muted">
                    {m.blurb}
                  </span>
                  <span className="stackline hidden md:block !text-[0.66rem]">
                    {m.stack.slice(0, 3).join(" · ")}
                  </span>
                </summary>
                <div className="body grid gap-6 lg:grid-cols-[1fr_1.15fr]">
                  <div>
                    {m.blurb && (
                      <p className="sm:hidden text-[0.88rem] text-muted leading-relaxed">
                        {m.blurb}
                      </p>
                    )}
                    {m.explanation.map((para, j) => (
                      <p
                        key={j}
                        className="text-[0.88rem] leading-[1.7] text-muted mb-3 last:mb-0"
                      >
                        {para}
                      </p>
                    ))}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {m.liveUrl && (
                        <a
                          href={m.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[0.8rem] text-accent hover:underline"
                        >
                          demo ↗
                        </a>
                      )}
                      <a
                        href={m.github}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[0.8rem] text-muted hover:text-foreground transition-colors"
                      >
                        source ↗
                      </a>
                    </div>
                  </div>
                  <HowItWorks d={m.diagram} dense />
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

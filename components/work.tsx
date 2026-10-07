import { featured } from "@/lib/data";
import { Reveal } from "@/components/reveal";
import { OrbitRatio } from "@/components/orbit-ratio";
import { HowItWorks } from "@/components/how-it-works";

function SectionHead({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede: string;
}) {
  return (
    <Reveal>
      <div className="mb-12 max-w-3xl">
        <div className="eyebrow mb-3">{eyebrow}</div>
        <h2 className="font-display text-[clamp(1.9rem,4vw,3rem)] font-bold tracking-tight leading-tight">
          {title}
        </h2>
        <p className="mt-4 text-muted leading-relaxed">{lede}</p>
      </div>
    </Reveal>
  );
}

export { SectionHead };

export function Work() {
  return (
    <section id="work" className="section">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHead
          eyebrow="WORK"
          title="Four projects I keep running."
          lede="Not screenshots — deployed systems with users, guardrails and fallbacks. Each one answers the same two questions: did anyone do this before, and why did I do it my way?"
        />

        <div className="flex flex-col gap-24 sm:gap-32">
          {featured.map((p, i) => (
            <article key={p.slug} className="relative">
              <div className="rail" aria-hidden="true">
                <span>{`CASE ${String(i + 1).padStart(2, "0")} · ${p.slug}`}</span>
              </div>

              <Reveal>
                <div className="eyebrow mb-4">{p.eyebrow}</div>
                <h3 className="font-display text-[clamp(1.7rem,3.6vw,2.7rem)] font-bold tracking-tight leading-[1.06] max-w-2xl">
                  {p.headline[0]}
                  <br />
                  <span className="text-muted">{p.headline[1]}</span>
                </h3>
              </Reveal>

              <div className="mt-8 grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-14">
                <div>
                  <Reveal delay={0.05}>
                    <p className="text-[0.98rem] leading-[1.75] text-muted">
                      {p.story}
                    </p>
                  </Reveal>

                  <Reveal delay={0.1}>
                    <div className="mt-8 flex flex-col gap-3">
                      <div className="bubble q">
                        <span className="who">the recurring question</span>
                        {p.question}
                      </div>
                      <div className="bubble r">
                        <span className="who">why I built it this way</span>
                        {p.reply}
                      </div>
                    </div>
                  </Reveal>

                  <Reveal delay={0.15}>
                    <div className="mt-8 flex flex-wrap gap-2">
                      {p.stack.map((s) => (
                        <span key={s} className="chip">
                          {s}
                        </span>
                      ))}
                    </div>
                    <div className="mt-7 flex flex-wrap items-center gap-4">
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="pill solid"
                      >
                        {p.liveLabel} ↗
                      </a>
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-muted hover:text-foreground transition-colors"
                      >
                        source ↗
                      </a>
                    </div>
                  </Reveal>
                </div>

                <div className="flex flex-col gap-8">
                  <Reveal delay={0.1}>
                    <div className="card p-7">
                      <OrbitRatio {...p.fromTo} />
                    </div>
                  </Reveal>
                </div>
              </div>

              <Reveal delay={0.1}>
                <div className="mt-10">
                  <div className="eyebrow !text-[0.62rem] mb-3">
                    How it works
                  </div>
                  <HowItWorks d={p.diagram} />
                  <p className="mt-3 text-[0.78rem] text-muted-2">
                    {p.diagramCaption}
                  </p>
                </div>
              </Reveal>

              {i < featured.length - 1 && (
                <div className="hairline mt-20 sm:mt-28" aria-hidden="true" />
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

import { aboutBio, skills } from "@/lib/data";
import { Reveal } from "@/components/reveal";
import { SectionHead } from "@/components/work";

export function About() {
  return (
    <section id="about" className="section">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHead
          eyebrow="ABOUT"
          title="Engineer, founder-adjacent, night-sky enjoyer."
          lede=""
        />

        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div className="flex flex-col gap-9">
            {aboutBio.map((b, i) => (
              <Reveal key={b.heading} delay={i * 0.06}>
                <div>
                  <h3 className="eyebrow mb-3 !text-foreground/80">
                    {b.heading}
                  </h3>
                  {b.content.map((p, j) => (
                    <p
                      key={j}
                      className="text-[0.94rem] leading-[1.75] text-muted mb-3 last:mb-0"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>

          <div className="flex flex-col gap-5">
            {skills.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.05}>
                <div className="card p-5">
                  <div className="eyebrow !text-[0.62rem] mb-3">{s.label}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {s.items.map((it) => (
                      <span key={it} className="chip !text-[0.66rem]">
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import { experience, education } from "@/lib/data";
import { Reveal } from "@/components/reveal";
import { SectionHead } from "@/components/work";

export function Experience() {
  return (
    <section id="experience" className="section">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHead
          eyebrow="EXPERIENCE"
          title="Where the data flows."
          lede=""
        />

        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <div className="tl">
            {experience.map((e, i) => (
              <Reveal key={e.company} delay={i * 0.06}>
                <div className="relative pb-10">
                  <span className="tl-dot" aria-hidden="true" />
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-xl font-bold tracking-tight">
                      {e.company}
                    </h3>
                    <span className="font-mono text-[0.72rem] text-muted-2">
                      {e.period} · {e.location}
                    </span>
                  </div>
                  <p className="mt-1 text-[0.9rem] text-accent">{e.role}</p>

                  <div className="mt-4 flex flex-col gap-3">
                    {e.highlights.map((h) => (
                      <div key={h.title} className="card p-4">
                        <div className="font-display text-[0.94rem] font-semibold">
                          {h.title}
                        </div>
                        <p className="mt-1 text-[0.84rem] leading-relaxed text-muted">
                          {h.body}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {e.stack.map((s) => (
                      <span key={s} className="chip !text-[0.64rem]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="flex flex-col gap-5">
            <Reveal>
              <div className="card p-6">
                <div className="eyebrow !text-[0.62rem] mb-3">Education</div>
                <div className="font-display font-bold text-lg leading-snug">
                  {education.degree}
                </div>
                <div className="mt-1 text-[0.88rem] text-muted">
                  {education.school}
                </div>
                <div className="mt-1 font-mono text-[0.72rem] text-muted-2">
                  {education.period}
                </div>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {education.coursework.map((c) => (
                    <span key={c} className="chip !text-[0.64rem]">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import { awards, education, experience, oss } from "@/lib/data";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Experience — Dinesh Gorre",
  description:
    "Reliance Industries (Data / AI), IIT (ISM) Dhanbad, competitions and open source.",
};

export default function ExperiencePage() {
  return (
    <>
      <section className="page-hero">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 w-full">
          <p className="eyebrow mb-3">Experience & credentials</p>
          <h1 className="page-title">
            Where I've <span className="grad">worked & won</span>
          </h1>
        </div>
      </section>

      {/* Reliance */}
      <section className="section !pt-6">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {experience.map((e) => (
            <Reveal key={e.company}>
              <div className="card p-6 sm:p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h2 className="font-display font-bold text-2xl tracking-tight">
                    {e.company}
                  </h2>
                  <span className="chip">{e.period}</span>
                </div>
                <p className="mt-1 text-muted">
                  {e.role} · {e.location}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {e.stack.map((s) => (
                    <span key={s} className="chip">
                      {s}
                    </span>
                  ))}
                </div>
                <div className="mt-6 tl flex flex-col gap-7">
                  {e.highlights.map((h) => (
                    <div key={h.title} className="relative">
                      <span className="tl-dot" aria-hidden="true" />
                      <p className="font-display font-bold text-[1.05rem] tracking-tight">
                        {h.title}
                      </p>
                      <p className="mt-1 text-[0.9rem] leading-relaxed text-muted max-w-2xl">
                        {h.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Awards + OSS */}
      <section className="section">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 grid gap-10 lg:grid-cols-2">
          <div>
            <Reveal>
              <p className="eyebrow mb-4">Awards</p>
            </Reveal>
            <div className="flex flex-col gap-3">
              {awards.map((a, i) => (
                <Reveal key={a.title} delay={i * 0.05}>
                  <div className="card p-5">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="font-display font-bold tracking-tight leading-snug">
                        {a.title}
                      </p>
                      <span className="chip shrink-0">{a.year}</span>
                    </div>
                    <p className="mt-1.5 text-[0.84rem] text-muted">{a.detail}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <div>
            <Reveal>
              <p className="eyebrow mb-4">Open source</p>
            </Reveal>
            <div className="flex flex-col gap-3">
              {oss.map((o, i) => (
                <Reveal key={o.title} delay={i * 0.05}>
                  <a
                    href={o.url}
                    target="_blank"
                    rel="noreferrer"
                    className="card p-5 block group"
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="font-display font-bold tracking-tight group-hover:text-accent transition-colors">
                        {o.title}
                      </p>
                      <span className="chip shrink-0">↗</span>
                    </div>
                    <p className="mt-1.5 text-[0.84rem] text-muted">{o.body}</p>
                    <p className="mt-2 stackline">{o.tag}</p>
                  </a>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <div className="card p-5 mt-3">
                <p className="eyebrow mb-2">Education</p>
                <p className="font-display font-bold tracking-tight">
                  {education.degree}
                </p>
                <p className="text-muted text-[0.9rem] mt-1">
                  {education.school} · {education.period}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

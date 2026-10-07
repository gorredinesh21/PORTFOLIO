import type { Metadata } from "next";
import { awards, education, experience, oss } from "@/lib/data";
import { Reveal } from "@/components/reveal";
import {
  ChatGlyph,
  HubGlyph,
  RouteGlyph,
  ChartGlyph,
  MergeGlyph,
  TrophyGlyph,
  CapGlyph,
} from "@/components/glyphs";

export const metadata: Metadata = {
  title: "Experience — Dinesh Gorre",
  description:
    "Reliance Industries (Data / AI), IIT (ISM) Dhanbad, competitions and open source.",
};

const highlightIcons = [ChatGlyph, HubGlyph, RouteGlyph, ChartGlyph];

// award → visual card art (real project art where one exists)
const awardArt: Record<
  string,
  { img?: string; glyph?: React.ComponentType<{ size?: number }> }
> = {
  "Amazon ML Challenge — Top 200 of 18,500+": { img: "/art/ocr.jpg" },
  "Paytm Build for India — Finale": { img: "/shots/sahayak.png" },
  "Hackfest'23 — IIT (ISM) Dhanbad": { img: "/art/facial.jpg" },
  "JEE Advanced — AIR 2903 · JEE Mains — AIR 4616": { glyph: TrophyGlyph },
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

      {/* Reliance — story beside the platform art */}
      <section className="section !pt-6">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 grid gap-6 lg:grid-cols-[1.15fr_1fr] items-start">
          <Reveal>
            <div className="card p-6 sm:p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h2 className="font-display font-bold text-2xl tracking-tight">
                  {experience[0].company}
                </h2>
                <span className="chip">{experience[0].period}</span>
              </div>
              <p className="mt-1 text-muted">
                {experience[0].role} · {experience[0].location}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {experience[0].stack.map((s) => (
                  <span key={s} className="chip">
                    {s}
                  </span>
                ))}
              </div>
              <div className="mt-7 tl flex flex-col gap-7">
                {experience[0].highlights.map((h, i) => {
                  const Icon = highlightIcons[i % highlightIcons.length];
                  return (
                    <div key={h.title} className="relative">
                      <span className="tl-dot" aria-hidden="true" />
                      <div className="flex items-start gap-2.5">
                        <span className="gchip mt-0.5">
                          <Icon size={17} />
                        </span>
                        <div>
                          <p className="font-display font-bold text-[1.02rem] tracking-tight">
                            {h.title}
                          </p>
                          <p className="mt-1 text-[0.86rem] leading-relaxed text-muted max-w-xl">
                            {h.body}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex flex-col gap-4 lg:sticky lg:top-24">
              <div className="imgcard">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/art/data-platform.jpg"
                  alt="Illustration of the data platform work — lake, pipelines, dashboards"
                />
                <div className="cap">
                  <span>lake → pipelines → gold KPI</span>
                  <span>genie spaces behind oauth</span>
                </div>
              </div>
              <div className="stat-grid !grid-cols-2">
                <div className="stat-tile">
                  <div className="v">120+</div>
                  <div className="k">tables organised across spaces</div>
                </div>
                <div className="stat-tile">
                  <div className="v">9</div>
                  <div className="k">genie spaces, one routing layer</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Awards — image cards */}
      <section className="section">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <p className="eyebrow mb-4">Awards</p>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {awards.map((a, i) => {
              const art = awardArt[a.title] ?? {};
              const Glyph = art.glyph;
              return (
                <Reveal key={a.title} delay={i * 0.06}>
                  <div className="vcard">
                    <div className="vcard-shot">
                      {art.img ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img src={art.img} alt={a.title} loading={i > 1 ? "lazy" : undefined} />
                      ) : (
                        Glyph && (
                          <span className="gchip" style={{ color: "var(--amber)" }}>
                            <Glyph size={54} />
                          </span>
                        )
                      )}
                      <span className="badge">{a.year}</span>
                    </div>
                    <div className="vcard-body">
                      <p className="!text-foreground font-display font-bold !text-[0.92rem] leading-snug tracking-tight">
                        {a.title}
                      </p>
                      <p>{a.detail}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* OSS + Education */}
      <section className="section">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 grid gap-10 lg:grid-cols-2">
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
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2.5">
                        <span className="gchip mt-0.5">
                          <MergeGlyph size={18} />
                        </span>
                        <p className="font-display font-bold tracking-tight group-hover:text-accent transition-colors leading-snug">
                          {o.title}
                        </p>
                      </div>
                      <span className="chip shrink-0">↗</span>
                    </div>
                    <p className="mt-2 text-[0.84rem] text-muted">{o.body}</p>
                    <p className="mt-2 stackline">{o.tag}</p>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>

          <div>
            <Reveal>
              <p className="eyebrow mb-4">Education</p>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="grid gap-4">
                <div className="imgcard">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/art/campus.jpg"
                    alt="IIT (ISM) Dhanbad campus, illustrated at dusk"
                  />
                  <div className="cap">
                    <span>iit (ism) dhanbad</span>
                    <span>2021 – 2025</span>
                  </div>
                </div>
                <div className="card p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2.5">
                      <span className="gchip mt-0.5">
                        <CapGlyph size={20} />
                      </span>
                      <p className="font-display font-bold tracking-tight leading-snug">
                        {education.degree}
                      </p>
                    </div>
                  </div>
                  <p className="mt-2 text-muted text-[0.9rem]">
                    {education.school} · {education.period}
                  </p>
                  <div className="mt-3.5 flex flex-wrap gap-1.5">
                    {education.coursework.map((c) => (
                      <span key={c} className="chip">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
